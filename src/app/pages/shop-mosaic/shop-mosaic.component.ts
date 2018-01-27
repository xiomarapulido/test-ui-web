import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductsService } from '../../services/shop/shop-products.service';
import { Products, Filters, ProductsShoppingCar } from '../../models/shop-products.models';
import { SharedServicesService } from '../../services/shared/shared-services.service';

@Component({
  selector: 'app-shop-mosaic',
  templateUrl: './shop-mosaic.component.html',
  styleUrls: ['./shop-mosaic.component.css']
})
export class ShopMosaicComponent implements OnInit {
  public products: Products[];
  public productsSave: Products[];
  public filters: Filters[];

  public shoppingCar: ProductsShoppingCar[] = [];

  sort: String = '';

  path: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProducts: ShopProductsService,
    private sharedServices: SharedServicesService) { }

  ngOnInit() {
    let category: String = '';
    let state: String = '';
    let product: String = '';

    this.route.url.subscribe(data => { this.path = data[0].path; });

    this.route.params
      .subscribe(params => { category = params['Category']; state = params['State']; product = params['Product']; });

    if (this.path === 'Shop-Mosaic') {
      document.getElementById('li-search').style.display = 'block';
      document.getElementById('li-shop').style.display = 'none';
      document.getElementById('li-shopping-basket').style.display = 'block';
    }

    this.getProducts(category, state, product);

    this.sharedServices.getSearchHide().subscribe((data: any) => {
      if (data) {
        this.sort = '';
      }
    });

    this.sharedServices.getFilterObject().subscribe((data: Filters[]) => {
      if (data.length > 0) {
        let categoryFil: String = '';
        let bestSeldFil: String = '';
        let availableFil: String = '';
        let priceFil: String = '';

        if (data.filter((categoryFilter) => categoryFilter.type === 'category').length > 0) {
          categoryFil = data.filter((categoryFilter) => categoryFilter.type === 'category')[0].id.toString();
        }
        if (data.filter((price) => price.id === 501).length > 0) {
          switch (data.filter((price) => price.id === 501)[0].name) {
            case 'Mayor de $30.000': {
              priceFil = '1';
              break;
            }
            case 'De $10.000 a $30.000': {
              priceFil = '2';
              break;
            }
            case 'Menor de $10.000': {
              priceFil = '3';
              break;
            }
            default: {
              break;
            }
          }
        }
        if (data.filter((other) => other.id === 1000).length > 0) {
          availableFil = '1';
        }
        if (data.filter((other) => other.id === 1001).length > 0) {
          availableFil = '2';
        }
        if (data.filter((other) => other.id === 1002).length > 0) {
          bestSeldFil = '3';
        }
        this.getProductsFilters(categoryFil, bestSeldFil, availableFil, priceFil);
      }
    });

    this.sharedServices.getSearchProduct().subscribe((data: any) => {
      this.products = this.productsSave.filter((prod: any) => prod.name.toUpperCase().indexOf(data.toUpperCase()) >= 0);
    });
  }

  viewMore(product: Products) {
    this.sharedServices.setviewMoreProduct(product);
  }

  addShoppingCar(product: Products) {
    if (this.shoppingCar.filter((data) => data.id === product.id).length === 0) {
      this.shoppingCar.push({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
      this.sharedServices.setProductsShoppingCart(this.shoppingCar);
      this.sharedServices.setquantityProducts(this.shoppingCar.length);
    }
  }

  changeSortBy() {
    switch (this.sort.toString()) {
      case '': {
        this.products = this.products.sort(function (a, b) {
          return a.id - b.id;
        });
        break;
      }
      case '1': {
        this.products = this.products.sort(function (a, b) {
          const nameA: String = a.name.toLowerCase();
          const nameB: String = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
        break;
      }
      case '2': {
        this.products = this.products.sort(function (a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        break;
      }
      case '3': {
        this.products = this.products.sort(function (a, b) {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  private getProducts(Category: String, State: String, Product: String) {
    if (Product !== '') {
      this.serviceProducts.getProductsByIdProduct(Product).subscribe((data) => { this.products = data; });
    } else {
      let bestSeld: String = '';
      let available: String = '';
      switch (State) {
        case '1': {
          available = '1';
          break;
        }
        case '2': {
          available = '2';
          break;
        }
        case '3': {
          bestSeld = '1';
          break;
        }
        default: {
          break;
        }
      }
      this.getProductsFilters(Category, bestSeld, available, '');
    }
  }

  private getProductsFilters(Category: String, BestSeld: String, available: String, Price: String) {
    // all null
    if (Category === '' && BestSeld === '' && available === '' && Price === '') {
      this.serviceProducts.getAllProducts().subscribe((data) => { this.products = data; this.productsSave = data; });
    }
    // all not null
    if (Category !== '' && BestSeld !== '' && available !== '' && Price !== '') {
      this.serviceProducts.getProductsByPriceSellerAvailableCategory(Price.toString(), available.toString(), Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    // one filter
    if (Category !== '' && BestSeld === '' && available === '' && Price === '') {
      this.serviceProducts.getProductsByCategory(Category)
        .subscribe((productsFiltered) => { this.products = productsFiltered; this.productsSave = productsFiltered; });
    }
    if (Category === '' && BestSeld !== '' && available === '' && Price === '') {
      this.serviceProducts.getProductsByState(BestSeld)
        .subscribe((productsFiltered) => { this.products = productsFiltered; this.productsSave = productsFiltered; });
    }
    if (Category === '' && BestSeld === '' && available !== '' && Price === '') {
      this.serviceProducts.getProductsByState(available)
        .subscribe((productsFiltered) => { this.products = productsFiltered; this.productsSave = productsFiltered; });
    }
    if (Category === '' && BestSeld === '' && available === '' && Price !== '') {
      this.serviceProducts.getProductsByPrice(Price)
        .subscribe((productsFiltered) => { this.products = productsFiltered; this.productsSave = productsFiltered; });
    }

    // two filter
    if (Category !== '' && BestSeld !== '' && available === '' && Price === '') {
      this.serviceProducts.getProductsByCategorySeller(Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }
    if (Category !== '' && BestSeld === '' && available !== '' && Price === '') {
      this.serviceProducts.getProductsByCategoryAvailable(Category.toString(), available.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }
    if (Category !== '' && BestSeld === '' && available === '' && Price !== '') {
      this.serviceProducts.getProductsByPriceCategory(Price.toString(), Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }
    if (Category === '' && BestSeld !== '' && available !== '' && Price === '') {
      this.serviceProducts.getProductsBySellerAvailable(available.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }
    if (Category === '' && BestSeld !== '' && available === '' && Price !== '') {
      this.serviceProducts.getProductsByPriceSeller(Price.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    if (Category === '' && BestSeld === '' && available !== '' && Price !== '') {
      this.serviceProducts.getProductsByPriceAvailable(Price.toString(), available.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    // tree filter
    if (Category !== '' && BestSeld !== '' && available !== '' && Price === '') {
      this.serviceProducts.getProductsBySellerAvailableCategory(available.toString(), Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    if (Category === '' && BestSeld !== '' && available !== '' && Price !== '') {
      this.serviceProducts.getProductsByPriceSellerAvailable(Price.toString(), available.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    if (Category !== '' && BestSeld === '' && available !== '' && Price !== '') {
      this.serviceProducts.getProductsByPriceAvailableCategory(Price.toString(), available.toString(), Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }

    if (Category !== '' && BestSeld !== '' && available === '' && Price !== '') {
      this.serviceProducts.getProductsByPriceSellerCategory(Price.toString(), Category.toString())
        .subscribe((data) => { this.products = data; this.productsSave = data; });
    }
  }
}
