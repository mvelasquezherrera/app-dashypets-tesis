import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRazaSexoComponent } from './grafico-raza-sexo.component';

describe('GraficoRazaSexoComponent', () => {
  let component: GraficoRazaSexoComponent;
  let fixture: ComponentFixture<GraficoRazaSexoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoRazaSexoComponent]
    });
    fixture = TestBed.createComponent(GraficoRazaSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
