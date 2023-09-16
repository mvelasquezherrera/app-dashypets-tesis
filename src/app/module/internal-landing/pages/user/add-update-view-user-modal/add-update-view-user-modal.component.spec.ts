import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewUserModalComponent } from './add-update-view-user-modal.component';

describe('AddUpdateViewUserModalComponent', () => {
  let component: AddUpdateViewUserModalComponent;
  let fixture: ComponentFixture<AddUpdateViewUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewUserModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
