import { Component, ElementRef, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../service/dashboard.service';
import { DashboardRazaRangoEdadModelResponse, DashboardRazaSexoModelResponse, DataChartPieDashboard, DataChartPieDrilldownDashboard } from 'src/app/module/models/dashboard/dashboard-models';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafico-raza-sexo',
  templateUrl: './grafico-raza-sexo.component.html',
  styleUrls: ['./grafico-raza-sexo.component.css']
})
export class GraficoRazaSexoComponent implements OnInit {

  loading = false;
  listDataRazaSexo: DashboardRazaSexoModelResponse[] = []
  listRazas: string[] = []
  listMacho: number[] = []
  listHembra: number[] = []
  
  
  chart: Chart;

  constructor(
    private _toastr: ToastrService,
    private _dashboardService: DashboardService) {
      
  }

  ngOnInit(): void {
      this.getListRazaSexo()
  }

  getListRazaSexo() {
    this.loading = true
    this._dashboardService.getListRazaSexo().subscribe(
      (response) => {
        this.listDataRazaSexo = response;
        this.listRazas = this.listDataRazaSexo.map(objeto => objeto.raza);
        this.listMacho = this.listDataRazaSexo.map(objeto => objeto.macho);
        this.listHembra = this.listDataRazaSexo.map(objeto => objeto.hembra);
        this.loading = false
        this.actualizarGrafico()
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Datos Raza por Sexo")
      }
    );
  }

  calcularCantidadRazaGrafico(index: number) {
    return this.listMacho[index] + this.listHembra[index]
  }

  calcularPorcentajeRazaGrafico(cantidadRaza: number) {
    return (cantidadRaza/this.listRazas.length) * 100
  }

  calcularPorcentajeRazaSexoGrafico(cantidadSexo: number, cantidadRaza: number) {
    return (cantidadSexo/this.listRazas.length) * 100
  }

  createDataGrafico(colors: any[]) {
    var array: DataChartPieDashboard[] = []
    for (var i = 0; i < this.listRazas.length; i++) {
      const drilldown = new DataChartPieDrilldownDashboard(this.listRazas[i], ['Macho','Hembra'],[
        this.calcularPorcentajeRazaSexoGrafico(this.listMacho[i], this.calcularCantidadRazaGrafico(i)),
        this.calcularPorcentajeRazaSexoGrafico(this.listHembra[i], this.calcularCantidadRazaGrafico(i)),
      ])
      const data = new DataChartPieDashboard(this.calcularPorcentajeRazaGrafico(this.calcularCantidadRazaGrafico(i)),colors[i],drilldown)
      array.push(data)
    }
    return array
  }

  actualizarGrafico() {

    var colors = [
      "#FFDDC1", // Melocotón suave
      "#A0E7E5", // Verde agua suave
      "#C9AECB", // Lavanda suave
      "#F0C7AB", // Beige suave
      "#B4CCB9", // Verde menta suave
      "#F4E1DB", // Rosa claro
      "#D0E1F9", // Azul cielo suave
      "#E7C8E7", // Lila suave
      "#E0D2E3", // Gris azulado suave
      "#F6EFE3"  // Amarillo pálido
    ],
      categories = this.listRazas,
      data = this.createDataGrafico(colors),
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


  // Build the data arrays
  for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
          name: categories[i],
          y: data[i].y,
          color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
          brightness = 0.2 - (j / drillDataLen) / 5;
          versionsData.push({
              name: data[i].drilldown.categories[j],
              y: data[i].drilldown.data[j],
              color: Highcharts.color(data[i].color).brighten(brightness).get()
          });
      }
  }

    this.chart = new Chart({
        chart: {
          type: 'pie'
      },
      title: {
          text: 'Cantidad de género por raza',
          align: 'left'
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      tooltip: {
          valueSuffix: '%'
      },
      series: [{
          type: 'pie',
          name: 'Browsers',
          data: browserData,
          size: '60%',
          dataLabels: {
              color: '#ffffff',
              distance: -30
          }
      }, {
          type: 'pie',
          name: 'Versions',
          data: versionsData,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
              format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
              filter: {
                  property: 'y',
                  operator: '>',
                  value: 1
              },
              style: {
                  fontWeight: 'normal'
              }
          },
          id: 'versions'
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 400
              },
              chartOptions: {
                  series: [{
                    type: 'pie'
                  }, {
                      type: 'pie',
                      id: 'versions',
                      dataLabels: {
                          enabled: false
                      }
                  }]
              }
          }]
      },
      credits: {
        enabled: false
      }
    })
  }

}
