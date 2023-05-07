import { TestBed } from '@angular/core/testing';

import { SubmitGuard } from './submit.guard';

describe('SubmitGuard', () => {
  let guard: SubmitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubmitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
