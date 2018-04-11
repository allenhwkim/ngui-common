import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoComponent } from './two.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TwoComponent],
  exports: [TwoComponent]
})
export class TwoModule {}
