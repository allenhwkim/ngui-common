import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

import { NguiListDirective } from './ngui-list.directive';

// tabindex, keydown, keyup(ENTER, ESC), click
@Directive({
  selector: '[nguiListItem]' // tslint:disable-line
})
export class NguiListItemDirective implements OnInit {
  nextSibling: HTMLElement;
  prevSibling: HTMLElement;
  @Input('nguiListItem') object: any; // tslint:disable-line

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Host() private listDirective: NguiListDirective
  ) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '1');
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
        this.listDirective.selected.emit(this.object);
        break;
      case 27: // esc key
        this.listDirective.escaped.emit();
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
