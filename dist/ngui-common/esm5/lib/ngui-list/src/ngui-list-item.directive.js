/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Host, HostListener, Input, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
import { NoneSelect } from './none-select';
import { NoMatchFound } from './no-match-found';
var NguiListItemDirective = /** @class */ (function () {
    function NguiListItemDirective(el, renderer, viewContainer, listDirective, virtualListComponent, autocompleteComponent) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.listDirective = listDirective;
        this.virtualListComponent = virtualListComponent;
        this.autocompleteComponent = autocompleteComponent;
    }
    /**
     * @return {?}
     */
    NguiListItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
        this.parentListComp = this.listDirective || this.virtualListComponent || this.autocompleteComponent;
        if (!this.parentListComp) {
            throw Error('ngui-list-item requires parent of ngui-list, ngui-virtual-list, or ngui-autocomplete.');
        }
        if ((this.object instanceof NoneSelect) || (this.object instanceof NoMatchFound)) {
            this.viewContainer.clear();
            this.el.nativeElement.innerHTML = this.object.html;
        }
    };
    // handles keyboard up, down, left, right
    /**
     * @param {?} event
     * @return {?}
     */
    NguiListItemDirective.prototype.keydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ thisListItem = this.el.nativeElement;
        var /** @type {?} */ keyCode = event.which || event.keyCode;
        var /** @type {?} */ parentListEl = this.parentListComp.element.nativeElement;
        var /** @type {?} */ listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        var /** @type {?} */ listItemNdx = listItems.indexOf(thisListItem);
        var /** @type {?} */ nextListItem = listItems[listItemNdx + 1] || listItems[0];
        var /** @type {?} */ prevListItem = listItems[listItemNdx - 1] || listItems[listItems.length - 1];
        switch (keyCode) {
            case 37:
            case 38:
                // up arrow, left arrow
                prevListItem.focus();
                break;
            case 39:
            case 40:
                // down arrow, right arrow
                nextListItem.focus();
                break;
            default:
                break;
        }
    };
    // handles keyboard enter(13), esc(27)
    /**
     * @param {?} event
     * @return {?}
     */
    NguiListItemDirective.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.key) {
            case 'Enter':
                this.parentListComp.selected.emit(this.object);
                break;
            case 'Escape':
                this.parentListComp.escaped.emit();
                break;
            default:
                break;
        }
    };
    /**
     * @return {?}
     */
    NguiListItemDirective.prototype.mousedown = /**
     * @return {?}
     */
    function () {
        this.parentListComp.selected.emit(this.object);
    };
    /**
     * @return {?}
     */
    NguiListItemDirective.prototype.focused = /**
     * @return {?}
     */
    function () {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    };
    /**
     * @return {?}
     */
    NguiListItemDirective.prototype.blurred = /**
     * @return {?}
     */
    function () {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', false);
        }
    };
    NguiListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ngui-list-item' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    NguiListItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef },
        { type: NguiListDirective, decorators: [{ type: Optional }, { type: Host }] },
        { type: NguiVirtualListComponent, decorators: [{ type: Optional }, { type: Host }] },
        { type: NguiAutocompleteComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    NguiListItemDirective.propDecorators = {
        object: [{ type: Input, args: ['item',] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['click', ['$event'],] }],
        focused: [{ type: HostListener, args: ['focus', ['$event'],] }],
        blurred: [{ type: HostListener, args: ['blur', ['$event'],] }]
    };
    return NguiListItemDirective;
}());
export { NguiListItemDirective };
function NguiListItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NguiListItemDirective.prototype.object;
    /** @type {?} */
    NguiListItemDirective.prototype.nextSibling;
    /** @type {?} */
    NguiListItemDirective.prototype.prevSibling;
    /** @type {?} */
    NguiListItemDirective.prototype.parentListComp;
    /** @type {?} */
    NguiListItemDirective.prototype.el;
    /** @type {?} */
    NguiListItemDirective.prototype.renderer;
    /** @type {?} */
    NguiListItemDirective.prototype.viewContainer;
    /** @type {?} */
    NguiListItemDirective.prototype.listDirective;
    /** @type {?} */
    NguiListItemDirective.prototype.virtualListComponent;
    /** @type {?} */
    NguiListItemDirective.prototype.autocompleteComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7SUFhOUMsK0JBQ1UsSUFDQSxVQUNBLGVBQ29CLGFBQWdDLEVBQ2hDLG9CQUE4QyxFQUM5QyxxQkFBZ0Q7UUFMcEUsT0FBRSxHQUFGLEVBQUU7UUFDRixhQUFRLEdBQVIsUUFBUTtRQUNSLGtCQUFhLEdBQWIsYUFBYTtRQUNPLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTBCO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMkI7S0FDekU7Ozs7SUFFTCx3Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFB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LENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7Z0JBbEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFuQkMsVUFBVTtnQkFNVixTQUFTO2dCQUNULGdCQUFnQjtnQkFHVCxpQkFBaUIsdUJBcUJyQixRQUFRLFlBQUksSUFBSTtnQkFwQlosd0JBQXdCLHVCQXFCNUIsUUFBUSxZQUFJLElBQUk7Z0JBcEJaLHlCQUF5Qix1QkFxQjdCLFFBQVEsWUFBSSxJQUFJOzs7eUJBWmxCLEtBQUssU0FBQyxNQUFNOzBCQTRCWixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQXVCbEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFhaEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFJaEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFNaEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Z0NBakdsQzs7U0FzQmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3B0aW9uYWwsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5ndWlMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5cclxuLy8gdGFiaW5kZXgsIGtleWRvd24sIGtleXVwKEVOVEVSLCBFU0MpLCBjbGlja1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdC1pdGVtJyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnaXRlbScpIG9iamVjdDogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcblxyXG4gIG5leHRTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwcmV2U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcGFyZW50TGlzdENvbXA6IE5ndWlMaXN0RGlyZWN0aXZlIHwgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IHwgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGxpc3REaXJlY3RpdmU6IE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIHZpcnR1YWxMaXN0Q29tcG9uZW50OiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgYXV0b2NvbXBsZXRlQ29tcG9uZW50OiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50XHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wID0gdGhpcy5saXN0RGlyZWN0aXZlIHx8IHRoaXMudmlydHVhbExpc3RDb21wb25lbnQgfHwgdGhpcy5hdXRvY29tcGxldGVDb21wb25lbnQ7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50TGlzdENvbXApIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ25ndWktbGlzdC1pdGVtIHJlcXVpcmVzIHBhcmVudCBvZiBuZ3VpLWxpc3QsIG5ndWktdmlydHVhbC1saXN0LCBvciBuZ3VpLWF1dG9jb21wbGV0ZS4nKTtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb25lU2VsZWN0KSB8fCAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb01hdGNoRm91bmQpKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5vYmplY3QuaHRtbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgdXAsIGRvd24sIGxlZnQsIHJpZ2h0XHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pIGtleWRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRoaXNMaXN0SXRlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgcGFyZW50TGlzdEVsID0gdGhpcy5wYXJlbnRMaXN0Q29tcC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBsaXN0SXRlbXM6IEFycmF5PEhUTUxFbGVtZW50PlxyXG4gICAgICA9IEFycmF5LmZyb20ocGFyZW50TGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ25ndWktbGlzdC1pdGVtJykpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW1OZHggPSBsaXN0SXRlbXMuaW5kZXhPZih0aGlzTGlzdEl0ZW0pO1xyXG4gICAgY29uc3QgbmV4dExpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4ICsgMV0gfHwgbGlzdEl0ZW1zWzBdO1xyXG4gICAgY29uc3QgcHJldkxpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4IC0gMV0gfHwgbGlzdEl0ZW1zW2xpc3RJdGVtcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgIGNhc2UgMzc6IGNhc2UgMzg6IC8vIHVwIGFycm93LCBsZWZ0IGFycm93XHJcbiAgICAgIHByZXZMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzk6IGNhc2UgNDA6IC8vIGRvd24gYXJyb3csIHJpZ2h0IGFycm93XHJcbiAgICAgIG5leHRMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCBlbnRlcigxMyksIGVzYygyNylcclxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleXVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0VzY2FwZSc6XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuZXNjYXBlZC5lbWl0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG1vdXNlZG93bigpOiB2b2lkIHtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIGZvY3VzZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBibHVycmVkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=