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
export class NguiListItemDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} viewContainer
     * @param {?} listDirective
     * @param {?} virtualListComponent
     * @param {?} autocompleteComponent
     */
    constructor(el, renderer, viewContainer, listDirective, virtualListComponent, autocompleteComponent) {
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
    ngOnInit() {
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
        this.parentListComp = this.listDirective || this.virtualListComponent || this.autocompleteComponent;
        if (!this.parentListComp) {
            throw Error('ngui-list-item requires parent of ngui-list, ngui-virtual-list, or ngui-autocomplete.');
        }
        if ((this.object instanceof NoneSelect) || (this.object instanceof NoMatchFound)) {
            this.viewContainer.clear();
            this.el.nativeElement.innerHTML = this.object.html;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        const /** @type {?} */ thisListItem = this.el.nativeElement;
        const /** @type {?} */ keyCode = event.which || event.keyCode;
        const /** @type {?} */ parentListEl = this.parentListComp.element.nativeElement;
        const /** @type {?} */ listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        const /** @type {?} */ listItemNdx = listItems.indexOf(thisListItem);
        const /** @type {?} */ nextListItem = listItems[listItemNdx + 1] || listItems[0];
        const /** @type {?} */ prevListItem = listItems[listItemNdx - 1] || listItems[listItems.length - 1];
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
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
    }
    /**
     * @return {?}
     */
    mousedown() {
        this.parentListComp.selected.emit(this.object);
    }
    /**
     * @return {?}
     */
    focused() {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    }
    /**
     * @return {?}
     */
    blurred() {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', false);
        }
    }
}
NguiListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-list-item' // tslint:disable-line
            },] },
];
/** @nocollapse */
NguiListItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: NguiListDirective, decorators: [{ type: Optional }, { type: Host }] },
    { type: NguiVirtualListComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: NguiAutocompleteComponent, decorators: [{ type: Optional }, { type: Host }] }
];
NguiListItemDirective.propDecorators = {
    object: [{ type: Input, args: ['item',] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    mousedown: [{ type: HostListener, args: ['click', ['$event'],] }],
    focused: [{ type: HostListener, args: ['focus', ['$event'],] }],
    blurred: [{ type: HostListener, args: ['blur', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU1oRCxNQUFNOzs7Ozs7Ozs7SUFPSixZQUNVLElBQ0EsVUFDQSxlQUNvQixhQUFnQyxFQUNoQyxvQkFBOEMsRUFDOUMscUJBQWdEO1FBTHBFLE9BQUUsR0FBRixFQUFFO1FBQ0YsYUFBUSxHQUFSLFFBQVE7UUFDUixrQkFBYSxHQUFiLGFBQWE7UUFDTyxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEwQjtRQUM5QywwQkFBcUIsR0FBckIscUJBQXFCLENBQTJCO0tBQ3pFOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLG9C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QyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7O1lBbEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7O1lBbkJDLFVBQVU7WUFNVixTQUFTO1lBQ1QsZ0JBQWdCO1lBR1QsaUJBQWlCLHVCQXFCckIsUUFBUSxZQUFJLElBQUk7WUFwQlosd0JBQXdCLHVCQXFCNUIsUUFBUSxZQUFJLElBQUk7WUFwQloseUJBQXlCLHVCQXFCN0IsUUFBUSxZQUFJLElBQUk7OztxQkFabEIsS0FBSyxTQUFDLE1BQU07c0JBNEJaLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBdUJsQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWFoQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQUloQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQU1oQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3B0aW9uYWwsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5ndWlMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5cclxuLy8gdGFiaW5kZXgsIGtleWRvd24sIGtleXVwKEVOVEVSLCBFU0MpLCBjbGlja1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdC1pdGVtJyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnaXRlbScpIG9iamVjdDogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcblxyXG4gIG5leHRTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwcmV2U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcGFyZW50TGlzdENvbXA6IE5ndWlMaXN0RGlyZWN0aXZlIHwgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IHwgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGxpc3REaXJlY3RpdmU6IE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIHZpcnR1YWxMaXN0Q29tcG9uZW50OiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgYXV0b2NvbXBsZXRlQ29tcG9uZW50OiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50XHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wID0gdGhpcy5saXN0RGlyZWN0aXZlIHx8IHRoaXMudmlydHVhbExpc3RDb21wb25lbnQgfHwgdGhpcy5hdXRvY29tcGxldGVDb21wb25lbnQ7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50TGlzdENvbXApIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ25ndWktbGlzdC1pdGVtIHJlcXVpcmVzIHBhcmVudCBvZiBuZ3VpLWxpc3QsIG5ndWktdmlydHVhbC1saXN0LCBvciBuZ3VpLWF1dG9jb21wbGV0ZS4nKTtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb25lU2VsZWN0KSB8fCAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb01hdGNoRm91bmQpKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5vYmplY3QuaHRtbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgdXAsIGRvd24sIGxlZnQsIHJpZ2h0XHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pIGtleWRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRoaXNMaXN0SXRlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgcGFyZW50TGlzdEVsID0gdGhpcy5wYXJlbnRMaXN0Q29tcC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBsaXN0SXRlbXM6IEFycmF5PEhUTUxFbGVtZW50PlxyXG4gICAgICA9IEFycmF5LmZyb20ocGFyZW50TGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ25ndWktbGlzdC1pdGVtJykpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW1OZHggPSBsaXN0SXRlbXMuaW5kZXhPZih0aGlzTGlzdEl0ZW0pO1xyXG4gICAgY29uc3QgbmV4dExpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4ICsgMV0gfHwgbGlzdEl0ZW1zWzBdO1xyXG4gICAgY29uc3QgcHJldkxpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4IC0gMV0gfHwgbGlzdEl0ZW1zW2xpc3RJdGVtcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgICAgY2FzZSAzNzogY2FzZSAzODogLy8gdXAgYXJyb3csIGxlZnQgYXJyb3dcclxuICAgICAgICBwcmV2TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOTogY2FzZSA0MDogLy8gZG93biBhcnJvdywgcmlnaHQgYXJyb3dcclxuICAgICAgICBuZXh0TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgZW50ZXIoMTMpLCBlc2MoMjcpXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKSBrZXl1cChldmVudCk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XHJcbiAgICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5lc2NhcGVkLmVtaXQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgbW91c2Vkb3duKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSkgZm9jdXNlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pIGJsdXJyZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==