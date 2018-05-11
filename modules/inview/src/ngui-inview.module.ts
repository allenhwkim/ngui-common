import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguiInviewComponent } from './ngui-inview.component';
import { NguiInviewDirective } from './ngui-inview.directive';

@NgModule({
  imports: [CommonModule], // should I import CommonModule?
  declarations: [ NguiInviewComponent, NguiInviewDirective ],
  exports: [NguiInviewComponent, NguiInviewDirective]
})
export class NguiInviewModule {}
