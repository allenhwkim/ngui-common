import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [options]="myOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
export declare class NguiInviewComponent implements OnInit, OnDestroy {
    private element;
    private renderer;
    private platformId;
    /** <ng-template> reference */
    template: TemplateRef<any>;
    /** IntersectionObserver options */
    options: any;
    inview: EventEmitter<any>;
    notInview: EventEmitter<any>;
    observer: IntersectionObserver;
    /** indicates that this element is in viewport */
    isInview: boolean;
    /** indicates that this element is 80% in viewport. Used by the default callback */
    once80PctVisible: boolean;
    constructor(element: ElementRef, renderer: Renderer2, platformId: any);
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
