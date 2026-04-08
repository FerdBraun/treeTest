// src/data/mockItems.ts
import type { TreeNode } from "../types/TreeNode";

export const mockItems: TreeNode[] = [
  // ============ КОРНЕВЫЕ ЭЛЕМЕНТЫ ============
  { id: 1, parent: null, label: '🏢 Корень 1', type: 'root', createdAt: '2024-01-01' },
  { id: 'root-2', parent: null, label: '🏢 Корень 2', type: 'root', createdAt: '2024-01-02' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', parent: null, label: '🏢 Корень 3 (UUID)', type: 'root' },

  // ============ ВЕТКА 1: Глубокая вложенность (id: 1) ============
  // Уровень 1
  { id: 2, parent: 1, label: '📁 Документы', type: 'folder', size: null },
  { id: 3, parent: 1, label: '📁 Изображения', type: 'folder', size: null },
  { id: 4, parent: 1, label: '📁 Проекты', type: 'folder', size: null },

  // Уровень 2 (внутри Документы)
  { id: 5, parent: 2, label: '📄 Отчет Q1.pdf', type: 'file', size: 2450000 },
  { id: 6, parent: 2, label: '📄 Отчет Q2.pdf', type: 'file', size: 3100000 },
  { id: 7, parent: 2, label: '📁 Архив', type: 'folder', size: null },

  // Уровень 3 (внутри Архив)
  { id: 8, parent: 7, label: '📄 2022.zip', type: 'file', size: 150000000 },
  { id: 9, parent: 7, label: '📄 2023.zip', type: 'file', size: 180000000 },

  // Уровень 2 (внутри Изображения)
  { id: 10, parent: 3, label: '🖼️ wallpaper.jpg', type: 'file', size: 5200000 },
  { id: 11, parent: 3, label: '🖼️ logo.png', type: 'file', size: 450000 },
  { id: 12, parent: 3, label: '📁 Отпуск 2024', type: 'folder', size: null },

  // Уровень 3 (внутри Отпуск 2024)
  { id: 13, parent: 12, label: '🖼️ beach.jpg', type: 'file', size: 8300000 },
  { id: 14, parent: 12, label: '🖼️ mountain.jpg', type: 'file', size: 7200000 },
  { id: 15, parent: 12, label: '📁 RAW', type: 'folder', size: null },

  // Уровень 4 (внутри RAW)
  { id: 16, parent: 15, label: '🖼️ DSC_0001.NEF', type: 'file', size: 25000000 },
  { id: 17, parent: 15, label: '🖼️ DSC_0002.NEF', type: 'file', size: 25000000 },

  // Уровень 2 (внутри Проекты)
  { id: 18, parent: 4, label: '📁 Project Alpha', type: 'folder', size: null },
  { id: 19, parent: 4, label: '📁 Project Beta', type: 'folder', size: null },

  // Уровень 3 (Project Alpha)
  { id: 20, parent: 18, label: '📄 README.md', type: 'file', size: 12000 },
  { id: 21, parent: 18, label: '📁 src', type: 'folder', size: null },
  { id: 22, parent: 18, label: '📁 tests', type: 'folder', size: null },

  // Уровень 4 (src)
  { id: 23, parent: 21, label: '📄 index.ts', type: 'file', size: 3400 },
  { id: 24, parent: 21, label: '📄 App.vue', type: 'file', size: 8900 },
  { id: 25, parent: 21, label: '📁 components', type: 'folder', size: null },

  // Уровень 5 (components)
  { id: 26, parent: 25, label: '📄 TreeView.vue', type: 'file', size: 15600 },
  { id: 27, parent: 25, label: '📄 TreeNode.vue', type: 'file', size: 8700 },

  // ============ ВЕТКА 2: Смешанные ID (root-2) ============
  { id: 'a1b2c3', parent: 'root-2', label: '👤 Пользователи', type: 'folder' },
  { id: 'd4e5f6', parent: 'root-2', label: '⚙️ Настройки', type: 'folder' },

  { id: 'user-1', parent: 'a1b2c3', label: 'Иван Петров', type: 'user', email: 'ivan@example.com', active: true },
  { id: 'user-2', parent: 'a1b2c3', label: 'Мария Сидорова', type: 'user', email: 'maria@example.com', active: true },
  { id: 'user-3', parent: 'a1b2c3', label: 'Алексей Иванов', type: 'user', email: 'alex@example.com', active: false },

  { id: 'settings-general', parent: 'd4e5f6', label: 'Основные', type: 'settings' },
  { id: 'settings-security', parent: 'd4e5f6', label: 'Безопасность', type: 'settings' },
  { id: 'settings-notifications', parent: 'd4e5f6', label: 'Уведомления', type: 'settings' },

  // ============ ВЕТКА 3: UUID (3fa85f64...) ============
  { id: '550e8400-e29b-41d4-a716-446655440000', parent: '3fa85f64-5717-4562-b3fc-2c963f66afa6', label: '🌐 API Endpoints', type: 'api' },
  { id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', parent: '3fa85f64-5717-4562-b3fc-2c963f66afa6', label: '🗄️ База данных', type: 'db' },

  { id: 'endpoint-1', parent: '550e8400-e29b-41d4-a716-446655440000', label: 'GET /api/users', method: 'GET' },
  { id: 'endpoint-2', parent: '550e8400-e29b-41d4-a716-446655440000', label: 'POST /api/users', method: 'POST' },
  { id: 'endpoint-3', parent: '550e8400-e29b-41d4-a716-446655440000', label: 'DELETE /api/users/:id', method: 'DELETE' },

  { id: 'table-1', parent: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', label: 'users', type: 'table', rows: 1250 },
  { id: 'table-2', parent: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', label: 'products', type: 'table', rows: 890 },
  { id: 'table-3', parent: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', label: 'orders', type: 'table', rows: 3420 },

  // ============ ДОПОЛНИТЕЛЬНЫЕ ЭЛЕМЕНТЫ ДЛЯ ТЕСТИРОВАНИЯ getChildren/getAllChildren ============
  { id: 100, parent: 1, label: '📁 Временные файлы', type: 'folder' },
  { id: 101, parent: 100, label: 'temp_001.tmp', type: 'temp' },
  { id: 102, parent: 100, label: 'temp_002.tmp', type: 'temp' },
  { id: 103, parent: 100, label: 'cache', type: 'folder' },
  { id: 104, parent: 103, label: 'cache_001.bin', type: 'cache' },
  { id: 105, parent: 103, label: 'cache_002.bin', type: 'cache' },
  { id: 106, parent: 103, label: 'cache_003.bin', type: 'cache' },

  // Элементы без детей (листья)
  { id: 'leaf-1', parent: 'root-2', label: '📄 notes.txt', type: 'file' },
  { id: 'leaf-2', parent: 'root-2', label: '📄 todo.md', type: 'file' },

  // Элемент с большим количеством прямых детей (для теста производительности)
  { id: 'bulk-parent', parent: 1, label: '📁 Массовая загрузка', type: 'folder' },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `bulk-${i + 1}`,
    parent: 'bulk-parent',
    label: `Файл ${i + 1}.dat`,
    type: 'bulk',
    index: i
  }))
];
