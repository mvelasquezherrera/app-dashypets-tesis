import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateViewUserRoleAppModalComponent } from './add-update-view-user-role-app-modal.component';


describe('AddUpdateViewUserRoleAppModalComponent', () => {
  let component: AddUpdateViewUserRoleAppModalComponent;
  let fixture: ComponentFixture<AddUpdateViewUserRoleAppModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateViewUserRoleAppModalComponent]
    });
    fixture = TestBed.createComponent(AddUpdateViewUserRoleAppModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
