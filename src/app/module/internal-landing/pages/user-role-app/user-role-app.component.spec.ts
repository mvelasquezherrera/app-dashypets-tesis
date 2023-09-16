import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleAppComponent } from './user-role-app.component';

describe('UserRoleAppComponent', () => {
  let component: UserRoleAppComponent;
  let fixture: ComponentFixture<UserRoleAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleAppComponent]
    });
    fixture = TestBed.createComponent(UserRoleAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
