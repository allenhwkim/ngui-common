import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
import * as ɵngcc0 from '@angular/core';
export declare class NguiInviewDirective implements OnInit, OnDestroy {
    element: ElementRef;
    private platformId;
    observer: IntersectionObserver;
    /** IntersectionObserver options */
    observerOptions: IntersectionObserverInit;
    /** Deprecated config. Use `observerOptions` instead.
     * @deprecated Use `observerOptions` instead. */
    options: any;
    /** Event that will be fired when in viewport */
    nguiInview: EventEmitter<IntersectionObserverEntry>;
    /** Event that will be fired when out of  viewport */
    nguiOutview: EventEmitter<IntersectionObserverEntry>;
    constructor(element: ElementRef, platformId: any);
    /** Starts IntersectionObserver */
    ngOnInit(): void;
    /** Stops IntersectionObserver */
    ngOnDestroy(): void;
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     */
    handleIntersect(entries: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiInviewDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NguiInviewDirective, "[nguiInview], [nguiOutview]", never, { "observerOptions": "observerOptions"; "options": "options"; }, { "nguiInview": "nguiInview"; "nguiOutview": "nguiOutview"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbIm5ndWktaW52aWV3LmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vKipcclxuICogRmlyZXMgKG5ndWlJbnZpZXcpIG9yIChuZ3VpT3V0dmlldykgZXZlbnRzIGRlcGVuZGVudHMgb24gdGhlIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgb3Igbm90XHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOZ3VpSW52aWV3RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgZWxlbWVudDogRWxlbWVudFJlZjtcclxuICAgIHByaXZhdGUgcGxhdGZvcm1JZDtcclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgICBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdDtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICAgIG9wdGlvbnM6IGFueTtcclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBpbiB2aWV3cG9ydCAqL1xyXG4gICAgbmd1aUludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+O1xyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIG91dCBvZiAgdmlld3BvcnQgKi9cclxuICAgIG5ndWlPdXR2aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT47XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwbGF0Zm9ybUlkOiBhbnkpO1xyXG4gICAgLyoqIFN0YXJ0cyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIC8qKiBTdG9wcyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgKG5ndWlJbnZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0XHJcbiAgICAgKiAgYW5kIGZpcmVzIChuZ3VpT3V0dmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgbm90IGluIHZpZXdwb3J0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUludGVyc2VjdChlbnRyaWVzOiBhbnkpOiB2b2lkO1xyXG59XHJcbiJdfQ==