import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarShoppingComponent } from './car-shopping.component';

describe('CarShoppingComponent', () => {
  let component: CarShoppingComponent;
  let fixture: ComponentFixture<CarShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
