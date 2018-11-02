/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { fireEvent } from '../../ngui-utils/src/fire-event';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { NoMatchFound } from './no-match-found';
import { NoneSelect } from './none-select';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
var NguiAutocompleteComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NguiAutocompleteComponent, _super);
    function NguiAutocompleteComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // input tag id
        _this.minInputChars = 1;
        _this.blankOption = 'Select One';
        _this.noMatchItem = 'No Match Found';
        _this._focused = { input: false, listItem: false };
        return _this;
    }
    Object.defineProperty(NguiAutocompleteComponent.prototype, "isReady", {
        /**
         * returns autocomplete display condition
         * autocompolete list is only visible
         *   - when input element is focused or list element is focused
         *   - when input value has enought characters
         *   - and user just did not selected or escaped
         */
        get: /**
         * returns autocomplete display condition
         * autocompolete list is only visible
         *   - when input element is focused or list element is focused
         *   - when input value has enought characters
         *   - and user just did not selected or escaped
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedOrEscaped = this._selectedFromList || this._escapedFromList;
            /** @type {?} */
            var focused = this._focused.input || this._focused.listItem;
            /** @type {?} */
            var minChars = this.inputEl.value.length >= this.minInputChars;
            return (!selectedOrEscaped && focused && minChars);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.inputEl = (/** @type {?} */ (document.querySelector('#' + this.for))); // tslint:disable-line
        this.positionThisUnderInputEl();
        fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
        this.inputEl.addEventListener('focus', this.onInputElFocused.bind(this));
        this.inputEl.addEventListener('blur', this.onInputElBlurred.bind(this));
        this.selected.subscribe(this.onSelected.bind(this));
        this.escaped.subscribe(this.onEscaped.bind(this));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.onSelected = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._selectedFromList = true;
        this.inputEl.focus();
        this._lastSelected = value;
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onSelected() is called', value);
    };
    /**
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.onEscaped = /**
     * @return {?}
     */
    function () {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onEscaped() is called');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.onInputElFocused = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('NguiAutoCompleteComponent.onInputElFocused() is called', event);
        this.isListLoading = false;
        if (typeof this._orgInputValue === 'undefined') {
            this._orgInputValue = this.inputEl.value;
        }
        this._prevInputValue = this.inputEl.value;
        this.setFocused('input', true);
    };
    /**
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.onInputElBlurred = /**
     * @return {?}
     */
    function () {
        this.setFocused('input', false);
    };
    /**
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.clearList = /**
     * @return {?}
     */
    function () {
        this.inviewPages.forEach(function (compRef) {
            compRef.destroy();
        });
        this.inviewPages = [];
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.onInputElKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
        /** @type {?} */
        var firstList = this.element.nativeElement.querySelector('ngui-list-item');
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
    };
    /** Complete the first page of autocomplete */
    /**
     * Complete the first page of autocomplete
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.addAutocompleteList = /**
     * Complete the first page of autocomplete
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isReady) {
            clearTimeout(this._acTimer);
            this._acTimer = setTimeout(function () {
                _this.isListLoading = false; // ???????/
                _this._prevInputValue = _this.inputEl.value;
                _this._escapedFromList = false;
                _this._selectedFromList = false;
                _this.clearList();
                _this.addAnInviewPageToPages();
            }, 200);
        }
    };
    /** Complete after the first page of autocomplete when it scrolls to the bottom */
    /**
     * Complete after the first page of autocomplete when it scrolls to the bottom
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.addMorePages = /**
     * Complete after the first page of autocomplete when it scrolls to the bottom
     * @return {?}
     */
    function () {
        if (this.inviewPages.length) {
            this.addAnInviewPageToPages();
        }
    };
    /**
     * @param {?} elType
     * @param {?} val
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.setFocused = /**
     * @param {?} elType
     * @param {?} val
     * @return {?}
     */
    function (elType, val) {
        var _this = this;
        if (val) {
            clearTimeout(this._focusTimer);
            this._focused = { input: false, listItem: false };
            this._focused[elType] = true;
        }
        else {
            this._focusTimer = setTimeout(function () {
                _this._focused[elType] = false;
                _this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
            }, 100);
        }
    };
    /**
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.positionThisUnderInputEl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var thisEl = this.element.nativeElement;
        /** @type {?} */
        var thisInputElBCR = this.inputEl.getBoundingClientRect();
        /** @type {?} */
        var top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;
        this.renderer.setStyle(thisEl, 'left', thisInputElBCR.left + "px");
        this.renderer.setStyle(thisEl, 'top', top + "px");
        this.renderer.setStyle(thisEl, 'minWidth', thisInputElBCR.width + "px");
    };
    // set items of NguiInviewPageComponent
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.addList = 
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
        this.isListLoading = false;
        // TODO: ........ for 1st page only, show no match found or blank option
        /** @type {?} */
        var noMatchItem;
        /** @type {?} */
        var blankItem = {};
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
        /** @type {?} */
        var allItems = [].concat(noMatchItem, blankItem, items).filter(function (x) { return x; });
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
    };
    NguiAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-autocomplete',
                    template: "\n    <div *ngIf=\"isReady\" class=\"ngui-autocomplete\">\n      <div #pages></div>\n      <ngui-inview (inview)=\"addMorePages()\"></ngui-inview>\n    </div>\n  ",
                    styles: ["\n    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }\n  "]
                }] }
    ];
    NguiAutocompleteComponent.propDecorators = {
        for: [{ type: Input }],
        minInputChars: [{ type: Input }],
        blankOption: [{ type: Input }],
        noMatchItem: [{ type: Input }],
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return NguiAutocompleteComponent;
}(NguiVirtualListComponent));
export { NguiAutocompleteComponent };
if (false) {
    /** @type {?} */
    NguiAutocompleteComponent.prototype.for;
    /** @type {?} */
    NguiAutocompleteComponent.prototype.minInputChars;
    /** @type {?} */
    NguiAutocompleteComponent.prototype.blankOption;
    /** @type {?} */
    NguiAutocompleteComponent.prototype.noMatchItem;
    /**
     * Template of NguiInviewPage. Allow users to define their own template
     * @type {?}
     */
    NguiAutocompleteComponent.prototype.template;
    /** @type {?} */
    NguiAutocompleteComponent.prototype.inputEl;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._focused;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._focusTimer;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._acTimer;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._selectedFromList;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._escapedFromList;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._orgInputValue;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._prevInputValue;
    /** @type {?} */
    NguiAutocompleteComponent.prototype._lastSelected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktbGlzdC9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRS9EO0lBYStDLHFEQUF3QjtJQWJ2RTtRQUFBLHFFQXlMQzs7UUExS1UsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsaUJBQVcsR0FBRyxZQUFZLENBQUM7UUFDM0IsaUJBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQU14QyxjQUFRLEdBQVEsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7SUFrS2xELENBQUM7SUFsSkMsc0JBQUksOENBQU87UUFQWDs7Ozs7O1dBTUc7Ozs7Ozs7OztRQUNIOztnQkFDUSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGdCQUFnQjs7Z0JBQ25FLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7O2dCQUN2RCxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElB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clxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2ZpcmUtZXZlbnQnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWF1dG9jb21wbGV0ZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJpc1JlYWR5XCIgY2xhc3M9XCJuZ3VpLWF1dG9jb21wbGV0ZVwiPlxyXG4gICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkTW9yZVBhZ2VzKClcIj48L25ndWktaW52aWV3PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBtYXgtaGVpZ2h0OiAzMDBweDsgb3ZlcmZsb3c6IGF1dG99XHJcbiAgICAubmd1aS1hdXRvY29tcGxldGUgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBwYWRkaW5nOiA0cHggfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmb3I6IHN0cmluZzsgLy8gaW5wdXQgdGFnIGlkXHJcbiAgQElucHV0KCkgbWluSW5wdXRDaGFycyA9IDE7XHJcbiAgQElucHV0KCkgYmxhbmtPcHRpb24gPSAnU2VsZWN0IE9uZSc7XHJcbiAgQElucHV0KCkgbm9NYXRjaEl0ZW0gPSAnTm8gTWF0Y2ggRm91bmQnO1xyXG5cclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgX2ZvY3VzZWQ6IGFueSA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgX2ZvY3VzVGltZXI7XHJcbiAgX2FjVGltZXI7XHJcbiAgX3NlbGVjdGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgX2VzY2FwZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfb3JnSW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9wcmV2SW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9sYXN0U2VsZWN0ZWQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhdXRvY29tcGxldGUgZGlzcGxheSBjb25kaXRpb25cclxuICAgKiBhdXRvY29tcG9sZXRlIGxpc3QgaXMgb25seSB2aXNpYmxlXHJcbiAgICogICAtIHdoZW4gaW5wdXQgZWxlbWVudCBpcyBmb2N1c2VkIG9yIGxpc3QgZWxlbWVudCBpcyBmb2N1c2VkXHJcbiAgICogICAtIHdoZW4gaW5wdXQgdmFsdWUgaGFzIGVub3VnaHQgY2hhcmFjdGVyc1xyXG4gICAqICAgLSBhbmQgdXNlciBqdXN0IGRpZCBub3Qgc2VsZWN0ZWQgb3IgZXNjYXBlZFxyXG4gICAqL1xyXG4gIGdldCBpc1JlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPckVzY2FwZWQgPSB0aGlzLl9zZWxlY3RlZEZyb21MaXN0IHx8IHRoaXMuX2VzY2FwZWRGcm9tTGlzdDtcclxuICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLl9mb2N1c2VkLmlucHV0IHx8IHRoaXMuX2ZvY3VzZWQubGlzdEl0ZW07XHJcbiAgICBjb25zdCBtaW5DaGFycyA9IHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzO1xyXG5cclxuICAgIHJldHVybiAoIXNlbGVjdGVkT3JFc2NhcGVkICYmIGZvY3VzZWQgJiYgbWluQ2hhcnMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmZvcik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIHRoaXMucG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk7XHJcblxyXG4gICAgZnJvbUV2ZW50KHRoaXMuaW5wdXRFbCwgJ2tleXVwJykuc3Vic2NyaWJlKHRoaXMub25JbnB1dEVsS2V5dXAuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uSW5wdXRFbEZvY3VzZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25JbnB1dEVsQmx1cnJlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXNjYXBlZC5zdWJzY3JpYmUodGhpcy5vbkVzY2FwZWQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkKHZhbHVlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy5fbGFzdFNlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7ICAgIC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uU2VsZWN0ZWQoKSBpcyBjYWxsZWQnLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbkVzY2FwZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSB0aGlzLl9vcmdJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbkVzY2FwZWQoKSBpcyBjYWxsZWQnKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEZvY3VzZWQoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uSW5wdXRFbEZvY3VzZWQoKSBpcyBjYWxsZWQnLCBldmVudCk7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsQmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Rm9jdXNlZCgnaW5wdXQnLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhckxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzLmZvckVhY2goY29tcFJlZiA9PiB7XHJcbiAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzID0gW107XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEtleXVwKCkgaXMgY2FsbGVkJywgZXZlbnQua2V5KTtcclxuICAgIGNvbnN0IGZpcnN0TGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25ndWktbGlzdC1pdGVtJyk7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgaWYgKGZpcnN0TGlzdCkge1xyXG4gICAgICAgIGZpcmVFdmVudChmaXJzdExpc3QsICdrZXl1cCcsIHtrZXk6IGV2ZW50LmtleX0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub25Fc2NhcGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpICYmIGZpcnN0TGlzdCkge1xyXG4gICAgICBmaXJzdExpc3QuZm9jdXMoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dVcCcgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xyXG4gICAgICAvL1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoID49IHRoaXMubWluSW5wdXRDaGFycykge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZEF1dG9jb21wbGV0ZUxpc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgKi9cclxuICBhZGRBdXRvY29tcGxldGVMaXN0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYWNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2FjVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTsgLy8gPz8/Pz8/Py9cclxuICAgICAgICB0aGlzLl9wcmV2SW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgICAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhckxpc3QoKTtcclxuICAgICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSBhZnRlciB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgd2hlbiBpdCBzY3JvbGxzIHRvIHRoZSBib3R0b20gKi9cclxuICBhZGRNb3JlUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pbnZpZXdQYWdlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRGb2N1c2VkKGVsVHlwZTogJ2lucHV0JyB8ICdsaXN0SXRlbScsIHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWQgPSB7aW5wdXQ6IGZhbHNlLCBsaXN0SXRlbTogZmFsc2V9O1xyXG4gICAgICB0aGlzLl9mb2N1c2VkW2VsVHlwZV0gPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZm9jdXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0VsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0aGlzSW5wdXRFbEJDUiA9IHRoaXMuaW5wdXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHRvcCA9IHRoaXNJbnB1dEVsQkNSLnRvcCArIHRoaXNJbnB1dEVsQkNSLmhlaWdodCArIHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbGVmdCcsIGAke3RoaXNJbnB1dEVsQkNSLmxlZnR9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAndG9wJywgYCR7dG9wfXB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXNFbCwgJ21pbldpZHRoJywgYCR7dGhpc0lucHV0RWxCQ1Iud2lkdGh9cHhgKTtcclxuICB9XHJcblxyXG4gIC8vIHNldCBpdGVtcyBvZiBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudFxyXG4gIGFkZExpc3QoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFRPRE86IC4uLi4uLi4uIGZvciAxc3QgcGFnZSBvbmx5LCBzaG93IG5vIG1hdGNoIGZvdW5kIG9yIGJsYW5rIG9wdGlvblxyXG4gICAgbGV0IG5vTWF0Y2hJdGVtOiBhbnk7XHJcbiAgICBsZXQgYmxhbmtJdGVtOiBhbnkgPSB7fTtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5ub01hdGNoSXRlbSAmJiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkpIHsgLy8gYWRkIG5vIG1hdGNoIGl0ZW1cclxuICAgICAgICBub01hdGNoSXRlbSA9IG5ldyBOb01hdGNoRm91bmQoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMubm9NYXRjaEl0ZW07XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ibGFua09wdGlvbikge1xyXG4gICAgICAgIGJsYW5rSXRlbSA9IG5ldyBOb25lU2VsZWN0KCk7XHJcbiAgICAgICAgYmxhbmtJdGVtLmh0bWwgPSB0aGlzLmJsYW5rT3B0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxsSXRlbXMgPSBbXS5jb25jYXQobm9NYXRjaEl0ZW0sIGJsYW5rSXRlbSwgaXRlbXMpLmZpbHRlcih4ID0+IHgpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGFsbEl0ZW1zKTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==