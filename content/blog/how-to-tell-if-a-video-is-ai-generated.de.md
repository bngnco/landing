---
title: Woran erkennt man, ob ein Video KI-generiert ist? (Leitfaden 2026)
description: 'Sora-Klasse-Modelle erzeugen Video aus einem Text-Prompt. So erkennen Sie, ob ein Video KI-generiert ist: Physikfehler, Texturartefakte, Herkunftsprüfung und forensische Werkzeuge.'
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
author: Verifyco-Team
tags:
  - KI-Erkennung
  - Leitfäden
image: /uploads/blog/1000000350.jpg
imageAlt: Analyse eines Videos auf dem iPhone, um KI-Erzeugung zu erkennen
updated: 2026-07-03
---

Ein Deepfake bedeutete früher genau eines: ein echtes Video mit ausgetauschtem Gesicht. Diese Ära ist vorbei. Text-zu-Video-Modelle — Sora, Veo und ihre Open-Source-Nachfolger — generieren inzwischen **ganze Szenen aus einem Prompt**: die Menschen, den Raum, das Licht, die Kamerafahrt — nichts davon hat je existiert. Diese vollsynthetischen Videos scheitern anders als Face-Swaps und brauchen deshalb eine eigene Checkliste.

Genau die ist dieser Leitfaden. (Prüfen Sie ein Video, in dem eine *bestimmte reale Person* etwas sagt, brauchen Sie zusätzlich die Face-Swap-Anzeichen aus [Deepfake-Videos erkennen](/de/blog/how-to-spot-a-deepfake-video) — echte Fälle mischen beides.)

## Zuerst: die einfachen Anzeichen im Bild

Laden Sie den Clip wenn möglich herunter (Bildschirmaufnahmen komprimieren neu und verstecken Beweise), spielen Sie ihn langsam, im Vollbild, hell ab. Achten Sie auf:

- **Text und Beschilderung.** Generierte Welten verstümmeln Schrift noch immer — Ladenschilder, Trikots, Kennzeichen und Etiketten, die auf den ersten Blick stimmen und beim Pausieren in Pseudo-Buchstaben zerfallen. Durchgehend konsistenter, lesbarer Text ist wirklich schwer zu fälschen.
- **Hände, Finger und Objektübergaben.** Verschmelzende Finger, Besteck, das ins Essen fließt, Objekte, die *durch* Hände gleiten. Interaktionen zwischen Dingen bleiben die Schwachstelle.
- **Menschen im Hintergrund.** Statisten sind für das Modell billig, aber schlecht beaufsichtigt: Achten Sie auf Passanten, die gleiten, sich wiederholen oder ineinander übergehen.
- **Symmetrie und Physik von Spiegelungen.** Spiegel, Fenster, Wasser und Sonnenbrillen reflektieren oft eine *plausible* Szene statt *der* Szene. Widerspricht eine Spiegelung der Welt, ist das entscheidend.
- **Zu glatte Bewegung.** Generiertes Video hat oft eine schwebende, traumartige Kamera und leicht verlangsamte, schwerelose Motive — nichts ruckelt, nichts wackelt glaubwürdig.

## Dann: die Objektpermanenz prüfen

Das ist die verlässlichste Klasse von Anzeichen bei vollständig generiertem Video. Echte Objekte bestehen fort; generierte tun das nur *tendenziell*.

Springen Sie durch den Clip und verfolgen Sie ein einzelnes Objekt — eine Tasse, einen Knopf, ein Tattoo, einen Ohrring. In KI-Video kann es zwischen Einstellungen oder sogar Sekunden **die Form ändern, die Position wechseln, verschwinden oder sich in etwas anderes verwandeln**. Zählen Sie Dinge: Finger, Räder, Stuhlbeine, Fensterscheiben. Zählen Sie fünf Sekunden später erneut. Echte Videos widersprechen sich nie selbst; generative Modelle tun es noch — besonders jenseits der Zehn-Sekunden-Marke. Auch deshalb sind so viele synthetische Clips verdächtig kurz und schnittlastig.

[[cta]]

## Prüfen Sie die Herkunft, nicht nur die Pixel

- **Zuerst die Quelle.** Wer hat es gepostet, wo existiert es noch, führt es ein glaubwürdiges Medium? Ein dramatischer Clip, der nur auf einem anonymen Konto existiert, ist eine rote Flagge, bevor Sie ein einziges Bild ansehen.
- **Content Credentials.** Manche KI-Werkzeuge (auch Sora-Klasse-Modelle) hängen C2PA-Metadaten an, die den Inhalt als synthetisch deklarieren — und manche Plattformen zeigen sie an. Fehlen beweist nichts (Metadaten verschwinden durch Screenshots und Re-Uploads), aber Vorhandensein ist eine schnelle, ehrliche Antwort. Das ganze System erklären wir in [Content Credentials (C2PA), erklärt](/de/blog/content-credentials-c2pa-explained).
- **Wasserzeichen.** Mehrere Generatoren betten sichtbare oder unsichtbare Wasserzeichen ein (wie SynthID). Unsichtbare brauchen den Prüfer des Herstellers — nützlich, wenn er anschlägt, stumm zu allen anderen Generatoren.

## Wenn die Augen nicht reichen: forensische Analyse

Jedes Anzeichen oben verblasst mit jedem Modell-Release, und die Forschung zeigt immer wieder, dass Menschen hochwertiges synthetisches Video kaum besser als der Zufall erkennen. Der robuste Ansatz ist der der forensischen Werkzeuge: **unabhängige Signale kombinieren, statt einem einzigen zu vertrauen.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** führt diese Fusion direkt auf Ihrem iPhone aus: zeitliche Konsistenz und optischer Fluss (bewegen und bestehen Dinge wie echte Objekte?), Frequenzraum-Analyse (der statistische Fingerabdruck von Diffusionsmodellen), Metadaten- und Kodierungsforensik, Herkunftsprüfung und neuronale Gesichtsanalyse, wo Gesichter vorkommen. Sie erhalten einen Vertrauenswert von 0–100 mit Aufschlüsselung pro Ebene — und Ehrlichkeit, wenn die Beweise nicht ausreichen, was bei stark rekomprimierten Social-Clips oft der Fall ist. Statt die Datei herunterzuladen, können Sie auch einen Link einer Social-Plattform einfügen. Alles läuft **auf dem Gerät**: Der Clip verlässt Ihr Telefon nie ([warum das wichtig ist](/de/blog/on-device-verification-explained)).

### Schnell-Checkliste

1. Die Originaldatei herunterladen; mit 0,25× abspielen.
2. Bei **Text, Händen, Spiegelungen, Hintergrundpersonen** pausieren.
3. Ein Objekt durch den Clip verfolgen — **bleibt es bestehen?**
4. Prüfen, **wer gepostet hat** und ob es irgendwo Glaubwürdiges existiert.
5. Nach **Content Credentials / Wasserzeichen** suchen.
6. Durch **forensische On-Device-Analyse** laufen lassen und die Ebenen-Aufschlüsselung lesen, nicht nur das Urteil.

## Häufige Fragen

**Lässt sich KI-generiertes Video 2026 zuverlässig erkennen?**
Keine Methode allein ist zuverlässig. Die Kombination aus Sichtprüfung, Herkunft und mehrsignaliger Forensik liefert in den meisten Fällen starke Beweise — rechnen Sie aber bei stark komprimierten Re-Uploads mit „nicht eindeutig", und behandeln Sie jede Werkzeugausgabe als Indiz, nicht als Beweis.

**Was ist die schnellste Einzelprüfung?**
Bei beliebigem Text in der Szene pausieren, dann die Spiegelungen prüfen. Beides ist in generiertem Video noch immer konsistent fehlerhaft und dauert unter einer Minute.

**Warum sind so viele KI-Videos kurz?**
Längere Generierungen häufen Konsistenzfehler an — Objekte driften, Gesichter mutieren, Szenen widersprechen sich. Viele synthetische Clips bleiben unter ~10–15 Sekunden oder verstecken sich hinter schnellen Schnitten, um genau das zu verbergen.

**Sind Wasserzeichen oder Credentials in irgendeiner Richtung ein Beweis?**
Das Vorhandensein einer KI-Kennzeichnung ist ein starkes Indiz für synthetisch. Das Fehlen beweist überhaupt nichts — den meisten echten *und* gefälschten Clips im Netz haben die Plattformen die Metadaten längst entfernt.

## Fazit

Vollständig KI-generiertes Video hat die alte Regel „Sehen heißt Glauben" gebrochen, aber nicht die Verifizierung: Physik, Permanenz, Herkunft und Forensik fangen weiterhin, was das Auge verpasst. Machen Sie es zur Gewohnheit — **prüfen, bevor Sie teilen** — und halten Sie den Schwester-Leitfaden für Standbilder bereit: [Woran erkennt man, ob ein Bild KI-generiert ist](/de/blog/how-to-tell-if-an-image-is-ai-generated).
