import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileheaderComponent } from './profileheader.component';

describe('ProfileheaderComponent', () => {
  let component: ProfileheaderComponent;
  let fixture: ComponentFixture<ProfileheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
