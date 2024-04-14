// dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialImports } from 'src/app/materialImports.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, DashboardRoutingModule, CoreModule, MaterialImports],
})
export class DashboardModule {}
