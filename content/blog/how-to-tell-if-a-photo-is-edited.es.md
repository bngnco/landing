---
title: Cómo saber si una foto ha sido editada (7 comprobaciones que funcionan)
description: 'No IA — solo trucada. Aprende a saber si una foto está editada o photoshopeada: sombras y bordes, análisis de nivel de error, metadatos, búsqueda inversa y herramientas forenses.'
slug: how-to-tell-if-a-photo-is-edited
date: 2026-07-05
updated: 2026-07-07
author: Equipo Verifyco
tags:
  - Guías
  - Detección de IA
image: /uploads/blog/how-to-tell-if-a-photo-is-edited-cover.jpg
imageAlt: Inspección de una foto en iPhone en busca de señales de edición y manipulación
---

Todo el mundo pregunta "¿esto es IA?" — pero la pregunta más antigua sigue causando la mayor parte del daño: **¿esta foto real está *editada*?** Una fotografía genuina con un objeto borrado, una cara injertada o un detalle clonado suele engañar más que una imagen totalmente generada, precisamente porque todo lo demás es auténtico.

La manipulación fotográfica es décadas más vieja que los modelos de difusión, y también lo son las técnicas para cazarla. Aquí van siete comprobaciones, desde las que haces con los ojos hasta las que requieren software forense. (Si sospechas que la imagen es totalmente creada por IA en lugar de editada, esa es otra lista: [cómo saber si una imagen está generada por IA](/es/blog/how-to-tell-if-an-image-is-ai-generated).)

## 1. Sigue la luz

La luz es física, y los editores se equivocan con la física. Identifica la fuente (el sol, una ventana, una lámpara) y audita la escena contra ella:

- **Las sombras** deben caer todas en dirección contraria a la misma fuente, con longitud y suavidad coherentes. Una persona u objeto insertado suele proyectar sombra en el ángulo equivocado — o ninguna.
- **Los brillos** en caras y objetos deben quedar del lado que mira a la luz. Dos personas iluminadas desde lados opuestos en una misma foto no estuvieron ahí juntas.
- **La temperatura de color** debe coincidir: un sujeto de luz cálida pegado en una sala de luz fría conserva su calidez — el clásico delator del montaje.

## 2. Inspecciona los bordes con mucho zoom

El corta-y-pega deja costuras. Acércate al contorno del elemento sospechoso y busca un halo de desenfoque o brillo, bordes de pelo que terminan en una línea de recorte dura y textura de fondo que se interrumpe bruscamente en la silueta. Los editores suavizan esas costuras — y el suavizado es en sí un delator: un sujeto cuyo contorno es *más blando* que todo lo demás fue fusionado después.

## 3. Caza el tampón de clonar

Eliminar algo significa cubrirlo con píxeles de otra parte de la imagen. Eso produce **repetición**: nubes idénticas, matas de hierba idénticas, la misma textura de pared dos veces, una multitud con dos caras exactamente iguales. Recorre los fondos buscando patrones repetidos — la naturaleza no copia y pega.

## 4. Revisa la geometría

Las líneas rectas deben seguir rectas y la perspectiva debe cuadrar. Marcos de puerta deformados, baldosas curvadas o barandillas onduladas junto al contorno de un cuerpo son la firma del retoque tipo licuar. Los reflejos son la comprobación geométrica que los editores más olvidan: espejos, ventanas, agua y gafas deben mostrar una escena coherente — al sujeto editado rara vez le editan también el reflejo.

[[cta]]

## 5. Lee los metadatos

Abre los detalles del archivo (en iPhone: la ⓘ en Fotos) o un visor de metadatos:

- **Software de edición listado** (Photoshop, Lightroom, un editor de IA) no prueba engaño — pero acaba con la historia de "salió directa de la cámara".
- **Fechas que no cuadran** — una fecha de "modificación" muy posterior a la de captura invita preguntas.
- **La ausencia total de metadatos** en una foto presentada como original es informativa en sí: las plataformas los eliminan, los originales de cámara los conservan.
- **Las Content Credentials**, cuando existen, registran criptográficamente el historial real de edición — la evidencia más fuerte en cualquiera de los dos sentidos. (Cómo funciona: [Content Credentials (C2PA), explicado](/es/blog/content-credentials-c2pa-explained).)

## 6. Busca el original con búsqueda inversa

La comprobación más decisiva para imágenes editadas de *actualidad*: el original sin editar suele existir. Google Lens o Google Imágenes sobre la foto sospechosa puede sacar a la luz la imagen fuente — la misma escena, sin la multitud añadida, con el cartel que borraron, con la cara original. También es la vía más rápida para cazar una foto real re-subtitulada a otro suceso, la manipulación más barata de todas.

## 7. Ejecuta análisis forense

Cada edición perturba el tejido estadístico del archivo de formas que el ojo no ve. El historial de recompresión varía en una imagen empalmada; los patrones de ruido difieren entre sensores; las firmas en el dominio de la frecuencia delatan regiones remuestreadas o regeneradas. Las herramientas web clásicas (análisis de nivel de error y compañía) exponen parte de esto pero exigen interpretación experta — y requieren subir tu foto al servidor de alguien.

**[Verifyco](https://apps.apple.com/app/id6772592963)** ejecuta esta clase de análisis en tu iPhone: forense de metadatos y codificación, análisis de frecuencia, inspección neuronal y comprobación de procedencia, fusionados en una puntuación de confianza de 0 a 100 con desglose por capas — en el dispositivo, así que la foto que cuestionas nunca sale de tu teléfono ([por qué importa](/es/blog/on-device-verification-explained)). La edición con herramientas de IA (relleno generativo, borrado de objetos) deja cada vez más las mismas huellas estadísticas que la generación — exactamente lo que busca la capa de frecuencia.

### La versión de 60 segundos

1. ¿**Luz y sombras** coherentes? 2. ¿**Bordes** limpios al zoom? 3. ¿**Texturas repetidas**? 4. ¿**Rectas y reflejos** sensatos? 5. ¿**Metadatos** con historia coherente? 6. ¿La **búsqueda inversa** encuentra un original? 7. ¿Veredicto del **escaneo forense**?

## Preguntas frecuentes

**¿Siempre se puede saber si una foto fue editada?**
No — un retocador hábil sobre un original de calidad puede vencer la inspección visual, y la compresión fuerte puede destruir la evidencia forense en ambos sentidos. Pero la mayoría de la manipulación que encontrarás es trabajo rápido y descuidado, y cae con las comprobaciones de arriba. Trata cada resultado como evidencia, no como prueba.

**¿Cuál es la mejor forma gratuita de comprobar si una imagen está photoshopeada?**
Búsqueda inversa de imágenes y luego la pasada de luz/bordes/geometría — no cuestan nada y cazan la mayoría de los falsos descuidados. Para algo con consecuencias, añade la lectura de metadatos y una pasada de análisis forense.

**¿Que los metadatos muestren edición prueba que la foto es falsa?**
No. Casi toda foto publicada pasó por software de forma legítima — recortar y corregir color también es editar. Los metadatos cuentan la *historia* del archivo; el engaño es cuando esa historia contradice la afirmación que se hace con la foto.

**¿Una foto editada es lo mismo que una foto de IA?**
Problemas distintos que se solapan cada vez más. La edición clásica cambia partes de una captura real; la generación por IA crea píxeles de la nada. Los editores de IA modernos difuminan la línea — el relleno generativo *es* generación dentro de una foto real — y por eso las herramientas serias comprueban tanto firmas de manipulación como huellas de generación.

## Conclusión

La pregunta detrás de toda imagen sospechosa es la misma: ¿la física, el archivo y el rastro documental concuerdan con la historia? Luz, bordes, repetición, geometría, metadatos, búsqueda inversa, forense — siete comprobaciones, un hábito: **verifica antes de creer.** Para el equivalente en vídeo, empieza por [cómo detectar un vídeo deepfake](/es/blog/how-to-spot-a-deepfake-video).
