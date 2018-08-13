import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NguiHighlightPipe} from './src/ngui-highlight.pipe';
import {DynamicComponentService} from './src/dynamic-component.service';
import { konsole } from './src/konsole';
import { fireEvent } from './src/fire-event';

export {DynamicComponentService, NguiHighlightPipe, konsole, fireEvent};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NguiHighlightPipe],
  exports: [NguiHighlightPipe],
  providers: [DynamicComponentService]
})
export class NguiUtilsModule { }
