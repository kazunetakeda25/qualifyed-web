import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterationComponent } from './user-registeration.component';

describe('UserRegisterationComponent', () => {
  let component: UserRegisterationComponent;
  let fixture: ComponentFixture<UserRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
