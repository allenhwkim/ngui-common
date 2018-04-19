import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';

/**
 * A block of component that listens to inView and outView events,
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
  /** Allow users to change the contents */
  @Input('template') template: TemplateRef<any>;
  /** List of elements that are used to render this element */
  @Input('items') items: Array<any>;

  /** IntersectionObserver options */
  options: any;
  /** Indicates that the page of out of viewport */
  outView = false;
  /** The copy of items. This is set when this element is out of viewport */
  itemsBackup: Array<any> = [];
  /**
   * The first element of this dynamic page component.
   * The height of it remains the same even when items get empty out.
   */
  contentsEl: HTMLElement;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  /**
   * Restore items when in viewport, so that elements are rendered
   */
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

  /**
   * Empty items when not in viewport, so that elements are not rendered
   */
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
