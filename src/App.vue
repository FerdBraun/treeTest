<script setup lang="ts">
import TreeGrid from './components/TreeGrid.vue';
import { mockItems } from './data/mockData';
</script>

<template>
  <div class="app-wrapper">
    <TreeGrid :initialItems="mockItems" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

.app-wrapper {
  padding: 60px 0;
  min-height: 100vh;
}
</style>
