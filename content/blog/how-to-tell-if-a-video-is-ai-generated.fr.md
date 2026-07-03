---
title: "Comment savoir si une vidéo est générée par IA (guide 2026)"
description: "Les modèles de classe Sora créent désormais des vidéos à partir d'un texte. Apprenez à savoir si une vidéo est générée par IA : failles de physique, artefacts, provenance et outils forensiques."
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
updated: 2026-07-03
author: "L’équipe Verifyco"
tags:
  - Détection d’IA
  - Guides
image: ''
imageAlt: "Analyse d'une vidéo sur iPhone pour savoir si elle est générée par IA"
---

Un deepfake ne désignait qu'une chose : une vraie vidéo au visage remplacé. Cette époque est révolue. Les modèles texte-vers-vidéo — Sora, Veo et leurs successeurs open source — génèrent désormais **des scènes entières à partir d'une consigne** : les gens, la pièce, la lumière, le mouvement de caméra… rien de tout cela n'a jamais existé. Ces vidéos totalement synthétiques échouent autrement que les échanges de visage ; elles méritent donc leur propre liste de contrôle.

C'est ce guide. (Si vous examinez une vidéo d'une *personne réelle précise* en train de parler, consultez aussi les signaux d'échange de visage dans [comment repérer une vidéo deepfake](/fr/blog/how-to-spot-a-deepfake-video) — les cas réels mélangent les deux.)

## D'abord, cherchez les signaux faciles dans l'image

Téléchargez le clip si possible (l'enregistrement d'écran recompresse et masque les preuves), lisez-le au ralenti, en plein écran, lumineux. Cherchez :

- **Texte et enseignes.** Les mondes générés massacrent encore l'écriture — enseignes, maillots, plaques et étiquettes qui semblent justes au premier regard et se dissolvent en pseudo-lettres à la pause. Un texte lisible et cohérent tout au long d'un clip reste réellement difficile à truquer.
- **Mains, doigts et passages d'objets.** Doigts qui fusionnent, couverts qui fondent dans la nourriture, objets qui traversent les mains. L'interaction entre les choses reste le point faible.
- **Les gens à l'arrière-plan.** Les figurants coûtent peu au modèle mais sont mal surveillés : guettez les passants qui glissent, se répètent ou se fondent les uns dans les autres.
- **Symétrie et physique des reflets.** Miroirs, vitres, eau et lunettes reflètent souvent une scène *plausible* plutôt que *la* scène. Si un reflet contredit le monde, c'est décisif.
- **Un mouvement trop lisse.** La vidéo générée a souvent une caméra flottante, onirique, et des sujets aux gestes légèrement ralentis, sans poids — rien ne cahote, rien ne tremble de façon crédible.

## Ensuite, vérifiez la permanence des objets

C'est la classe de signaux la plus fiable pour la vidéo entièrement générée. Les objets réels persistent ; les objets générés ne font que *tendre à* persister.

Parcourez le clip en suivant un seul objet — une tasse, un bouton, un tatouage, une boucle d'oreille. Dans une vidéo IA, il peut **changer de forme, sauter de position, disparaître ou se transformer** entre les plans, voire entre les secondes. Comptez : les doigts, les roues, les pieds de chaise, les carreaux. Recomptez cinq secondes plus tard. Une vraie vidéo ne se contredit jamais ; les modèles génératifs, si — surtout au-delà de dix secondes. C'est aussi pourquoi tant de clips synthétiques sont étrangement courts et truffés de coupes.

[[cta]]

## Vérifiez la provenance, pas seulement les pixels

- **La source d'abord.** Qui l'a publié, où existe-t-il ailleurs, un média crédible le reprend-il ? Un clip spectaculaire qui n'existe que sur un compte anonyme est un drapeau rouge avant même de regarder une image.
- **Content Credentials.** Certains outils d'IA (dont les modèles de classe Sora) attachent des métadonnées C2PA déclarant le contenu synthétique — et certaines plateformes les affichent. L'absence ne prouve rien (les métadonnées disparaissent aux captures d'écran et re-partages), mais la présence est une réponse rapide et honnête. Nous expliquons tout le système dans [Content Credentials (C2PA), expliqué](/fr/blog/content-credentials-c2pa-explained).
- **Filigranes.** Plusieurs générateurs intègrent des filigranes visibles ou invisibles (comme SynthID). Les invisibles exigent le vérificateur du fournisseur — utile quand il réagit, muet sur tous les autres générateurs.

## Quand vos yeux ne suffisent plus : l'analyse forensique

Chaque signal ci-dessus s'estompe à chaque nouvelle version de modèle, et la recherche montre sans cesse que les humains identifient la vidéo synthétique de haute qualité à des taux à peine supérieurs au hasard. L'approche robuste est celle des outils forensiques : **combiner des signaux indépendants plutôt que se fier à un seul.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** exécute cette fusion directement sur votre iPhone : cohérence temporelle et flux optique (les choses bougent-elles et persistent-elles comme des objets réels ?), analyse fréquentielle (l'empreinte statistique que laissent les modèles de diffusion), forensique des métadonnées et de l'encodage, vérification de provenance et analyse faciale neuronale quand il y a des visages. Vous obtenez un score de confiance de 0 à 100 avec le détail couche par couche — et de l'honnêteté quand la preuve n'est pas concluante, ce qui est fréquent pour les clips sociaux fortement recompressés. Vous pouvez aussi coller un lien d'une plateforme sociale au lieu de télécharger le fichier. Tout s'exécute **sur l'appareil** : le clip ne quitte jamais votre téléphone ([pourquoi c'est important](/fr/blog/on-device-verification-explained)).

### Liste de contrôle rapide

1. Téléchargez le fichier original ; lisez à 0,25×.
2. Faites pause sur **le texte, les mains, les reflets, les gens du fond**.
3. Suivez un objet tout au long du clip — **persiste-t-il ?**
4. Vérifiez **qui l'a publié** et s'il existe ailleurs de crédible.
5. Cherchez **Content Credentials / filigranes**.
6. Passez-le à **l'analyse forensique sur l'appareil** et lisez le détail par couche, pas seulement le verdict.

## Questions fréquentes

**Peut-on détecter de façon fiable la vidéo générée par IA en 2026 ?**
Aucune méthode isolée n'est fiable. Combiner inspection visuelle, provenance et forensique multi-signaux donne des preuves solides dans la plupart des cas — mais attendez-vous à du « non concluant » sur les re-partages très compressés, et traitez la sortie de tout outil comme un indice, pas une preuve.

**Quel est le contrôle unique le plus rapide ?**
Pause sur n'importe quel texte de la scène, puis vérifiez les reflets. Les deux restent systématiquement défaillants dans la vidéo générée, en moins d'une minute.

**Pourquoi tant de vidéos IA sont-elles courtes ?**
Les générations longues accumulent les erreurs de cohérence — les objets dérivent, les visages mutent, les scènes se contredisent. Beaucoup de clips synthétiques restent sous ~10–15 secondes ou se cachent derrière des coupes rapides précisément pour ne pas se trahir.

**Un filigrane ou une crédential est-il une preuve dans un sens ou l'autre ?**
La présence d'une crédential IA est une preuve solide du caractère synthétique. L'absence ne prouve strictement rien — la plupart des clips réels *et* faux en ligne ont vu leurs métadonnées effacées par les plateformes.

## Conclusion

La vidéo entièrement générée par IA a brisé la vieille règle « voir, c'est croire », mais pas la vérification : la physique, la permanence, la provenance et la forensique attrapent toujours ce que l'œil rate. Prenez l'habitude — **vérifiez avant de partager** — et gardez sous la main le guide jumeau pour les images fixes : [comment savoir si une image est générée par IA](/fr/blog/how-to-tell-if-an-image-is-ai-generated).
