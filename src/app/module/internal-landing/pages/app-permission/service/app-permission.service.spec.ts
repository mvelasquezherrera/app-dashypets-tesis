import { TestBed } from '@angular/core/testing';

import { AppPermissionService } from './app-permission.service';

describe('AppPermissionService', () => {
  let service: AppPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
