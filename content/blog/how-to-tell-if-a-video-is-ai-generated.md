---
title: "How to Tell if a Video Is AI-Generated (2026 Guide)"
description: "Sora-class models now make video from a text prompt. Learn how to tell if a video is AI-generated: physics tells, texture artifacts, provenance checks and forensic tools."
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
updated: 2026-07-03
author: "Verifyco Team"
tags:
  - AI Detection
  - Guides
image: ''
imageAlt: "Analysing a video on iPhone to tell if it is AI-generated"
---

A deepfake used to mean one thing: a real video with a swapped face. That era is over. Text-to-video models — Sora, Veo and their open-source successors — now generate **entire scenes from a prompt**: the people, the room, the lighting, the camera move, none of it ever existed. These fully synthetic videos fail differently than face swaps, so they need their own checklist.

That's what this guide is. (If you're checking a video of a *specific real person* saying something, you want the face-swap tells in [how to spot a deepfake video](/blog/how-to-spot-a-deepfake-video) too — real cases mix both.)

## First, check the frame for the easy tells

Download the clip if you can (screen-recording re-compresses and hides evidence), play it slow, full-screen, bright. Then look for:

- **Text and signage.** Generated worlds still mangle writing — shop signs, jerseys, license plates and labels that look right at a glance and dissolve into pseudo-letters when you pause. Consistent, readable text throughout a clip is genuinely hard to fake.
- **Hands, fingers, and object handoffs.** Fingers that merge, cutlery that melts into food, objects that pass *through* hands. Interactions between things remain the weak point.
- **Background people.** Extras are cheap for the model but poorly supervised: watch for walkers who glide, repeat, or blend into each other.
- **Symmetry and physics of reflections.** Mirrors, windows, water and sunglasses often reflect a *plausible* scene rather than *the* scene. If a reflection disagrees with the world, that's decisive.
- **Too-smooth motion.** Generated video often has a floaty, dreamlike camera and subjects with slightly slowed, weightless movement — nothing jolts, nothing shakes convincingly.

## Then check object permanence

This is the most reliable class of tells for fully generated video. Real objects persist; generated ones only *tend to*.

Scrub through the clip and track one object — a cup, a button, a tattoo, an earring. In AI video it may **change shape, jump position, vanish, or transform into something else** between shots or even between seconds. Count things: fingers, wheels, chair legs, window panes. Recount five seconds later. Real videos never disagree with themselves; generative models still do, especially past the ten-second mark, which is also why so many synthetic clips are suspiciously short and cut-heavy.

[[cta]]

## Check the provenance, not just the pixels

- **Source first.** Who posted it, where else does it exist, does any credible outlet carry it? A dramatic clip that exists only on one anonymous account is a red flag before you look at a single frame.
- **Content Credentials.** Some AI tools (including Sora-class models) attach C2PA metadata declaring the content synthetic — and some platforms surface it. Absence proves nothing (metadata is stripped by screenshots and re-uploads), but presence is a fast, honest answer. We explain the whole system in [Content Credentials (C2PA) explained](/blog/content-credentials-c2pa-explained).
- **Watermarks.** Several generators embed visible or invisible watermarks (like SynthID). Invisible ones need the vendor's own checker — useful when it hits, silent about every other generator.

## When your eyes aren't enough: forensic analysis

Every tell above is fading with each model release, and research keeps showing that humans identify high-quality synthetic video at rates barely above chance. The robust approach is the one forensic tools use: **combine independent signals instead of trusting any single one.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** runs that fusion directly on your iPhone: temporal consistency and optical flow (do things move and persist like real objects?), frequency-domain analysis (the statistical fingerprint diffusion models leave behind), metadata and encoding forensics, provenance checks, and neural face analysis when there are faces. You get a 0–100 confidence score with a layer-by-layer breakdown — and it's honest when the evidence is inconclusive, which heavily re-compressed social clips often are. You can also paste a link from a social platform instead of downloading the file first. Everything runs **on-device**: the clip never leaves your phone ([here's why that matters](/blog/on-device-verification-explained)).

### Quick checklist

1. Download the actual file; play at 0.25×.
2. Pause on **text, hands, reflections, background people**.
3. Track one object through the clip — does it **persist**?
4. Check **who posted it** and whether it exists anywhere credible.
5. Look for **Content Credentials / watermarks**.
6. Run it through **on-device forensic analysis** and read the layer breakdown, not just the verdict.

## Frequently asked questions

**Can AI-generated video be detected reliably in 2026?**
No single method is reliable alone. Combining visual inspection, provenance and multi-signal forensic analysis gives strong evidence in most cases — but expect "inconclusive" on heavily compressed re-uploads, and treat any tool's output as evidence, not proof.

**What's the fastest single check?**
Pause on any text in the scene, then check reflections. Both are still consistently wrong in generated video and take under a minute.

**Why are so many AI videos short?**
Longer generations accumulate consistency errors — objects drift, faces mutate, scenes contradict themselves. Many synthetic clips stay under ~10–15 seconds or hide behind rapid cuts precisely to avoid exposing that.

**Is a watermark or credential proof either way?**
Presence of an AI credential is strong evidence it's synthetic. Absence proves nothing at all — most real *and* fake clips online have had their metadata stripped by platforms.

## The bottom line

Fully AI-generated video broke the old rule of "seeing is believing," but it hasn't broken verification: physics, permanence, provenance and forensics still catch what the eye misses. Build the habit — **check before you share** — and keep the companion guide for still images handy: [how to tell if an image is AI-generated](/blog/how-to-tell-if-an-image-is-ai-generated).
