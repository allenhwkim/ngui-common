import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
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
import * as ɵngcc0 from '@angular/core';
export declare class NguiInviewPageComponent implements OnInit, OnDestroy {
    private element;
    private renderer;
    private cdRef;
    /** Allow users to change the contents */
    template: TemplateRef<any>;
    /** List of elements that are used to render this element */
    items: Array<any>;
    /** IntersectionObserver options */
    options: any;
    /** Indicates that the page of out of viewport */
    outView: boolean;
    /** The copy of items. This is set when this element is out of viewport */
    itemsBackup: Array<any>;
    /**
     * The first element of this component.
     * The height of it remains the same even when items get empty out.
     */
    contentsEl: HTMLElement;
    destroyed: boolean;
    constructor(element: ElementRef, renderer: Renderer2, cdRef: ChangeDetectorRef);
    /**
     * Restore items when in viewport, so that elements are rendered
     */
    restoreItems(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    emptyItems(): void;
    setItems(items: Array<any>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiInviewPageComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NguiInviewPageComponent, "ngui-inview-page", never, { "items": "items"; }, {}, ["template"], never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgZWxlbWVudDtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI7XHJcbiAgICBwcml2YXRlIGNkUmVmO1xyXG4gICAgLyoqIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgY29udGVudHMgKi9cclxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBhcmUgdXNlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50ICovXHJcbiAgICBpdGVtczogQXJyYXk8YW55PjtcclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgICBvcHRpb25zOiBhbnk7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgICBvdXRWaWV3OiBib29sZWFuO1xyXG4gICAgLyoqIFRoZSBjb3B5IG9mIGl0ZW1zLiBUaGlzIGlzIHNldCB3aGVuIHRoaXMgZWxlbWVudCBpcyBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICAgIGl0ZW1zQmFja3VwOiBBcnJheTxhbnk+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgICAqIFRoZSBoZWlnaHQgb2YgaXQgcmVtYWlucyB0aGUgc2FtZSBldmVuIHdoZW4gaXRlbXMgZ2V0IGVtcHR5IG91dC5cclxuICAgICAqL1xyXG4gICAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgICBkZXN0cm95ZWQ6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyLCBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXN0b3JlIGl0ZW1zIHdoZW4gaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIHJlbmRlcmVkXHJcbiAgICAgKi9cclxuICAgIHJlc3RvcmVJdGVtcygpOiB2b2lkO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEVtcHR5IGl0ZW1zIHdoZW4gbm90IGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSBub3QgcmVuZGVyZWRcclxuICAgICAqL1xyXG4gICAgZW1wdHlJdGVtcygpOiB2b2lkO1xyXG4gICAgc2V0SXRlbXMoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkO1xyXG59XHJcbiJdfQ==