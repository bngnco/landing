---
title: "What's New in Verifyco (October 2026): Evidence Lean, Document Checks, Web and Links"
description: 'Everything Verifyco added since launch: the evidence lean and score legend, PDF document inspection, public-link analysis, the web app, credit packs, 20 languages in the iPhone app and the developer tools — and what is still deliberately not promised.'
slug: whats-new-in-verifyco-october-2026
date: 2026-10-10
author: Verifyco Team
tags:
  - iOS
  - Product
  - Guides
image: /uploads/blog/whats-new-october-2026-cover.jpg
imageAlt: "What's new in Verifyco 1.3: the iPhone home screen beside a card listing the evidence lean, score legend, document review, links and 20 languages"
updated: 2026-10-10
---

Verifyco launched as an on-device photo and video checker with five evidence
layers and a 0–100 trust score. Since then the engine, the app and the
surfaces around it have changed a lot, and most of our older guides describe
the launch version. This post is the current picture, in one place.

> **Scope.** Local files you pick on your iPhone are still analysed on the
> device. Three paths use a server and say so in the app: a public social-media
> link is fetched for the check and handed to your phone, Verifyco Web processes
> uploads ephemerally and keeps only the report, and the optional,
> off-by-default OpenAI provenance check in the iPhone app's Settings sends
> JPEG, PNG and WebP images through our server to OpenAI only if you switch it
> on; our server deletes the image afterwards.

## 1. Inconclusive now says which way the evidence leans

A lot of real-world media ends up **inconclusive**: compressed, screenshotted,
stripped of metadata. Earlier versions showed the same number for every such
file. Now the fusion step records an *evidence lean* and the result says it
plainly: "Inconclusive · Leans authentic" or "Leans AI-generated", with the
score placed inside the inconclusive band to show how far it leans. The
wording comes from the same evidence the verdict used, never from the score
alone, and a new **score legend** on every result explains what each band
means.

## 2. Plain-language answers when a file cannot be checked

If the visual engine cannot read enough of a file (a tiny image, a clip whose
frames do not decode), the app no longer shows a generic error. A "No result
for this file" screen tells you what was missing, what to try, and that
nothing was charged.

## 3. Document inspection for PDFs

"Inspect a Document" runs a bounded, local structure review of a PDF:
incremental updates, signature ranges, embedded scripts, active content and
similar edit-trace observations. It produces a document-specific result; it is
never the media authenticity score, and it is not a legal finding.

## 4. Public links from Instagram, X, TikTok, YouTube and Facebook

Paste a public post link. The media is fetched for the check, handed to your
phone and not stored by us; the analysis itself still runs on the device.
Private or deleted posts fail gracefully.

## 5. Verifyco Web

[web.verifyco.app](https://web.verifyco.app) runs the same governed engine for
people without an iPhone or who need shareable reports on a desktop. Uploads
are processed ephemerally; reports can be shared with a link that shows the
verdict and layer statuses, and revoked at any time.

## 6. Content Credentials, done carefully

C2PA Content Credentials are checked against a pinned trust list. A valid
credential from an unknown signer is shown for what it is, with no authority
in the score; a trusted camera credential supports an authentic verdict only
together with a compatible visual reading; a trusted "AI-generated"
declaration is decisive.

## 7. In-app camera captures

Photos and videos captured inside Verifyco carry first-party acquisition
evidence. That confirms where the file came from, not the truth of the scene,
and the result wording says exactly that.

## 8. Credit packs, 20 app languages, developer tools

- One-time credit packs (5, 20, 50) with no subscription, plus a lifetime
  option. Credits never expire.
- Detailed reports and PDF exports are translated in all 20 languages in the iPhone app.
- A documented API, a command-line tool and an MCP server, in private beta,
  let teams run the same engine from their own workflows; see
  [web.verifyco.app/developers](https://web.verifyco.app/developers).

## What we still do not promise

We do not publish an accuracy percentage, and we will not until an
independent, source-matched corpus with confidence intervals exists. Every
layer that enters the score has a documented authority; the temporal and
frequency diagnostics stay visible but cannot change the verdict on their own.
"We don't know" remains an allowed answer.

If you wrote about Verifyco in June or July, this is the version to look at
again. The [App Store listing](https://apps.apple.com/app/id6772592963) and
the web app are both current.
