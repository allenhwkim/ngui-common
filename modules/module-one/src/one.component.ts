import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-component-1',
  template: `
    <button (click)="buttonClicked$.emit()">Click This</button>
  `,
  styles: ['']
})
export class OneComponent {
  @Output() buttonClicked$: EventEmitter<any> = new EventEmitter();
}
