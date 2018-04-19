import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';

/**
 * this will listen to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view
 */
@Component({
  selector: 'ngui-dyn-page',
  template: `
    <div class="dyn-page contents"
      (nguiInView)="restoreItems()"
      (nguiOutView)="emptyItems()">
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
      <div *ngIf="outView">{{ this.itemsBackup.length }} items hidden</div>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="items else loading">
        Error: [template] is not given.
      </div>
      <ng-template #loading>Loading...</ng-template>
    </ng-template>
  `,
  styles: [`
    :host {display: block}
  `]
})
export class NguiDynPageComponent implements OnInit {
  @Input('template') template: TemplateRef<any>;
  @Input('items') items;

  options: any;
  outView = false;
  itemsBackup: Array<any> = [];
  contentsEl: HTMLElement;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  restoreItems(): void {
    if (this.outView) {
      this.outView = false;
      this.items = Array.from(this.itemsBackup || []);
      this.itemsBackup = undefined;
      this.renderer.setStyle(this.contentsEl, 'height', undefined);
    }
  }

  ngOnInit(): void {
    this.contentsEl =
      this.element.nativeElement.querySelector('.dyn-page.contents');
  }

  emptyItems(): void {
    if (this.items && !this.outView) {
      // set height before emptying contents
      const height = this.element.nativeElement.getBoundingClientRect().height;
      this.renderer.setStyle(this.contentsEl, 'height', `${height}px`);

      this.outView = true;
      this.itemsBackup = Array.from(this.items || []);
      this.items = undefined;
    }
  }

}
