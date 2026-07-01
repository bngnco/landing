---
title: "How to Tell If an Image Is AI-Generated (2026 Forensic Guide)"
description: "A practical, forensic checklist for spotting AI-generated images — the visual artifacts, metadata clues and frequency signals that still give synthetic pictures away."
slug: how-to-tell-if-an-image-is-ai-generated
date: 2026-06-28
updated: 2026-07-01
author: "Verifyco Team"
tags: ["AI Detection", "Deepfakes", "Guides"]
image: /assets/app/face.png
imageAlt: "Forensic face analysis overlay highlighting AI-generation artifacts"
---

AI image generators got good — fast. The obvious tells from a couple of years ago
(six-fingered hands, melted text, plastic skin) are mostly gone, and a convincing
fake now takes seconds and no skill to produce. Photorealistic people who never
existed, "photos" of events that never happened, product shots, ID pictures,
screenshots — all of it can be synthesised on a phone.

The good news: **generated images still leave evidence.** You just have to know
where to look, and — crucially — not rely on any single clue. This guide walks
through the checks a forensic tool runs, in the order that actually works, so you
can reason about an image instead of guessing.

> **TL;DR** — No single sign is proof. Confidence comes from *stacking* several
> independent signals: visual artifacts, metadata/provenance, and the image's
> frequency fingerprint. If two or three disagree with "this is a real photo,"
> treat it as suspect.

## 1. Zoom in on the hard parts

Generators are brilliant at *local* plausibility and weak at *global*
consistency — keeping every part of a scene agreeing with every other part. So
magnify the image to 200–400% and inspect the places that require the picture to
"know" the whole scene:

- **Hands, teeth and ears.** Counts and proportions still drift — an extra
  knuckle, a tooth that merges into the next, an earring with no ear behind it.
- **Text in the scene.** Signage, labels, book spines and logos often dissolve
  into confident-looking pseudo-letters. Real text stays crisp when you zoom.
- **Reflections and shadows.** Light has to obey one direction. A face lit warm
  in cool surroundings, shadows pointing different ways, or a mirror/eye
  reflection that doesn't match the scene are strong tells.
- **Fine, repeating texture.** Hair strands, foliage, crowds and fabric weaves
  can show an uncanny, tiling-like repetition or a "melting" transition.
- **Where two things meet.** Boundaries — hair against background, glasses
  against skin, fingers against a cup — are where blending errors hide.

Train your eye, but don't trust it alone: the best current models pass a casual
look. Visual inspection narrows things down; it rarely settles them.

## 2. Check the metadata and provenance

Every real camera writes a trail. AI images usually don't — or they write the
wrong one.

| Signal | What it means |
| --- | --- |
| **Missing EXIF** (no camera make/model, lens, exposure, GPS) on a "photo" | Suspicious — real captures almost always carry it |
| **Editing software in the metadata** | Not proof of fakery, but shows the file was processed |
| **AI generator signatures** (a `Software`/`parameters` field naming a model) | Strong evidence it was generated |
| **C2PA Content Credentials** present and valid | Strong evidence *for* authenticity — a signed record of origin |

The catch: metadata can be stripped or forged, and social platforms remove most
of it on upload. So **absence isn't proof** — it just shifts the burden of
evidence. Presence of a valid **C2PA "Content Credential"** (a cryptographic
receipt from the camera or editor) is the most trustworthy positive signal you
can get. Learn more about how provenance fits the bigger picture in
[what is a deepfake](/blog/what-is-a-deepfake).

[[cta]]

## 3. Read the frequency fingerprint

This is the part you can't do by eye. When you view an image as a **frequency
spectrum** (via a discrete cosine transform, the same math behind JPEG), diffusion
and GAN models leave statistical regularities that light captured through a real
lens does not. Upscalers and "AI enhance" filters leave their own periodic
patterns.

A spectral analysis surfaces these traces **even when the picture looks flawless**
at normal magnification — which is exactly why forensic tools weight it heavily.
You won't run an FFT in your head, but it's the reason automated detection can
catch fakes that beat human reviewers.

## 4. Use context and reverse search

Forensics isn't only pixels. Two fast, free checks:

- **Reverse image search.** If a "breaking news" photo has no credible source and
  appears only on fringe accounts, that's a red flag. If it traces back to a
  stock library or an AI gallery, case closed.
- **Cross-check the claim.** Does anything in the image contradict known facts —
  a landmark in the wrong city, clothing out of season, a logo that changed years
  ago? Generators don't fact-check.

## 5. Fuse the signals — never rely on one

The mistake most people make is hunting for a single smoking gun. Modern
detection works by **fusion**: combining provenance, metadata forensics, neural
face/scene analysis and frequency analysis into one score. Any one layer can be
fooled — a stripped EXIF, a lucky clean render, a re-compressed spectrum — but
fooling *all of them at once* is much harder.

### A quick field checklist

1. Zoom to 200%+ — inspect hands, text, reflections, edges.
2. Open the metadata — EXIF present? Any generator signature? Any C2PA credential?
3. Run a forensic/frequency check if you have a tool.
4. Reverse-search the image and sanity-check the claim.
5. Weigh it up — do the signals agree, or is something off?

## Common mistakes to avoid

- **"It has EXIF, so it's real."** EXIF can be copied or faked. It's supporting
  evidence, not a verdict.
- **"It looks perfect, so it's real."** Perfect is now easy. Looking flawless is
  not evidence of authenticity.
- **"One weird hand, so it's fake."** Real photos have odd crops and motion blur
  too. Use it as a prompt to look closer, not a conclusion.

## Do it in seconds, not minutes

Running these checks by hand is slow, and the frequency step is impossible without
software. That's exactly what Verifyco is for: it fuses **five** forensic signals
— content credentials, metadata forensics, neural face analysis, motion/temporal
checks and frequency analysis — into a single 0–100 trust score, entirely
**on your iPhone**, so nothing is uploaded.

Next, learn the video-specific tells in
[5 signs a video has been deepfaked](/blog/5-signs-a-video-has-been-deepfaked),
or see why it all runs privately in
[on-device verification, explained](/blog/on-device-verification-explained).
