/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Renderer2, TemplateRef } from '@angular/core';
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
var NguiInviewPageComponent = /** @class */ (function () {
    function NguiInviewPageComponent(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /**
         * Indicates that the page of out of viewport
         */
        this.outView = false;
        /**
         * The copy of items. This is set when this element is out of viewport
         */
        this.itemsBackup = [];
    }
    /**
     * Restore items when in viewport, so that elements are rendered
     */
    /**
     * Restore items when in viewport, so that elements are rendered
     * @return {?}
     */
    NguiInviewPageComponent.prototype.restoreItems = /**
     * Restore items when in viewport, so that elements are rendered
     * @return {?}
     */
    function () {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    NguiInviewPageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    };
    /**
     * @return {?}
     */
    NguiInviewPageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    };
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    NguiInviewPageComponent.prototype.emptyItems = /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    function () {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
            /** @type {?} */
            var height = this.element.nativeElement.getBoundingClientRect().height;
            this.renderer.setStyle(this.contentsEl, 'height', height + "px");
            this.outView = true;
            this.itemsBackup = Array.from(this.items || []);
            this.items = undefined;
            if (!this.destroyed) {
                this.cdRef.detectChanges();
            }
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    NguiInviewPageComponent.prototype.setItems = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (!this.destroyed) {
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    };
    NguiInviewPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-inview-page',
                    template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
                    styles: ["\n    :host {display: block}\n  "]
                }] }
    ];
    /** @nocollapse */
    NguiInviewPageComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    NguiInviewPageComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        items: [{ type: Input }]
    };
    return NguiInviewPageComponent;
}());
export { NguiInviewPageComponent };
if (false) {
    /**
     * Allow users to change the contents
     * @type {?}
     */
    NguiInviewPageComponent.prototype.template;
    /**
     * List of elements that are used to render this element
     * @type {?}
     */
    NguiInviewPageComponent.prototype.items;
    /**
     * IntersectionObserver options
     * @type {?}
     */
    NguiInviewPageComponent.prototype.options;
    /**
     * Indicates that the page of out of viewport
     * @type {?}
     */
    NguiInviewPageComponent.prototype.outView;
    /**
     * The copy of items. This is set when this element is out of viewport
     * @type {?}
     */
    NguiInviewPageComponent.prototype.itemsBackup;
    /**
     * The first element of this component.
     * The height of it remains the same even when items get empty out.
     * @type {?}
     */
    NguiInviewPageComponent.prototype.contentsEl;
    /** @type {?} */
    NguiInviewPageComponent.prototype.destroyed;
    /** @type {?} */
    NguiInviewPageComponent.prototype.element;
    /** @type {?} */
    NguiInviewPageComponent.prototype.renderer;
    /** @type {?} */
    NguiInviewPageComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd1aS9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnZCO0lBOENFLGlDQUNVLE9BQW1CLEVBQ25CLFFBQW1CLEVBQ25CLEtBQXdCO1FBRnhCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFtQjs7OztRQWJsQyxZQUFPLEdBQUcsS0FBSyxDQUFDOzs7O1FBRWhCLGdCQUFXLEdBQWUsRUFBRSxDQUFDO0lBWXpCLENBQUM7SUFFTDs7T0FFRzs7Ozs7SUFDSCw4Q0FBWTs7OztJQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw0Q0FBVTs7OztJQUFWO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFOzs7Z0JBRTVDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU07WUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUssTUFBTSxPQUFJLENBQUMsQ0FBQztZQUVqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUM1QjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwwQ0FBUTs7OztJQUFSLFVBQVMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Z0JBbkdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsbXJCQWlCVDs2QkFDUSxrQ0FFUjtpQkFDRjs7OztnQkEvQ0MsVUFBVTtnQkFJVixTQUFTO2dCQVBULGlCQUFpQjs7OzJCQXNEaEIsWUFBWSxTQUFDLFdBQVc7d0JBSXhCLEtBQUs7O0lBc0VSLDhCQUFDO0NBQUEsQUFyR0QsSUFxR0M7U0E3RVksdUJBQXVCOzs7Ozs7SUFHbEMsMkNBQXNEOzs7OztJQUl0RCx3Q0FBMkI7Ozs7O0lBRzNCLDBDQUFhOzs7OztJQUViLDBDQUFnQjs7Ozs7SUFFaEIsOENBQTZCOzs7Ozs7SUFLN0IsNkNBQXdCOztJQUN4Qiw0Q0FBbUI7O0lBR2pCLDBDQUEyQjs7SUFDM0IsMkNBQTJCOztJQUMzQix3Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEEgYmxvY2sgb2YgY29tcG9uZW50IHRoYXQgbGlzdGVucyB0byBpblZpZXcgYW5kIG91dFZpZXcgZXZlbnRzLFxyXG4gKiBzbyB0aGF0IGl0IGVtcHRpZXMgY29udGVudHMgd2hlbiBvdXQgb2YgdmlldyBhZnRlciBiYWNrdXAgaXRlbXNcclxuICogYW5kIHJlc3RvcmVzIHRoZSBjb250ZW50cyB3aGVuIGluIHZpZXdcclxuICpcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktaW52aWV3LXBhZ2UgW2l0ZW1zXT1cIml0ZW1zXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAqICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLWludmlldy1wYWdlPlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1pbnZpZXctcGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJpbnZpZXctcGFnZSBjb250ZW50c1wiXHJcbiAgICAgIChuZ3VpSW52aWV3KT1cInJlc3RvcmVJdGVtcygpXCJcclxuICAgICAgKG5ndWlPdXR2aWV3KT1cImVtcHR5SXRlbXMoKVwiPlxyXG4gICAgICA8IS0tIGFkZCBibGFuayBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gIC0tPlxyXG4gICAgICA8IS0tIG5vIG1hdGNoIGZvdW5kIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlfHxkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbXM6IGl0ZW1zLCBvdXRWaWV3OiBvdXRWaWV3fVwiPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPGRpdiAqbmdJZj1cIm91dFZpZXdcIj57eyBpdGVtc0JhY2t1cC5sZW5ndGggfX0gaXRlbXMgaGlkZGVuPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPiBFcnJvcjogcmVxdWlyZXMgW2l0ZW1zXSA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPiBFcnJvcjogcmVxdWlyZXMgJmx0O25nLXRlbXBsYXRlPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld1BhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKiBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGNvbnRlbnRzICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLy8gQElucHV0KCd0ZW1wbGF0ZScpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKiogTGlzdCBvZiBlbGVtZW50cyB0aGF0IGFyZSB1c2VkIHRvIHJlbmRlciB0aGlzIGVsZW1lbnQgKi9cclxuICBASW5wdXQoKSBpdGVtczogQXJyYXk8YW55PjtcclxuXHJcbiAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIEluZGljYXRlcyB0aGF0IHRoZSBwYWdlIG9mIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIG91dFZpZXcgPSBmYWxzZTtcclxuICAvKiogVGhlIGNvcHkgb2YgaXRlbXMuIFRoaXMgaXMgc2V0IHdoZW4gdGhpcyBlbGVtZW50IGlzIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIGl0ZW1zQmFja3VwOiBBcnJheTxhbnk+ID0gW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuXHJcbiAgICogVGhlIGhlaWdodCBvZiBpdCByZW1haW5zIHRoZSBzYW1lIGV2ZW4gd2hlbiBpdGVtcyBnZXQgZW1wdHkgb3V0LlxyXG4gICAqL1xyXG4gIGNvbnRlbnRzRWw6IEhUTUxFbGVtZW50O1xyXG4gIGRlc3Ryb3llZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RvcmUgaXRlbXMgd2hlbiBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgcmVuZGVyZWRcclxuICAgKi9cclxuICByZXN0b3JlSXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIHRoaXMub3V0VmlldyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLml0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zQmFja3VwIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCB1bmRlZmluZWQpO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZW50c0VsID1cclxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmludmlldy1wYWdlLmNvbnRlbnRzJyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5uZ09uRGVzdHJveSgpIGlzIGNhbGxlZCcpO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1wdHkgaXRlbXMgd2hlbiBub3QgaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIG5vdCByZW5kZXJlZFxyXG4gICAqL1xyXG4gIGVtcHR5SXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmNvbnRlbnRzRWwgJiYgIXRoaXMub3V0Vmlldykge1xyXG4gICAgICAvLyBzZXQgaGVpZ2h0IGJlZm9yZSBlbXB0eWluZyBjb250ZW50c1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcblxyXG4gICAgICB0aGlzLm91dFZpZXcgPSB0cnVlO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtcyA9IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJdGVtcyhpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTmd1aUludmlld1BhZ2VDb21wb25lbnQuc2V0SXRlbXMoKSBpcyBjYWxsZWQgd2l0aCcsIGl0ZW1zKTtcclxuICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==