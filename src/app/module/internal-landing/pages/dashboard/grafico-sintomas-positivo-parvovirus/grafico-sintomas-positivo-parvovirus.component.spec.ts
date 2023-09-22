import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSintomasPositivoParvovirusComponent } from './grafico-sintomas-positivo-parvovirus.component';

describe('GraficoSintomasPositivoParvovirusComponent', () => {
  let component: GraficoSintomasPositivoParvovirusComponent;
  let fixture: ComponentFixture<GraficoSintomasPositivoParvovirusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoSintomasPositivoParvovirusComponent]
    });
    fixture = TestBed.createComponent(GraficoSintomasPositivoParvovirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
