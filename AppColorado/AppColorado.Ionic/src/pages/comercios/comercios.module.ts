import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComerciosPage } from './comercios';

@NgModule({
  declarations: [
    ComerciosPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ComerciosPage),
  ],
})
export class ComerciosPageModule {}
