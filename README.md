# Workflow Automation Platform

KOBİ'ler için Türkçe iş akışı otomasyon platformu.

## 🚀 Kurulum

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📦 Gereksinimler

- Node.js 18+
- PostgreSQL 14+
- Redis

## 🔧 Ortam Değişkenleri

Backend `.env`:
```
DATABASE_URL=postgresql://localhost:5432/workflow_automation
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-key
```

Frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📝 Özellikler

- ✅ Kullanıcı kaydı ve girişi
- ✅ JWT authentication
- ✅ PostgreSQL + Redis
- 🚧 Workflow builder (geliştiriliyor)
- 🚧 AI asistan (geliştiriliyor)
- 🚧 Türk entegrasyonları (geliştiriliyor)

## 🎯 Sonraki Adımlar

1. Workflow builder UI (React Flow)
2. Webhook trigger sistemi
3. HTTP Request action
4. AI asistan entegrasyonu
5. e-Fatura, Paraşüt entegrasyonları
