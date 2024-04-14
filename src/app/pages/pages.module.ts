import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './authModule/register/register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [CommonModule],
  exports: [],
})
export class PagesModule {}
