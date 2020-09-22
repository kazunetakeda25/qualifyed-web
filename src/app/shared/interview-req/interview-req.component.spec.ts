import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewReqComponent } from './interview-req.component';

describe('InterviewReqComponent', () => {
  let component: InterviewReqComponent;
  let fixture: ComponentFixture<InterviewReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
