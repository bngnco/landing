---
title: Bir Videonun Deepfake Olduğunu Gösteren 5 İşaret (+ Nasıl Kontrol Edilir)
description: Deepfake videoları yakalamak için pratik bir kontrol listesi — sentetik klipleri hâlâ ele veren kenar bozulmaları, dudak senkron kayması, ışık ipuçları, doğal olmayan hareket ve ses izleri.
slug: 5-signs-a-video-has-been-deepfaked
date: 2026-06-15
author: Verifyco Ekibi
tags:
  - Deepfake
  - AI Tespiti
  - Rehberler
image: /uploads/blog/1000012582.png
imageAlt: Verifyco sinyal hattı bir videoyu kare kare analiz ediyor
updated: 2026-07-01
---

Bir videoyu inandırıcı biçimde sahtelemek, durağan bir görsele göre daha zordur —
tutarlı tutulması gereken çok daha fazla kare vardır ve hareket, ışık ve sesin
zaman boyunca hep uyuşması gerekir. Senin için iyi haber: deepfake videolar,
özellikle hareket ve seste, hâlâ ipucu bırakır. İşte en güvenilir beş işaret, her
birinin nasıl kontrol edileceği ve neden hiçbirinin tek başına karar olmadığı.

> **Herhangi bir klibi incelemenin yolu:** klibi indir (ekran kaydı yeniden
> sıkıştırır ve izleri gizler), 0,25× hızda oynat ve kare kare ilerle. Tam ekran,
> parlaklık yüksek. İpuçlarının çoğu duraklatılmış tek bir karede değil, kareler
> arasındaki geçişlerde yaşar.

## 1. Titreşen, "nefes alan" kenarlar

Yüzün saçla, kulaklarla, gözlükle veya arka planla buluştuğu sınırı izle. Yüz
değiştirme modelleri her karede üretilmiş bir yüzü gerçek bir kafaya harmanlar ve
o dikiş çoğu zaman kareler arasında hafifçe **titrer, eğrilir veya kayar** —
çene, saç çizgisi veya boyun çevresinde ince bir "nefes alma". Hızlı bir baş
dönüşünde veya bir el yüzün önünden geçerken duraklat: harmanlama tam orada bozulur.

## 2. Kayan dudak senkronu

Ses ve ağız şekilleri, özellikle dudakların tamamen kapanması gereken patlamalı
seslerde (**p, b, m**) kesirli biçimde birbirinden kopabilir. Ağzı önce sessiz,
sonra sesli izle. Uyarı işaretleri:

- "m"/"b" seslerinde tam kapanmayan dudaklar.
- Bulanık, durağan veya tuhaf biçimde tekdüze görünen dişler ve ağız içi.
- *Neredeyse* senkron ama tutarlı biçimde kıl payı erken veya geç bir ses.

## 3. Uyuşmayan ışık ve renk

Gerçek ışık tüm sahnede tek bir fiziğe uyar. Birleştirilmiş veya üretilmiş
videoda yüz, ortamıyla eşleşmeyebilir:

- Oda soğuk ışıkta iken sıcak aydınlatılmış bir ten (veya tersi).
- Yüzdeki gölgelerin, sahnedeki gölgelerden farklı yönü göstermesi.
- Kişi ışık ve gölgeden geçerken bile hep aynı aydınlıkta kalan bir yüz.
- Yüzün yerleştirildiği yerde soluk bir renk "halesi" ya da uyuşmayan gren/gürültü.

[[cta]]

## 4. Doğal olmayan hareket, göz kırpma ve mikro ifadeler

Yüzler durmadan minik şeyler yapar — doğal bir hızda göz kırpar, mikro ifadeler
üretir, başı ince bir titremeyle oynatır. Sentetik yüzler bunu çoğu zaman ince
ince yanlış yapar:

- **Göz kırpma sıklığı** çok düşük (erken deepfake'ler neredeyse hiç kırpmazdı)
  ya da mekanik biçimde düzenli.
- Kişinin "baktığı" yeri takip etmeyen **gözler** ya da sabit, camsı bir bakış.
- **Fazla pürüzsüz veya fazla durağan** hareket — tekinsiz bir sabitlik ya da
  kafaya göre hafifçe yüzüyormuş gibi duran bir yüz.
- Ağız çok hareket ederken **donuk kalan alın/kulaklar**.

## 5. Eksik köken ve şüpheli meta veri

Piksellerden uzaklaş; dosyayı ve kaynağını kontrol et:

- Gerçek bir kayıt olduğunu iddia eden ama **kamera meta verisi taşımayan** ya da
  hikâyeyle çelişen (yanlış tarih, yanlış cihaz, düzenleme yazılımı) bir klip.
- Güvenilir kaynak yok — yalnızca anonim veya marjinal hesaplarda dolaşıyor,
  hiçbir yayın organı taşımıyor.
- Tersine, geçerli **C2PA İçerik Kimlik Bilgileri** özgünlük *lehine* kanıttır.

## Bonus: sesi dinle

Ses klonlamanın kendi kusurları vardır. Kulaklıkla; az nefesli, düz ve "eşit" bir
anlatım, tuhaf tempo veya vurgu, ince metalik bir tını ya da kelimeler arasında
doğal olmayan biçimde kesilen arka plan gürültüsü dinle. Yalnızca sesli
dolandırıcılıklar ("başı dertteki yakın" araması) bu kadar dikkatli
dinlemeyeceğine güvenir.

## Adli bir aracın otomatik yaptıkları

Gözle çok şey yakalayabilirsin ama yazılım senin gidemediğin yere gider:

- **Optik akış ve zamansal tutarlılık** — nesnelerin kareden kareye gerçek
  nesneler gibi hareket edip etmediğini kontrol eder.
- **Kare kare sinir ağı yüz analizi** — harmanlamanın geride bıraktığı ince
  izleri işaretler.
- **Frekans analizi** — üretken modellerin gözle görünmez istatistiksel parmak izi.
- **Meta veri ve köken** — EXIF, kodlama tutarlılığı ve C2PA tek geçişte.

Bu kontrollerin görsele özgü sürümü için:
[bir görselin yapay zekâ üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated);
bu sahtelerin nasıl kurulduğunun arka planı için:
[deepfake nedir](/tr/blog/what-is-a-deepfake). Daha derin bir işaret listesi için:
[deepfake video nasıl anlaşılır: 9 uyarı işareti](/tr/blog/how-to-spot-a-deepfake-video).

### Hızlı kontrol listesi

1. İndir, 0,25×'e yavaşlat, kare kare ilerle.
2. Baş dönüşlerinde ve örtülmelerde yüz **kenarlarını** izle.
3. p/b/m seslerinde **dudak senkronunu** kontrol et; dişleri/ağız içini incele.
4. Yüzdeki **ışık/gölgeyi** sahneyle karşılaştır.
5. **Göz kırpmayı, bakışı ve mikro hareketi** izle.
6. **Kaynağı ve meta veriyi** kontrol et; **sesi** kulaklıkla dinle.

## Özet

Hiçbir işaret tek başına kanıt değildir — gerçek kliplerde de sıkıştırma, hareket
bulanıklığı ve tuhaf kadrajlar olur. Güvenilir yaklaşım sinyalleri
**birleştirmektir**; adli bir aracın yaptığı da tam olarak budur: tek bir ipucuna
bahse girmek yerine birkaç bağımsız kontrolü tek bir kararda birleştirir.
Verifyco bu füzyonu iPhone'unda saniyeler içinde, tamamen çevrimdışı çalıştırır —
bkz. [cihazda doğrulama nedir](/tr/blog/on-device-verification-explained).
