import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CouponAllComponent } from './coupon-all/coupon-all.component';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';
import { MaterialImports } from 'src/app/materialImports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmCouponExchangeComponent } from './dialog-confirm-coupon-exchange/dialog-confirm-coupon-exchange.component';
import { CouponAllClientCouponComponent } from './coupon-all-client-coupon/coupon-all-client-coupon.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
/* import {} from '@angular/'; */

@NgModule({
  declarations: [
    CouponAllComponent,
    CouponDetailComponent,
    CouponFormComponent,
    DialogConfirmCouponExchangeComponent,
    CouponAllClientCouponComponent,
  ],
  imports: [
    CommonModule, 
    MaterialImports, 
    ReactiveFormsModule, 
    NgxDropzoneModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule],
  providers: [DatePipe],
})
export class CouponModule {}
