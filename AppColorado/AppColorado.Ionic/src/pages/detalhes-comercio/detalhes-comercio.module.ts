import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesComercioPage } from './detalhes-comercio';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    DetalhesComercioPage,
  ],
  imports: [
    PipesModule,
    StarRatingModule,
    IonicPageModule.forChild(DetalhesComercioPage),
  ],
})
export class DetalhesComercioPageModule {}
