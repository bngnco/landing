---
title: "5 Signs a Video Has Been Deepfaked (+ How to Check)"
description: "A practical checklist for spotting deepfaked video — the edge artifacts, lip-sync drift, lighting tells, unnatural motion and audio clues that still give synthetic clips away."
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
updated: 2026-07-01
author: "Verifyco Team"
tags: ["Deepfakes", "AI Detection", "Guides"]
image: /uploads/blog/signals.png
imageAlt: "Verifyco signal pipeline analysing a video frame by frame"
---

Video is harder to fake convincingly than a still image — there are simply more
frames to keep consistent, and motion, lighting and audio all have to agree
across time. That's good news for you: deepfaked video still leaves tells,
especially in movement and sound. Here are the five most reliable signs, how to
check each one, and why no single sign is a verdict on its own.

> **How to inspect any clip:** download it (screen-recording re-compresses and
> hides artifacts), play at 0.25× speed, and step frame by frame. Full screen,
> brightness up. Most tells live in the transitions between frames, not in any
> single paused image.

## 1. Edges that shimmer or "breathe"

Watch the boundary where the face meets hair, ears, glasses or the background.
Face-swap models blend a generated face onto a real head every frame, and that
seam often **flickers, warps or shifts** slightly between frames — a subtle
"breathing" around the jaw, hairline or neck. Pause on a fast head-turn or when a
hand passes in front of the face: that's where blending breaks down.

## 2. Lip-sync that drifts

Audio and mouth shapes can fall fractionally out of step, especially on plosive
sounds (**p, b, m**) where the lips should fully close. Watch the mouth with the
sound off, then with it on. Warning signs:

- Lips that don't quite close on "m"/"b" sounds.
- Teeth and the inside of the mouth that look smeared, static or oddly uniform.
- A voice that's *almost* synced but consistently a hair early or late.

## 3. Lighting and colour that don't agree

Real light obeys one physics across the whole scene. In composited or generated
video the face may not match its environment:

- Skin lit warm while the room is cool (or vice-versa).
- Shadows on the face pointing a different way than shadows in the scene.
- A face that stays evenly lit while the person moves through light and shade.
- A faint colour "halo" or mismatched grain/noise where the face was inserted.

[[cta]]

## 4. Unnatural motion, blinking and micro-expressions

Faces do tiny things constantly — blink at a natural rate, make micro-expressions,
move the head with subtle jitter. Synthetic faces often get this subtly wrong:

- **Blink rate** too low (early deepfakes barely blinked) or mechanically regular.
- **Eyes** that don't track where the person is "looking," or a fixed,
  glassy gaze.
- **Too-smooth or too-still** motion — an eerie steadiness, or a face that seems
  to float slightly relative to the head.
- **Frozen forehead/ears** while the mouth moves a lot.

## 5. Missing provenance and suspicious metadata

Step away from the pixels and check the file and its origin:

- A clip that claims to be a real recording but carries **no camera metadata**,
  or metadata that contradicts the story (wrong date, wrong device, editing
  software).
- No credible source — it appears only on anonymous or fringe accounts, with no
  outlet carrying it.
- Conversely, valid **C2PA Content Credentials** are evidence *for* authenticity.

## Bonus: listen to the audio

Voice cloning has its own artifacts. With headphones, listen for a flat,
"even" delivery with little breath, odd pacing or emphasis, a subtle metallic
ring, or background noise that cuts unnaturally between words. Audio-only scams
(the "family member in trouble" call) rely on you not listening this closely.

## What a forensic tool does automatically

You can catch a lot by eye, but software goes where you can't:

- **Optical-flow & temporal consistency** — checks that objects move the way real
  objects do, frame to frame.
- **Frame-by-frame neural face analysis** — flags the subtle artifacts blending
  leaves behind.
- **Frequency analysis** — the statistical fingerprint of generative models,
  invisible to the eye.
- **Metadata & provenance** — EXIF, encoding consistency and C2PA in one pass.

For the image-specific version of these checks, see
[how to tell if an image is AI-generated](/blog/how-to-tell-if-an-image-is-ai-generated);
for the background on how these fakes are built, see
[what is a deepfake](/blog/what-is-a-deepfake).

### Quick checklist

1. Download, slow to 0.25×, step frame by frame.
2. Watch the face **edges** on head-turns and occlusions.
3. Check **lip-sync** on p/b/m sounds; inspect teeth/mouth interior.
4. Compare **lighting/shadow** on the face vs the scene.
5. Watch **blinking, gaze and micro-motion**.
6. Check the **source and metadata**; listen to the **audio** on headphones.

## The bottom line

No single sign is proof — real clips have compression, motion blur and odd crops
too. The reliable approach is to **combine** the signals, which is exactly what a
forensic tool does: it fuses several independent checks into one verdict instead
of betting on a single tell. Verifyco runs that fusion on your iPhone in seconds,
fully offline — see [on-device verification, explained](/blog/on-device-verification-explained).
