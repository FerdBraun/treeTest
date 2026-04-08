import type { TreeNode } from "../types/TreeNode";

export class TreeStore {
  private itemsMap = new Map<string | number, TreeNode>();
  private childrenMap = new Map<string | number | null, TreeNode[]>();
  private items: TreeNode[] = [];

  constructor(items: TreeNode[]) {
    this.init(items);
  }

  private init(items: TreeNode[]) {
    this.items = [...items];
    this.itemsMap.clear();
    this.childrenMap.clear();

    for (const item of items) {
      this.itemsMap.set(item.id, item);

      let siblings = this.childrenMap.get(item.parent);
      if (!siblings) {
        siblings = [];
        this.childrenMap.set(item.parent, siblings);
      }
      siblings.push(item);
    }
  }

  /** O(1) */
  getAll(): TreeNode[] {
    return this.items.slice();
  }

  /** O(1) */
  getItem(id: string | number): TreeNode | undefined {
    return this.itemsMap.get(id);
  }

  /** O(1) */
  getChildren(id: string | number | null): TreeNode[] {
    return this.childrenMap.get(id)?.slice() ?? [];
  }

  /** O(N descendants) */
  getAllChildren(id: string | number): TreeNode[] {
    const result: TreeNode[] = [];
    const queue = [...(this.childrenMap.get(id) ?? [])];

    if (queue.length === 0) return result;

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      result.push(node);

      const children = this.childrenMap.get(node.id);
      if (children) {
        queue.push(...children);
      }
    }

    return result;
  }

  /**
   * ВАЖНО: включает сам элемент
   * Порядок: снизу вверх
   * O(depth)
   */
  getAllParents(id: string | number): TreeNode[] {
    const result: TreeNode[] = [];
    let current = this.itemsMap.get(id);

    const visited = new Set<string | number>();

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      result.push(current);

      if (current.parent == null) break;
      current = this.itemsMap.get(current.parent);
    }

    return result;
  }

  /** O(1) */
  addItem(item: TreeNode): void {
    if (this.itemsMap.has(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }

    this.itemsMap.set(item.id, item);
    this.items.push(item);

    let siblings = this.childrenMap.get(item.parent);
    if (!siblings) {
      siblings = [];
      this.childrenMap.set(item.parent, siblings);
    }
    siblings.push(item);
  }

  /**
   * O(N subtree)
   */
  removeItem(id: string | number): void {
    const item = this.itemsMap.get(id);
    if (!item) return;

    const toRemove = [item, ...this.getAllChildren(id)];

    // удалить из родителя
    const siblings = this.childrenMap.get(item.parent);
    if (siblings) {
      const idx = siblings.findIndex(i => i.id === id);
      if (idx !== -1) siblings.splice(idx, 1);
    }

    const removeIds = new Set(toRemove.map(i => i.id));

    // чистим maps
    for (const node of toRemove) {
      this.itemsMap.delete(node.id);
      this.childrenMap.delete(node.id);
    }

    // чистим исходный массив (один проход)
    this.items = this.items.filter(i => !removeIds.has(i.id));
  }

  /**
   * O(1) / O(siblings)
   */
  updateItem(updated: TreeNode): void {
    const existing = this.itemsMap.get(updated.id);
    if (!existing) {
      throw new Error(`Item ${updated.id} not found`);
    }

    // если сменился родитель
    if (existing.parent !== updated.parent) {
      const oldSiblings = this.childrenMap.get(existing.parent);
      if (oldSiblings) {
        const idx = oldSiblings.findIndex(i => i.id === updated.id);
        if (idx !== -1) oldSiblings.splice(idx, 1);
      }

      let newSiblings = this.childrenMap.get(updated.parent);
      if (!newSiblings) {
        newSiblings = [];
        this.childrenMap.set(updated.parent, newSiblings);
      }
      newSiblings.push(updated);
    } else {
      const siblings = this.childrenMap.get(updated.parent);
      if (siblings) {
        const idx = siblings.findIndex(i => i.id === updated.id);
        if (idx !== -1) siblings[idx] = updated;
      }
    }

    // обновляем itemsMap
    this.itemsMap.set(updated.id, updated);

    // обновляем в исходном массиве (O(N), но один раз)
    const idx = this.items.findIndex(i => i.id === updated.id);
    if (idx !== -1) {
      this.items[idx] = updated;
    }
  }
}