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
export class NguiInviewPageComponent {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} cdRef
     */
    constructor(element, renderer, cdRef) {
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
     * @return {?}
     */
    restoreItems() {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    }
    /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    emptyItems() {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
            /** @type {?} */
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
    /**
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        if (!this.destroyed) {
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    }
}
NguiInviewPageComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-inview-page',
                template: `
    <div class="inview-page contents"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <!-- add blank ngui-list-item by condition  -->
      <!-- no match found ngui-list-item by condition -->
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
      <div *ngIf="outView">{{ itemsBackup.length }} items hidden</div>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `,
                styles: [`
    :host {display: block}
  `]
            }] }
];
/** @nocollapse */
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NguiInviewPageComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    items: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd1aS9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQ3ZCLE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQXNCbEMsWUFDVSxPQUFtQixFQUNuQixRQUFtQixFQUNuQixLQUF3QjtRQUZ4QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7UUFibEMsWUFBTyxHQUFHLEtBQUssQ0FBQzs7OztRQUVoQixnQkFBVyxHQUFlLEVBQUUsQ0FBQztJQVl6QixDQUFDOzs7OztJQUtMLFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7O0lBRUQsV0FBVztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDOzs7OztJQUtELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7OztrQkFFNUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTTtZQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQW5HRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDt5QkFDUTs7R0FFUjthQUNGOzs7O1lBL0NDLFVBQVU7WUFJVixTQUFTO1lBUFQsaUJBQWlCOzs7dUJBc0RoQixZQUFZLFNBQUMsV0FBVztvQkFJeEIsS0FBSzs7Ozs7OztJQUpOLDJDQUFzRDs7Ozs7SUFJdEQsd0NBQTJCOzs7OztJQUczQiwwQ0FBYTs7Ozs7SUFFYiwwQ0FBZ0I7Ozs7O0lBRWhCLDhDQUE2Qjs7Ozs7O0lBSzdCLDZDQUF3Qjs7SUFDeEIsNENBQW1COztJQUdqQiwwQ0FBMkI7O0lBQzNCLDJDQUEyQjs7SUFDM0Isd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3LXBhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW52aWV3LXBhZ2UgY29udGVudHNcIlxyXG4gICAgICAobmd1aUludmlldyk9XCJyZXN0b3JlSXRlbXMoKVwiXHJcbiAgICAgIChuZ3VpT3V0dmlldyk9XCJlbXB0eUl0ZW1zKClcIj5cclxuICAgICAgPCEtLSBhZGQgYmxhbmsgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uICAtLT5cclxuICAgICAgPCEtLSBubyBtYXRjaCBmb3VuZCBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXx8ZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW1zOiBpdGVtcywgb3V0Vmlldzogb3V0Vmlld31cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJvdXRWaWV3XCI+e3sgaXRlbXNCYWNrdXAubGVuZ3RoIH19IGl0ZW1zIGhpZGRlbjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj4gRXJyb3I6IHJlcXVpcmVzIFtpdGVtc10gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj4gRXJyb3I6IHJlcXVpcmVzICZsdDtuZy10ZW1wbGF0ZT48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBjb250ZW50cyAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8vIEBJbnB1dCgndGVtcGxhdGUnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBhcmUgdXNlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50ICovXHJcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PGFueT47XHJcblxyXG4gIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgb3B0aW9uczogYW55O1xyXG4gIC8qKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBvZiBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBvdXRWaWV3ID0gZmFsc2U7XHJcbiAgLyoqIFRoZSBjb3B5IG9mIGl0ZW1zLiBUaGlzIGlzIHNldCB3aGVuIHRoaXMgZWxlbWVudCBpcyBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBpdGVtc0JhY2t1cDogQXJyYXk8YW55PiA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoaXMgY29tcG9uZW50LlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgaXQgcmVtYWlucyB0aGUgc2FtZSBldmVuIHdoZW4gaXRlbXMgZ2V0IGVtcHR5IG91dC5cclxuICAgKi9cclxuICBjb250ZW50c0VsOiBIVE1MRWxlbWVudDtcclxuICBkZXN0cm95ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIGl0ZW1zIHdoZW4gaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIHJlbmRlcmVkXHJcbiAgICovXHJcbiAgcmVzdG9yZUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3V0Vmlldykge1xyXG4gICAgICB0aGlzLm91dFZpZXcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pdGVtcyA9IEFycmF5LmZyb20odGhpcy5pdGVtc0JhY2t1cCB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgdW5kZWZpbmVkKTtcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGVudHNFbCA9XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnZpZXctcGFnZS5jb250ZW50cycpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUludmlld1BhZ2VDb21wb25lbnQubmdPbkRlc3Ryb3koKSBpcyBjYWxsZWQnKTtcclxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHR5IGl0ZW1zIHdoZW4gbm90IGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSBub3QgcmVuZGVyZWRcclxuICAgKi9cclxuICBlbXB0eUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jb250ZW50c0VsICYmICF0aGlzLm91dFZpZXcpIHtcclxuICAgICAgLy8gc2V0IGhlaWdodCBiZWZvcmUgZW1wdHlpbmcgY29udGVudHNcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xyXG5cclxuICAgICAgdGhpcy5vdXRWaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IEFycmF5LmZyb20odGhpcy5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbXMoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50LnNldEl0ZW1zKCkgaXMgY2FsbGVkIHdpdGgnLCBpdGVtcyk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=