import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmServicoPage } from './adm-servico';

@NgModule({
  declarations: [
    AdmServicoPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(AdmServicoPage),
  ],
})
export class AdmServicoPageModule {}
