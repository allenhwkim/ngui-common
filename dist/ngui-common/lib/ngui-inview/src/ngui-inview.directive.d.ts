import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
export declare class NguiInviewDirective implements OnInit, OnDestroy {
    element: ElementRef;
    renderer: Renderer2;
    private platformId;
    observer: IntersectionObserver;
    /** IntersectionObserver options */
    options: any;
    /** Event that will be fired when in viewport */
    nguiInview: EventEmitter<any>;
    /** Event that will be fired when out of  viewport */
    nguiOutview: EventEmitter<any>;
    constructor(element: ElementRef, renderer: Renderer2, platformId: any);
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
