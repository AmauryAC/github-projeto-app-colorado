import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmEnderecoPage } from './adm-endereco';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  declarations: [
    AdmEnderecoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmEnderecoPage),
    NgxMaskIonicModule
  ],
})
export class AdmEnderecoPageModule {}
