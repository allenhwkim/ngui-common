import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneComponent } from './one.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OneComponent],
  exports: [OneComponent]
})
export class OneModule {}
