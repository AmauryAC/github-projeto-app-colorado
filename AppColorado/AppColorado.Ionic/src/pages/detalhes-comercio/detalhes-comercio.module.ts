import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesComercioPage } from './detalhes-comercio';

@NgModule({
  declarations: [
    DetalhesComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesComercioPage),
  ],
})
export class DetalhesComercioPageModule {}
