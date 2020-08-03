import { OnInit, TemplateRef } from '@angular/core';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import * as ɵngcc0 from '@angular/core';
export declare class NguiAutocompleteComponent extends NguiVirtualListComponent implements OnInit {
    for: string;
    minInputChars: number;
    blankOption: string;
    noMatchItem: string;
    /** Template of NguiInviewPage. Allow users to define their own template  */
    template: TemplateRef<any>;
    inputEl: HTMLInputElement;
    _focused: any;
    _focusTimer: any;
    _acTimer: any;
    _selectedFromList: boolean;
    _escapedFromList: boolean;
    _orgInputValue: string;
    _prevInputValue: string;
    _lastSelected: any;
    /**
     * returns autocomplete display condition
     * autocompolete list is only visible
     *   - when input element is focused or list element is focused
     *   - when input value has enought characters
     *   - and user just did not selected or escaped
     */
    get isReady(): boolean;
    ngOnInit(): void;
    onSelected(value: any): void;
    onEscaped(): void;
    onInputElFocused(event: any): void;
    onInputElBlurred(): void;
    clearList(): void;
    onInputElKeyup(event: KeyboardEvent): void;
    /** Complete the first page of autocomplete */
    addAutocompleteList(): void;
    /** Complete after the first page of autocomplete when it scrolls to the bottom */
    addMorePages(): void;
    setFocused(elType: 'input' | 'listItem', val: boolean): void;
    positionThisUnderInputEl(): void;
    addList(items: Array<any>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NguiAutocompleteComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NguiAutocompleteComponent, "ngui-autocomplete", never, { "minInputChars": "minInputChars"; "blankOption": "blankOption"; "noMatchItem": "noMatchItem"; "for": "for"; }, {}, ["template"], never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbIm5ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCBleHRlbmRzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBmb3I6IHN0cmluZztcclxuICAgIG1pbklucHV0Q2hhcnM6IG51bWJlcjtcclxuICAgIGJsYW5rT3B0aW9uOiBzdHJpbmc7XHJcbiAgICBub01hdGNoSXRlbTogc3RyaW5nO1xyXG4gICAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgX2ZvY3VzZWQ6IGFueTtcclxuICAgIF9mb2N1c1RpbWVyOiBhbnk7XHJcbiAgICBfYWNUaW1lcjogYW55O1xyXG4gICAgX3NlbGVjdGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgICBfZXNjYXBlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gICAgX29yZ0lucHV0VmFsdWU6IHN0cmluZztcclxuICAgIF9wcmV2SW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gICAgX2xhc3RTZWxlY3RlZDogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGF1dG9jb21wbGV0ZSBkaXNwbGF5IGNvbmRpdGlvblxyXG4gICAgICogYXV0b2NvbXBvbGV0ZSBsaXN0IGlzIG9ubHkgdmlzaWJsZVxyXG4gICAgICogICAtIHdoZW4gaW5wdXQgZWxlbWVudCBpcyBmb2N1c2VkIG9yIGxpc3QgZWxlbWVudCBpcyBmb2N1c2VkXHJcbiAgICAgKiAgIC0gd2hlbiBpbnB1dCB2YWx1ZSBoYXMgZW5vdWdodCBjaGFyYWN0ZXJzXHJcbiAgICAgKiAgIC0gYW5kIHVzZXIganVzdCBkaWQgbm90IHNlbGVjdGVkIG9yIGVzY2FwZWRcclxuICAgICAqL1xyXG4gICAgZ2V0IGlzUmVhZHkoKTogYm9vbGVhbjtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBvblNlbGVjdGVkKHZhbHVlOiBhbnkpOiB2b2lkO1xyXG4gICAgb25Fc2NhcGVkKCk6IHZvaWQ7XHJcbiAgICBvbklucHV0RWxGb2N1c2VkKGV2ZW50OiBhbnkpOiB2b2lkO1xyXG4gICAgb25JbnB1dEVsQmx1cnJlZCgpOiB2b2lkO1xyXG4gICAgY2xlYXJMaXN0KCk6IHZvaWQ7XHJcbiAgICBvbklucHV0RWxLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQ7XHJcbiAgICAvKiogQ29tcGxldGUgdGhlIGZpcnN0IHBhZ2Ugb2YgYXV0b2NvbXBsZXRlICovXHJcbiAgICBhZGRBdXRvY29tcGxldGVMaXN0KCk6IHZvaWQ7XHJcbiAgICAvKiogQ29tcGxldGUgYWZ0ZXIgdGhlIGZpcnN0IHBhZ2Ugb2YgYXV0b2NvbXBsZXRlIHdoZW4gaXQgc2Nyb2xscyB0byB0aGUgYm90dG9tICovXHJcbiAgICBhZGRNb3JlUGFnZXMoKTogdm9pZDtcclxuICAgIHNldEZvY3VzZWQoZWxUeXBlOiAnaW5wdXQnIHwgJ2xpc3RJdGVtJywgdmFsOiBib29sZWFuKTogdm9pZDtcclxuICAgIHBvc2l0aW9uVGhpc1VuZGVySW5wdXRFbCgpOiB2b2lkO1xyXG4gICAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQ7XHJcbn1cclxuIl19