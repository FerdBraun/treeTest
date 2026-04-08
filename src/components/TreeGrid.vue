<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

import {
  ModuleRegistry,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type GetDataPath,
} from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { TreeStore } from '../store/TreeStore';
import type { TreeNode } from '../types/TreeNode';

// регистрация модулей
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

const props = defineProps<{
  initialItems: TreeNode[];
}>();

const store = ref(new TreeStore(props.initialItems));
const gridApi = ref<GridApi | null>(null);

const rowData = ref<TreeNode[]>([]);

const updateRowData = () => {
  rowData.value = store.value.getAll();
};

onMounted(() => {
  updateRowData();
});

/**
 * ВАЖНО:
 * путь должен быть от корня → к элементу
 * getAllParents ДОЛЖЕН включать сам элемент
 */
const getDataPath: GetDataPath = (data: TreeNode) => {
  return store.value
    .getAllParents(data.id)
    .map(p => String(p.id))
    .reverse();
};

const columnDefs = ref<ColDef[]>([
  {
  headerName: '№ п/п',
  valueGetter: params =>
    params.node?.rowIndex != null
      ? params.node.rowIndex + 1
      : null,
  width: 80,
  pinned: 'left',
  sortable: false,
  menuTabs: [], // ✅ вместо suppressMenu
  cellStyle: { textAlign: 'center', fontWeight: 'bold' },
},
  {
    headerName: 'Наименование',
    field: 'label',
    flex: 1,
  },
]);

/**
 * БЕЗ HTML-СТРОК!
 */
const autoGroupColumnDef = ref<ColDef>({
  headerName: 'Категория',
  minWidth: 220,
  cellRendererParams: {
    suppressCount: true,
    innerRenderer: (params: any) => {
      if (!params.data) return '';

      const hasChildren =
        store.value.getChildren(params.data.id).length > 0;

      return hasChildren ? 'Группа' : 'Элемент';
    },
  },
});

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api;
  params.api.expandAll();
};

/**
 * Обновление грида — без костылей
 */
const refreshGrid = async () => {
  updateRowData();
  await nextTick();
  gridApi.value?.expandAll();
};

/**
 * CRUD
 */
const onAddItem = async () => {
  const label = prompt('Имя элемента:');
  if (!label) return;

  const selected = gridApi.value?.getSelectedRows()[0];

  store.value.addItem({
    id: crypto.randomUUID(),
    parent: selected?.id ?? null,
    label,
  });

  await refreshGrid();
};

const onRemoveItem = async () => {
  const selected = gridApi.value?.getSelectedRows()[0];
  if (!selected) {
    alert('Выберите элемент');
    return;
  }

  if (confirm(`Удалить "${selected.label}"?`)) {
    store.value.removeItem(selected.id);
    await refreshGrid();
  }
};

const onUpdateItem = async () => {
  const selected = gridApi.value?.getSelectedRows()[0];
  if (!selected) {
    alert('Выберите элемент');
    return;
  }

  const label = prompt('Новое имя:', selected.label);
  if (!label) return;

  store.value.updateItem({
    ...selected,
    label,
  });

  await refreshGrid();
};
</script>

<template>
  <div class="tree-container">
    <div class="header">
      <div>Режим: просмотр</div>

      <div class="actions">
        <button @click="onAddItem">Добавить</button>
        <button @click="onUpdateItem">Изменить</button>
        <button @click="onRemoveItem">Удалить</button>
      </div>
    </div>

    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px; width: 100%;"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :treeData="true"
      :getDataPath="getDataPath"
      :autoGroupColumnDef="autoGroupColumnDef"
      :groupDefaultExpanded="-1"
      rowSelection="single"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<style scoped>
.tree-container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}
</style>