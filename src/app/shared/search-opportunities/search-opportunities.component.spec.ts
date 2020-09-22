import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOpportunitiesComponent } from './search-opportunities.component';

describe('SearchOpportunitiesComponent', () => {
  let component: SearchOpportunitiesComponent;
  let fixture: ComponentFixture<SearchOpportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
