---
title: "What Is a Deepfake? A Plain-English Guide"
description: "Deepfakes explained simply: how they're made, why they've gotten so convincing, and the practical ways to tell a synthetic face or voice from the real thing."
slug: what-is-a-deepfake
date: 2026-06-22
author: "Verifyco Team"
tags: ["Deepfakes", "Guides"]
image: /assets/app/deepfake.png
imageAlt: "Side-by-side authentic and deepfaked portrait under forensic comparison"
---

A **deepfake** is media — usually a video, image or voice clip — where a
machine-learning model has swapped, generated or altered a person so it looks or
sounds like they did something they never did. The name is a blend of *deep
learning* and *fake*.

A few years ago deepfakes were a novelty. Today they're a few taps away, and the
best ones are genuinely hard to catch by eye. Here's what's actually going on.

## How deepfakes are made

Most fall into three buckets:

- **Face swaps** — one person's face mapped onto another's body in a video.
- **Full generation** — a person (or a whole scene) created from scratch by a
  diffusion model. Nobody filmed anything.
- **Voice cloning** — a few seconds of audio is enough to synthesise someone
  saying anything.

The models learn from large datasets of real faces and voices, then generate new
frames that are *statistically plausible* — which is exactly why they fool us.

[[cta]]

## Why they've gotten so good

Two things changed: the models got dramatically better at fine detail, and the
tools got easy. What used to need a GPU and a weekend now runs in an app. The
classic giveaways — flickering edges, dead eyes, garbled hands — are mostly
gone in current-generation output.

## How to protect yourself

You can't reliably eyeball modern deepfakes, so lean on process instead:

1. **Consider the source.** Where did this actually come from?
2. **Look for provenance.** Content Credentials (C2PA) are a signed receipt of
   origin — their presence is a strong signal *for* authenticity.
3. **Run a forensic check.** Tools that fuse multiple signals — metadata, face
   analysis, frequency patterns — catch what your eyes can't.

That last point is the whole idea behind Verifyco: a fast, on-device second
opinion before you trust — or share — a piece of media.
