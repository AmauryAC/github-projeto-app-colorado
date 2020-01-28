import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by/order-by';
import { RealPipe } from './real/real';
@NgModule({
	declarations: [OrderByPipe,
    RealPipe],
	imports: [],
	exports: [OrderByPipe,
    RealPipe]
})
export class PipesModule {}
