import { TestBed } from '@angular/core/testing';

import { MaintainanceService } from './maintainance.service';

describe('MaintainanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintainanceService = TestBed.get(MaintainanceService);
    expect(service).toBeTruthy();
  });
});
