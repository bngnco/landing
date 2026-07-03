---
title: "La verifica sul dispositivo, spiegata (nulla lascia il tuo iPhone)"
description: "Perché Verifyco gira interamente sul tuo iPhone: come funziona l’analisi forense sul dispositivo, cosa fa il Neural Engine, cloud vs dispositivo — e perché non viene mai caricato nulla."
slug: on-device-verification-explained
date: 2026-06-08
updated: 2026-07-01
author: "Team Verifyco"
tags: ["iOS", "Ricerca", "Guide"]
image: /uploads/blog/1000012581.png
imageAlt: "Verifyco esegue un’analisi privata sul dispositivo su un iPhone"
---

La maggior parte degli strumenti di verifica dei media funziona allo stesso modo:
carichi il file su un server, i loro modelli lo analizzano nel cloud e ricevi un
risultato. Verifyco no. Ogni segnale gira **localmente sul tuo iPhone**, e le tue
foto e i tuoi video non lasciano mai il dispositivo. Ecco cosa significa, com’è
possibile e perché conta — soprattutto per il materiale sensibile che le persone
hanno più spesso bisogno di controllare.

## Perché "sul dispositivo" conta

- **Privacy.** Ciò che vuoi verificare di più è spesso il più sensibile — una
  foto privata, una clip trapelata, un’immagine intima che ti hanno mandato.
  L’analisi sul dispositivo significa che non tocca mai il server di qualcun
  altro, non finisce mai in un log e non può trapelare da una violazione che non
  è la tua.
- **Velocità.** Niente upload, niente coda, niente andata e ritorno. L’analisi
  parte nell’istante in cui scegli il file — e conta, quando controlli un video
  4K e non una miniatura.
- **Funziona offline.** In aereo, con segnale scarso o in un ambiente protetto
  senza rete — funziona comunque, perché non c’è nessuna chiamata di rete da
  fare.
- **Niente account, niente tracce.** Nulla a cui registrarsi, nulla che colleghi
  un file controllato alla tua identità.

> Non c’è un server. Non c’è un upload. Non c’è un account. I tuoi contenuti
> restano sul tuo telefono, punto.

## Cosa significa davvero "sul dispositivo"

Gli iPhone moderni includono un **Neural Engine** dedicato — silicio costruito
apposta per eseguire modelli di machine learning in modo veloce ed efficiente. I
framework **Core ML** e **Vision** di Apple permettono a un’app di far girare
reti neurali direttamente su quell’hardware.

Verifyco lo usa per fare in locale ciò che altri strumenti mandano a una GPU in
un datacenter: analisi neurale di volti e scene, trasformate di frequenza,
lettura dei metadati e hashing del file — tutto nella memoria del telefono, in
pochi secondi, senza trasmettere un solo byte dei tuoi contenuti.

## I cinque segnali, eseguiti in locale

Verifyco fonde **cinque segnali forensi indipendenti** in un unico punteggio di
fiducia da 0 a 100:

1. **Content Credentials** — la provenienza C2PA, la "ricevuta" firmata della
   fotocamera.
2. **Forense dei metadati** — EXIF, coerenza di codifica e anomalie del frame
   rate.
3. **Analisi facciale neurale** — Apple Vision, fotogramma per fotogramma, a
   caccia degli artefatti che i generatori lasciano dietro di sé.
4. **Analisi del movimento** — flusso ottico e coerenza temporale tra fotogrammi.
5. **Analisi di frequenza** — l’impronta spettrale DCT dei modelli di diffusione
   e GAN, invisibile all’occhio.

Nessun livello è decisivo da solo — è questo il punto. È la fusione di più
segnali indipendenti a rendere robusto il verdetto: ingannarne uno è facile,
ingannarli tutti insieme è difficile. (Cosa cattura ogni livello in pratica:
[come capire se un’immagine è generata dall’IA](/it/blog/how-to-tell-if-an-image-is-ai-generated)
e [5 segni che un video è stato deepfakato](/it/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs dispositivo: il confronto

| | Verifica cloud | Sul dispositivo (Verifyco) |
| --- | --- | --- |
| I tuoi contenuti | Caricati su un server | Non lasciano mai il tuo telefono |
| Velocità | Upload + coda + download | Parte all’istante |
| Offline | No | Sì |
| Account richiesto | Di solito | No |
| Esposizione privacy | Log del server, violazioni | Nessuna oltre il tuo dispositivo |

L’unica cosa che il cloud può offrire è un gigantesco modello centrale. Ma per la
verifica forense, i segnali che contano — provenienza, metadati, pattern di
frequenza, coerenza temporale — girano benissimo sul dispositivo, e il guadagno
di privacy è enorme.

## Domande frequenti

**Sul dispositivo è accurato quanto il cloud?** Per questi segnali forensi sì —
l’analisi è la stessa matematica; cambia solo il *luogo*. Il rilevamento resta un
bersaglio mobile (i generatori migliorano) — per questo Verifyco fonde più
segnali e migliora con gli aggiornamenti dell’app.

**Scarica la batteria?** Una singola analisi è una breve raffica di lavoro del
Neural Engine — paragonabile a un filtro fotografico pesante, poi finisce lì.

**Quali iPhone?** Qualsiasi iPhone moderno con Neural Engine (iOS 17+). I chip
più recenti finiscono semplicemente prima.

**Vedete mai i miei file?** No. Non esiste alcun percorso di upload — la
funzione che invierebbe i tuoi contenuti a noi semplicemente non esiste.

## In sintesi

La verifica sul dispositivo ti dà un secondo parere di livello forense, **privato
per progettazione e abbastanza veloce da usare davvero** — prima di fidarti di un
contenuto, e prima di condividerlo. Nuovo sull’argomento? Parti da
[che cos’è un deepfake](/it/blog/what-is-a-deepfake).
