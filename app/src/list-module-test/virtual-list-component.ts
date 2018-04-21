import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>ngui-virtual-list component test</h2>

    <ngui-virtual-list [template]="myTemplate" (bottomInview)="loadItems($event)">
    </ngui-virtual-list>

    <ng-template #myTemplate let-items="items">
      <div *ngIf="items else noItems">
        <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
      </div>
      <ng-template #noItems>Loading</ng-template>
    </ng-template>

    <div class="num-elements">
      Number of all elements on document: {{ numDomElements }}
    </div>
  `,
  styles: [`
    .num-elements {
      position: fixed; padding: 5px;
      bottom: 0; left: 50%; background: #333;color: #fff;
    }
  `]
})
export class VirtualListComponent {

  get numDomElements(): number {
    return this.element.nativeElement.querySelectorAll('*').length;
  }

  lastPage = 0;

  constructor(public element: ElementRef) {}

  loadItems(virtualList: any): void {
    const items: Array<any> = Array.from(Array(50), (_, x) => (this.lastPage * 50) + x);
    Observable.of(items).delay(1000).subscribe(result => {
      virtualList.addItems(result);
      this.lastPage++;
    });
  }
}
