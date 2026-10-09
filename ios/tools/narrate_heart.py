#!/usr/bin/env python
"""App narration in the series voice: Kokoro-82M "af_heart" (D-0625 for the shorts, D-0696 for the app).

Reads the lines the pages actually ask the app to speak (collected by
release-audit-2026-10-06/claude-verify/extract_lines.mjs into a JSON list of {id, text}),
renders each one, checks the words with the shorts gate (shorts/engine/vo_gate.py), and writes
Photon/Pieces/audio/<id>.m4a, which Narrator.swift plays in place of the system voice.

    <kokoro-venv>/bin/python tools/narrate_heart.py <lines.json> [id ...]

Needs: a venv with kokoro>=0.9, Homebrew espeak-ng, ffmpeg, afconvert, sandbox OFF (whisper on Metal).
Local and free; nothing leaves the Mac. Writes tools/narration_manifest.json with the measured
duration and the gate result of every line.
"""
import os, re, sys, json, subprocess, tempfile
import espeakng_loader
# The wheel's bundled data path is a CI runner path and hard-exits the process.
espeakng_loader.get_library_path = lambda: "/opt/homebrew/lib/libespeak-ng.dylib"
espeakng_loader.get_data_path = lambda: "/opt/homebrew/share/espeak-ng-data"
import numpy as np, soundfile as sf
from kokoro import KPipeline

HERE = os.path.dirname(os.path.abspath(__file__))
IOS = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(IOS, "..", "shorts", "engine"))
import vo_gate

VOICE = os.environ.get("VO_VOICE", "af_heart")
SPEED = float(os.environ.get("VO_SPEED", "0.88"))
OUT = os.path.join(IOS, "Photon", "Pieces", "audio")
WAV = os.environ.get("NARRATE_WAV_DIR") or tempfile.mkdtemp(prefix="heart_wav_")
os.makedirs(OUT, exist_ok=True); os.makedirs(WAV, exist_ok=True)
SR = 24000

# Spellings the voice needs to say a name the way a vision scientist does. The page text is not changed.
SAY_AS = {
    "Müller-Lyer": "Mueller Liar",
    "Muller-Lyer": "Mueller Liar",
    # "hold time" is said correctly either way; the hyphen stops the d from melting into the t ("whole time").
    "hold time": "hold-time",
}

def letter_a(t):
    """A square called "A" must be said as the letter, not as the article "a" (Kokoro's default mid-sentence).
    A capital A that opens a sentence is the article and is left alone."""
    def fix(m):
        before = t[:m.start()]
        return m.group(0) if (not before.strip() or re.search(r"[.!?]\s*$", before)) else "[A](/ˈA/)"
    return re.sub(r"\bA\b", fix, t)

# Lines where the transcriber mishears a take whose phonemes were read and are right. Rendered at the base
# speed, never re-rolled, and listed in the manifest with the reason.
ACCEPT = {
    "motion-aftereffect-1": 'phonemes "ɹˈidz æz stˈɛdi" are correct; whisper merges "reads as steady" into "reads a steady"',
}

# Whisper writes American spellings and the pages are written in British ones. Same word, same sound.
SPELL = {"grey": "gray", "centre": "center", "centres": "centers", "colour": "color", "colours": "colors",
         "coloured": "colored", "neighbour": "neighbor", "neighbours": "neighbors", "neighbouring": "neighboring",
         "metre": "meter", "metres": "meters", "judgement": "judgment", "towards": "toward", "afterwards": "afterward",
         "recognise": "recognize", "realise": "realize", "organise": "organize", "equalise": "equalize",
         "ok": "okay", "disk": "disc", "disks": "discs"}
def loose(t):
    w = vo_gate.norm(t)
    w = w.split() if isinstance(w, str) else list(w)
    return [SPELL.get(x, x) for x in w]

lines = json.load(open(sys.argv[1]))
only = sys.argv[2:]
jobs = [(l["id"], l["text"]) for l in lines if not only or l["id"] in only]

pipe = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")
path = os.path.join(HERE, "narration_manifest.json")   # beside this script, not in the app bundle
manifest = json.load(open(path)) if os.path.exists(path) else {}
bad = []
for n, (key, text) in enumerate(jobs, 1):
    spoken = text
    for a, b in SAY_AS.items():
        spoken = spoken.replace(a, b)
    spoken = letter_a(spoken)
    wav = os.path.join(WAV, f"{key}.wav")
    ok, why, heard = False, "", ""
    for attempt in range(4):
        # Kokoro is deterministic for a given speed, so a re-roll nudges the speed.
        sp = SPEED + 0.02 * attempt
        got = list(pipe(spoken, voice=VOICE, speed=sp))
        phon = " ".join(ps for _, ps, _ in got)
        x = np.concatenate([np.asarray(a) for _, _, a in got]).astype(np.float32)
        idx = np.where(np.abs(x) > 0.012)[0]
        x = x[max(0, idx[0] - int(0.03 * SR)): min(len(x), idx[-1] + int(0.12 * SR))]
        x = x * (0.72 / (float(np.max(np.abs(x))) or 1.0))
        sf.write(wav, x, SR)
        tmp16 = wav + ".16k.wav"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", wav, "-ar", "16000", "-ac", "1", tmp16], check=True)
        ok, why, heard = vo_gate.content_ok(tmp16, text)      # judged against the page text, not the respelling
        os.remove(tmp16)
        if ok is False and loose(heard) == loose(text):
            ok, why = True, "large exact, spelling only"
        if ok is False and key in ACCEPT:
            ok, why = True, "accepted: " + ACCEPT[key]
        if ok is not False:
            break
        print(f"      re-roll {key}: {why} | heard: {heard}", file=sys.stderr, flush=True)
    if ok is False:
        bad.append(key)
    dst = os.path.join(OUT, f"{key}.m4a")
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "56000", "-c", "1", wav, dst], check=True)
    manifest[key] = {"text": text, "spoken": spoken, "dur": round(len(x) / SR, 2), "gate": why, "phonemes": phon,
                     "heard": heard if ok is False else "", "voice": VOICE, "speed": round(sp, 2)}
    print(f"[{n:>2}/{len(jobs)}] {manifest[key]['dur']:6.2f}s  {key:30s} {why:16s} {text[:46]}", file=sys.stderr, flush=True)

json.dump(manifest, open(path, "w"), indent=1, sort_keys=True, ensure_ascii=False)
print(f"\n{len(manifest)} lines in {path}; gate failures this run: {bad or 'none'}; wavs in {WAV}", file=sys.stderr)
sys.exit(1 if bad else 0)
