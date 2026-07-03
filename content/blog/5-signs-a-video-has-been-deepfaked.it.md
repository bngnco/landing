---
title: "5 segni che un video è stato deepfakato (+ come verificarlo)"
description: "Una checklist pratica per individuare i video deepfake — gli artefatti dei bordi, il labiale fuori sincrono, gli indizi di luce, il movimento innaturale e le tracce audio che ancora tradiscono le clip sintetiche."
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
updated: 2026-07-01
author: "Team Verifyco"
tags: ["Deepfake", "Rilevamento IA", "Guide"]
image: /uploads/blog/1000012582.png
imageAlt: "La pipeline di segnali Verifyco analizza un video fotogramma per fotogramma"
---

Falsificare un video in modo convincente è più difficile che un’immagine fissa — ci sono semplicemente molti più fotogrammi da mantenere coerenti, e movimento, luce e audio devono accordarsi nel tempo. Buone notizie per te: il video deepfakato lascia ancora indizi, soprattutto nel movimento e nel suono. Ecco i cinque segni più affidabili, come verificare ciascuno e perché nessuno è un verdetto da solo.

> **Come ispezionare qualsiasi clip:** scaricala (la registrazione dello schermo ricomprime e nasconde gli artefatti), riproducila a 0,25× e avanza fotogramma per fotogramma. Schermo intero, luminosità alta. La maggior parte degli indizi vive nelle transizioni tra fotogrammi, non in un’immagine in pausa.

## 1. Bordi che tremolano o "respirano"

Osserva il confine dove il volto incontra capelli, orecchie, occhiali o sfondo. I modelli di face swap fondono a ogni fotogramma un volto generato su una testa reale, e quella cucitura spesso **sfarfalla, si deforma o slitta** leggermente tra i fotogrammi — un sottile "respiro" attorno a mascella, attaccatura dei capelli o collo. Metti in pausa su una rotazione veloce della testa o quando una mano passa davanti al volto: è lì che la fusione si rompe.

## 2. Labiale che deriva

Audio e forme della bocca possono sfasarsi di una frazione, soprattutto sulle occlusive (**p, b, m**) dove le labbra dovrebbero chiudersi del tutto. Guarda la bocca prima senza audio, poi con. Segnali d’allarme:

- Labbra che non si chiudono del tutto sui suoni "m"/"b".
- Denti e interno della bocca sfocati, statici o stranamente uniformi.
- Una voce *quasi* sincrona ma costantemente un soffio in anticipo o in ritardo.

## 3. Luce e colore che non si accordano

La luce reale obbedisce a una sola fisica in tutta la scena. Nel video composto o generato, il volto può non corrispondere al suo ambiente:

- Pelle illuminata calda in una stanza fredda (o viceversa).
- Ombre sul volto che puntano in una direzione diversa da quelle della scena.
- Un volto che resta uniformemente illuminato mentre la persona attraversa luce e ombra.
- Un lieve "alone" di colore o grana/rumore discordante dove il volto è stato inserito.

[[cta]]

## 4. Movimento, ammiccamento e micro-espressioni innaturali

I volti fanno continuamente piccole cose — battono le palpebre a ritmo naturale, producono micro-espressioni, muovono la testa con un lieve tremolio. I volti sintetici spesso sbagliano sottilmente:

- **Frequenza di ammiccamento** troppo bassa (i primi deepfake quasi non battevano le palpebre) o meccanicamente regolare.
- **Occhi** che non seguono dove la persona "guarda", o uno sguardo fisso e vitreo.
- Movimento **troppo fluido o troppo fermo** — una quiete inquietante, o un volto che sembra fluttuare leggermente rispetto alla testa.
- **Fronte/orecchie congelate** mentre la bocca si muove molto.

## 5. Provenienza assente e metadati sospetti

Allontanati dai pixel; controlla il file e la sua fonte:

- Una clip che dichiara di essere una registrazione reale ma **senza metadati della fotocamera**, o con metadati che contraddicono la storia (data sbagliata, dispositivo sbagliato, software di editing).
- Nessuna fonte credibile — circola solo su account anonimi o marginali, senza nessuna testata a rilanciarla.
- Al contrario, **Content Credentials C2PA** valide sono una prova *a favore* dell’autenticità.

## Bonus: ascolta l’audio

La clonazione vocale ha i suoi artefatti. Con le cuffie, cerca una dizione piatta e "uniforme" con poco respiro, un ritmo o accenti strani, un sottile timbro metallico, o un rumore di fondo che si interrompe in modo innaturale tra le parole. Le truffe solo audio (la chiamata del "parente nei guai") contano sul fatto che tu non ascolti così da vicino.

## Cosa fa automaticamente uno strumento forense

A occhio cogli molto, ma il software arriva dove tu non puoi:

- **Flusso ottico e coerenza temporale** — verifica che gli oggetti si muovano come oggetti reali, fotogramma dopo fotogramma.
- **Analisi facciale neurale fotogramma per fotogramma** — segnala i sottili artefatti lasciati dalla fusione.
- **Analisi di frequenza** — l’impronta statistica dei modelli generativi, invisibile all’occhio.
- **Metadati e provenienza** — EXIF, coerenza di codifica e C2PA in un solo passaggio.

La versione di questi controlli per le immagini: [come capire se un’immagine è generata dall’IA](/it/blog/how-to-tell-if-an-image-is-ai-generated); il contesto su come nascono questi falsi: [che cos’è un deepfake](/it/blog/what-is-a-deepfake). Una lista di segnali più approfondita: [come riconoscere un video deepfake: 9 segnali](/it/blog/how-to-spot-a-deepfake-video).

### Checklist rapida

1. Scarica, rallenta a 0,25×, avanza fotogramma per fotogramma.
2. Osserva i **bordi** del volto nelle rotazioni e occlusioni.
3. Controlla il **labiale** sui suoni p/b/m; ispeziona denti/interno della bocca.
4. Confronta **luce/ombre** del volto con la scena.
5. Osserva **ammiccamento, sguardo e micro-movimento**.
6. Controlla **fonte e metadati**; ascolta l’**audio** in cuffia.

## In sintesi

Nessun segno è una prova da solo — anche le clip reali hanno compressione, motion blur e inquadrature strane. L’approccio affidabile è **combinare** i segnali — esattamente ciò che fa uno strumento forense: fonde più controlli indipendenti in un unico verdetto invece di scommettere su un singolo indizio. Verifyco esegue quella fusione sul tuo iPhone in pochi secondi, completamente offline — vedi [la verifica sul dispositivo, spiegata](/it/blog/on-device-verification-explained).
