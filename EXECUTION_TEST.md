# Workflow Execution Engine - Test Guide

## Test Senaryosu

### 1. Workflow Oluştur ve Kaydet

1. http://localhost:3000 → Login
2. Dashboard → Workflows → "+ Yeni Workflow"
3. Node'ları ekle:
   - 🎯 Webhook Trigger (otomatik var)
   - 🌐 HTTP Request (toolbar'dan ekle)
   - 📧 Send Email (toolbar'dan ekle)
4. Node'ları bağla (trigger → http → email)
5. "Save Workflow" butonuna tıkla
6. Workspace ID gir (kayıt sonrası console'da görünür)

### 2. Webhook ile Tetikle

```bash
# Workflow ID'yi al (kayıt sonrası dönen ID)
WORKFLOW_ID="your-workflow-id-here"

# Webhook'u tetikle
curl -X POST http://localhost:3001/api/v1/webhooks/webhook/$WORKFLOW_ID \
  -H "Content-Type: application/json" \
  -d '{
    "test": "data",
    "user": "test@example.com"
  }'
```

**Beklenen Response:**
```json
{
  "message": "Workflow execution started",
  "workflow_id": "..."
}
```

### 3. Execution History Kontrol

```bash
# Execution'ları listele
curl http://localhost:3001/api/v1/webhooks/$WORKFLOW_ID/executions

# Tek execution detayı
curl http://localhost:3001/api/v1/webhooks/executions/$EXECUTION_ID
```

## Workflow Engine Özellikleri

### ✅ Desteklenen Actions

**1. HTTP Request**
```typescript
{
  action_type: 'http_request',
  config: {
    url: 'https://api.example.com/endpoint',
    method: 'POST', // GET, POST, PUT, DELETE
    headers: {
      'Authorization': 'Bearer token'
    },
    body: {
      data: 'value'
    }
  }
}
```

**2. Email**
```typescript
{
  action_type: 'email',
  config: {
    to: 'user@example.com',
    subject: 'Test Email',
    body: 'Email content'
  }
}
```

**3. Condition**
```typescript
{
  action_type: 'condition',
  config: {
    condition: 'data.status === "active"'
  }
}
```

## Execution Flow

1. **Webhook Trigger** → Workflow execution başlatılır
2. **Create Execution** → Database'de execution kaydı oluşturulur
3. **Execute Nodes** → Her node sırayla çalıştırılır
4. **Log Results** → Her node'un sonucu loglanır
5. **Update Status** → Success/Failed olarak güncellenir

## Execution Log Formatı

```json
{
  "id": "execution-id",
  "workflow_id": "workflow-id",
  "status": "success",
  "trigger_data": {
    "test": "data"
  },
  "execution_log": [
    {
      "timestamp": "2026-01-15T23:00:00Z",
      "node_id": "http-123",
      "status": "success",
      "message": "Node executed successfully",
      "data": {
        "status": 200,
        "data": {...}
      }
    }
  ],
  "started_at": "2026-01-15T23:00:00Z",
  "completed_at": "2026-01-15T23:00:02Z"
}
```

## Hata Yönetimi

- **Timeout:** 30 saniye (HTTP requests)
- **Retry:** Şu anda yok (gelecekte eklenecek)
- **Error Logging:** Tüm hatalar execution_log'a kaydedilir
- **Status:** Failed olarak işaretlenir

## Sonraki Adımlar

- [ ] Bull Queue ile async execution
- [ ] Retry mechanism
- [ ] Email provider integration (SendGrid/Resend)
- [ ] Condition evaluation engine
- [ ] Workflow templates
- [ ] Real-time execution monitoring
