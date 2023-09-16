import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartLayoutComponent } from './start-layout/start-layout.component';
import { ComponentsModule } from '../components/components.module';
import { InternalLayoutComponent } from './internal-layout/internal-layout.component';

@NgModule({
  declarations: [StartLayoutComponent, InternalLayoutComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class LayoutModule {}
