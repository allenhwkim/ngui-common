import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
import { NoneSelect } from './none-select';
import { NoMatchFound } from './no-match-found';

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
    private viewContainer: ViewContainerRef,
    @Optional() @Host() private listDirective: NguiListDirective,
    @Optional() @Host() private virtualListComponent: NguiVirtualListComponent,
    @Optional() @Host() private autocompleteComponent: NguiAutocompleteComponent
  ) { }

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    this.parentListComp = this.listDirective || this.virtualListComponent || this.autocompleteComponent;
    if (!this.parentListComp) {
      throw Error('ngui-list-item requires parent of ngui-list, ngui-virtual-list, or ngui-autocomplete.');
    }
    if ((this.object instanceof NoneSelect) || (this.object instanceof NoMatchFound)) {
      this.viewContainer.clear();
      this.el.nativeElement.innerHTML = this.object.html;
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
    switch (event.key) {
      case 'Enter':
        this.parentListComp.selected.emit(this.object);
        break;
      case 'Escape':
        this.parentListComp.escaped.emit();
        break;
      default:
        break;
    }
  }

  @HostListener('click', ['$event']) mousedown(): void {
    this.parentListComp.selected.emit(this.object);
  }

  @HostListener('focus', ['$event']) focused(): void {
    if (this.parentListComp['setFocused']) {
      this.parentListComp['setFocused']('listItem', true);
    }
  }

  @HostListener('blur', ['$event']) blurred(): void {
    if (this.parentListComp['setFocused']) {
      this.parentListComp['setFocused']('listItem', false);
    }
  }
}
