import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileviewComponent } from './user-profileview.component';

describe('UserProfileviewComponent', () => {
  let component: UserProfileviewComponent;
  let fixture: ComponentFixture<UserProfileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
