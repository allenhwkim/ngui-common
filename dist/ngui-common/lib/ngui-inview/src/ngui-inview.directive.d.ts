import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
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
}
