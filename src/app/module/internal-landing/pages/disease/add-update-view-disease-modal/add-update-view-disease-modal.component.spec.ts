import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewDiseaseModalComponent } from './add-update-view-disease-modal.component';

describe('AddUpdateViewDiseaseModalComponent', () => {
  let component: AddUpdateViewDiseaseModalComponent;
  let fixture: ComponentFixture<AddUpdateViewDiseaseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewDiseaseModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewDiseaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
