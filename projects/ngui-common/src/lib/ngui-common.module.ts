import {NgModule} from '@angular/core';
import {NguiInviewModule} from './ngui-inview/ngui-inview.module';
import {NguiListModule} from './ngui-list/ngui-list.module';
import {NguiUtilsModule} from './ngui-utils/ngui-utils.module';

@NgModule({
    imports: [
        NguiInviewModule,
        NguiListModule,
        NguiUtilsModule
    ],
    exports: [
        NguiInviewModule,
        NguiListModule,
        NguiUtilsModule
    ]
})
export class NguiCommonModule {
}
