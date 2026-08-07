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
import os, sys, json, glob, time, shutil

SHORTS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VC = os.path.expanduser("~/Developer/voice-clone")
OUT = os.path.join(SHORTS, "audio", "vo")
os.makedirs(OUT, exist_ok=True)

REPO = "mlx-community/Qwen3-TTS-12Hz-1.7B-Base-bf16"
# 0.95 rather than the 0.92 used for the SnakePharm narration: these are
# instructions to follow in real time, not narration to sit back in.
SPEED, TEMP = 0.95, 0.5

cfg = json.load(open(os.path.join(SHORTS, "shorts.config.json")))
only = sys.argv[1:]
pieces = [p for p in cfg["pieces"] if not only or p["slug"] in only]

jobs = []
for p in pieces:
    for i, v in enumerate(p.get("vo", [])):
        jobs.append((f"{p['slug']}_{i}", v["say"]))
# One shared close, rendered once and reused by every piece.
if not only:
    jobs.append(("_close", pieces[0]["voClose"]["say"]))

os.chdir(VC)
import numpy as np, soundfile as sf
from mlx_audio.tts.utils import load_model
from mlx_audio.tts.generate import generate_audio

print(f"loading model for {len(jobs)} lines ...", file=sys.stderr, flush=True)
t0 = time.time()
MODEL = load_model(REPO)
REF, REFTXT = "ref/voice_cia.wav", open("ref/voice_cia.txt").read().strip()
print(f"model up in {time.time()-t0:.0f}s", file=sys.stderr, flush=True)

tmp = os.path.join(OUT, "_tmp")
os.makedirs(tmp, exist_ok=True)
manifest = {}
for n, (key, text) in enumerate(jobs, 1):
    for f in glob.glob(f"{tmp}/{key}*"):
        os.remove(f)
    t1 = time.time()
    generate_audio(text=text, model=MODEL, ref_audio=REF, ref_text=REFTXT,
                   instruct=None, temperature=TEMP, speed=SPEED,
                   output_path=tmp, file_prefix=key, audio_format="wav",
                   join_audio=True, verbose=False)
    got = sorted(glob.glob(f"{tmp}/{key}*.wav"))
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
    dst = os.path.join(OUT, f"{key}.wav")
    sf.write(dst, x, sr)
    manifest[key] = {"text": text, "dur": round(len(x) / sr, 3), "sr": sr}
    print(f"[{n:>2}/{len(jobs)}] {manifest[key]['dur']:5.2f}s  {key:26s} {text[:46]}",
          file=sys.stderr, flush=True)

shutil.rmtree(tmp, ignore_errors=True)
path = os.path.join(OUT, "manifest.json")
if only and os.path.exists(path):
    old = json.load(open(path)); old.update(manifest); manifest = old
json.dump(manifest, open(path, "w"), indent=1, sort_keys=True)
print(f"\n{len(manifest)} lines -> {path}", file=sys.stderr)
