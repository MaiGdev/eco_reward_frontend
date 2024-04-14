import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LandingTemplateComponent } from './landing-template/landing-template.component';
import { MatCardModule } from '@angular/material/card';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CenterDialogComponent } from './center-dialog/center-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingTemplateComponent,
    MaterialDialogComponent,
    CenterDialogComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    CoreModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    CenterDialogComponent
  ],
})
export class LandingPageModule {}
