import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { DynamicComponentService } from '../../utils';
import { NguiInviewPageComponent } from './ngui-inview-page.component';

/**
 * Virtual List
 *
 * The <ngui-inview ..> inserts <ngui-inview-page> into
 * <div #pages> when it is in viewport
 * When it's inserted, it will be pushed down, which makes it out of viewport.
 * User scrolls down to see the bottom of the list,
 * then it will insert another <ngui-inview-page> again.
 *
 * <ngui-inview-page> listens to (nguiInview) and (nguiOutview) events,
 * when <ngui-inview-page> is out of view port, it empties out the contents.
 * and it restores back the contents when it is in viewport again.
 */
@Component({
  selector: 'ngui-virtual-list',
  template: `
    <!-- hold multiple <ngui-inview-page> -->
    <div #pages></div>
    <!-- insert <ngui-inview-page> into #pages -->
    <ngui-inview (inview)="addInviewPageToPages()"></ngui-inview>
  `,
  styles: [`
    :host {display: block}
  `]
})
export class NguiVirtualListComponent implements OnInit {

  // the container NguiInviewPage will be inserted
  @ViewChild('pages', {read: ViewContainerRef}) pagesRef: ViewContainerRef;

  /** Template of NguiInviewPage. Allow users to define their own template */
  @Input() template: TemplateRef<any>;

  /**
   * Event fired when bottom of the virtual list is in view
   * The handler of this event must;
   *  - Call `$event.addItems(items: Array<any>)` to fill contents
   * If not, only the first page is loaded, and rest of the pages won't be loaded;
   *
   * @example
   * <ngui-virtual-list [template]="myTemplate" (bottomInview)="loadItems($event)">
   * </ngui-virtual-list>
   *
   * <ng-template #myTemplate let-items="items">
   *   <div *ngIf="items else noItems">
   *      <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
   *   </div>
   *   <ng-template #noItems>Loading</ng-template>
   * </ng-template>
   */
  @Output() bottomInview: EventEmitter<any> = new EventEmitter();

  /** The last NguiInviewPageComponent being inserted */
  compLoading: NguiInviewPageComponent;
  /** Indicates if a page is still loading */
  isCompLoading: boolean;

  constructor(
    public element: ElementRef,
    public dynamicComponentService: DynamicComponentService
  ) {}

  /** Check if necessary input and output is provided */
  ngOnInit(): void {
    if (!this.template || !this.bottomInview.observers.length) {
      console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
    }
  }

  /**
   * When the bottom is inview port, this function is called
   * It will insert a dynamicall created NguiInviewPageComponent with the given template.
   * It will also fires (bottomInview) event, so that user can fill up items for the page.
   */
  addInviewPageToPages(): void {
    if (!this.isCompLoading) {
      const compRef =
        this.dynamicComponentService.createComponent(NguiInviewPageComponent, this.pagesRef);
      this.dynamicComponentService.insertComponent(compRef);

      this.isCompLoading = true;
      this.compLoading = compRef.instance;
      this.compLoading.template = this.template;

      this.bottomInview.emit(this); // Fire evnet, so that user can load items
    } else {
      console.log('Already a page being inserted, skipping adding a page');
    }
  }

  // set items of NguiInviewPageComponent
  addItems(items: Array<any>): void {
    this.compLoading.setItems(items);
    this.isCompLoading = false;
  }

}
