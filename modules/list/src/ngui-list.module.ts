import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguiInviewModule } from '../../in-view';
import { NguiInviewPageComponent } from './ngui-inview-page.component';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';

@NgModule({
  imports: [
    CommonModule,
    NguiInviewModule // for (nguiInview) and (nguiOutview)
  ],
  declarations: [ NguiInviewPageComponent, NguiVirtualListComponent ],
  exports: [ NguiInviewPageComponent, NguiVirtualListComponent ],
  entryComponents: [NguiInviewPageComponent]
})
export class NguiListModule {}
