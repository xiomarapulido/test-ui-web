import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../../services/shared/shared-services.service';
import { Products } from '../../models/shop-products.models';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {
  public product: Products;
  constructor(private sharedServices: SharedServicesService) { }

  ngOnInit() {
    this.sharedServices.getviewMoreProduct()
    .subscribe((data: any) => { this.product = data; document.getElementById('div-click-modal').click(); });
  }

}
