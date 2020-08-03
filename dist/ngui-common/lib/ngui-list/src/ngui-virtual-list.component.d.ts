import { AfterViewInit, ChangeDetectorRef, ComponentRef, ElementRef, EventEmitter, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
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
import * as ɵngcc0 from '@angular/core';
export declare class NguiVirtualListComponent implements AfterViewInit {
    renderer: Renderer2;
    element: ElementRef;
    dynamicComponentService: DynamicComponentService;
    cdr: ChangeDetectorRef;
    /** the container NguiInviewPage will be inserted */
    pagesRef: ViewContainerRef;
    /** Template of NguiInviewPage. Allow users to define their own template  */
    template: TemplateRef<any>;
    /** Fired when child `<ngui-list-item>` is selected */
    selected: EventEmitter<any>;
    /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
    escaped: EventEmitter<any>;
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
    bottomInview: EventEmitter<any>;
    /** The last NguiInviewPageComponent being inserted */
    inviewPage: ComponentRef<NguiInviewPageComponent>;
    _focused: boolean;
    /** Indicates if a page is still loading */
    isListLoading: boolean;
    inviewPages: Array<ComponentRef<NguiInviewPageComponent>>;
    constructor(renderer: Renderer2, element: ElementRef, dynamicComponentService: DynamicComponentService, cdr: ChangeDetectorRef);
    /** Check if necessary input and output is provided */
    ngAfterViewInit(): void;
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     */
    addAnInviewPageToPages(): void;
    addList(items: Array<any>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiVirtualListComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NguiVirtualListComponent, "ngui-virtual-list", never, {}, { "selected": "selected"; "escaped": "escaped"; "bottomInview": "bottomInview"; }, ["template"], never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbIm5ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd1aUludmlld1BhZ2VDb21wb25lbnQgfSBmcm9tICcuL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuLyoqXHJcbiAqIFZpcnR1YWwgTGlzdFxyXG4gKlxyXG4gKiBUaGUgYDxuZ3VpLWludmlldyAuLj5gIGluc2VydHMgPG5ndWktaW52aWV3LXBhZ2U+IGludG9cclxuICogYDxkaXYgI3BhZ2VzPmAgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydFxyXG4gKiBXaGVuIGl0J3MgaW5zZXJ0ZWQsIGl0IHdpbGwgYmUgcHVzaGVkIGRvd24sIHdoaWNoIG1ha2VzIGl0IG91dCBvZiB2aWV3cG9ydC5cclxuICogVXNlciBzY3JvbGxzIGRvd24gdG8gc2VlIHRoZSBib3R0b20gb2YgdGhlIGxpc3QsXHJcbiAqIHRoZW4gaXQgd2lsbCBpbnNlcnQgYW5vdGhlciBgPG5ndWktaW52aWV3LXBhZ2U+YCBhZ2Fpbi5cclxuICpcclxuICogPG5ndWktaW52aWV3LXBhZ2U+IGxpc3RlbnMgdG8gKG5ndWlJbnZpZXcpIGFuZCAobmd1aU91dHZpZXcpIGV2ZW50cyxcclxuICogd2hlbiA8bmd1aS1pbnZpZXctcGFnZT4gaXMgb3V0IG9mIHZpZXcgcG9ydCwgaXQgZW1wdGllcyBvdXQgdGhlIGNvbnRlbnRzLlxyXG4gKiBhbmQgaXQgcmVzdG9yZXMgYmFjayB0aGUgY29udGVudHMgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydCBhZ2Fpbi5cclxuICpcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICogICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj5Mb2FkaW5nPC9kaXY+XHJcbiAqICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICA8L25nLXRlbXBsYXRlPlxyXG4gKiA8L25ndWktdmlydHVhbC1saXN0PlxyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcbiAgICBkeW5hbWljQ29tcG9uZW50U2VydmljZTogRHluYW1pY0NvbXBvbmVudFNlcnZpY2U7XHJcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xyXG4gICAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gICAgcGFnZXNSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gICAgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICAgIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIGJvdHRvbSBvZiB0aGUgdmlydHVhbCBsaXN0IGlzIGluIHZpZXdcclxuICAgICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICAgKiBJZiBub3QsIG9ubHkgdGhlIGZpcnN0IHBhZ2UgaXMgbG9hZGVkLCBhbmQgcmVzdCBvZiB0aGUgcGFnZXMgd29uJ3QgYmUgbG9hZGVkO1xyXG4gICAgICpcclxuICAgICAqICMjIyBleGFtcGxlXHJcbiAgICAgKiBgYGB0c1xyXG4gICAgICogPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICAgICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICAgKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gICAgICogICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gICAgICogICAgIDwvZGl2PlxyXG4gICAgICogICAgIDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5Mb2FkaW5nPC9uZy10ZW1wbGF0ZT5cclxuICAgICAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgYm90dG9tSW52aWV3OiBFdmVudEVtaXR0ZXI8YW55PjtcclxuICAgIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gICAgaW52aWV3UGFnZTogQ29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50PjtcclxuICAgIF9mb2N1c2VkOiBib29sZWFuO1xyXG4gICAgLyoqIEluZGljYXRlcyBpZiBhIHBhZ2UgaXMgc3RpbGwgbG9hZGluZyAqL1xyXG4gICAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICAgIGludmlld1BhZ2VzOiBBcnJheTxDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+PjtcclxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSwgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZik7XHJcbiAgICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZSBib3R0b20gaXMgaW52aWV3IHBvcnQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgICAgKiBJdCB3aWxsIGluc2VydCBhIGR5bmFtaWNhbGwgY3JlYXRlZCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB3aXRoIHRoZSBnaXZlbiB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgICAqL1xyXG4gICAgYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpOiB2b2lkO1xyXG4gICAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQ7XHJcbn1cclxuIl19