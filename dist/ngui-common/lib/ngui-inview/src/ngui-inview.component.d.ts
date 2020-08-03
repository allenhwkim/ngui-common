import { ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-inview>
 * ```
 */
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiInviewComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NguiInviewComponent, "ngui-inview", never, { "observerOptions": "observerOptions"; "blurEnabled": "blurEnabled"; "options": "options"; }, { "inview": "inview"; "notInview": "notInview"; }, ["template"], never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbIm5ndWktaW52aWV3LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vKipcclxuICogQW4gZWxlbWVudCB0aGF0IGxpc3RlbnMgdG8gdmlld3BvcnQgcG9zaXRpb25pbmcgYW5kIGZpcmVzIGluVmlldyBhbmQgbm90SW52aWV3IGV2ZW50c1xyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbnZpZXcgW29ic2VydmVyT3B0aW9uc109XCJteU9ic2VydmVyT3B0aW9uc1wiIChpbnZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW52aWV3PlxyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5ndWlJbnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHBsYXRmb3JtSWQ7XHJcbiAgICAvKiogPG5nLXRlbXBsYXRlPiByZWZlcmVuY2UgKi9cclxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICAgIG9ic2VydmVyT3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0O1xyXG4gICAgLyoqIERlcHJlY2F0ZWQgY29uZmlnLiBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC5cclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLiAqL1xyXG4gICAgb3B0aW9uczogYW55O1xyXG4gICAgLyoqIENvbnRyb2xzIHdoZXRoZXIgYmx1ciBlZmZlY3QgaXMgYXBwbGllZCB0byBhIGNvbXBvbmVudCB3aXRoIGxlc3MgdGhhbiA4MCUgaW50ZXJzZWN0aW9uIHJhdGlvLlxyXG4gICAgICogT25seSBhcHBsaWVzIHdoZW4gdGhlcmUgYXJlIG5vIFwiaW52aWV3XCIgZXZlbnQgaGFuZGxlcnMgZGVmaW5lZC5cclxuICAgICAqKi9cclxuICAgIGJsdXJFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT47XHJcbiAgICBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PjtcclxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgKi9cclxuICAgIGlzSW52aWV3OiBib29sZWFuO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyA4MCUgaW4gdmlld3BvcnQuIFVzZWQgYnkgdGhlIGRlZmF1bHQgY2FsbGJhY2sgKi9cclxuICAgIG9uY2U4MFBjdFZpc2libGU6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwbGF0Zm9ybUlkOiBhbnkpO1xyXG4gICAgLyoqIFN0YXJ0cyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIC8qKiBzdG9wIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgLyoqIGZpcmVzIChpbnZpZXcpIGFuZCAobm90SW52aWV3KSBldmVudHMgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB2aXNpYmxlIG9yIG5vdCB2aXNpYmxlICAqL1xyXG4gICAgaGFuZGxlSW50ZXJzZWN0KGVudHJpZXM6IGFueSk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHQgaW50ZXJzZWN0aW9uIGhhbmRsZXIsIHdoaWNoIHNldHMgYmx1ciBkZXBlbmRlcyBvbiBpbnRlcnNlY3Rpb24gcmF0aW9cclxuICAgICAqIHRoaXMgd29uJ3QgYmUgaW52b2tlZCBpZiB1c2VyIHByb3ZpZGVzIGFueSAoaW52aWV3KSBldmVudC4gZS5nLiAoaW52aWV3KT1cInNvbWV0aGluZygpXCJcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnk6IGFueSk6IGFueTtcclxufVxyXG4iXX0=