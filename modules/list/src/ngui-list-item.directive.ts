import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';

import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';

// tabindex, keydown, keyup(ENTER, ESC), click
@Directive({
  selector: 'ngui-list-item' // tslint:disable-line
})
export class NguiListItemDirective implements OnInit {
  @Input('item') object: any; // tslint:disable-line

  nextSibling: HTMLElement;
  prevSibling: HTMLElement;
  parentListComp: NguiListDirective | NguiVirtualListComponent;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() private listDirective: NguiListDirective,
    @Optional() @Host() private virtualListComponent: NguiVirtualListComponent
  ) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '1');
    this.parentListComp = this.listDirective || this.virtualListComponent;
    if (!this.parentListComp) {
      throw Error('ngui-list-item requires parent of ngui-list or ngui-virtual-list.');
    }
  }

  // handles keyboard up, down, left, right
  @HostListener('keydown', ['$event']) keydown(event): void {
    const el = this.el.nativeElement;
    const keyCode = event.which || event.keyCode;

    const nextListItem = el.nextElementSibling
      || el.parentElement.firstElementChild;

    const prevListItem = el.previousElementSibling
      || el.parentElement.lastElementChild;

    switch (keyCode) {
      case 37: case 38: // up arrow, left arrow
        prevListItem.focus();
        break;
      case 39: case 40: // down arrow, right arrow
        nextListItem.focus();
        break;
      default:
        break;
    }
  }

  // handles keyboard enter(13), esc(27)
  @HostListener('keyup', ['$event']) keyup(event): void {
    const keyCode = event.which || event.keyCode;

    switch (keyCode) {
      case 13: // return key
        this.parentListComp.selected.emit(this.object);
        break;
      case 27: // esc key
        this.parentListComp.escaped.emit();
        break;
      default:
        break;
    }
  }

  // handles keyboard enter(13), esc(27)
  @HostListener('click', ['$event']) mousedown(event): void {
    this.listDirective.selected.emit(this.object);
  }
}
