---
title: "5 señales de que un vídeo ha sido deepfakeado (+ cómo comprobarlo)"
description: "Una lista práctica para detectar vídeo deepfake — los artefactos de bordes, el desfase de labios, las pistas de iluminación, el movimiento antinatural y los indicios de audio que aún delatan los clips sintéticos."
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
updated: 2026-07-01
author: "Equipo Verifyco"
tags: ["Deepfakes", "Detección de IA", "Guías"]
image: /uploads/blog/signals.png
imageAlt: "El pipeline de señales de Verifyco analizando un vídeo fotograma a fotograma"
---

Falsificar un vídeo de forma convincente es más difícil que una imagen fija — simplemente hay muchos más fotogramas que mantener consistentes, y el movimiento, la luz y el audio tienen que encajar a lo largo del tiempo. Buenas noticias para ti: el vídeo deepfakeado aún deja pistas, sobre todo en el movimiento y el sonido. Aquí tienes las cinco señales más fiables, cómo comprobar cada una y por qué ninguna es un veredicto por sí sola.

> **Cómo inspeccionar cualquier clip:** descárgalo (grabar la pantalla re-comprime y oculta artefactos), reprodúcelo a 0,25× y avanza fotograma a fotograma. Pantalla completa, brillo alto. La mayoría de las pistas viven en las transiciones entre fotogramas, no en una imagen pausada.

## 1. Bordes que tiemblan o "respiran"

Observa el límite donde la cara se une con el pelo, las orejas, las gafas o el fondo. Los modelos de face swap mezclan una cara generada sobre una cabeza real en cada fotograma, y esa costura a menudo **parpadea, se deforma o se desplaza** ligeramente entre fotogramas — una sutil "respiración" alrededor de la mandíbula, el nacimiento del pelo o el cuello. Pausa en un giro rápido de cabeza o cuando una mano pasa por delante de la cara: ahí es donde se rompe la mezcla.

## 2. Labios que se desincronizan

El audio y las formas de la boca pueden desfasarse fraccionalmente, sobre todo en los sonidos oclusivos (**p, b, m**) donde los labios deberían cerrarse del todo. Mira la boca primero sin sonido y luego con él. Señales de alarma:

- Labios que no llegan a cerrarse en los sonidos "m"/"b".
- Dientes e interior de la boca que se ven borrosos, estáticos o extrañamente uniformes.
- Una voz *casi* sincronizada pero consistentemente un pelo adelantada o atrasada.

## 3. Luz y color que no encajan

La luz real obedece una sola física en toda la escena. En vídeo compuesto o generado, la cara puede no coincidir con su entorno:

- Piel iluminada en cálido mientras la habitación es fría (o al revés).
- Sombras en la cara apuntando en dirección distinta a las de la escena.
- Una cara que permanece uniformemente iluminada mientras la persona atraviesa luces y sombras.
- Un tenue "halo" de color o un grano/ruido que no coincide donde se insertó la cara.

[[cta]]

## 4. Movimiento, parpadeo y micro-expresiones antinaturales

Las caras hacen cosas diminutas constantemente — parpadean a un ritmo natural, producen micro-expresiones, mueven la cabeza con una leve vibración. Las caras sintéticas suelen fallar sutilmente en esto:

- **Ritmo de parpadeo** demasiado bajo (los primeros deepfakes apenas parpadeaban) o mecánicamente regular.
- **Ojos** que no siguen hacia donde la persona "mira", o una mirada fija y vidriosa.
- Movimiento **demasiado suave o demasiado quieto** — una quietud inquietante, o una cara que parece flotar ligeramente respecto a la cabeza.
- **Frente/orejas congeladas** mientras la boca se mueve mucho.

## 5. Procedencia ausente y metadatos sospechosos

Aléjate de los píxeles; revisa el archivo y su origen:

- Un clip que dice ser una grabación real pero **sin metadatos de cámara**, o con metadatos que contradicen la historia (fecha equivocada, dispositivo equivocado, software de edición).
- Sin fuente creíble — solo circula en cuentas anónimas o marginales, sin ningún medio que lo respalde.
- A la inversa, unas **Content Credentials C2PA** válidas son evidencia *a favor* de la autenticidad.

## Extra: escucha el audio

La clonación de voz tiene sus propios artefactos. Con auriculares, busca una entrega plana y "pareja" con poca respiración, un ritmo o énfasis raros, un sutil timbre metálico, o un ruido de fondo que se corta de forma antinatural entre palabras. Las estafas solo de voz (la llamada del "familiar en apuros") cuentan con que no escuches con esta atención.

## Lo que una herramienta forense hace automáticamente

Puedes captar mucho a ojo, pero el software llega donde tú no:

- **Flujo óptico y consistencia temporal** — comprueba que los objetos se mueven como se mueven los objetos reales, fotograma a fotograma.
- **Análisis facial neuronal fotograma a fotograma** — señala los sutiles artefactos que deja la mezcla.
- **Análisis de frecuencia** — la huella estadística de los modelos generativos, invisible al ojo.
- **Metadatos y procedencia** — EXIF, consistencia de codificación y C2PA en una sola pasada.

Para la versión de estas comprobaciones específica de imágenes: [cómo saber si una imagen está generada por IA](/es/blog/how-to-tell-if-an-image-is-ai-generated); para el trasfondo de cómo se construyen estas falsificaciones: [qué es un deepfake](/es/blog/what-is-a-deepfake). Para una lista de señales más profunda: [cómo detectar un vídeo deepfake: 9 señales](/es/blog/how-to-spot-a-deepfake-video).

### Lista rápida

1. Descarga, ralentiza a 0,25×, avanza fotograma a fotograma.
2. Observa los **bordes** de la cara en giros y oclusiones.
3. Comprueba la **sincronía labial** en los sonidos p/b/m; inspecciona dientes/interior de la boca.
4. Compara la **luz/sombra** de la cara con la escena.
5. Observa **parpadeo, mirada y micro-movimiento**.
6. Revisa la **fuente y los metadatos**; escucha el **audio** con auriculares.

## Conclusión

Ninguna señal es prueba por sí sola — los clips reales también tienen compresión, desenfoque de movimiento y encuadres raros. El enfoque fiable es **combinar** las señales, que es exactamente lo que hace una herramienta forense: fusiona varias comprobaciones independientes en un solo veredicto en lugar de apostar por una sola pista. Verifyco ejecuta esa fusión en tu iPhone en segundos, totalmente sin conexión — mira [la verificación en el dispositivo, explicada](/es/blog/on-device-verification-explained).
