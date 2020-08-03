import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NguiAutocompleteComponent } from '@ngui/common';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>ngui-autocomplete component test</h2>

    <input id="search" [formControl]="search" />

    <ngui-autocomplete for="search" #autocomplete
      (bottomInview)="loadList()"
      (selected)="selected($event)"
      (escaped)="escaped()">
      <ng-template #items let-items="items" let-keyword="keyword">
        <div *ngIf="!items">Loading</div> <!-- loading text -->
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

  @ViewChild('autocomplete', { static: true }) autocomplete: NguiAutocompleteComponent;

  numPage = 0;
  search = new FormControl();

  selected(obj): any {
    console.log('selected() is called', obj);
  }

  escaped(): any {
    console.log('escaped() is called');
  }

  loadList(): void {
    console.log('AutoCompleteComponent.loadList is called();');
    const keyword = this.autocomplete.inputEl.value;
    const items = Array(50).fill(0).map(() => {
      return {id: 1, value: `foo${keyword}bar`};
    });
    of(items).pipe(
        delay(500)
    ).subscribe(result => {
      this.autocomplete.addList(result);
      // this.autocomplete.addList([]);
      this.numPage++;
    });
  }
}
