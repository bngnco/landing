---
title: "İçerik Kimlik Bilgileri (C2PA): Fotoğrafların 'Besin Etiketi'"
description: İçerik Kimlik Bilgileri nedir? C2PA kaynak doğrulama nasıl çalışır, bir fotoğrafın kökeni nasıl kontrol edilir, neyi kanıtlar, neyi kanıtlayamaz — ve neden webin güven katmanı oluyor.
slug: content-credentials-c2pa-explained
date: 2026-06-26
author: Verifyco Ekibi
tags:
  - Araştırma
  - Rehberler
image: /uploads/blog/content-credentials-c2pa-cover.jpg
imageAlt: iPhone'da bir fotoğrafın C2PA İçerik Kimlik Bilgilerini kontrol etme
updated: 2026-07-03
---

İnternetteki her görsel artık aynı soruyu doğuruyor: *bu gerçekte nereden geldi?* İçerik Kimlik Bilgileri sektörün yanıtı — bir fotoğraf veya videonun içinde yolculuk eden, onu kimin, neyle ürettiğini ve o zamandan beri ne yapıldığını kaydeden, kurcalamaya karşı korumalı bir "besin etiketi". Kamera üreticileri, Adobe, Google, OpenAI ve büyük platformların hepsi imza attı; bu da onu webin kaynak doğrulama standardına en yakın şey yapıyor.

İşte nasıl çalıştığı, nasıl kontrol edileceği ve — en az onun kadar önemlisi — size neyi *söyleyemeyeceği*.

## İçerik Kimlik Bilgileri tam olarak nedir?

İçerik Kimlik Bilgileri, **C2PA**'nın (Coalition for Content Provenance and Authenticity — İçerik Kaynağı ve Özgünlüğü Koalisyonu) tüketiciye dönük adıdır; açık bir teknik standarttır. Destekleyen bir cihaz veya uygulama, dosyaya şunları kaydeden imzalı bir manifest ekler:

- **Köken** — onu üreten kamera, telefon veya AI aracı;
- **Geçmiş** — yol boyunca yapılan düzenlemeler (kırpma, rötuş, üretken dolgu…);
- **İmza** — kayıtla oynanırsa bunu görünür kılan kriptografik bir mühür.

Bunu bir emanet zinciri gibi düşünün. Destekleyen kamera çekimi imzalar; Photoshop "kırpıldı, renk ayarlandı" diye ekler; AI üreticisi "yapay zekâ ile üretildi" beyanını düşer. Sonra herkes bu zinciri okuyabilir ve hiçbir halkasının sahte olmadığını doğrulayabilir.

## C2PA neyi kanıtlar — neyi kanıtlamaz

Haberlerin çoğunun iki yönde de yanlış aktardığı kısım bu.

**Kanıtlayabildikleri:** Dosyanın belirli bir araç veya cihazca imzalandığı; kayıtlı düzenleme geçmişiyle oynanmadığı; bir AI üreticisinin çıktısını sentetik olarak beyan ettiği.

**Kanıtlayamadıkları:** *Etiketsiz* bir dosyanın AI üretimi mi yoksa gerçek mi olduğu. Kimlik bilgileri internetin en sıradan eylemleriyle silinir — ekran görüntüleri, yeniden kaydetmeler, mesajlaşma uygulamaları ve üstveriyi soyan platformlar. Yani:

> **Kimlik bilgisinin varlığı güçlü kanıttır. Yokluğu ise hiçbir kanıt değildir.**

Kimlik bilgisi olmayan bir dosya hakkında dürüst bir karar, piksellerin ve dosya kabının gerçek adli analizini gerektirir — aşağıda buna geliyoruz.

## Bir fotoğrafın İçerik Kimlik Bilgileri nasıl kontrol edilir

1. **Doğrulama siteleri.** Resmî C2PA/Adobe *Verify* web aracı herhangi bir dosyanın manifestini okur ve zincirin tamamını gösterir.
2. **iPhone'unuzda.** Fotoğraflar uygulaması destekleyen dosyalarda temel kaynak bilgisini gösterir; bazı platformlar artık dokunabileceğiniz bir "CR" rozeti sunuyor.
3. **Adli uygulamalar.** Kaynak kontrolü, **[Verifyco](https://apps.apple.com/app/id6772592963)**'nun çalıştırdığı beş sinyalin ilkidir — C2PA manifestini cihazda okur ve, işin kritik kısmı, manifest yoksa aramaya devam eder. iPhone için adım adım rehberimiz: [bir fotoğrafın gerçek mi AI mı olduğu iPhone'da nasıl kontrol edilir](/tr/blog/check-if-photo-is-ai-on-iphone).

[[cta]]

## Bu neden her yıl daha önemli

İki güç birleşiyor. Üretken modeller gerçekle sentetik arasındaki görsel farkı siliyor — [bir görselin AI üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated) yazısındaki bozulma avcılığı ipuçları her model sürümünde biraz daha zorlaşıyor. Ve düzenleme geliyor: AB Yapay Zekâ Yasası'nın şeffaflık kuralları sentetik içeriği makine tarafından okunabilir zorunlu etiketlemeye itiyor — bu da pratikte C2PA tarzı manifestler demek.

Muhtemel varış noktası, iki tür medyanın olduğu bir internet: **fişini yanında taşıyan içerik ve taşımayan içerik.** Fişsiz olan otomatik olarak sahte olmayacak — ama giderek artan bir ispat yükü taşıyacak; o yükü inceleme işi de adli analizin.

## Kaynak + adli analiz: neden ikisi birden gerekli

İki yaklaşım zıt ve birbirini tamamlayan biçimlerde başarısız olur:

| | Kaynak (C2PA) | Adli analiz |
| --- | --- | --- |
| Ne zaman çalışır | Dosya manifestini korumuşsa | Her dosyada, soyulmuş olsa bile |
| Ne verir | Köken hakkında kriptografik kesinlik | Piksellerden istatistiksel kanıt |
| Zayıflığı | Kolayca silinir, benimseme eksik | Asla mutlak kanıt değildir |
| Sahtelenebilir mi? | Sahtecilik tespit edilebilir | *Tüm* sinyalleri birden kandırmak zordur |

Verifyco'nun ikisini birden birleştirmesinin nedeni bu: imzalı fiş varsa o, yoksa beş bağımsız adli sinyal — üstveri, sinirsel yüz analizi, hareket, frekans alanı parmak izleri ([cihazdaki hattın çalışma şekli](/tr/blog/on-device-verification-explained)).

## Sıkça sorulan sorular

**İçerik Kimlik Bilgileri filigranla aynı şey mi?**
Hayır. Filigran piksellerin içine gömülür (görünür ya da görünmez); kimlik bilgileri dosyayla yolculuk eden imzalı bir üstveri manifestidir. Filigran bazı yeniden kaydetmelere dayanır ama üreticiye özeldir; kimlik bilgileri açık standarttır ama üstveriyle birlikte silinir. Rakip değil, tamamlayıcıdırlar.

**Kimlik bilgisi olmaması fotoğrafın sahte olduğu anlamına mı gelir?**
Hayır — internetteki meşru fotoğrafların çoğunda da kimlik bilgisi yoktur, çünkü platformlar ve ekran görüntüleri onları siler. Yokluk size hiçbir şey söylemez; sadece adli analize ihtiyacınız olduğunu söyler.

**Dolandırıcılar C2PA kimlik bilgilerini sahteleyebilir mi?**
Silebilirler; ama *geçerli imzalı* bir manifest üretmek imza anahtarlarını ele geçirmeyi gerektirir — kriptografi kurcalamayı tespit edilebilir kılar. Gerçekçi saldırı sahtecilik değil silmedir; yokluğun nötr sayılması gerekmesinin nedeni de tam olarak bu.

**AI üreticileri görsellerini etiketliyor mu?**
Büyükler giderek daha çok — OpenAI, Adobe Firefly ve Google, C2PA manifestleri ve/veya SynthID gibi görünmez filigranlar ekliyor. Açık kaynak modeller ve çıktının ekran görüntüsünü alan herkes ise eklemiyor. Etiketlemenin tespiti tek başına çözememesinin nedeni bu boşluk.

## Sonuç

İçerik Kimlik Bilgileri webin doğmakta olan güven katmanı: fiş oradaysa kontrolü saniyeler sürer ve köken sorusunu kapatır. Orada değilse — ki çoğu zaman değil — adli analize dönersiniz. İki alışkanlığı da edinin ve **güvenmeden önce doğrulayın.**
