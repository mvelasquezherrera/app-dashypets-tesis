import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRazaRangoEdadComponent } from './grafico-raza-rango-edad.component';

describe('GraficoRazaRangoEdadComponent', () => {
  let component: GraficoRazaRangoEdadComponent;
  let fixture: ComponentFixture<GraficoRazaRangoEdadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoRazaRangoEdadComponent]
    });
    fixture = TestBed.createComponent(GraficoRazaRangoEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
