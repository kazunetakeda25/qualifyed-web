import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConnectionrequestComponent } from './view-connectionrequest.component';

describe('ViewConnectionrequestComponent', () => {
  let component: ViewConnectionrequestComponent;
  let fixture: ComponentFixture<ViewConnectionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConnectionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConnectionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
