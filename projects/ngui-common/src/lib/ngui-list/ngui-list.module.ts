import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NguiAutocompleteComponent} from './src/ngui-autocomplete.component';
import {NguiListItemDirective} from './src/ngui-list-item.directive';
import {NguiListDirective} from './src/ngui-list.directive';
import {NguiInviewPageComponent} from './src/ngui-inview-page.component';
import {NguiVirtualListComponent} from './src/ngui-virtual-list.component';
import {NguiInviewModule} from '../ngui-inview/ngui-inview.module';

export {NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent};

@NgModule({
    imports: [
        CommonModule,
        NguiInviewModule
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
export class NguiListModule {
}
