import { OnInit, TemplateRef } from '@angular/core';
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
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
    readonly isReady: boolean;
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
}
