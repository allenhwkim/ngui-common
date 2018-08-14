/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
export class NguiInviewDirective {
    /**
     * @param {?} element
     * @param {?} platformId
     */
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /**
         * Event that will be fired when in viewport
         */
        this.nguiInview = new EventEmitter();
        /**
         * Event that will be fired when out of  viewport
         */
        this.nguiOutview = new EventEmitter();
    }
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /**
     * Stops IntersectionObserver
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    }
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry['isIntersecting']) {
                this.nguiInview.emit(entry);
            }
            else {
                this.nguiOutview.emit(entry);
            }
        });
    }
}
NguiInviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
            },] },
];
/** @nocollapse */
NguiInviewDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NguiInviewDirective.propDecorators = {
    observerOptions: [{ type: Input }],
    options: [{ type: Input }],
    nguiInview: [{ type: Output }],
    nguiOutview: [{ type: Output }]
};
function NguiInviewDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NguiInviewDirective.prototype.observer;
    /**
     * IntersectionObserver options
     * @type {?}
     */
    NguiInviewDirective.prototype.observerOptions;
    /**
     * Deprecated config. Use `observerOptions` instead.
     * @deprecated Use `observerOptions` instead.
     * @type {?}
     */
    NguiInviewDirective.prototype.options;
    /**
     * Event that will be fired when in viewport
     * @type {?}
     */
    NguiInviewDirective.prototype.nguiInview;
    /**
     * Event that will be fired when out of  viewport
     * @type {?}
     */
    NguiInviewDirective.prototype.nguiOutview;
    /** @type {?} */
    NguiInviewDirective.prototype.element;
    /** @type {?} */
    NguiInviewDirective.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFRbEQsTUFBTTs7Ozs7SUFjSixZQUNhLFNBQ3NCLFVBQWU7UUFEckMsWUFBTyxHQUFQLE9BQU87UUFDZSxlQUFVLEdBQVYsVUFBVSxDQUFLOzs7OytCQVpHLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDOzs7OzBCQU14RCxJQUFJLFlBQVksRUFBRTs7OzsyQkFFakIsSUFBSSxZQUFZLEVBQUU7S0FLNUQ7Ozs7O0lBR0QsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO0tBQ0Y7Ozs7O0lBR0QsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0tBQ0Y7Ozs7Ozs7SUFNRCxlQUFlLENBQUMsT0FBTztRQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBZ0MsRUFBRSxFQUFFO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7WUFyREYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7YUFDMUM7Ozs7WUFoQkcsVUFBVTs0Q0FpQ0wsTUFBTSxTQUFDLFdBQVc7Ozs4QkFaeEIsS0FBSztzQkFHTCxLQUFLO3lCQUdMLE1BQU07MEJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVzIChuZ3VpSW52aWV3KSBvciAobmd1aU91dHZpZXcpIGV2ZW50cyBkZXBlbmRlbnRzIG9uIHRoZSBlbGVtZW50IGlzIGluIHZpZXdwb3J0IG9yIG5vdFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3VpSW52aWV3XSwgW25ndWlPdXR2aWV3XScgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcblxyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGluIHZpZXdwb3J0ICovXHJcbiAgQE91dHB1dCgpIG5ndWlJbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIG91dCBvZiAgdmlld3BvcnQgKi9cclxuICBAT3V0cHV0KCkgbmd1aU91dHZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogU3RvcHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMub2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgKG5ndWlJbnZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0XHJcbiAgICAgKiAgYW5kIGZpcmVzIChuZ3VpT3V0dmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgbm90IGluIHZpZXdwb3J0XHJcbiAgICAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLm5ndWlJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZ3VpT3V0dmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==