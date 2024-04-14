import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ToastrModule } from 'ngx-toastr';
import { CenterModule } from './pages/dashboard/center/center.module';
import { UserModule } from './pages/dashboard/user/user.module';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { ExchangeModule } from './pages/dashboard/material/exchange/exchange.module';
import { MaterialImports } from './materialImports.module';
import { MaterialModule } from './pages/dashboard/material/material.module';
import { AuthenticateModule } from './pages/authenticate/authenticate.module';
import { CouponModule } from './pages/dashboard/coupon/coupon.module';
import { DashboardModule } from './pages/dashboard/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImports,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    MaterialModule,
    CoreModule,
    ShareModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AuthenticateModule,
    CenterModule,
    UserModule,
    LandingPageModule,
    ExchangeModule,
    CouponModule,
    DashboardModule
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
