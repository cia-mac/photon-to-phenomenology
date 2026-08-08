#!/usr/bin/env python3
"""Synthesise the music bed and mix the finished audio track for each short.

Procedural, not licensed. Every tone here is generated from first principles, so
there is no Content ID exposure on nineteen pieces going to two platforms, and
the bed can be regenerated at any length when a piece's timing changes. A
library cue would have to be re-cleared and re-cut every time.

The bed is deliberately almost nothing:

  OPEN MARK   a soft low bell at t=0. This is the "it has started" signal Cia
              asked for. It has to arrive in the first frames, because on a
              feed the viewer decides in about a second whether this is a video
              or a still.
  DRONE       a sustained fifth, very low, breathing slowly. Present enough to
              feel like the piece is running, quiet enough that it never
              competes with the stimulus. These are perception tests: anything
              rhythmic would pull attention off the figure and change what the
              viewer sees, which would make the piece dishonest.
  REVEAL MARK a higher bell on the reveal beat. Marks the answer.
  CLOSE       the drone lifts a little under the end card, then falls away.

House rules applied (agent memory feedback_audio_conservative_defaults):
drive capped low, no metallic FM percussion, sustained sources sit below
transients. Bells are sine partials with a fast attack and a long exponential
decay, which is a struck-bar sound, not an FM bell.

The voice is ducked in: the bed drops under every spoken line so the words stay
intelligible on a phone speaker.

    python3 engine/music.py            all pieces
    python3 engine/music.py ponzo      one piece

Writes audio/mix/<slug>.wav at 48k stereo, ready to mux.
"""
import os, sys, json, math, subprocess, wave, struct, array

SHORTS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000

cfg = json.load(open(os.path.join(SHORTS, "shorts.config.json")))
vman = json.load(open(os.path.join(SHORTS, "audio", "vo", "manifest.json")))
MIX = os.path.join(SHORTS, "audio", "mix")
os.makedirs(MIX, exist_ok=True)

# Timing must match engine/short.mjs exactly or the audio drifts off the video.
PAD_AFTER_VO, PAD_AFTER_CLOSE, CLOSE_IN, SILENT_CARD = 0.5, 0.9, 0.5, 2.2


def fit(p):
    last = 0.0
    for i, v in enumerate(p.get("vo", [])):
        e = vman.get(f"{p['slug']}_{i}")
        if e:
            last = max(last, v["t"] + e["dur"])
    spoken = bool(p.get("voClose")) and "_close" in vman
    end = max(p["end"], round(last + PAD_AFTER_VO, 2))
    dur = (round(end + CLOSE_IN + vman["_close"]["dur"] + PAD_AFTER_CLOSE, 2) if spoken
           else round(end + SILENT_CARD, 2))
    return end, dur


def read_wav_mono(path):
    """Decode any wav to mono float at SR via ffmpeg, avoiding a numpy/soundfile
    dependency in system python (the TTS venv has them, this script must not)."""
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR),
         "-f", "f32le", "-"], capture_output=True).stdout
    a = array.array("f")
    a.frombytes(raw)
    return a


def env_bell(n, decay):
    """Struck-bar envelope: 8ms attack, exponential decay."""
    atk = int(0.008 * SR)
    return [(i / atk if i < atk else math.exp(-(i - atk) / (decay * SR))) for i in range(n)]


def render(p):
    end, dur = fit(p)
    N = int(dur * SR)
    L = [0.0] * N
    R = [0.0] * N

    def add_bell(t0, freq, amp, decay):
        s = int(t0 * SR)
        n = min(int(decay * 4 * SR), N - s)
        if n <= 0:
            return
        e = env_bell(n, decay)
        for i in range(n):
            ph = 2 * math.pi * (i / SR)
            # fundamental plus two quiet inharmonic partials: a bar, not a sine beep
            v = (math.sin(ph * freq)
                 + 0.30 * math.sin(ph * freq * 2.76)
                 + 0.14 * math.sin(ph * freq * 5.40)) * e[i] * amp
            L[s + i] += v
            R[s + i] += v

    # ---- open mark: the "it started" signal, first frame
    add_bell(0.0, 146.83, 0.20, 1.9)          # D3

    # ---- drone: a low fifth, slowly breathing, wide but not hollow
    f1, f2 = 55.0, 82.41                       # A1 and E2
    for i in range(N):
        t = i / SR
        # fade in over 0.5s, lift slightly under the end card, fall away at the tail
        g = min(1.0, t / 0.5)
        g *= 1.0 if t < end else 1.25
        tail = dur - 0.9
        if t > tail:
            g *= max(0.0, (dur - t) / 0.9)
        breathe = 1.0 + 0.14 * math.sin(2 * math.pi * t / 11.0)
        ph = 2 * math.pi * t
        a = math.sin(ph * f1) * 0.55 + math.sin(ph * f2) * 0.32
        a += 0.10 * math.sin(ph * f1 * 2)
        v = a * 0.052 * g * breathe
        # a few cents of detune between channels for width, no phase tricks
        vr = (math.sin(ph * f1 * 1.002) * 0.55 + math.sin(ph * f2 * 1.002) * 0.32
              + 0.10 * math.sin(ph * f1 * 2.004)) * 0.052 * g * breathe
        L[i] += v
        R[i] += vr

    # ---- reveal mark
    rev = p["sweep"]["at"] if p.get("sweep") else (
        p["countdown"]["until"] if p.get("countdown") else None)
    if rev is not None and rev < end:
        add_bell(rev, 293.66, 0.13, 2.6)       # D4, an octave over the open mark

    # ---- voice, with the bed ducked under every line
    lines = []
    for i, v in enumerate(p.get("vo", [])):
        e = vman.get(f"{p['slug']}_{i}")
        if e:
            lines.append((v["t"], os.path.join(SHORTS, "audio", "vo", f"{p['slug']}_{i}.wav"), e["dur"]))
    if p.get("voClose") and "_close" in vman:
        lines.append((end + CLOSE_IN, os.path.join(SHORTS, "audio", "vo", "_close.wav"), vman["_close"]["dur"]))

    duck = [1.0] * N
    for t0, path, d in lines:
        s, n = int(t0 * SR), int(d * SR)
        ramp = int(0.18 * SR)
        for i in range(max(0, s - ramp), min(N, s + n + ramp)):
            # -8 dB under the voice, ramped so the duck is never audible as a pump
            near = min(abs(i - (s - ramp)), abs(i - (s + n + ramp)))
            k = min(1.0, near / ramp) if near < ramp else 1.0
            duck[i] = min(duck[i], 1.0 - 0.6 * k)
    for i in range(N):
        L[i] *= duck[i]
        R[i] *= duck[i]

    for t0, path, d in lines:
        if not os.path.exists(path):
            continue
        v = read_wav_mono(path)
        s = int(t0 * SR)
        for i in range(min(len(v), N - s)):
            L[s + i] += v[i] * 0.92
            R[s + i] += v[i] * 0.92

    # ---- soft limiter, then write
    peak = max(max(abs(x) for x in L), max(abs(x) for x in R)) or 1.0
    g = min(1.0, 0.89 / peak)
    out = os.path.join(MIX, f"{p['slug']}.wav")
    with wave.open(out, "w") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        frames = bytearray()
        for i in range(N):
            frames += struct.pack("<hh",
                int(max(-1, min(1, L[i] * g)) * 32767),
                int(max(-1, min(1, R[i] * g)) * 32767))
        w.writeframes(bytes(frames))
    return out, dur


only = sys.argv[1:]
for p in cfg["pieces"]:
    if only and p["slug"] not in only:
        continue
    out, dur = render(p)
    print(f"{os.path.basename(out):32s} {dur:6.2f}s")
