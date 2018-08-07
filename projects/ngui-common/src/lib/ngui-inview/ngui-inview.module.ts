import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NguiInviewComponent} from './src/ngui-inview.component';
import {NguiInviewDirective} from './src/ngui-inview.directive';

export {NguiInviewComponent, NguiInviewDirective};

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NguiInviewComponent,
        NguiInviewDirective
    ],
    exports: [
        NguiInviewComponent,
        NguiInviewDirective
    ]
})
export class NguiInviewModule {
}
