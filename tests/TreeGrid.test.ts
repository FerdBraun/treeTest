import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeGrid from '../src/components/TreeGrid.vue';
import { TreeNode } from '../src/types/TreeNode';

describe('TreeGrid.vue', () => {
  const initialItems: TreeNode[] = [
    { id: 1, parent: null, label: 'Root' },
    { id: 2, parent: 1, label: 'Child' }
  ];

  it('renders grid container', () => {
    const wrapper = mount(TreeGrid, {
      props: { initialItems }
    });
    expect(wrapper.find('.tree-container').exists()).toBe(true);
    expect(wrapper.find('.ag-theme-alpine').exists()).toBe(true);
  });

  it('renders action buttons', () => {
    const wrapper = mount(TreeGrid, {
      props: { initialItems }
    });
    const buttons = wrapper.findAll('button');
    expect(buttons.some(b => b.text().includes('Добавить'))).toBe(true);
    expect(buttons.some(b => b.text().includes('Изменить'))).toBe(true);
    expect(buttons.some(b => b.text().includes('Удалить'))).toBe(true);
  });

  it('initializes TreeStore with props', () => {
    const wrapper = mount(TreeGrid, {
      props: { initialItems }
    });
    // @ts-ignore - accessing internal ref for testing
    const store = wrapper.vm.store;
    expect(store.getAll()).toHaveLength(2);
    expect(store.getItem(1)).toBeDefined();
  });
});
