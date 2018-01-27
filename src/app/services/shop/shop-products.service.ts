import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../models/shop-products.models';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShopProductsService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.categories);
  }

  getCategoriesById(id: String): Observable<any> {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.categories.filter((category) => category.id.toString() === id));
  }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products);
  }

  getProductsByIdProduct(productSelected: String): Observable<any> {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products.filter((product) => product.id.toString() === productSelected));
  }

  getProductsByCategory(categorySelected: String): Observable<any> {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products.filter((products: any) => products.categories.toString().indexOf(categorySelected) >= 0));
  }

  getProductsByCategoryAndState(categorySelected: String, state: String) {
    if (state.toString() === '1') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products.filter((product) => product.available === true).filter((product: any) => product.categories.toString().indexOf(categorySelected) >= 0));
    }
    if (state.toString() === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products.filter((product) => product.available === false).filter((product: any) => product.categories.toString().indexOf(categorySelected) >= 0));
    }
    if (state.toString() === '3') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products.filter((product) => product.bestSeller === true).filter((product: any) => product.categories.toString().indexOf(categorySelected) >= 0));
    }
  }

  getProductsByCategorySeller(category: string) {
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products
        .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
        .filter((bestSeldFil) => bestSeldFil.bestSeller === true));
  }

  getProductsByCategoryAvailable(category: string, available: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }

    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products
        .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
        .filter((availableFil) => availableFil.available === (available === 'true')));

  }

  getProductsByState(state: String): Observable<any> {
    if (state.toString() === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products.filter((product) => product.available === true));
    }
    if (state.toString() === '2') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products.filter((product) => product.available === false));
    }
    if (state.toString() === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products.filter((product) => product.bestSeller === true));
    }
  }

  getProductsByPrice(rank: String): Observable<any> {
    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products.filter((product) => parseFloat(product.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products.filter((product) => parseFloat(product.price) <= 30000).filter((product) => parseFloat(product.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products.filter((product) => parseFloat(product.price) < 10000));
    }
  }

  getProductsByPriceCategory(rank: string, category: string) {
    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceAvailable(rank: string, available: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }

    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceSeller(rank: string) {
    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceAvailableCategory(rank: string, available: string, category: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }

    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceSellerCategory(rank: string, category: string) {
    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceSellerAvailable(rank: string, available: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }

    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsByPriceSellerAvailableCategory(rank: string, available: string, category: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }

    if (rank === '1') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) > 30000));
    }
    if (rank === '2') {
      return this.http.get(environment.productsEnvoriment)
        // tslint:disable-next-line:max-line-length
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) <= 30000)
          .filter((priceFil) => parseFloat(priceFil.price) >= 10000));
    }
    if (rank === '3') {
      return this.http.get(environment.productsEnvoriment)
        .map((data: any) => data.products
          .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
          .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
          .filter((availableFil) => availableFil.available === (available === 'true'))
          .filter((priceFil) => parseFloat(priceFil.price) < 10000));
    }
  }

  getProductsBySellerAvailableCategory(available: string, category: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products
        .filter((categoriesFilter) => categoriesFilter.categories.toString().indexOf(category.toString()) >= 0)
        .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
        .filter((availableFil) => availableFil.available === (available === 'true')));
  }

  getProductsBySellerAvailable(available: string) {
    if (available === '1') {
      available = 'true';
    } else {
      available = 'false';
    }
    return this.http.get(environment.productsEnvoriment)
      .map((data: any) => data.products
        .filter((bestSeldFil) => bestSeldFil.bestSeller === true)
        .filter((availableFil) => availableFil.available === (available === 'true')));
  }
}
