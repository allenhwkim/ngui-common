import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguiInviewModule } from '../../in-view';
import { NguiInviewPageComponent } from './ngui-inview-page.component';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiListDirective } from './ngui-list.directive';
import { NguiListItemDirective } from './ngui-list-item.directive';

@NgModule({
  imports: [
    CommonModule,
    NguiInviewModule // for (nguiInview) and (nguiOutview)
  ],
  declarations: [
    NguiInviewPageComponent,
    NguiListDirective,
    NguiListItemDirective,
    NguiVirtualListComponent
  ],
  exports: [
    NguiInviewPageComponent,
    NguiListDirective,
    NguiListItemDirective,
    NguiVirtualListComponent
  ],
  entryComponents: [NguiInviewPageComponent]
})
export class NguiListModule {}

export { NguiVirtualListComponent } from './ngui-virtual-list.component';