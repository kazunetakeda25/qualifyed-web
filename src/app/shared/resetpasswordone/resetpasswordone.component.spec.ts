import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordoneComponent } from './resetpasswordone.component';

describe('ResetpasswordoneComponent', () => {
  let component: ResetpasswordoneComponent;
  let fixture: ComponentFixture<ResetpasswordoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
