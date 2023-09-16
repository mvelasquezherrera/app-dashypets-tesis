import { TestBed } from '@angular/core/testing';

import { RoleAppPermissionService } from './role-app-permission.service';

describe('RoleAppPermissionService', () => {
  let service: RoleAppPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAppPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
