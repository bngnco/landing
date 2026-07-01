---
title: "Deepfake Nedir? Sade Bir Rehber (2026)"
description: "Deepfake basitçe anlatıldı: ne olduğu, nasıl üretildiği, neden bu kadar inandırıcı hâle geldiği, gerçek dünyadaki riskleri ve sentetik bir yüzü ya da sesi gerçeğinden ayırmanın pratik yolları."
slug: what-is-a-deepfake
date: 2026-06-22
updated: 2026-07-01
author: "Verifyco Ekibi"
tags: ["Deepfake", "Rehberler"]
image: /uploads/blog/deepfake.png
imageAlt: "Adli karşılaştırma altında yan yana gerçek ve deepfake portre"
---

**Deepfake**, bir makine öğrenmesi modelinin bir kişiyi değiştirdiği, sıfırdan
ürettiği veya oynadığı medyadır — genellikle bir video, görsel ya da ses kaydı —
öyle ki o kişi hiç yapmadığı ya da söylemediği bir şeyi yapmış/söylemiş gibi
görünür. İsim, *deep learning* (derin öğrenme) ve *fake* (sahte) kelimelerinin
birleşimidir.

Birkaç yıl önce deepfake'ler güçlü bir ekran kartı ve gerçek teknik bilgi
gerektiren bir merak konusuydu. Bugün ise bir uygulamada birkaç dokunuş uzağında
ve en iyileri gözle ayırt etmesi gerçekten zor. Bu rehber; ne olduklarını, nasıl
üretildiklerini, neden bu kadar inandırıcı olduklarını, gerçek risklerin nerede
olduğunu ve sentetik medyayı gerçeğinden ayırmanın pratik yollarını anlatıyor.

## Üç tür deepfake

Çoğu deepfake üç gruba ayrılır:

- **Yüz değiştirme (face swap)** — bir kişinin yüzünün, bir fotoğraf veya videoda
  başka birinin bedenine yerleştirilmesi.
- **Tam üretim** — bir kişinin, nesnenin ya da tüm bir sahnenin bir **difüzyon
  modeli** tarafından sıfırdan üretilmesi. Kimse bir şey çekmedi; orijinali yok.
- **Ses klonlama** — birkaç saniyelik referans ses, birine istediğiniz her şeyi
  söyletmeye yeter; giderek telefonda gerçek zamanlı olarak.

Modern "yüz canlandırma" bunları harmanlar: hedef kişinin yüzünü bir oyuncunun
mimikleriyle sürer — yani gerçek bir fotoğraf konuşturulabilir.

## Deepfake nasıl üretilir (tek paragrafta)

Modeller **büyük veri kümelerinden** (gerçek yüzler, sesler, sahneler) öğrenir,
ardından *istatistiksel olarak makul* yeni kareler üretir — yani bizi kandıracak
kadar gerçeğin örüntülerine uyan piksel ve ses. GAN, sahteler geçene dek bir
"üretici" ile bir "ayırt edici"yi karşı karşıya getirir; difüzyon modeli ise
gürültüden başlayıp bir metin komutuyla yönlendirilerek inandırıcı bir görsele
doğru arındırır. Matematiği bilmeniz gerekmez — sonucu bilmeniz yeter: çıktı
gerçek görünmek için tasarlanır, bu yüzden **gözleriniz güvenilir bir dedektör
değildir.**

[[cta]]

## Neden bu kadar iyileştiler

İki şey aynı anda değişti:

1. **Modeller ince ayrıntıda çok gelişti** — cilt dokusu, saç, ışık, dudak
   senkronu — "tekinsiz vadi"yi kapattı.
2. **Araçlar kolaylaştı.** Eskiden bir ekran kartı ve bir hafta sonu gerektiren
   şey artık tek bir fotoğrafla bir uygulamada çalışıyor. Canlı videoda ve
   telefon görüşmelerinde gerçek zamanlı yüz değiştirme artık mümkün.

Klasik ipuçları — titreyen kenarlar, cansız gözler, bozuk eller, robotik sesler —
güncel nesil çıktılarda büyük ölçüde kayboldu. Bu, kanıtın kaybolduğu anlamına
gelmez; sadece gözünüzün gidemeyeceği bir yere taşındı (aşağıya bakın).

## Neden önemli: gerçek dünyadaki riskler

Deepfake'ler yalnızca capsler değil. Belgelenmiş zararlar:

- **Dolandırıcılık** — bir yöneticinin veya aile üyesinin ("başı dertteki torun")
  klonlanmış sesiyle para transferi/ödeme onaylatma.
- **Rızasız görüntüler** — hacim olarak en büyük deepfake istismarı kategorisi,
  ezici çoğunlukla kadınları hedef alıyor.
- **Dezenformasyon** — siyasetçilerin uydurma klipleri ya da "savaş görüntüleri",
  kimse yalanlayamadan yayılsın diye zamanlanır.
- **Kimlik/KYC atlatma** — zayıf "canlılık" kontrollerini aşan sentetik yüzler.

Savunma panik değil — **doğrulama alışkanlıkları** artı araçlardır.

## Bir şeyin deepfake olduğu nasıl anlaşılır

Modern deepfake'leri gözle güvenilir biçimde ayırt edemezsiniz; içgüdü yerine bir
sürece dayanın:

1. **Kaynağı düşünün.** Bu gerçekte nereden geldi ve güvenilir bir yayın organı
   taşıyor mu?
2. **Kaynak kaydını (provenance) arayın.** **C2PA İçerik Kimlik Bilgileri**
   imzalı bir köken makbuzudur — varlığı, özgünlük *lehine* güçlü bir sinyaldir.
3. **Ayrıntıları inceleyin** (görseller için: eller, metin, yansımalar; videolar
   için: kenarlar, göz kırpma, dudak senkronu). Adım adım için:
   [bir görselin yapay zekâ üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated)
   ve [bir videonun deepfake olduğunun 5 işareti](/tr/blog/5-signs-a-video-has-been-deepfaked).
4. **Adli bir kontrol çalıştırın.** Birden çok sinyali birleştiren araçlar — meta
   veri, yüz analizi, frekans örüntüleri — gözünüzün göremediğini yakalar.

### Asıl işe yarayan: sinyal füzyonu

Tek bir kontrol belirleyici değildir. Silinmiş bir EXIF tek başına hiçbir şey
kanıtlamaz; tek bir tuhaf kare bir karar değildir. Güvenilir tespit; kaynak
kaydını, meta veriyi, sinir ağı yüz analizini, hareket tutarlılığını ve
frekans-spektrumu parmak izini **tek bir skorda birleştirir.** Herhangi bir
katman kandırılabilir; hepsi aynı anda zordur.

## Sıkça sorulan sorular

**Deepfake'ler yasa dışı mı?** Kullanıma ve ülkeye bağlı. Dolandırıcılık, iftira
ve rızasız mahrem görüntüler birçok yerde suçtur; deepfake'e özgü yasalar da
genişliyor.

**Otomatik tespit edilebilir mi?** Evet — kusurlu ama işe yarar biçimde. Tespit
ve üretim bir kedi-fare yarışıdır; bu yüzden tek bir "yapay zekâ dedektörü"
yerine birkaç sinyali birleştirmek sağlam yaklaşımdır.

**Filigranlar sorunu çözer mi?** Var olduklarında yardımcı olur (ör. C2PA), ama
filigranlar kırpılabilir veya hiç bulunmayabilir — yani tek başına sihirli bir
çözüm değil, birkaç sinyalden biridir.

## Özet

Deepfake, inanılmak üzere tasarlanmış sentetik medyadır. Gözlerinizle
yetişemezsiniz ama **alışkanlıklar ve araçlarla** yetişebilirsiniz: kaynağı
kontrol edin, kaynak kaydını arayın ve güvenmeden — ya da paylaşmadan — önce adli
bir kontrol çalıştırın.

İşte tam da bu Verifyco'nun fikri: beş adli sinyali tek bir güven skorunda
birleştiren, tamamen iPhone'unuzda çalışan hızlı bir ikinci görüş. "Cihazda"
olmanın gizlilik ve hız için neden önemli olduğunu merak ediyor musunuz?
[Cihazda doğrulama nedir](/tr/blog/on-device-verification-explained) yazısını okuyun.
