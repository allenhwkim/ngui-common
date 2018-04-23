import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Output
} from '@angular/core';

@Directive({
  selector: 'ngui-list' // tslint:disable-line
})
export class NguiListDirective {
  /** Fired when child `<ngui-list-item>` is selected */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
  @Output() escaped: EventEmitter<any> = new EventEmitter();

  constructor(public element: ElementRef) {}
}
