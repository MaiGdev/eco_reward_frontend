import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeAllComponent } from './exchange-all/exchange-all.component';
import { ExchangeDetailComponent } from './exchange-detail/exchange-detail.component';

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeRoutingModule {}
