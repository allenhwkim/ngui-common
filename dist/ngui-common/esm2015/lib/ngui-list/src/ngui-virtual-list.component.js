/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
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
function NguiVirtualListComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q3ZFLE1BQU07Ozs7Ozs7SUFxQ0osWUFDUyxVQUNBLFNBQ0EseUJBQ0E7UUFIQSxhQUFRLEdBQVIsUUFBUTtRQUNSLFlBQU8sR0FBUCxPQUFPO1FBQ1AsNEJBQXVCLEdBQXZCLHVCQUF1QjtRQUN2QixRQUFHLEdBQUgsR0FBRzs7Ozt3QkFsQzRCLElBQUksWUFBWSxFQUFFOzs7O3VCQUVuQixJQUFJLFlBQVksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQW1CYixJQUFJLFlBQVksRUFBRTt3QkFJbkQsS0FBSzsyQkFHNEMsRUFBRTtLQU8xRDs7Ozs7SUFHSixlQUFlO1FBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDN0U7S0FDRjs7Ozs7OztJQU9ELHNCQUFzQjtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxVQUFVO2dCQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0Y7Ozs7O0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7OztZQTlGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQzs7R0FFUixDQUFDO2FBQ0g7Ozs7WUEvQ0MsU0FBUztZQUhULFVBQVU7WUFTSCx1QkFBdUI7WUFiOUIsaUJBQWlCOzs7dUJBMERoQixTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO3VCQUUzQyxZQUFZLFNBQUMsV0FBVzt1QkFFeEIsTUFBTTtzQkFFTixNQUFNOzJCQW1CTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVmlydHVhbCBMaXN0XHJcbiAqXHJcbiAqIFRoZSBgPG5ndWktaW52aWV3IC4uPmAgaW5zZXJ0cyA8bmd1aS1pbnZpZXctcGFnZT4gaW50b1xyXG4gKiBgPGRpdiAjcGFnZXM+YCB3aGVuIGl0IGlzIGluIHZpZXdwb3J0XHJcbiAqIFdoZW4gaXQncyBpbnNlcnRlZCwgaXQgd2lsbCBiZSBwdXNoZWQgZG93biwgd2hpY2ggbWFrZXMgaXQgb3V0IG9mIHZpZXdwb3J0LlxyXG4gKiBVc2VyIHNjcm9sbHMgZG93biB0byBzZWUgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCxcclxuICogdGhlbiBpdCB3aWxsIGluc2VydCBhbm90aGVyIGA8bmd1aS1pbnZpZXctcGFnZT5gIGFnYWluLlxyXG4gKlxyXG4gKiA8bmd1aS1pbnZpZXctcGFnZT4gbGlzdGVucyB0byAobmd1aUludmlldykgYW5kIChuZ3VpT3V0dmlldykgZXZlbnRzLFxyXG4gKiB3aGVuIDxuZ3VpLWludmlldy1wYWdlPiBpcyBvdXQgb2YgdmlldyBwb3J0LCBpdCBlbXB0aWVzIG91dCB0aGUgY29udGVudHMuXHJcbiAqIGFuZCBpdCByZXN0b3JlcyBiYWNrIHRoZSBjb250ZW50cyB3aGVuIGl0IGlzIGluIHZpZXdwb3J0IGFnYWluLlxyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICogICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLXZpcnR1YWwtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3VpLXZpcnR1YWwtbGlzdFwiXHJcbiAgICAgIChmb2N1cyk9XCJfZm9jdXNlZCA9IHRydWVcIlxyXG4gICAgICAoY2xpY2spPVwiX2ZvY3VzZWQgPSB0cnVlXCI+XHJcbiAgICAgIDwhLS0gaG9sZCBtdWx0aXBsZSA8bmd1aS1pbnZpZXctcGFnZT4gLS0+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8IS0tIGluc2VydCA8bmd1aS1pbnZpZXctcGFnZT4gaW50byAjcGFnZXMgLS0+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIC8qKiB0aGUgY29udGFpbmVyIE5ndWlJbnZpZXdQYWdlIHdpbGwgYmUgaW5zZXJ0ZWQgKi9cclxuICBAVmlld0NoaWxkKCdwYWdlcycsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcGFnZXNSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gYm90dG9tIG9mIHRoZSB2aXJ0dWFsIGxpc3QgaXMgaW4gdmlld1xyXG4gICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICogSWYgbm90LCBvbmx5IHRoZSBmaXJzdCBwYWdlIGlzIGxvYWRlZCwgYW5kIHJlc3Qgb2YgdGhlIHBhZ2VzIHdvbid0IGJlIGxvYWRlZDtcclxuICAgKlxyXG4gICAqICMjIyBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgKiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAgICogICAgIDwvZGl2PlxyXG4gICAqICAgICA8bmctdGVtcGxhdGUgI25vSXRlbXM+TG9hZGluZzwvbmctdGVtcGxhdGU+XHJcbiAgICogICA8L25nLXRlbXBsYXRlPlxyXG4gICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdHRvbUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gIGludmlld1BhZ2U6IENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD47XHJcbiAgX2ZvY3VzZWQgPSBmYWxzZTtcclxuICAvKiogSW5kaWNhdGVzIGlmIGEgcGFnZSBpcyBzdGlsbCBsb2FkaW5nICovXHJcbiAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICBpbnZpZXdQYWdlczogQXJyYXk8Q29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50Pj4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudGVtcGxhdGUgfHwgIXRoaXMuYm90dG9tSW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignPG5ndWktdmlydHVhbC1saXN0PiByZXF1aXJlcyBbdGVtcGxhdGVdIGFuZCB7Ym90dG9tSW52aWV3KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYm90dG9tIGlzIGludmlldyBwb3J0LCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxyXG4gICAqIEl0IHdpbGwgaW5zZXJ0IGEgZHluYW1pY2FsbCBjcmVhdGVkIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IHdpdGggdGhlIGdpdmVuIHRlbXBsYXRlLlxyXG4gICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgKi9cclxuICBhZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzTGlzdExvYWRpbmcpIHtcclxuICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZSA9XHJcbiAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVDb21wb25lbnQoTmd1aUludmlld1BhZ2VDb21wb25lbnQsIHRoaXMucGFnZXNSZWYpO1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmluc2VydENvbXBvbmVudCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgICAgdGhpcy5pbnZpZXdQYWdlcy5wdXNoKHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmJvdHRvbUludmlldy5lbWl0KHRoaXMpOyAvLyBmaXJlIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGxvYWQgaXRlbXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBbHJlYWR5IGEgcGFnZSBiZWluZyBpbnNlcnRlZCwgc2tpcHBpbmcgYWRkaW5nIGEgcGFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=