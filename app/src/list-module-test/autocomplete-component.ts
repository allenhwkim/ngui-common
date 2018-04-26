import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NguiAutocompleteComponent } from '../../../modules';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>ngui-autocomplete component test</h2>

    <input id="search" [formControl]="search"
      (focus)="focused()"
      (keyup)="loadList($event, true)"
      (blur)="blur()" />

    <ngui-autocomplete #autocomplete
      (bottomInview)="loadList()"
      (selected)="selected($event)"
      (escaped)="escaped()">
      <ng-template let-items="items" let-keyword="keyword">
        <ngui-list-item [item]="item" *ngFor="let item of items; trackBy: id">
          <span [innerHTML]="item.value"></span>
        </ngui-list-item>
      </ng-template>
    </ngui-autocomplete>
  `,
  styles: [`
    ngui-list-item {display: block}
  `]
})
export class AutocompleteComponent {

  @ViewChild('autocomplete') autocomplete: NguiAutocompleteComponent;

  numPage = 0;
  search = new FormControl();

  focused(): void {
    this.autocomplete.setFocused('input', true);
  }

  blur(): void {
    this.autocomplete.setFocused('input', false);
  }

  selected(obj): any {
    console.log('selected() is called', obj);
    this.search.setValue(obj.value);
  }

  escaped(): any {
    console.log('escaped() is called');
  }

  loadList(event?: KeyboardEvent, reload?: boolean): void {
    if (this.autocomplete.isReady) {
      const keyword = event ? event.target['value'] : this.search.value;
      const items = Array(50).fill(0).map((_, i) => {
        let obj = { id: 1, value: `foo${keyword}bar` }; // tslint:disable-line
        return obj; // tslint:disable-line
      });
      Observable.of(items).delay(500).subscribe(result => {
        if (this.autocomplete.isReady) {
          this.autocomplete.addList(result);
          this.numPage++;
        }
      });
    }
  }
}
