import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordtwoComponent } from './resetpasswordtwo.component';

describe('ResetpasswordtwoComponent', () => {
  let component: ResetpasswordtwoComponent;
  let fixture: ComponentFixture<ResetpasswordtwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordtwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordtwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
