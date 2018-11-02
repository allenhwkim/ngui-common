/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
export class NguiListDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        /**
         * Fired when child `<ngui-list-item>` is selected
         */
        this.selected = new EventEmitter();
        /**
         * Fired when `ESC` key is pressed from `<ngui-list-item>`
         */
        this.escaped = new EventEmitter();
    }
}
NguiListDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-list' // tslint:disable-line
            },] }
];
/** @nocollapse */
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
NguiListDirective.propDecorators = {
    selected: [{ type: Output }],
    escaped: [{ type: Output }]
};
if (false) {
    /**
     * Fired when child `<ngui-list-item>` is selected
     * @type {?}
     */
    NguiListDirective.prototype.selected;
    /**
     * Fired when `ESC` key is pressed from `<ngui-list-item>`
     * @type {?}
     */
    NguiListDirective.prototype.escaped;
    /** @type {?} */
    NguiListDirective.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLWxpc3Qvc3JjL25ndWktbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGlCQUFpQjs7OztJQU01QixZQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZOzs7O1FBSjVCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7OztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFaEIsQ0FBQzs7O1lBVDVDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVyxDQUFDLHNCQUFzQjthQUM3Qzs7OztZQVBDLFVBQVU7Ozt1QkFVVCxNQUFNO3NCQUVOLE1BQU07Ozs7Ozs7SUFGUCxxQ0FBMkQ7Ozs7O0lBRTNELG9DQUEwRDs7SUFFOUMsb0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdCcgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3REaXJlY3RpdmUge1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cclxufVxyXG4iXX0=