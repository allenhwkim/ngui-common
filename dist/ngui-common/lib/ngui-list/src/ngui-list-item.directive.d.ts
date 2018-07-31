import { ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
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
}
