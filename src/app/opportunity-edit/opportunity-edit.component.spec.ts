import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityEditComponent } from './opportunity-edit.component';

describe('OpportunityEditComponent', () => {
  let component: OpportunityEditComponent;
  let fixture: ComponentFixture<OpportunityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
