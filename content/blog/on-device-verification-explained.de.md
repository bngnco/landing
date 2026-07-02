---
title: Verifizierung auf dem Gerät, erklärt (nichts verlässt dein iPhone)
description: 'Warum Verifyco vollständig auf deinem iPhone läuft: wie forensische On-Device-Analyse funktioniert, was die Neural Engine tut, Cloud vs. Gerät — und warum nie etwas hochgeladen wird.'
slug: on-device-verification-explained
date: 2026-06-08
author: Verifyco-Team
tags:
  - iOS
  - Forschung
  - Leitfäden
image: /uploads/blog/1000012581.png
imageAlt: Verifyco führt eine private On-Device-Analyse auf dem iPhone aus
updated: 2026-07-01
---

Die meisten Medienprüf-Tools funktionieren gleich: Du lädst deine Datei auf einen
Server, ihre Modelle analysieren sie in der Cloud, und du bekommst ein Ergebnis
zurück. Verifyco nicht. Jedes Signal läuft **lokal auf deinem iPhone**, und deine
Fotos und Videos verlassen das Gerät nie. Hier ist, was das bedeutet, wie es
möglich ist und warum es zählt — gerade bei dem sensiblen Material, das Menschen
am häufigsten prüfen wollen.

## Warum On-Device wichtig ist

- **Privatsphäre.** Was du am dringendsten verifizieren willst, ist oft das
  Sensibelste — ein privates Foto, ein geleakter Clip, ein intimes Bild, das dir
  jemand geschickt hat. On-Device-Analyse heißt: Es berührt nie den Server eines
  anderen, liegt nie in einem Log und kann nicht aus einem fremden Datenleck
  entweichen.
- **Geschwindigkeit.** Kein Upload, keine Warteschlange, kein Hin und Her. Die
  Analyse startet in dem Moment, in dem du die Datei wählst — was zählt, wenn du
  ein 4K-Video prüfst und kein Vorschaubild.
- **Funktioniert offline.** Im Flugzeug, bei schlechtem Empfang oder in einer
  gesicherten Umgebung ohne Netz — es funktioniert trotzdem, weil es keinen
  Netzwerkaufruf gibt, den man machen müsste.
- **Kein Konto, keine Spur.** Nichts zu registrieren, nichts, das eine geprüfte
  Datei mit deiner Identität verknüpft.

> Es gibt keinen Server. Es gibt keinen Upload. Es gibt kein Konto. Deine Medien
> bleiben auf deinem Handy, Punkt.

## Was "auf dem Gerät" wirklich heißt

Moderne iPhones haben eine dedizierte **Neural Engine** — Silizium, das eigens
dafür gebaut ist, Machine-Learning-Modelle schnell und effizient auszuführen.
Apples **Core ML**- und **Vision**-Frameworks lassen eine App neuronale Netze
direkt auf dieser Hardware laufen.

Verifyco nutzt das, um lokal zu erledigen, was andere Tools an eine GPU im
Rechenzentrum schicken: neuronale Analyse von Gesichtern und Szenen,
Frequenztransformationen, Metadaten-Parsing und Datei-Hashing — alles im
Speicher des Telefons, in Sekunden, ohne ein einziges Byte deiner Medien zu
übertragen.

## Die fünf Signale, lokal ausgeführt

Verifyco fusioniert **fünf unabhängige forensische Signale** zu einem einzigen
Vertrauens-Score von 0 bis 100:

1. **Content Credentials** — C2PA-Herkunft, der signierte "Beleg" der Kamera.
2. **Metadaten-Forensik** — EXIF, Kodierungskonsistenz und
   Framerate-Anomalien.
3. **Neuronale Gesichtsanalyse** — Apple Vision, Frame für Frame, auf der Suche
   nach den Artefakten, die Generatoren hinterlassen.
4. **Bewegungsanalyse** — optischer Fluss und zeitliche Konsistenz über Frames.
5. **Frequenzanalyse** — der DCT-Spektral-Fingerabdruck von Diffusions- und
   GAN-Modellen, unsichtbar fürs Auge.

Keine Ebene ist für sich entscheidend — das ist der Punkt. Erst die Fusion
mehrerer unabhängiger Signale macht das Urteil robust: Eine zu täuschen ist
leicht, alle gleichzeitig ist schwer. (Was jede Ebene in der Praxis fängt:
[Woran erkennt man KI-generierte Bilder](/de/blog/how-to-tell-if-an-image-is-ai-generated)
und [5 Anzeichen, dass ein Video deepfaked wurde](/de/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs. Gerät: der Vergleich

| | Cloud-Verifizierung | Auf dem Gerät (Verifyco) |
| --- | --- | --- |
| Deine Medien | Werden auf einen Server geladen | Verlassen dein Handy nie |
| Geschwindigkeit | Upload + Warteschlange + Download | Startet sofort |
| Offline | Nein | Ja |
| Konto nötig | Meistens | Nein |
| Privatsphäre-Risiko | Server-Logs, Datenlecks | Keins jenseits deines Geräts |

Das Einzige, was Clouds bieten können, ist ein riesiges zentrales Modell. Aber
für forensische Verifizierung laufen die Signale, auf die es ankommt — Herkunft,
Metadaten, Frequenzmuster, zeitliche Konsistenz — bestens auf dem Gerät, und der
Privatsphäre-Gewinn ist enorm.

## Häufige Fragen

**Ist On-Device so genau wie die Cloud?** Für diese forensischen Signale ja —
die Analyse ist dieselbe Mathematik; nur der *Ort* ändert sich. Erkennung bleibt
ein bewegliches Ziel (Generatoren werden besser) — deshalb fusioniert Verifyco
mehrere Signale und verbessert sich mit App-Updates.

**Leert es meinen Akku?** Eine einzelne Analyse ist ein kurzer Schub Neural-
Engine-Arbeit — vergleichbar mit einem aufwendigen Fotofilter, dann fertig.

**Welche iPhones?** Jedes moderne iPhone mit Neural Engine (iOS 17+). Neuere
Chips sind einfach schneller fertig.

**Seht ihr je meine Dateien?** Nein. Es gibt überhaupt keinen Upload-Pfad — die
Funktion, die deine Medien an uns senden würde, existiert nicht.

## Fazit

Verifizierung auf dem Gerät gibt dir eine forensische Zweitmeinung, die **per
Design privat und schnell genug für den Alltag** ist — bevor du einem Medium
vertraust, und bevor du es teilst. Neu im Thema? Starte mit
[Was ist ein Deepfake](/de/blog/what-is-a-deepfake).
