import { Directive, Host, HostListener, Input, Optional } from '@angular/core';
import { NoneSelect } from './none-select';
import { NoMatchFound } from './no-match-found';
import * as i0 from "@angular/core";
import * as i1 from "./ngui-list.directive";
import * as i2 from "./ngui-virtual-list.component";
import * as i3 from "./ngui-autocomplete.component";
// tabindex, keydown, keyup(ENTER, ESC), click
export class NguiListItemDirective {
    constructor(el, renderer, viewContainer, listDirective, virtualListComponent, autocompleteComponent) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.listDirective = listDirective;
        this.virtualListComponent = virtualListComponent;
        this.autocompleteComponent = autocompleteComponent;
    }
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
    keydown(event) {
        const thisListItem = this.el.nativeElement;
        const keyCode = event.which || event.keyCode;
        const parentListEl = this.parentListComp.element.nativeElement;
        const listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        const listItemNdx = listItems.indexOf(thisListItem);
        const nextListItem = listItems[listItemNdx + 1] || listItems[0];
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
    mousedown() {
        this.parentListComp.selected.emit(this.object);
    }
    focused() {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    }
    blurred() {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', false);
        }
    }
}
NguiListItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiListItemDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i1.NguiListDirective, host: true, optional: true }, { token: i2.NguiVirtualListComponent, host: true, optional: true }, { token: i3.NguiAutocompleteComponent, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NguiListItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.2", type: NguiListItemDirective, selector: "ngui-list-item", inputs: { object: ["item", "object"] }, host: { listeners: { "keydown": "keydown($event)", "keyup": "keyup($event)", "click": "mousedown($event)", "focus": "focused($event)", "blur": "blurred($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiListItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ngui-list-item' // eslint-disable-line
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i1.NguiListDirective, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: i2.NguiVirtualListComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: i3.NguiAutocompleteComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }]; }, propDecorators: { object: [{
                type: Input,
                args: ['item']
            }], keydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], keyup: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], mousedown: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], focused: [{
                type: HostListener,
                args: ['focus', ['$event']]
            }], blurred: [{
                type: HostListener,
                args: ['blur', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULElBQUksRUFDSixZQUFZLEVBQ1osS0FBSyxFQUVMLFFBQVEsRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFFaEQsOENBQThDO0FBSTlDLE1BQU0sT0FBTyxxQkFBcUI7SUFPaEMsWUFDVSxFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsYUFBK0IsRUFDWCxhQUFnQyxFQUNoQyxvQkFBOEMsRUFDOUMscUJBQWdEO1FBTHBFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUNYLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTBCO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMkI7SUFDMUUsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsTUFBTSxLQUFLLENBQUMs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QUk7OzBCQUNoQixRQUFROzswQkFBSSxJQUFJOzRDQVpKLE1BQU07c0JBQXBCLEtBQUs7dUJBQUMsTUFBTTtnQkE0QndCLE9BQU87c0JBQTNDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXVCQSxLQUFLO3NCQUF2QyxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFhRSxTQUFTO3NCQUEzQyxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFJRSxPQUFPO3NCQUF6QyxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNQyxPQUFPO3NCQUF4QyxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ3VpTGlzdERpcmVjdGl2ZSB9IGZyb20gJy4vbmd1aS1saXN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9uZVNlbGVjdCB9IGZyb20gJy4vbm9uZS1zZWxlY3QnO1xyXG5pbXBvcnQgeyBOb01hdGNoRm91bmQgfSBmcm9tICcuL25vLW1hdGNoLWZvdW5kJztcclxuXHJcbi8vIHRhYmluZGV4LCBrZXlkb3duLCBrZXl1cChFTlRFUiwgRVNDKSwgY2xpY2tcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWxpc3QtaXRlbScgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoJ2l0ZW0nKSBvYmplY3Q6IGFueTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuICBuZXh0U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJldlNpYmxpbmc6IEhUTUxFbGVtZW50O1xyXG4gIHBhcmVudExpc3RDb21wOiBOZ3VpTGlzdERpcmVjdGl2ZSB8IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB8IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBsaXN0RGlyZWN0aXZlOiBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSB2aXJ0dWFsTGlzdENvbXBvbmVudDogTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGF1dG9jb21wbGV0ZUNvbXBvbmVudDogTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgdGhpcy5wYXJlbnRMaXN0Q29tcCA9IHRoaXMubGlzdERpcmVjdGl2ZSB8fCB0aGlzLnZpcnR1YWxMaXN0Q29tcG9uZW50IHx8IHRoaXMuYXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudExpc3RDb21wKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCduZ3VpLWxpc3QtaXRlbSByZXF1aXJlcyBwYXJlbnQgb2Ygbmd1aS1saXN0LCBuZ3VpLXZpcnR1YWwtbGlzdCwgb3Igbmd1aS1hdXRvY29tcGxldGUuJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgTm9uZVNlbGVjdCkgfHwgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgTm9NYXRjaEZvdW5kKSkge1xyXG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMub2JqZWN0Lmh0bWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBoYW5kbGVzIGtleWJvYXJkIHVwLCBkb3duLCBsZWZ0LCByaWdodFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBrZXlkb3duKGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzTGlzdEl0ZW0gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcclxuICAgIGNvbnN0IHBhcmVudExpc3RFbCA9IHRoaXMucGFyZW50TGlzdENvbXAuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgbGlzdEl0ZW1zOiBBcnJheTxIVE1MRWxlbWVudD5cclxuICAgICAgPSBBcnJheS5mcm9tKHBhcmVudExpc3RFbC5xdWVyeVNlbGVjdG9yQWxsKCduZ3VpLWxpc3QtaXRlbScpKTtcclxuICAgIGNvbnN0IGxpc3RJdGVtTmR4ID0gbGlzdEl0ZW1zLmluZGV4T2YodGhpc0xpc3RJdGVtKTtcclxuICAgIGNvbnN0IG5leHRMaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbU5keCArIDFdIHx8IGxpc3RJdGVtc1swXTtcclxuICAgIGNvbnN0IHByZXZMaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbU5keCAtIDFdIHx8IGxpc3RJdGVtc1tsaXN0SXRlbXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICBjYXNlIDM3OiBjYXNlIDM4OiAvLyB1cCBhcnJvdywgbGVmdCBhcnJvd1xyXG4gICAgICBwcmV2TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM5OiBjYXNlIDQwOiAvLyBkb3duIGFycm93LCByaWdodCBhcnJvd1xyXG4gICAgICBuZXh0TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgZW50ZXIoMTMpLCBlc2MoMjcpXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKSBrZXl1cChldmVudCk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdFc2NhcGUnOlxyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wLmVzY2FwZWQuZW1pdCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBtb3VzZWRvd24oKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKSBmb2N1c2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgYmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19