---
title: La verificación en el dispositivo, explicada (tus archivos locales se analizan en tu iPhone)
description: 'Por qué Verifyco analiza en el dispositivo los archivos que eliges en tu iPhone: cómo funciona el análisis forense en el dispositivo, qué hace el Neural Engine, nube vs dispositivo, y qué rutas usan procesamiento temporal en servidor.'
slug: on-device-verification-explained
date: 2026-06-08
author: Equipo Verifyco
tags:
  - iOS
  - Investigación
  - Guías
image: /uploads/blog/1000012581.png
imageAlt: Verifyco ejecutando un análisis privado en el dispositivo en un iPhone
updated: 2026-07-01
---

La mayoría de las herramientas de verificación de medios funcionan igual: subes tu
archivo a un servidor, sus modelos lo analizan en la nube y recibes un resultado.
Verifyco no. El análisis se ejecuta **localmente en tu iPhone**, y las fotos y
vídeos que eliges se quedan en el dispositivo salvo que actives la comprobación
opcional de OpenAI que se describe más abajo. Esto es lo que significa, cómo es posible y por qué
importa — sobre todo para el material sensible que la gente más necesita comprobar.

> **Alcance.** Este artículo trata de las fotos y vídeos que eliges en tu iPhone. Tres rutas de Verifyco usan un servidor y lo indican en la app: el contenido de un enlace público de redes sociales se obtiene para la comprobación y se entrega a tu teléfono (el análisis sigue ejecutándose en el dispositivo y no almacenamos el contenido); Verifyco Web procesa las subidas de forma efímera y solo conserva el informe; y la comprobación de procedencia de OpenAI en Ajustes, opcional y desactivada por defecto, envía imágenes JPEG, PNG y WebP a OpenAI a través de nuestro servidor solo si la activas.

## Por qué importa que sea en el dispositivo

- **Privacidad.** Lo que más quieres verificar suele ser lo más sensible — una
  foto privada, un clip filtrado, una imagen íntima que te enviaron. El análisis
  en el dispositivo significa que ese contenido se mantiene fuera del servidor de otros, de sus
  registros y de sus brechas, salvo que actives la comprobación opcional de
  OpenAI, desactivada por defecto, que se describe más abajo.
- **Velocidad.** El análisis en el dispositivo no tiene cola ni ida y vuelta, así
  que empieza en cuanto eliges el archivo — y eso importa cuando compruebas un
  vídeo 4K, no una miniatura.
- **Funciona sin conexión.** En un avión, con mala señal o en un entorno seguro
  sin red — el análisis en el dispositivo sigue funcionando, porque no hace
  ninguna llamada de red. Solo la comprobación opcional de OpenAI, si la
  activaste, necesita conexión.
- **Sin cuenta, sin rastro.** Nada que registrar, nada que vincule un archivo
  comprobado con tu identidad.

> Para un archivo que eliges en tu teléfono no hay servidor, ni subida, ni cuenta, salvo que actives en Ajustes la comprobación de procedencia de OpenAI, opcional y desactivada por defecto: en ese caso, las imágenes JPEG, PNG y WebP pasan por nuestro servidor hacia la Content Provenance API de OpenAI, y nuestro servidor borra la imagen después. Las comprobaciones de enlaces y Verifyco Web usan un procesamiento temporal en el servidor, como indica la nota de alcance de arriba.

## Qué significa realmente "en el dispositivo"

Los iPhone modernos incluyen un **Neural Engine** dedicado — silicio construido
específicamente para ejecutar modelos de aprendizaje automático rápido y con
eficiencia. Los frameworks **Core ML** y **Vision** de Apple permiten a una app
ejecutar redes neuronales directamente sobre ese hardware.

Verifyco lo usa para hacer localmente lo que otras herramientas envían a una GPU
en un centro de datos: análisis neuronal de caras y escenas, transformadas de
frecuencia, lectura de metadatos y hash del archivo — todo en la memoria del
propio teléfono, en segundos. El análisis en sí no envía tu contenido a ninguna
parte; solo la comprobación opcional de OpenAI, desactivada por defecto, envía una
imagen a OpenAI a través de nuestro servidor si la activas.

## Las cinco señales, corriendo en local

Verifyco fusiona **cinco señales forenses independientes** en una sola puntuación
de confianza de 0 a 100:

1. **Credenciales de contenido** — procedencia C2PA, el "recibo" firmado de la
   cámara.
2. **Forense de metadatos** — EXIF, consistencia de codificación y anomalías de
   frecuencia de fotogramas.
3. **Análisis facial neuronal** — Apple Vision, fotograma a fotograma, buscando
   los artefactos que dejan los generadores.
4. **Análisis de movimiento** — flujo óptico y consistencia temporal entre
   fotogramas.
5. **Análisis de frecuencia** — la huella espectral DCT de los modelos de
   difusión y GAN, invisible al ojo.

La mayoría de las capas no son decisivas por sí solas — esa es la idea. Fusionar varias señales
independientes es lo que hace robusto el veredicto, porque engañar a una es fácil
y engañarlas a todas a la vez es difícil. (Para lo que cada capa detecta en la
práctica: [cómo saber si una imagen está generada por IA](/es/blog/how-to-tell-if-an-image-is-ai-generated)
y [5 señales de que un vídeo ha sido deepfakeado](/es/blog/5-signs-a-video-has-been-deepfaked).)

## Nube vs dispositivo: la comparación

| | Verificación en la nube | En el dispositivo (Verifyco) |
| --- | --- | --- |
| Tu contenido | Se sube a un servidor | Los archivos locales se quedan en tu teléfono salvo que actives la comprobación de OpenAI |
| Velocidad | Subida + cola + descarga | Empieza al instante |
| Sin conexión | No | Sí (la comprobación opcional de OpenAI necesita conexión) |
| Cuenta necesaria | Normalmente | No |
| Exposición de privacidad | Registros del servidor, brechas | Ninguna más allá de tu equipo, salvo que actives la comprobación de OpenAI |

Lo único que puede ofrecer la nube es un modelo central gigante. Pero para la
verificación forense, las señales que importan — procedencia, metadatos, patrones
de frecuencia, consistencia temporal — corren perfectamente en el dispositivo, y
la ganancia de privacidad es enorme.

## Preguntas frecuentes

**¿El análisis en el dispositivo es más débil que en la nube?** Para estas
señales forenses, el análisis es la misma matemática; solo cambia el
*lugar*. La detección siempre es un objetivo móvil (los generadores mejoran), y
por eso Verifyco fusiona varias señales y mejora con las actualizaciones.

**¿Gasta mucha batería?** Un análisis es una ráfaga corta de trabajo del Neural
Engine — comparable a aplicar un filtro de foto pesado, y listo.

**¿Qué iPhones?** Cualquier iPhone moderno con Neural Engine (iOS 17+). Los chips
más nuevos simplemente terminan antes.

**¿Alguna vez veis mis archivos?** Los que eliges en tu teléfono, no, salvo que actives la comprobación opcional de procedencia de OpenAI (desactivada por defecto), que envía imágenes JPEG, PNG y WebP a OpenAI a través de nuestro servidor; después, nuestro servidor borra cada imagen. El contenido de un enlace público que pegas se obtiene para la comprobación y no lo almacenamos; Verifyco Web procesa las subidas de forma efímera y conserva solo el informe.

## Conclusión

La verificación en el dispositivo te da una segunda opinión de nivel forense que
es **privada por diseño y lo bastante rápida para usarla de verdad** — antes de
confiar en un contenido, y antes de compartirlo. ¿Nuevo en el tema? Empieza por
[qué es un deepfake](/es/blog/what-is-a-deepfake).
