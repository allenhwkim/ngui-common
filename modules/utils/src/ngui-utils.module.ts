import { NgModule } from '@angular/core';

export { konsole } from './konsole';
import { DynamicComponentService } from './dynamic-component.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [DynamicComponentService]
})
export class NguiUtilsModule {}
