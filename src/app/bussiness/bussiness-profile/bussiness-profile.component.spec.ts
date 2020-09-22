import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessProfileComponent } from './bussiness-profile.component';

describe('BussinessProfileComponent', () => {
  let component: BussinessProfileComponent;
  let fixture: ComponentFixture<BussinessProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
