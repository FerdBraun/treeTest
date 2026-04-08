export interface TreeNode {
  id: string | number;
  parent: string | number | null;
  label?: string;
  [key: string]: any;
}
