import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicComponentService } from '../../../modules/utils';

// component 1
@Component({
  template: `
    <div>
      This is MyComponent({{ id }}), which is inserted dynamically.
      <a href="javascript:void(0)" (click)="remove.emit()">Remove</a>
    </div>
  `
})
export class MyDynamicComponent {
  id: number;
  @Output() remove: EventEmitter<any> = new EventEmitter();
}

// component 2
@Component({
  template: `
    <h2>DynamicComponentService test</h2>

    Components will be add into the following section.
    <div #dynamic></div>
    <button (click)="insertComponent()">Insert MyComponent</button>
  `,
  styles: [`
  `]
})
export class DynamicComponentServiceTestComponent {
  @ViewChild('dynamic', {read: ViewContainerRef}) containerRef: ViewContainerRef;

  constructor(public dcs: DynamicComponentService) {}

  insertComponent(): void {
    const compRef = this.dcs.createComponent(MyDynamicComponent, this.containerRef);
    this.dcs.insertComponent(compRef);
    compRef.instance.remove.subscribe(_ => compRef.destroy()); // dealing with @output
  }

}
