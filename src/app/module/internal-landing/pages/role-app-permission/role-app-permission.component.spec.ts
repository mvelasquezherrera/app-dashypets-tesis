import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAppPermissionComponent } from './role-app-permission.component';

describe('RoleAppPermissionComponent', () => {
  let component: RoleAppPermissionComponent;
  let fixture: ComponentFixture<RoleAppPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAppPermissionComponent]
    });
    fixture = TestBed.createComponent(RoleAppPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
