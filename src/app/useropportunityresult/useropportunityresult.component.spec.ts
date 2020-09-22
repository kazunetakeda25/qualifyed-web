import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseropportunityresultComponent } from './useropportunityresult.component';

describe('UseropportunityresultComponent', () => {
  let component: UseropportunityresultComponent;
  let fixture: ComponentFixture<UseropportunityresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseropportunityresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseropportunityresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
