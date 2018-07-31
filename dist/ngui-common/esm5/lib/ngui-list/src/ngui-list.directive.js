/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
var NguiListDirective = /** @class */ (function () {
    function NguiListDirective(element) {
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
    NguiListDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ngui-list' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    NguiListDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NguiListDirective.propDecorators = {
        selected: [{ type: Output }],
        escaped: [{ type: Output }]
    };
    return NguiListDirective;
}());
export { NguiListDirective };
function NguiListDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLWxpc3Qvc3JjL25ndWktbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7O0lBV3JCLDJCQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZOzs7O3dCQUpFLElBQUksWUFBWSxFQUFFOzs7O3VCQUVuQixJQUFJLFlBQVksRUFBRTtLQUVkOztnQkFUNUMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0Qjs7OztnQkFQQyxVQUFVOzs7MkJBVVQsTUFBTTswQkFFTixNQUFNOzs0QkFkVDs7U0FVYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0JyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdERpcmVjdGl2ZSB7XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxyXG59XHJcbiJdfQ==