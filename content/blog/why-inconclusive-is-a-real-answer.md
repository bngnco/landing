---
title: 'Why "Inconclusive" Is a Real Answer (and What Evidence Lean Adds)'
description: 'Detectors that always answer are guessing. How Verifyco decides between authentic, inconclusive, suspicious and manipulated, why the inconclusive band now carries a lean, and how to read the score legend.'
slug: why-inconclusive-is-a-real-answer
date: 2026-10-10
author: Verifyco Team
tags:
  - Research
  - Guides
  - Deepfakes
image: /uploads/blog/url.png
imageAlt: An inconclusive Verifyco result showing which way the evidence leans
updated: 2026-10-10
---

Every media detector faces the same temptation: always return a number, and
let the user read confidence into it. We went the other way. Verifyco's fusion
step is allowed to say "we do not know", and since the autumn update it also
says which way the available evidence leans.

## Four outcomes, each with a condition

- **Likely authentic** needs positive evidence with real authority: a trusted
  Content Credential or a complete camera fingerprint, together with a
  compatible visual reading, and no negative evidence.
- **Likely manipulated** needs a decisive declaration or at least two
  independent negative classes of evidence.
- **Suspicious** is the review band: one strong negative, or a single
  uncalibrated model at an extreme reading.
- **Inconclusive** is everything else, and it is the most common outcome for
  compressed, screenshotted or stripped media.

Thresholds and layer authorities are fixed policy, documented in the engine
contract, and they do not move with marketing.

## What evidence lean adds

Inside the inconclusive band the score used to be flat. Now the fusion step
records whether the weighed evidence pointed one way: a positive with real
authority and no negative reads "leans authentic"; a negative with no
authority-bearing positive reads "leans AI-generated"; both present reads
"mixed". The score is placed inside the band accordingly, and the result text
uses the same lean, never the score alone. The lean is wording and placement;
it never changes the verdict.

## Reading the score legend

Every result now carries a legend: which band the score is in, what that band
means, and what would have been needed to leave it. If the neural row says
"consistent with a real capture", it is because the fusion counted that
reading, not because the number looked high. If a layer is shown as
diagnostic-only, it had no weight in the score.

## Why this is better for you

- You can quote a result without overclaiming: "inconclusive, leaning
  authentic, metadata intact" is a sentence a journalist or a moderator can
  use.
- A detector that never says "unknown" cannot be trusted when it says "yes".
- Honest limits are also how we avoid publishing an accuracy figure we have
  not earned; see our note on [how accurate AI detectors really are](/blog/how-accurate-are-ai-detectors).
