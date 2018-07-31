/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, Renderer2, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [options]="myOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.options = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
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
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
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
        if (this.once80PctVisible || this.inview.observers.length) {
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
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        options: [{ type: Input }],
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
    NguiInviewComponent.prototype.options;
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
    NguiInviewComponent.prototype.renderer;
    /** @type {?} */
    NguiInviewComponent.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7O0lBaUM5Qyw2QkFDWSxTQUNBLFVBQ3FCLFVBQWU7UUFGcEMsWUFBTyxHQUFQLE9BQU87UUFDUCxhQUFRLEdBQVIsUUFBUTtRQUNhLGVBQVUsR0FBVixVQUFVLENBQUs7Ozs7dUJBYnhCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO3NCQUMvQixJQUFJLFlBQVksRUFBRTt5QkFDZixJQUFJLFlBQVksRUFBRTs7Ozt3QkFJaEQsS0FBSzs7OztnQ0FFRyxLQUFLO0tBTXZCO0lBRUQsa0NBQWtDOzs7OztJQUNsQyxzQ0FBUTs7OztJQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckQ7S0FDSjtJQUVELGdDQUFnQzs7Ozs7SUFDaEMseUNBQVc7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDOUI7SUFFRCwyRkFBMkY7Ozs7OztJQUMzRiw2Q0FBZTs7Ozs7SUFBZixVQUFnQixPQUFPO1FBQXZCLGlCQVVDO1FBVEcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtTQUNKLENBQUMsQ0FBQztLQUNOO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsa0RBQW9COzs7Ozs7SUFBcEIsVUFBcUIsS0FBSztRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLHFCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDcEQscUJBQU0sTUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0QscUJBQU0sTUFBTSxHQUFHLFVBQVEsTUFBSSxRQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFDLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQztTQUN4RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBRXBDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7S0FDSjs7Z0JBMUVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLDRHQUdUO29CQUNELE1BQU0sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUN0Qzs7OztnQkE5QkcsVUFBVTtnQkFRVixTQUFTO2dEQXdDSixNQUFNLFNBQUMsV0FBVzs7OzJCQWZ0QixZQUFZLFNBQUMsV0FBVzswQkFFeEIsS0FBSzt5QkFDTCxNQUFNOzRCQUNOLE1BQU07OzhCQXhDWDs7U0FrQ2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lELFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vKipcclxuICogQW4gZWxlbWVudCB0aGF0IGxpc3RlbnMgdG8gdmlld3BvcnQgcG9zaXRpb25pbmcgYW5kIGZpcmVzIGluVmlldyBhbmQgbm90SW52aWV3IGV2ZW50c1xyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbi12aWV3IFtvcHRpb25zXT1cIm15T3B0aW9uc1wiIChpblZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW4tdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd1aS1pbnZpZXcnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJbnZpZXdcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogWyc6aG9zdCB7ZGlzcGxheTogYmxvY2s7fSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIDxuZy10ZW1wbGF0ZT4gcmVmZXJlbmNlICovXHJcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnkgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICBAT3V0cHV0KCkgaW52aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgKi9cclxuICAgIGlzSW52aWV3ID0gZmFsc2U7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIDgwJSBpbiB2aWV3cG9ydC4gVXNlZCBieSB0aGUgZGVmYXVsdCBjYWxsYmFjayAqL1xyXG4gICAgb25jZTgwUGN0VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaGFuZGxlSW50ZXJzZWN0LmJpbmQodGhpcyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBzdG9wIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZmlyZXMgKGludmlldykgYW5kIChub3RJbnZpZXcpIGV2ZW50cyB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHZpc2libGUgb3Igbm90IHZpc2libGUgICovXHJcbiAgICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5Wydpc0ludGVyc2VjdGluZyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW52aWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVmYXVsdCBpbnRlcnNlY3Rpb24gaGFuZGxlciwgd2hpY2ggc2V0cyBibHVyIGRlcGVuZGVzIG9uIGludGVyc2VjdGlvbiByYXRpb1xyXG4gICAgICogdGhpcyB3b24ndCBiZSBpbnZva2VkIGlmIHVzZXIgcHJvdmlkZXMgYW55IChpbnZpZXcpIGV2ZW50LiBlLmcuIChpbnZpZXcpPVwic29tZXRoaW5nKClcIlxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25jZTgwUGN0VmlzaWJsZSB8fCB0aGlzLmludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA8IDAuOCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcGFjaXR5ID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAoMSAvIDAuOCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsdXIgPSAyMCAtIE1hdGguZmxvb3IoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAxMCkgKiA0O1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlbnRyeS50YXJnZXQuc3R5bGUsIHtvcGFjaXR5LCBmaWx0ZXJ9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5maWx0ZXIgPSAndW5zZXQnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbmNlODBQY3RWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19