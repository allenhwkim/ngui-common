import { ElementRef, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NguiListDirective {
    element: ElementRef;
    /** Fired when child `<ngui-list-item>` is selected */
    selected: EventEmitter<any>;
    /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
    escaped: EventEmitter<any>;
    constructor(element: ElementRef);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiListDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NguiListDirective, "ngui-list", never, {}, { "selected": "selected"; "escaped": "escaped"; }, never>;
}

//# sourceMappingURL=ngui-list.directive.d.ts.map