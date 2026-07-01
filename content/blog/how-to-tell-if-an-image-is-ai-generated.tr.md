---
title: "Bir Görselin Yapay Zekâ Üretimi Olduğu Nasıl Anlaşılır"
description: "Yapay zekâ üretimi görselleri yakalamak için pratik, adli bir kontrol listesi — ele veren görsel bozulmalardan gerçekten işe yarayan meta veri ve sinyallere."
slug: how-to-tell-if-an-image-is-ai-generated
date: 2026-06-28
author: "Verifyco Ekibi"
tags: ["AI Tespiti", "Deepfake", "Rehberler"]
image: /uploads/blog/face.png
imageAlt: "Yapay zekâ üretim izlerini vurgulayan adli yüz analizi katmanı"
---

Yapay zekâ görsel üreticileri hızla iyileşti. Bir yıl önceki bariz ipuçları (altı
parmaklı eller, erimiş yazılar) çoğunlukla kayboldu ve inandırıcı bir sahte artık
saniyeler içinde üretilebiliyor. İyi haber: üretilmiş görseller hâlâ iz bırakır.
Yalnızca nereye bakacağınızı bilmeniz gerekir.

Bu kısa bir saha rehberidir. Onu bir **kontrol listesi** olarak görün, kesin bir
karar olarak değil — tek bir işaret tek başına kanıt değildir. Gerçek güven,
birden fazla bağımsız sinyali üst üste koymaktan gelir.

## 1. Zor kısımlara yakından bakın

Üreticiler, yerel makullükten çok *bütünsel tutarlılık* gerektiren detaylarda
zorlanır. Yakınlaştırın ve şunları kontrol edin:

- **Eller, dişler ve kulaklar** — sayı ve oranlar hâlâ kayıyor.
- **Sahnedeki yazılar** — tabelalar, etiketler ve logolar büyütüldüğünde çoğu
  zaman sahte harflere dönüşür.
- **Yansımalar ve gölgeler** — kare boyunca uyuşmayan ışık yönü güçlü bir
  ipucudur.
- **Tekrar eden dokular** — saç, yapraklar ve kalabalıklar ürkütücü, döşeme
  benzeri tekrarlar gösterebilir.

[[cta]]

## 2. Meta veriyi kontrol edin

Her gerçek kamera bir iz bırakır. Yapay zekâ görselleri genellikle bırakmaz — ya
da yanlış olanı yazar.

- Enstantane olduğunu iddia eden bir fotoğrafta **EXIF** eksikliği (kamera
  markası/modeli, lens, pozlama yok) şüphelidir.
- Üretici imzaları bazen doğrudan meta veride görünür; örneğin aracı adlandıran
  bir `Software` alanı.
- **C2PA İçerik Kimlik Bilgileri** ise tam tersi sinyaldir: bir dosyanın nereden
  geldiğini kanıtlayan, kriptografik olarak imzalanmış bir makbuz. Varlıkları,
  gerçeklik *lehine* güçlü kanıttır.

> Meta veri silinebilir ya da taklit edilebilir, bu yüzden yokluğu kanıt
> değildir — ama kanıt yükünü kaydırır.

## 3. Frekans parmak izini okuyun

Bu, gözle yapamayacağınız kısımdır. Difüzyon ve GAN modelleri, bir görselin
**frekans spektrumunda** istatistiksel örüntüler bırakır — gerçek bir lensten
geçen ışıkta oluşmayan düzenlilikler. Bir spektral (DCT) analiz, görsel normal
büyütmede kusursuz görünse bile bunları ortaya çıkarır.

## 4. Tek bir sinyale güvenmeyin

Çoğu insanın yaptığı hata, tek bir kesin kanıt aramaktır. Modern tespit
**kaynaştırma (fusion)** ile çalışır: içerik kimlik bilgilerini, meta veri adli
incelemesini, nöral yüz analizini ve frekans analizini tek bir skorda
birleştirir. Herhangi bir katman kandırılabilir; hepsi aynı anda çok daha zordur.

Verifyco tam olarak böyle çalışır — cihazda çalışan beş bağımsız sinyal, tek bir
0–100 güven skorunda kaynaştırılır; böylece üzerine gerçekten akıl
yürütebileceğiniz bir karar elde edersiniz.
