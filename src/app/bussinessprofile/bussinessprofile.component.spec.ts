import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessprofileComponent } from './bussinessprofile.component';

describe('BussinessprofileComponent', () => {
  let component: BussinessprofileComponent;
  let fixture: ComponentFixture<BussinessprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
