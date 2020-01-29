import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by/order-by';
import { RealPipe } from './real/real';
import { FilterPipe } from './filter/filter';
@NgModule({
	declarations: [OrderByPipe,
    RealPipe,
    FilterPipe],
	imports: [],
	exports: [OrderByPipe,
    RealPipe,
    FilterPipe]
})
export class PipesModule {}
