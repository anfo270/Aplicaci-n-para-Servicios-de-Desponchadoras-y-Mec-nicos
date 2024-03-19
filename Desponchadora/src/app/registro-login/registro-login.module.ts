import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroLoginPageRoutingModule } from './registro-login-routing.module';

import { RegistroLoginPage } from './registro-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroLoginPageRoutingModule
  ],
  declarations: [RegistroLoginPage]
})
export class RegistroLoginPageModule {}
