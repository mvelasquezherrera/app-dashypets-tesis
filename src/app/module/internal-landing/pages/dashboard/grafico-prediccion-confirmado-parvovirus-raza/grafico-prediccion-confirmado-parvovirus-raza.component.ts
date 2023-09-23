import { Component, ElementRef, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../service/dashboard.service';
import { DashboardPredecidoConfirmadoParvovirusRazaModelResponse, DataChartColumnDashboard } from 'src/app/module/models/dashboard/dashboard-models';
import { Chart } from 'angular-highcharts';
import { SeriesOptionsType } from 'highcharts';
import * as Highcharts from 'highcharts';
import HighchartsColor from 'highcharts/modules/coloraxis';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsColor(Highcharts);
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-grafico-prediccion-confirmado-parvovirus-raza',
  templateUrl: './grafico-prediccion-confirmado-parvovirus-raza.component.html',
  styleUrls: ['./grafico-prediccion-confirmado-parvovirus-raza.component.css']
})

export class GraficoPrediccionConfirmadoParvovirusRazaComponent implements OnInit {

  loading = false;
  listPrediccionConfirmadoParvovirusRaza: DashboardPredecidoConfirmadoParvovirusRazaModelResponse[] = []
  listRazas: string[] = []
  listPredPositiva: number[] = []
  listPredNegativa: number[] = []
  listConfirmacionPositiva: number[] = []
  listConfirmacionNegativa: number[] = []
  resultadoData: { [anio: string]: Array<[string, number]> } = {};
  resultadoDataPrev: { [anio: string]: Array<[string, number]> } = {};
  mapeoAnios: { [anioA: string]: string } = {};

  chart: Chart;

  constructor(
    private _toastr: ToastrService,
    private _dashboardService: DashboardService) {
      
  }

  ngOnInit(): void {
      this.getListPrediccionPositivoParvovirusRaza()
  }

  getListPrediccionPositivoParvovirusRaza() {
    this.loading = true
    this._dashboardService.getListPrediccionPositivoParvovirusRaza().subscribe(
      (response) => {
        this.listPrediccionConfirmadoParvovirusRaza = response;
        this.listRazas = this.listPrediccionConfirmadoParvovirusRaza.map(objeto => objeto.raza);
        this.listPredPositiva = this.listPrediccionConfirmadoParvovirusRaza.map(objeto => objeto.cantidadPrediccionPositivoParvovirus);
        this.listPredNegativa = this.listPrediccionConfirmadoParvovirusRaza.map(objeto => objeto.cantidadPrediccionNegativoParvovirus);
        this.listConfirmacionPositiva = this.listPrediccionConfirmadoParvovirusRaza.map(objeto => objeto.cantidadConfirmadoPositivoParvovirus);
        this.listConfirmacionNegativa = this.listPrediccionConfirmadoParvovirusRaza.map(objeto => objeto.cantidadConfirmadoNegativoParvovirus);
        this.loading = false
        this.actualizarGrafico()
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Datos de Casos Predecidos y Confirmados de Parvovirus por Predicción por Raza")
      }
    );
  }

  convertToSeriesOptions(data: DataChartColumnDashboard[]): SeriesOptionsType[] {
    return data.map((item) => ({
      type: 'column',
      name: item.name,
      data: item.data,
      stack: item.stack,
    }));
  }

  setDataChart() {
    const colors = Highcharts.getOptions().colors;
    var array: DataChartColumnDashboard[] = []
    if (colors && colors.length > 0) {
      const dataPredPositiva = new DataChartColumnDashboard('column','Predicción Positiva',this.listPredPositiva,'Predicción')
      const dataPredNegativa = new DataChartColumnDashboard('column','Predicción Negativa',this.listPredNegativa,'Predicción')
      const dataConfirmadoPositiva = new DataChartColumnDashboard('column','Confirmación Positiva',this.listConfirmacionPositiva,'Confirmación')
      const dataConfirmadoNegativa = new DataChartColumnDashboard('column','Confirmación Negativa',this.listConfirmacionNegativa,'Confirmación')
      array.push(dataPredPositiva)
      array.push(dataPredNegativa)
      array.push(dataConfirmadoPositiva)
      array.push(dataConfirmadoNegativa)
    } else {
      // Maneja el caso en el que 'colors' está indefinido o vacío
      console.error('No se encontraron colores.');
    }
    return this.convertToSeriesOptions(array)
  }

  actualizarGrafico() {
    const colors = Highcharts.getOptions().colors;
    if (colors && colors.length > 0) {
      this.chart = new Chart({
        chart: {
          type: 'column'
      },
  
      title: {
          text: 'Cantidad de casos predecidos y confirmados de Parvovirus',
          align: 'center'
      },
  
      xAxis: {
          categories: this.listRazas
      },
  
      yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
              text: 'Count medals'
          }
      },
  
      tooltip: {
          format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
              'Total: {point.stackTotal}'
      },
  
      plotOptions: {
          column: {
              stacking: 'normal'
          }
      },
  
      series: this.setDataChart(),
        credits: {
            enabled: false
        }
      })
    } else {
      // Maneja el caso en el que 'colors' está indefinido o vacío
      console.error('No se encontraron colores.');
    }
    
  }

}
