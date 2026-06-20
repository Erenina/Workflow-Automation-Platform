# 🚀 Uygulamayı Çalıştırma Rehberi

## Gerekli Servisler

### 1. PostgreSQL (Database)
```bash
brew services start postgresql@14
```

### 2. Redis (Cache/Queue)
```bash
brew services start redis
```

## Uygulamayı Başlatma

### Terminal 1 - Backend (Port 3001)
```bash
cd "/Users/eren/Desktop/Eren Projeler/Proje 2/workflow-automation-platform/backend"
npm run dev
```

**Beklenen çıktı:**
```
🚀 Server running on http://localhost:3001
📊 Health check: http://localhost:3001/health
```

### Terminal 2 - Frontend (Port 3000)
```bash
cd "/Users/eren/Desktop/Eren Projeler/Proje 2/workflow-automation-platform/frontend"
npm run dev
```

**Beklenen çıktı:**
```
▲ Next.js 16.1.2 (Turbopack)
- Local: http://localhost:3000
✓ Ready in 1588ms
```

## Uygulamayı Kullanma

### 1. Kayıt Ol
1. Tarayıcıda aç: http://localhost:3000
2. "Kayıt Ol" butonuna tıkla
3. Bilgilerini gir:
   - İsim (opsiyonel)
   - E-posta
   - Şifre (min 6 karakter)
4. "Kayıt Ol" butonuna tıkla

### 2. Giriş Yap
1. E-posta ve şifrenle giriş yap
2. Dashboard'a yönlendirileceksin

### 3. Workflow Oluştur
1. Dashboard → "Workflows" menüsü
2. "+ Yeni Workflow" butonu
3. Node'ları sürükle-bırak ile ekle:
   - 🌐 HTTP Request
   - 📧 Send Email
   - 🔀 Condition

## Sorun Giderme

### Backend çalışmıyor
```bash
# Port 3001'i kontrol et
lsof -ti:3001

# Eğer başka bir process varsa, kapat
kill -9 $(lsof -ti:3001)

# Backend'i yeniden başlat
cd backend && npm run dev
```

### Frontend çalışmıyor
```bash
# Port 3000'i kontrol et
lsof -ti:3000

# Eğer başka bir process varsa, kapat
kill -9 $(lsof -ti:3000)

# Frontend'i yeniden başlat
cd frontend && npm run dev
```

### Database bağlantı hatası
```bash
# PostgreSQL çalışıyor mu kontrol et
brew services list | grep postgresql

# Çalışmıyorsa başlat
brew services start postgresql@14

# Database var mı kontrol et
psql -l | grep workflow_automation

# Yoksa oluştur
createdb workflow_automation
psql workflow_automation < backend/schema.sql
```

### "Cannot find module" hatası
```bash
# Dependencies'leri yeniden kur
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Hızlı Başlatma (Her Seferinde)

```bash
# Terminal 1
cd "/Users/eren/Desktop/Eren Projeler/Proje 2/workflow-automation-platform/backend" && npm run dev

# Terminal 2 (yeni terminal)
cd "/Users/eren/Desktop/Eren Projeler/Proje 2/workflow-automation-platform/frontend" && npm run dev
```

**Sonra tarayıcıda:** http://localhost:3000

## Durdurmak İçin

Her iki terminalde de `Ctrl + C` tuşlarına bas.
