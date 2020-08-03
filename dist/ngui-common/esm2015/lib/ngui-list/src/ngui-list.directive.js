import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
let NguiListDirective = class NguiListDirective {
    constructor(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new EventEmitter();
    }
};
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NguiListDirective.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NguiListDirective.prototype, "escaped", void 0);
NguiListDirective = __decorate([
    Directive({
        selector: 'ngui-list' // tslint:disable-line
    }),
    __metadata("design:paramtypes", [ElementRef])
], NguiListDirective);
export { NguiListDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLWxpc3Qvc3JjL25ndWktbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFLdkIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFNNUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUx0QyxzREFBc0Q7UUFDNUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELDhEQUE4RDtRQUNwRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFaEIsQ0FBQztDQUM1QyxDQUFBOztZQUQ2QixVQUFVOztBQUo1QjtJQUFULE1BQU0sRUFBRTs4QkFBVyxZQUFZO21EQUEyQjtBQUVqRDtJQUFULE1BQU0sRUFBRTs4QkFBVSxZQUFZO2tEQUEyQjtBQUovQyxpQkFBaUI7SUFIN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVcsQ0FBQyxzQkFBc0I7S0FDN0MsQ0FBQztxQ0FPNEIsVUFBVTtHQU4zQixpQkFBaUIsQ0FPN0I7U0FQWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0JyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdERpcmVjdGl2ZSB7XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxyXG59XHJcbiJdfQ==