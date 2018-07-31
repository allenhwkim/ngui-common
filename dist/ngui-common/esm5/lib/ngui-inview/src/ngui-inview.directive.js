/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.options = {};
        /**
         * Event that will be fired when in viewport
         */
        this.nguiInview = new EventEmitter();
        /**
         * Event that will be fired when out of  viewport
         */
        this.nguiOutview = new EventEmitter();
    }
    /** Starts IntersectionObserver */
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    NguiInviewDirective.prototype.ngOnInit = /**
     * Starts IntersectionObserver
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** Stops IntersectionObserver */
    /**
     * Stops IntersectionObserver
     * @return {?}
     */
    NguiInviewDirective.prototype.ngOnDestroy = /**
     * Stops IntersectionObserver
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    };
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     */
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    NguiInviewDirective.prototype.handleIntersect = /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            if (entry['isIntersecting']) {
                _this.nguiInview.emit(entry);
            }
            else {
                _this.nguiOutview.emit(entry);
            }
        });
    };
    NguiInviewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    NguiInviewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewDirective.propDecorators = {
        options: [{ type: Input }],
        nguiInview: [{ type: Output }],
        nguiOutview: [{ type: Output }]
    };
    return NguiInviewDirective;
}());
export { NguiInviewDirective };
function NguiInviewDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NguiInviewDirective.prototype.observer;
    /**
     * IntersectionObserver options
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
    NguiInviewDirective.prototype.renderer;
    /** @type {?} */
    NguiInviewDirective.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztJQW1COUMsNkJBQ1csU0FDQSxVQUNzQixVQUFlO1FBRnJDLFlBQU8sR0FBUCxPQUFPO1FBQ1AsYUFBUSxHQUFSLFFBQVE7UUFDYyxlQUFVLEdBQVYsVUFBVSxDQUFLOzs7O3VCQVZ4QixFQUFFOzs7OzBCQUdnQixJQUFJLFlBQVksRUFBRTs7OzsyQkFFakIsSUFBSSxZQUFZLEVBQUU7S0FNNUQ7SUFFRCxrQ0FBa0M7Ozs7O0lBQ2xDLHNDQUFROzs7O0lBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyRDtLQUNKO0lBRUQsaUNBQWlDOzs7OztJQUNqQyx5Q0FBVzs7OztJQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDOUI7S0FDSjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILDZDQUFlOzs7Ozs7SUFBZixVQUFnQixPQUFPO1FBQXZCLGlCQVFDO1FBUEcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztTQUNKLENBQUMsQ0FBQztLQUNOOztnQkEvQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7aUJBQzFDOzs7O2dCQWpCRyxVQUFVO2dCQVFWLFNBQVM7Z0RBd0JKLE1BQU0sU0FBQyxXQUFXOzs7MEJBVnRCLEtBQUs7NkJBR0wsTUFBTTs4QkFFTixNQUFNOzs4QkE3Qlg7O1NBb0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRCxcclxuICAgIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVzIChuZ3VpSW52aWV3KSBvciAobmd1aU91dHZpZXcpIGV2ZW50cyBkZXBlbmRlbnRzIG9uIHRoZSBlbGVtZW50IGlzIGluIHZpZXdwb3J0IG9yIG5vdFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3VpSW52aWV3XSwgW25ndWlPdXR2aWV3XScgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuXHJcbiAgICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55ID0ge307XHJcblxyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGluIHZpZXdwb3J0ICovXHJcbiAgICBAT3V0cHV0KCkgbmd1aUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gb3V0IG9mICB2aWV3cG9ydCAqL1xyXG4gICAgQE91dHB1dCgpIG5ndWlPdXR2aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFN0b3BzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLm9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIChuZ3VpSW52aWV3KSBldmVudCB3aGVuIHRoaXMgZWxlbWVudCBpcyBpbiB2aWV3cG9ydFxyXG4gICAgICogIGFuZCBmaXJlcyAobmd1aU91dHZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIG5vdCBpbiB2aWV3cG9ydFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5Wydpc0ludGVyc2VjdGluZyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ndWlJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ndWlPdXR2aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19