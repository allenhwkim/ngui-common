import { ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
export declare class NguiInviewComponent implements OnInit, OnDestroy {
    private element;
    private platformId;
    /** <ng-template> reference */
    template: TemplateRef<any>;
    /** IntersectionObserver options */
    observerOptions: IntersectionObserverInit;
    /** Deprecated config. Use `observerOptions` instead.
     * @deprecated Use `observerOptions` instead. */
    options: any;
    /** Controls whether blur effect is applied to a component with less than 80% intersection ratio.
     * Only applies when there are no "inview" event handlers defined.
     **/
    blurEnabled: boolean;
    inview: EventEmitter<IntersectionObserverEntry>;
    notInview: EventEmitter<IntersectionObserverEntry>;
    observer: IntersectionObserver;
    /** indicates that this element is in viewport */
    isInview: boolean;
    /** indicates that this element is 80% in viewport. Used by the default callback */
    once80PctVisible: boolean;
    constructor(element: ElementRef, platformId: any);
    /** Starts IntersectionObserver */
    ngOnInit(): void;
    /** stop IntersectionObserver */
    ngOnDestroy(): void;
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    handleIntersect(entries: any): void;
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    defaultInviewHandler(entry: any): any;
}
