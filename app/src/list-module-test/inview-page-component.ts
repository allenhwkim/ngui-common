import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>ngui-inview-page component test</h2>

    <h3>[items] and [template] not given</h3>
    <ngui-inview-page id="item-template-missing"></ngui-inview-page>

    <h3>[items] not given</h3>
    <ngui-inview-page id="items-missing">
      <ng-template let-items="items">template without [items]</ng-template>
    </ngui-inview-page>

    <h3>[template] not given</h3>
    <ngui-inview-page id="templaxte-missing" [items]="items"></ngui-inview-page>

    <h3>[item] and [template] given</h3>
    <ngui-inview-page id="item-template-given" style="border:1px solid #ccc" [items]="items">
      <ng-template let-items="items">
        <div *ngIf="items else noItems">
          <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
        </div>
      </ng-template>
    </ngui-inview-page>

    <h3>filler</h3>
    <div style="height: 800px; border: 1px solid #ccc">
      This is filler to make the above item out of view.<br/>
      Please scroll down to the bottom of the page.
      <div style="text-align: center; font-size: 200px">&#8595;</div>
    </div>

    <div class="num-elements">
      Number of &lt;li> tag on document: {{ numElements }}
    </div>
  `,
  styles: [`
    .num-elements {
      position: fixed; padding: 5px;
      bottom: 0; left: 50%; background: #333;color: #fff;
    }
  `]
})
export class InviewPageComponent {
  get numElements(): number {
    return this.element.nativeElement.querySelectorAll('li').length;
  }

  items = Array.from(Array(50), (_, x) => x);
  constructor(public element: ElementRef) {}
}
