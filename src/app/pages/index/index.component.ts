import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductsService } from '../../services/shop/shop-products.service';
import { Categories, Products } from '../../models/shop-products.models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public categoiresSelect: Categories[] = [];
  public productsSelect: Products[] = [];

  category: String = '';
  state: String = '';
  product: String = '';
  path: string;

  constructor(private route: ActivatedRoute, private router: Router, private serviceProducts: ShopProductsService) { }

  ngOnInit() {
    this.route.url.subscribe(data => { this.path = data[0].path; });

    if (this.path === 'Index') {
      document.getElementById('li-search').style.display = 'none';
      document.getElementById('li-shop').style.display = 'block';
      document.getElementById('li-shopping-basket').style.display = 'none';
    }
    this.getAllCateogires();
    this.getAllProducts();
  }

  search() {
    this.router.navigate(['/Shop-Mosaic', this.category, this.state, this.product]);
  }

  changeCategories() {
    if (this.category === '' && this.state === '') {
      this.getAllProducts();
    }
    if (this.category === '' && this.state !== '') {
      this.changeEstado();
    }
    if (this.category !== '' && this.state === '') {
      this.serviceProducts.getProductsByCategory(this.category).subscribe((data) => { this.productsSelect = data; });
    }
    if (this.category !== '' && this.state !== '') {
      this.getProductsForCategoryAndState(this.category, this.state);
    }
  }

  changeEstado() {
    if (this.state === '' && this.category === '') {
      this.getAllProducts();
    }
    if (this.state === '' && this.category !== '') {
      this.changeCategories();
    }
    if (this.state !== '' && this.category === '') {
      this.serviceProducts.getProductsByState(this.state).subscribe((data) => { this.productsSelect = data; });
    }
    if (this.state !== '' && this.category !== '') {
      this.getProductsForCategoryAndState(this.category, this.state);
    }
  }

  private getAllCateogires() {
    this.serviceProducts.getAllCategories().subscribe((data) => { this.categoiresSelect = data; });
  }
  private getAllProducts() {
    this.serviceProducts.getAllProducts().subscribe((data) => { this.productsSelect = data; });
  }
  private getProductsForCategoryAndState(categorySelected: String, state: String) {
    this.serviceProducts.getProductsByCategoryAndState(categorySelected, state).subscribe((data) => { this.productsSelect = data; });
  }

}
