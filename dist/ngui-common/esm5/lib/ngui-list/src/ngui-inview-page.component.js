/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            var /** @type {?} */ height = this.element.nativeElement.getBoundingClientRect().height;
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
                },] },
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
function NguiInviewPageComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd1aS9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0VyQixpQ0FDVSxTQUNBLFVBQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTztRQUNQLGFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBSyxHQUFMLEtBQUs7Ozs7dUJBYkwsS0FBSzs7OzsyQkFFVyxFQUFFO0tBWXZCO0lBRUw7O09BRUc7Ozs7O0lBQ0gsOENBQVk7Ozs7SUFBWjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDNUI7S0FDRjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDckU7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDdkI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw0Q0FBVTs7OztJQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBRW5ELHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBSyxNQUFNLE9BQUksQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDNUI7U0FDRjtLQUNGOzs7OztJQUVELDBDQUFROzs7O0lBQVIsVUFBUyxLQUFpQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtLQUNGOztnQkFuR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxtckJBaUJUO29CQUNELE1BQU0sRUFBRSxDQUFDLGtDQUVSLENBQUM7aUJBQ0g7Ozs7Z0JBL0NDLFVBQVU7Z0JBSVYsU0FBUztnQkFQVCxpQkFBaUI7OzsyQkFzRGhCLFlBQVksU0FBQyxXQUFXO3dCQUl4QixLQUFLOztrQ0EzRFI7O1NBb0RhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQSBibG9jayBvZiBjb21wb25lbnQgdGhhdCBsaXN0ZW5zIHRvIGluVmlldyBhbmQgb3V0VmlldyBldmVudHMsXHJcbiAqIHNvIHRoYXQgaXQgZW1wdGllcyBjb250ZW50cyB3aGVuIG91dCBvZiB2aWV3IGFmdGVyIGJhY2t1cCBpdGVtc1xyXG4gKiBhbmQgcmVzdG9yZXMgdGhlIGNvbnRlbnRzIHdoZW4gaW4gdmlld1xyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbnZpZXctcGFnZSBbaXRlbXNdPVwiaXRlbXNcIj5cclxuICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICogICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgICA8L2Rpdj5cclxuICogICA8L25nLXRlbXBsYXRlPlxyXG4gKiA8L25ndWktaW52aWV3LXBhZ2U+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldy1wYWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImludmlldy1wYWdlIGNvbnRlbnRzXCJcclxuICAgICAgKG5ndWlJbnZpZXcpPVwicmVzdG9yZUl0ZW1zKClcIlxyXG4gICAgICAobmd1aU91dHZpZXcpPVwiZW1wdHlJdGVtcygpXCI+XHJcbiAgICAgIDwhLS0gYWRkIGJsYW5rIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAgLS0+XHJcbiAgICAgIDwhLS0gbm8gbWF0Y2ggZm91bmQgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGV8fGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntpdGVtczogaXRlbXMsIG91dFZpZXc6IG91dFZpZXd9XCI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwib3V0Vmlld1wiPnt7IGl0ZW1zQmFja3VwLmxlbmd0aCB9fSBpdGVtcyBoaWRkZW48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+IEVycm9yOiByZXF1aXJlcyBbaXRlbXNdIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+IEVycm9yOiByZXF1aXJlcyAmbHQ7bmctdGVtcGxhdGU+PC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgY29udGVudHMgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvLyBASW5wdXQoJ3RlbXBsYXRlJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgYXJlIHVzZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xyXG5cclxuICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgb3V0VmlldyA9IGZhbHNlO1xyXG4gIC8qKiBUaGUgY29weSBvZiBpdGVtcy4gVGhpcyBpcyBzZXQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgaXRlbXNCYWNrdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgaGVpZ2h0IG9mIGl0IHJlbWFpbnMgdGhlIHNhbWUgZXZlbiB3aGVuIGl0ZW1zIGdldCBlbXB0eSBvdXQuXHJcbiAgICovXHJcbiAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgZGVzdHJveWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSBpdGVtcyB3aGVuIGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm91dFZpZXcpIHtcclxuICAgICAgdGhpcy5vdXRWaWV3ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXNCYWNrdXAgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRlbnRzRWwgPVxyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW52aWV3LXBhZ2UuY29udGVudHMnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50Lm5nT25EZXN0cm95KCkgaXMgY2FsbGVkJyk7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbXB0eSBpdGVtcyB3aGVuIG5vdCBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgbm90IHJlbmRlcmVkXHJcbiAgICovXHJcbiAgZW1wdHlJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuY29udGVudHNFbCAmJiAhdGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIC8vIHNldCBoZWlnaHQgYmVmb3JlIGVtcHR5aW5nIGNvbnRlbnRzXHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcclxuXHJcbiAgICAgIHRoaXMub3V0VmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXMgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zID0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5zZXRJdGVtcygpIGlzIGNhbGxlZCB3aXRoJywgaXRlbXMpO1xyXG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19