import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A block of component that listens to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view

 ### Example
 ```html
 <ngui-inview-page [items]="items">
   <ng-template let-items="items">
     <div *ngIf="items else noItems">
       <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
     </div>
   </ng-template>
 </ngui-inview-page>
 ```
 */
export declare class NguiInviewPageComponent implements OnInit, OnDestroy {
    private element;
    private renderer;
    private cdRef;
    /** Allow users to change the contents */
    template: TemplateRef<any>;
    /** List of elements that are used to render this element */
    items: Array<any>;
    /** IntersectionObserver options */
    observerOptions: IntersectionObserverInit;
    /** Indicates that the page of out of viewport */
    outView: boolean;
    /** The copy of items. This is set when this element is out of viewport */
    itemsBackup: Array<any>;
    /**
     * The first element of this component.
     * The height of it remains the same even when items get empty out.
     */
    contentsEl: HTMLElement;
    destroyed: boolean;
    constructor(element: ElementRef, renderer: Renderer2, cdRef: ChangeDetectorRef);
    /**
     * Restore items when in viewport, so that elements are rendered
     */
    restoreItems(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    emptyItems(): void;
    setItems(items: Array<any>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NguiInviewPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NguiInviewPageComponent, "ngui-inview-page", never, { "items": "items"; "observerOptions": "observerOptions"; }, {}, ["template"], never>;
}
