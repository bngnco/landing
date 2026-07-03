---
title: "Come capire se un video è generato dall'IA (guida 2026)"
description: "I modelli classe Sora creano video da un prompt di testo. Impara a capire se un video è generato dall'IA: errori di fisica, artefatti di texture, provenienza e strumenti forensi."
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
updated: 2026-07-03
author: "Team Verifyco"
tags:
  - Rilevamento IA
  - Guide
image: ''
imageAlt: "Analisi di un video su iPhone per capire se è generato dall'IA"
---

Un deepfake significava una cosa sola: un video vero con il volto sostituito. Quell'epoca è finita. I modelli testo-video — Sora, Veo e i loro successori open source — ormai generano **intere scene da un prompt**: le persone, la stanza, la luce, il movimento di camera… niente di tutto ciò è mai esistito. Questi video totalmente sintetici falliscono in modo diverso dai face swap, quindi meritano una checklist tutta loro.

Questa guida è esattamente quello. (Se stai esaminando un video di una *persona reale specifica* che dice qualcosa, guarda anche i segnali da face swap in [come riconoscere un video deepfake](/it/blog/how-to-spot-a-deepfake-video) — i casi reali mescolano entrambi.)

## Prima: i segnali facili nel fotogramma

Scarica il clip se puoi (la registrazione dello schermo ricomprime e nasconde le prove), riproducilo lento, a schermo intero, luminoso. Cerca:

- **Testo e insegne.** I mondi generati storpiano ancora la scrittura — insegne, maglie, targhe ed etichette che sembrano giuste a colpo d'occhio e si dissolvono in pseudo-lettere in pausa. Un testo leggibile e coerente per tutto il clip resta davvero difficile da falsificare.
- **Mani, dita e passaggi di oggetti.** Dita che si fondono, posate che colano nel cibo, oggetti che passano *attraverso* le mani. L'interazione tra le cose resta il punto debole.
- **Le persone sullo sfondo.** Le comparse costano poco al modello ma sono mal supervisionate: occhio ai passanti che scivolano, si ripetono o si fondono tra loro.
- **Simmetria e fisica dei riflessi.** Specchi, vetrine, acqua e occhiali spesso riflettono una scena *plausibile* invece che *la* scena. Se un riflesso contraddice il mondo, è decisivo.
- **Movimento troppo liscio.** Il video generato ha spesso una camera fluttuante, onirica, e soggetti leggermente rallentati e senza peso — niente sobbalza, niente trema in modo credibile.

## Poi: verifica la permanenza degli oggetti

È la classe di segnali più affidabile per il video interamente generato. Gli oggetti reali persistono; quelli generati *tendono soltanto* a persistere.

Scorri il clip seguendo un singolo oggetto — una tazza, un bottone, un tatuaggio, un orecchino. In un video IA può **cambiare forma, saltare di posizione, sparire o trasformarsi** tra le inquadrature o perfino tra un secondo e l'altro. Conta le cose: dita, ruote, gambe di sedia, ante di finestra. Riconta cinque secondi dopo. Un video vero non si contraddice mai; i modelli generativi ancora sì, soprattutto oltre i dieci secondi — motivo per cui tanti clip sintetici sono sospettosamente corti e pieni di stacchi.

[[cta]]

## Controlla la provenienza, non solo i pixel

- **Prima la fonte.** Chi l'ha pubblicato, dove altro esiste, qualche testata credibile lo riporta? Un clip clamoroso che esiste solo su un account anonimo è una bandiera rossa prima ancora di guardare un fotogramma.
- **Content Credentials.** Alcuni strumenti IA (compresi i modelli classe Sora) allegano metadati C2PA che dichiarano il contenuto sintetico — e alcune piattaforme li mostrano. L'assenza non prova nulla (i metadati spariscono con screenshot e ricondivisioni), ma la presenza è una risposta rapida e onesta. Spieghiamo l'intero sistema in [Content Credentials (C2PA), spiegato](/it/blog/content-credentials-c2pa-explained).
- **Filigrane.** Diversi generatori incorporano filigrane visibili o invisibili (come SynthID). Quelle invisibili richiedono il verificatore del produttore — utile quando scatta, muto su tutti gli altri generatori.

## Quando gli occhi non bastano: l'analisi forense

Ogni segnale qui sopra sbiadisce a ogni release dei modelli, e la ricerca continua a mostrare che gli umani riconoscono il video sintetico di alta qualità a tassi appena sopra il caso. L'approccio robusto è quello degli strumenti forensi: **combinare segnali indipendenti invece di fidarsi di uno solo.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** esegue questa fusione direttamente sul tuo iPhone: coerenza temporale e flusso ottico (le cose si muovono e persistono come oggetti reali?), analisi nel dominio delle frequenze (l'impronta statistica che i modelli di diffusione lasciano), forense di metadati e codifica, controllo della provenienza e analisi neurale dei volti quando ci sono volti. Ottieni un punteggio di fiducia 0–100 con la scomposizione per livello — e onestà quando le prove non sono conclusive, come spesso accade con i clip social pesantemente ricompressi. Puoi anche incollare un link da una piattaforma social invece di scaricare il file. Tutto gira **sul dispositivo**: il clip non lascia mai il telefono ([perché è importante](/it/blog/on-device-verification-explained)).

### Checklist rapida

1. Scarica il file originale; riproduci a 0,25×.
2. Metti in pausa su **testo, mani, riflessi, persone sullo sfondo**.
3. Segui un oggetto per tutto il clip — **persiste?**
4. Verifica **chi l'ha pubblicato** e se esiste in fonti credibili.
5. Cerca **Content Credentials / filigrane**.
6. Passalo all'**analisi forense sul dispositivo** e leggi la scomposizione per livelli, non solo il verdetto.

## Domande frequenti

**Nel 2026 il video generato dall'IA si può rilevare in modo affidabile?**
Nessun metodo da solo è affidabile. Combinare ispezione visiva, provenienza e forense multi-segnale dà prove solide nella maggior parte dei casi — ma aspettati "non conclusivo" sulle ricondivisioni molto compresse, e tratta l'output di qualunque strumento come indizio, non come prova.

**Qual è il singolo controllo più rapido?**
Pausa su qualsiasi testo nella scena, poi controlla i riflessi. Entrambi restano costantemente sbagliati nel video generato e richiedono meno di un minuto.

**Perché tanti video IA sono corti?**
Le generazioni lunghe accumulano errori di coerenza — gli oggetti derivano, i volti mutano, le scene si contraddicono. Molti clip sintetici stanno sotto i ~10–15 secondi o si nascondono dietro stacchi rapidi proprio per non tradirsi.

**Una filigrana o una credential è una prova in un senso o nell'altro?**
La presenza di una credential IA è una prova solida che è sintetico. L'assenza non prova assolutamente nulla — alla maggior parte dei clip veri *e* falsi online le piattaforme hanno già rimosso i metadati.

## Conclusione

Il video interamente generato dall'IA ha rotto la vecchia regola del "vedere per credere", ma non ha rotto la verifica: fisica, permanenza, provenienza e forense catturano ancora ciò che l'occhio perde. Fanne un'abitudine — **verifica prima di condividere** — e tieni a portata la guida gemella per le immagini fisse: [come capire se un'immagine è generata dall'IA](/it/blog/how-to-tell-if-an-image-is-ai-generated).
