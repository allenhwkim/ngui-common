/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /**
         * Controls whether blur effect is applied to a component with less than 80% intersection ratio.
         * Only applies when there are no "inview" event handlers defined.
         *
         */
        this.blurEnabled = true;
        this.inview = new EventEmitter();
        this.notInview = new EventEmitter();
        /**
         * indicates that this element is in viewport
         */
        this.isInview = false;
        /**
         * indicates that this element is 80% in viewport. Used by the default callback
         */
        this.once80PctVisible = false;
    }
    /** Starts IntersectionObserver */
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    NguiInviewComponent.prototype.ngOnInit = /**
     * Starts IntersectionObserver
     * @return {?}
     */
    function () {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** stop IntersectionObserver */
    /**
     * stop IntersectionObserver
     * @return {?}
     */
    NguiInviewComponent.prototype.ngOnDestroy = /**
     * stop IntersectionObserver
     * @return {?}
     */
    function () {
        this.observer.disconnect();
    };
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    /**
     * fires (inview) and (notInview) events when this component is visible or not visible
     * @param {?} entries
     * @return {?}
     */
    NguiInviewComponent.prototype.handleIntersect = /**
     * fires (inview) and (notInview) events when this component is visible or not visible
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            if (entry['isIntersecting']) {
                _this.isInview = true;
                _this.defaultInviewHandler(entry);
                _this.inview.emit(entry);
            }
            else {
                _this.notInview.emit(entry);
            }
        });
    };
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     * @param {?} entry
     * @return {?}
     */
    NguiInviewComponent.prototype.defaultInviewHandler = /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            var /** @type {?} */ opacity = entry.intersectionRatio * (1 / 0.8);
            var /** @type {?} */ blur_1 = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            var /** @type {?} */ filter = "blur(" + blur_1 + "px)";
            Object.assign(entry.target.style, { opacity: opacity, filter: filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    };
    NguiInviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-inview',
                    template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
                    styles: [':host {display: block;}']
                },] },
    ];
    /** @nocollapse */
    NguiInviewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        observerOptions: [{ type: Input }],
        options: [{ type: Input }],
        blurEnabled: [{ type: Input }],
        inview: [{ type: Output }],
        notInview: [{ type: Output }]
    };
    return NguiInviewComponent;
}());
export { NguiInviewComponent };
function NguiInviewComponent_tsickle_Closure_declarations() {
    /**
     * <ng-template> reference
     * @type {?}
     */
    NguiInviewComponent.prototype.template;
    /**
     * IntersectionObserver options
     * @type {?}
     */
    NguiInviewComponent.prototype.observerOptions;
    /**
     * Deprecated config. Use `observerOptions` instead.
     * @deprecated Use `observerOptions` instead.
     * @type {?}
     */
    NguiInviewComponent.prototype.options;
    /**
     * Controls whether blur effect is applied to a component with less than 80% intersection ratio.
     * Only applies when there are no "inview" event handlers defined.
     *
     * @type {?}
     */
    NguiInviewComponent.prototype.blurEnabled;
    /** @type {?} */
    NguiInviewComponent.prototype.inview;
    /** @type {?} */
    NguiInviewComponent.prototype.notInview;
    /** @type {?} */
    NguiInviewComponent.prototype.observer;
    /**
     * indicates that this element is in viewport
     * @type {?}
     */
    NguiInviewComponent.prototype.isInview;
    /**
     * indicates that this element is 80% in viewport. Used by the default callback
     * @type {?}
     */
    NguiInviewComponent.prototype.once80PctVisible;
    /** @type {?} */
    NguiInviewComponent.prototype.element;
    /** @type {?} */
    NguiInviewComponent.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7SUEwQ2hELDZCQUNjLFNBQ3FCLFVBQWU7UUFEcEMsWUFBTyxHQUFQLE9BQU87UUFDYyxlQUFVLEdBQVYsVUFBVSxDQUFLOzs7OytCQXBCRyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQzs7Ozs7OzJCQU8zRSxJQUFJO3NCQUVXLElBQUksWUFBWSxFQUFFO3lCQUNmLElBQUksWUFBWSxFQUFFOzs7O3dCQUloRCxLQUFLOzs7O2dDQUVHLEtBQUs7S0FLdkI7SUFFQyxrQ0FBa0M7Ozs7O0lBQ3BDLHNDQUFROzs7O0lBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDtLQUNGO0lBRUMsZ0NBQWdDOzs7OztJQUNsQyx5Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUM1QjtJQUVDLDJGQUEyRjs7Ozs7O0lBQzdGLDZDQUFlOzs7OztJQUFmLFVBQWdCLE9BQU87UUFBdkIsaUJBVUM7UUFUQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0M7WUFDL0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFQzs7O09BR0c7Ozs7Ozs7SUFDTCxrREFBb0I7Ozs7OztJQUFwQixVQUFxQixLQUFLO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvRSxNQUFNLENBQUM7U0FDUjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLHFCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDcEQscUJBQU0sTUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0QscUJBQU0sTUFBTSxHQUFHLFVBQVEsTUFBSSxRQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFDLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQztTQUN0RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBRXBDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDOUI7S0FDRjs7Z0JBdEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLDRHQUdQO29CQUNILE1BQU0sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNwQzs7OztnQkE3QkcsVUFBVTtnREF1REwsTUFBTSxTQUFDLFdBQVc7OzsyQkF2QnhCLFlBQVksU0FBQyxXQUFXO2tDQUd4QixLQUFLOzBCQUdMLEtBQUs7OEJBSUwsS0FBSzt5QkFFTCxNQUFNOzRCQUNOLE1BQU07OzhCQWhEVDs7U0FpQ2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lELFxyXG4gICAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vKipcclxuICogQW4gZWxlbWVudCB0aGF0IGxpc3RlbnMgdG8gdmlld3BvcnQgcG9zaXRpb25pbmcgYW5kIGZpcmVzIGluVmlldyBhbmQgbm90SW52aWV3IGV2ZW50c1xyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbi12aWV3IFtvYnNlcnZlck9wdGlvbnNdPVwibXlPYnNlcnZlck9wdGlvbnNcIiAoaW5WaWV3KT1cImRvQSgpXCIgKG5vdEludmlldyk9XCJkb0IoKVwiPlxyXG4gKiAgIDxpbWcgKm5nSWYgc3JjPVwiaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzgwMC8zMDA/aW1hZ2U9MT5cclxuICogPC9uZ3VpLWluLXZpZXc+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJbnZpZXdcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgYCxcclxuICBzdHlsZXM6IFsnOmhvc3Qge2Rpc3BsYXk6IGJsb2NrO30nXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIC8qKiA8bmctdGVtcGxhdGU+IHJlZmVyZW5jZSAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICAvKiogRGVwcmVjYXRlZCBjb25maWcuIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gIC8qKiBDb250cm9scyB3aGV0aGVyIGJsdXIgZWZmZWN0IGlzIGFwcGxpZWQgdG8gYSBjb21wb25lbnQgd2l0aCBsZXNzIHRoYW4gODAlIGludGVyc2VjdGlvbiByYXRpby5cclxuICAgKiBPbmx5IGFwcGxpZXMgd2hlbiB0aGVyZSBhcmUgbm8gXCJpbnZpZXdcIiBldmVudCBoYW5kbGVycyBkZWZpbmVkLlxyXG4gICAqKi9cclxuICBASW5wdXQoKSBibHVyRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBpbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0ICovXHJcbiAgaXNJbnZpZXcgPSBmYWxzZTtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgODAlIGluIHZpZXdwb3J0LiBVc2VkIGJ5IHRoZSBkZWZhdWx0IGNhbGxiYWNrICovXHJcbiAgb25jZTgwUGN0VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHtcclxuICB9XHJcblxyXG4gICAgLyoqIFN0YXJ0cyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICB0aGlzLm9ic2VydmVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaGFuZGxlSW50ZXJzZWN0LmJpbmQodGhpcyksIHRoaXMub2JzZXJ2ZXJPcHRpb25zKTtcclxuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqIHN0b3AgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgICAvKiogZmlyZXMgKGludmlldykgYW5kIChub3RJbnZpZXcpIGV2ZW50cyB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHZpc2libGUgb3Igbm90IHZpc2libGUgICovXHJcbiAgaGFuZGxlSW50ZXJzZWN0KGVudHJpZXMpOiB2b2lkIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcclxuICAgICAgaWYgKGVudHJ5Wydpc0ludGVyc2VjdGluZyddKSB7XHJcbiAgICAgICAgdGhpcy5pc0ludmlldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5pbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ub3RJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHQgaW50ZXJzZWN0aW9uIGhhbmRsZXIsIHdoaWNoIHNldHMgYmx1ciBkZXBlbmRlcyBvbiBpbnRlcnNlY3Rpb24gcmF0aW9cclxuICAgICAqIHRoaXMgd29uJ3QgYmUgaW52b2tlZCBpZiB1c2VyIHByb3ZpZGVzIGFueSAoaW52aWV3KSBldmVudC4gZS5nLiAoaW52aWV3KT1cInNvbWV0aGluZygpXCJcclxuICAgICAqL1xyXG4gIGRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTogYW55IHtcclxuICAgIGlmICghdGhpcy5ibHVyRW5hYmxlZCB8fCB0aGlzLm9uY2U4MFBjdFZpc2libGUgfHwgdGhpcy5pbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDwgMC44KSB7XHJcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqICgxIC8gMC44KTtcclxuICAgICAgY29uc3QgYmx1ciA9IDIwIC0gTWF0aC5mbG9vcihlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqIDEwKSAqIDQ7XHJcbiAgICAgIGNvbnN0IGZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICBPYmplY3QuYXNzaWduKGVudHJ5LnRhcmdldC5zdHlsZSwge29wYWNpdHksIGZpbHRlcn0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICBlbnRyeS50YXJnZXQuc3R5bGUuZmlsdGVyID0gJ3Vuc2V0JztcclxuXHJcbiAgICAgIHRoaXMub25jZTgwUGN0VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==