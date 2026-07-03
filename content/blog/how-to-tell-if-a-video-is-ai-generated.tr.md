---
title: "Bir Videonun Yapay Zekâ Üretimi Olduğu Nasıl Anlaşılır (2026 Rehberi)"
description: "Sora sınıfı modeller artık yazıdan video üretiyor. Bir videonun AI üretimi olduğunu anlamanın yolları: fizik hataları, doku bozulmaları, kaynak kontrolü ve adli araçlar."
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
updated: 2026-07-03
author: "Verifyco Ekibi"
tags:
  - AI Tespiti
  - Rehberler
image: ''
imageAlt: "Bir videonun AI üretimi olup olmadığını iPhone'da analiz etme"
---

Deepfake eskiden tek bir şey demekti: yüzü değiştirilmiş gerçek bir video. O dönem bitti. Yazıdan-videoya modeller — Sora, Veo ve açık kaynak halefleri — artık bir komuttan **sahnenin tamamını** üretiyor: insanlar, oda, ışık, kamera hareketi... hiçbiri hiç var olmadı. Tamamen sentetik bu videolar, yüz değiştirmelerden farklı şekillerde hata yapar; o yüzden kendi kontrol listelerini hak ediyorlar.

Bu rehber tam olarak bu. (*Gerçek belirli bir kişinin* bir şey söylediği videoyu inceliyorsanız, [deepfake video nasıl anlaşılır](/tr/blog/how-to-spot-a-deepfake-video) yazısındaki yüz-değiştirme işaretlerine de bakın — gerçek vakalar ikisini karıştırır.)

## Önce karedeki kolay işaretlere bakın

Mümkünse klibi indirin (ekran kaydı yeniden sıkıştırır ve kanıtı gizler), yavaş, tam ekran ve parlak izleyin. Şunları arayın:

- **Yazı ve tabelalar.** Üretilmiş dünyalar yazıyı hâlâ bozuyor — ilk bakışta doğru görünen ama durdurunca sahte harflere dönüşen dükkân tabelaları, formalar, plakalar, etiketler. Klip boyunca tutarlı, okunabilir yazı sahtelemesi gerçekten zor.
- **Eller, parmaklar ve nesne aktarımları.** Birbirine kaynayan parmaklar, yemeğin içinde eriyen çatal bıçak, elin *içinden* geçen nesneler. Nesneler arası etkileşim hâlâ zayıf nokta.
- **Arka plandaki insanlar.** Figüranlar model için ucuzdur ama denetimsizdir: kayan, tekrarlayan ya da birbirine karışan yürüyüşçülere dikkat.
- **Yansımaların simetrisi ve fiziği.** Aynalar, camlar, su ve güneş gözlükleri çoğu zaman *sahnenin kendisini* değil, *makul bir sahneyi* yansıtır. Yansıma dünyayla çelişiyorsa bu kesin bir bulgudur.
- **Fazla pürüzsüz hareket.** Üretilmiş videoda kamera çoğu zaman yüzer gibi, özneler hafif yavaşlatılmış ve ağırlıksızdır — hiçbir şey sarsılmaz, hiçbir şey inandırıcı titremez.

## Sonra nesne kalıcılığını kontrol edin

Tamamen üretilmiş videolar için en güvenilir işaret sınıfı bu. Gerçek nesneler kalıcıdır; üretilmişler yalnızca kalıcı *olma eğilimindedir*.

Klipte ilerleyip tek bir nesneyi izleyin — bir bardak, bir düğme, bir dövme, bir küpe. AI videoda bu nesne saniyeler ya da planlar arasında **şekil değiştirebilir, yer atlayabilir, kaybolabilir veya başka bir şeye dönüşebilir**. Sayın: parmaklar, tekerlekler, sandalye ayakları, pencere kanatları. Beş saniye sonra yeniden sayın. Gerçek video kendisiyle asla çelişmez; üretken modeller — özellikle on saniye sınırından sonra — hâlâ çelişir. Bu yüzden bu kadar çok sentetik klip şüpheli biçimde kısa ve bol kesmelidir.

[[cta]]

## Sadece piksele değil, kaynağa bakın

- **Önce kaynak.** Kim paylaşmış, başka nerede var, güvenilir bir haber kaynağı yayımlamış mı? Yalnızca tek bir anonim hesapta var olan çarpıcı bir klip, daha tek kareye bakmadan kırmızı bayraktır.
- **İçerik Kimlik Bilgileri.** Bazı AI araçları (Sora sınıfı modeller dahil) içeriğin sentetik olduğunu bildiren C2PA verisi ekler — bazı platformlar da bunu gösterir. Yokluğu hiçbir şey kanıtlamaz (üstveri ekran görüntüsü ve yeniden yüklemeyle silinir), ama varlığı hızlı ve dürüst bir yanıttır. Sistemi [İçerik Kimlik Bilgileri (C2PA) rehberinde](/tr/blog/content-credentials-c2pa-explained) anlatıyoruz.
- **Filigranlar.** Bazı üreticiler görünür veya görünmez filigran gömer (SynthID gibi). Görünmezler için üreticinin kendi denetleyicisi gerekir — isabet ettiğinde faydalı, diğer tüm üreticiler hakkında sessizdir.

## Gözünüz yetmediğinde: adli analiz

Yukarıdaki her işaret her model sürümüyle biraz daha siliniyor; araştırmalar da insanların yüksek kaliteli sentetik videoyu şans seviyesinin ancak üzerinde ayırt ettiğini tekrar tekrar gösteriyor. Sağlam yaklaşım, adli araçların kullandığı yaklaşım: **tek bir sinyale güvenmek yerine bağımsız sinyalleri birleştirmek.**

**[Verifyco](https://apps.apple.com/app/id6772592963)** bu birleşimi doğrudan iPhone'unuzda çalıştırır: zamansal tutarlılık ve optik akış (nesneler gerçek nesneler gibi mi hareket ediyor ve kalıcı mı?), frekans alanı analizi (difüzyon modellerinin bıraktığı istatistiksel parmak izi), üstveri ve kodlama adli incelemesi, kaynak kontrolü ve yüz varsa sinirsel yüz analizi. 0–100 arası bir güven puanı ve katman katman döküm alırsınız — ve kanıt yetersizse bunu dürüstçe söyler; yoğun sıkıştırılmış sosyal medya klipleri çoğu zaman öyledir. Dosyayı indirmek yerine bir sosyal platform bağlantısını da yapıştırabilirsiniz. Her şey **cihazda** çalışır: klip telefonunuzdan çıkmaz ([bunun neden önemli olduğu burada](/tr/blog/on-device-verification-explained)).

### Hızlı kontrol listesi

1. Asıl dosyayı indirin; 0.25× hızda oynatın.
2. **Yazı, eller, yansımalar, arka plan insanları** üzerinde durdurun.
3. Klip boyunca tek bir nesneyi izleyin — **kalıcı mı?**
4. **Kim paylaşmış** ve güvenilir bir yerde var mı, bakın.
5. **İçerik kimlik bilgisi / filigran** arayın.
6. **Cihazda adli analizden** geçirin; sadece karara değil katman dökümüne bakın.

## Sıkça sorulan sorular

**2026'da AI üretimi video güvenilir biçimde tespit edilebiliyor mu?**
Tek başına hiçbir yöntem güvenilir değil. Görsel inceleme + kaynak + çok sinyalli adli analiz birleşimi çoğu durumda güçlü kanıt verir — ama yoğun sıkıştırılmış yeniden yüklemelerde "belirsiz" sonucu bekleyin ve her aracın çıktısını kanıt sayın, kesin hüküm değil.

**En hızlı tek kontrol nedir?**
Sahnedeki herhangi bir yazıda durun, sonra yansımaları kontrol edin. İkisi de üretilmiş videoda hâlâ istikrarlı biçimde hatalıdır ve bir dakikadan az sürer.

**AI videoları neden bu kadar kısa?**
Uzun üretimler tutarlılık hatası biriktirir — nesneler kayar, yüzler değişir, sahneler kendiyle çelişir. Birçok sentetik klip tam da bunu gizlemek için ~10–15 saniyenin altında kalır ya da hızlı kesmelerin arkasına saklanır.

**Filigran veya kimlik bilgisi iki yönde de kanıt mıdır?**
AI kimlik bilgisinin varlığı, sentetik olduğuna dair güçlü kanıttır. Yokluğu hiçbir şey kanıtlamaz — internetteki gerçek *ve* sahte kliplerin çoğunun üstverisi platformlarca silinmiştir.

## Sonuç

Tamamen AI üretimi video "görmek inanmaktır" kuralını bozdu ama doğrulamayı bozamadı: fizik, kalıcılık, kaynak ve adli analiz, gözün kaçırdığını hâlâ yakalıyor. Alışkanlığı edinin — **paylaşmadan önce doğrulayın** — ve durağan görseller için yol arkadaşı rehberi elinizin altında tutun: [bir görselin AI üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated).
