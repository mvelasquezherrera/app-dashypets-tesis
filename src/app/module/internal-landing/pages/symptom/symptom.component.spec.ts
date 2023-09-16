import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomComponent } from './symptom.component';

describe('SymptomComponent', () => {
  let component: SymptomComponent;
  let fixture: ComponentFixture<SymptomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SymptomComponent]
    });
    fixture = TestBed.createComponent(SymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
