import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessSettingComponent } from './bussiness-setting.component';

describe('BussinessSettingComponent', () => {
  let component: BussinessSettingComponent;
  let fixture: ComponentFixture<BussinessSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
