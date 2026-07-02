---
title: "Cihazda Doğrulama Nedir? (Hiçbir Şey iPhone'undan Çıkmaz)"
description: "Verifyco neden tamamen iPhone'unda çalışır: cihazda adli analiz nasıl işler, Neural Engine ne yapar, bulut ile cihaz karşılaştırması ve neden hiçbir şey asla yüklenmez."
slug: on-device-verification-explained
date: 2026-06-08
updated: 2026-07-01
author: "Verifyco Ekibi"
tags: ["iOS", "Araştırma", "Rehberler"]
image: /uploads/blog/spotlight.png
imageAlt: "Verifyco iPhone'da gizli, cihazda çalışan bir analiz yürütüyor"
---

Çoğu medya kontrol aracı aynı şekilde çalışır: dosyanı bir sunucuya yüklersin,
modelleri onu bulutta analiz eder ve sonucu geri alırsın. Verifyco öyle yapmaz.
Her sinyal **iPhone'unda yerel olarak** çalışır ve fotoğrafların ile videoların
cihazdan asla çıkmaz. İşte bunun anlamı, nasıl mümkün olduğu ve neden önemli
olduğu — özellikle insanların en sık kontrol etmek istediği hassas içerikler için.

## Cihazda olmak neden önemli

- **Gizlilik.** En çok doğrulamak istediğin medya çoğu zaman en hassas olandır —
  özel bir fotoğraf, sızmış bir klip, birinin sana gönderdiği mahrem bir görüntü.
  Cihazda analiz; onun başkasının sunucusuna hiç dokunmaması, hiçbir günlükte
  oturmaması ve senin olmayan bir ihlalden sızamaması demektir.
- **Hız.** Yükleme yok, kuyruk yok, gidiş-dönüş yok. Dosyayı seçtiğin an analiz
  başlar — bir küçük resim değil 4K bir video kontrol ediyorsan bu fark eder.
- **Çevrimdışı çalışır.** Uçakta, çekmeyen sinyalde ya da ağı olmayan güvenli bir
  ortamda — yine çalışır, çünkü yapılacak bir ağ çağrısı yoktur.
- **Hesap yok, iz yok.** Kaydolunacak bir şey yok; kontrol edilen bir dosyayı
  kimliğine bağlayan hiçbir şey yok.

> Sunucu yok. Yükleme yok. Hesap yok. Medyan telefonunda kalır, nokta.

## "Cihazda" tam olarak ne demek

Modern iPhone'lar, makine öğrenmesi modellerini hızlı ve verimli çalıştırmak için
üretilmiş özel bir çip olan **Neural Engine** ile gelir. Apple'ın **Core ML** ve
**Vision** çatıları, bir uygulamanın sinir ağlarını doğrudan bu donanımda
çalıştırmasına izin verir.

Verifyco bunu, diğer araçların bir veri merkezindeki GPU'ya gönderdiği işleri
yerelde yapmak için kullanır: yüzlerde ve sahnelerde sinir ağı analizi, frekans
dönüşümleri, meta veri ayrıştırma ve dosya karması — hepsi telefonun kendi
belleğinde, saniyeler içinde, medyandan tek bir bayt bile iletilmeden.

## Yerelde çalışan beş sinyal

Verifyco, **beş bağımsız adli sinyali** tek bir 0–100 güven skorunda birleştirir:

1. **İçerik kimlik bilgileri** — C2PA kökeni, kameranın imzalı "makbuzu".
2. **Meta veri adli analizi** — EXIF, kodlama tutarlılığı ve kare hızı anomalileri.
3. **Sinir ağı yüz analizi** — Apple Vision ile kare kare; üreticilerin geride
   bıraktığı izlerin peşinde.
4. **Hareket analizi** — kareler arasında optik akış ve zamansal tutarlılık.
5. **Frekans analizi** — difüzyon ve GAN modellerinin gözle görünmez DCT spektral
   parmak izi.

Hiçbir katman tek başına belirleyici değildir — mesele de bu. Kararı sağlam yapan,
birkaç bağımsız sinyalin füzyonudur; çünkü birini kandırmak kolay, hepsini aynı
anda kandırmak zordur. (Her katmanın pratikte neyi yakaladığı için:
[bir görselin yapay zekâ üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated)
ve [bir videonun deepfake olduğunun 5 işareti](/tr/blog/5-signs-a-video-has-been-deepfaked).)

## Bulut mu, cihaz mı: takas

| | Bulut doğrulama | Cihazda (Verifyco) |
| --- | --- | --- |
| Medyan | Bir sunucuya yüklenir | Telefonundan asla çıkmaz |
| Hız | Yükleme + kuyruk + indirme | Anında başlar |
| Çevrimdışı | Hayır | Evet |
| Hesap gerekli | Genellikle | Hayır |
| Gizlilik riski | Sunucu günlükleri, ihlaller | Cihazının ötesinde yok |

Bulutların sunabildiği tek şey dev bir merkezî modeldir. Ama adli doğrulama için
önemli olan sinyaller — köken, meta veri, frekans örüntüleri, zamansal tutarlılık
— cihazda gayet iyi çalışır ve gizlilik kazancı devasadır.

## Sık sorulanlar

**Cihazda analiz bulut kadar doğru mu?** Bu adli sinyaller için evet — analiz
aynı matematik; değişen tek şey *konum*. Tespit her zaman hareketli bir hedeftir
(üreticiler gelişir); Verifyco'nun birkaç sinyali birleştirmesi ve uygulama
güncellemeleriyle iyileşmesi bu yüzdendir.

**Pilimi bitirir mi?** Tek bir analiz, kısa bir Neural Engine çalışmasıdır —
ağır bir fotoğraf filtresi uygulamakla kıyaslanabilir, sonra biter.

**Hangi iPhone'lar?** Neural Engine'i olan her modern iPhone (iOS 17+). Daha yeni
çipler sadece daha hızlı bitirir.

**Dosyalarımı hiç görüyor musunuz?** Hayır. Hiçbir yükleme yolu yok — medyanı bize
gönderecek özellik zaten mevcut değil.

## Özet

Cihazda doğrulama; **tasarımı gereği gizli ve gerçekten kullanılacak kadar hızlı**,
adli düzeyde bir ikinci görüş sunar — bir medyaya güvenmeden ve onu paylaşmadan
önce. Konuya yeni misin? [Deepfake nedir](/tr/blog/what-is-a-deepfake) ile başla.
