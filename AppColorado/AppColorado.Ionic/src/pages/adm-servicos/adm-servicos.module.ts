import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmServicosPage } from './adm-servicos';

@NgModule({
  declarations: [
    AdmServicosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmServicosPage),
  ],
})
export class AdmServicosPageModule {}
