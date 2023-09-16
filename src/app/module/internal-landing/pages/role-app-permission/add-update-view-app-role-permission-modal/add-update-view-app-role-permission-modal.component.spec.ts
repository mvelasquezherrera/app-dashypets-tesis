import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateViewAppRoleModalComponent } from './add-update-view-app-role-permission-modal.component';

describe('AddUpdateViewAppRoleModalComponent', () => {
  let component: AddUpdateViewAppRoleModalComponent;
  let fixture: ComponentFixture<AddUpdateViewAppRoleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewAppRoleModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewAppRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
