import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /** Event that will be fired when in viewport */
        this.nguiInview = new EventEmitter();
        /** Event that will be fired when out of  viewport */
        this.nguiOutview = new EventEmitter();
    }
    /** Starts IntersectionObserver */
    NguiInviewDirective.prototype.ngOnInit = function () {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** Stops IntersectionObserver */
    NguiInviewDirective.prototype.ngOnDestroy = function () {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    };
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     */
    NguiInviewDirective.prototype.handleIntersect = function (entries) {
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
    NguiInviewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewDirective.prototype, "observerOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewDirective.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewDirective.prototype, "nguiInview", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewDirective.prototype, "nguiOutview", void 0);
    NguiInviewDirective = __decorate([
        Directive({
            selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], NguiInviewDirective);
    return NguiInviewDirective;
}());
export { NguiInviewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUVsRDs7R0FFRztBQUlIO0lBY0UsNkJBQ2EsT0FBbUIsRUFDRyxVQUFlO1FBRHJDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDRyxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBYmhELG1DQUFtQztRQUM1QixvQkFBZSxHQUE2QixFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxDQUFDO1FBS2pHLGdEQUFnRDtRQUN4QyxlQUFVLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakYscURBQXFEO1FBQzdDLGdCQUFXLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7SUFLcEYsQ0FBQztJQUVDLGtDQUFrQztJQUNwQyxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFQyxpQ0FBaUM7SUFDbkMseUNBQVcsR0FBWDtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFQzs7O09BR0c7SUFDTCw2Q0FBZSxHQUFmLFVBQWdCLE9BQU87UUFBdkIsaUJBUUM7UUFQQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0M7WUFDL0MsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQW5DcUIsVUFBVTtnREFDekIsTUFBTSxTQUFDLFdBQVc7O0lBWmhCO1FBQVIsS0FBSyxFQUFFOztnRUFBMkY7SUFHMUY7UUFBUixLQUFLLEVBQUU7O3dEQUFjO0lBR1o7UUFBVCxNQUFNLEVBQUU7a0NBQWEsWUFBWTsyREFBaUQ7SUFFekU7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTs0REFBaUQ7SUFaekUsbUJBQW1CO1FBSC9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw2QkFBNkIsQ0FBQyxzQkFBc0I7U0FDakUsQ0FBQztRQWlCTyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTt5Q0FESixVQUFVO09BZnJCLG1CQUFtQixDQW1EL0I7SUFBRCwwQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVzIChuZ3VpSW52aWV3KSBvciAobmd1aU91dHZpZXcpIGV2ZW50cyBkZXBlbmRlbnRzIG9uIHRoZSBlbGVtZW50IGlzIGluIHZpZXdwb3J0IG9yIG5vdFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3VpSW52aWV3XSwgW25ndWlPdXR2aWV3XScgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcblxyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGluIHZpZXdwb3J0ICovXHJcbiAgQE91dHB1dCgpIG5ndWlJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBvdXQgb2YgIHZpZXdwb3J0ICovXHJcbiAgQE91dHB1dCgpIG5ndWlPdXR2aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdG9wcyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5vYnNlcnZlcikge1xyXG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyAobmd1aUludmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcclxuICAgICAqICBhbmQgZmlyZXMgKG5ndWlPdXR2aWV3KSBldmVudCB3aGVuIHRoaXMgZWxlbWVudCBpcyBub3QgaW4gdmlld3BvcnRcclxuICAgICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMubmd1aUludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5ndWlPdXR2aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19