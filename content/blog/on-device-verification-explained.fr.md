---
title: "La vérification sur l’appareil, expliquée (vos fichiers locaux sont analysés sur votre iPhone)"
description: "Pourquoi Verifyco analyse sur l’appareil les fichiers que vous choisissez sur votre iPhone : comment fonctionne l’analyse forensique sur l’appareil, ce que fait le Neural Engine, cloud vs appareil — et quels parcours utilisent un traitement temporaire côté serveur."
slug: on-device-verification-explained
date: 2026-06-08
updated: 2026-07-01
author: "L’équipe Verifyco"
tags: ["iOS", "Recherche", "Guides"]
image: /uploads/blog/1000012581.png
imageAlt: "Verifyco exécute une analyse privée sur l’appareil, sur un iPhone"
---

La plupart des outils de vérification de médias fonctionnent pareil : vous
téléversez votre fichier sur un serveur, leurs modèles l’analysent dans le cloud
et vous recevez un résultat. Pas Verifyco. L’analyse tourne **localement sur
votre iPhone**, et les photos et vidéos que vous choisissez restent sur l’appareil,
sauf si vous activez la vérification OpenAI facultative décrite plus bas. Voici ce
que cela signifie, comment c’est possible et pourquoi c’est important — surtout
pour les contenus sensibles que l’on a le plus besoin de vérifier.

> **Périmètre.** Cet article concerne les photos et vidéos que vous choisissez sur votre iPhone. Trois parcours Verifyco passent par un serveur et l’indiquent dans l’app : le média d’un lien public de réseau social est récupéré pour la vérification puis transmis à votre téléphone (l’analyse s’exécute toujours sur l’appareil et nous ne conservons pas le média) ; Verifyco Web traite les envois de façon éphémère en ne conservant que le rapport ; et la vérification de provenance OpenAI dans les Réglages, facultative et désactivée par défaut, n’envoie des images JPEG, PNG et WebP à OpenAI via notre serveur que si vous l’activez.

## Pourquoi « sur l’appareil » compte

- **Confidentialité.** Ce que vous voulez le plus vérifier est souvent le plus
  sensible — une photo privée, un clip qui a fuité, une image intime qu’on vous a
  envoyée. L’analyse sur l’appareil signifie que cela reste à l’écart du serveur
  d’un tiers, de ses logs et de ses brèches, sauf si vous activez la vérification
  OpenAI facultative, désactivée par défaut, décrite plus bas.
- **Vitesse.** L’analyse sur l’appareil n’a ni file d’attente ni aller-retour :
  elle démarre dès que vous choisissez le fichier — ce qui compte quand vous
  vérifiez une vidéo 4K, pas une vignette.
- **Fonctionne hors ligne.** En avion, avec un signal médiocre ou dans un
  environnement sécurisé sans réseau — l’analyse sur l’appareil marche quand
  même, car elle ne fait aucun appel réseau. Seule la vérification OpenAI
  facultative, si vous l’avez activée, a besoin d’une connexion.
- **Pas de compte, pas de trace.** Rien à créer, rien qui relie un fichier
  vérifié à votre identité.

> Pour un fichier que vous choisissez sur votre téléphone, il n’y a ni serveur, ni téléversement, ni compte, sauf si vous activez dans les Réglages la vérification de provenance OpenAI, facultative et désactivée par défaut : les images JPEG, PNG et WebP passent alors par notre serveur vers la Content Provenance API d’OpenAI, et notre serveur supprime ensuite l’image. Les vérifications de liens et Verifyco Web utilisent un traitement temporaire côté serveur, comme l’indique la note de périmètre ci-dessus.

## Ce que « sur l’appareil » veut vraiment dire

Les iPhone modernes embarquent un **Neural Engine** dédié — du silicium conçu
spécifiquement pour exécuter des modèles d’apprentissage automatique vite et
efficacement. Les frameworks **Core ML** et **Vision** d’Apple permettent à une
app de faire tourner des réseaux de neurones directement sur ce matériel.

Verifyco s’en sert pour faire localement ce que d’autres outils envoient à un GPU
dans un datacenter : analyse neuronale des visages et des scènes, transformées de
fréquence, lecture des métadonnées et hachage du fichier — le tout dans la
mémoire du téléphone, en quelques secondes. L’analyse elle-même n’envoie vos
médias nulle part ; seule la vérification OpenAI facultative, désactivée par
défaut, envoie une image à OpenAI via notre serveur, si vous l’activez.

## Les cinq signaux, exécutés en local

Verifyco fusionne **cinq signaux forensiques indépendants** en un seul score de
confiance de 0 à 100 :

1. **Content Credentials** — la provenance C2PA, le « reçu » signé de l’appareil
   photo.
2. **Forensique des métadonnées** — EXIF, cohérence d’encodage et anomalies de
   cadence d’images.
3. **Analyse faciale neuronale** — Apple Vision, image par image, à la recherche
   des artefacts laissés par les générateurs.
4. **Analyse du mouvement** — flux optique et cohérence temporelle entre images.
5. **Analyse de fréquence** — l’empreinte spectrale DCT des modèles de diffusion
   et GAN, invisible à l’œil.

La plupart des couches ne sont pas décisives à elles seules — c’est le principe. C’est la fusion de
plusieurs signaux indépendants qui rend le verdict robuste : en tromper une est
facile, toutes en même temps est difficile. (Ce que chaque couche attrape en
pratique : [comment savoir si une image est générée par IA](/fr/blog/how-to-tell-if-an-image-is-ai-generated)
et [5 signes qu’une vidéo a été deepfakée](/fr/blog/5-signs-a-video-has-been-deepfaked).)

## Cloud vs appareil : le compromis

| | Vérification cloud | Sur l’appareil (Verifyco) |
| --- | --- | --- |
| Vos médias | Téléversés sur un serveur | Les fichiers locaux restent sur votre téléphone, sauf si vous activez la vérification OpenAI |
| Vitesse | Upload + file + téléchargement | Démarre instantanément |
| Hors ligne | Non | Oui (la vérification OpenAI facultative nécessite une connexion) |
| Compte requis | Généralement | Non |
| Exposition | Logs serveur, brèches | Aucune au-delà de votre appareil, sauf si vous activez la vérification OpenAI |

La seule chose que le cloud peut offrir, c’est un modèle central géant. Mais pour
la vérification forensique, les signaux qui comptent — provenance, métadonnées,
motifs de fréquence, cohérence temporelle — tournent parfaitement sur l’appareil,
et le gain de confidentialité est énorme.

## Questions fréquentes

**Sur l’appareil, est-ce moins puissant que le cloud ?** Pour ces signaux
forensiques, l’analyse est la même mathématique ; seul le *lieu* change. La
détection reste une cible mouvante (les générateurs progressent) — c’est pourquoi
Verifyco fusionne plusieurs signaux et s’améliore avec les mises à jour.

**Est-ce que ça vide ma batterie ?** Une analyse est une brève salve de travail
du Neural Engine — comparable à un filtre photo lourd, puis c’est fini.

**Quels iPhone ?** Tout iPhone moderne avec Neural Engine (iOS 17+). Les puces
plus récentes finissent simplement plus vite.

**Voyez-vous un jour mes fichiers ?** Pas ceux que vous choisissez sur votre téléphone, sauf si vous activez la vérification de provenance OpenAI facultative (désactivée par défaut) : les images JPEG, PNG et WebP passent alors par notre serveur vers OpenAI ; notre serveur supprime ensuite chaque image. Le média d’un lien public que vous collez est récupéré pour la vérification et nous ne le conservons pas ; Verifyco Web traite les envois de façon éphémère et ne conserve que le rapport.

## En résumé

La vérification sur l’appareil vous donne un second avis de niveau forensique,
**privé par conception et assez rapide pour un usage réel** — avant de faire
confiance à un média, et avant de le partager. Nouveau sur le sujet ? Commencez
par [qu’est-ce qu’un deepfake](/fr/blog/what-is-a-deepfake).
