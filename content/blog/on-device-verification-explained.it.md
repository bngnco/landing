---
title: "La verifica sul dispositivo, spiegata (i tuoi file locali vengono analizzati sul tuo iPhone)"
description: "Perché Verifyco analizza sul dispositivo i file che scegli sul tuo iPhone: come funziona l’analisi forense sul dispositivo, cosa fa il Neural Engine, cloud vs dispositivo — e quali percorsi usano un’elaborazione temporanea sul server."
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
risultato. Verifyco no. L’analisi gira **localmente sul tuo iPhone**, e le foto e i
video che scegli restano sul dispositivo, a meno che tu non attivi il controllo
facoltativo di OpenAI descritto più sotto. Ecco cosa significa, com’è
possibile e perché conta — soprattutto per il materiale sensibile che le persone
hanno più spesso bisogno di controllare.

> **Ambito.** Questo articolo riguarda le foto e i video che scegli sul tuo iPhone. Tre percorsi di Verifyco usano un server e lo dichiarano nell’app: il contenuto di un link pubblico di un social viene recuperato per il controllo e consegnato al tuo telefono (l’analisi continua a girare sul dispositivo e non lo conserviamo); Verifyco Web elabora i caricamenti in modo effimero conservando solo il report; e il controllo di provenienza di OpenAI nelle Impostazioni, facoltativo e disattivato di default, invia immagini JPEG, PNG e WebP a OpenAI tramite il nostro server solo se lo attivi.

## Perché "sul dispositivo" conta

- **Privacy.** Ciò che vuoi verificare di più è spesso il più sensibile — una
  foto privata, una clip trapelata, un’immagine intima che ti hanno mandato.
  L’analisi sul dispositivo significa che resta fuori dal server di qualcun
  altro, dai suoi log e dalle sue violazioni, a meno che tu non attivi il
  controllo di OpenAI, facoltativo e disattivato di default, descritto più sotto.
- **Velocità.** L’analisi sul dispositivo non ha code né andata e ritorno,
  quindi parte nell’istante in cui scegli il file — e conta, quando controlli un video
  4K e non una miniatura.
- **Funziona offline.** In aereo, con segnale scarso o in un ambiente protetto
  senza rete — l’analisi sul dispositivo funziona comunque, perché non fa
  nessuna chiamata di rete. Solo il controllo facoltativo di OpenAI, se l’hai
  attivato, richiede una connessione.
- **Niente account, niente tracce.** Nulla a cui registrarsi, nulla che colleghi
  un file controllato alla tua identità.

> Per un file che scegli sul tuo telefono non c’è un server, non c’è un upload, non c’è un account, a meno che tu non attivi nelle Impostazioni il controllo di provenienza di OpenAI, facoltativo e disattivato di default: in quel caso le immagini JPEG, PNG e WebP passano dal nostro server alla Content Provenance API di OpenAI, e al termine il nostro server elimina l’immagine. I controlli dei link e Verifyco Web usano un’elaborazione temporanea sul server, come dice la nota sull’ambito qui sopra.

## Cosa significa davvero "sul dispositivo"

Gli iPhone moderni includono un **Neural Engine** dedicato — silicio costruito
apposta per eseguire modelli di machine learning in modo veloce ed efficiente. I
framework **Core ML** e **Vision** di Apple permettono a un’app di far girare
reti neurali direttamente su quell’hardware.

Verifyco lo usa per fare in locale ciò che altri strumenti mandano a una GPU in
un datacenter: analisi neurale di volti e scene, trasformate di frequenza,
lettura dei metadati e hashing del file — tutto nella memoria del telefono, in
pochi secondi. L’analisi in sé non invia i tuoi contenuti da nessuna parte; solo
il controllo di OpenAI, facoltativo e disattivato di default, se lo attivi,
invia un’immagine a OpenAI tramite il nostro server.

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

La maggior parte dei livelli non è decisiva da sola — è questo il punto. È la fusione di più
segnali indipendenti a rendere robusto il verdetto: ingannarne uno è facile,
ingannarli tutti insieme è difficile. (Cosa cattura ogni livello in pratica:
[come capire se un’immagine è generata dall’IA](/it/blog/how-to-tell-if-an-image-is-ai-generated)
e [5 segni che un video è stato deepfakato](/it/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs dispositivo: il confronto

| | Verifica cloud | Sul dispositivo (Verifyco) |
| --- | --- | --- |
| I tuoi contenuti | Caricati su un server | I file locali restano sul tuo telefono, a meno che tu non attivi il controllo OpenAI |
| Velocità | Upload + coda + download | Parte all’istante |
| Offline | No | Sì (il controllo facoltativo di OpenAI richiede una connessione) |
| Account richiesto | Di solito | No |
| Esposizione privacy | Log del server, violazioni | Nessuna oltre il tuo dispositivo, a meno che tu non attivi il controllo OpenAI |

L’unica cosa che il cloud può offrire è un gigantesco modello centrale. Ma per la
verifica forense, i segnali che contano — provenienza, metadati, pattern di
frequenza, coerenza temporale — girano benissimo sul dispositivo, e il guadagno
di privacy è enorme.

## Domande frequenti

**L’analisi sul dispositivo è più debole di quella nel cloud?** Per questi
segnali forensi l’analisi è la stessa matematica; cambia solo il *luogo*. Il rilevamento resta un
bersaglio mobile (i generatori migliorano) — per questo Verifyco fonde più
segnali e migliora con gli aggiornamenti dell’app.

**Scarica la batteria?** Una singola analisi è una breve raffica di lavoro del
Neural Engine — paragonabile a un filtro fotografico pesante, poi finisce lì.

**Quali iPhone?** Qualsiasi iPhone moderno con Neural Engine (iOS 17+). I chip
più recenti finiscono semplicemente prima.

**Vedete mai i miei file?** Quelli che scegli sul tuo telefono no, a meno che tu non attivi il controllo facoltativo di provenienza di OpenAI (disattivato di default), che invia le immagini JPEG, PNG e WebP a OpenAI tramite il nostro server; al termine il nostro server elimina ogni immagine. Il contenuto di un link pubblico che incolli viene recuperato per il controllo e non lo conserviamo; Verifyco Web elabora i caricamenti in modo effimero e conserva solo il report.

## In sintesi

La verifica sul dispositivo ti dà un secondo parere di livello forense, **privato
per progettazione e abbastanza veloce da usare davvero** — prima di fidarti di un
contenuto, e prima di condividerlo. Nuovo sull’argomento? Parti da
[che cos’è un deepfake](/it/blog/what-is-a-deepfake).
