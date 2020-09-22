import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserconnectionComponent } from './view-userconnection.component';

describe('ViewUserconnectionComponent', () => {
  let component: ViewUserconnectionComponent;
  let fixture: ComponentFixture<ViewUserconnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserconnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserconnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
