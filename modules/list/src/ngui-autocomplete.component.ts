import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { fireEvent } from '../../utils';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';

@Component({
  selector: 'ngui-autocomplete',
  template: `
    <div *ngIf="isReady" class="ngui-autocomplete">
      <div *ngIf="isListLoading">
        <ng-container [ngTemplateOutlet]="loadingTemplate"></ng-container>
      </div>
      <div *ngIf="!isListLoading">
        <div *ngIf="_noMatchFound">
          <ng-container [ngTemplateOutlet]="noMatchFoundTemplate"></ng-container>
        </div>
        <div *ngIf="_showBlankOption">
          <ng-container [ngTemplateOutlet]="blankOptionTemplate"></ng-container>
        </div>
      </div>
      <div #pages></div>
      <ngui-inview (inview)="addAutocompleteList()"></ngui-inview>
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

  @Input() blankOptionTemplate: any;    // Template reference
  @Input() noMatchFoundTemplate: any;   // Template reference
  @Input() loadingTemplate: any;        // Template reference

  inputEl: HTMLInputElement;
  _focused: any = {input: false, listItem: false};
  _focusTimer;
  _acTimer;
  _selectedFromList: boolean;
  _escapedFromList: boolean;
  _orgInputValue: string;
  _prevInputValue: string;
  _lastSelected: any;
  _noMatchFound: boolean;
  _showBlankOption: boolean;

  /** return autocomplete display condition */
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
    console.log('NguiAutoCompleteComponent.onSelected() is called', value);
  }

  onEscaped(value): void {
    this._escapedFromList = true;
    this.inputEl.focus();
    if (!this._lastSelected) {
      this.inputEl.value = this._orgInputValue;
    }
    console.log('NguiAutoCompleteComponent.onEscaped() is called', value);
  }

  onInputElKeyup(event: KeyboardEvent): void {
    console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
    const firstList = this.element.nativeElement.querySelector('ngui-list-item');
    if (firstList) { // if list is available to choose
      if (event.key === 'Enter') {
        fireEvent(firstList, 'keyup', {key: 'Enter'});
      } else if (event.key === 'Escape') {
        fireEvent(firstList, 'keyup', {key: 'Escape'});
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        firstList.focus();
      }
    }
    if (this.inputEl.value.length >= this.minInputChars) {
      this.addAutocompleteList();
    }
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

  setFocused(elType: 'input' | 'listItem', val: boolean): void {
    if (val) {
      clearTimeout(this._focusTimer);
      this._focused = {input: false, listItem: false};
      this._focused[elType] = true;
    } else {
      this._focusTimer = setTimeout(_ => {
        this._focused[elType] = false;
        this.cdr.detectChanges();
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

  addAutocompleteList(): void {
    if (this._prevInputValue !== this.inputEl.value) {
      clearTimeout(this._acTimer);
      this._acTimer = setTimeout(_ => {
        this._prevInputValue = this.inputEl.value;
        this._escapedFromList = false;
        this._selectedFromList = false;
        this.clearList();
        this.addAnInviewPageToPages();
      }, 200);
    } else {
      console.log('skipping addAutocompleteList(), prev === current');
    }
  }

  // set items of NguiInviewPageComponent
  addList(items: Array<any>): void {
    console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');

    this.isListLoading = false;
    this._noMatchFound = false;
    this._showBlankOption = false;

    // if the first page, show no match found or blank option
    if (this.inviewPages.length === 1) {
      if (!items || items.length === 0) {
        this._noMatchFound = true;
      } else {
        this._showBlankOption = true;
      }
    }
    this.inviewPage.instance.setItems(items);
  }

}
