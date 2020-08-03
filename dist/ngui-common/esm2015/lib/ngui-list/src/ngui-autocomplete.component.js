import { __decorate, __metadata } from "tslib";
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { fireEvent } from '../../ngui-utils/src/fire-event';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NoMatchFound } from './no-match-found';
import { NoneSelect } from './none-select';
import { fromEvent } from 'rxjs';
let NguiAutocompleteComponent = class NguiAutocompleteComponent extends NguiVirtualListComponent {
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
        console.log('NguiAutoCompleteComponent.onSelected() is called', value);
    }
    onEscaped() {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onEscaped() is called');
    }
    onInputElFocused(event) {
        console.log('NguiAutoCompleteComponent.onInputElFocused() is called', event);
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
        console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
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
        console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
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
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NguiAutocompleteComponent.prototype, "for", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NguiAutocompleteComponent.prototype, "minInputChars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NguiAutocompleteComponent.prototype, "blankOption", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NguiAutocompleteComponent.prototype, "noMatchItem", void 0);
__decorate([
    ContentChild(TemplateRef),
    __metadata("design:type", TemplateRef)
], NguiAutocompleteComponent.prototype, "template", void 0);
NguiAutocompleteComponent = __decorate([
    Component({
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
    })
], NguiAutocompleteComponent);
export { NguiAutocompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBaUIvQixJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLHdCQUF3QjtJQUF2RTs7UUFFVyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUMzQixnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBTXhDLGFBQVEsR0FBUSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBa0tsRCxDQUFDO0lBekpDOzs7Ozs7T0FNRztJQUNILElBQUksT0FBTztRQUNULE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FB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QzthQUNuQztpQkFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzNCLFNBQVMsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUM3QixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDbkM7U0FDRjtRQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBRUYsQ0FBQTtBQTNLVTtJQUFSLEtBQUssRUFBRTs7c0RBQWE7QUFDWjtJQUFSLEtBQUssRUFBRTs7Z0VBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzs4REFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7OzhEQUFnQztBQUdiO0lBQTFCLFlBQVksQ0FBQyxXQUFXLENBQUM7OEJBQVcsV0FBVzsyREFBTTtBQVAzQyx5QkFBeUI7SUFmckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtpQkFDUTs7O0dBR1I7S0FDRixDQUFDO0dBQ1cseUJBQXlCLENBNEtyQztTQTVLWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50JztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb01hdGNoRm91bmQgfSBmcm9tICcuL25vLW1hdGNoLWZvdW5kJztcclxuaW1wb3J0IHsgTm9uZVNlbGVjdCB9IGZyb20gJy4vbm9uZS1zZWxlY3QnO1xyXG5pbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktYXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzUmVhZHlcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5ndWktYXV0b2NvbXBsZXRlXCI+XHJcbiAgICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmd1aS1pbnZpZXcgKGludmlldyk9XCJhZGRNb3JlUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtwb3NpdGlvbjogYWJzb2x1dGU7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IG1heC1oZWlnaHQ6IDMwMHB4OyBvdmVyZmxvdzogYXV0b31cclxuICAgIC5uZ3VpLWF1dG9jb21wbGV0ZSB7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IHBhZGRpbmc6IDRweCB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgZXh0ZW5kcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZvcjogc3RyaW5nOyAvLyBpbnB1dCB0YWcgaWRcclxuICBASW5wdXQoKSBtaW5JbnB1dENoYXJzID0gMTtcclxuICBASW5wdXQoKSBibGFua09wdGlvbiA9ICdTZWxlY3QgT25lJztcclxuICBASW5wdXQoKSBub01hdGNoSXRlbSA9ICdObyBNYXRjaCBGb3VuZCc7XHJcblxyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDtcclxuICBfZm9jdXNlZDogYW55ID0ge2lucHV0OiBmYWxzZSwgbGlzdEl0ZW06IGZhbHNlfTtcclxuICBfZm9jdXNUaW1lcjtcclxuICBfYWNUaW1lcjtcclxuICBfc2VsZWN0ZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfZXNjYXBlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gIF9vcmdJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX3ByZXZJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX2xhc3RTZWxlY3RlZDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGF1dG9jb21wbGV0ZSBkaXNwbGF5IGNvbmRpdGlvblxyXG4gICAqIGF1dG9jb21wb2xldGUgbGlzdCBpcyBvbmx5IHZpc2libGVcclxuICAgKiAgIC0gd2hlbiBpbnB1dCBlbGVtZW50IGlzIGZvY3VzZWQgb3IgbGlzdCBlbGVtZW50IGlzIGZvY3VzZWRcclxuICAgKiAgIC0gd2hlbiBpbnB1dCB2YWx1ZSBoYXMgZW5vdWdodCBjaGFyYWN0ZXJzXHJcbiAgICogICAtIGFuZCB1c2VyIGp1c3QgZGlkIG5vdCBzZWxlY3RlZCBvciBlc2NhcGVkXHJcbiAgICovXHJcbiAgZ2V0IGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE9yRXNjYXBlZCA9IHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgfHwgdGhpcy5fZXNjYXBlZEZyb21MaXN0O1xyXG4gICAgY29uc3QgZm9jdXNlZCA9IHRoaXMuX2ZvY3VzZWQuaW5wdXQgfHwgdGhpcy5fZm9jdXNlZC5saXN0SXRlbTtcclxuICAgIGNvbnN0IG1pbkNoYXJzID0gdGhpcy5pbnB1dEVsLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbklucHV0Q2hhcnM7XHJcblxyXG4gICAgcmV0dXJuICghc2VsZWN0ZWRPckVzY2FwZWQgJiYgZm9jdXNlZCAmJiBtaW5DaGFycyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuZm9yKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgdGhpcy5wb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5pbnB1dEVsLCAna2V5dXAnKS5zdWJzY3JpYmUodGhpcy5vbklucHV0RWxLZXl1cC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25JbnB1dEVsRm9jdXNlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vbklucHV0RWxCbHVycmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5zdWJzY3JpYmUodGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5lc2NhcGVkLnN1YnNjcmliZSh0aGlzLm9uRXNjYXBlZC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWQodmFsdWUpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICB0aGlzLl9sYXN0U2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgICAgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25TZWxlY3RlZCgpIGlzIGNhbGxlZCcsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uRXNjYXBlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIGlmICghdGhpcy5fbGFzdFNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IHRoaXMuX29yZ0lucHV0VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7IC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uRXNjYXBlZCgpIGlzIGNhbGxlZCcpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsRm9jdXNlZChldmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEVsRm9jdXNlZCgpIGlzIGNhbGxlZCcsIGV2ZW50KTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vcmdJbnB1dFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLl9vcmdJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcHJldklucHV0VmFsdWUgPSB0aGlzLmlucHV0RWwudmFsdWU7XHJcbiAgICB0aGlzLnNldEZvY3VzZWQoJ2lucHV0JywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxCbHVycmVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMuZm9yRWFjaChjb21wUmVmID0+IHtcclxuICAgICAgY29tcFJlZi5kZXN0cm95KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbklucHV0S2V5dXAoKSBpcyBjYWxsZWQnLCBldmVudC5rZXkpO1xyXG4gICAgY29uc3QgZmlyc3RMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbmd1aS1saXN0LWl0ZW0nKTtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpZiAoZmlyc3RMaXN0KSB7XHJcbiAgICAgICAgZmlyZUV2ZW50KGZpcnN0TGlzdCwgJ2tleXVwJywge2tleTogZXZlbnQua2V5fSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vbkVzY2FwZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICgoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JykgJiYgZmlyc3RMaXN0KSB7XHJcbiAgICAgIGZpcnN0TGlzdC5mb2N1cygpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XHJcbiAgICAgIC8vXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkQXV0b2NvbXBsZXRlTGlzdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSAqL1xyXG4gIGFkZEF1dG9jb21wbGV0ZUxpc3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hY1RpbWVyKTtcclxuICAgICAgdGhpcy5fYWNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlOyAvLyA/Pz8/Pz8/L1xyXG4gICAgICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsZWFyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIGFmdGVyIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSB3aGVuIGl0IHNjcm9sbHMgdG8gdGhlIGJvdHRvbSAqL1xyXG4gIGFkZE1vcmVQYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEZvY3VzZWQoZWxUeXBlOiAnaW5wdXQnIHwgJ2xpc3RJdGVtJywgdmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9mb2N1c1RpbWVyKTtcclxuICAgICAgdGhpcy5fZm9jdXNlZCA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9mb2N1c1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNlZFtlbFR5cGVdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzRWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHRoaXNJbnB1dEVsQkNSID0gdGhpcy5pbnB1dEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgdG9wID0gdGhpc0lucHV0RWxCQ1IudG9wICsgdGhpc0lucHV0RWxCQ1IuaGVpZ2h0ICsgd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICdsZWZ0JywgYCR7dGhpc0lucHV0RWxCQ1IubGVmdH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICd0b3AnLCBgJHt0b3B9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbWluV2lkdGgnLCBgJHt0aGlzSW5wdXRFbEJDUi53aWR0aH1weGApO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJz4+Pj4+PiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVE9ETzogLi4uLi4uLi4gZm9yIDFzdCBwYWdlIG9ubHksIHNob3cgbm8gbWF0Y2ggZm91bmQgb3IgYmxhbmsgb3B0aW9uXHJcbiAgICBsZXQgbm9NYXRjaEl0ZW06IGFueTtcclxuICAgIGxldCBibGFua0l0ZW06IGFueSA9IHt9O1xyXG4gICAgaWYgKHRoaXMuaW52aWV3UGFnZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLm5vTWF0Y2hJdGVtICYmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSkgeyAvLyBhZGQgbm8gbWF0Y2ggaXRlbVxyXG4gICAgICAgIG5vTWF0Y2hJdGVtID0gbmV3IE5vTWF0Y2hGb3VuZCgpO1xyXG4gICAgICAgIGJsYW5rSXRlbS5odG1sID0gdGhpcy5ub01hdGNoSXRlbTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmJsYW5rT3B0aW9uKSB7XHJcbiAgICAgICAgYmxhbmtJdGVtID0gbmV3IE5vbmVTZWxlY3QoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMuYmxhbmtPcHRpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGxJdGVtcyA9IFtdLmNvbmNhdChub01hdGNoSXRlbSwgYmxhbmtJdGVtLCBpdGVtcykuZmlsdGVyKHggPT4geCk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoYWxsSXRlbXMpO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19