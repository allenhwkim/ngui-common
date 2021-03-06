import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';

import { NguiVirtualListComponent } from '@ngui/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>ngui-virtual-list component test</h2>

    <ngui-virtual-list (bottomInview)="loadItems($event)">
      <ng-template let-items="items">
        <div *ngIf="!items">Loading...</div>
        <ngui-list-item *ngFor="let num of items">
          row number: {{ num }}
        </ngui-list-item>
      </ng-template>
    </ngui-virtual-list>

    <div class="num-elements">
      Number of rows on screen: {{ numDomElements }}
    </div>
  `,
  styles: [`
    ngui-list-item {display: block}
    .num-elements {
      position: fixed; padding: 5px;
      bottom: 0; left: 50%; background: #333;color: #fff;
    }
  `]
})
export class VirtualListComponent {

  get numDomElements(): number {
    return this.element.nativeElement.querySelectorAll('ngui-list-item').length;
  }

  totalPage = 0;

  constructor(
    public element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  loadItems(virtualList: NguiVirtualListComponent): void {
    const items: Array<any> = Array.from(Array(50), (_, x) => (this.totalPage * 50) + x);
    of(items).pipe(
        delay(1000)
    ).subscribe(result => {
      virtualList.addList(result);
      this.totalPage++;
      this.changeDetectorRef.markForCheck();
    });
  }
}
