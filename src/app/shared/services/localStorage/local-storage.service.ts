import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Stores an item in localStorage
   *  @param {string}  key - key of localStorage Item.
   *  @param {T}  value - value of localStorage Item.
  */
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Returns an item from localStorage, if the item does not exist returns an empty object
   *  @param {string}  key - key of localStorage Item.
  */
  getItem<T>(key: string): T | {} {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  /**
   * Stores a bunch of items given an object
   *  @param obj
  */
  setItems(obj: {[key: string]: any}) {
    for (const [key, value] of Object.entries(obj)) {
      this.setItem(key, value);
    }
  }

  clear() {
    localStorage.clear();
  }
}
