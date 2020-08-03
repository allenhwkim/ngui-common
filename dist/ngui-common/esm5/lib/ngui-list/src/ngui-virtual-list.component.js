import * as tslib_1 from "tslib";
import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ContentChild, ElementRef, EventEmitter, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
var NguiVirtualListComponent = /** @class */ (function () {
    function NguiVirtualListComponent(renderer, element, dynamicComponentService, cdr) {
        this.renderer = renderer;
        this.element = element;
        this.dynamicComponentService = dynamicComponentService;
        this.cdr = cdr;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
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
    /** Check if necessary input and output is provided */
    NguiVirtualListComponent.prototype.ngAfterViewInit = function () {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    };
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     */
    NguiVirtualListComponent.prototype.addAnInviewPageToPages = function () {
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
    };
    // set items of NguiInviewPageComponent
    NguiVirtualListComponent.prototype.addList = function (items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    };
    NguiVirtualListComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: DynamicComponentService },
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        ViewChild('pages', { read: ViewContainerRef, static: false }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], NguiVirtualListComponent.prototype, "pagesRef", void 0);
    tslib_1.__decorate([
        ContentChild(TemplateRef, { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], NguiVirtualListComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "escaped", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "bottomInview", void 0);
    NguiVirtualListComponent = tslib_1.__decorate([
        Component({
            selector: 'ngui-virtual-list',
            template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2,
            ElementRef,
            DynamicComponentService,
            ChangeDetectorRef])
    ], NguiVirtualListComponent);
    return NguiVirtualListComponent;
}());
export { NguiVirtualListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFpQkg7SUFxQ0Usa0NBQ1MsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsdUJBQWdELEVBQ2hELEdBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbkMvQixzREFBc0Q7UUFDNUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELDhEQUE4RDtRQUNwRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDTyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsZ0JBQVcsR0FBaUQsRUFBRSxDQUFDO0lBTzVELENBQUM7SUFFSixzREFBc0Q7SUFDdEQsa0RBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseURBQXNCLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBSSxDQUFDLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMENBQTBDO1NBQ3pFO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLDBDQUFPLEdBQVAsVUFBUSxLQUFpQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7O2dCQXhDa0IsU0FBUztnQkFDVixVQUFVO2dCQUNNLHVCQUF1QjtnQkFDM0MsaUJBQWlCOztJQXRDZ0M7UUFBOUQsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQVcsZ0JBQWdCOzhEQUFDO0lBRTlDO1FBQTNDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7MENBQVcsV0FBVzs4REFBTTtJQUU3RDtRQUFULE1BQU0sRUFBRTswQ0FBVyxZQUFZOzhEQUEyQjtJQUVqRDtRQUFULE1BQU0sRUFBRTswQ0FBVSxZQUFZOzZEQUEyQjtJQW1CaEQ7UUFBVCxNQUFNLEVBQUU7MENBQWUsWUFBWTtrRUFBMkI7SUE1QnBELHdCQUF3QjtRQWhCcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUseVVBU1Q7cUJBQ1Esa0NBRVI7U0FDRixDQUFDO2lEQXVDbUIsU0FBUztZQUNWLFVBQVU7WUFDTSx1QkFBdUI7WUFDM0MsaUJBQWlCO09BekNwQix3QkFBd0IsQ0FnRnBDO0lBQUQsK0JBQUM7Q0FBQSxBQWhGRCxJQWdGQztTQWhGWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd1aUludmlld1BhZ2VDb21wb25lbnQgfSBmcm9tICcuL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBWaXJ0dWFsIExpc3RcclxuICpcclxuICogVGhlIGA8bmd1aS1pbnZpZXcgLi4+YCBpbnNlcnRzIDxuZ3VpLWludmlldy1wYWdlPiBpbnRvXHJcbiAqIGA8ZGl2ICNwYWdlcz5gIHdoZW4gaXQgaXMgaW4gdmlld3BvcnRcclxuICogV2hlbiBpdCdzIGluc2VydGVkLCBpdCB3aWxsIGJlIHB1c2hlZCBkb3duLCB3aGljaCBtYWtlcyBpdCBvdXQgb2Ygdmlld3BvcnQuXHJcbiAqIFVzZXIgc2Nyb2xscyBkb3duIHRvIHNlZSB0aGUgYm90dG9tIG9mIHRoZSBsaXN0LFxyXG4gKiB0aGVuIGl0IHdpbGwgaW5zZXJ0IGFub3RoZXIgYDxuZ3VpLWludmlldy1wYWdlPmAgYWdhaW4uXHJcbiAqXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlPiBsaXN0ZW5zIHRvIChuZ3VpSW52aWV3KSBhbmQgKG5ndWlPdXR2aWV3KSBldmVudHMsXHJcbiAqIHdoZW4gPG5ndWktaW52aWV3LXBhZ2U+IGlzIG91dCBvZiB2aWV3IHBvcnQsIGl0IGVtcHRpZXMgb3V0IHRoZSBjb250ZW50cy5cclxuICogYW5kIGl0IHJlc3RvcmVzIGJhY2sgdGhlIGNvbnRlbnRzIHdoZW4gaXQgaXMgaW4gdmlld3BvcnQgYWdhaW4uXHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+TG9hZGluZzwvZGl2PlxyXG4gKiAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktdmlydHVhbC1saXN0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm5ndWktdmlydHVhbC1saXN0XCJcclxuICAgICAgKGZvY3VzKT1cIl9mb2N1c2VkID0gdHJ1ZVwiXHJcbiAgICAgIChjbGljayk9XCJfZm9jdXNlZCA9IHRydWVcIj5cclxuICAgICAgPCEtLSBob2xkIG11bHRpcGxlIDxuZ3VpLWludmlldy1wYWdlPiAtLT5cclxuICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDwhLS0gaW5zZXJ0IDxuZ3VpLWludmlldy1wYWdlPiBpbnRvICNwYWdlcyAtLT5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3BhZ2VzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIHBhZ2VzUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gYm90dG9tIG9mIHRoZSB2aXJ0dWFsIGxpc3QgaXMgaW4gdmlld1xyXG4gICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICogSWYgbm90LCBvbmx5IHRoZSBmaXJzdCBwYWdlIGlzIGxvYWRlZCwgYW5kIHJlc3Qgb2YgdGhlIHBhZ2VzIHdvbid0IGJlIGxvYWRlZDtcclxuICAgKlxyXG4gICAqICMjIyBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgKiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAgICogICAgIDwvZGl2PlxyXG4gICAqICAgICA8bmctdGVtcGxhdGUgI25vSXRlbXM+TG9hZGluZzwvbmctdGVtcGxhdGU+XHJcbiAgICogICA8L25nLXRlbXBsYXRlPlxyXG4gICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdHRvbUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gIGludmlld1BhZ2U6IENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD47XHJcbiAgX2ZvY3VzZWQgPSBmYWxzZTtcclxuICAvKiogSW5kaWNhdGVzIGlmIGEgcGFnZSBpcyBzdGlsbCBsb2FkaW5nICovXHJcbiAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICBpbnZpZXdQYWdlczogQXJyYXk8Q29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50Pj4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudGVtcGxhdGUgfHwgIXRoaXMuYm90dG9tSW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignPG5ndWktdmlydHVhbC1saXN0PiByZXF1aXJlcyBbdGVtcGxhdGVdIGFuZCB7Ym90dG9tSW52aWV3KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYm90dG9tIGlzIGludmlldyBwb3J0LCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxyXG4gICAqIEl0IHdpbGwgaW5zZXJ0IGEgZHluYW1pY2FsbCBjcmVhdGVkIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IHdpdGggdGhlIGdpdmVuIHRlbXBsYXRlLlxyXG4gICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgKi9cclxuICBhZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzTGlzdExvYWRpbmcpIHtcclxuICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZSA9XHJcbiAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVDb21wb25lbnQoTmd1aUludmlld1BhZ2VDb21wb25lbnQsIHRoaXMucGFnZXNSZWYpO1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmluc2VydENvbXBvbmVudCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgICAgdGhpcy5pbnZpZXdQYWdlcy5wdXNoKHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmJvdHRvbUludmlldy5lbWl0KHRoaXMpOyAvLyBmaXJlIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGxvYWQgaXRlbXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBbHJlYWR5IGEgcGFnZSBiZWluZyBpbnNlcnRlZCwgc2tpcHBpbmcgYWRkaW5nIGEgcGFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=