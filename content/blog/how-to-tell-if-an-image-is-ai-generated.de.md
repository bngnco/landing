---
title: Woran erkennt man KI-generierte Bilder? Der komplette Guide 2026
description: 'Unsicher, ob ein Foto echt oder KI ist? Lerne die Methode, die 2026 wirklich funktioniert: Herkunftsprüfung, Detektor-Tools und die Physik-Fehler, die KI noch macht.'
slug: how-to-tell-if-an-image-is-ai-generated
date: 2026-06-28
author: Verifyco-Team
tags:
  - KI-Erkennung
  - Leitfäden
image: /uploads/blog/1000000140.jpg
imageAlt: Forensische Bildanalyse auf dem iPhone zeigt KI-Generierungsartefakte
updated: 2026-07-01
---

Vor ein paar Jahren war es leicht, ein KI-Bild zu erkennen. Sechs Finger, zerlaufener Text, Augen, die in verschiedene Richtungen blicken. Diese Ära ist vorbei. 2026 produzieren Bildgeneratoren Aufnahmen, die von einem gewöhnlichen Handyfoto nicht zu unterscheiden sind — und die ehrliche Wahrheit lautet: **Nur durch Hinsehen erkennt man es meist nicht mehr.** Wer behauptet, es immer zu können, überschätzt sich.

Das heißt nicht, dass du hilflos bist. Es gibt einen verlässlichen Weg, ein verdächtiges Bild zu untersuchen — aber es ist ein Prozess, kein Blick. Dieser Guide führt dich durch die Leiter, die 2026 funktioniert: von den schnellsten, sichersten Prüfungen bis zu den visuellen Hinweisen als letztem Mittel.

Wenn du dir nur eines merkst, dann das: **Arbeite von der Herkunft über Detektoren zur Physik — in dieser Reihenfolge.**

## Zuerst: Verstehe, womit du es zu tun hast

Zur Einordnung: Branchenschätzungen zufolge entstehen 2026 auf den großen Plattformen **über 500 Millionen KI-Bilder pro Tag**. McAfees Forschung ergab, dass der durchschnittliche Amerikaner inzwischen etwa **2,6 Deepfakes am Tag** begegnet, ohne es zu merken. Ein großer Teil dessen, woran du vorbeiscrollst, wurde nie von einer Kamera aufgenommen.

Der Qualitätssprung von 2025 auf 2026 war steil. Werkzeuge, die früher offensichtliche Fälschungen lieferten, erreichen jetzt den Realismus einer normalen Fotobearbeitung. Deshalb versagen die alten "Achte auf die Fehler"-Tipps — sie wurden für eine KI-Generation geschrieben, die nicht mehr existiert. Hintergründe zur Technologie findest du unter [Was ist ein Deepfake](/de/blog/what-is-a-deepfake).

Wir brauchen also einen klügeren Ansatz.

## Schritt 1: Prüfe die Herkunft (das schnellste, verlässlichste Signal)

Bevor du auch nur einen Pixel analysierst, stell eine einfachere Frage: **Trägt das Bild einen Nachweis seiner Herkunft?**

Das nennt sich *Provenienz*, und sie ist 2026 das stärkste verfügbare Signal, weil sie nicht auf Rätselraten beruht — sondern auf einem kryptografischen Nachweis in der Datei.

### Content Credentials (C2PA)

Die **Coalition for Content Provenance and Authenticity (C2PA)** hat einen offenen Standard namens Content Credentials geschaffen. Viele Kameras, Bearbeitungsprogramme und KI-Generatoren hängen diese Metadaten inzwischen an Bilder an. Sie können verraten, ob KI an der Erstellung oder Bearbeitung beteiligt war.

Große KI-Firmen haben den Standard übernommen. OpenAI etwa versieht Bilder aus seinen Tools mit Content Credentials und bietet einen Weg zur Verifizierung. Der Haken — und er ist wichtig: Die Metadaten **lassen sich entfernen**. Wer ein Bild screenshottet oder neu speichert, löscht die Credentials meist. Ein "keine Credentials gefunden" entlastet ein Bild also nicht; die Spur ist nur kalt geworden.

### SynthID (Google)

Google bettet in Bilder seiner Modelle ein unsichtbares Wasserzeichen namens **SynthID** ein. Du kannst die Gemini-App öffnen, ein Bild hochladen und fragen, ob es mit Google-KI erstellt wurde — sie prüft auf das SynthID-Wasserzeichen.

Es gilt dieselbe Einschränkung, und Google ist da ehrlich: SynthID **markiert nur Inhalte mit Google-Ursprung**. Ein "kein Wasserzeichen" entlastet kein Bild aus Midjourney, Stable Diffusion oder irgendeinem Nicht-Google-Tool.

**Fazit zu Schritt 1:** Findest du Provenienz, hast du deine Antwort oft in Sekunden. Findest du keine, geh zu Schritt 2 — das Fehlen von Provenienz beweist für sich genommen nichts.

## Schritt 2: Lass Detektoren ran (deine zweite Linie)

Ist die Herkunftsspur leer, kommen Detektoren. Diese Tools analysieren die statistischen Fingerabdrücke, die generative Modelle hinterlassen — Muster, die für das menschliche Auge unsichtbar, für ein trainiertes Modell aber erkennbar sind.

Das solltest du wissen, um sie klug zu nutzen:

**Sie liefern Wahrscheinlichkeiten, keine Urteile.** Unabhängige Benchmarks von 2026 verorten die besten Detektoren bei etwa **85 % bis 94 % Genauigkeit auf sauberen, unkomprimierten Bildern** — und deutlich darunter, sobald ein Bild komprimiert, skaliert oder bearbeitet wurde. Das ist wirklich nützlich, aber keine Gewissheit. Behandle den Score als ein Beweisstück unter mehreren.

**Kompression ist ihre Schwäche.** Soziale Netzwerke komprimieren und bereinigen Bilder aggressiv. Ein stark komprimiertes echtes Foto kann einen Detektor verwirren — eine aufpolierte Fälschung ebenso. Das ist der häufigste Grund, warum Detektoren sich widersprechen.

**Kein einzelnes Tool ist für sich allein verlässlich.** Der praktische Workflow 2026: Schick das Bild durch mehr als einen starken Detektor und schau, wo sie *übereinstimmen*. Übereinstimmung ist dein Signal; Widerspruch heißt "nicht eindeutig" — eine völlig ehrliche Antwort.

Hier verdient sich ein On-Device-Tool seinen Platz. Die meisten Web-Detektoren verlangen, dass du dein Bild auf den Server einer Firma hochlädst — ein Datenschutzproblem, wenn das Foto persönlich oder sensibel ist. Wir haben **[Verifyco](https://apps.apple.com/app/id6772592963)** genau dafür gebaut: Es führt eine mehrschichtige forensische Analyse **vollständig auf deinem iPhone** aus, prüft Metadaten, KI-Generierungssignaturen und Frequenzmuster und liefert dir einen Vertrauens-Score mit vollständiger Aufschlüsselung, *was* gefunden wurde. Nichts wird hochgeladen, kein Konto nötig — und es ist ehrlich bei Unsicherheit: Sind die Signale schwach, sagt es "nicht eindeutig", statt zu raten. (Mehr zum iPhone-Workflow in unserem [Guide zum Prüfen von Fotos auf dem iPhone](/blog/check-if-photo-is-ai-on-iphone).)

## Schritt 3: Untersuche die Physik (das letzte Mittel)

Ist die Provenienz leer und sind die Detektoren gespalten, bleibt das, womit KI noch kämpft: **globale physikalische Konsistenz.** Generatoren bauen ein Bild lokal zusammen — Region für Region — und scheitern oft daran, die ganze Szene so zu versöhnen, wie es echtes Licht und echte Objektive tun.

Wo du hinschauen solltest, grob nach Verlässlichkeit geordnet:

### Schatten und Lichtrichtung
Verfolge jeden Schatten. In einem echten Foto fallen alle konsistent von der/den Lichtquelle(n). KI-Szenen mischen häufig Schattenwinkel, die kein reales Lichtsetup erzeugen könnte.

### Spiegelungen
Prüfe Augen, Brillen, Wasser, Fenster und glänzende Flächen. Gespiegelte Inhalte in KI-Bildern widersprechen oft der eigentlichen Szene — oder tauchen auf, wo sie nicht hingehören.

### Hintergrund-Geometrie
Gerade Linien sind schwer für KI. Schau auf Geländer, Bodenfliesen, Fensterrahmen, Mauerwerk und Türkanten. In KI-Bildern biegen sie sich, verschmelzen oder treiben zusätzliche Segmente, wo sie gerade verlaufen müssten.

### Tiefe und Unschärfe
Echte Objektive machen nach *Entfernung* unscharf. KI verwischt manchmal nach "ästhetischem Gefühl" und hinterlässt eine Kombination aus Vordergrund- und Hintergrundschärfe, die keine echte Kamera produzieren würde.

### Feine Texturen und Muster
Betrachte wiederkehrende Details aus der Nähe — Stoffgewebe, Gesichter in Menschenmengen, Laub, Text auf Schildern. KI strauchelt am nuancierten Zusammenspiel komplexer Muster und produziert bei genauer Betrachtung oft subtile, traumartige Ungereimtheiten.

**Eine entscheidende Einschränkung:** Diese Hinweise werden jeden Monat schwerer lesbar — genau deshalb ist die Physik die *letzte* Ebene und nicht die erste. Ein moderner Generator kann eine Szene erzeugen, die all diese Prüfungen besteht. Sie zu bestehen ist kein Echtheitsbeweis — es heißt nur, dass du keinen offensichtlichen Fehler gefunden hast.

## Alles zusammen: der Workflow 2026

Die ganze Methode an einem Ort:

1. **Provenienz zuerst.** Prüfe auf Content Credentials (C2PA) und bei Google-Verdacht auf SynthID über die Gemini-App. Fündig geworden? Dann hast du wahrscheinlich deine Antwort.
2. **Dann Detektoren.** Schick das Bild durch mehr als einen starken Detektor. Achte auf Übereinstimmung. Eine private On-Device-Option wie Verifyco hält dein Bild von fremden Servern fern.
3. **Physik zuletzt.** Musst du immer noch entscheiden, seziere Schatten, Spiegelungen, Geometrie, Tiefe und Textur — und vergiss nicht: Bestehen ist keine Garantie.

Die Haltung, die dich schützt, ist nicht "Ich erkenne Fälschungen". Sie lautet: "**Ich prüfe, bevor ich vertraue.**" Diese eine Gewohnheit bringt dich vor fast alle, die am selben Bild gedankenlos vorbeiscrollen. Du willst ein Video prüfen? Siehe [Woran man ein Deepfake-Video erkennt](/blog/how-to-spot-a-deepfake-video).

## Häufige Fragen

**Können ChatGPT oder Gemini mir sagen, ob ein Bild KI-generiert ist?**
Teilweise. Gemini kann Googles SynthID-Wasserzeichen prüfen, das nur Google-Bilder abdeckt. Allgemeine Chatbots können visuelle Ungereimtheiten *kommentieren*, sind aber keine dedizierten Detektoren und sollten nicht deine einzige Prüfung sein.

**Sind KI-Bilddetektoren genau?**
Die besten liegen laut Benchmarks 2026 bei etwa 85–94 % auf sauberen Bildern, bei komprimierten oder bearbeiteten darunter. Sie sind ein starkes Signal, kein Endurteil. Nutze mehrere und gewichte das Ergebnis zusammen mit der Provenienz.

**Warum geben mir zwei Detektoren unterschiedliche Antworten?**
Fast immer wegen Kompression oder Bearbeitung. Plattformen komprimieren und bereinigen Bilder stark, was die statistischen Fingerabdrücke zersetzt, auf die Detektoren angewiesen sind. Widersprechen sich die Tools, betrachte das Ergebnis als nicht eindeutig.

**Ist es KI, wenn Wasserzeichen und Metadaten fehlen?**
Nein — und das ist ein verbreiteter Irrtum. Herkunftsdaten verschwinden leicht durch Screenshots und Neuspeichern. Ein fehlendes Wasserzeichen beweist für sich nichts; es heißt nur, dass du dich auf Detektoren und Physik stützen musst.
