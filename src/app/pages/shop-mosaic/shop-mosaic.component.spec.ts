import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMosaicComponent } from './shop-mosaic.component';

describe('ShopMosaicComponent', () => {
  let component: ShopMosaicComponent;
  let fixture: ComponentFixture<ShopMosaicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMosaicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMosaicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
