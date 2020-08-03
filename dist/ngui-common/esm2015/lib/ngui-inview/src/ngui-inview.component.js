import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-inview>
 * ```
 */
export class NguiInviewComponent {
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /** Controls whether blur effect is applied to a component with less than 80% intersection ratio.
         * Only applies when there are no "inview" event handlers defined.
         **/
        this.blurEnabled = true;
        this.inview = new EventEmitter();
        this.notInview = new EventEmitter();
        /** indicates that this element is in viewport */
        this.isInview = false;
        /** indicates that this element is 80% in viewport. Used by the default callback */
        this.once80PctVisible = false;
    }
    /** Starts IntersectionObserver */
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /** stop IntersectionObserver */
    ngOnDestroy() {
        this.observer.disconnect();
    }
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry['isIntersecting']) {
                this.isInview = true;
                this.defaultInviewHandler(entry);
                this.inview.emit(entry);
            }
            else {
                this.notInview.emit(entry);
            }
        });
    }
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    defaultInviewHandler(entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            const opacity = entry.intersectionRatio * (1 / 0.8);
            const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            const filter = `blur(${blur}px)`;
            Object.assign(entry.target.style, { opacity, filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    }
}
NguiInviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-inview',
                template: `
        <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
        </ng-container>
    `,
                styles: [':host {display: block;}']
            },] }
];
NguiInviewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NguiInviewComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef, { static: true },] }],
    observerOptions: [{ type: Input }],
    options: [{ type: Input }],
    blurEnabled: [{ type: Input }],
    inview: [{ type: Output }],
    notInview: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVsRDs7Ozs7Ozs7R0FRRztBQVNILE1BQU0sT0FBTyxtQkFBbUI7SUF1QjlCLFlBQ2MsT0FBbUIsRUFDRSxVQUFlO1FBRHBDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDRSxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBckJoRCxtQ0FBbUM7UUFDNUIsb0JBQWUsR0FBNkIsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUluRzs7WUFFSTtRQUNLLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLFdBQU0sR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxjQUFTLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7UUFHaEYsaURBQWlEO1FBQ25ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDZixtRkFBbUY7UUFDckYscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBS3pCLENBQUM7SUFFQyxrQ0FBa0M7SUFDcEMsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFFRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRUMsZ0NBQWdDO0lBQ2xDLFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFQywyRkFBMkY7SUFDN0YsZUFBZSxDQUFDLE9BQU87UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWdDLEVBQUUsRUFBRTtZQUNuRCxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVDOzs7T0FHRztJQUNMLG9CQUFvQixDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUM5RSxPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDakMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxJQUFJLEtBQUssQ0FBQztZQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUVwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7O1lBdEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7S0FHUDt5QkFDTSx5QkFBeUI7YUFDbkM7OztZQTdCRyxVQUFVOzRDQXVETCxNQUFNLFNBQUMsV0FBVzs7O3VCQXZCeEIsWUFBWSxTQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7OEJBR3hDLEtBQUs7c0JBR0wsS0FBSzswQkFJTCxLQUFLO3FCQUVMLE1BQU07d0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb250ZW50Q2hpbGQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRCxcclxuICAgIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEFuIGVsZW1lbnQgdGhhdCBsaXN0ZW5zIHRvIHZpZXdwb3J0IHBvc2l0aW9uaW5nIGFuZCBmaXJlcyBpblZpZXcgYW5kIG5vdEludmlldyBldmVudHNcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktaW52aWV3IFtvYnNlcnZlck9wdGlvbnNdPVwibXlPYnNlcnZlck9wdGlvbnNcIiAoaW52aWV3KT1cImRvQSgpXCIgKG5vdEludmlldyk9XCJkb0IoKVwiPlxyXG4gKiAgIDxpbWcgKm5nSWYgc3JjPVwiaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzgwMC8zMDA/aW1hZ2U9MT5cclxuICogPC9uZ3VpLWludmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ludmlld1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBgLFxyXG4gIHN0eWxlczogWyc6aG9zdCB7ZGlzcGxheTogYmxvY2s7fSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIDxuZy10ZW1wbGF0ZT4gcmVmZXJlbmNlICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICAvKiogRGVwcmVjYXRlZCBjb25maWcuIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gIC8qKiBDb250cm9scyB3aGV0aGVyIGJsdXIgZWZmZWN0IGlzIGFwcGxpZWQgdG8gYSBjb21wb25lbnQgd2l0aCBsZXNzIHRoYW4gODAlIGludGVyc2VjdGlvbiByYXRpby5cclxuICAgKiBPbmx5IGFwcGxpZXMgd2hlbiB0aGVyZSBhcmUgbm8gXCJpbnZpZXdcIiBldmVudCBoYW5kbGVycyBkZWZpbmVkLlxyXG4gICAqKi9cclxuICBASW5wdXQoKSBibHVyRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBpbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbm90SW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgKi9cclxuICBpc0ludmlldyA9IGZhbHNlO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyA4MCUgaW4gdmlld3BvcnQuIFVzZWQgYnkgdGhlIGRlZmF1bHQgY2FsbGJhY2sgKi9cclxuICBvbmNlODBQY3RWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogc3RvcCBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBmaXJlcyAoaW52aWV3KSBhbmQgKG5vdEludmlldykgZXZlbnRzIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdmlzaWJsZSBvciBub3QgdmlzaWJsZSAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLmlzSW52aWV3ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5vdEludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVmYXVsdCBpbnRlcnNlY3Rpb24gaGFuZGxlciwgd2hpY2ggc2V0cyBibHVyIGRlcGVuZGVzIG9uIGludGVyc2VjdGlvbiByYXRpb1xyXG4gICAgICogdGhpcyB3b24ndCBiZSBpbnZva2VkIGlmIHVzZXIgcHJvdmlkZXMgYW55IChpbnZpZXcpIGV2ZW50LiBlLmcuIChpbnZpZXcpPVwic29tZXRoaW5nKClcIlxyXG4gICAgICovXHJcbiAgZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpOiBhbnkge1xyXG4gICAgaWYgKCF0aGlzLmJsdXJFbmFibGVkIHx8IHRoaXMub25jZTgwUGN0VmlzaWJsZSB8fCB0aGlzLmludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPCAwLjgpIHtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IGVudHJ5LmludGVyc2VjdGlvblJhdGlvICogKDEgLyAwLjgpO1xyXG4gICAgICBjb25zdCBibHVyID0gMjAgLSBNYXRoLmZsb29yKGVudHJ5LmludGVyc2VjdGlvblJhdGlvICogMTApICogNDtcclxuICAgICAgY29uc3QgZmlsdGVyID0gYGJsdXIoJHtibHVyfXB4KWA7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oZW50cnkudGFyZ2V0LnN0eWxlLCB7b3BhY2l0eSwgZmlsdGVyfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5maWx0ZXIgPSAndW5zZXQnO1xyXG5cclxuICAgICAgdGhpcy5vbmNlODBQY3RWaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19