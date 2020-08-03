import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
export class NguiListDirective {
    constructor(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new EventEmitter();
    }
}
NguiListDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-list' // tslint:disable-line
            },] }
];
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
NguiListDirective.propDecorators = {
    selected: [{ type: Output }],
    escaped: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGlCQUFpQjtJQU01QixZQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBTHRDLHNEQUFzRDtRQUM1QyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0QsOERBQThEO1FBQ3BELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVoQixDQUFDOzs7WUFUNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXLENBQUMsc0JBQXNCO2FBQzdDOzs7WUFQQyxVQUFVOzs7dUJBVVQsTUFBTTtzQkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdCcgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3REaXJlY3RpdmUge1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cclxufVxyXG4iXX0=