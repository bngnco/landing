---
title: Cihazda Doğrulama Nedir? (Yerel Dosyaların iPhone'unda Analiz Edilir)
description: "Verifyco, iPhone'unda seçtiğin dosyaları neden cihazda analiz eder: cihazda adli analiz nasıl işler, Neural Engine ne yapar, bulut ile cihaz karşılaştırması ve hangi yollarda geçici sunucu işlemesi kullanılır."
slug: on-device-verification-explained
date: 2026-06-08
author: Verifyco Ekibi
tags:
  - iOS
  - Araştırma
  - Rehberler
image: /uploads/blog/1000012581.png
imageAlt: Verifyco iPhone'da gizli, cihazda çalışan bir analiz yürütüyor
updated: 2026-07-01
---

Çoğu medya kontrol aracı aynı şekilde çalışır: dosyanı bir sunucuya yüklersin,
modelleri onu bulutta analiz eder ve sonucu geri alırsın. Verifyco öyle yapmaz.
Analiz **iPhone'unda yerel olarak** çalışır; seçtiğin fotoğraf ve videolar,
aşağıda anlatılan isteğe bağlı OpenAI kontrolünü açmadığın sürece cihazında
kalır. İşte bunun anlamı, nasıl mümkün olduğu ve neden önemli
olduğu — özellikle insanların en sık kontrol etmek istediği hassas içerikler için.

> **Kapsam.** Bu yazı iPhone'undan seçtiğin fotoğraf ve videolar hakkında. Verifyco'nun üç yolu sunucu kullanır ve bunu uygulamada açıkça belirtir: herkese açık bir sosyal medya bağlantısındaki medya kontrol için alınıp telefonuna iletilir ve bizde saklanmaz (analiz yine cihazda çalışır); Verifyco Web yüklemeleri geçici olarak işler ve yalnızca raporu saklar; Ayarlar'daki isteğe bağlı ve varsayılan olarak kapalı OpenAI köken kontrolü ise JPEG, PNG ve WebP görselleri yalnızca sen açarsan sunucumuz üzerinden OpenAI'a gönderir.

## Cihazda olmak neden önemli

- **Gizlilik.** En çok doğrulamak istediğin medya çoğu zaman en hassas olandır —
  özel bir fotoğraf, sızmış bir klip, birinin sana gönderdiği mahrem bir görüntü.
  Cihazda analiz; aşağıda anlatılan isteğe bağlı ve varsayılan olarak kapalı
  OpenAI kontrolünü açmadığın sürece, onun başkasının sunucusundan, günlüklerinden
  ve ihlallerinden uzak kalması demektir.
- **Hız.** Cihazdaki analizde kuyruk ve gidiş-dönüş olmadığı için analiz, dosyayı
  seçtiğin an başlar — bir küçük resim değil 4K bir video kontrol ediyorsan bu
  fark eder.
- **Çevrimdışı çalışır.** Uçakta, çekmeyen sinyalde ya da ağı olmayan güvenli bir
  ortamda — cihazdaki analiz yine çalışır, çünkü hiçbir ağ çağrısı yapmaz.
  Bağlantı gerektiren tek şey, açtıysan isteğe bağlı OpenAI kontrolüdür.
- **Hesap yok, iz yok.** Kaydolunacak bir şey yok; kontrol edilen bir dosyayı
  kimliğine bağlayan hiçbir şey yok.

> Telefonundan seçtiğin bir dosya için sunucu yok, yükleme yok, hesap yok; tek istisna, Ayarlar'daki isteğe bağlı ve varsayılan olarak kapalı OpenAI köken kontrolünü açman: o zaman JPEG, PNG ve WebP görseller sunucumuz üzerinden OpenAI'ın Content Provenance API'sine gider ve sunucumuz görseli ardından siler. Bağlantı kontrolleri ve Verifyco Web, yukarıdaki kapsam notunda dendiği gibi geçici sunucu işleme kullanır.

## "Cihazda" tam olarak ne demek

Modern iPhone'lar, makine öğrenmesi modellerini hızlı ve verimli çalıştırmak için
üretilmiş özel bir çip olan **Neural Engine** ile gelir. Apple'ın **Core ML** ve
**Vision** çatıları, bir uygulamanın sinir ağlarını doğrudan bu donanımda
çalıştırmasına izin verir.

Verifyco bunu, diğer araçların bir veri merkezindeki GPU'ya gönderdiği işleri
yerelde yapmak için kullanır: yüzlerde ve sahnelerde sinir ağı analizi, frekans
dönüşümleri, meta veri ayrıştırma ve dosya karması — hepsi telefonun kendi
belleğinde, saniyeler içinde. Analizin kendisi medyanı hiçbir yere göndermez;
yalnızca isteğe bağlı ve varsayılan olarak kapalı OpenAI kontrolü, açarsan, bir
görseli sunucumuz üzerinden OpenAI'a gönderir.

## Yerelde çalışan beş sinyal

Verifyco, **beş bağımsız adli sinyali** tek bir 0–100 güven skorunda birleştirir:

1. **İçerik kimlik bilgileri** — C2PA kökeni, kameranın imzalı "makbuzu".
2. **Meta veri adli analizi** — EXIF, kodlama tutarlılığı ve kare hızı anomalileri.
3. **Sinir ağı yüz analizi** — Apple Vision ile kare kare; üreticilerin geride
   bıraktığı izlerin peşinde.
4. **Hareket analizi** — kareler arasında optik akış ve zamansal tutarlılık.
5. **Frekans analizi** — difüzyon ve GAN modellerinin gözle görünmez DCT spektral
   parmak izi.

Katmanların çoğu tek başına belirleyici değildir — mesele de bu. Kararı sağlam yapan,
birkaç bağımsız sinyalin füzyonudur; çünkü birini kandırmak kolay, hepsini aynı
anda kandırmak zordur. (Her katmanın pratikte neyi yakaladığı için:
[bir görselin yapay zekâ üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated)
ve [bir videonun deepfake olduğunun 5 işareti](/tr/blog/5-signs-a-video-has-been-deepfaked).)

## Bulut mu, cihaz mı: takas

| | Bulut doğrulama | Cihazda (Verifyco) |
| --- | --- | --- |
| Medyan | Bir sunucuya yüklenir | Yerel dosyalar, OpenAI kontrolünü açmadığın sürece telefonunda kalır |
| Hız | Yükleme + kuyruk + indirme | Anında başlar |
| Çevrimdışı | Hayır | Evet (isteğe bağlı OpenAI kontrolü bağlantı gerektirir) |
| Hesap gerekli | Genellikle | Hayır |
| Gizlilik riski | Sunucu günlükleri, ihlaller | OpenAI kontrolünü açmadığın sürece cihazının ötesinde yok |

Bulutların sunabildiği tek şey dev bir merkezî modeldir. Ama adli doğrulama için
önemli olan sinyaller — köken, meta veri, frekans örüntüleri, zamansal tutarlılık
— cihazda gayet iyi çalışır ve gizlilik kazancı devasadır.

## Sık sorulanlar

**Cihazda analiz buluttan daha zayıf mı?** Bu adli sinyaller için analiz aynı
matematik; değişen tek şey *konum*. Tespit her zaman hareketli bir hedeftir
(üreticiler gelişir); Verifyco'nun birkaç sinyali birleştirmesi ve uygulama
güncellemeleriyle iyileşmesi bu yüzdendir.

**Pilimi bitirir mi?** Tek bir analiz, kısa bir Neural Engine çalışmasıdır —
ağır bir fotoğraf filtresi uygulamakla kıyaslanabilir, sonra biter.

**Hangi iPhone'lar?** Neural Engine'i olan her modern iPhone (iOS 17+). Daha yeni
çipler sadece daha hızlı bitirir.

**Dosyalarımı hiç görüyor musunuz?** Telefonundan seçtiğin dosyaları, isteğe bağlı OpenAI köken kontrolünü (varsayılan olarak kapalı) açmadığın sürece görmüyoruz; açarsan JPEG, PNG ve WebP görseller sunucumuz üzerinden OpenAI'a gider ve sunucumuz her görseli ardından siler. Yapıştırdığın herkese açık bir bağlantıdaki medya kontrol için alınır ve bizde saklanmaz; Verifyco Web ise yüklemeleri geçici olarak işler ve yalnız raporu saklar.

## Özet

Cihazda doğrulama; **tasarımı gereği gizli ve gerçekten kullanılacak kadar hızlı**,
adli düzeyde bir ikinci görüş sunar — bir medyaya güvenmeden ve onu paylaşmadan
önce. Konuya yeni misin? [Deepfake nedir](/tr/blog/what-is-a-deepfake) ile başla.
