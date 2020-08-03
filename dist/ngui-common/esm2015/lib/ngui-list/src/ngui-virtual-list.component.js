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
let NguiVirtualListComponent = class NguiVirtualListComponent {
    constructor(renderer, element, dynamicComponentService, cdr) {
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
    ngAfterViewInit() {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    }
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
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
    addList(items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    }
};
NguiVirtualListComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: DynamicComponentService },
    { type: ChangeDetectorRef }
];
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
    }),
    tslib_1.__metadata("design:paramtypes", [Renderer2,
        ElementRef,
        DynamicComponentService,
        ChangeDetectorRef])
], NguiVirtualListComponent);
export { NguiVirtualListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFpQkgsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFxQ25DLFlBQ1MsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsdUJBQWdELEVBQ2hELEdBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbkMvQixzREFBc0Q7UUFDNUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELDhEQUE4RDtRQUNwRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDTyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsZ0JBQVcsR0FBaUQsRUFBRSxDQUFDO0lBTzVELENBQUM7SUFFSixzREFBc0Q7SUFDdEQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxVQUFVO2dCQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztTQUN6RTthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxPQUFPLENBQUMsS0FBaUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBRUYsQ0FBQTs7WUExQ29CLFNBQVM7WUFDVixVQUFVO1lBQ00sdUJBQXVCO1lBQzNDLGlCQUFpQjs7QUF0Q2dDO0lBQTlELFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFXLGdCQUFnQjswREFBQztBQUU5QztJQUEzQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO3NDQUFXLFdBQVc7MERBQU07QUFFN0Q7SUFBVCxNQUFNLEVBQUU7c0NBQVcsWUFBWTswREFBMkI7QUFFakQ7SUFBVCxNQUFNLEVBQUU7c0NBQVUsWUFBWTt5REFBMkI7QUFtQmhEO0lBQVQsTUFBTSxFQUFFO3NDQUFlLFlBQVk7OERBQTJCO0FBNUJwRCx3QkFBd0I7SUFoQnBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtpQkFDUTs7R0FFUjtLQUNGLENBQUM7NkNBdUNtQixTQUFTO1FBQ1YsVUFBVTtRQUNNLHVCQUF1QjtRQUMzQyxpQkFBaUI7R0F6Q3BCLHdCQUF3QixDQWdGcEM7U0FoRlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVmlydHVhbCBMaXN0XHJcbiAqXHJcbiAqIFRoZSBgPG5ndWktaW52aWV3IC4uPmAgaW5zZXJ0cyA8bmd1aS1pbnZpZXctcGFnZT4gaW50b1xyXG4gKiBgPGRpdiAjcGFnZXM+YCB3aGVuIGl0IGlzIGluIHZpZXdwb3J0XHJcbiAqIFdoZW4gaXQncyBpbnNlcnRlZCwgaXQgd2lsbCBiZSBwdXNoZWQgZG93biwgd2hpY2ggbWFrZXMgaXQgb3V0IG9mIHZpZXdwb3J0LlxyXG4gKiBVc2VyIHNjcm9sbHMgZG93biB0byBzZWUgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCxcclxuICogdGhlbiBpdCB3aWxsIGluc2VydCBhbm90aGVyIGA8bmd1aS1pbnZpZXctcGFnZT5gIGFnYWluLlxyXG4gKlxyXG4gKiA8bmd1aS1pbnZpZXctcGFnZT4gbGlzdGVucyB0byAobmd1aUludmlldykgYW5kIChuZ3VpT3V0dmlldykgZXZlbnRzLFxyXG4gKiB3aGVuIDxuZ3VpLWludmlldy1wYWdlPiBpcyBvdXQgb2YgdmlldyBwb3J0LCBpdCBlbXB0aWVzIG91dCB0aGUgY29udGVudHMuXHJcbiAqIGFuZCBpdCByZXN0b3JlcyBiYWNrIHRoZSBjb250ZW50cyB3aGVuIGl0IGlzIGluIHZpZXdwb3J0IGFnYWluLlxyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICogICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLXZpcnR1YWwtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3VpLXZpcnR1YWwtbGlzdFwiXHJcbiAgICAgIChmb2N1cyk9XCJfZm9jdXNlZCA9IHRydWVcIlxyXG4gICAgICAoY2xpY2spPVwiX2ZvY3VzZWQgPSB0cnVlXCI+XHJcbiAgICAgIDwhLS0gaG9sZCBtdWx0aXBsZSA8bmd1aS1pbnZpZXctcGFnZT4gLS0+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8IS0tIGluc2VydCA8bmd1aS1pbnZpZXctcGFnZT4gaW50byAjcGFnZXMgLS0+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIC8qKiB0aGUgY29udGFpbmVyIE5ndWlJbnZpZXdQYWdlIHdpbGwgYmUgaW5zZXJ0ZWQgKi9cclxuICBAVmlld0NoaWxkKCdwYWdlcycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZSB9KSBwYWdlc1JlZjogVmlld0NvbnRhaW5lclJlZjtcclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogZmFsc2V9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvKiogRmlyZWQgd2hlbiBjaGlsZCBgPG5ndWktbGlzdC1pdGVtPmAgaXMgc2VsZWN0ZWQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBGaXJlZCB3aGVuIGBFU0NgIGtleSBpcyBwcmVzc2VkIGZyb20gYDxuZ3VpLWxpc3QtaXRlbT5gICovXHJcbiAgQE91dHB1dCgpIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBmaXJlZCB3aGVuIGJvdHRvbSBvZiB0aGUgdmlydHVhbCBsaXN0IGlzIGluIHZpZXdcclxuICAgKiBUaGUgaGFuZGxlciBvZiB0aGlzIGV2ZW50IG11c3QgY2FsbCBgJGV2ZW50LmFkZEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KWAgdG8gZmlsbCBjb250ZW50c1xyXG4gICAqIElmIG5vdCwgb25seSB0aGUgZmlyc3QgcGFnZSBpcyBsb2FkZWQsIGFuZCByZXN0IG9mIHRoZSBwYWdlcyB3b24ndCBiZSBsb2FkZWQ7XHJcbiAgICpcclxuICAgKiAjIyMgZXhhbXBsZVxyXG4gICAqIGBgYHRzXHJcbiAgICogPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICAgKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gICAqICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAgICogICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gICAqICAgICA8L2Rpdj5cclxuICAgKiAgICAgPG5nLXRlbXBsYXRlICNub0l0ZW1zPkxvYWRpbmc8L25nLXRlbXBsYXRlPlxyXG4gICAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgKiA8L25ndWktdmlydHVhbC1saXN0PlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBib3R0b21JbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKiogVGhlIGxhc3QgTmd1aUludmlld1BhZ2VDb21wb25lbnQgYmVpbmcgaW5zZXJ0ZWQgKi9cclxuICBpbnZpZXdQYWdlOiBDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+O1xyXG4gIF9mb2N1c2VkID0gZmFsc2U7XHJcbiAgLyoqIEluZGljYXRlcyBpZiBhIHBhZ2UgaXMgc3RpbGwgbG9hZGluZyAqL1xyXG4gIGlzTGlzdExvYWRpbmc6IGJvb2xlYW47XHJcbiAgaW52aWV3UGFnZXM6IEFycmF5PENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD4+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHB1YmxpYyBkeW5hbWljQ29tcG9uZW50U2VydmljZTogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UsXHJcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge31cclxuXHJcbiAgLyoqIENoZWNrIGlmIG5lY2Vzc2FyeSBpbnB1dCBhbmQgb3V0cHV0IGlzIHByb3ZpZGVkICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnRlbXBsYXRlIHx8ICF0aGlzLmJvdHRvbUludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJzxuZ3VpLXZpcnR1YWwtbGlzdD4gcmVxdWlyZXMgW3RlbXBsYXRlXSBhbmQge2JvdHRvbUludmlldyknKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGJvdHRvbSBpcyBpbnZpZXcgcG9ydCwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcclxuICAgKiBJdCB3aWxsIGluc2VydCBhIGR5bmFtaWNhbGwgY3JlYXRlZCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB3aXRoIHRoZSBnaXZlbiB0ZW1wbGF0ZS5cclxuICAgKiBJdCB3aWxsIGFsc28gZmlyZXMgKGJvdHRvbUludmlldykgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gZmlsbCB1cCBpdGVtcyBmb3IgdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0xpc3RMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UgPVxyXG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlQ29tcG9uZW50KE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCB0aGlzLnBhZ2VzUmVmKTtcclxuICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5pbnNlcnRDb21wb25lbnQodGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZXMucHVzaCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5ib3R0b21JbnZpZXcuZW1pdCh0aGlzKTsgLy8gZmlyZSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBsb2FkIGl0ZW1zXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnQWxyZWFkeSBhIHBhZ2UgYmVpbmcgaW5zZXJ0ZWQsIHNraXBwaW5nIGFkZGluZyBhIHBhZ2UnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHNldCBpdGVtcyBvZiBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudFxyXG4gIGFkZExpc3QoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgY29uc29sZS5sb2coJz4+Pj4+PiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQuYWRkTGlzdCgpIGlzIGNhbGxlZCgpJyk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoaXRlbXMpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19