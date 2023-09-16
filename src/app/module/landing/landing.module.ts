import { NgModule } from "@angular/core";
import { ComponentsModule } from "../components/components.module";
import { LandingRoutingModule } from "./landing-routes.module";
import { StartComponent } from "./pages/start/start.component";
import { LoginComponent } from "./pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [StartComponent, LoginComponent],
    imports: [LandingRoutingModule, ComponentsModule, ReactiveFormsModule, CommonModule]
})
export class LandingPageModule {}
