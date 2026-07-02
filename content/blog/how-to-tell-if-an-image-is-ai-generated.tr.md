---
title: "Bir Görselin Yapay Zekâ Üretimi Olduğu Nasıl Anlaşılır: Eksiksiz 2026 Rehberi"
description: "Bir fotoğrafın gerçek mi yapay zekâ mı olduğunu ayırt edemiyor musun? 2026'da gerçekten işe yarayan yöntemi öğren: köken kontrolleri, dedektör araçları ve yapay zekânın hâlâ yanlış yaptığı fizik ipuçları."
slug: how-to-tell-if-an-image-is-ai-generated
date: 2026-06-28
updated: 2026-07-01
author: "Verifyco Ekibi"
tags: ["AI Tespiti", "Rehberler"]
image: /uploads/blog/face.png
imageAlt: "iPhone'da yapay zekâ üretim izlerini vurgulayan adli görsel analizi"
---

Birkaç yıl önce bir yapay zekâ görselini yakalamak kolaydı. Altı parmak, erimiş yazılar, farklı yönlere bakan gözler. O dönem bitti. 2026 itibarıyla görsel üreticiler, sıradan bir telefon fotoğrafından beklediğin görüntülerle eşleşen resimler üretiyor ve dürüst gerçek şu: **artık genellikle sadece bakarak anlayamazsın.** Her zaman anlayabildiğini iddia eden herkes kendini abartıyordur.

Bu, çaresiz olduğun anlamına gelmiyor. Şüpheli bir görseli araştırmanın güvenilir bir yolu var — ama bu bir bakış değil, bir süreç. Bu rehber, 2026'da işe yarayan basamakları tek tek geziyor: en hızlı ve en kesin kontrollerden, son çare görsel ipuçlarına kadar.

Tek bir şey aklında kalacaksa şu olsun: **kökenden dedektörlere, dedektörlerden fiziğe — bu sırayla ilerle.**

## Önce neyle karşı karşıya olduğunu anla

Sorunu perspektife oturtmak için: sektör tahminleri, 2026 itibarıyla büyük platformlarda **her gün 500 milyondan fazla yapay zekâ görseli** üretildiğini söylüyor. McAfee'nin araştırması, ortalama bir Amerikalının artık farkına varmadan günde yaklaşık **2,6 deepfake** ile karşılaştığını buldu. Kaydırıp geçtiklerinin büyük bir kısmı hiçbir zaman bir kamerayla çekilmedi.

2025'ten 2026'ya kalite sıçraması dik oldu. Bir zamanlar bariz sahteler üreten araçlar artık normal bir fotoğraf düzenlemesinin gerçekçiliğine ulaşıyor. Eski "ipuçlarını yakala" tavsiyelerinin başarısız olmasının nedeni bu — artık var olmayan bir yapay zekâ nesli için yazılmışlardı. Teknolojinin arka planı için: [deepfake nedir](/tr/blog/what-is-a-deepfake).

Yani daha akıllı bir yaklaşıma ihtiyacımız var.

## Adım 1: Kökeni kontrol et (en hızlı, en güvenilir sinyal)

Tek bir pikseli analiz etmeden önce daha basit bir soru sor: **görsel, nereden geldiğine dair bir kayıt taşıyor mu?**

Buna *köken* (provenance) denir ve 2026'da mevcut en güçlü sinyaldir; çünkü tahmine değil, dosyaya gömülü kriptografik bir kayda dayanır.

### İçerik Kimlik Bilgileri (C2PA)

**Coalition for Content Provenance and Authenticity (C2PA)**, İçerik Kimlik Bilgileri adında açık bir standart oluşturdu. Artık birçok kamera, düzenleme aracı ve yapay zekâ üreticisi bu meta veriyi görsellere ekliyor. Bir resmin oluşturulmasında veya düzenlenmesinde yapay zekânın rol alıp almadığını söyleyebilir.

Büyük yapay zekâ şirketleri bunu benimsedi. Örneğin OpenAI, araçlarıyla yapılan görsellere İçerik Kimlik Bilgileri ekliyor ve doğrulamak için bir yol sunuyor. Püf noktası — ve önemli bir nokta — meta verinin **silinebilmesi**. Biri görselin ekran görüntüsünü alır ya da yeniden kaydederse kimlik bilgileri çoğu zaman kaybolur. Yani "kimlik bilgisi bulunamadı" sonucu bir görseli aklamaz; sadece izin soğuduğu anlamına gelir.

### SynthID (Google)

Google, kendi modelleriyle üretilen görsellere **SynthID** adlı görünmez bir filigran gömüyor. Gemini uygulamasını açıp bir görsel yükleyebilir ve Google yapay zekâsıyla yapılıp yapılmadığını sorabilirsin — SynthID filigranını kontrol eder.

Aynı sınırlama burada da geçerli ve Google bu konuda dürüst: SynthID **yalnızca Google kökenli içeriği** işaretler. "Filigran yok" sonucu; Midjourney, Stable Diffusion veya Google dışı herhangi bir araçla yapılmış bir görseli aklamaz.

**Adım 1'in özeti:** köken bulursan, cevabını çoğu zaman saniyeler içinde alırsın. Bulamazsan Adım 2'ye geç — kökenin yokluğu tek başına hiçbir şey kanıtlamaz.

## Adım 2: Dedektör araçlarından geçir (ikinci hattın)

Köken izi boşsa sıra dedektörlerde. Bu araçlar, üretken modellerin geride bıraktığı istatistiksel parmak izlerini — insan gözüne görünmez ama eğitilmiş bir modelce tespit edilebilir örüntüleri — analiz eder.

Onları akıllıca kullanmak için bilmen gerekenler:

**Karar değil, olasılık verirler.** Bağımsız 2026 kıyaslamaları, en iyi dedektörleri **temiz, sıkıştırılmamış görsellerde kabaca %85–94 doğrulukta** gösteriyor — görsel sıkıştırıldığında, yeniden boyutlandırıldığında veya düzenlendiğinde belirgin biçimde düşüyor. Bu gerçekten işe yarar, ama kesinlik değildir. Skoru kanıtlardan biri olarak değerlendir.

**Sıkıştırma zayıf noktalarıdır.** Sosyal medya platformları görselleri agresifçe sıkıştırır ve veriden arındırır. Ağır sıkıştırılmış gerçek bir fotoğraf da, temizlenmiş bir sahte de dedektörü şaşırtabilir. Dedektörlerin birbiriyle çelişmesinin bir numaralı nedeni budur.

**Tek başına hiçbir araç güvenilir değildir.** 2026'nın pratik yöntemi, birden fazla güçlü dedektörden geçirmek ve *uyuştukları* yere bakmaktır. Uyuşma senin sinyalindir; uyuşmazlık "belirsiz" demektir — ki bu son derece dürüst bir cevaptır.

Cihazda çalışan bir aracın değerini kazandığı yer de burası. Çoğu web dedektörü, görselini bir şirketin sunucusuna yüklemeni ister — resim kişisel ya da hassassa bu bir gizlilik sorunudur. **[Verifyco](https://apps.apple.com/app/id6772592963)**'yu tam da bunu çözmek için geliştirdik: **tamamen iPhone'unda** çok katmanlı bir adli analiz çalıştırır; meta veriyi, yapay zekâ üretim imzalarını ve frekans örüntülerini kontrol eder, ardından *ne* bulduğunun tam dökümüyle bir güven skoru verir. Hiçbir şey yüklenmez, hesap gerekmez ve belirsizlik konusunda dürüsttür — sinyaller zayıfsa tahmin etmek yerine "belirsiz" der. (iPhone'a özgü akış için: [iPhone'da fotoğraf kontrol rehberi](/tr/blog/check-if-photo-is-ai-on-iphone).)

## Adım 3: Fiziği incele (son çare)

Köken boşsa ve dedektörler bölünmüşse, yapay zekânın hâlâ zorlandığı şeye dönersin: **küresel fiziksel tutarlılık.** Üreticiler bir görseli yerel yerel — bölge bölge — kurar ve çoğu zaman tüm sahneyi, gerçek ışığın ve gerçek merceklerin yaptığı gibi uzlaştıramaz.

Bakılacak yerler, kabaca güvenilirlik sırasıyla:

### Gölgeler ve ışık yönü
Her gölgeyi takip et. Gerçek bir fotoğrafta hepsi ışık kaynağından/kaynaklarından tutarlı biçimde düşer. Yapay zekâ sahneleri, hiçbir gerçek aydınlatma düzeninin üretemeyeceği gölge açılarını sık sık karıştırır — soldan aydınlatılan bir kişinin gölgesinin sola düşmesi gibi.

### Yansımalar
Gözleri, gözlükleri, suyu, camları ve parlak yüzeyleri kontrol et. Yapay zekâ görsellerinde yansıyan içerik çoğu zaman gerçek sahneyle çelişir ya da olmaması gereken yerde belirir.

### Arka plan geometrisi
Düz çizgiler yapay zekâ için zordur. Korkuluklara, yer karolarına, pencere çerçevelerine, tuğla örgüsüne ve kapı kenarlarına bak. Yapay zekâ görsellerinde bunlar düz gitmeleri gereken yerde bükülür, birleşir veya fazladan parçalar üretir.

### Derinlik ve bulanıklık
Gerçek kamera mercekleri *mesafeye göre* bulanıklaştırır — odak noktasından uzaklaşan şeyler öngörülebilir biçimde yumuşar. Yapay zekâ bazen "estetik tahminle" bulanıklaştırır ve hiçbir gerçek kameranın üretmeyeceği bir ön plan-arka plan netlik kombinasyonu bırakır.

### İnce doku ve desenler
Tekrarlayan ayrıntılara yakından bak — kumaş dokuları, kalabalıktaki yüzler, bitki örtüsü, tabelalardaki yazılar. Yapay zekâ, karmaşık desenlerin incelikli etkileşiminde zorlanır ve yakından bakınca çoğu zaman ince, rüyamsı tutarsızlıklar üretir.

**Kritik bir uyarı:** bu ipuçları her ay biraz daha zor okunur hâle geliyor — fiziğin *ilk* değil *son* katman olmasının nedeni tam da bu. Modern bir üretici, bu kontrollerin hepsini geçen bir sahne üretebilir. Bunları geçmek özgünlüğün kanıtı değildir — sadece bariz bir kusur bulamadığın anlamına gelir.

## Hepsini birleştirelim: 2026 iş akışı

Tüm yöntem tek yerde:

1. **Önce köken.** İçerik Kimlik Bilgilerini (C2PA) ve Google şüphesi varsa Gemini üzerinden SynthID'yi kontrol et. Bir şey bulduysan muhtemelen cevabın hazır.
2. **Sonra dedektörler.** Görseli birden fazla güçlü dedektörden geçir. Uyuşmaya bak. Verifyco gibi gizli, cihazda çalışan bir seçenek görselini üçüncü taraf sunuculardan uzak tutar.
3. **En son fizik.** Hâlâ karar vermen gerekiyorsa gölgeleri, yansımaları, geometriyi, derinliği ve dokuyu didik didik et — bu kontrolleri geçmenin garanti olmadığını unutmadan.

Seni koruyan zihniyet "sahteleri yakalayabilirim" değil. "**Güvenmeden önce kontrol ederim.**" Bu tek alışkanlık, aynı görseli ikinci kez düşünmeden kaydırıp geçen herkesin önüne geçirir. Video mu kontrol ediyorsun? [Deepfake video nasıl anlaşılır](/tr/blog/how-to-spot-a-deepfake-video) yazısına bak.

## Sıkça sorulan sorular

**ChatGPT veya Gemini bir görselin yapay zekâ üretimi olup olmadığını söyleyebilir mi?**
Kısmen. Gemini, yalnızca Google yapımı görselleri kapsayan SynthID filigranını kontrol edebilir. Genel sohbet botları görsel tutarsızlıklar hakkında *yorum yapabilir*, ama özel dedektörler değildirler ve tek kontrolün olmamalıdırlar.

**Yapay zekâ görsel dedektörleri doğru mu?**
En iyileri 2026 kıyaslamalarında temiz görsellerde kabaca %85–94 doğrulukta; sıkıştırılmış veya düzenlenmiş görsellerde daha düşük. Güçlü bir sinyaldirler, nihai karar değil. Birden fazlasını kullan ve sonucu kökenle birlikte tart.

**İki dedektör neden farklı cevap veriyor?**
Neredeyse her zaman sıkıştırma veya düzenleme yüzünden. Platformlar görselleri ağır biçimde sıkıştırır ve arındırır; bu da dedektörlerin dayandığı istatistiksel parmak izlerini bozar. Araçlar çelişiyorsa sonucu belirsiz say.

**Filigran veya meta veri yoksa yapay zekâ mıdır?**
Hayır — ve bu yaygın bir hatadır. Köken verisi ekran görüntüsü ve yeniden kaydetmeyle kolayca silinir. Eksik bir filigran tek başına hiçbir şey kanıtlamaz; sadece dedektörlere ve fiziğe dayanman gerektiği anlamına gelir.
