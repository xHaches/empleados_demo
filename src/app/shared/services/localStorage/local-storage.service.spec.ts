import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    service.clear()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setItem, getItem: item and getting it will return an item of the same type', () => {
    const user = {name: 'Luis', age: 24}
    service.setItem('user', user);
    expect(service.getItem('user')).toEqual(user);
  });

  it('getItem: does not exist will return an empty object', () => {
    expect(service.getItem('user')).toEqual({});
  });

  it('setItems: set a bunch of elements and get an element should return it', () => {
    const data = {
      user: {name: 'Luis', age: 24},
      res: {price: 12, amount: 2},
      item: {data: 'TWGVT'},
      cond: true,
      example: 'data'
    }
    service.setItems(data);
    expect(service.getItem('user')).toEqual(data.user);
  });

  it('clear: clearing localStorage and getting an item returns an empty object', () => {
    service.clear();
    expect(service.getItem('user')).toEqual({});
  });
});
