import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './module/components/components.module';
import { LayoutModule } from './module/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './module/internal-landing/pages/dashboard/dashboard.component';
import { TopWidgetsComponent } from './module/internal-landing/pages/dashboard/top-widgets/top-widgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraficoRazaRangoEdadComponent } from './module/internal-landing/pages/dashboard/grafico-raza-rango-edad/grafico-raza-rango-edad.component';
import { ChartModule } from 'angular-highcharts';
import { GraficoRazaSexoComponent } from './module/internal-landing/pages/dashboard/grafico-raza-sexo/grafico-raza-sexo.component';
import { GraficoSintomasPositivoParvovirusComponent } from './module/internal-landing/pages/dashboard/grafico-sintomas-positivo-parvovirus/grafico-sintomas-positivo-parvovirus.component';
import { GraficoPrediccionConfirmadoParvovirusRazaComponent } from './module/internal-landing/pages/dashboard/grafico-prediccion-confirmado-parvovirus-raza/grafico-prediccion-confirmado-parvovirus-raza.component';


@NgModule({
  declarations: [AppComponent, DashboardComponent, TopWidgetsComponent, GraficoRazaRangoEdadComponent, GraficoRazaSexoComponent, GraficoSintomasPositivoParvovirusComponent, GraficoPrediccionConfirmadoParvovirusRazaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    ComponentsModule,
    LayoutModule,
    ReactiveFormsModule,
    CommonModule,
    MdbModalModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
