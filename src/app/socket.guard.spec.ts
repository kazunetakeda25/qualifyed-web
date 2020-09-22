import { TestBed, async, inject } from '@angular/core/testing';

import { SocketGuard } from './socket.guard';

describe('SocketGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketGuard]
    });
  });

  it('should ...', inject([SocketGuard], (guard: SocketGuard) => {
    expect(guard).toBeTruthy();
  }));
});
