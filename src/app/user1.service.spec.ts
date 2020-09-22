import { TestBed } from '@angular/core/testing';

import { User1Service } from './user1.service';

describe('User1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User1Service = TestBed.get(User1Service);
    expect(service).toBeTruthy();
  });
});
