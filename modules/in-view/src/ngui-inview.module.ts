import { NgModule } from '@angular/core';
import { NguiInviewComponent } from './ngui-inview.component';
import { NguiInviewDirective } from './ngui-inview.directive';

@NgModule({
  imports: [], // should I import CommonModule?
  declarations: [ NguiInviewComponent, NguiInviewDirective ],
  exports: [NguiInviewComponent, NguiInviewDirective]
})
export class NguiInviewModule {}
