import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
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
let NguiInviewPageComponent = class NguiInviewPageComponent {
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
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
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
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
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    }
};
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    ContentChild(TemplateRef, { static: true }),
    __metadata("design:type", TemplateRef)
], NguiInviewPageComponent.prototype, "template", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NguiInviewPageComponent.prototype, "items", void 0);
NguiInviewPageComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2,
        ChangeDetectorRef])
], NguiInviewPageComponent);
export { NguiInviewPageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd1aS9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQXlCSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQXNCbEMsWUFDVSxPQUFtQixFQUNuQixRQUFtQixFQUNuQixLQUF3QjtRQUZ4QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFkbEMsaURBQWlEO1FBQ2pELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsMEVBQTBFO1FBQzFFLGdCQUFXLEdBQWUsRUFBRSxDQUFDO0lBWXpCLENBQUM7SUFFTDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xELHNDQUFzQztZQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUVGLENBQUE7O1lBdERvQixVQUFVO1lBQ1QsU0FBUztZQUNaLGlCQUFpQjs7QUF0QlM7SUFBMUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs4QkFBVyxXQUFXO3lEQUFNO0FBSTdEO0lBQVIsS0FBSyxFQUFFOzhCQUFRLEtBQUs7c0RBQU07QUFQaEIsdUJBQXVCO0lBeEJuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7aUJBQ1E7O0dBRVI7S0FDRixDQUFDO3FDQXdCbUIsVUFBVTtRQUNULFNBQVM7UUFDWixpQkFBaUI7R0F6QnZCLHVCQUF1QixDQTZFbkM7U0E3RVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3LXBhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW52aWV3LXBhZ2UgY29udGVudHNcIlxyXG4gICAgICAobmd1aUludmlldyk9XCJyZXN0b3JlSXRlbXMoKVwiXHJcbiAgICAgIChuZ3VpT3V0dmlldyk9XCJlbXB0eUl0ZW1zKClcIj5cclxuICAgICAgPCEtLSBhZGQgYmxhbmsgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uICAtLT5cclxuICAgICAgPCEtLSBubyBtYXRjaCBmb3VuZCBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXx8ZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW1zOiBpdGVtcywgb3V0Vmlldzogb3V0Vmlld31cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJvdXRWaWV3XCI+e3sgaXRlbXNCYWNrdXAubGVuZ3RoIH19IGl0ZW1zIGhpZGRlbjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj4gRXJyb3I6IHJlcXVpcmVzIFtpdGVtc10gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj4gRXJyb3I6IHJlcXVpcmVzICZsdDtuZy10ZW1wbGF0ZT48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBjb250ZW50cyAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvLyBASW5wdXQoJ3RlbXBsYXRlJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgYXJlIHVzZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xyXG5cclxuICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgb3V0VmlldyA9IGZhbHNlO1xyXG4gIC8qKiBUaGUgY29weSBvZiBpdGVtcy4gVGhpcyBpcyBzZXQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgaXRlbXNCYWNrdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgaGVpZ2h0IG9mIGl0IHJlbWFpbnMgdGhlIHNhbWUgZXZlbiB3aGVuIGl0ZW1zIGdldCBlbXB0eSBvdXQuXHJcbiAgICovXHJcbiAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgZGVzdHJveWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSBpdGVtcyB3aGVuIGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm91dFZpZXcpIHtcclxuICAgICAgdGhpcy5vdXRWaWV3ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXNCYWNrdXAgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRlbnRzRWwgPVxyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW52aWV3LXBhZ2UuY29udGVudHMnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50Lm5nT25EZXN0cm95KCkgaXMgY2FsbGVkJyk7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbXB0eSBpdGVtcyB3aGVuIG5vdCBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgbm90IHJlbmRlcmVkXHJcbiAgICovXHJcbiAgZW1wdHlJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuY29udGVudHNFbCAmJiAhdGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIC8vIHNldCBoZWlnaHQgYmVmb3JlIGVtcHR5aW5nIGNvbnRlbnRzXHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcclxuXHJcbiAgICAgIHRoaXMub3V0VmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXMgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zID0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5zZXRJdGVtcygpIGlzIGNhbGxlZCB3aXRoJywgaXRlbXMpO1xyXG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19