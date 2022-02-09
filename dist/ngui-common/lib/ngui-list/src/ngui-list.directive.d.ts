import { ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NguiListDirective {
    element: ElementRef;
    /** Fired when child `<ngui-list-item>` is selected */
    selected: EventEmitter<any>;
    /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
    escaped: EventEmitter<any>;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NguiListDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NguiListDirective, "ngui-list", never, {}, { "selected": "selected"; "escaped": "escaped"; }, never>;
}
