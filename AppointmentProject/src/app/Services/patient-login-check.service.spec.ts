import { TestBed } from '@angular/core/testing';

import { PatientLoginCheckService } from './patient-login-check.service';

describe('PatientLoginCheckService', () => {
  let service: PatientLoginCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientLoginCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
