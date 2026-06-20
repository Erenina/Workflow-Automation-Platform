# 🔧 Workflow Builder - Kullanım Kılavuzu

## Test ve Save Butonları Nasıl Çalışır?

### ✅ Test Butonu

**Ne Yapar:**
- Workflow'daki node sayısını kontrol eder
- Node ve connection bilgilerini gösterir
- Console'a detaylı bilgi yazar

**Nasıl Kullanılır:**
1. En az 1 action node ekleyin (HTTP, Email, veya Condition)
2. "Test" butonuna tıklayın
3. Alert'te özet bilgiyi görün
4. Console'da (F12) detaylı bilgiyi inceleyin

### ✅ Save Butonu

**Ne Yapar:**
- Workspace ID'yi otomatik bulur
- Workflow adı sorar
- Backend'e kaydeder
- Webhook URL'ini gösterir

**Nasıl Kullanılır:**
1. Node'ları ekleyin ve bağlayın
2. "Save Workflow" butonuna tıklayın
3. Workflow adını girin
4. Webhook URL'ini kopyalayın

**Örnek Webhook URL:**
```
POST http://localhost:3001/api/v1/webhooks/webhook/WORKFLOW_ID
```

## Workspace ID Nereden Geliyor?

**Otomatik Bulma Sırası:**
1. ✅ LocalStorage'dan (`workspace_id` key)
2. ✅ Kayıt sırasında kaydedilir
3. ✅ Mevcut workflow'lardan alınır

**Manuel Kontrol:**
```javascript
// Browser console'da
localStorage.getItem('workspace_id')
```

## Sorun Giderme

### "Workspace ID bulunamadı" Hatası

**Çözüm 1:** Yeniden kayıt olun
```
1. Çıkış yapın
2. Yeni hesap oluşturun
3. Workspace ID otomatik kaydedilecek
```

**Çözüm 2:** Manuel olarak ayarlayın
```javascript
// Browser console'da
localStorage.setItem('workspace_id', 'YOUR_WORKSPACE_ID')
```

### "Lütfen en az bir action node ekleyin" Hatası

**Çözüm:**
- Toolbar'dan en az 1 node ekleyin:
  - 🌐 HTTP Request
  - 📧 Send Email
  - 🔀 Condition

### Save Sonrası Webhook Test

```bash
# Webhook URL'i kopyalayın (save sonrası alert'te gösterilir)
curl -X POST http://localhost:3001/api/v1/webhooks/webhook/WORKFLOW_ID \
  -H "Content-Type: application/json" \
  -d '{
    "test": "data",
    "message": "Hello from webhook!"
  }'
```

**Beklenen Response:**
```json
{
  "message": "Workflow execution started",
  "workflow_id": "..."
}
```

## Workflow Builder Özellikleri

### Node Türleri

**1. Trigger (Otomatik)**
- 🎯 Webhook Trigger
- Her workflow'da otomatik var

**2. Actions (Toolbar'dan Ekle)**
- 🌐 HTTP Request
- 📧 Send Email
- 🔀 Condition

### Node Bağlama

1. Bir node'un kenarından sürükle
2. Diğer node'a bırak
3. Bağlantı oluşturuldu!

### Workflow Kaydetme

1. Node'ları ekle ve bağla
2. "Save Workflow" → Ad gir
3. Webhook URL'i al
4. Test et!

## Örnek Workflow

```
🎯 Webhook Trigger
    ↓
🌐 HTTP Request (API'ye istek at)
    ↓
📧 Send Email (Sonucu email ile gönder)
```

**Nasıl Oluşturulur:**
1. Toolbar → "HTTP Request" ekle
2. Toolbar → "Send Email" ekle
3. Trigger → HTTP → Email bağla
4. Save!
