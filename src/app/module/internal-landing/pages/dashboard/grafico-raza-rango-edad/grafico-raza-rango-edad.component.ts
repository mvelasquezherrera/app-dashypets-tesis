import { Component, ElementRef, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../service/dashboard.service';
import { DashboardRazaRangoEdadModelResponse } from 'src/app/module/models/dashboard/dashboard-models';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-raza-rango-edad',
  templateUrl: './grafico-raza-rango-edad.component.html',
  styleUrls: ['./grafico-raza-rango-edad.component.css']
})
export class GraficoRazaRangoEdadComponent implements OnInit {

  loading = false;
  listDataRazaRangoEdad: DashboardRazaRangoEdadModelResponse[] = []
  listRazas: string[] = []
  listPrimerRango: number[] = []
  listSegundoRango: number[] = []
  listTercerRango: number[] = []
  listCuartoRango: number[] = []
  listQuintoRango: number[] = []
  
  chart: Chart;
  //chartOptions: Highcharts.Options = {};
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(
    private _toastr: ToastrService,
    private _dashboardService: DashboardService) {
      
  }

  ngOnInit(): void {
      this.getListRazaRangoEdad()
  }

  getListRazaRangoEdad() {
    this.loading = true
    this._dashboardService.getListRazaRangoEdad().subscribe(
      (response) => {
        this.listDataRazaRangoEdad = response;
        this.listRazas = this.listDataRazaRangoEdad.map(objeto => objeto.raza);
        this.listPrimerRango = this.listDataRazaRangoEdad.map(objeto => objeto.primerRango);
        this.listSegundoRango = this.listDataRazaRangoEdad.map(objeto => objeto.segundoRango);
        this.listTercerRango = this.listDataRazaRangoEdad.map(objeto => objeto.tercerRango);
        this.listCuartoRango = this.listDataRazaRangoEdad.map(objeto => objeto.cuartoRango);
        this.listQuintoRango = this.listDataRazaRangoEdad.map(objeto => objeto.quintoRango);
        console.log("listDataRazaRangoEdad: ", response);
        console.log("listRazas: ", this.listRazas);
        this.loading = false
        this.actualizarGrafico()
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Datos Raza por Rango de Edad")
      }
    );
  }

  actualizarGrafico() {
    this.chart = new Chart({
      chart: {
          type: 'column'
      },
      title: {
          text: 'Razas por rango de edad',
          align: 'center'
      },
      xAxis: {
          categories: this.listRazas,
          title: {
            text: 'Razas'
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Cantidad'
          },
          stackLabels: {
              enabled: true
          }
      },
      legend: {
          align: 'left',
          x: 70,
          verticalAlign: 'top',
          y: 70,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [
        {
          type: 'column',
          name: '1-3 meses',
          data: this.listPrimerRango
        },
        {
          type: 'column',
          name: '4-6 meses',
          data: this.listSegundoRango
        },
        {
          type: 'column',
          name: '7-9 meses',
          data: this.listTercerRango
        },
        {
          type: 'column',
          name: '10-13 meses',
          data: this.listCuartoRango
        },
        {
          type: 'column',
          name: '14 meses o más',
          data: this.listQuintoRango
        }
      ],
      credits: {
        enabled: false
      }
    })
  }

}
