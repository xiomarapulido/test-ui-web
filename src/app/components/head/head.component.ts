import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesService } from '../../services/shared/shared-services.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeadComponent implements OnInit {
  number: Number = 0;
  filter: String;

  constructor(private route: ActivatedRoute, private router: Router, private sharedServices: SharedServicesService) { }

  ngOnInit() {
    this.sharedServices.getquantityProducts().subscribe((data: any) => { this.number = data; });
    this.sharedServices.getSearchHide().subscribe((data: any) => {
      if (data) {
        this.filter = '';
      }
    });
  }

  enterShop() {
    this.router.navigate(['/Shop-Mosaic', '', '', '']);
  }

  keyUpSearchProduct() {
    this.sharedServices.setSearchProduct(this.filter);
  }
}

