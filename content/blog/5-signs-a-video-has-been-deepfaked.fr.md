---
title: "5 signes qu’une vidéo a été deepfakée (+ comment vérifier)"
description: "Une check-list pratique pour repérer la vidéo deepfake — les artefacts de bords, le décalage labial, les indices de lumière, le mouvement artificiel et les indices audio qui trahissent encore les clips synthétiques."
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
updated: 2026-07-01
author: "L’équipe Verifyco"
tags: ["Deepfakes", "Détection d’IA", "Guides"]
image: /uploads/blog/1000012582.png
imageAlt: "Le pipeline de signaux Verifyco analyse une vidéo image par image"
---

Falsifier une vidéo de façon convaincante est plus difficile qu’une image fixe — il y a simplement beaucoup plus d’images à garder cohérentes, et le mouvement, la lumière et le son doivent s’accorder dans le temps. Bonne nouvelle pour vous : la vidéo deepfakée laisse encore des indices, surtout dans le mouvement et le son. Voici les cinq signes les plus fiables, comment vérifier chacun, et pourquoi aucun n’est un verdict à lui seul.

> **Comment inspecter n’importe quel clip :** téléchargez-le (l’enregistrement d’écran re-compresse et masque les artefacts), lisez-le à 0,25× et avancez image par image. Plein écran, luminosité au maximum. La plupart des indices vivent dans les transitions entre images, pas dans une image en pause.

## 1. Des bords qui scintillent ou « respirent »

Observez la frontière où le visage rejoint les cheveux, les oreilles, les lunettes ou le fond. Les modèles de face swap fusionnent à chaque image un visage généré sur une vraie tête, et cette couture **scintille, se déforme ou glisse** souvent légèrement d’une image à l’autre — une subtile « respiration » autour de la mâchoire, de la racine des cheveux ou du cou. Mettez en pause sur un tour de tête rapide ou quand une main passe devant le visage : c’est là que la fusion casse.

## 2. Des lèvres qui dérivent

L’audio et les formes de la bouche peuvent se décaler d’une fraction, surtout sur les occlusives (**p, b, m**) où les lèvres devraient se fermer complètement. Regardez la bouche d’abord sans le son, puis avec. Signaux d’alerte :

- Des lèvres qui ne se ferment pas tout à fait sur les sons « m »/« b ».
- Des dents et un intérieur de bouche flous, statiques ou étrangement uniformes.
- Une voix *presque* synchrone mais systématiquement un soupçon en avance ou en retard.

## 3. Une lumière et des couleurs qui ne s’accordent pas

La vraie lumière obéit à une seule physique dans toute la scène. Dans une vidéo composée ou générée, le visage peut ne pas correspondre à son environnement :

- Une peau éclairée chaud dans une pièce froide (ou l’inverse).
- Des ombres sur le visage pointant dans une autre direction que celles de la scène.
- Un visage qui reste uniformément éclairé pendant que la personne traverse lumière et ombre.
- Un léger « halo » de couleur ou un grain/bruit discordant là où le visage a été inséré.

[[cta]]

## 4. Mouvement, clignement et micro-expressions artificiels

Les visages font sans cesse de toutes petites choses — cligner à un rythme naturel, produire des micro-expressions, bouger la tête avec un léger tremblement. Les visages synthétiques se trompent souvent subtilement :

- **Rythme de clignement** trop bas (les premiers deepfakes ne clignaient presque pas) ou mécaniquement régulier.
- **Des yeux** qui ne suivent pas là où la personne « regarde », ou un regard fixe et vitreux.
- Un mouvement **trop fluide ou trop immobile** — une stabilité inquiétante, ou un visage qui semble flotter légèrement par rapport à la tête.
- **Front/oreilles figés** pendant que la bouche bouge beaucoup.

## 5. Provenance absente et métadonnées suspectes

Éloignez-vous des pixels ; vérifiez le fichier et sa source :

- Un clip qui se prétend un vrai enregistrement mais **sans métadonnées de caméra**, ou avec des métadonnées qui contredisent l’histoire (mauvaise date, mauvais appareil, logiciel d’édition).
- Aucune source crédible — il ne circule que sur des comptes anonymes ou marginaux, sans aucun média pour le relayer.
- À l’inverse, des **Content Credentials C2PA** valides sont une preuve *en faveur* de l’authenticité.

## Bonus : écoutez l’audio

Le clonage vocal a ses propres artefacts. Au casque, guettez une diction plate et « égale » avec peu de respiration, un rythme ou des accents étranges, un subtil timbre métallique, ou un bruit de fond qui se coupe anormalement entre les mots. Les arnaques purement audio (l’appel du « proche en difficulté ») comptent sur le fait que vous n’écoutiez pas d’aussi près.

## Ce qu’un outil forensique fait automatiquement

Vous pouvez capter beaucoup à l’œil, mais le logiciel va là où vous ne pouvez pas :

- **Flux optique et cohérence temporelle** — vérifie que les objets bougent comme de vrais objets, image après image.
- **Analyse faciale neuronale image par image** — signale les artefacts subtils laissés par la fusion.
- **Analyse de fréquence** — l’empreinte statistique des modèles génératifs, invisible à l’œil.
- **Métadonnées et provenance** — EXIF, cohérence d’encodage et C2PA en une passe.

La version de ces contrôles pour les images : [comment savoir si une image est générée par IA](/fr/blog/how-to-tell-if-an-image-is-ai-generated) ; le contexte sur la fabrication de ces faux : [qu’est-ce qu’un deepfake](/fr/blog/what-is-a-deepfake). Une liste de signes plus fournie : [comment repérer une vidéo deepfake : 9 signaux](/fr/blog/how-to-spot-a-deepfake-video).

### Check-list rapide

1. Télécharger, ralentir à 0,25×, avancer image par image.
2. Observer les **bords** du visage lors des rotations et occlusions.
3. Vérifier la **synchro labiale** sur les sons p/b/m ; inspecter dents/intérieur de la bouche.
4. Comparer la **lumière/les ombres** du visage à la scène.
5. Observer **clignement, regard et micro-mouvement**.
6. Vérifier la **source et les métadonnées** ; écouter l’**audio** au casque.

## En résumé

Aucun signe n’est une preuve à lui seul — les vrais clips ont aussi de la compression, du flou de mouvement et des cadrages étranges. L’approche fiable consiste à **combiner** les signaux — exactement ce que fait un outil forensique : il fusionne plusieurs contrôles indépendants en un seul verdict au lieu de parier sur un seul indice. Verifyco exécute cette fusion sur votre iPhone en quelques secondes, entièrement hors ligne — voir [la vérification sur l’appareil, expliquée](/fr/blog/on-device-verification-explained).
