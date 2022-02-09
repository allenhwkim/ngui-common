import { Component, ContentChild, EventEmitter, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NguiInviewPageComponent } from './ngui-inview-page.component';
import * as i0 from "@angular/core";
import * as i1 from "../../ngui-utils/src/dynamic-component.service";
import * as i2 from "../../ngui-inview/src/ngui-inview.component";
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

 ### Example
 ```html
 <ngui-virtual-list (bottomInview)="loadItems($event)">
   <ng-template let-items="items">
     <div *ngIf="!items">Loading</div>
     <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
   </ng-template>
 </ngui-virtual-list>
 ```
 */
export class NguiVirtualListComponent {
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
      
         ### Example
         ```html
         <ngui-virtual-list (bottomInview)="loadItems($event)">
           <ng-template let-items="items">
             <div *ngIf="items else noItems">
                <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
             </div>
             <ng-template #noItems>Loading</ng-template>
           </ng-template>
         </ngui-virtual-list>
         ```
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
    }
    // set items of NguiInviewPageComponent
    addList(items) {
        this.isListLoading = false;
        this.inviewPage.instance.setItems(items);
    }
}
NguiVirtualListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiVirtualListComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.DynamicComponentService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NguiVirtualListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.2", type: NguiVirtualListComponent, selector: "ngui-virtual-list", outputs: { selected: "selected", escaped: "escaped", bottomInview: "bottomInview" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], viewQueries: [{ propertyName: "pagesRef", first: true, predicate: ["pages"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: `
    <div class="ngui-virtual-list"
      (focus)="_focused = true"
      (click)="_focused = true">
      <!-- hold multiple <ngui-inview-page> -->
      <div #pages></div>
      <!-- insert <ngui-inview-page> into #pages -->
    </div>
    <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
  `, isInline: true, styles: [":host{display:block}\n"], components: [{ type: i2.NguiInviewComponent, selector: "ngui-inview", inputs: ["observerOptions", "options", "blurEnabled"], outputs: ["inview", "notInview"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiVirtualListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngui-virtual-list',
                    template: `
    <div class="ngui-virtual-list"
      (focus)="_focused = true"
      (click)="_focused = true">
      <!-- hold multiple <ngui-inview-page> -->
      <div #pages></div>
      <!-- insert <ngui-inview-page> into #pages -->
    </div>
    <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
  `,
                    styles: [`
    :host {display: block}
  `]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.DynamicComponentService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { pagesRef: [{
                type: ViewChild,
                args: ['pages', { read: ViewContainerRef }]
            }], template: [{
                type: ContentChild,
                args: [TemplateRef]
            }], selected: [{
                type: Output
            }], escaped: [{
                type: Output
            }], bottomInview: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUVULFlBQVksRUFFWixZQUFZLEVBQ1osTUFBTSxFQUVOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBRXZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBaUJILE1BQU0sT0FBTyx3QkFBd0I7SUFxQ25DLFlBQ1MsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsdUJBQWdELEVBQ2hELEdBQXNCO1FBSHRCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbkMvQixzREFBc0Q7UUFDNUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELDhEQUE4RDtRQUNwRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDTyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsZ0JBQVcsR0FBaUQsRUFBRSxDQUFDO0lBTzVELENBQUM7SUFFSixzREFBc0Q7SUFDdEQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxVQUFVO2dCQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztTQUN6RTtJQUNILENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDOztxSEEzRVUsd0JBQXdCO3lHQUF4Qix3QkFBd0Isb0xBS3JCLFdBQVcsOEhBRkcsZ0JBQWdCLDZCQWpCbEM7Ozs7Ozs7OztHQVNUOzJGQUtVLHdCQUF3QjtrQkFoQnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQzs7R0FFUixDQUFDO2lCQUNIOytMQUlpRCxRQUFRO3NCQUF2RCxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkFFbkIsUUFBUTtzQkFBbEMsWUFBWTt1QkFBQyxXQUFXO2dCQUVmLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsT0FBTztzQkFBaEIsTUFBTTtnQkFtQkcsWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFZpcnR1YWwgTGlzdFxyXG4gKlxyXG4gKiBUaGUgYDxuZ3VpLWludmlldyAuLj5gIGluc2VydHMgPG5ndWktaW52aWV3LXBhZ2U+IGludG9cclxuICogYDxkaXYgI3BhZ2VzPmAgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydFxyXG4gKiBXaGVuIGl0J3MgaW5zZXJ0ZWQsIGl0IHdpbGwgYmUgcHVzaGVkIGRvd24sIHdoaWNoIG1ha2VzIGl0IG91dCBvZiB2aWV3cG9ydC5cclxuICogVXNlciBzY3JvbGxzIGRvd24gdG8gc2VlIHRoZSBib3R0b20gb2YgdGhlIGxpc3QsXHJcbiAqIHRoZW4gaXQgd2lsbCBpbnNlcnQgYW5vdGhlciBgPG5ndWktaW52aWV3LXBhZ2U+YCBhZ2Fpbi5cclxuICpcclxuICogPG5ndWktaW52aWV3LXBhZ2U+IGxpc3RlbnMgdG8gKG5ndWlJbnZpZXcpIGFuZCAobmd1aU91dHZpZXcpIGV2ZW50cyxcclxuICogd2hlbiA8bmd1aS1pbnZpZXctcGFnZT4gaXMgb3V0IG9mIHZpZXcgcG9ydCwgaXQgZW1wdGllcyBvdXQgdGhlIGNvbnRlbnRzLlxyXG4gKiBhbmQgaXQgcmVzdG9yZXMgYmFjayB0aGUgY29udGVudHMgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydCBhZ2Fpbi5cclxuXHJcbiAjIyMgRXhhbXBsZVxyXG4gYGBgaHRtbFxyXG4gPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgPC9uZy10ZW1wbGF0ZT5cclxuIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS12aXJ0dWFsLWxpc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmd1aS12aXJ0dWFsLWxpc3RcIlxyXG4gICAgICAoZm9jdXMpPVwiX2ZvY3VzZWQgPSB0cnVlXCJcclxuICAgICAgKGNsaWNrKT1cIl9mb2N1c2VkID0gdHJ1ZVwiPlxyXG4gICAgICA8IS0tIGhvbGQgbXVsdGlwbGUgPG5ndWktaW52aWV3LXBhZ2U+IC0tPlxyXG4gICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPCEtLSBpbnNlcnQgPG5ndWktaW52aWV3LXBhZ2U+IGludG8gI3BhZ2VzIC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmd1aS1pbnZpZXcgKGludmlldyk9XCJhZGRBbkludmlld1BhZ2VUb1BhZ2VzKClcIj48L25ndWktaW52aWV3PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3BhZ2VzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIHBhZ2VzUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvKiogRmlyZWQgd2hlbiBjaGlsZCBgPG5ndWktbGlzdC1pdGVtPmAgaXMgc2VsZWN0ZWQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBGaXJlZCB3aGVuIGBFU0NgIGtleSBpcyBwcmVzc2VkIGZyb20gYDxuZ3VpLWxpc3QtaXRlbT5gICovXHJcbiAgQE91dHB1dCgpIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBmaXJlZCB3aGVuIGJvdHRvbSBvZiB0aGUgdmlydHVhbCBsaXN0IGlzIGluIHZpZXdcclxuICAgKiBUaGUgaGFuZGxlciBvZiB0aGlzIGV2ZW50IG11c3QgY2FsbCBgJGV2ZW50LmFkZEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KWAgdG8gZmlsbCBjb250ZW50c1xyXG4gICAqIElmIG5vdCwgb25seSB0aGUgZmlyc3QgcGFnZSBpcyBsb2FkZWQsIGFuZCByZXN0IG9mIHRoZSBwYWdlcyB3b24ndCBiZSBsb2FkZWQ7XHJcblxyXG4gICAjIyMgRXhhbXBsZVxyXG4gICBgYGBodG1sXHJcbiAgIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAgICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgICAgIDwvZGl2PlxyXG4gICAgICAgPG5nLXRlbXBsYXRlICNub0l0ZW1zPkxvYWRpbmc8L25nLXRlbXBsYXRlPlxyXG4gICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgIGBgYFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBib3R0b21JbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKiogVGhlIGxhc3QgTmd1aUludmlld1BhZ2VDb21wb25lbnQgYmVpbmcgaW5zZXJ0ZWQgKi9cclxuICBpbnZpZXdQYWdlOiBDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+O1xyXG4gIF9mb2N1c2VkID0gZmFsc2U7XHJcbiAgLyoqIEluZGljYXRlcyBpZiBhIHBhZ2UgaXMgc3RpbGwgbG9hZGluZyAqL1xyXG4gIGlzTGlzdExvYWRpbmc6IGJvb2xlYW47XHJcbiAgaW52aWV3UGFnZXM6IEFycmF5PENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD4+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHB1YmxpYyBkeW5hbWljQ29tcG9uZW50U2VydmljZTogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UsXHJcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge31cclxuXHJcbiAgLyoqIENoZWNrIGlmIG5lY2Vzc2FyeSBpbnB1dCBhbmQgb3V0cHV0IGlzIHByb3ZpZGVkICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnRlbXBsYXRlIHx8ICF0aGlzLmJvdHRvbUludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJzxuZ3VpLXZpcnR1YWwtbGlzdD4gcmVxdWlyZXMgW3RlbXBsYXRlXSBhbmQge2JvdHRvbUludmlldyknKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGJvdHRvbSBpcyBpbnZpZXcgcG9ydCwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcclxuICAgKiBJdCB3aWxsIGluc2VydCBhIGR5bmFtaWNhbGwgY3JlYXRlZCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB3aXRoIHRoZSBnaXZlbiB0ZW1wbGF0ZS5cclxuICAgKiBJdCB3aWxsIGFsc28gZmlyZXMgKGJvdHRvbUludmlldykgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gZmlsbCB1cCBpdGVtcyBmb3IgdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0xpc3RMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UgPVxyXG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlQ29tcG9uZW50KE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCB0aGlzLnBhZ2VzUmVmKTtcclxuICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5pbnNlcnRDb21wb25lbnQodGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZXMucHVzaCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5ib3R0b21JbnZpZXcuZW1pdCh0aGlzKTsgLy8gZmlyZSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBsb2FkIGl0ZW1zXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaXRlbXMgb2YgTmd1aUludmlld1BhZ2VDb21wb25lbnRcclxuICBhZGRMaXN0KGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=