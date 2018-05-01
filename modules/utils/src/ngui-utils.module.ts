import { NgModule } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';
import { NguiHighlightPipe } from './ngui-highlight.pipe';

@NgModule({
  imports: [],
  declarations: [NguiHighlightPipe],
  exports: [NguiHighlightPipe],
  providers: [DynamicComponentService]
})
export class NguiUtilsModule {}
