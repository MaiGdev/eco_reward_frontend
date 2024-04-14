import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAllComponent } from './user-all/user-all.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { UserCouponComponent } from './user-coupon/user-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserFormComponent } from './user-form/user-form.component';
import { ChangePasswordModalComponent } from './user-password-moda/change.password.modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserWalletModalComponent } from './user-wallet-modal/user-wallet-modal.component';

@NgModule({
  declarations: [UserAllComponent, UserDetailComponent, UserCouponComponent, UserFormComponent, ChangePasswordModalComponent, UserWalletModalComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule ,
    MatSortModule,
    FormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
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
  ],
})
export class UserModule {}
