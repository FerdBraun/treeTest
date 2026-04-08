import { describe, it, expect, beforeEach } from 'vitest';
import { TreeStore } from '../src/store/TreeStore';
import { TreeNode } from '../src/types/TreeNode';

describe('TreeStore', () => {
  const items: TreeNode[] = [
    { id: 1, parent: null, label: 'Айтем 1' },
    { id: '91064cee', parent: 1, label: 'Айтем 2' },
    { id: 3, parent: 1, label: 'Айтем 3' },
    { id: 4, parent: '91064cee', label: 'Айтем 4' },
    { id: 5, parent: '91064cee', label: 'Айтем 5' },
    { id: 6, parent: '91064cee', label: 'Айтем 6' },
    { id: 7, parent: 4, label: 'Айтем 7' },
    { id: 8, parent: 4, label: 'Айтем 8' }
  ];

  let store: TreeStore;

  beforeEach(() => {
    store = new TreeStore(items);
  });

  it('getAll should return all items', () => {
    expect(store.getAll()).toHaveLength(items.length);
  });

  it('getItem should return correct item by id', () => {
    expect(store.getItem(1)).toEqual(items[0]);
    expect(store.getItem('91064cee')).toEqual(items[1]);
    expect(store.getItem(999)).toBeUndefined();
  });

  it('getChildren should return direct children', () => {
    expect(store.getChildren(1)).toHaveLength(2);
    expect(store.getChildren(1)).toContainEqual(items[1]);
    expect(store.getChildren(1)).toContainEqual(items[2]);
    expect(store.getChildren(4)).toHaveLength(2);
    expect(store.getChildren(8)).toHaveLength(0);
  });

  it('getAllChildren should return all descendants', () => {
    const childrenOf1 = store.getAllChildren(1);
    expect(childrenOf1).toHaveLength(7); // All except 1 itself
    
    const childrenOf91064cee = store.getAllChildren('91064cee');
    expect(childrenOf91064cee).toHaveLength(5); // 4, 5, 6, 7, 8
    expect(childrenOf91064cee.map(i => i.id)).toEqual(expect.arrayContaining([4, 5, 6, 7, 8]));
  });

  it('getAllParents should return path to root', () => {
    const parentsOf7 = store.getAllParents(7);
    expect(parentsOf7).toHaveLength(4);
    expect(parentsOf7[0].id).toBe(7);
    expect(parentsOf7[1].id).toBe(4);
    expect(parentsOf7[2].id).toBe('91064cee');
    expect(parentsOf7[3].id).toBe(1);
  });

  it('addItem should add new item', () => {
    const newItem = { id: 9, parent: 8, label: 'Айтем 9' };
    store.addItem(newItem);
    expect(store.getItem(9)).toEqual(newItem);
    expect(store.getChildren(8)).toContainEqual(newItem);
  });

  it('removeItem should remove item and its children', () => {
    store.removeItem(4);
    expect(store.getItem(4)).toBeUndefined();
    expect(store.getItem(7)).toBeUndefined();
    expect(store.getItem(8)).toBeUndefined();
    expect(store.getChildren('91064cee')).not.toContainEqual(expect.objectContaining({ id: 4 }));
    expect(store.getAll()).toHaveLength(5); // 1, 91064cee, 3, 5, 6
  });

  it('updateItem should update item data', () => {
    const updated = { id: 3, parent: 1, label: 'Updated Айтем 3' };
    store.updateItem(updated);
    expect(store.getItem(3)).toEqual(updated);
  });

  it('updateItem should update parent correctly', () => {
    const updated = { id: 3, parent: 4, label: 'Moved Айтем 3' };
    store.updateItem(updated);
    expect(store.getItem(3)).toEqual(updated);
    expect(store.getChildren(1)).not.toContainEqual(expect.objectContaining({ id: 3 }));
    expect(store.getChildren(4)).toContainEqual(expect.objectContaining({ id: 3 }));
  });

  it('getAll should not allow external mutation', () => {
    const all = store.getAll();
    all.push({ id: 999, parent: null });

    expect(store.getItem(999)).toBeUndefined();
  });

  it('getAllChildren should not mutate internal state', () => {
    const first = store.getAllChildren(1);
    const second = store.getAllChildren(1);

    expect(first).not.toBe(second); // because it builds a new array
    expect(first).toEqual(second);
  });

  it('getChildren should not allow external mutation', () => {
    const children = store.getChildren(1);
    children.push({ id: 888, parent: 1 });

    expect(store.getChildren(1)).not.toContainEqual(expect.objectContaining({ id: 888 }));
  });
});
