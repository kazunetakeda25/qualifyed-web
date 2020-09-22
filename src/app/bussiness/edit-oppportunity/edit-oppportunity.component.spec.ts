import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOppportunityComponent } from './edit-oppportunity.component';

describe('EditOppportunityComponent', () => {
  let component: EditOppportunityComponent;
  let fixture: ComponentFixture<EditOppportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOppportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOppportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
