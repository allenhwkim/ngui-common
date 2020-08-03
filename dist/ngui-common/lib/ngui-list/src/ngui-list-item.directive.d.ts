import { ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
import * as ɵngcc0 from '@angular/core';
export declare class NguiListItemDirective implements OnInit {
    private el;
    private renderer;
    private viewContainer;
    private listDirective;
    private virtualListComponent;
    private autocompleteComponent;
    object: any;
    nextSibling: HTMLElement;
    prevSibling: HTMLElement;
    parentListComp: NguiListDirective | NguiVirtualListComponent | NguiAutocompleteComponent;
    constructor(el: ElementRef, renderer: Renderer2, viewContainer: ViewContainerRef, listDirective: NguiListDirective, virtualListComponent: NguiVirtualListComponent, autocompleteComponent: NguiAutocompleteComponent);
    ngOnInit(): void;
    keydown(event: any): void;
    keyup(event: any): void;
    mousedown(): void;
    focused(): void;
    blurred(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiListItemDirective, [null, null, null, { optional: true; host: true; }, { optional: true; host: true; }, { optional: true; host: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NguiListItemDirective, "ngui-list-item", never, { "object": "item"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbIm5ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3VpTGlzdERpcmVjdGl2ZSB9IGZyb20gJy4vbmd1aS1saXN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmd1aUxpc3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgZWw7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyO1xyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyO1xyXG4gICAgcHJpdmF0ZSBsaXN0RGlyZWN0aXZlO1xyXG4gICAgcHJpdmF0ZSB2aXJ0dWFsTGlzdENvbXBvbmVudDtcclxuICAgIHByaXZhdGUgYXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG4gICAgb2JqZWN0OiBhbnk7XHJcbiAgICBuZXh0U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcmV2U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgICBwYXJlbnRMaXN0Q29tcDogTmd1aUxpc3REaXJlY3RpdmUgfCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfCBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIGxpc3REaXJlY3RpdmU6IE5ndWlMaXN0RGlyZWN0aXZlLCB2aXJ0dWFsTGlzdENvbXBvbmVudDogTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LCBhdXRvY29tcGxldGVDb21wb25lbnQ6IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIGtleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbiAgICBrZXl1cChldmVudDogYW55KTogdm9pZDtcclxuICAgIG1vdXNlZG93bigpOiB2b2lkO1xyXG4gICAgZm9jdXNlZCgpOiB2b2lkO1xyXG4gICAgYmx1cnJlZCgpOiB2b2lkO1xyXG59XHJcbiJdfQ==