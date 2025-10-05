# 💍 CaseStudy - Product Listing Application

Modern ve responsive bir ürün listeleme uygulaması. Backend Spring Boot API ve Frontend HTML/CSS/JavaScript ile geliştirilmiştir.

<img width="1920" height="797" alt="image" src="https://github.com/user-attachments/assets/30294d52-e48e-46d4-bd08-e453cb5d2c7d" />


## 🚀 Özellikler

### Backend (Spring Boot)
- **RESTful API** - Ürün verilerini JSON formatında sunar
- **Dinamik Fiyat Hesaplama** - Altın fiyatına göre gerçek zamanlı fiyat hesaplama
- **Gerçek Zamanlı Altın Fiyatı** - Metals.live API'sinden canlı altın fiyatı çekme
- **Filtreleme** - Fiyat ve popülerlik skoruna göre filtreleme
- **CORS Desteği** - Frontend entegrasyonu için

### Frontend (HTML/CSS/JavaScript)
- **Modern UI Tasarım** - Fotoğraftaki tasarıma uygun arayüz
- **Responsive Tasarım** - Mobil ve desktop uyumlu
- **Carousel** - Ok tuşları, klavye, touch/swipe desteği
- **Renk Seçici** - Yellow Gold, White Gold, Rose Gold seçenekleri
- **Popülerlik Skoru** - 5 üzerinden yıldızlı gösterim
- **Gerçek Ürün Resimleri** - 8 farklı engagement ring

## 🛠️ Teknolojiler

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Web**
- **Spring Data JPA**
- **H2 Database**
- **Jackson JSON**
- **WebFlux** (Altın fiyatı API'si için)

### Frontend
- **HTML5**
- **CSS3** (Flexbox, Grid, Animations)
- **Vanilla JavaScript** (ES6+)
- **Google Fonts** (Avenir, Montserrat)

## 📦 Kurulum ve Çalıştırma

### Backend Kurulumu

1. **Gereksinimler:**
   - Java 17+
   - Maven 3.6+

2. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/ilhanuzunoglu/FullStackDevelopmentCaseStudyProductListforRings.git
   cd FullStackDevelopmentCaseStudyProductListforRings
   ```

3. **Bağımlılıkları indirin:**
   ```bash
   mvn clean install
   ```

4. **Uygulamayı çalıştırın:**
   ```bash
   mvn spring-boot:run
   ```

5. **API'yi test edin:**
   - Tüm ürünler: `http://localhost:8080/api/products`
   - Filtreleme: `http://localhost:8080/api/products/filter?minPrice=100&maxPrice=500`
   - H2 Console: `http://localhost:8080/h2-console`

### Frontend Kurulumu

1. **Frontend klasörüne gidin:**
   ```bash
   cd frontend
   ```

2. **index.html dosyasını tarayıcıda açın:**
   - `frontend/index.html` dosyasına çift tıklayın
   - Veya bir web sunucusu kullanın

3. **Backend'in çalıştığından emin olun:**
   - Backend API `http://localhost:8080` adresinde çalışmalı

## 🎯 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/products` | Tüm ürünleri listele |
| GET | `/api/products/filter` | Filtrelenmiş ürünleri listele |
| GET | `/api/products/{id}` | Belirli bir ürünü getir |

### Filtreleme Parametreleri
- `minPrice` - Minimum fiyat
- `maxPrice` - Maksimum fiyat
- `minPopularity` - Minimum popülerlik skoru
- `maxPopularity` - Maksimum popülerlik skoru

## 💰 Fiyat Hesaplama

Ürün fiyatları aşağıdaki formülle hesaplanır:

```
Fiyat = (Popülerlik Skoru + 1) × Ağırlık × Altın Fiyatı
```

- **Popülerlik Skoru**: 0-1 arası (JSON'da 0.85 gibi)
- **Ağırlık**: Gram cinsinden
- **Altın Fiyatı**: Metals.live API'sinden gerçek zamanlı

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Yellow Gold**: #E6CA97
- **White Gold**: #D9D9D9
- **Rose Gold**: #E1A4A9

### Fontlar
- **Avenir** - Ana font (Book, Medium)
- **Montserrat** - Başlık fontu (Regular, Medium)

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: <480px

## 🎮 Kullanım

### Carousel Kontrolleri
- **Ok Tuşları**: Sol/sağ oklara tıklayın
- **Klavye**: ← → tuşlarını kullanın
- **Touch/Swipe**: Mobilde parmakla kaydırın
- **Mouse Drag**: Masaüstünde sürükleyin

### Renk Değiştirme
- Her ürün kartındaki renkli dairelere tıklayın
- Resim otomatik olarak değişir

## 📱 Responsive Özellikler

- **Mobil**: Touch swipe, küçük kartlar
- **Tablet**: Orta boy kartlar, touch desteği
- **Desktop**: Tam özellikli carousel, hover efektleri

## 🔧 Geliştirme

### Proje Yapısı
```
CaseStudy/
├── src/main/java/com/casestudy/
│   ├── ProductApiApplication.java
│   ├── controller/ProductController.java
│   ├── model/Product.java
│   └── service/
│       ├── ProductService.java
│       └── GoldPriceService.java
├── src/main/resources/
│   ├── data/products.json
│   └── application.properties
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── pom.xml
```

### Veritabanı
- **H2 In-Memory Database** (geliştirme için)
- **JPA/Hibernate** ORM
- **Console**: `http://localhost:8080/h2-console`

## 🚀 Deployment

### Backend Deployment
1. **JAR dosyası oluşturun:**
   ```bash
   mvn clean package
   ```

2. **JAR'ı çalıştırın:**
   ```bash
   java -jar target/product-api-1.0.0.jar
   ```

### Frontend Deployment
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Web Server**: Nginx, Apache
- **CDN**: CloudFlare, AWS CloudFront

## 📊 Performans

- **Backend**: Spring Boot optimizasyonları
- **Frontend**: Vanilla JS, minimal dependencies
- **API**: Reactive programming (WebFlux)
- **Caching**: H2 in-memory database


## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**İlhan Uzunoğlu**
- GitHub: [@ilhanuzunoglu](https://github.com/ilhanuzunoglu)
- Repository: [FullStackDevelopmentCaseStudyProductListforRings](https://github.com/ilhanuzunoglu/FullStackDevelopmentCaseStudyProductListforRings)

