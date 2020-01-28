import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmComerciosPage } from './adm-comercios';

@NgModule({
  declarations: [
    AdmComerciosPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AdmComerciosPage),
  ],
})
export class AdmComerciosPageModule {}
