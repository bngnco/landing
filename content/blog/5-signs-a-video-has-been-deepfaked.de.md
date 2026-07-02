---
title: "5 Anzeichen, dass ein Video deepfaked wurde (+ wie du es prüfst)"
description: "Eine praktische Checkliste zum Erkennen von Deepfake-Videos — die Kantenartefakte, Lippen-Desynchronisation, Licht-Hinweise, unnatürliche Bewegung und Audio-Indizien, die synthetische Clips noch verraten."
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
updated: 2026-07-01
author: "Verifyco-Team"
tags: ["Deepfakes", "KI-Erkennung", "Leitfäden"]
image: /uploads/blog/signals.png
imageAlt: "Die Verifyco-Signalpipeline analysiert ein Video Frame für Frame"
---

Ein Video überzeugend zu fälschen ist schwerer als ein Standbild — es gibt schlicht viel mehr Frames, die konsistent bleiben müssen, und Bewegung, Licht und Ton müssen über die Zeit zusammenpassen. Die gute Nachricht für dich: Deepfake-Video hinterlässt noch Spuren, vor allem in Bewegung und Klang. Hier sind die fünf verlässlichsten Anzeichen, wie du jedes prüfst — und warum keines für sich allein ein Urteil ist.

> **So untersuchst du jeden Clip:** Lade ihn herunter (Bildschirmaufnahme re-komprimiert und verdeckt Artefakte), spiele ihn mit 0,25× ab und gehe Frame für Frame durch. Vollbild, Helligkeit hoch. Die meisten Hinweise leben in den Übergängen zwischen Frames, nicht in einem pausierten Einzelbild.

## 1. Kanten, die flimmern oder "atmen"

Beobachte die Grenze, wo das Gesicht auf Haare, Ohren, Brille oder Hintergrund trifft. Face-Swap-Modelle blenden in jedem Frame ein generiertes Gesicht auf einen echten Kopf, und diese Naht **flackert, verzieht sich oder verschiebt sich** oft leicht zwischen den Frames — ein feines "Atmen" um Kiefer, Haaransatz oder Hals. Pausiere bei einer schnellen Kopfdrehung oder wenn eine Hand vor dem Gesicht vorbeizieht: Genau dort bricht die Überblendung.

## 2. Lippen, die aus dem Takt geraten

Ton und Mundformen können minimal auseinanderfallen, besonders bei Verschlusslauten (**p, b, m**), bei denen sich die Lippen ganz schließen müssten. Schau dir den Mund erst ohne, dann mit Ton an. Warnsignale:

- Lippen, die sich bei "m"/"b"-Lauten nicht ganz schließen.
- Zähne und Mundinneres, die verschmiert, statisch oder seltsam gleichförmig wirken.
- Eine Stimme, die *fast* synchron ist, aber konstant einen Hauch zu früh oder zu spät.

## 3. Licht und Farbe, die nicht zusammenpassen

Echtes Licht folgt in der ganzen Szene einer einzigen Physik. In komponiertem oder generiertem Video passt das Gesicht womöglich nicht zu seiner Umgebung:

- Warm beleuchtete Haut in einem kühl beleuchteten Raum (oder umgekehrt).
- Schatten im Gesicht, die in eine andere Richtung zeigen als die der Szene.
- Ein Gesicht, das gleichmäßig hell bleibt, während die Person durch Licht und Schatten geht.
- Ein schwacher Farb-"Halo" oder unpassendes Korn/Rauschen dort, wo das Gesicht eingesetzt wurde.

[[cta]]

## 4. Unnatürliche Bewegung, Blinzeln und Mikroexpressionen

Gesichter tun ununterbrochen winzige Dinge — sie blinzeln in natürlichem Rhythmus, zeigen Mikroexpressionen, bewegen den Kopf mit feinem Zittern. Synthetische Gesichter machen das oft subtil falsch:

- **Blinzelrate** zu niedrig (frühe Deepfakes blinzelten kaum) oder mechanisch regelmäßig.
- **Augen**, die nicht dorthin folgen, wo die Person "hinschaut", oder ein starrer, glasiger Blick.
- **Zu glatte oder zu stille** Bewegung — eine unheimliche Ruhe, oder ein Gesicht, das leicht relativ zum Kopf zu schweben scheint.
- **Eingefrorene Stirn/Ohren**, während der Mund sich stark bewegt.

## 5. Fehlende Herkunft und verdächtige Metadaten

Geh weg von den Pixeln; prüfe die Datei und ihre Quelle:

- Ein Clip, der eine echte Aufnahme sein will, aber **keine Kamera-Metadaten** trägt — oder Metadaten, die der Geschichte widersprechen (falsches Datum, falsches Gerät, Bearbeitungssoftware).
- Keine glaubwürdige Quelle — er kursiert nur auf anonymen oder obskuren Konten, kein Medium führt ihn.
- Umgekehrt sind gültige **C2PA Content Credentials** ein Beleg *für* Echtheit.

## Bonus: Höre auf den Ton

Stimmklonung hat ihre eigenen Artefakte. Achte mit Kopfhörern auf eine flache, "gleichmäßige" Sprechweise mit wenig Atem, seltsames Tempo oder Betonung, einen feinen metallischen Klang oder Hintergrundgeräusche, die zwischen Wörtern unnatürlich abreißen. Reine Audio-Betrugsmaschen (der Anruf vom "Angehörigen in Not") bauen darauf, dass du nicht so genau hinhörst.

## Was ein forensisches Tool automatisch erledigt

Mit dem Auge fängst du viel — aber Software geht dorthin, wo du nicht hinkommst:

- **Optischer Fluss & zeitliche Konsistenz** — prüft, ob sich Objekte von Frame zu Frame wie echte Objekte bewegen.
- **Neuronale Gesichtsanalyse pro Frame** — markiert die feinen Artefakte, die die Überblendung hinterlässt.
- **Frequenzanalyse** — der statistische Fingerabdruck generativer Modelle, für das Auge unsichtbar.
- **Metadaten & Herkunft** — EXIF, Kodierungskonsistenz und C2PA in einem Durchgang.

Die bildspezifische Version dieser Prüfungen: [Woran erkennt man KI-generierte Bilder](/de/blog/how-to-tell-if-an-image-is-ai-generated); der Hintergrund, wie diese Fälschungen entstehen: [Was ist ein Deepfake](/de/blog/what-is-a-deepfake). Eine tiefere Zeichenliste: [Deepfake-Videos erkennen: 9 Warnsignale](/de/blog/how-to-spot-a-deepfake-video).

### Schnell-Checkliste

1. Herunterladen, auf 0,25× verlangsamen, Frame für Frame durchgehen.
2. Die **Gesichtskanten** bei Kopfdrehungen und Verdeckungen beobachten.
3. **Lippensynchronität** bei p/b/m-Lauten prüfen; Zähne/Mundinneres inspizieren.
4. **Licht/Schatten** auf dem Gesicht mit der Szene vergleichen.
5. **Blinzeln, Blick und Mikrobewegung** beobachten.
6. **Quelle und Metadaten** prüfen; den **Ton** mit Kopfhörern anhören.

## Fazit

Kein Anzeichen ist für sich allein ein Beweis — auch echte Clips haben Kompression, Bewegungsunschärfe und seltsame Ausschnitte. Der verlässliche Ansatz ist, die Signale zu **kombinieren** — genau das tut ein forensisches Tool: Es fusioniert mehrere unabhängige Prüfungen zu einem Urteil, statt auf einen einzelnen Hinweis zu wetten. Verifyco führt diese Fusion in Sekunden auf deinem iPhone aus, komplett offline — siehe [Verifizierung auf dem Gerät, erklärt](/de/blog/on-device-verification-explained).
