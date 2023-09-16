import { TestBed } from '@angular/core/testing';

import { PetClassService } from './pet-class.service';

describe('PetClassService', () => {
  let service: PetClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
