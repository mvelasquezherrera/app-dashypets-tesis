import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewAppPermissionModalComponent } from './add-update-view-app-permission-modal.component';

describe('AddUpdateViewAppPermissionModalComponent', () => {
  let component: AddUpdateViewAppPermissionModalComponent;
  let fixture: ComponentFixture<AddUpdateViewAppPermissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewAppPermissionModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewAppPermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
