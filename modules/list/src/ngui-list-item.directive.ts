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
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';

// tabindex, keydown, keyup(ENTER, ESC), click
@Directive({
  selector: 'ngui-list-item' // tslint:disable-line
})
export class NguiListItemDirective implements OnInit {
  @Input('item') object: any; // tslint:disable-line

  nextSibling: HTMLElement;
  prevSibling: HTMLElement;
  parentListComp: NguiListDirective | NguiVirtualListComponent | NguiAutocompleteComponent;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() private listDirective: NguiListDirective,
    @Optional() @Host() private virtualListComponent: NguiVirtualListComponent,
    @Optional() @Host() private autocompleteComponent: NguiAutocompleteComponent
  ) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    this.parentListComp = this.listDirective || this.virtualListComponent || this.autocompleteComponent;
    if (!this.parentListComp) {
      throw Error('ngui-list-item requires parent of ngui-list, ngui-virtual-list, or ngui-autocomplete.');
    }
  }

  // handles keyboard up, down, left, right
  @HostListener('keydown', ['$event']) keydown(event): void {
    const thisListItem = this.el.nativeElement;
    const keyCode = event.which || event.keyCode;
    const parentListEl = this.parentListComp.element.nativeElement;
    const listItems: Array<HTMLElement>
      = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
    const listItemNdx = listItems.indexOf(thisListItem);
    const nextListItem = listItems[listItemNdx + 1] || listItems[0];
    const prevListItem = listItems[listItemNdx - 1] || listItems[listItems.length - 1];

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
    console.log('this.parentListComp', this.parentListComp)
    this.parentListComp.selected.emit(this.object);
  }

  @HostListener('focus', ['$event']) focused(event): void {
    if (this.parentListComp['setFocused']) {
      this.parentListComp['setFocused']('listItem', true);
    }
  }

  @HostListener('blur', ['$event']) blurred(event): void {
    if (this.parentListComp['setFocused']) {
      this.parentListComp['setFocused']('listItem', false);
    }
  }
}
