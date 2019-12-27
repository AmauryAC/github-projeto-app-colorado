import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusNegociosPage } from './meus-negocios';

@NgModule({
  declarations: [
    MeusNegociosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusNegociosPage),
  ],
})
export class MeusNegociosPageModule {}
