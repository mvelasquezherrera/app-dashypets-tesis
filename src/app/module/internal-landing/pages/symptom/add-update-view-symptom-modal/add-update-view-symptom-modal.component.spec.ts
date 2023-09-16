import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewSymptomModalComponent } from './add-update-view-symptom-modal.component';

describe('AddUpdateViewSymptomModalComponent', () => {
  let component: AddUpdateViewSymptomModalComponent;
  let fixture: ComponentFixture<AddUpdateViewSymptomModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewSymptomModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewSymptomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
