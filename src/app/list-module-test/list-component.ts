import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <ngui-list (selected)="selected($event)" (escaped)="escaped()">
      <ngui-list-item *ngFor="let item of items" [item]="item">
        <span [innerHTML]="item.value | nguiHighlight:'val'"></span>
      </ngui-list-item>
    </ngui-list>`,
   styles: [`
     ngui-list-item { display: block; }
     .ngui-highlight { font-weight: bold; }
   `],
   encapsulation: ViewEncapsulation.None
})
export class ListComponent  {
  items = (new Array(10)).fill(0).map((_, i) => ({id: i, value: `value ${i}`}));

  selected(item): void {
    console.log('item selected', item);
  }

  escaped(): void {
    console.log('escaped from list');
  }
}
