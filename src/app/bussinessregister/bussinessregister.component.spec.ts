import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessregisterComponent } from './bussinessregister.component';

describe('BussinessregisterComponent', () => {
  let component: BussinessregisterComponent;
  let fixture: ComponentFixture<BussinessregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
