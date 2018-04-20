import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguiInviewModule } from '../../in-view';
import { NguiDynPageComponent } from './ngui-dyn-page.component';

@NgModule({
  imports: [
    CommonModule,
    NguiInviewModule // for (nguiInview) and (nguiOutview)
  ],
  declarations: [ NguiDynPageComponent ],
  exports: [ NguiDynPageComponent ]
})
export class NguiListModule {}
