import { Component, OnInit } from '@angular/core';
import { faDog,
  faUsers,
  faClipboardQuestion,
  faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../service/dashboard.service';
import { DashboardPanelModelResponse } from 'src/app/module/models/dashboard/dashboard-models';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent implements OnInit {

  loading = false;
  listDataPanelDashboard: DashboardPanelModelResponse[] = []

  faDog = faDog;
  faUsers = faUsers;
  faClipboardQuestion = faClipboardQuestion;
  faClipboardCheck = faClipboardCheck;

  constructor(
    private _toastr: ToastrService,
    private _dashboardService: DashboardService) {

  }

  ngOnInit(): void {
      this.getListDataPanelDashboard()
  }

  getListDataPanelDashboard() {
    this.loading = true
    this._dashboardService.getListDataPanelDashboard().subscribe(
      (response) => {
        this.listDataPanelDashboard = response;
        console.log("listDataPanelDashboard: ", response);
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Datos Paneles Dashboard")
      }
    );
  }

}
