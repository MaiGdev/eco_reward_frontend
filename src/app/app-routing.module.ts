import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserAllComponent } from './pages/dashboard/user/user-all/user-all.component';
import { DashTemplateComponent } from './core/dash-template/dash-template.component';
import { LandingTemplateComponent } from './pages/landing-page/landing-template/landing-template.component';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { CenterAllComponent } from './pages/dashboard/center/center-all/center-all.component';
import { CenterDetailComponent } from './pages/dashboard/center/center-detail/center-detail.component';
import { CenterFormComponent } from './pages/dashboard/center/center-form/center-form.component';
import { UserDetailComponent } from './pages/dashboard/user/user-detail/user-detail.component';
import { UserCouponComponent } from './pages/dashboard/user/user-coupon/user-coupon.component';
import { ExchangeAllComponent } from './pages/dashboard/material/exchange/exchange-all/exchange-all.component';
import { MaterialAllComponent } from './pages/dashboard/material/material-all/material-all.component';
import { MaterialFormComponent } from './pages/dashboard/material/material-form/material-form.component';
import { MaterialDetailComponent } from './pages/dashboard/material/material-detail/material-detail.component';
import { ExchangeDetailComponent } from './pages/dashboard/material/exchange/exchange-detail/exchange-detail.component';
import { MaterialManagementComponent } from './pages/dashboard/center/material-management/material-management.component';
import { LoginComponent } from './pages/authenticate/login/login.component';
import { RegisterComponent } from './pages/authenticate/register/register.component';
import { UserFormComponent } from './pages/dashboard/user/user-form/user-form.component';
import { CouponAllComponent } from './pages/dashboard/coupon/coupon-all/coupon-all.component';
import { CouponFormComponent } from './pages/dashboard/coupon/coupon-form/coupon-form.component';
import { CouponDetailComponent } from './pages/dashboard/coupon/coupon-detail/coupon-detail.component';

import { authGuard } from './services/auth.guard';
import { CouponAllClientCouponComponent } from './pages/dashboard/coupon/coupon-all-client-coupon/coupon-all-client-coupon.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: LandingTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'home',
    component: DashTemplateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user',
        component: UserAllComponent,
        canActivate: [authGuard],
        data: {
          roles: [1],
        },
      },
      {
        path: 'user/:id',
        component: UserDetailComponent,
        canActivate: [authGuard],
        data: {
          roles: [1],
        },
      },
      {
        path: 'user/form/:id',
        component: UserFormComponent,
      },
      {
        path: 'user/1/coupon',
        component: UserCouponComponent,
      },
      {
        path: 'center',
        component: CenterAllComponent,
      },
      {
        path: 'center/create',
        component: CenterFormComponent,
      },
      {
        path: 'center/update/:id',
        component: CenterFormComponent,
      },
      {
        path: 'center/:id',
        component: CenterDetailComponent,
      },
      {
        path: 'material-exchange',
        component: ExchangeAllComponent,
      },
      {
        path: 'material-exchange/:id',
        component: ExchangeDetailComponent,
      },
      {
        path: 'material',
        component: MaterialAllComponent,
      },
      {
        path: 'material/form/:id',
        component: MaterialFormComponent,
        canActivate:[authGuard],
        data:{
          roles:[1]
        },
      },
      {
        path: 'material/:id',
        component: MaterialDetailComponent
      },
      {
        path: 'exchanging',
        component: MaterialManagementComponent,
      },
      {
        path: 'coupon',
        component: CouponAllComponent,
      },
      {
        path: 'coupon/user',
        component: CouponAllClientCouponComponent,
      },
      {
        path: 'coupon/:id',
        component: CouponDetailComponent
      },

      {
        path: 'coupon/form/:id',
        component: CouponFormComponent,
        canActivate:[authGuard],
        data:{
          roles:[1]
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
