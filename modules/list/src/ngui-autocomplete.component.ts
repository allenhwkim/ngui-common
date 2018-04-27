import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { NguiVirtualListComponent } from './ngui-virtual-list.component';

@Component({
  selector: 'ngui-autocomplete',
  template: `
    <div *ngIf="isReady" class="ngui-autocomplete">
      <div #pages></div>
      <ngui-inview (inview)="addAnInviewPageToPages(true)"></ngui-inview>
    </div>
  `,
  styles: [`
    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}
  `]
})
export class NguiAutocompleteComponent extends NguiVirtualListComponent implements OnInit {
  @Input() for: string; // input tag id

  focused: any = {input: false, listItem: false};
  focusTimer;
  keyupTimer;
  inputEl: HTMLInputElement;
  isValueSelected: boolean;
  isEscaped: boolean;

  get isReady(): boolean {
    return (!this.isValueSelected && !this.isEscaped) && (this.focused.input || this.focused.listItem);
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

  onSelected(): void {
    this.isValueSelected = true;
    this.inputEl.focus();
  }

  onEscaped(): void {
    this.isEscaped = true;
    this.inputEl.focus();
  }

  onInputElKeyup(event): void {
    clearTimeout(this.keyupTimer);
    this.keyupTimer = setTimeout(_ => {
      this.isEscaped = false;
      this.isValueSelected = false;
      // if (!this.isListLoading) {
        this.clearList();
        this.addAnInviewPageToPages(false); // this will load new items
      // }
    }, 500);
  }

  onInputElFocused(event): void {
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
      clearTimeout(this.focusTimer);
      this.focused = {input: false, listItem: false};
      this.focused[elType] = true;
    } else {
      this.focusTimer = setTimeout(_ => {
        this.focused[elType] = false;
        this.cdr.detectChanges();
      }, 200);
    }
  }

  positionThisUnderInputEl(): void {
    const thisElBCR = this.element.nativeElement.getBoundingClientRect();
    const thisInputElBCR = this.inputEl.getBoundingClientRect();
    const closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
    const styleTo = closeToBottom ? 'bottom' : 'top';
    const top = thisInputElBCR.top + thisInputElBCR.height;
    this.renderer.setStyle(this.element.nativeElement, 'left', `${thisInputElBCR.left}px`);
    this.renderer.setStyle(this.element.nativeElement, 'top', `${top}px`);
  }

}

