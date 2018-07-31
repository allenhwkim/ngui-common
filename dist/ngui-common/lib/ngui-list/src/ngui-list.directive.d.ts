import { ElementRef, EventEmitter } from '@angular/core';
export declare class NguiListDirective {
    element: ElementRef;
    /** Fired when child `<ngui-list-item>` is selected */
    selected: EventEmitter<any>;
    /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
    escaped: EventEmitter<any>;
    constructor(element: ElementRef);
}
