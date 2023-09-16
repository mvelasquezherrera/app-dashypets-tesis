import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarSessionComponent } from "./navbar-session/navbar-session.component";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [NavbarComponent, FooterComponent, SidebarComponent, NavbarSessionComponent, SpinnerComponent],
    imports: [RouterModule, CommonModule],
    exports: [NavbarComponent, FooterComponent, SidebarComponent, NavbarSessionComponent, SpinnerComponent]
})
export class ComponentsModule {}
