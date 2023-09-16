import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetClassComponent } from './pet-class.component';

describe('PetClassComponent', () => {
  let component: PetClassComponent;
  let fixture: ComponentFixture<PetClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetClassComponent]
    });
    fixture = TestBed.createComponent(PetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
