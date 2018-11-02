/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
export class NguiVirtualListComponent {
    /**
     * @param {?} renderer
     * @param {?} element
     * @param {?} dynamicComponentService
     * @param {?} cdr
     */
    constructor(renderer, element, dynamicComponentService, cdr) {
        this.renderer = renderer;
        this.element = element;
        this.dynamicComponentService = dynamicComponentService;
        this.cdr = cdr;
        /**
         * Fired when child `<ngui-list-item>` is selected
         */
        this.selected = new EventEmitter();
        /**
         * Fired when `ESC` key is pressed from `<ngui-list-item>`
         */
        this.escaped = new EventEmitter();
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
        this.bottomInview = new EventEmitter();
        this._focused = false;
        this.inviewPages = [];
    }
    /**
     * Check if necessary input and output is provided
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    }
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     * @return {?}
     */
    addAnInviewPageToPages() {
        if (!this.isListLoading) {
            this.isListLoading = true;
            this.inviewPage =
                this.dynamicComponentService.createComponent(NguiInviewPageComponent, this.pagesRef);
            this.dynamicComponentService.insertComponent(this.inviewPage);
            this.inviewPage.instance.template = this.template;
            this.inviewPages.push(this.inviewPage);
            this.bottomInview.emit(this); // fire event, so that user can load items
        }
        else {
            console.log('Already a page being inserted, skipping adding a page');
        }
    }
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    addList(items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    }
}
NguiVirtualListComponent.decorators = [
    { type: Component, args: [{
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
            }] }
];
/** @nocollapse */
NguiVirtualListComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: DynamicComponentService },
    { type: ChangeDetectorRef }
];
NguiVirtualListComponent.propDecorators = {
    pagesRef: [{ type: ViewChild, args: ['pages', { read: ViewContainerRef },] }],
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    selected: [{ type: Output }],
    escaped: [{ type: Output }],
    bottomInview: [{ type: Output }]
};
if (false) {
    /**
     * the container NguiInviewPage will be inserted
     * @type {?}
     */
    NguiVirtualListComponent.prototype.pagesRef;
    /**
     * Template of NguiInviewPage. Allow users to define their own template
     * @type {?}
     */
    NguiVirtualListComponent.prototype.template;
    /**
     * Fired when child `<ngui-list-item>` is selected
     * @type {?}
     */
    NguiVirtualListComponent.prototype.selected;
    /**
     * Fired when `ESC` key is pressed from `<ngui-list-item>`
     * @type {?}
     */
    NguiVirtualListComponent.prototype.escaped;
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
     * @type {?}
     */
    NguiVirtualListComponent.prototype.bottomInview;
    /**
     * The last NguiInviewPageComponent being inserted
     * @type {?}
     */
    NguiVirtualListComponent.prototype.inviewPage;
    /** @type {?} */
    NguiVirtualListComponent.prototype._focused;
    /**
     * Indicates if a page is still loading
     * @type {?}
     */
    NguiVirtualListComponent.prototype.isListLoading;
    /** @type {?} */
    NguiVirtualListComponent.prototype.inviewPages;
    /** @type {?} */
    NguiVirtualListComponent.prototype.renderer;
    /** @type {?} */
    NguiVirtualListComponent.prototype.element;
    /** @type {?} */
    NguiVirtualListComponent.prototype.dynamicComponentService;
    /** @type {?} */
    NguiVirtualListComponent.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q3ZFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7Ozs7SUFxQ25DLFlBQ1MsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsdUJBQWdELEVBQ2hELEdBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFFBQUcsR0FBSCxHQUFHLENBQW1COzs7O1FBbENyQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7UUFFakQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQmhELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJL0QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixnQkFBVyxHQUFpRCxFQUFFLENBQUM7SUFPNUQsQ0FBQzs7Ozs7SUFHSixlQUFlO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDekQsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQzs7Ozs7OztJQU9ELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUUxQixJQUFJLENBQUMsVUFBVTtnQkFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7U0FDekU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7OztJQUdELE9BQU8sQ0FBQyxLQUFpQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7OztZQTlGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDt5QkFDUTs7R0FFUjthQUNGOzs7O1lBL0NDLFNBQVM7WUFIVCxVQUFVO1lBU0gsdUJBQXVCO1lBYjlCLGlCQUFpQjs7O3VCQTBEaEIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzt1QkFFM0MsWUFBWSxTQUFDLFdBQVc7dUJBRXhCLE1BQU07c0JBRU4sTUFBTTsyQkFtQk4sTUFBTTs7Ozs7OztJQXpCUCw0Q0FBeUU7Ozs7O0lBRXpFLDRDQUFzRDs7Ozs7SUFFdEQsNENBQTJEOzs7OztJQUUzRCwyQ0FBMEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQjFELGdEQUErRDs7Ozs7SUFHL0QsOENBQWtEOztJQUNsRCw0Q0FBaUI7Ozs7O0lBRWpCLGlEQUF1Qjs7SUFDdkIsK0NBQStEOztJQUc3RCw0Q0FBMEI7O0lBQzFCLDJDQUEwQjs7SUFDMUIsMkRBQXVEOztJQUN2RCx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd1aUludmlld1BhZ2VDb21wb25lbnQgfSBmcm9tICcuL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBWaXJ0dWFsIExpc3RcclxuICpcclxuICogVGhlIGA8bmd1aS1pbnZpZXcgLi4+YCBpbnNlcnRzIDxuZ3VpLWludmlldy1wYWdlPiBpbnRvXHJcbiAqIGA8ZGl2ICNwYWdlcz5gIHdoZW4gaXQgaXMgaW4gdmlld3BvcnRcclxuICogV2hlbiBpdCdzIGluc2VydGVkLCBpdCB3aWxsIGJlIHB1c2hlZCBkb3duLCB3aGljaCBtYWtlcyBpdCBvdXQgb2Ygdmlld3BvcnQuXHJcbiAqIFVzZXIgc2Nyb2xscyBkb3duIHRvIHNlZSB0aGUgYm90dG9tIG9mIHRoZSBsaXN0LFxyXG4gKiB0aGVuIGl0IHdpbGwgaW5zZXJ0IGFub3RoZXIgYDxuZ3VpLWludmlldy1wYWdlPmAgYWdhaW4uXHJcbiAqXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlPiBsaXN0ZW5zIHRvIChuZ3VpSW52aWV3KSBhbmQgKG5ndWlPdXR2aWV3KSBldmVudHMsXHJcbiAqIHdoZW4gPG5ndWktaW52aWV3LXBhZ2U+IGlzIG91dCBvZiB2aWV3IHBvcnQsIGl0IGVtcHRpZXMgb3V0IHRoZSBjb250ZW50cy5cclxuICogYW5kIGl0IHJlc3RvcmVzIGJhY2sgdGhlIGNvbnRlbnRzIHdoZW4gaXQgaXMgaW4gdmlld3BvcnQgYWdhaW4uXHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+TG9hZGluZzwvZGl2PlxyXG4gKiAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktdmlydHVhbC1saXN0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm5ndWktdmlydHVhbC1saXN0XCJcclxuICAgICAgKGZvY3VzKT1cIl9mb2N1c2VkID0gdHJ1ZVwiXHJcbiAgICAgIChjbGljayk9XCJfZm9jdXNlZCA9IHRydWVcIj5cclxuICAgICAgPCEtLSBob2xkIG11bHRpcGxlIDxuZ3VpLWludmlldy1wYWdlPiAtLT5cclxuICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDwhLS0gaW5zZXJ0IDxuZ3VpLWludmlldy1wYWdlPiBpbnRvICNwYWdlcyAtLT5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3BhZ2VzJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwYWdlc1JlZjogVmlld0NvbnRhaW5lclJlZjtcclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZmlyZWQgd2hlbiBib3R0b20gb2YgdGhlIHZpcnR1YWwgbGlzdCBpcyBpbiB2aWV3XHJcbiAgICogVGhlIGhhbmRsZXIgb2YgdGhpcyBldmVudCBtdXN0IGNhbGwgYCRldmVudC5hZGRJdGVtcyhpdGVtczogQXJyYXk8YW55PilgIHRvIGZpbGwgY29udGVudHNcclxuICAgKiBJZiBub3QsIG9ubHkgdGhlIGZpcnN0IHBhZ2UgaXMgbG9hZGVkLCBhbmQgcmVzdCBvZiB0aGUgcGFnZXMgd29uJ3QgYmUgbG9hZGVkO1xyXG4gICAqXHJcbiAgICogIyMjIGV4YW1wbGVcclxuICAgKiBgYGB0c1xyXG4gICAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAgICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICAgKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gICAqICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgKiAgICAgPC9kaXY+XHJcbiAgICogICAgIDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5Mb2FkaW5nPC9uZy10ZW1wbGF0ZT5cclxuICAgKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICAgKiBgYGBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYm90dG9tSW52aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqIFRoZSBsYXN0IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGJlaW5nIGluc2VydGVkICovXHJcbiAgaW52aWV3UGFnZTogQ29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50PjtcclxuICBfZm9jdXNlZCA9IGZhbHNlO1xyXG4gIC8qKiBJbmRpY2F0ZXMgaWYgYSBwYWdlIGlzIHN0aWxsIGxvYWRpbmcgKi9cclxuICBpc0xpc3RMb2FkaW5nOiBib29sZWFuO1xyXG4gIGludmlld1BhZ2VzOiBBcnJheTxDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgZHluYW1pY0NvbXBvbmVudFNlcnZpY2U6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlLFxyXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKiBDaGVjayBpZiBuZWNlc3NhcnkgaW5wdXQgYW5kIG91dHB1dCBpcyBwcm92aWRlZCAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy50ZW1wbGF0ZSB8fCAhdGhpcy5ib3R0b21JbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCc8bmd1aS12aXJ0dWFsLWxpc3Q+IHJlcXVpcmVzIFt0ZW1wbGF0ZV0gYW5kIHtib3R0b21JbnZpZXcpJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBib3R0b20gaXMgaW52aWV3IHBvcnQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgICogSXQgd2lsbCBpbnNlcnQgYSBkeW5hbWljYWxsIGNyZWF0ZWQgTmd1aUludmlld1BhZ2VDb21wb25lbnQgd2l0aCB0aGUgZ2l2ZW4gdGVtcGxhdGUuXHJcbiAgICogSXQgd2lsbCBhbHNvIGZpcmVzIChib3R0b21JbnZpZXcpIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGZpbGwgdXAgaXRlbXMgZm9yIHRoZSBwYWdlLlxyXG4gICAqL1xyXG4gIGFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNMaXN0TG9hZGluZykge1xyXG4gICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlID1cclxuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZUNvbXBvbmVudChOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCwgdGhpcy5wYWdlc1JlZik7XHJcbiAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuaW5zZXJ0Q29tcG9uZW50KHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgICB0aGlzLmludmlld1BhZ2VzLnB1c2godGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuYm90dG9tSW52aWV3LmVtaXQodGhpcyk7IC8vIGZpcmUgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gbG9hZCBpdGVtc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FscmVhZHkgYSBwYWdlIGJlaW5nIGluc2VydGVkLCBza2lwcGluZyBhZGRpbmcgYSBwYWdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaXRlbXMgb2YgTmd1aUludmlld1BhZ2VDb21wb25lbnRcclxuICBhZGRMaXN0KGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGl0ZW1zKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==