import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesComercioPage } from './detalhes-comercio';

@NgModule({
  declarations: [
    DetalhesComercioPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DetalhesComercioPage),
  ],
})
export class DetalhesComercioPageModule {}
