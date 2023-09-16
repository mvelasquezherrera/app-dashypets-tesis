import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewPetClassModalComponent } from './add-update-view-pet-class-modal.component';

describe('AddUpdateViewPetClassModalComponent', () => {
  let component: AddUpdateViewPetClassModalComponent;
  let fixture: ComponentFixture<AddUpdateViewPetClassModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewPetClassModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewPetClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
