import { TestBed, inject } from '@angular/core/testing';

import { ShopProductsService } from './shop-products.service';

describe('ShopProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopProductsService]
    });
  });

  it('should be created', inject([ShopProductsService], (service: ShopProductsService) => {
    expect(service).toBeTruthy();
  }));
});
