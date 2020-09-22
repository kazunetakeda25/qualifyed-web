import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessheaderComponent } from './bussinessheader.component';

describe('BussinessheaderComponent', () => {
  let component: BussinessheaderComponent;
  let fixture: ComponentFixture<BussinessheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
