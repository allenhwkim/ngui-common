import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <ul ngui-list (selected)="selected($event)" (escaped)="escaped()">
      <li *ngFor="let item of items; trackBy: id"
        [nguiListItem]="item">
        <span [innerHTML]="item.value | nguiHighlight:'val'"></span>
      </li>
    </ul>`,
   styles: [`
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
