import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewPetTypeModalComponent } from './add-update-view-pet-type-modal.component';

describe('AddUpdateViewPetTypeModalComponent', () => {
  let component: AddUpdateViewPetTypeModalComponent;
  let fixture: ComponentFixture<AddUpdateViewPetTypeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewPetTypeModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewPetTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
