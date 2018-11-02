/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Host, HostListener, Input, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { NguiListDirective } from './ngui-list.directive';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
import { NoneSelect } from './none-select';
import { NoMatchFound } from './no-match-found';
// tabindex, keydown, keyup(ENTER, ESC), click
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
    // handles keyboard up, down, left, right
    /**
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        /** @type {?} */
        const thisListItem = this.el.nativeElement;
        /** @type {?} */
        const keyCode = event.which || event.keyCode;
        /** @type {?} */
        const parentListEl = this.parentListComp.element.nativeElement;
        /** @type {?} */
        const listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        /** @type {?} */
        const listItemNdx = listItems.indexOf(thisListItem);
        /** @type {?} */
        const nextListItem = listItems[listItemNdx + 1] || listItems[0];
        /** @type {?} */
        const prevListItem = listItems[listItemNdx - 1] || listItems[listItems.length - 1];
        switch (keyCode) {
            case 37:
            case 38: // up arrow, left arrow
                prevListItem.focus();
                break;
            case 39:
            case 40: // down arrow, right arrow
                nextListItem.focus();
                break;
            default:
                break;
        }
    }
    // handles keyboard enter(13), esc(27)
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
            },] }
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
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFNaEQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7Ozs7O0lBT2hDLFlBQ1UsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLGFBQStCLEVBQ1gsYUFBZ0MsRUFDaEMsb0JBQThDLEVBQzlDLHFCQUFnRDtRQUxwRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDWCxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEwQjtRQUM5QywwQkFBcUIsR0FBckIscUJBQXFCLENBQTJCO0lBQzFFLENBQUM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25F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WUFNVixTQUFTO1lBQ1QsZ0JBQWdCO1lBR1QsaUJBQWlCLHVCQXFCckIsUUFBUSxZQUFJLElBQUk7WUFwQlosd0JBQXdCLHVCQXFCNUIsUUFBUSxZQUFJLElBQUk7WUFwQloseUJBQXlCLHVCQXFCN0IsUUFBUSxZQUFJLElBQUk7OztxQkFabEIsS0FBSyxTQUFDLE1BQU07c0JBNEJaLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBdUJsQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWFoQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQUloQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQU1oQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBMUVoQyx1Q0FBMkI7O0lBRTNCLDRDQUF5Qjs7SUFDekIsNENBQXlCOztJQUN6QiwrQ0FBeUY7O0lBR3ZGLG1DQUFzQjs7SUFDdEIseUNBQTJCOztJQUMzQiw4Q0FBdUM7O0lBQ3ZDLDhDQUE0RDs7SUFDNUQscURBQTBFOztJQUMxRSxzREFBNEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3QsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmd1aUxpc3REaXJlY3RpdmUgfSBmcm9tICcuL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vbmVTZWxlY3QgfSBmcm9tICcuL25vbmUtc2VsZWN0JztcclxuaW1wb3J0IHsgTm9NYXRjaEZvdW5kIH0gZnJvbSAnLi9uby1tYXRjaC1mb3VuZCc7XHJcblxyXG4vLyB0YWJpbmRleCwga2V5ZG93biwga2V5dXAoRU5URVIsIEVTQyksIGNsaWNrXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0LWl0ZW0nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCdpdGVtJykgb2JqZWN0OiBhbnk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuXHJcbiAgbmV4dFNpYmxpbmc6IEhUTUxFbGVtZW50O1xyXG4gIHByZXZTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwYXJlbnRMaXN0Q29tcDogTmd1aUxpc3REaXJlY3RpdmUgfCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfCBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgbGlzdERpcmVjdGl2ZTogTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgdmlydHVhbExpc3RDb21wb25lbnQ6IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBhdXRvY29tcGxldGVDb21wb25lbnQ6IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnRcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAgPSB0aGlzLmxpc3REaXJlY3RpdmUgfHwgdGhpcy52aXJ0dWFsTGlzdENvbXBvbmVudCB8fCB0aGlzLmF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuICAgIGlmICghdGhpcy5wYXJlbnRMaXN0Q29tcCkge1xyXG4gICAgICB0aHJvdyBFcnJvcignbmd1aS1saXN0LWl0ZW0gcmVxdWlyZXMgcGFyZW50IG9mIG5ndWktbGlzdCwgbmd1aS12aXJ0dWFsLWxpc3QsIG9yIG5ndWktYXV0b2NvbXBsZXRlLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vbmVTZWxlY3QpIHx8ICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vTWF0Y2hGb3VuZCkpIHtcclxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLm9iamVjdC5odG1sO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCB1cCwgZG93biwgbGVmdCwgcmlnaHRcclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkga2V5ZG93bihldmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0xpc3RJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICBjb25zdCBwYXJlbnRMaXN0RWwgPSB0aGlzLnBhcmVudExpc3RDb21wLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGxpc3RJdGVtczogQXJyYXk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgID0gQXJyYXkuZnJvbShwYXJlbnRMaXN0RWwucXVlcnlTZWxlY3RvckFsbCgnbmd1aS1saXN0LWl0ZW0nKSk7XHJcbiAgICBjb25zdCBsaXN0SXRlbU5keCA9IGxpc3RJdGVtcy5pbmRleE9mKHRoaXNMaXN0SXRlbSk7XHJcbiAgICBjb25zdCBuZXh0TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggKyAxXSB8fCBsaXN0SXRlbXNbMF07XHJcbiAgICBjb25zdCBwcmV2TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggLSAxXSB8fCBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xyXG4gICAgY2FzZSAzNzogY2FzZSAzODogLy8gdXAgYXJyb3csIGxlZnQgYXJyb3dcclxuICAgICAgcHJldkxpc3RJdGVtLmZvY3VzKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOTogY2FzZSA0MDogLy8gZG93biBhcnJvdywgcmlnaHQgYXJyb3dcclxuICAgICAgbmV4dExpc3RJdGVtLmZvY3VzKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBoYW5kbGVzIGtleWJvYXJkIGVudGVyKDEzKSwgZXNjKDI3KVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSkga2V5dXAoZXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRXNjYXBlJzpcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5lc2NhcGVkLmVtaXQoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgbW91c2Vkb3duKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSkgZm9jdXNlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pIGJsdXJyZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==