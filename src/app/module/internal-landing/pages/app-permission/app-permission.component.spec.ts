import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPermissionComponent } from './app-permission.component';

describe('AppPermissionComponent', () => {
  let component: AppPermissionComponent;
  let fixture: ComponentFixture<AppPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPermissionComponent]
    });
    fixture = TestBed.createComponent(AppPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
