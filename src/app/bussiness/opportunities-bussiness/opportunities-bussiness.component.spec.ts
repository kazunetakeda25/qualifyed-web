import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesBussinessComponent } from './opportunities-bussiness.component';

describe('OpportunitiesBussinessComponent', () => {
  let component: OpportunitiesBussinessComponent;
  let fixture: ComponentFixture<OpportunitiesBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitiesBussinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiesBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
