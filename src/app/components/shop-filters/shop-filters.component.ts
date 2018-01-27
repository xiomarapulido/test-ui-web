import { Component, OnInit } from '@angular/core';
import { ShopProductsService } from '../../services/shop/shop-products.service';
import { Categories, Filters } from '../../models/shop-products.models';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesService } from '../../services/shared/shared-services.service';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.css']
})
export class ShopFiltersComponent implements OnInit {
  public categories: Categories[] = [];
  public filters: Filters[] = [];

  categoriesShow: String = 'show';
  price: String = '';
  bestSeller: String = '';
  available: String = '';
  diabled: String = '';

  constructor(
    private sharedServices: SharedServicesService,
    private categoriesService: ShopProductsService,
    private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    let category: String = '';
    let state: String = '';
    let product: String = '';

    this.route.params
      .subscribe(params => { category = params['Category']; state = params['State']; product = params['Product']; });

    this.categoriesService.getAllCategories().subscribe((data: Categories[]) => { this.categories = data; });
    if (category !== '') {
      this.categoriesService.getCategoriesById(category)
        // tslint:disable-next-line:max-line-length
        .subscribe((data: any) => { this.filters.push({ id: data[0].id, name: data[0].name, type: 'category' }); this.categories.splice(this.categories.findIndex(categoryFilter => categoryFilter.id === data[0].id), 1); });
      this.categoriesShow = 'hide';
      this.sharedServices.setFilterObject(this.filters);
    }

    if (state !== '') {
      switch (state) {
        case '1': {
          this.available = 'Disponible';
          this.diabled = 'Agotados';
          this.filters.push({ id: 1000, name: 'Disponible', type: 'other' });
          break;
        }
        case '2': {
          this.diabled = 'Agotados';
          this.available = 'Disponible';
          this.filters.push({ id: 1001, name: 'Agotados', type: 'other' });
          break;
        }
        case '3': {
          this.bestSeller = 'Mas Vendidos';
          this.filters.push({ id: 1002, name: 'Mas Vendidos', type: 'other' });
          break;
        }
        default: {
          this.bestSeller = '';
          this.available = '';
          this.diabled = '';
          break;
        }
      }
    }
  }

  addCategoryFilter(category: Categories) {
    this.filters.push({ id: category.id, name: category.name, type: 'category' });
    this.categories.splice(this.categories.findIndex(categoryFilter => categoryFilter.id === category.id), 1);
    this.categoriesShow = 'hide';
    this.sharedServices.setFilterObject(this.filters);

    this.sharedServices.setSearchHide(true);
  }


  addPriceFilter(price: string) {
    this.filters.push({ id: 501, name: price, type: 'price' });
    this.price = 'filtrado';
    this.sharedServices.setFilterObject(this.filters);

    this.sharedServices.setSearchHide(true);
  }

  addOtherFilter(other: string) {
    switch (other) {
      case '1000': {
        this.available = 'Disponible';
        this.diabled = 'Agotados';
        this.filters.push({ id: 1000, name: 'Disponible', type: 'other' });
        break;
      }
      case '1001': {
        this.diabled = 'Agotados';
        this.available = 'Disponible';
        this.filters.push({ id: 1001, name: 'Agotados', type: 'other' });
        break;
      }
      case '1002': {
        this.bestSeller = 'Mas Vendidos';
        this.filters.push({ id: 1002, name: 'Mas Vendidos', type: 'other' });
        break;
      }
      default: {
        break;
      }
    }

    this.sharedServices.setFilterObject(this.filters);

    this.sharedServices.setSearchHide(true);
  }

  removeFilter(filter: Filters) {
    if (filter.type === 'category') {
      this.categories.push({ id: filter.id, name: filter.name });
      this.filters.splice(this.filters.findIndex(categoryFilter => categoryFilter.id === filter.id), 1);
      this.categoriesShow = 'show';

      this.sharedServices.setFilterObject(this.filters);
    }
    if (filter.type === 'price') {
      this.filters.splice(this.filters.findIndex(priceFilter => priceFilter.id === 501), 1);
      this.price = '';

      this.sharedServices.setFilterObject(this.filters);
    }
    if (filter.type === 'other') {
      switch (filter.id.toString()) {
        case '1000': {
          this.available = '';
          this.diabled = '';
          this.filters.splice(this.filters.findIndex(priceFilter => priceFilter.id === 1000), 1);
          break;
        }
        case '1001': {
          this.diabled = '';
          this.available = '';
          this.filters.splice(this.filters.findIndex(priceFilter => priceFilter.id === 1001), 1);
          break;
        }
        case '1002': {
          this.bestSeller = '';
          this.filters.splice(this.filters.findIndex(otherFilter => otherFilter.id === 1002), 1);
          break;
        }
        default: {
          break;
        }
      }
      this.sharedServices.setFilterObject(this.filters);
    }
    if (this.filters.length === 0) {
      const filtersNull: Filters[] = [];
      filtersNull.push({ id: 0, name: '', type: '' });
      this.sharedServices.setFilterObject(filtersNull);
    }

    this.sharedServices.setSearchHide(true);
  }


}
