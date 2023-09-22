import { Component, ElementRef, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../service/dashboard.service';
import { DashboardSintomasPositivoParvovirusModelResponse, DataChartTreemapDashboard } from 'src/app/module/models/dashboard/dashboard-models';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsColor from 'highcharts/modules/coloraxis';
HighchartsTreemap(Highcharts);
HighchartsColor(Highcharts);

@Component({
  selector: 'app-grafico-sintomas-positivo-parvovirus',
  templateUrl: './grafico-sintomas-positivo-parvovirus.component.html',
  styleUrls: ['./grafico-sintomas-positivo-parvovirus.component.css']
})
export class GraficoSintomasPositivoParvovirusComponent implements OnInit {

  loading = false;
  listSintomasPositivoParvovirus: DashboardSintomasPositivoParvovirusModelResponse[] = []
  listRazas: string[] = []
  listPrimerRango: number[] = []

  chart: Chart;

  constructor(
    private _toastr: ToastrService,
    private _dashboardService: DashboardService) {
      
  }

  ngOnInit(): void {
      this.getListSintomasPositivoParvovirus()
  }

  getListSintomasPositivoParvovirus() {
    this.loading = true
    this._dashboardService.getListSintomasPositivoParvovirus().subscribe(
      (response) => {
        this.listSintomasPositivoParvovirus = response;
        console.log("array no sort: ", this.listSintomasPositivoParvovirus);
        this.listSintomasPositivoParvovirus.sort((a, b) => b.cantidadSintoma - a.cantidadSintoma);
        console.log("array sort: ", this.listSintomasPositivoParvovirus);
        this.loading = false
        this.actualizarGrafico()
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Datos Síntomas en Casos Positivos de Parvovirus")
      }
    );
  }

  setDataChart() {
    var array: DataChartTreemapDashboard[] = []
    
    for (var i = 0; i < this.listSintomasPositivoParvovirus.length; i++) {
      const name = this.listSintomasPositivoParvovirus[i].sintoma
      const cantidad = this.listSintomasPositivoParvovirus[i].cantidadSintoma
      const data = new DataChartTreemapDashboard(name,cantidad,cantidad)
      array.push(data)
    }
    
    return array

  }

  calcularCantidadMaximaSintoma() {
    const valorMaximo = this.listSintomasPositivoParvovirus.reduce((maximo, objeto) => {
      return Math.max(maximo, objeto.cantidadSintoma);
    }, -Infinity);
    return valorMaximo
  }

  actualizarGrafico() {
    const colors = Highcharts.getOptions().colors;
    if (colors && colors.length > 0) {
      this.chart = new Chart({
          chart: {
            type: 'treemap'
        },
        colorAxis: {
            min: 1, // Valor mínimo en tu rango de colores
            max: this.calcularCantidadMaximaSintoma(), // Valor máximo en tu rango de colores
            minColor: '#FFFFFF',
            maxColor: colors[0]
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            clip: false,
            data: this.setDataChart(),
            keys: ['name', 'value', 'colorValue'], // Define las claves para cada campo en tus datos
            states: {
                hover: {
                    borderColor: 'black' // Color del borde al hacer hover
                }
            }
        }],
        title: {
            text: 'Cantidad de síntomas para casos positivos de parvovirus'
        },
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
