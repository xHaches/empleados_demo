
export interface crud<T> {
  getItems(): T[];
  getById(id: number): T | null;
  add(item: T): void;
  edit({id, item}: {id: number, item: Partial<T>}): T | null;
  remove(id: number): T;
}
