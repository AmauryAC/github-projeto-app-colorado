import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmProdutoPage } from './adm-produto';

@NgModule({
  declarations: [
    AdmProdutoPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(AdmProdutoPage),
  ],
})
export class AdmProdutoPageModule {}
