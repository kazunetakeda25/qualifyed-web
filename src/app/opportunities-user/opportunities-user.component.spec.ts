import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesUserComponent } from './opportunities-user.component';

describe('OpportunitiesUserComponent', () => {
  let component: OpportunitiesUserComponent;
  let fixture: ComponentFixture<OpportunitiesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitiesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
