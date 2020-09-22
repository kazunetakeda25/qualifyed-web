import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserconnectionrequestComponent } from './view-userconnectionrequest.component';

describe('ViewUserconnectionrequestComponent', () => {
  let component: ViewUserconnectionrequestComponent;
  let fixture: ComponentFixture<ViewUserconnectionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserconnectionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserconnectionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
