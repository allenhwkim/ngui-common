import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Renderer2, TemplateRef } from '@angular/core';
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
NguiInviewPageComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NguiInviewPageComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef, { static: true },] }],
    items: [{ type: Input }],
    observerOptions: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3VpLWNvbW1vbi9zcmMvbGliL25ndWktbGlzdC9zcmMvbmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUF5QkgsTUFBTSxPQUFPLHVCQUF1QjtJQXNCbEMsWUFDVSxPQUFtQixFQUNuQixRQUFtQixFQUNuQixLQUF3QjtRQUZ4QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFoQmxDLG1DQUFtQztRQUMxQixvQkFBZSxHQUE2QixFQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFDO1FBQzNFLGlEQUFpRDtRQUNqRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLDBFQUEwRTtRQUMxRSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztJQVl6QixDQUFDO0lBRUw7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xELHNDQUFzQztZQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQWpHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDt5QkFDUTs7R0FFUjthQUNGOzs7WUEvQ0MsVUFBVTtZQUlWLFNBQVM7WUFQVCxpQkFBaUI7Ozt1QkFzRGhCLFlBQVksU0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO29CQUl4QyxLQUFLOzhCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEEgYmxvY2sgb2YgY29tcG9uZW50IHRoYXQgbGlzdGVucyB0byBpblZpZXcgYW5kIG91dFZpZXcgZXZlbnRzLFxyXG4gKiBzbyB0aGF0IGl0IGVtcHRpZXMgY29udGVudHMgd2hlbiBvdXQgb2YgdmlldyBhZnRlciBiYWNrdXAgaXRlbXNcclxuICogYW5kIHJlc3RvcmVzIHRoZSBjb250ZW50cyB3aGVuIGluIHZpZXdcclxuXHJcbiAjIyMgRXhhbXBsZVxyXG4gYGBgaHRtbFxyXG4gPG5ndWktaW52aWV3LXBhZ2UgW2l0ZW1zXT1cIml0ZW1zXCI+XHJcbiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gICAgIDwvZGl2PlxyXG4gICA8L25nLXRlbXBsYXRlPlxyXG4gPC9uZ3VpLWludmlldy1wYWdlPlxyXG4gYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3LXBhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW52aWV3LXBhZ2UgY29udGVudHNcIlxyXG4gICAgICBbb2JzZXJ2ZXJPcHRpb25zXT1cIm9ic2VydmVyT3B0aW9uc1wiXHJcbiAgICAgIChuZ3VpSW52aWV3KT1cInJlc3RvcmVJdGVtcygpXCJcclxuICAgICAgKG5ndWlPdXR2aWV3KT1cImVtcHR5SXRlbXMoKVwiPlxyXG4gICAgICA8IS0tIGFkZCBibGFuayBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gIC0tPlxyXG4gICAgICA8IS0tIG5vIG1hdGNoIGZvdW5kIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlfHxkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbXM6IGl0ZW1zLCBvdXRWaWV3OiBvdXRWaWV3fVwiPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+IEVycm9yOiByZXF1aXJlcyBbaXRlbXNdIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+IEVycm9yOiByZXF1aXJlcyAmbHQ7bmctdGVtcGxhdGU+PC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgY29udGVudHMgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLy8gQElucHV0KCd0ZW1wbGF0ZScpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKiogTGlzdCBvZiBlbGVtZW50cyB0aGF0IGFyZSB1c2VkIHRvIHJlbmRlciB0aGlzIGVsZW1lbnQgKi9cclxuICBASW5wdXQoKSBpdGVtczogQXJyYXk8YW55PjtcclxuXHJcbiAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFswLCAuMDFdfTtcclxuICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgb3V0VmlldyA9IGZhbHNlO1xyXG4gIC8qKiBUaGUgY29weSBvZiBpdGVtcy4gVGhpcyBpcyBzZXQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgaXRlbXNCYWNrdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgaGVpZ2h0IG9mIGl0IHJlbWFpbnMgdGhlIHNhbWUgZXZlbiB3aGVuIGl0ZW1zIGdldCBlbXB0eSBvdXQuXHJcbiAgICovXHJcbiAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgZGVzdHJveWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSBpdGVtcyB3aGVuIGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm91dFZpZXcpIHtcclxuICAgICAgdGhpcy5vdXRWaWV3ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXNCYWNrdXAgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRlbnRzRWwgPVxyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW52aWV3LXBhZ2UuY29udGVudHMnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1wdHkgaXRlbXMgd2hlbiBub3QgaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIG5vdCByZW5kZXJlZFxyXG4gICAqL1xyXG4gIGVtcHR5SXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmNvbnRlbnRzRWwgJiYgIXRoaXMub3V0Vmlldykge1xyXG4gICAgICAvLyBzZXQgaGVpZ2h0IGJlZm9yZSBlbXB0eWluZyBjb250ZW50c1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcblxyXG4gICAgICB0aGlzLm91dFZpZXcgPSB0cnVlO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtcyA9IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJdGVtcyhpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19