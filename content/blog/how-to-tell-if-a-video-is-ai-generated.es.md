---
title: Cómo saber si un vídeo está generado por IA (guía 2026)
description: 'Los modelos tipo Sora ya crean vídeo desde un texto. Aprende a saber si un vídeo está generado por IA: fallos de física, artefactos de textura, procedencia y herramientas forenses.'
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
author: Equipo Verifyco
tags:
  - Detección de IA
  - Guías
image: /uploads/blog/1000000350.jpg
imageAlt: Analizando un vídeo en iPhone para saber si está generado por IA
updated: 2026-07-03
---

Un deepfake significaba una sola cosa: un vídeo real con la cara cambiada. Esa era terminó. Los modelos de texto-a-vídeo — Sora, Veo y sus sucesores de código abierto — generan ahora **escenas enteras a partir de una instrucción**: las personas, la sala, la luz, el movimiento de cámara… nada de eso existió jamás. Estos vídeos totalmente sintéticos fallan de forma distinta a los intercambios de cara, así que merecen su propia lista de comprobación.

Eso es esta guía. (Si examinas un vídeo de una *persona real concreta* diciendo algo, revisa también las señales de intercambio facial en [cómo detectar un vídeo deepfake](/es/blog/how-to-spot-a-deepfake-video) — los casos reales mezclan ambas cosas.)

## Primero, busca las señales fáciles en el fotograma

Descarga el clip si puedes (grabar la pantalla recomprime y oculta pruebas), reprodúcelo lento, a pantalla completa y con brillo alto. Busca:

- **Texto y carteles.** Los mundos generados siguen destrozando la escritura — rótulos, camisetas, matrículas y etiquetas que parecen correctos de reojo y se disuelven en pseudoletras al pausar. Mantener texto legible y coherente durante todo un clip sigue siendo difícil de falsificar.
- **Manos, dedos y traspaso de objetos.** Dedos que se fusionan, cubiertos que se funden con la comida, objetos que atraviesan las manos. La interacción entre cosas sigue siendo el punto débil.
- **Gente del fondo.** Los extras le salen baratos al modelo pero están mal supervisados: fíjate en caminantes que se deslizan, se repiten o se funden entre sí.
- **Simetría y física de los reflejos.** Espejos, ventanas, agua y gafas suelen reflejar una escena *plausible* en vez de *la* escena. Si un reflejo contradice el mundo, es concluyente.
- **Movimiento demasiado suave.** El vídeo generado suele tener una cámara flotante, onírica, y sujetos con movimientos levemente ralentizados e ingrávidos — nada da tirones, nada tiembla de forma creíble.

## Después, comprueba la permanencia de los objetos

Es la clase de señal más fiable en vídeo totalmente generado. Los objetos reales persisten; los generados solo *tienden a* persistir.

Recorre el clip siguiendo un solo objeto — una taza, un botón, un tatuaje, un pendiente. En vídeo de IA puede **cambiar de forma, saltar de posición, desaparecer o transformarse** entre planos o incluso entre segundos. Cuenta cosas: dedos, ruedas, patas de silla, cristales de ventana. Vuelve a contar cinco segundos después. Un vídeo real nunca se contradice a sí mismo; los modelos generativos todavía sí, sobre todo pasados los diez segundos — por eso tantos clips sintéticos son sospechosamente cortos y llenos de cortes.

[[cta]]

## Comprueba la procedencia, no solo los píxeles

- **La fuente primero.** ¿Quién lo publicó, dónde más existe, lo recoge algún medio creíble? Un clip dramático que solo existe en una cuenta anónima es una bandera roja antes de mirar un solo fotograma.
- **Content Credentials.** Algunas herramientas de IA (incluidos los modelos tipo Sora) adjuntan metadatos C2PA que declaran el contenido como sintético — y algunas plataformas los muestran. Su ausencia no prueba nada (los metadatos se pierden con capturas y resubidas), pero su presencia es una respuesta rápida y honesta. Explicamos todo el sistema en [Content Credentials (C2PA), explicado](/es/blog/content-credentials-c2pa-explained).
- **Marcas de agua.** Varios generadores incrustan marcas visibles o invisibles (como SynthID). Las invisibles requieren el verificador del propio fabricante — útil cuando acierta, mudo sobre el resto de generadores.

## Cuando los ojos no bastan: análisis forense

Cada señal de arriba se difumina con cada nueva versión de los modelos, y la investigación muestra una y otra vez que los humanos identifican el vídeo sintético de alta calidad a tasas apenas mejores que el azar. El enfoque robusto es el de las herramientas forenses: **combinar señales independientes en lugar de fiarse de una sola.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** ejecuta esa fusión directamente en tu iPhone: consistencia temporal y flujo óptico (¿las cosas se mueven y persisten como objetos reales?), análisis en el dominio de la frecuencia (la huella estadística que dejan los modelos de difusión), forense de metadatos y codificación, comprobación de procedencia y análisis facial neuronal cuando hay caras. Obtienes una puntuación de confianza de 0 a 100 con el desglose por capas — y es honesto cuando la evidencia no es concluyente, como suele ocurrir con clips sociales muy recomprimidos. También puedes pegar un enlace de una plataforma social en lugar de descargar el archivo. Todo se ejecuta **en el dispositivo**: el clip nunca sale de tu teléfono ([aquí, por qué importa](/es/blog/on-device-verification-explained)).

### Lista rápida

1. Descarga el archivo original; reproduce a 0,25×.
2. Pausa en **texto, manos, reflejos, gente del fondo**.
3. Sigue un objeto por todo el clip — ¿**persiste**?
4. Comprueba **quién lo publicó** y si existe en algún lugar creíble.
5. Busca **Content Credentials / marcas de agua**.
6. Pásalo por **análisis forense en el dispositivo** y lee el desglose por capas, no solo el veredicto.

## Preguntas frecuentes

**¿Se puede detectar con fiabilidad el vídeo generado por IA en 2026?**
Ningún método aislado es fiable. Combinar inspección visual, procedencia y análisis forense multi-señal da evidencia sólida en la mayoría de los casos — pero espera "no concluyente" en resubidas muy comprimidas, y trata la salida de cualquier herramienta como evidencia, no como prueba.

**¿Cuál es la comprobación única más rápida?**
Pausa sobre cualquier texto de la escena y luego revisa los reflejos. Ambos siguen fallando de forma consistente en el vídeo generado y llevan menos de un minuto.

**¿Por qué tantos vídeos de IA son cortos?**
Las generaciones largas acumulan errores de consistencia — los objetos derivan, las caras mutan, las escenas se contradicen. Muchos clips sintéticos se quedan por debajo de ~10–15 segundos o se esconden tras cortes rápidos precisamente para no delatarse.

**¿Una marca de agua o credencial es prueba en algún sentido?**
La presencia de una credencial de IA es evidencia sólida de que es sintético. La ausencia no prueba absolutamente nada — a la mayoría de los clips reales *y* falsos de internet las plataformas ya les quitaron los metadatos.

## Conclusión

El vídeo totalmente generado por IA rompió la vieja regla de "ver para creer", pero no rompió la verificación: la física, la permanencia, la procedencia y el análisis forense siguen atrapando lo que el ojo pierde. Crea el hábito — **verifica antes de compartir** — y ten a mano la guía hermana para imágenes fijas: [cómo saber si una imagen está generada por IA](/es/blog/how-to-tell-if-an-image-is-ai-generated).
