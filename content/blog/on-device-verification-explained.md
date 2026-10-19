---
title: On-Device Verification, Explained (Your Local Files Are Analysed on Your iPhone)
description: 'Why Verifyco analyzes the files you pick on your iPhone: how on-device forensic analysis works, what the Neural Engine does, cloud vs on-device trade-offs, and which paths use temporary server processing.'
slug: on-device-verification-explained
date: 2026-06-08
author: Verifyco Team
tags:
  - iOS
  - Research
  - Guides
image: /uploads/blog/1000012581.png
imageAlt: Verifyco running a private, on-device analysis on iPhone
updated: 2026-07-01
---

Most media-checking tools work the same way: you upload your file to a server,
their models analyse it in the cloud, and you get a result back. Verifyco doesn't.
The analysis runs **locally on your iPhone**, and the photos and videos you pick
stay on the device unless you switch on the optional OpenAI check described
below. Here's what that means, how it's possible, and why it matters —
especially for the sensitive material people most often need to check.

> **Scope.** This article is about photos and videos you pick from your iPhone. Three Verifyco paths use a server and say so in the app: a public social-media link is fetched for the check and handed to your phone (the analysis still runs on the device, and the media is not stored by us); Verifyco Web processes uploads ephemerally, keeping only the report; and the optional, off-by-default OpenAI provenance check in Settings sends JPEG, PNG and WebP images through our server to OpenAI only if you switch it on.

## Why on-device matters

- **Privacy.** The media you most want to verify is often the most sensitive — a
  private photo, a leaked clip, an intimate image someone sent you. On-device
  analysis means it stays off someone else's server, out of their logs and out of
  their breaches, unless you switch on the optional, off-by-default OpenAI check
  described below.
- **Speed.** The on-device analysis has no queue and no round-trip, so it starts
  the instant you pick a file — which matters when you're checking a 4K video,
  not a thumbnail.
- **Works offline.** On a plane, on patchy signal, or in a secure environment
  with no network — the on-device analysis still works, because it makes no
  network call. Only the optional OpenAI check, if you switched it on, needs a
  connection.
- **No account, no trail.** Nothing to sign up for, nothing tying a checked file
  to your identity.

> For a file you pick from your phone there is no server, no upload and no account, unless you switch on the optional, off-by-default OpenAI provenance check in Settings: then JPEG, PNG and WebP images go through our server to OpenAI's Content Provenance API, and our server deletes the image afterwards. Link checks and Verifyco Web use temporary server processing, as the scope note above says.

## What "on-device" actually means

Modern iPhones ship with a dedicated **Neural Engine** — silicon built
specifically for running machine-learning models fast and efficiently. Apple's
**Core ML** and **Vision** frameworks let an app run neural networks directly on
that hardware.

Verifyco uses this to do, locally, what other tools send to a GPU in a data
centre: run neural analysis on faces and scenes, compute frequency transforms,
parse metadata and hash the file — all in the phone's own memory, in seconds.
The analysis itself sends none of your media anywhere; only the optional,
off-by-default OpenAI check, if you switch it on, sends an image to OpenAI
through our server.

## The five signals, running locally

Verifyco fuses **five independent forensic signals** into one 0–100 trust score:

1. **Content credentials** — C2PA provenance, the camera's signed "receipt" of
   origin.
2. **Metadata forensics** — EXIF, encoding consistency and frame-rate anomalies.
3. **Neural face analysis** — Apple Vision, frame by frame, looking for the
   artifacts generators leave behind.
4. **Motion analysis** — optical-flow and temporal consistency across frames.
5. **Frequency analysis** — the DCT spectral fingerprint of diffusion and GAN
   models, invisible to the eye.

Most layers are not decisive on their own — that's the point. Fusing several independent
signals is what makes the verdict robust, because fooling one is easy and fooling
all of them at once is hard. (For what each layer catches in practice, see
[how to tell if an image is AI-generated](/blog/how-to-tell-if-an-image-is-ai-generated)
and [5 signs a video has been deepfaked](/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs on-device: the trade-off

|  | Cloud verification | On-device (Verifyco) |
| --- | --- | --- |
| Your media | Uploaded to a server | Local files stay on your phone unless you opt in to the OpenAI check |
| Speed | Upload + queue + download | Starts instantly |
| Works offline | No | Yes (the optional OpenAI check needs a connection) |
| Account required | Usually | No |
| Privacy exposure | Server logs, breaches | None beyond your device, unless you opt in to the OpenAI check |

The one thing clouds can offer is a giant central model. But for forensic
verification, the signals that matter — provenance, metadata, frequency patterns,
temporal consistency — run perfectly well on-device, and the privacy gain is
enormous.

## Common questions

**Is on-device weaker than cloud?** For these forensic signals the analysis is
the same math; only the _location_ changes. Detection is always a
moving target (generators improve), which is why Verifyco fuses several signals
and improves with app updates.

**Does it drain my battery?** A single analysis is a short burst of Neural
Engine work — comparable to applying a heavy photo filter, then done.

**Which iPhones?** Any modern iPhone with a Neural Engine (iOS 17+). Newer chips
simply finish faster.

**Do you ever see my files?** Not the files you pick from your phone, unless you switch on the optional OpenAI provenance check (off by default), which sends JPEG, PNG and WebP images through our server to OpenAI; our server deletes each image afterwards. A public link you paste is fetched for the check and not stored by us, and Verifyco Web processes uploads ephemerally, keeping only the report.

## The bottom line

On-device verification gives you a forensic-grade second opinion that's **private**
**by design and fast enough to actually use** — before you trust a piece of media,
and before you share it. New to the topic? Start with
[what is a deepfake](/blog/what-is-a-deepfake).
