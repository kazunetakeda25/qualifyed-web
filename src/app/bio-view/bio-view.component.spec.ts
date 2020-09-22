import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioViewComponent } from './bio-view.component';

describe('BioViewComponent', () => {
  let component: BioViewComponent;
  let fixture: ComponentFixture<BioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
