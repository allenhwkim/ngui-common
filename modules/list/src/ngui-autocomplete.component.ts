import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { fireEvent } from '../../utils';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NoMatchFound } from './no-match-found';
import { NoneSelect } from './none-select';

@Component({
  selector: 'ngui-autocomplete',
  template: `
    <div *ngIf="isReady" class="ngui-autocomplete">
      <div #pages></div>
      <ngui-inview (inview)="addMorePages()"></ngui-inview>
    </div>
  `,
  styles: [`
    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}
    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }
  `]
})
export class NguiAutocompleteComponent extends NguiVirtualListComponent implements OnInit {
  @Input() for: string; // input tag id
  @Input() minInputChars = 1;
  @Input() blankOption: string;

  /** Template of NguiInviewPage. Allow users to define their own template  */
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  inputEl: HTMLInputElement;
  _focused: any = {input: false, listItem: false};
  _focusTimer;
  _acTimer;
  _selectedFromList: boolean;
  _escapedFromList: boolean;
  _orgInputValue: string;
  _prevInputValue: string;
  _lastSelected: any;

  wow(): void {
    alert('wow');
  }
  /**
   * returns autocomplete display condition
   * autocompolete list is only visible
   *   - when input element is focused or list element is focused
   *   - when input value has enought characters
   *   - and user just did not selected or escaped
   */
  get isReady(): boolean {
    const selectedOrEscaped = this._selectedFromList || this._escapedFromList;
    const focused = this._focused.input || this._focused.listItem;
    const minChars = this.inputEl.value.length >= this.minInputChars;

    return (!selectedOrEscaped && focused && minChars);
  }

  ngOnInit(): void {
    this.inputEl = <HTMLInputElement> document.querySelector('#' + this.for); // tslint:disable-line
    this.positionThisUnderInputEl();

    Observable.fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
    this.inputEl.addEventListener('focus', this.onInputElFocused.bind(this));
    this.inputEl.addEventListener('blur', this.onInputElBlurred.bind(this));
    this.selected.subscribe(this.onSelected.bind(this));
    this.escaped.subscribe(this.onEscaped.bind(this));
  }

  onSelected(value): void {
    this._selectedFromList = true;
    this.inputEl.focus();
    this._lastSelected = value;
    this.cdr.detectChanges();    // for ChangeDetectionStrategy.OnPush
    console.log('NguiAutoCompleteComponent.onSelected() is called', value);
  }

  onEscaped(): void {
    this._escapedFromList = true;
    this.inputEl.focus();
    if (!this._lastSelected) {
      this.inputEl.value = this._orgInputValue;
    }
    this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
    console.log('NguiAutoCompleteComponent.onEscaped() is called');
  }

  onInputElFocused(event): void {
    console.log('NguiAutoCompleteComponent.onInputElFocused() is called', event);
    this.isListLoading = false;
    if (typeof this._orgInputValue === 'undefined') {
      this._orgInputValue = this.inputEl.value;
    }
    this._prevInputValue = this.inputEl.value;
    this.setFocused('input', true);
  }

  onInputElBlurred(event): void {
    this.setFocused('input', false);
  }

  clearList(): void {
    this.inviewPages.forEach(compRef => {
      compRef.destroy();
    });
    this.inviewPages = [];
  }

  onInputElKeyup(event: KeyboardEvent): void {
    console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
    const firstList = this.element.nativeElement.querySelector('ngui-list-item');
    if (event.key === 'Enter' || event.key === 'Escape') {
      if (firstList) {
        fireEvent(firstList, 'keyup', {key: event.key});
      } else {
        this.onEscaped();
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      firstList && firstList.focus();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      //
    } else if (this.inputEl.value.length >= this.minInputChars) {
      this._selectedFromList = false;
      this._escapedFromList = false;
      this.addAutocompleteList();
    }
  }

  /** Complete the first page of autocomplete */
  addAutocompleteList(): void {
    if (this.isReady) {
      clearTimeout(this._acTimer);
      this._acTimer = setTimeout(_ => {
        this.isListLoading = false; // ???????/
        this._prevInputValue = this.inputEl.value;
        this._escapedFromList = false;
        this._selectedFromList = false;
        this.clearList();
        this.addAnInviewPageToPages();
      }, 200);
    }
  }

  /** Complete after the first page of autocomplete when it scrolls to the bottom */
  addMorePages(): void {
    console.debug('NguiAutocompleteComponent.addMorePages() is called.');
    if (this.inviewPages.length) {
      this.addAnInviewPageToPages();
    } else {
      console.debug('skipping addMorePages');
    }
  }

  setFocused(elType: 'input' | 'listItem', val: boolean): void {
    if (val) {
      clearTimeout(this._focusTimer);
      this._focused = {input: false, listItem: false};
      this._focused[elType] = true;
    } else {
      this._focusTimer = setTimeout(_ => {
        this._focused[elType] = false;
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
      }, 100);
    }
  }

  positionThisUnderInputEl(): void {
    const thisEl = this.element.nativeElement;
    const thisElBCR = thisEl.getBoundingClientRect();
    const thisInputElBCR = this.inputEl.getBoundingClientRect();
    const closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
    const top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;

    this.renderer.setStyle(thisEl, 'left', `${thisInputElBCR.left}px`);
    this.renderer.setStyle(thisEl, 'top', `${top}px`);
    this.renderer.setStyle(thisEl, 'minWidth', `${thisInputElBCR.width}px`);
  }

  // set items of NguiInviewPageComponent
  addList(items: Array<any>): void {
    console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
    this.isListLoading = false;

    // TODO: ........ for 1st page only, show no match found or blank option
    let noMatchItem: any;
    let blankItem: any;
    if (this.inviewPages.length === 1) {
      if (!items || items.length === 0) { // add no match item
        noMatchItem = new NoMatchFound();
      } else if (this.blankOption) {
        blankItem = new NoneSelect();
        blankItem.html = this.blankOption;
      }
    }

    const allItems = [].concat(noMatchItem, blankItem, items).filter(x => x);
    this.inviewPage.instance.setItems(allItems);
    this.cdr.detectChanges();
  }

}
