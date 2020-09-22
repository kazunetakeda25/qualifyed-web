import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessRegisterationComponent } from './bussiness-registeration.component';

describe('BussinessRegisterationComponent', () => {
  let component: BussinessRegisterationComponent;
  let fixture: ComponentFixture<BussinessRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
