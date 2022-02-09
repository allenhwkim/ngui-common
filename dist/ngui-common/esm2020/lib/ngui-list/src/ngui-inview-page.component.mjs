import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../ngui-inview/src/ngui-inview.directive";
import * as i2 from "@angular/common";
/**
 * A block of component that listens to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view

 ### Example
 ```html
 <ngui-inview-page [items]="items">
   <ng-template let-items="items">
     <div *ngIf="items else noItems">
       <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
     </div>
   </ng-template>
 </ngui-inview-page>
 ```
 */
export class NguiInviewPageComponent {
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [0, .01] };
        /** Indicates that the page of out of viewport */
        this.outView = false;
        /** The copy of items. This is set when this element is out of viewport */
        this.itemsBackup = [];
    }
    /**
     * Restore items when in viewport, so that elements are rendered
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
    ngOnInit() {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    }
    ngOnDestroy() {
        this.destroyed = true;
    }
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    emptyItems() {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
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
    setItems(items) {
        if (!this.destroyed) {
            this.items = items;
            this.cdRef.detectChanges();
        }
    }
}
NguiInviewPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiInviewPageComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NguiInviewPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.2", type: NguiInviewPageComponent, selector: "ngui-inview-page", inputs: { items: "items", observerOptions: "observerOptions" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: `
    <div class="inview-page contents"
      [observerOptions]="observerOptions"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <!-- add blank ngui-list-item by condition  -->
      <!-- no match found ngui-list-item by condition -->
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `, isInline: true, styles: [":host{display:block}\n"], directives: [{ type: i1.NguiInviewDirective, selector: "[nguiInview], [nguiOutview]", inputs: ["observerOptions", "options"], outputs: ["nguiInview", "nguiOutview"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiInviewPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngui-inview-page',
                    template: `
    <div class="inview-page contents"
      [observerOptions]="observerOptions"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <!-- add blank ngui-list-item by condition  -->
      <!-- no match found ngui-list-item by condition -->
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `,
                    styles: [`
    :host {display: block}
  `]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }], items: [{
                type: Input
            }], observerOptions: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3VpLWNvbW1vbi9zcmMvbGliL25ndWktbGlzdC9zcmMvbmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUlMLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQzs7OztBQUV2Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUF5QkgsTUFBTSxPQUFPLHVCQUF1QjtJQXNCbEMsWUFDVSxPQUFtQixFQUNuQixRQUFtQixFQUNuQixLQUF3QjtRQUZ4QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFoQmxDLG1DQUFtQztRQUMxQixvQkFBZSxHQUE2QixFQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFDO1FBQzNFLGlEQUFpRDtRQUNqRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLDBFQUEwRTtRQUMxRSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztJQVl6QixDQUFDO0lBRUw7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xELHNDQUFzQztZQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7O29IQXpFVSx1QkFBdUI7d0dBQXZCLHVCQUF1Qiw4SkFHcEIsV0FBVyw4REF6QmY7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUOzJGQUtVLHVCQUF1QjtrQkF4Qm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQzs7R0FFUixDQUFDO2lCQUNIO3lKQUk0QyxRQUFRO3NCQUFsRCxZQUFZO3VCQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBSWhDLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcblxyXG4gIyMjIEV4YW1wbGVcclxuIGBgYGh0bWxcclxuIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgICA8L2Rpdj5cclxuICAgPC9uZy10ZW1wbGF0ZT5cclxuIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldy1wYWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImludmlldy1wYWdlIGNvbnRlbnRzXCJcclxuICAgICAgW29ic2VydmVyT3B0aW9uc109XCJvYnNlcnZlck9wdGlvbnNcIlxyXG4gICAgICAobmd1aUludmlldyk9XCJyZXN0b3JlSXRlbXMoKVwiXHJcbiAgICAgIChuZ3VpT3V0dmlldyk9XCJlbXB0eUl0ZW1zKClcIj5cclxuICAgICAgPCEtLSBhZGQgYmxhbmsgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uICAtLT5cclxuICAgICAgPCEtLSBubyBtYXRjaCBmb3VuZCBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXx8ZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW1zOiBpdGVtcywgb3V0Vmlldzogb3V0Vmlld31cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPiBFcnJvcjogcmVxdWlyZXMgW2l0ZW1zXSA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPiBFcnJvcjogcmVxdWlyZXMgJmx0O25nLXRlbXBsYXRlPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld1BhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKiBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGNvbnRlbnRzICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8vIEBJbnB1dCgndGVtcGxhdGUnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBhcmUgdXNlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50ICovXHJcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PGFueT47XHJcblxyXG4gIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbMCwgLjAxXX07XHJcbiAgLyoqIEluZGljYXRlcyB0aGF0IHRoZSBwYWdlIG9mIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIG91dFZpZXcgPSBmYWxzZTtcclxuICAvKiogVGhlIGNvcHkgb2YgaXRlbXMuIFRoaXMgaXMgc2V0IHdoZW4gdGhpcyBlbGVtZW50IGlzIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIGl0ZW1zQmFja3VwOiBBcnJheTxhbnk+ID0gW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuXHJcbiAgICogVGhlIGhlaWdodCBvZiBpdCByZW1haW5zIHRoZSBzYW1lIGV2ZW4gd2hlbiBpdGVtcyBnZXQgZW1wdHkgb3V0LlxyXG4gICAqL1xyXG4gIGNvbnRlbnRzRWw6IEhUTUxFbGVtZW50O1xyXG4gIGRlc3Ryb3llZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RvcmUgaXRlbXMgd2hlbiBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgcmVuZGVyZWRcclxuICAgKi9cclxuICByZXN0b3JlSXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIHRoaXMub3V0VmlldyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLml0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zQmFja3VwIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCB1bmRlZmluZWQpO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZW50c0VsID1cclxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmludmlldy1wYWdlLmNvbnRlbnRzJyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHR5IGl0ZW1zIHdoZW4gbm90IGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSBub3QgcmVuZGVyZWRcclxuICAgKi9cclxuICBlbXB0eUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jb250ZW50c0VsICYmICF0aGlzLm91dFZpZXcpIHtcclxuICAgICAgLy8gc2V0IGhlaWdodCBiZWZvcmUgZW1wdHlpbmcgY29udGVudHNcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xyXG5cclxuICAgICAgdGhpcy5vdXRWaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IEFycmF5LmZyb20odGhpcy5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbXMoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==