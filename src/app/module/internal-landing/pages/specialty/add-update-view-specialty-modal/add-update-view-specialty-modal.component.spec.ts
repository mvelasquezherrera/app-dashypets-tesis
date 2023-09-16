import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateViewSpecialtyModalComponent } from './add-update-view-specialty-modal.component';


describe('AddUpdateViewSpecialtyModalComponent', () => {
  let component: AddUpdateViewSpecialtyModalComponent;
  let fixture: ComponentFixture<AddUpdateViewSpecialtyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewSpecialtyModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewSpecialtyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
