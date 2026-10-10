---
title: "How to Check a UFO or UAP Video for AI Generation and Editing"
description: 'A practical, evidence-first way to vet a UFO/UAP clip before you share it: provenance, metadata, visual model, temporal and spectral signals, and what "inconclusive" really means for sky footage.'
slug: how-to-check-a-ufo-video-for-ai-or-editing
date: 2026-10-10
author: Verifyco Team
tags:
  - Guides
  - Deepfakes
  - Research
image: /uploads/blog/signals.png
imageAlt: Verifyco's evidence layers applied to a night-sky clip
updated: 2026-10-10
---

UFO and UAP footage is the hardest category we see. It is usually dark,
zoomed, shaky, re-encoded by three platforms and cropped by a fourth. Those are
exactly the conditions under which both "it's obviously fake" and "it's
obviously real" are overclaims. Here is how to look at such a clip with
evidence instead of vibes.

## Start with where the file came from

- **Content Credentials (C2PA).** A small but growing number of cameras and
  apps sign what they capture. A valid, trusted capture credential is the
  strongest single piece of evidence a clip can carry. A missing credential
  proves nothing: most phones still do not sign.
- **Metadata.** Camera make and model, lens, software, creation time. Unsigned
  metadata can be edited, so it supports a conclusion without deciding it. A
  file whose metadata names a generator or a composite is a different story.
- **Chain of custody.** A screen recording of a video of a video has lost
  every original artefact. Ask for the original file, not the repost.

## Then the content itself

- **Visual model.** A trained detector looks at learned patterns across the
  whole frame and its corners, on several sampled frames. It gives a reading,
  not a verdict; Verifyco only lets it decide together with other evidence.
- **Temporal consistency.** Does lighting, noise and motion blur behave the
  same way across frames? Sudden changes between sampled frames are a flag,
  not a verdict. This layer is experimental and carries no score weight today.
- **Frequency and compression traces.** Smooth, unnatural spectra can point to
  synthesis or heavy processing; night sky and sensor noise make this layer
  easy to misread, so it is weighted low and only ever negative.

## What a result on sky footage usually looks like

Most genuine-looking sky clips come back **inconclusive**, often "leans
authentic" when the capture context is intact, or "leans AI-generated" when a
layer found something. That is the honest outcome for degraded footage. A
confident "authentic" needs supporting evidence (a trusted credential, or a
complete camera fingerprint with a compatible visual reading); a confident
"manipulated" needs more than one independent negative or a decisive
declaration.

## A short checklist before you share

1. Get the original file if you can; analyse that, not the repost.
2. Check for Content Credentials and read the metadata layer.
3. Run the full analysis and read the layer breakdown, not just the number.
4. Treat "inconclusive" as "not enough evidence either way" and say so.
5. Keep the report; if the clip becomes a story, the evidence matters.

Verifyco runs all five layers on your iPhone for local files, and on
[web.verifyco.app](https://web.verifyco.app) for uploads; public links from
the big platforms can be pasted directly. Whatever you find, the result page
shows the evidence, and the score legend explains the band it landed in.
