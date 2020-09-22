import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBussinessprofileComponent } from './edit-bussinessprofile.component';

describe('EditBussinessprofileComponent', () => {
  let component: EditBussinessprofileComponent;
  let fixture: ComponentFixture<EditBussinessprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBussinessprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBussinessprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
