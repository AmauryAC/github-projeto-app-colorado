import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmComerciosPage } from './adm-comercios';

@NgModule({
  declarations: [
    AdmComerciosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmComerciosPage),
  ],
})
export class AdmComerciosPageModule {}
