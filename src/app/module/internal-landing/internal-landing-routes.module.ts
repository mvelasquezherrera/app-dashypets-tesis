import { NgModule } from "@angular/core";
import { InternalLayoutComponent } from "../layout/internal-layout/internal-layout.component";
import { CustomerComponent } from "./pages/customer/customer.component";
import { RouterModule, Routes } from "@angular/router";
import { ConsultationComponent } from "./pages/consultation/consultation.component";
import { PetComponent } from "./pages/pet/pet.component";
import { VetComponent } from "./pages/vet/vet.component";
import { DiseaseComponent } from "./pages/disease/disease.component";
import { SpecialtyComponent } from "./pages/specialty/specialty.component";
import { PetTypeComponent } from "./pages/pet-type/pet-type.component";
import { PetClassComponent } from "./pages/pet-class/pet-class.component";
import { AppRoleComponent } from "./pages/app-role/app-role.component";
import { AppPermissionComponent } from "./pages/app-permission/app-permission.component";
import { RoleAppPermissionComponent } from "./pages/role-app-permission/role-app-permission.component";
import { UserComponent } from "./pages/user/user.component";
import { UserRoleAppComponent } from "./pages/user-role-app/user-role-app.component";
import { SymptomComponent } from "./pages/symptom/symptom.component";
import { PredictionComponent } from "./pages/prediction/prediction.component";

const routes: Routes = [
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      { path: 'cliente', component: CustomerComponent },
      { path: 'enfermedad', component: DiseaseComponent },
      { path: 'especialidad', component: SpecialtyComponent },
      { path: 'razasdeperros', component: PetTypeComponent },
      { path: 'tamañodeperros', component: PetClassComponent },
      { path: 'consulta', component: ConsultationComponent },
      { path: 'mascota', component: PetComponent },
      { path: 'veterinario', component: VetComponent },
      { path: 'rolapp', component: AppRoleComponent },
      { path: 'permisosapp', component: AppPermissionComponent},
      { path: 'rolpermisoapp', component: RoleAppPermissionComponent},
      { path: 'usuarios', component: UserComponent},
      { path: 'usuariorolapp', component: UserRoleAppComponent},
      { path: 'sintoma', component: SymptomComponent},
      { path: 'predecirparvovirus', component: PredictionComponent},
      {
        path: '**',
        redirectTo: '404',
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalLandingRoutingModule { }
