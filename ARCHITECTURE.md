# Proje Mimarisi

## Frontend Klasör Yapısı

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── workflows/
│   │   │   ├── new/             # Workflow builder
│   │   │   ├── [id]/            # Edit workflow
│   │   │   └── page.tsx         # Workflows list
│   │   └── page.tsx             # Dashboard home
│   ├── layout.tsx
│   └── page.tsx                 # Landing page
│
├── components/                   # Reusable UI components
│   ├── workflow/
│   │   ├── ToolbarButton.tsx   # Single responsibility
│   │   ├── WorkflowHeader.tsx  # Header component
│   │   └── WorkflowToolbar.tsx # Toolbar component
│   └── ui/                      # Generic UI components
│
├── lib/                         # Business logic & utilities
│   ├── api/
│   │   └── client.ts           # Centralized API calls
│   ├── workflow/
│   │   └── nodes.ts            # Node factory functions
│   └── types.ts                # TypeScript types
│
└── hooks/                       # Custom React hooks
    └── useWorkflows.ts         # Workflow data fetching
```

## Backend Klasör Yapısı

```
backend/
├── src/
│   ├── routes/                  # API endpoints
│   │   ├── auth.ts             # Auth routes
│   │   └── workflows.ts        # Workflow routes
│   │
│   ├── models/                  # Database models
│   │   ├── user.ts
│   │   ├── workspace.ts
│   │   └── workflow.ts
│   │
│   ├── services/                # Business logic
│   │   ├── workflow-engine/    # Execution engine
│   │   ├── ai-service/         # AI integration
│   │   └── integrations/       # External APIs
│   │
│   ├── utils/                   # Helper functions
│   │   ├── auth.ts             # JWT helpers
│   │   ├── database.ts         # DB connection
│   │   └── redis.ts            # Redis client
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   │
│   └── server.ts                # Main server
│
└── schema.sql                   # Database schema
```

## Mimari Prensipler

### ✅ DOĞRU Yaklaşım:

1. **Single Responsibility:** Her dosya tek bir şey yapar
2. **Modüler:** Küçük, yeniden kullanılabilir parçalar
3. **Separation of Concerns:** UI, logic, data ayrı
4. **DRY (Don't Repeat Yourself):** Kod tekrarı yok

### ❌ YANLIŞ Yaklaşım (Kaçınılacaklar):

1. **2000 satırlık page.tsx dosyaları**
2. **Her component'te API çağrısı**
3. **Inline style'lar her yerde**
4. **Copy-paste kod**
5. **Monolithic provider'lar**

## Örnek: Workflow Builder Refactoring

### Önce (Kötü):
```tsx
// 300+ satırlık page.tsx
export default function WorkflowBuilder() {
  // Tüm logic burada
  // Tüm UI burada
  // Tüm state burada
  // API calls burada
}
```

### Sonra (İyi):
```tsx
// page.tsx - Sadece composition
import { WorkflowHeader } from '@/components/workflow/WorkflowHeader';
import { WorkflowToolbar } from '@/components/workflow/WorkflowToolbar';
import { createHttpNode } from '@/lib/workflow/nodes';

export default function WorkflowBuilder() {
  // Minimal logic, sadece composition
}
```

## Component Boyutları

- **Page components:** Max 100 satır
- **UI components:** Max 50 satır
- **Utility functions:** Max 30 satır
- **API client:** Endpoint başına 5-10 satır

## State Management

- **Local state:** `useState` (component-specific)
- **Server state:** API calls (fetch on demand)
- **Global state:** Context (sadece auth için)
- **Form state:** React Hook Form

## Performans

- **Code splitting:** Automatic (Next.js)
- **Lazy loading:** Dynamic imports
- **Memoization:** `useMemo`, `useCallback` (gerektiğinde)
- **Debouncing:** Search, auto-save

## Sonraki Adımlar

1. ✅ Modüler component yapısı
2. [ ] Custom hooks (useWorkflows, useAuth)
3. [ ] Error boundaries
4. [ ] Loading states
5. [ ] Form validation (Zod)
