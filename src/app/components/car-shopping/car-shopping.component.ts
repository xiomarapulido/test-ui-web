import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../../services/shared/shared-services.service';
import { Products, ProductsShoppingCar } from '../../models/shop-products.models';

@Component({
  selector: 'app-car-shopping',
  templateUrl: './car-shopping.component.html',
  styleUrls: ['./car-shopping.component.css']
})
export class CarShoppingComponent implements OnInit {
  public products: ProductsShoppingCar[] = [];
  public total: number;
  constructor(private sharedServices: SharedServicesService) {

  }

  ngOnInit() {
    this.sharedServices.getProductsShoppingCart()
      .subscribe((data: any) => {
        this.products = data;
        this.total = 0;
        data.forEach((sum) => { this.total += (parseFloat(sum.price) * sum.quantity); });
      });
  }

  sumQuantity(product: ProductsShoppingCar) {
    product.quantity += 1;
    this.total +=  parseFloat(product.price);
  }

  subtractQuantity(product: ProductsShoppingCar) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      this.products.splice(this.products.findIndex(productsShoppinCar => productsShoppinCar.id === product.id), 1);
      this.sharedServices.setquantityProducts(this.products.length);
    }
    this.total -=  parseFloat(product.price);
  }
}
