import { __decorate, __metadata } from "tslib";
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
    __decorate([
        ViewChild('pages', { read: ViewContainerRef }),
        __metadata("design:type", ViewContainerRef)
    ], NguiVirtualListComponent.prototype, "pagesRef", void 0);
    __decorate([
        ContentChild(TemplateRef),
        __metadata("design:type", TemplateRef)
    ], NguiVirtualListComponent.prototype, "template", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "selected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "escaped", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "bottomInview", void 0);
    NguiVirtualListComponent = __decorate([
        Component({
            selector: 'ngui-virtual-list',
            template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n    </div>\n    <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef,
            DynamicComponentService,
            ChangeDetectorRef])
    ], NguiVirtualListComponent);
    return NguiVirtualListComponent;
}());
export { NguiVirtualListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFpQkg7SUFxQ0Usa0NBQ1MsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsdUJBQWdELEVBQ2hELEdBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbkMvQixzREFBc0Q7UUFDNUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELDhEQUE4RDtRQUNwRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDTyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsZ0JBQVcsR0FBaUQsRUFBRSxDQUFDO0lBTzVELENBQUM7SUFFSixzREFBc0Q7SUFDdEQsa0RBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseURBQXNCLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBSSxDQUFDLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMENBQTBDO1NBQ3pFO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLDBDQUFPLEdBQVAsVUFBUSxLQUFpQjtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7O2dCQXhDa0IsU0FBUztnQkFDVixVQUFVO2dCQUNNLHVCQUF1QjtnQkFDM0MsaUJBQWlCOztJQXRDaUI7UUFBL0MsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2tDQUFXLGdCQUFnQjs4REFBQztJQUVoRDtRQUExQixZQUFZLENBQUMsV0FBVyxDQUFDO2tDQUFXLFdBQVc7OERBQU07SUFFNUM7UUFBVCxNQUFNLEVBQUU7a0NBQVcsWUFBWTs4REFBMkI7SUFFakQ7UUFBVCxNQUFNLEVBQUU7a0NBQVUsWUFBWTs2REFBMkI7SUFtQmhEO1FBQVQsTUFBTSxFQUFFO2tDQUFlLFlBQVk7a0VBQTJCO0lBNUJwRCx3QkFBd0I7UUFoQnBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLHVVQVNUO3FCQUNRLGtDQUVSO1NBQ0YsQ0FBQzt5Q0F1Q21CLFNBQVM7WUFDVixVQUFVO1lBQ00sdUJBQXVCO1lBQzNDLGlCQUFpQjtPQXpDcEIsd0JBQXdCLENBZ0ZwQztJQUFELCtCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0FoRlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVmlydHVhbCBMaXN0XHJcbiAqXHJcbiAqIFRoZSBgPG5ndWktaW52aWV3IC4uPmAgaW5zZXJ0cyA8bmd1aS1pbnZpZXctcGFnZT4gaW50b1xyXG4gKiBgPGRpdiAjcGFnZXM+YCB3aGVuIGl0IGlzIGluIHZpZXdwb3J0XHJcbiAqIFdoZW4gaXQncyBpbnNlcnRlZCwgaXQgd2lsbCBiZSBwdXNoZWQgZG93biwgd2hpY2ggbWFrZXMgaXQgb3V0IG9mIHZpZXdwb3J0LlxyXG4gKiBVc2VyIHNjcm9sbHMgZG93biB0byBzZWUgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCxcclxuICogdGhlbiBpdCB3aWxsIGluc2VydCBhbm90aGVyIGA8bmd1aS1pbnZpZXctcGFnZT5gIGFnYWluLlxyXG4gKlxyXG4gKiA8bmd1aS1pbnZpZXctcGFnZT4gbGlzdGVucyB0byAobmd1aUludmlldykgYW5kIChuZ3VpT3V0dmlldykgZXZlbnRzLFxyXG4gKiB3aGVuIDxuZ3VpLWludmlldy1wYWdlPiBpcyBvdXQgb2YgdmlldyBwb3J0LCBpdCBlbXB0aWVzIG91dCB0aGUgY29udGVudHMuXHJcbiAqIGFuZCBpdCByZXN0b3JlcyBiYWNrIHRoZSBjb250ZW50cyB3aGVuIGl0IGlzIGluIHZpZXdwb3J0IGFnYWluLlxyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICogICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLXZpcnR1YWwtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3VpLXZpcnR1YWwtbGlzdFwiXHJcbiAgICAgIChmb2N1cyk9XCJfZm9jdXNlZCA9IHRydWVcIlxyXG4gICAgICAoY2xpY2spPVwiX2ZvY3VzZWQgPSB0cnVlXCI+XHJcbiAgICAgIDwhLS0gaG9sZCBtdWx0aXBsZSA8bmd1aS1pbnZpZXctcGFnZT4gLS0+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8IS0tIGluc2VydCA8bmd1aS1pbnZpZXctcGFnZT4gaW50byAjcGFnZXMgLS0+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAvKiogdGhlIGNvbnRhaW5lciBOZ3VpSW52aWV3UGFnZSB3aWxsIGJlIGluc2VydGVkICovXHJcbiAgQFZpZXdDaGlsZCgncGFnZXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgcGFnZXNSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gYm90dG9tIG9mIHRoZSB2aXJ0dWFsIGxpc3QgaXMgaW4gdmlld1xyXG4gICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICogSWYgbm90LCBvbmx5IHRoZSBmaXJzdCBwYWdlIGlzIGxvYWRlZCwgYW5kIHJlc3Qgb2YgdGhlIHBhZ2VzIHdvbid0IGJlIGxvYWRlZDtcclxuICAgKlxyXG4gICAqICMjIyBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgKiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAgICogICAgIDwvZGl2PlxyXG4gICAqICAgICA8bmctdGVtcGxhdGUgI25vSXRlbXM+TG9hZGluZzwvbmctdGVtcGxhdGU+XHJcbiAgICogICA8L25nLXRlbXBsYXRlPlxyXG4gICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdHRvbUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gIGludmlld1BhZ2U6IENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD47XHJcbiAgX2ZvY3VzZWQgPSBmYWxzZTtcclxuICAvKiogSW5kaWNhdGVzIGlmIGEgcGFnZSBpcyBzdGlsbCBsb2FkaW5nICovXHJcbiAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICBpbnZpZXdQYWdlczogQXJyYXk8Q29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50Pj4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudGVtcGxhdGUgfHwgIXRoaXMuYm90dG9tSW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignPG5ndWktdmlydHVhbC1saXN0PiByZXF1aXJlcyBbdGVtcGxhdGVdIGFuZCB7Ym90dG9tSW52aWV3KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYm90dG9tIGlzIGludmlldyBwb3J0LCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxyXG4gICAqIEl0IHdpbGwgaW5zZXJ0IGEgZHluYW1pY2FsbCBjcmVhdGVkIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IHdpdGggdGhlIGdpdmVuIHRlbXBsYXRlLlxyXG4gICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgKi9cclxuICBhZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzTGlzdExvYWRpbmcpIHtcclxuICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZSA9XHJcbiAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVDb21wb25lbnQoTmd1aUludmlld1BhZ2VDb21wb25lbnQsIHRoaXMucGFnZXNSZWYpO1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmluc2VydENvbXBvbmVudCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgICAgdGhpcy5pbnZpZXdQYWdlcy5wdXNoKHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmJvdHRvbUludmlldy5lbWl0KHRoaXMpOyAvLyBmaXJlIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGxvYWQgaXRlbXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBbHJlYWR5IGEgcGFnZSBiZWluZyBpbnNlcnRlZCwgc2tpcHBpbmcgYWRkaW5nIGEgcGFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=