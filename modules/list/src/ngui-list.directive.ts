import {
  Directive,
  EventEmitter,
  Host,
  Output
} from '@angular/core';

@Directive({
  selector: 'ngui-list' // tslint:disable-line
})
export class NguiListDirective {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() escaped: EventEmitter<any> = new EventEmitter();
}
