#!/usr/bin/env python
"""Render every VO line in the series with Cia's local voice clone.

Local by design: Qwen3-TTS via MLX against ref/voice_cia.wav, no ElevenLabs
(that subscription is being cancelled) and no per-line cost, so the series can
be re-voiced as often as the copy changes.

The model is loaded ONCE and every line in the whole series is rendered in that
one process. Loading per line would dominate the runtime.

Writes audio/vo/<slug>_<i>.wav plus audio/vo/manifest.json carrying the measured
duration of every line, which is what lets the build size each end card to its
actual spoken close instead of a guess.

    <voice-clone>/.venv-mlx/bin/python engine/vo.py          all pieces
    <voice-clone>/.venv-mlx/bin/python engine/vo.py ponzo    one piece

Needs the sandbox OFF (MLX/Metal).
"""
import os, sys, json, glob, time, shutil, subprocess, re

SHORTS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VC = os.path.expanduser("~/Developer/voice-clone")
OUT = os.path.join(SHORTS, "audio", "vo")
os.makedirs(OUT, exist_ok=True)

# ENGINE SWAP POINT. Cia has decided the voice should be redone on ElevenLabs
# (a separate session is building that clone). When its samples win, this file is
# the only thing that changes: point ENGINE at "elevenlabs", keep the same
# manifest contract (per-line wav + measured duration), and the entire series
# re-times and re-renders itself off the new audio. Nothing downstream knows or
# cares which engine produced the wavs.
#
# The validation gate below stays either way. It caught 3 bad takes in 42 from
# the local engine; whether a paid engine needs it is exactly what the A/B
# should answer, and running it costs nothing.
ENGINE = os.environ.get("VO_ENGINE", "local")
REPO = "mlx-community/Qwen3-TTS-12Hz-1.7B-Base-bf16"
# 1.12. The first pass ran 0.95, i.e. SLOWER than natural, on the theory that an
# instruction you have to follow while fixating wants room. Cia's verdict on
# hearing it: too slow. These are short imperatives ("Stare at the dot"), not
# narration, and a slow read of a short imperative sounds laboured rather than
# careful. Faster also shortens every piece, which the end-card bloat needed.
SPEED, TEMP = 1.12, 0.5

cfg = json.load(open(os.path.join(SHORTS, "shorts.config.json")))
only = sys.argv[1:]
pieces = [p for p in cfg["pieces"] if not only or p["slug"] in only]

jobs = []
for p in pieces:
    for i, v in enumerate(p.get("vo", [])):
        jobs.append((f"{p['slug']}_{i}", v["say"]))
# One shared close, rendered once and reused by every piece. The spoken close
# was dropped (it cost 5.6s on every short), so this only runs if some piece
# still asks for one.
close = next((p["voClose"]["say"] for p in pieces if p.get("voClose")), None)
if not only and close:
    jobs.append(("_close", close))

os.chdir(VC)
import numpy as np, soundfile as sf
from mlx_audio.tts.utils import load_model
from mlx_audio.tts.generate import generate_audio

print(f"loading model for {len(jobs)} lines ...", file=sys.stderr, flush=True)
t0 = time.time()
MODEL = load_model(REPO)
REF, REFTXT = "ref/voice_cia.wav", open("ref/voice_cia.txt").read().strip()
print(f"model up in {time.time()-t0:.0f}s", file=sys.stderr, flush=True)

# Qwen3-TTS intermittently returns a take with garbage appended: a four-word
# question comes back four seconds long. It is not deterministic, so the same
# prompt re-rolled usually comes back clean. Rather than listen to 42 files, gate
# every take on two machine-checkable facts and re-roll the failures:
#   1. seconds-per-word inside a sane band
#   2. whisper hears the words that were asked for
# This is the canon rule about enforcing machine-testable requirements with a
# validator instead of trusting the generator's own output.
MAX_S_PER_WORD = 0.62
WHISPER = os.path.expanduser("~/.local/share/whisper.cpp/ggml-base.en.bin")
CLI = "/opt/homebrew/bin/whisper-cli"

def norm(t):
    return re.sub(r"[^a-z0-9 ]", "", t.lower()).split()

def heard(path):
    if not (os.path.exists(CLI) and os.path.exists(WHISPER)):
        return None
    r = subprocess.run([CLI, "-m", WHISPER, "-f", path, "-ng", "-nt"],
                       capture_output=True, text=True)
    return norm(r.stdout)

def take_ok(path, text, dur):
    words = len(text.split())
    # Seconds-per-word is meaningless on very short lines: "Congruent. Watch."
    # is two words, and the sentence-final pause alone pushes it past any sane
    # per-word rate. It re-rolled four times on a take that was fine. Below five
    # words, judge on an absolute ceiling and let whisper do the real work.
    too_long = (dur > 2.6) if words < 5 else (dur / words > MAX_S_PER_WORD)
    if too_long:
        return False, f"{dur:.2f}s for {words} words"
    h = heard(path)
    if h is None:
        return True, "duration only (no whisper)"
    want = norm(text)
    # allow small ASR slips; catch appended garbage and dropped clauses
    if abs(len(h) - len(want)) > max(2, 0.34 * len(want)):
        return False, f"heard {len(h)} words, wanted {len(want)}"
    return True, "ok"

tmp = os.path.join(OUT, "_tmp")
os.makedirs(tmp, exist_ok=True)
manifest = {}
for n, (key, text) in enumerate(jobs, 1):
    for f in glob.glob(f"{tmp}/{key}*"):
        os.remove(f)
    dst = os.path.join(OUT, f"{key}.wav")
    why = ""
    for attempt in range(4):
        for f in glob.glob(f"{tmp}/{key}*"):
            os.remove(f)
        generate_audio(text=text, model=MODEL, ref_audio=REF, ref_text=REFTXT,
                       instruct=None, temperature=TEMP + 0.06 * attempt, speed=SPEED,
                       output_path=tmp, file_prefix=key, audio_format="wav",
                       join_audio=True, verbose=False)
        got = sorted(glob.glob(f"{tmp}/{key}*.wav"))
        if not got:
            why = "no output"
            continue
        _x, _sr = sf.read(got[0])
        if _x.ndim > 1:
            _x = _x.mean(1)
        _a = np.abs(_x)
        _i = np.where(_a > 0.012)[0]
        if len(_i):
            _x = _x[max(0, _i[0] - int(0.03 * _sr)): min(len(_x), _i[-1] + int(0.12 * _sr))]
        sf.write(got[0], _x.astype(np.float32), _sr)
        ok, why = take_ok(got[0], text, len(_x) / _sr)
        if ok:
            break
        print(f"      re-roll {key}: {why}", file=sys.stderr, flush=True)
    if not got:
        print(f"[{n}/{len(jobs)}] NO OUTPUT: {key}", file=sys.stderr, flush=True)
        continue
    x, sr = sf.read(got[0])
    if x.ndim > 1:
        x = x.mean(1)
    x = x.astype(np.float32)
    # Trim leading/trailing silence so a line starts exactly on its beat. The
    # model pads inconsistently and untrimmed padding would drift the voice off
    # the caption it is supposed to land with.
    amp = np.abs(x)
    idx = np.where(amp > 0.012)[0]
    if len(idx):
        x = x[max(0, idx[0] - int(0.03 * sr)): min(len(x), idx[-1] + int(0.12 * sr))]
    peak = float(np.max(np.abs(x))) or 1.0
    x = x * (0.72 / peak)
    sf.write(dst, x, sr)
    manifest[key] = {"text": text, "dur": round(len(x) / sr, 3), "sr": sr, "gate": why}
    print(f"[{n:>2}/{len(jobs)}] {manifest[key]['dur']:5.2f}s  {key:26s} {text[:46]}",
          file=sys.stderr, flush=True)

shutil.rmtree(tmp, ignore_errors=True)
path = os.path.join(OUT, "manifest.json")
if only and os.path.exists(path):
    old = json.load(open(path)); old.update(manifest); manifest = old
json.dump(manifest, open(path, "w"), indent=1, sort_keys=True)
print(f"\n{len(manifest)} lines -> {path}", file=sys.stderr)
