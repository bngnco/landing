---
title: "How to Tell If an Image Is AI-Generated"
description: "A practical, forensic checklist for spotting AI-generated images — from telltale visual artifacts to the metadata and signals that actually hold up."
slug: how-to-tell-if-an-image-is-ai-generated
date: 2026-06-28
author: "Verifyco Team"
tags: ["AI Detection", "Deepfakes", "Guides"]
image: /assets/app/face.png
imageAlt: "Forensic face analysis overlay highlighting AI-generation artifacts"
---

AI image generators have gotten good — fast. The obvious tells from a year ago
(six-fingered hands, melted text) are mostly gone, and a convincing fake now
takes seconds to produce. The good news: generated images still leave evidence.
You just have to know where to look.

This is a quick field guide. Treat it as a **checklist**, not a verdict — no
single sign is proof on its own. Real confidence comes from stacking multiple
independent signals.

## 1. Look closely at the hard parts

Generators struggle with details that require *global consistency* rather than
local plausibility. Zoom in and check:

- **Hands, teeth and ears** — counts and proportions still drift.
- **Text in the scene** — signage, labels and logos often dissolve into
  pseudo-letters under magnification.
- **Reflections and shadows** — light direction that doesn't agree across the
  frame is a strong tell.
- **Repeating textures** — hair, foliage and crowds can show uncanny,
  tiling-like repetition.

[[cta]]

## 2. Check the metadata

Every real camera writes a trail. AI images usually don't — or they write the
wrong one.

- Missing **EXIF** (no camera make/model, no lens, no exposure) on a photo that
  claims to be a snapshot is suspicious.
- Generator signatures sometimes appear directly in the metadata, e.g. a
  `Software` field naming the tool.
- **C2PA Content Credentials** are the opposite signal: a cryptographically
  signed receipt that proves where a file came from. Their presence is strong
  evidence *for* authenticity.

> Metadata can be stripped or faked, so absence isn't proof — but it shifts the
> burden of evidence.

## 3. Read the frequency fingerprint

This is the part you can't do by eye. Diffusion and GAN models leave
statistical patterns in an image's **frequency spectrum** — regularities that
don't occur in light captured through a real lens. A spectral (DCT) analysis
surfaces these even when the image looks flawless at normal magnification.

## 4. Don't trust a single signal

The mistake most people make is hunting for one smoking gun. Modern detection
works by **fusion**: combining content credentials, metadata forensics, neural
face analysis and frequency analysis into one score. Any one layer can be
fooled; all of them at once is much harder.

That's exactly how Verifyco works — five independent signals on-device, fused
into a single 0–100 trust score, so you get a verdict you can actually reason
about.
