---
title: Qu’est-ce qu’un deepfake ? Un guide clair
description: 'Les deepfakes expliqués simplement : comment on les fabrique, pourquoi ils sont devenus si convaincants et comment distinguer en pratique un visage ou une voix de synthèse du vrai.'
slug: what-is-a-deepfake
date: 2026-06-22
author: L’équipe Verifyco
tags:
  - Deepfakes
  - Guides
image: /uploads/blog/deepfake.png
imageAlt: Portrait authentique et deepfake comparés côte à côte en analyse forensique
---

Un **deepfake** est un contenu — le plus souvent une vidéo, une image ou un clip
vocal — dans lequel un modèle d’apprentissage automatique a remplacé, généré ou
modifié une personne pour donner l’impression qu’elle a fait ou dit quelque
chose qui n’a jamais eu lieu. Le mot mêle *deep learning* et *fake*.

Il y a quelques années, les deepfakes étaient une curiosité. Aujourd’hui, ils
sont à quelques clics, et les meilleurs sont vraiment difficiles à repérer à
l’œil nu. Voici ce qui se passe réellement.

## Comment on fabrique un deepfake

La plupart entrent dans trois catégories :

- **Échange de visage** — le visage d’une personne plaqué sur le corps d’une
  autre dans une vidéo.
- **Génération complète** — une personne (ou une scène entière) créée de toutes
  pièces par un modèle de diffusion. Personne n’a rien filmé.
- **Clonage de voix** — quelques secondes d’audio suffisent pour faire dire
  n’importe quoi à quelqu’un.

Les modèles apprennent à partir de vastes ensembles de visages et de voix réels,
puis produisent de nouvelles images *statistiquement plausibles* — c’est
précisément pour cela qu’ils nous trompent.

[[cta]]

## Pourquoi ils sont devenus si bons

Deux choses ont changé : les modèles se sont énormément améliorés dans les
détails fins, et les outils sont devenus simples. Ce qui exigeait autrefois un
GPU et un week-end tient désormais dans une app. Les indices classiques — bords
scintillants, yeux sans vie, mains déformées — ont presque disparu dans la
génération actuelle.

## Comment vous protéger

On ne peut pas se fier à son œil face aux deepfakes modernes : appuyez-vous
plutôt sur une méthode.

1. **Interrogez la source.** D’où cela provient-il vraiment ?
2. **Cherchez la provenance.** Les Content Credentials (C2PA) sont un reçu signé
   d’origine — leur présence est un signal fort *en faveur* de l’authenticité.
3. **Faites une vérification forensique.** Les outils qui combinent plusieurs
   signaux — métadonnées, analyse du visage, motifs de fréquence — détectent ce
   que l’œil ne voit pas.

C’est toute l’idée de Verifyco : un deuxième avis rapide, directement sur
l’appareil, avant de faire confiance à un contenu — ou de le partager.
