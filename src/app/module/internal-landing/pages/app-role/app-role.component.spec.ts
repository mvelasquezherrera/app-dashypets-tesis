import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleComponent } from './app-role.component';

describe('AppRoleComponent', () => {
  let component: AppRoleComponent;
  let fixture: ComponentFixture<AppRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppRoleComponent]
    });
    fixture = TestBed.createComponent(AppRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
