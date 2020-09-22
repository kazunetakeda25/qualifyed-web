import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileviewComponent } from './profileview.component';

describe('ProfileviewComponent', () => {
  let component: ProfileviewComponent;
  let fixture: ComponentFixture<ProfileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
