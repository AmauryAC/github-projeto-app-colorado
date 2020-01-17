import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmContatosPage } from './adm-contatos';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  declarations: [
    AdmContatosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmContatosPage),
    NgxMaskIonicModule,
  ],
})
export class AdmContatosPageModule {}
