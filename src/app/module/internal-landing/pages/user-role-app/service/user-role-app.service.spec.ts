import { TestBed } from '@angular/core/testing';

import { UserRoleAppService } from './user-role-app.service';

describe('UserRoleAppService', () => {
  let service: UserRoleAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
