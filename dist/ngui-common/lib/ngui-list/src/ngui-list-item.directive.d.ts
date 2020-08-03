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

//# sourceMappingURL=ngui-list-item.directive.d.ts.map