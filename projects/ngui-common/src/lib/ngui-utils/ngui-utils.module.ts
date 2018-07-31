import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NguiHighlightPipe} from './src/ngui-highlight.pipe';
import {DynamicComponentService} from './src/dynamic-component.service';

@NgModule({
  imports: [
    CommonModule
  ],
    declarations: [NguiHighlightPipe],
    exports: [NguiHighlightPipe],
    providers: [DynamicComponentService]
})
export class NguiUtilsModule { }

export { konsole } from './src/konsole';
export { fireEvent } from './src/fire-event';
export {DynamicComponentService} from './src/dynamic-component.service';
export {NguiHighlightPipe} from './src/ngui-highlight.pipe';
