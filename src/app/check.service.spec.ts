import { TestBed } from '@angular/core/testing';

import { CheckService } from './check.service';

describe('CheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckService = TestBed.get(CheckService);
    expect(service).toBeTruthy();
  });
});
