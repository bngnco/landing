---
title: Verifizierung auf dem Gerät, erklärt (deine lokalen Dateien werden auf deinem iPhone analysiert)
description: 'Warum Verifyco die Dateien, die du auf deinem iPhone auswählst, auf dem Gerät analysiert: wie forensische On-Device-Analyse funktioniert, was die Neural Engine tut, Cloud vs. Gerät — und welche Wege eine vorübergehende Verarbeitung auf dem Server nutzen.'
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
zurück. Verifyco nicht. Die Analyse läuft **lokal auf deinem iPhone**, und die Fotos
und Videos, die du auswählst, bleiben auf dem Gerät, es sei denn, du schaltest
die weiter unten beschriebene optionale OpenAI-Prüfung ein. Hier ist, was das bedeutet, wie es
möglich ist und warum es zählt — gerade bei dem sensiblen Material, das Menschen
am häufigsten prüfen wollen.

> **Geltungsbereich.** Dieser Artikel behandelt Fotos und Videos, die du auf deinem iPhone auswählst. Drei Verifyco-Wege nutzen einen Server und zeigen das in der App an: Bei einem öffentlichen Social-Media-Link werden die Medien für die Prüfung abgerufen und an dein Telefon übergeben (die Analyse läuft weiterhin auf dem Gerät, und wir speichern die Medien nicht); Verifyco Web verarbeitet Uploads flüchtig und behält nur den Bericht; und die optionale, standardmäßig deaktivierte OpenAI-Herkunftsprüfung in den Einstellungen sendet JPEG-, PNG- und WebP-Bilder nur dann über unseren Server an OpenAI, wenn du sie einschaltest.

## Warum On-Device wichtig ist

- **Privatsphäre.** Was du am dringendsten verifizieren willst, ist oft das
  Sensibelste — ein privates Foto, ein geleakter Clip, ein intimes Bild, das dir
  jemand geschickt hat. On-Device-Analyse heißt: Es landet nicht auf dem Server
  eines anderen, nicht in dessen Logs und nicht in dessen Datenlecks, es sei denn,
  du schaltest die weiter unten beschriebene optionale, standardmäßig deaktivierte
  OpenAI-Prüfung ein.
- **Geschwindigkeit.** Die Analyse auf dem Gerät kennt keine Warteschlange und
  kein Hin und Her, deshalb startet sie in dem Moment, in dem du die Datei wählst —
  was zählt, wenn du ein 4K-Video prüfst und kein Vorschaubild.
- **Funktioniert offline.** Im Flugzeug, bei schlechtem Empfang oder in einer
  gesicherten Umgebung ohne Netz — die Analyse auf dem Gerät funktioniert
  trotzdem, weil sie keinen Netzwerkaufruf macht. Nur die optionale
  OpenAI-Prüfung braucht eine Verbindung, falls du sie eingeschaltet hast.
- **Kein Konto, keine Spur.** Nichts zu registrieren, nichts, das eine geprüfte
  Datei mit deiner Identität verknüpft.

> Für eine Datei, die du auf deinem Handy auswählst, gibt es keinen Server, keinen Upload und kein Konto, es sei denn, du schaltest in den Einstellungen die optionale, standardmäßig deaktivierte OpenAI-Herkunftsprüfung ein: Dann gehen JPEG-, PNG- und WebP-Bilder über unseren Server an die Content Provenance API von OpenAI, und unser Server löscht das Bild danach. Link-Prüfungen und Verifyco Web nutzen eine vorübergehende Verarbeitung auf dem Server, wie der Hinweis zum Geltungsbereich oben sagt.

## Was "auf dem Gerät" wirklich heißt

Moderne iPhones haben eine dedizierte **Neural Engine** — Silizium, das eigens
dafür gebaut ist, Machine-Learning-Modelle schnell und effizient auszuführen.
Apples **Core ML**- und **Vision**-Frameworks lassen eine App neuronale Netze
direkt auf dieser Hardware laufen.

Verifyco nutzt das, um lokal zu erledigen, was andere Tools an eine GPU im
Rechenzentrum schicken: neuronale Analyse von Gesichtern und Szenen,
Frequenztransformationen, Metadaten-Parsing und Datei-Hashing — alles im
Speicher des Telefons, in Sekunden. Die Analyse selbst sendet deine Medien
nirgendwohin; nur die optionale, standardmäßig deaktivierte OpenAI-Prüfung sendet
ein Bild über unseren Server an OpenAI, wenn du sie einschaltest.

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

Die meisten Ebenen sind für sich allein nicht entscheidend — das ist der Punkt. Erst die Fusion
mehrerer unabhängiger Signale macht das Urteil robust: Eine zu täuschen ist
leicht, alle gleichzeitig ist schwer. (Was jede Ebene in der Praxis fängt:
[Woran erkennt man KI-generierte Bilder](/de/blog/how-to-tell-if-an-image-is-ai-generated)
und [5 Anzeichen, dass ein Video deepfaked wurde](/de/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs. Gerät: der Vergleich

| | Cloud-Verifizierung | Auf dem Gerät (Verifyco) |
| --- | --- | --- |
| Deine Medien | Werden auf einen Server geladen | Lokale Dateien bleiben auf deinem Handy, außer du aktivierst die OpenAI-Prüfung |
| Geschwindigkeit | Upload + Warteschlange + Download | Startet sofort |
| Offline | Nein | Ja (die optionale OpenAI-Prüfung braucht eine Verbindung) |
| Konto nötig | Meistens | Nein |
| Privatsphäre-Risiko | Server-Logs, Datenlecks | Keins jenseits deines Geräts, außer du aktivierst die OpenAI-Prüfung |

Das Einzige, was Clouds bieten können, ist ein riesiges zentrales Modell. Aber
für forensische Verifizierung laufen die Signale, auf die es ankommt — Herkunft,
Metadaten, Frequenzmuster, zeitliche Konsistenz — bestens auf dem Gerät, und der
Privatsphäre-Gewinn ist enorm.

## Häufige Fragen

**Ist On-Device schwächer als die Cloud?** Für diese forensischen Signale ist die
Analyse dieselbe Mathematik; nur der *Ort* ändert sich. Erkennung bleibt
ein bewegliches Ziel (Generatoren werden besser) — deshalb fusioniert Verifyco
mehrere Signale und verbessert sich mit App-Updates.

**Leert es meinen Akku?** Eine einzelne Analyse ist ein kurzer Schub Neural-
Engine-Arbeit — vergleichbar mit einem aufwendigen Fotofilter, dann fertig.

**Welche iPhones?** Jedes moderne iPhone mit Neural Engine (iOS 17+). Neuere
Chips sind einfach schneller fertig.

**Seht ihr je meine Dateien?** Die Dateien, die du auf deinem Handy auswählst, sehen wir nicht, es sei denn, du schaltest die optionale OpenAI-Herkunftsprüfung ein (standardmäßig aus): Dann gehen JPEG-, PNG- und WebP-Bilder über unseren Server an OpenAI; unser Server löscht jedes Bild danach. Bei einem öffentlichen Link, den du einfügst, werden die Medien für die Prüfung abgerufen und nicht von uns gespeichert; Verifyco Web verarbeitet Uploads vorübergehend und behält nur den Bericht.

## Fazit

Verifizierung auf dem Gerät gibt dir eine forensische Zweitmeinung, die **per
Design privat und schnell genug für den Alltag** ist — bevor du einem Medium
vertraust, und bevor du es teilst. Neu im Thema? Starte mit
[Was ist ein Deepfake](/de/blog/what-is-a-deepfake).
