import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguiInviewModule } from '../../inview';
import { NguiInviewPageComponent } from './ngui-inview-page.component';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiListDirective } from './ngui-list.directive';
import { NguiListItemDirective } from './ngui-list-item.directive';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    NguiInviewModule // for (nguiInview) and (nguiOutview)
  ],
  declarations: [
    NguiAutocompleteComponent,
    NguiInviewPageComponent,
    NguiListDirective,
    NguiListItemDirective,
    NguiVirtualListComponent
  ],
  exports: [
    NguiAutocompleteComponent,
    NguiInviewPageComponent,
    NguiListDirective,
    NguiListItemDirective,
    NguiVirtualListComponent
  ],
  entryComponents: [NguiInviewPageComponent]
})
export class NguiListModule {}

export { NguiAutocompleteComponent } from './ngui-autocomplete.component';
export { NguiVirtualListComponent } from './ngui-virtual-list.component';
