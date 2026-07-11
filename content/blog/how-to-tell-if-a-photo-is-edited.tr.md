---
title: Bir Fotoğrafın Düzenlendiği Nasıl Anlaşılır (İşe Yarayan 7 Kontrol)
description: 'AI değil — sadece oynanmış. Bir fotoğrafın düzenlendiğini ya da photoshoplandığını anlamanın yolları: gölge ve kenar kontrolleri, hata seviyesi analizi, üstveri, tersine arama ve adli araçlar.'
slug: how-to-tell-if-a-photo-is-edited
date: 2026-07-05
updated: 2026-07-07
author: Verifyco Ekibi
tags:
  - Rehberler
  - AI Tespiti
image: /uploads/blog/ChatGPT Image 11 Tem 2026 23_08_11.png
imageAlt: iPhone'da bir fotoğrafı düzenleme ve manipülasyon izleri için inceleme
---

Herkes "bu AI mı?" diye soruyor — ama hasarın çoğunu hâlâ daha eski soru veriyor: **bu gerçek fotoğraf *düzenlenmiş* mi?** Tek bir nesnesi silinmiş, tek bir yüzü değiştirilmiş, tek bir ayrıntısı klonla kapatılmış gerçek bir fotoğraf, tamamen üretilmiş bir görselden çoğu zaman daha aldatıcıdır — çünkü geri kalan her şeyi sahicidir.

Fotoğraf manipülasyonu difüzyon modellerinden onlarca yıl eski; onu yakalama teknikleri de öyle. İşte yedi kontrol — gözle yapabildiklerinizden adli yazılım gerektirenlere. (Görüntünün düzenlenmiş değil baştan sona AI üretimi olduğundan şüpheleniyorsanız, o başka bir liste: [bir görselin AI üretimi olduğu nasıl anlaşılır](/tr/blog/how-to-tell-if-an-image-is-ai-generated).)

## 1. Işığı takip edin

Işık fiziktir ve editörler fiziği yanlış yapar. Işık kaynağını seçin (güneş, pencere, lamba) ve sahneyi ona göre denetleyin:

- **Gölgeler** aynı kaynaktan, tutarlı uzunluk ve yumuşaklıkla düşmeli. Sonradan eklenmiş kişi ya da nesnenin gölgesi çoğu zaman yanlış açıdadır — ya da hiç yoktur.
- **Parlamalar** yüzlerde ve nesnelerde ışığa bakan tarafta olmalı. Aynı fotoğrafta zıt yönlerden aydınlanan iki kişi orada birlikte durmamıştır.
- **Renk sıcaklığı** uyuşmalı: soğuk ışıklı bir odaya yapıştırılan sıcak ışıklı özne sıcaklığını korur — klasik montaj işareti.

## 2. Kenarları yüksek yakınlaştırmada inceleyin

Kes-yapıştır dikiş bırakır. Şüpheli öğenin sınırına yakınlaşın: bulanıklık ya da parlaklık halesi, sert bir kesim çizgisinde biten saç kenarları, silüette aniden kesilen arka plan dokusu. Editörler bu dikişleri yumuşatır — yumuşatmanın kendisi de bir işarettir: dış hattı her şeyden *daha yumuşak* olan özne sonradan harmanlanmıştır.

## 3. Klon damgası avlayın

Bir şeyi silmek, üstünü görüntünün başka yerinden alınan piksellerle örtmek demektir. Bu **tekrar** üretir: birbirinin aynı bulutlar, aynı çim öbekleri, iki kez görünen aynı duvar dokusu, iki yüzü birebir eşleşen bir kalabalık. Arka planları tekrarlayan desenler için tarayın — doğa kopyala-yapıştır yapmaz.

## 4. Geometriyi kontrol edin

Düz çizgiler düz kalmalı, perspektif uyuşmalı. Bir beden hattının hemen yanındaki eğrilmiş kapı kasaları, bükülmüş fayanslar veya dalgalı korkuluklar, liquify tarzı rötuşun imzasıdır. Yansımalar, editörlerin en sık unuttuğu geometri kontrolüdür: aynalar, camlar, su ve güneş gözlükleri tutarlı bir sahne göstermeli — düzenlenen öznenin yansıması nadiren onunla birlikte düzenlenir.

[[cta]]

## 5. Üstveriyi okuyun

Dosyanın ayrıntılarını (iPhone'da: Fotoğraflar'daki ⓘ) veya bir üstveri görüntüleyici açın:

- **Listelenen düzenleme yazılımı** (Photoshop, Lightroom, bir AI editörü) aldatma kanıtı değildir — ama "makineden çıktığı gibi" hikâyesini bitirir.
- **Uyuşmayan tarihler** — çekim tarihinden çok sonra bir "değiştirilme" tarihi soru davet eder.
- Orijinal diye sunulan bir fotoğrafta **üstverinin tamamen yokluğu** kendi başına bilgidir; platformlar üstveriyi siler, kameradan çıkan orijinallerde durur.
- Varsa **İçerik Kimlik Bilgileri**, gerçek düzenleme geçmişini kriptografik olarak kaydeder — iki yönde de en güçlü kanıt. (Nasıl çalıştığı: [İçerik Kimlik Bilgileri (C2PA)](/tr/blog/content-credentials-c2pa-explained).)

## 6. Orijinali tersine arayın

Düzenlenmiş *haber* görüntüleri için en kesin kontrol: düzenlenmemiş orijinal çoğu zaman bir yerlerde vardır. Şüpheli fotoğrafı Google Lens veya Google Görseller'e verin; kaynak görüntü çıkabilir — aynı sahne, eklenen kalabalık olmadan, silinen tabela yerinde, değiştirilen yüz eski hâlinde. Bu, gerçek bir fotoğrafın başka bir olaya yeniden altyazılanmasını — manipülasyonların en ucuzunu — yakalamanın da en hızlı yolu.

## 7. Adli analiz çalıştırın

Her düzenleme, dosyanın istatistiksel dokusunu gözün göremeyeceği biçimlerde bozar. Eklenmiş bir bölgenin yeniden sıkıştırma geçmişi farklıdır; gürültü desenleri kamera sensörleri arasında değişir; frekans alanı imzaları yeniden örneklenmiş veya yeniden üretilmiş bölgeleri ele verir. Klasik web araçları (hata seviyesi analizi ve benzerleri) bunun bir kısmını gösterir ama uzman yorumu ister — ve fotoğrafınızı birilerinin sunucusuna yüklemenizi gerektirir.

**[Verifyco](https://apps.apple.com/app/id6772592963)** bu sınıf analizi iPhone'unuzda çalıştırır: üstveri ve kodlama adli incelemesi, frekans analizi, sinirsel inceleme ve kaynak kontrolleri — katman katman dökümlü 0–100 güven puanında birleşir; cihazda çalıştığı için sorguladığınız fotoğraf telefonunuzdan çıkmaz ([bunun önemi](/tr/blog/on-device-verification-explained)). AI araçlarıyla düzenleme (üretken dolgu, nesne silme) giderek üretimle aynı istatistiksel parmak izlerini bırakıyor — frekans katmanının aradığı tam da bu.

### 60 saniyelik versiyon

1. **Işık ve gölgeler** tutarlı mı? 2. **Kenarlar** yakınlaştırmada temiz mi? 3. **Tekrarlayan dokular** var mı? 4. **Düz çizgiler ve yansımalar** makul mü? 5. **Üstveri** hikâyesi tutuyor mu? 6. **Tersine arama** orijinali buluyor mu? 7. **Adli tarama** ne diyor?

## Sıkça sorulan sorular

**Bir fotoğrafın düzenlendiği her zaman anlaşılır mı?**
Hayır — kaliteli bir orijinal üzerinde çalışan usta bir rötuşçu görsel incelemeyi yenebilir; ağır sıkıştırma da iki yönde adli kanıtı yok edebilir. Ama fiilen karşılaşacağınız manipülasyonların çoğu hızlı ve özensiz iştir ve yukarıdaki kontrollere takılır. Her sonucu kanıt sayın, kesin hüküm değil.

**Bir görselin photoshoplandığını ücretsiz kontrol etmenin en iyi yolu ne?**
Tersine görsel arama, sonra ışık/kenar/geometri turu — hiçbir maliyeti yoktur ve amatör sahtelerin çoğunu yakalar. Önemli bir şeyse üstveri okuma ve bir adli analiz geçişi ekleyin.

**Üstveride düzenleme görünmesi fotoğrafın sahte olduğunu kanıtlar mı?**
Hayır. Yayımlanan hemen her fotoğraf meşru biçimde yazılımdan geçmiştir — kırpma ve renk düzeltme de düzenlemedir. Üstveri size dosyanın *hikâyesini* anlatır; aldatma, o hikâyenin fotoğrafla öne sürülen iddiayla çelişmesidir.

**Düzenlenmiş fotoğraf ile AI fotoğrafı aynı şey mi?**
Giderek örtüşen farklı problemler. Klasik düzenleme gerçek bir çekimin parçalarını değiştirir; AI üretimi pikselleri yoktan yaratır. Modern AI editörleri çizgiyi bulanıklaştırıyor — üretken dolgu, gerçek fotoğrafın içinde *üretimdir* — ciddi araçların hem manipülasyon imzalarını hem üretim parmak izlerini kontrol etmesinin nedeni de bu.

## Sonuç

Her şüpheli görüntünün arkasındaki soru aynı: fizik, dosya ve kayıt izi anlatılan hikâyeyle uyuşuyor mu? Işık, kenarlar, tekrar, geometri, üstveri, tersine arama, adli analiz — yedi kontrol, tek alışkanlık: **inanmadan önce doğrula.** Videodaki karşılığı için: [deepfake video nasıl anlaşılır](/tr/blog/how-to-spot-a-deepfake-video).
