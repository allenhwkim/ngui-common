import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { fireEvent } from '../../ngui-utils/src/fire-event';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NoMatchFound } from './no-match-found';
import { NoneSelect } from './none-select';
import { fromEvent } from 'rxjs';
export class NguiAutocompleteComponent extends NguiVirtualListComponent {
    constructor() {
        super(...arguments);
        this.minInputChars = 1;
        this.blankOption = 'Select One';
        this.noMatchItem = 'No Match Found';
        this._focused = { input: false, listItem: false };
    }
    /**
     * returns autocomplete display condition
     * autocompolete list is only visible
     *   - when input element is focused or list element is focused
     *   - when input value has enought characters
     *   - and user just did not selected or escaped
     */
    get isReady() {
        const selectedOrEscaped = this._selectedFromList || this._escapedFromList;
        const focused = this._focused.input || this._focused.listItem;
        const minChars = this.inputEl.value.length >= this.minInputChars;
        return (!selectedOrEscaped && focused && minChars);
    }
    ngOnInit() {
        this.inputEl = document.querySelector('#' + this.for); // tslint:disable-line
        this.positionThisUnderInputEl();
        fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
        this.inputEl.addEventListener('focus', this.onInputElFocused.bind(this));
        this.inputEl.addEventListener('blur', this.onInputElBlurred.bind(this));
        this.selected.subscribe(this.onSelected.bind(this));
        this.escaped.subscribe(this.onEscaped.bind(this));
    }
    onSelected(value) {
        this._selectedFromList = true;
        this.inputEl.focus();
        this._lastSelected = value;
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
    }
    onEscaped() {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
    }
    onInputElFocused(event) {
        this.isListLoading = false;
        if (typeof this._orgInputValue === 'undefined') {
            this._orgInputValue = this.inputEl.value;
        }
        this._prevInputValue = this.inputEl.value;
        this.setFocused('input', true);
    }
    onInputElBlurred() {
        this.setFocused('input', false);
    }
    clearList() {
        this.inviewPages.forEach(compRef => {
            compRef.destroy();
        });
        this.inviewPages = [];
    }
    onInputElKeyup(event) {
        const firstList = this.element.nativeElement.querySelector('ngui-list-item');
        if (event.key === 'Enter' || event.key === 'Escape') {
            if (firstList) {
                fireEvent(firstList, 'keyup', { key: event.key });
            }
            else {
                this.onEscaped();
            }
        }
        else if ((event.key === 'ArrowDown' || event.key === 'ArrowRight') && firstList) {
            firstList.focus();
        }
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            //
        }
        else if (this.inputEl.value.length >= this.minInputChars) {
            this._selectedFromList = false;
            this._escapedFromList = false;
            this.addAutocompleteList();
        }
    }
    /** Complete the first page of autocomplete */
    addAutocompleteList() {
        if (this.isReady) {
            clearTimeout(this._acTimer);
            this._acTimer = setTimeout(() => {
                this.isListLoading = false; // ???????/
                this._prevInputValue = this.inputEl.value;
                this._escapedFromList = false;
                this._selectedFromList = false;
                this.clearList();
                this.addAnInviewPageToPages();
            }, 200);
        }
    }
    /** Complete after the first page of autocomplete when it scrolls to the bottom */
    addMorePages() {
        if (this.inviewPages.length) {
            this.addAnInviewPageToPages();
        }
    }
    setFocused(elType, val) {
        if (val) {
            clearTimeout(this._focusTimer);
            this._focused = { input: false, listItem: false };
            this._focused[elType] = true;
        }
        else {
            this._focusTimer = setTimeout(() => {
                this._focused[elType] = false;
                this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
            }, 100);
        }
    }
    positionThisUnderInputEl() {
        const thisEl = this.element.nativeElement;
        const thisInputElBCR = this.inputEl.getBoundingClientRect();
        const top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;
        this.renderer.setStyle(thisEl, 'left', `${thisInputElBCR.left}px`);
        this.renderer.setStyle(thisEl, 'top', `${top}px`);
        this.renderer.setStyle(thisEl, 'minWidth', `${thisInputElBCR.width}px`);
    }
    // set items of NguiInviewPageComponent
    addList(items) {
        this.isListLoading = false;
        // TODO: ........ for 1st page only, show no match found or blank option
        let noMatchItem;
        let blankItem = {};
        if (this.inviewPages.length === 1) {
            if (this.noMatchItem && (!items || items.length === 0)) { // add no match item
                noMatchItem = new NoMatchFound();
                blankItem.html = this.noMatchItem;
            }
            else if (this.blankOption) {
                blankItem = new NoneSelect();
                blankItem.html = this.blankOption;
            }
        }
        const allItems = [].concat(noMatchItem, blankItem, items).filter(x => x);
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
    }
}
NguiAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-autocomplete',
                template: `
    <ng-container *ngIf="isReady">
      <div class="ngui-autocomplete">
        <div #pages></div>
      </div>
      <ngui-inview (inview)="addMorePages()"></ngui-inview>
    </ng-container>
  `,
                styles: [`
    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}
    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }
  `]
            },] }
];
NguiAutocompleteComponent.propDecorators = {
    for: [{ type: Input }],
    minInputChars: [{ type: Input }],
    blankOption: [{ type: Input }],
    noMatchItem: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBaUIvQixNQUFNLE9BQU8seUJBQTBCLFNBQVEsd0JBQXdCO0lBZnZFOztRQWlCVyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUMzQixnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBTXhDLGFBQVEsR0FBUSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBNkpsRCxDQUFDO0lBcEpDOzs7Ozs7T0FNRztJQUNILElBQUksT0FBTztRQUNULE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxD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LENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7WUFwTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7OztHQU9UO3lCQUNROzs7R0FHUjthQUNGOzs7a0JBRUUsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFHTCxZQUFZLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2ZpcmUtZXZlbnQnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1hdXRvY29tcGxldGUnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNSZWFkeVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd1aS1hdXRvY29tcGxldGVcIj5cclxuICAgICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZE1vcmVQYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge3Bvc2l0aW9uOiBhYnNvbHV0ZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgbWF4LWhlaWdodDogMzAwcHg7IG92ZXJmbG93OiBhdXRvfVxyXG4gICAgLm5ndWktYXV0b2NvbXBsZXRlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgcGFkZGluZzogNHB4IH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCBleHRlbmRzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZm9yOiBzdHJpbmc7IC8vIGlucHV0IHRhZyBpZFxyXG4gIEBJbnB1dCgpIG1pbklucHV0Q2hhcnMgPSAxO1xyXG4gIEBJbnB1dCgpIGJsYW5rT3B0aW9uID0gJ1NlbGVjdCBPbmUnO1xyXG4gIEBJbnB1dCgpIG5vTWF0Y2hJdGVtID0gJ05vIE1hdGNoIEZvdW5kJztcclxuXHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIF9mb2N1c2VkOiBhbnkgPSB7aW5wdXQ6IGZhbHNlLCBsaXN0SXRlbTogZmFsc2V9O1xyXG4gIF9mb2N1c1RpbWVyO1xyXG4gIF9hY1RpbWVyO1xyXG4gIF9zZWxlY3RlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gIF9lc2NhcGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgX29yZ0lucHV0VmFsdWU6IHN0cmluZztcclxuICBfcHJldklucHV0VmFsdWU6IHN0cmluZztcclxuICBfbGFzdFNlbGVjdGVkOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgYXV0b2NvbXBsZXRlIGRpc3BsYXkgY29uZGl0aW9uXHJcbiAgICogYXV0b2NvbXBvbGV0ZSBsaXN0IGlzIG9ubHkgdmlzaWJsZVxyXG4gICAqICAgLSB3aGVuIGlucHV0IGVsZW1lbnQgaXMgZm9jdXNlZCBvciBsaXN0IGVsZW1lbnQgaXMgZm9jdXNlZFxyXG4gICAqICAgLSB3aGVuIGlucHV0IHZhbHVlIGhhcyBlbm91Z2h0IGNoYXJhY3RlcnNcclxuICAgKiAgIC0gYW5kIHVzZXIganVzdCBkaWQgbm90IHNlbGVjdGVkIG9yIGVzY2FwZWRcclxuICAgKi9cclxuICBnZXQgaXNSZWFkeSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkT3JFc2NhcGVkID0gdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCB8fCB0aGlzLl9lc2NhcGVkRnJvbUxpc3Q7XHJcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5fZm9jdXNlZC5pbnB1dCB8fCB0aGlzLl9mb2N1c2VkLmxpc3RJdGVtO1xyXG4gICAgY29uc3QgbWluQ2hhcnMgPSB0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoID49IHRoaXMubWluSW5wdXRDaGFycztcclxuXHJcbiAgICByZXR1cm4gKCFzZWxlY3RlZE9yRXNjYXBlZCAmJiBmb2N1c2VkICYmIG1pbkNoYXJzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5mb3IpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB0aGlzLnBvc2l0aW9uVGhpc1VuZGVySW5wdXRFbCgpO1xyXG5cclxuICAgIGZyb21FdmVudCh0aGlzLmlucHV0RWwsICdrZXl1cCcpLnN1YnNjcmliZSh0aGlzLm9uSW5wdXRFbEtleXVwLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vbklucHV0RWxGb2N1c2VkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLm9uSW5wdXRFbEJsdXJyZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkLnN1YnNjcmliZSh0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmVzY2FwZWQuc3Vic2NyaWJlKHRoaXMub25Fc2NhcGVkLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZCh2YWx1ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIHRoaXMuX2xhc3RTZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAgICAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgfVxyXG5cclxuICBvbkVzY2FwZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSB0aGlzLl9vcmdJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxGb2N1c2VkKGV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsQmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Rm9jdXNlZCgnaW5wdXQnLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhckxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzLmZvckVhY2goY29tcFJlZiA9PiB7XHJcbiAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzID0gW107XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmlyc3RMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbmd1aS1saXN0LWl0ZW0nKTtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpZiAoZmlyc3RMaXN0KSB7XHJcbiAgICAgICAgZmlyZUV2ZW50KGZpcnN0TGlzdCwgJ2tleXVwJywge2tleTogZXZlbnQua2V5fSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vbkVzY2FwZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICgoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JykgJiYgZmlyc3RMaXN0KSB7XHJcbiAgICAgIGZpcnN0TGlzdC5mb2N1cygpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XHJcbiAgICAgIC8vXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkQXV0b2NvbXBsZXRlTGlzdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSAqL1xyXG4gIGFkZEF1dG9jb21wbGV0ZUxpc3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hY1RpbWVyKTtcclxuICAgICAgdGhpcy5fYWNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlOyAvLyA/Pz8/Pz8/L1xyXG4gICAgICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsZWFyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIGFmdGVyIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSB3aGVuIGl0IHNjcm9sbHMgdG8gdGhlIGJvdHRvbSAqL1xyXG4gIGFkZE1vcmVQYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEZvY3VzZWQoZWxUeXBlOiAnaW5wdXQnIHwgJ2xpc3RJdGVtJywgdmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9mb2N1c1RpbWVyKTtcclxuICAgICAgdGhpcy5fZm9jdXNlZCA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9mb2N1c1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNlZFtlbFR5cGVdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzRWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHRoaXNJbnB1dEVsQkNSID0gdGhpcy5pbnB1dEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgdG9wID0gdGhpc0lucHV0RWxCQ1IudG9wICsgdGhpc0lucHV0RWxCQ1IuaGVpZ2h0ICsgd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICdsZWZ0JywgYCR7dGhpc0lucHV0RWxCQ1IubGVmdH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICd0b3AnLCBgJHt0b3B9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbWluV2lkdGgnLCBgJHt0aGlzSW5wdXRFbEJDUi53aWR0aH1weGApO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVE9ETzogLi4uLi4uLi4gZm9yIDFzdCBwYWdlIG9ubHksIHNob3cgbm8gbWF0Y2ggZm91bmQgb3IgYmxhbmsgb3B0aW9uXHJcbiAgICBsZXQgbm9NYXRjaEl0ZW06IGFueTtcclxuICAgIGxldCBibGFua0l0ZW06IGFueSA9IHt9O1xyXG4gICAgaWYgKHRoaXMuaW52aWV3UGFnZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLm5vTWF0Y2hJdGVtICYmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSkgeyAvLyBhZGQgbm8gbWF0Y2ggaXRlbVxyXG4gICAgICAgIG5vTWF0Y2hJdGVtID0gbmV3IE5vTWF0Y2hGb3VuZCgpO1xyXG4gICAgICAgIGJsYW5rSXRlbS5odG1sID0gdGhpcy5ub01hdGNoSXRlbTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmJsYW5rT3B0aW9uKSB7XHJcbiAgICAgICAgYmxhbmtJdGVtID0gbmV3IE5vbmVTZWxlY3QoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMuYmxhbmtPcHRpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGxJdGVtcyA9IFtdLmNvbmNhdChub01hdGNoSXRlbSwgYmxhbmtJdGVtLCBpdGVtcykuZmlsdGVyKHggPT4geCk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoYWxsSXRlbXMpO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19