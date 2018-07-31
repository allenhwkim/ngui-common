import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ContentChild,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { DynamicComponentService } from '../../ngui-utils/src/dynamic-component.service';
import { NguiInviewPageComponent } from './ngui-inview-page.component';

/**
 * Virtual List
 *
 * The `<ngui-inview ..>` inserts <ngui-inview-page> into
 * `<div #pages>` when it is in viewport
 * When it's inserted, it will be pushed down, which makes it out of viewport.
 * User scrolls down to see the bottom of the list,
 * then it will insert another `<ngui-inview-page>` again.
 *
 * <ngui-inview-page> listens to (nguiInview) and (nguiOutview) events,
 * when <ngui-inview-page> is out of view port, it empties out the contents.
 * and it restores back the contents when it is in viewport again.
 *
 * ### example
 * ```ts
 * <ngui-virtual-list (bottomInview)="loadItems($event)">
 *   <ng-template let-items="items">
 *     <div *ngIf="!items">Loading</div>
 *     <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
 *   </ng-template>
 * </ngui-virtual-list>
 * ```
 */
@Component({
  selector: 'ngui-virtual-list',
  template: `
    <div class="ngui-virtual-list"
      (focus)="_focused = true"
      (click)="_focused = true">
      <!-- hold multiple <ngui-inview-page> -->
      <div #pages></div>
      <!-- insert <ngui-inview-page> into #pages -->
      <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
    </div>
  `,
  styles: [`
    :host {display: block}
  `]
})
export class NguiVirtualListComponent implements AfterViewInit {

  /** the container NguiInviewPage will be inserted */
  @ViewChild('pages', {read: ViewContainerRef}) pagesRef: ViewContainerRef;
  /** Template of NguiInviewPage. Allow users to define their own template  */
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  /** Fired when child `<ngui-list-item>` is selected */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
  @Output() escaped: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when bottom of the virtual list is in view
   * The handler of this event must call `$event.addItems(items: Array<any>)` to fill contents
   * If not, only the first page is loaded, and rest of the pages won't be loaded;
   *
   * ### example
   * ```ts
   * <ngui-virtual-list (bottomInview)="loadItems($event)">
   *   <ng-template let-items="items">
   *     <div *ngIf="items else noItems">
   *        <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
   *     </div>
   *     <ng-template #noItems>Loading</ng-template>
   *   </ng-template>
   * </ngui-virtual-list>
   * ```
   */
  @Output() bottomInview: EventEmitter<any> = new EventEmitter();

  /** The last NguiInviewPageComponent being inserted */
  inviewPage: ComponentRef<NguiInviewPageComponent>;
  _focused = false;
  /** Indicates if a page is still loading */
  isListLoading: boolean;
  inviewPages: Array<ComponentRef<NguiInviewPageComponent>> = [];

  constructor(
    public renderer: Renderer2,
    public element: ElementRef,
    public dynamicComponentService: DynamicComponentService,
    public cdr: ChangeDetectorRef
  ) {}

  /** Check if necessary input and output is provided */
  ngAfterViewInit(): void {
    if (!this.template || !this.bottomInview.observers.length) {
      console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
    }
  }

  /**
   * When the bottom is inview port, this function is called
   * It will insert a dynamicall created NguiInviewPageComponent with the given template.
   * It will also fires (bottomInview) event, so that user can fill up items for the page.
   */
  addAnInviewPageToPages(): void {
    if (!this.isListLoading) {
      this.isListLoading = true;

      this.inviewPage =
        this.dynamicComponentService.createComponent(NguiInviewPageComponent, this.pagesRef);
      this.dynamicComponentService.insertComponent(this.inviewPage);

      this.inviewPage.instance.template = this.template;
      this.inviewPages.push(this.inviewPage);

      this.bottomInview.emit(this); // fire event, so that user can load items
    } else {
      console.log('Already a page being inserted, skipping adding a page');
    }
  }

  // set items of NguiInviewPageComponent
  addList(items: Array<any>): void {
    this.isListLoading = false;
    console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
    this.inviewPage.instance.setItems(items);
  }

}
