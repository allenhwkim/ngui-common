import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';

/**
 * A block of component that listens to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view
 *
 * ### example
 * ```ts
 * <ngui-inview-page [items]="items">
 *   <ng-template let-items="items">
 *     <div *ngIf="items else noItems">
 *       <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
 *     </div>
 *   </ng-template>
 * </ngui-inview-page>
 * ```
 */
@Component({
  selector: 'ngui-inview-page',
  template: `
    <div class="inview-page contents"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
      <div *ngIf="outView">{{ this.itemsBackup.length }} items hidden</div>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `,
  styles: [`
    :host {display: block}
  `]
})
export class NguiInviewPageComponent implements OnInit, OnDestroy {

  /** Allow users to change the contents */
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  // @Input('template') template: TemplateRef<any>;

  /** List of elements that are used to render this element */
  @Input('items') items: Array<any>;

  /** IntersectionObserver options */
  options: any;
  /** Indicates that the page of out of viewport */
  outView = false;
  /** The copy of items. This is set when this element is out of viewport */
  itemsBackup: Array<any> = [];
  /**
   * The first element of this component.
   * The height of it remains the same even when items get empty out.
   */
  contentsEl: HTMLElement;
  destroyed: boolean;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Restore items when in viewport, so that elements are rendered
   */
  restoreItems(): void {
    if (this.outView) {
      this.outView = false;
      this.items = Array.from(this.itemsBackup || []);
      this.itemsBackup = undefined;
      this.renderer.setStyle(this.contentsEl, 'height', undefined);
      this.cdRef.detectChanges();
    }
  }

  ngOnInit(): void {
    this.contentsEl =
      this.element.nativeElement.querySelector('.inview-page.contents');
  }

  ngOnDestroy(): void {
    console.log('xxxxxxxxxxxxxxxxxxxxx ngOnDestroy');
    this.destroyed = true;
  }

  /**
   * Empty items when not in viewport, so that elements are not rendered
   */
  emptyItems(): void {
    if (this.items && this.contentsEl && !this.outView) {
      // set height before emptying contents
      const height = this.element.nativeElement.getBoundingClientRect().height;
      this.renderer.setStyle(this.contentsEl, 'height', `${height}px`);

      this.outView = true;
      this.itemsBackup = Array.from(this.items || []);
      this.items = undefined;
      if (!this.destroyed) {
        this.cdRef.detectChanges();
      }
    }
  }

  setItems(items: Array<any>): void {
    if (!this.destroyed) {
      this.items = items;
      this.cdRef.detectChanges();
    }
  }

}
