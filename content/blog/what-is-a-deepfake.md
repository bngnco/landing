---
title: What Is a Deepfake? A Plain-English Guide (2026)
description: "Deepfakes explained simply: what they are, how they're made, why they've become so convincing, the real-world risks, and how to tell a synthetic face or voice from the real thing."
slug: what-is-a-deepfake
date: 2026-06-22
author: Verifyco Team
tags:
  - Deepfakes
  - Guides
image: /assets/app/deepfake.png
imageAlt: Side-by-side authentic and deepfaked portrait under forensic comparison
updated: 2026-07-01
---

A **deepfake** is media — usually a video, image or voice clip — in which a
machine-learning model has swapped, generated or altered a person so it looks or
sounds like they did or said something that never happened. The name is a blend
of _deep learning_ and _fake_.

A few years ago deepfakes were a novelty that needed a powerful GPU and real
technical skill. Today they're a few taps away in a consumer app, and the best
ones are genuinely hard to catch by eye. This guide explains what they are, how
they're made, why they've gotten so convincing, where the real risks are, and the
practical ways to tell synthetic media from the real thing.

## The three kinds of deepfake

Most deepfakes fall into three buckets:

- **Face swaps** — one person's face mapped onto another's body in a photo or
  video. The classic "celebrity in a scene they were never in."
- **Full generation** — a person, object or entire scene created from scratch by
  a **diffusion model**. Nobody filmed anything; there is no original.
- **Voice cloning** — a few seconds of reference audio is enough to synthesise
  someone saying anything, increasingly in real time on a phone call.

Modern "face reenactment" blends these: it drives a target's face with a
performer's expressions, so a real photo of a person can be made to talk.

## How deepfakes are made (in one paragraph)

The models learn from **large datasets** of real faces, voices and scenes, then
generate new frames that are _statistically plausible_ — pixels and sound that
match the patterns of reality closely enough to fool us. A GAN pits a
"generator" against a "detector" until the fakes pass; a diffusion model starts
from noise and denoises toward a convincing image guided by a text prompt. You
don't need to know the math — just the consequence: the output is engineered to
look real, which is why your eyes are not a reliable detector.

[[cta]]

## Why they've gotten so good

Two things changed at once:

1. **The models got dramatically better** at fine detail — skin texture, hair,
   lighting, lip-sync — closing the "uncanny valley."
2. **The tools got easy.** What once needed a GPU and a weekend now runs in an
   app with a single photo. Real-time face-swap on live video and phone calls is
   now practical.

The classic giveaways — flickering edges, dead eyes, garbled hands, robotic
voices — are mostly gone in current-generation output. That doesn't mean the
evidence is gone; it moved somewhere your eyes can't go (more on that below).

## Why it matters: the real-world risks

Deepfakes aren't just memes. The documented harms include:

- **Fraud and scams** — cloned voices of executives or family members ("grandkid
  in trouble") authorising transfers or payments.
- **Non-consensual imagery** — the largest category of deepfake abuse by volume,
  overwhelmingly targeting women.
- **Disinformation** — fabricated clips of politicians or "war footage" timed to
  spread before anyone can debunk them.
- **Identity and KYC bypass** — synthetic faces defeating weak "liveness" checks.

The defence isn't panic — it's **verification habits** plus tooling.

## How to tell if something is a deepfake

You can't reliably eyeball modern deepfakes, so lean on a process instead of a
gut feeling:

1. **Consider the source.** Where did this actually come from, and does a credible
   outlet carry it?
2. **Look for provenance.** **C2PA Content Credentials** are a signed receipt of
   origin — their presence is a strong signal _for_ authenticity.
3. **Inspect the details** (for images: hands, text, reflections; for video:
   edges, blinking, lip-sync). See the step-by-step in
   [how to tell if an image is AI-generated](/blog/how-to-tell-if-an-image-is-ai-generated)
   and [5 signs a video has been deepfaked](/blog/5-signs-a-video-has-been-deepfaked).
4. **Run a forensic check.** Tools that fuse multiple signals — metadata, face
   analysis, frequency patterns — catch what your eyes can't.

### What actually works: signal fusion

No single check is decisive. A stripped EXIF proves nothing on its own; one odd
frame isn't a verdict. Reliable detection **combines** independent signals —
provenance, metadata, neural face analysis, motion consistency and the
frequency-spectrum fingerprint — into one score. Any layer can be fooled; all of
them at once is hard.

## Frequently asked questions

**Are deepfakes illegal?** It depends on use and jurisdiction. Fraud,
defamation and non-consensual intimate imagery are illegal in many places;
laws targeting deepfakes specifically are expanding.

**Can deepfakes be detected automatically?** Yes — imperfectly but usefully.
Detection and generation are a cat-and-mouse race, which is why fusing several
signals (rather than one "AI detector") is the robust approach.

**Do watermarks solve it?** They help when present (e.g. C2PA), but watermarks
can be cropped or absent, so they're one signal among several, not a silver
bullet.

## The bottom line

A deepfake is synthetic media designed to be believed. You can't outrun it with
your eyes, but you can with **habits and tools**: check the source, look for
provenance, and run a forensic check before you trust — or share — anything.

That last point is the whole idea behind Verifyco: a fast, on-device second
opinion that fuses five forensic signals into a single trust score, entirely on
your iPhone. Curious why "on-device" matters for privacy and speed? Read
[on-device verification, explained](/blog/on-device-verification-explained).
