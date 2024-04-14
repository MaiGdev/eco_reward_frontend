import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

//Import all material modules
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSidenavModule } from '@angular/material/sidenav'; // Módulo de sidenav

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { BrandingComponent } from './sidebar/branding.component';
import { ShareModule } from '../share/share.module';
import { DashTemplateComponent } from './dash-template/dash-template.component';
import { HeaderLandingComponent } from './header-landing/header-landing.component';

import { MatMenuModule } from '@angular/material/menu';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { MaterialImports } from '../materialImports.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppNavItemComponent,
    PageNotFoundComponent,
    SidebarComponent,
    BrandingComponent,
    DashTemplateComponent,
    HeaderLandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MaterialImports,
    NgScrollbarModule,
    TablerIconsModule.pick(TablerIcons),
    ShareModule,
    MatSidenavModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TablerIconsModule,
    HeaderLandingComponent,
    FooterComponent,
  ],
})
export class CoreModule {}
