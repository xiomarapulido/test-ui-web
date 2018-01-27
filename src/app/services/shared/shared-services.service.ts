import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Filters, Products, ProductsShoppingCar } from '../../models/shop-products.models';

@Injectable()
export class SharedServicesService {
  filterExport: Subject<any> = new Subject<any>();
  searchExport: Subject<any> = new Subject<any>();
  searchHide: Subject<any> = new Subject<any>();
  productShoppingCart: Subject<any> = new Subject<any>();
  quantityProducts: Subject<any> = new Subject<any>();
  viewMoreProduct: Subject<any> = new Subject<any>();

  constructor() { }

  getFilterObject() {
    return this.filterExport;
  }

  setFilterObject(filterObject: Filters[]) {
    return this.filterExport.next(filterObject);
  }

  getSearchProduct() {
    return this.searchExport;
  }

  setSearchProduct(filter: String) {
    return this.searchExport.next(filter);
  }

  getSearchHide() {
    return this.searchHide;
  }

  setSearchHide(hide: Boolean) {
    return this.searchHide.next(hide);
  }

  getProductsShoppingCart() {
    return this.productShoppingCart;
  }

  setProductsShoppingCart(products: ProductsShoppingCar[]) {
    return this.productShoppingCart.next(products);
  }

  getquantityProducts() {
    return this.quantityProducts;
  }

  setquantityProducts(quantity: number) {
    return this.quantityProducts.next(quantity);
  }

  getviewMoreProduct() {
    return this.viewMoreProduct;
  }

  setviewMoreProduct(product: Products) {
    return this.viewMoreProduct.next(product);
  }
}
