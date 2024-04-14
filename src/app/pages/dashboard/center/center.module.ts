import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { CenterRoutingModule } from './center-routing.module';
import { CenterAllComponent } from './center-all/center-all.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { CenterFormComponent } from './center-form/center-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialManagementComponent } from './material-management/material-management.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    CenterAllComponent,
    CenterDetailComponent,
    CenterFormComponent,
    MaterialManagementComponent,
  ],
  imports: [
    CommonModule,
    CenterRoutingModule,
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
    MatCheckboxModule,
    TablerIconsModule.pick(TablerIcons),
    FormsModule,
  ],
})
export class CenterModule {}
