import { AfterViewInit, ChangeDetectorRef, ComponentRef, ElementRef, EventEmitter, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { DynamicComponentService } from '../../ngui-utils/src/dynamic-component.service';
import { NguiInviewPageComponent } from './ngui-inview-page.component';
/**
 * Virtual List
 *
 * The `<ngui-inview ..>` inserts <ngui-inview-page> into
 * `<div #pages>` when it is in viewport
 * When it's inserted, it will be pushed down, which makes it out of viewport.
 * User scrolls down to see the bottom of the list,
 * then it will insert another `<ngui-inview-page>` again.
 *
 * <ngui-inview-page> listens to (nguiInview) and (nguiOutview) events,
 * when <ngui-inview-page> is out of view port, it empties out the contents.
 * and it restores back the contents when it is in viewport again.

 ### Example
 ```html
 <ngui-virtual-list (bottomInview)="loadItems($event)">
   <ng-template let-items="items">
     <div *ngIf="!items">Loading</div>
     <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
   </ng-template>
 </ngui-virtual-list>
 ```
 */
import * as ɵngcc0 from '@angular/core';
export declare class NguiVirtualListComponent implements AfterViewInit {
    renderer: Renderer2;
    element: ElementRef;
    dynamicComponentService: DynamicComponentService;
    cdr: ChangeDetectorRef;
    /** the container NguiInviewPage will be inserted */
    pagesRef: ViewContainerRef;
    /** Template of NguiInviewPage. Allow users to define their own template  */
    template: TemplateRef<any>;
    /** Fired when child `<ngui-list-item>` is selected */
    selected: EventEmitter<any>;
    /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
    escaped: EventEmitter<any>;
    /**
     * Event fired when bottom of the virtual list is in view
     * The handler of this event must call `$event.addItems(items: Array<any>)` to fill contents
     * If not, only the first page is loaded, and rest of the pages won't be loaded;
  
     ### Example
     ```html
     <ngui-virtual-list (bottomInview)="loadItems($event)">
       <ng-template let-items="items">
         <div *ngIf="items else noItems">
            <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
         </div>
         <ng-template #noItems>Loading</ng-template>
       </ng-template>
     </ngui-virtual-list>
     ```
     */
    bottomInview: EventEmitter<any>;
    /** The last NguiInviewPageComponent being inserted */
    inviewPage: ComponentRef<NguiInviewPageComponent>;
    _focused: boolean;
    /** Indicates if a page is still loading */
    isListLoading: boolean;
    inviewPages: Array<ComponentRef<NguiInviewPageComponent>>;
    constructor(renderer: Renderer2, element: ElementRef, dynamicComponentService: DynamicComponentService, cdr: ChangeDetectorRef);
    /** Check if necessary input and output is provided */
    ngAfterViewInit(): void;
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     */
    addAnInviewPageToPages(): void;
    addList(items: Array<any>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiVirtualListComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NguiVirtualListComponent, "ngui-virtual-list", never, {}, { "selected": "selected"; "escaped": "escaped"; "bottomInview": "bottomInview"; }, ["template"], never>;
}

//# sourceMappingURL=ngui-virtual-list.component.d.ts.map