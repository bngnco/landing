---
title: "Cihazda Doğrulama Nedir? (Hiçbir Şey iPhone'unuzdan Çıkmaz)"
description: "Verifyco neden tamamen iPhone'unuzda çalışır — cihazda adli analiz nasıl işler, Neural Engine ne yapar ve neden hiçbir şey asla yüklenmez."
slug: on-device-verification-explained
date: 2026-06-08
author: "Verifyco Ekibi"
tags: ["iOS", "Araştırma", "Rehberler"]
image: /assets/app/spotlight.png
imageAlt: "Verifyco iPhone'da gizli, cihazda çalışan bir analiz yürütüyor"
---

Çoğu medya kontrol aracı dosyanızı bir sunucuya yükler. Verifyco yüklemez. Her
sinyal iPhone'unuzda yerel olarak çalışır ve fotoğraflarınız ile videolarınız
cihazdan asla çıkmaz. İşte bunun neden önemli olduğu — ve nasıl çalıştığı.

## Cihazda çalışması neden önemli

- **Gizlilik.** Hassas medya — özel bir fotoğraf, incelediğiniz sızmış bir klip —
  başkasının sunucusuna asla dokunmaz.
- **Hız.** Yükleme yok, sıra yok. Analiz hemen başlar.
- **Çevrimdışı.** Uçakta ya da sinyal olmadan çalışır, çünkü yapılacak bir ağ
  çağrısı yoktur.

> Sunucu yok. Yükleme yok. Hesap yok.

## Aslında ne çalışıyor

Verifyco beş bağımsız adli sinyali kaynaştırır:

1. **İçerik kimlik bilgileri** — C2PA kökeni, kameranın imzalı makbuzu.
2. **Meta veri adli incelemesi** — EXIF, kodlama ve kare hızı tutarlılığı.
3. **Nöral yüz analizi** — Apple Vision, kare kare.
4. **Hareket analizi** — optik akış ve zamansal tutarlılık.
5. **Frekans analizi** — üretici modellerin DCT spektral parmak izi.

Her biri kanıt üretir; birlikte, üzerine gerçekten akıl yürütebileceğiniz tek bir
0–100 güven skoru oluştururlar.

[[cta]]

## Ağır işi Neural Engine yapar

Modern iPhone'lar özel bir Neural Engine içerir — cihazda makine öğrenmesi için
üretilmiş silikon. Verifyco'nun nöral analizi bir bulut GPU'suna gerek kalmadan,
saniyeler içinde ve medyanız asla iletilmeden çalıştırmasını sağlayan şey budur.

Sonuç: tasarımı gereği gizli ve bir şeyi paylaşmadan önce kullanacak kadar hızlı,
adli sınıfta bir ikinci görüş.
