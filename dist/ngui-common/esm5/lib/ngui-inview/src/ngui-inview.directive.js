/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, platformId) {
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
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
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
                },] }
    ];
    /** @nocollapse */
    NguiInviewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewDirective.propDecorators = {
        observerOptions: [{ type: Input }],
        options: [{ type: Input }],
        nguiInview: [{ type: Output }],
        nguiOutview: [{ type: Output }]
    };
    return NguiInviewDirective;
}());
export { NguiInviewDirective };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLbEQ7SUFpQkUsNkJBQ2EsT0FBbUIsRUFDRyxVQUFlO1FBRHJDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDRyxlQUFVLEdBQVYsVUFBVSxDQUFLOzs7O1FBWnpDLG9CQUFlLEdBQTZCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUM7Ozs7UUFNekYsZUFBVSxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBRXpFLGdCQUFXLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7SUFLcEYsQ0FBQztJQUVDLGtDQUFrQzs7Ozs7SUFDcEMsc0NBQVE7Ozs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFFRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRUMsaUNBQWlDOzs7OztJQUNuQyx5Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVDOzs7T0FHRzs7Ozs7OztJQUNMLDZDQUFlOzs7Ozs7SUFBZixVQUFnQixPQUFPO1FBQXZCLGlCQVFDO1FBUEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdDO1lBQy9DLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFyREYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkIsQ0FBQyxzQkFBc0I7aUJBQ2pFOzs7O2dCQWhCRyxVQUFVO2dEQWlDTCxNQUFNLFNBQUMsV0FBVzs7O2tDQVp4QixLQUFLOzBCQUdMLEtBQUs7NkJBR0wsTUFBTTs4QkFFTixNQUFNOztJQXVDVCwwQkFBQztDQUFBLEFBdERELElBc0RDO1NBbkRZLG1CQUFtQjs7O0lBQzlCLHVDQUErQjs7Ozs7SUFHL0IsOENBQW1HOzs7Ozs7SUFHbkcsc0NBQXNCOzs7OztJQUd0Qix5Q0FBbUY7Ozs7O0lBRW5GLDBDQUFvRjs7SUFHOUUsc0NBQTBCOztJQUMxQix5Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSURcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBGaXJlcyAobmd1aUludmlldykgb3IgKG5ndWlPdXR2aWV3KSBldmVudHMgZGVwZW5kZW50cyBvbiB0aGUgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCBvciBub3RcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd1aUludmlld10sIFtuZ3VpT3V0dmlld10nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG5cclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICAvKiogRGVwcmVjYXRlZCBjb25maWcuIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBpbiB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpSW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gb3V0IG9mICB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpT3V0dmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogU3RvcHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMub2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgKG5ndWlJbnZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0XHJcbiAgICAgKiAgYW5kIGZpcmVzIChuZ3VpT3V0dmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgbm90IGluIHZpZXdwb3J0XHJcbiAgICAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLm5ndWlJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZ3VpT3V0dmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==