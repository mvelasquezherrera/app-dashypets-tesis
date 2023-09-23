import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPrediccionConfirmadoParvovirusRazaComponent } from './grafico-prediccion-confirmado-parvovirus-raza.component';

describe('GraficoPrediccionConfirmadoParvovirusRazaComponent', () => {
  let component: GraficoPrediccionConfirmadoParvovirusRazaComponent;
  let fixture: ComponentFixture<GraficoPrediccionConfirmadoParvovirusRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoPrediccionConfirmadoParvovirusRazaComponent]
    });
    fixture = TestBed.createComponent(GraficoPrediccionConfirmadoParvovirusRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
