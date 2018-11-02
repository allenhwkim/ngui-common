import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef, Directive, NgModule, ComponentFactoryResolver, Injectable, ChangeDetectorRef, Renderer2, ViewChild, ViewContainerRef, Host, HostListener, Optional, Pipe } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
class NguiInviewComponent {
    /**
     * @param {?} element
     * @param {?} platformId
     */
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /**
         * Controls whether blur effect is applied to a component with less than 80% intersection ratio.
         * Only applies when there are no "inview" event handlers defined.
         *
         */
        this.blurEnabled = true;
        this.inview = new EventEmitter();
        this.notInview = new EventEmitter();
        /**
         * indicates that this element is in viewport
         */
        this.isInview = false;
        /**
         * indicates that this element is 80% in viewport. Used by the default callback
         */
        this.once80PctVisible = false;
    }
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /**
     * stop IntersectionObserver
     * @return {?}
     */
    ngOnDestroy() {
        this.observer.disconnect();
    }
    /**
     * fires (inview) and (notInview) events when this component is visible or not visible
     * @param {?} entries
     * @return {?}
     */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry['isIntersecting']) {
                this.isInview = true;
                this.defaultInviewHandler(entry);
                this.inview.emit(entry);
            }
            else {
                this.notInview.emit(entry);
            }
        });
    }
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     * @param {?} entry
     * @return {?}
     */
    defaultInviewHandler(entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            /** @type {?} */
            const opacity = entry.intersectionRatio * (1 / 0.8);
            /** @type {?} */
            const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            /** @type {?} */
            const filter = `blur(${blur}px)`;
            Object.assign(entry.target.style, { opacity, filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    }
}
NguiInviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-inview',
                template: `
        <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
        </ng-container>
    `,
                styles: [':host {display: block;}']
            }] }
];
/** @nocollapse */
NguiInviewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NguiInviewComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    observerOptions: [{ type: Input }],
    options: [{ type: Input }],
    blurEnabled: [{ type: Input }],
    inview: [{ type: Output }],
    notInview: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
class NguiInviewDirective {
    /**
     * @param {?} element
     * @param {?} platformId
     */
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /**
         * Event that will be fired when in viewport
         */
        this.nguiInview = new EventEmitter();
        /**
         * Event that will be fired when out of  viewport
         */
        this.nguiOutview = new EventEmitter();
    }
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /**
     * Stops IntersectionObserver
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    }
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry['isIntersecting']) {
                this.nguiInview.emit(entry);
            }
            else {
                this.nguiOutview.emit(entry);
            }
        });
    }
}
NguiInviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
            },] }
];
/** @nocollapse */
NguiInviewDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NguiInviewDirective.propDecorators = {
    observerOptions: [{ type: Input }],
    options: [{ type: Input }],
    nguiInview: [{ type: Output }],
    nguiOutview: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiInviewModule {
}
NguiInviewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    NguiInviewComponent,
                    NguiInviewDirective
                ],
                exports: [
                    NguiInviewComponent,
                    NguiInviewDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * fire the given event with options on the element
 * \@example
 * fireEvent(el, 'click');
 * fireEvent(el, 'keypress', {key: 'Enter'});
 * @param {?} el
 * @param {?} type
 * @param {?=} options
 * @return {?}
 */
function fireEvent(el, type, options = {}) {
    /** @type {?} */
    let event;
    if (type === 'click' || type.match(/^mouse/)) {
        event = new MouseEvent(type, options);
    }
    else if (type.match(/^key/)) {
        event = new KeyboardEvent(type, options);
    }
    else if (type.match(/^touch/)) {
        event = new TouchEvent(type, options);
    }
    return el.dispatchEvent(event);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Provide service to add or remove component dynamically
 */
class DynamicComponentService {
    /**
     * @param {?} factoryResolver
     */
    constructor(factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     * @param {?} component
     * @param {?=} into
     * @return {?}
     */
    createComponent(component, into) {
        this.rootViewContainer = into || this.rootViewContainer;
        /** @type {?} */
        const factory = this.factoryResolver.resolveComponentFactory(component);
        return factory.create(this.rootViewContainer.parentInjector);
    }
    /**
     * insert component
     * @param {?} componentRef
     * @return {?}
     */
    insertComponent(componentRef) {
        /** @type {?} */
        const compId = `ngui-dyn-${Math.floor(Math.random() * Math.pow(10, 7)) + Math.pow(10, 6)}`;
        componentRef.location.nativeElement.setAttribute('id', compId);
        componentRef.instance.id = compId;
        this.rootViewContainer.insert(componentRef.hostView);
        return componentRef.instance;
    }
}
DynamicComponentService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DynamicComponentService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * A block of component that listens to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view
 *
 * ### example
 * ```ts
 * <ngui-inview-page [items]="items">
 *   <ng-template let-items="items">
 *     <div *ngIf="items else noItems">
 *       <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
 *     </div>
 *   </ng-template>
 * </ngui-inview-page>
 * ```
 */
class NguiInviewPageComponent {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} cdRef
     */
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /**
         * Indicates that the page of out of viewport
         */
        this.outView = false;
        /**
         * The copy of items. This is set when this element is out of viewport
         */
        this.itemsBackup = [];
    }
    /**
     * Restore items when in viewport, so that elements are rendered
     * @return {?}
     */
    restoreItems() {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    }
    /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    emptyItems() {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
            /** @type {?} */
            const height = this.element.nativeElement.getBoundingClientRect().height;
            this.renderer.setStyle(this.contentsEl, 'height', `${height}px`);
            this.outView = true;
            this.itemsBackup = Array.from(this.items || []);
            this.items = undefined;
            if (!this.destroyed) {
                this.cdRef.detectChanges();
            }
        }
    }
    /**
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        if (!this.destroyed) {
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    }
}
NguiInviewPageComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-inview-page',
                template: `
    <div class="inview-page contents"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <!-- add blank ngui-list-item by condition  -->
      <!-- no match found ngui-list-item by condition -->
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
      <div *ngIf="outView">{{ itemsBackup.length }} items hidden</div>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `,
                styles: [`
    :host {display: block}
  `]
            }] }
];
/** @nocollapse */
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NguiInviewPageComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    items: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Virtual List
 *
 * The `<ngui-inview ..>` inserts <ngui-inview-page> into
 * `<div #pages>` when it is in viewport
 * When it's inserted, it will be pushed down, which makes it out of viewport.
 * User scrolls down to see the bottom of the list,
 * then it will insert another `<ngui-inview-page>` again.
 *
 * <ngui-inview-page> listens to (nguiInview) and (nguiOutview) events,
 * when <ngui-inview-page> is out of view port, it empties out the contents.
 * and it restores back the contents when it is in viewport again.
 *
 * ### example
 * ```ts
 * <ngui-virtual-list (bottomInview)="loadItems($event)">
 *   <ng-template let-items="items">
 *     <div *ngIf="!items">Loading</div>
 *     <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
 *   </ng-template>
 * </ngui-virtual-list>
 * ```
 */
class NguiVirtualListComponent {
    /**
     * @param {?} renderer
     * @param {?} element
     * @param {?} dynamicComponentService
     * @param {?} cdr
     */
    constructor(renderer, element, dynamicComponentService, cdr) {
        this.renderer = renderer;
        this.element = element;
        this.dynamicComponentService = dynamicComponentService;
        this.cdr = cdr;
        /**
         * Fired when child `<ngui-list-item>` is selected
         */
        this.selected = new EventEmitter();
        /**
         * Fired when `ESC` key is pressed from `<ngui-list-item>`
         */
        this.escaped = new EventEmitter();
        /**
         * Event fired when bottom of the virtual list is in view
         * The handler of this event must call `$event.addItems(items: Array<any>)` to fill contents
         * If not, only the first page is loaded, and rest of the pages won't be loaded;
         *
         * ### example
         * ```ts
         * <ngui-virtual-list (bottomInview)="loadItems($event)">
         *   <ng-template let-items="items">
         *     <div *ngIf="items else noItems">
         *        <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
         *     </div>
         *     <ng-template #noItems>Loading</ng-template>
         *   </ng-template>
         * </ngui-virtual-list>
         * ```
         */
        this.bottomInview = new EventEmitter();
        this._focused = false;
        this.inviewPages = [];
    }
    /**
     * Check if necessary input and output is provided
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    }
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     * @return {?}
     */
    addAnInviewPageToPages() {
        if (!this.isListLoading) {
            this.isListLoading = true;
            this.inviewPage =
                this.dynamicComponentService.createComponent(NguiInviewPageComponent, this.pagesRef);
            this.dynamicComponentService.insertComponent(this.inviewPage);
            this.inviewPage.instance.template = this.template;
            this.inviewPages.push(this.inviewPage);
            this.bottomInview.emit(this); // fire event, so that user can load items
        }
        else {
            console.log('Already a page being inserted, skipping adding a page');
        }
    }
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    addList(items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    }
}
NguiVirtualListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-virtual-list',
                template: `
    <div class="ngui-virtual-list"
      (focus)="_focused = true"
      (click)="_focused = true">
      <!-- hold multiple <ngui-inview-page> -->
      <div #pages></div>
      <!-- insert <ngui-inview-page> into #pages -->
      <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
    </div>
  `,
                styles: [`
    :host {display: block}
  `]
            }] }
];
/** @nocollapse */
NguiVirtualListComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: DynamicComponentService },
    { type: ChangeDetectorRef }
];
NguiVirtualListComponent.propDecorators = {
    pagesRef: [{ type: ViewChild, args: ['pages', { read: ViewContainerRef },] }],
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    selected: [{ type: Output }],
    escaped: [{ type: Output }],
    bottomInview: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NoMatchFound {
    constructor() {
        this.html = 'No Match Found';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NoneSelect {
    constructor() {
        this.html = 'Select';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiAutocompleteComponent extends NguiVirtualListComponent {
    constructor() {
        super(...arguments);
        // input tag id
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
     * @return {?}
     */
    get isReady() {
        /** @type {?} */
        const selectedOrEscaped = this._selectedFromList || this._escapedFromList;
        /** @type {?} */
        const focused = this._focused.input || this._focused.listItem;
        /** @type {?} */
        const minChars = this.inputEl.value.length >= this.minInputChars;
        return (!selectedOrEscaped && focused && minChars);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inputEl = (/** @type {?} */ (document.querySelector('#' + this.for))); // tslint:disable-line
        this.positionThisUnderInputEl();
        fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
        this.inputEl.addEventListener('focus', this.onInputElFocused.bind(this));
        this.inputEl.addEventListener('blur', this.onInputElBlurred.bind(this));
        this.selected.subscribe(this.onSelected.bind(this));
        this.escaped.subscribe(this.onEscaped.bind(this));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSelected(value) {
        this._selectedFromList = true;
        this.inputEl.focus();
        this._lastSelected = value;
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onSelected() is called', value);
    }
    /**
     * @return {?}
     */
    onEscaped() {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onEscaped() is called');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputElFocused(event) {
        console.log('NguiAutoCompleteComponent.onInputElFocused() is called', event);
        this.isListLoading = false;
        if (typeof this._orgInputValue === 'undefined') {
            this._orgInputValue = this.inputEl.value;
        }
        this._prevInputValue = this.inputEl.value;
        this.setFocused('input', true);
    }
    /**
     * @return {?}
     */
    onInputElBlurred() {
        this.setFocused('input', false);
    }
    /**
     * @return {?}
     */
    clearList() {
        this.inviewPages.forEach(compRef => {
            compRef.destroy();
        });
        this.inviewPages = [];
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputElKeyup(event) {
        console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
        /** @type {?} */
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
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') ;
        else if (this.inputEl.value.length >= this.minInputChars) {
            this._selectedFromList = false;
            this._escapedFromList = false;
            this.addAutocompleteList();
        }
    }
    /**
     * Complete the first page of autocomplete
     * @return {?}
     */
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
    /**
     * Complete after the first page of autocomplete when it scrolls to the bottom
     * @return {?}
     */
    addMorePages() {
        if (this.inviewPages.length) {
            this.addAnInviewPageToPages();
        }
    }
    /**
     * @param {?} elType
     * @param {?} val
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    positionThisUnderInputEl() {
        /** @type {?} */
        const thisEl = this.element.nativeElement;
        /** @type {?} */
        const thisInputElBCR = this.inputEl.getBoundingClientRect();
        /** @type {?} */
        const top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;
        this.renderer.setStyle(thisEl, 'left', `${thisInputElBCR.left}px`);
        this.renderer.setStyle(thisEl, 'top', `${top}px`);
        this.renderer.setStyle(thisEl, 'minWidth', `${thisInputElBCR.width}px`);
    }
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    addList(items) {
        console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
        this.isListLoading = false;
        // TODO: ........ for 1st page only, show no match found or blank option
        /** @type {?} */
        let noMatchItem;
        /** @type {?} */
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
        /** @type {?} */
        const allItems = [].concat(noMatchItem, blankItem, items).filter(x => x);
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
    }
}
NguiAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-autocomplete',
                template: `
    <div *ngIf="isReady" class="ngui-autocomplete">
      <div #pages></div>
      <ngui-inview (inview)="addMorePages()"></ngui-inview>
    </div>
  `,
                styles: [`
    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}
    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }
  `]
            }] }
];
NguiAutocompleteComponent.propDecorators = {
    for: [{ type: Input }],
    minInputChars: [{ type: Input }],
    blankOption: [{ type: Input }],
    noMatchItem: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiListDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        /**
         * Fired when child `<ngui-list-item>` is selected
         */
        this.selected = new EventEmitter();
        /**
         * Fired when `ESC` key is pressed from `<ngui-list-item>`
         */
        this.escaped = new EventEmitter();
    }
}
NguiListDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-list' // tslint:disable-line
            },] }
];
/** @nocollapse */
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
NguiListDirective.propDecorators = {
    selected: [{ type: Output }],
    escaped: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// tabindex, keydown, keyup(ENTER, ESC), click
class NguiListItemDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiListModule {
}
NguiListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NguiInviewModule
                ],
                declarations: [
                    NguiAutocompleteComponent,
                    NguiInviewPageComponent,
                    NguiListDirective,
                    NguiListItemDirective,
                    NguiVirtualListComponent
                ],
                exports: [
                    NguiAutocompleteComponent,
                    NguiInviewPageComponent,
                    NguiListDirective,
                    NguiListItemDirective,
                    NguiVirtualListComponent
                ],
                entryComponents: [NguiInviewPageComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiHighlightPipe {
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    transform(text, search) {
        /** @type {?} */
        let ret = text;
        if (search) {
            /** @type {?} */
            const re = new RegExp(search, 'ig');
            ret = text.replace(re, match => `<span class="ngui-highlight">${match}</span>`);
        }
        return ret;
    }
}
NguiHighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'nguiHighlight' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 * @abstract
 */
class konsole {
    /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    static toLog(param) {
        // returns to log or not
        /** @type {?} */
        const restrictionNum = this.LOG_LEVELS[this.logLevel];
        /** @type {?} */
        const requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    }
    /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    static setLogLevel(logLevel) {
        logLevel = logLevel.toUpperCase();
        /** @type {?} */
        const logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) { // for browser env.
                window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
            }
            this.logLevel = logLevel;
        }
        else {
            console.error(`Error, invalid logLevel, it must be one of ${logLevels}`);
        }
    }
    /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    static debug(...args) {
        if (this.toLog('DEBUG')) {
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
        }
    }
    /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    static log(...args) {
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    }
    /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    static info(...args) {
        if (this.toLog('INFO')) {
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
        }
    }
    /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    static warn(...args) {
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    }
    /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    static error(...args) {
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    }
}
// tslint:disable-line
/**
 * all log levels
 */
konsole.LOG_LEVELS = {
    ALL: parseInt('00000', 2),
    DEBUG: parseInt('00001', 2),
    LOG: parseInt('00010', 2),
    INFO: parseInt('00100', 2),
    WARN: parseInt('01000', 2),
    ERROR: parseInt('10000', 2),
    NONE: parseInt('11111', 2)
};
/**
 * current log level set by setLogLevel, default 'INFO'
 */
konsole.logLevel = 'INFO';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiUtilsModule {
}
NguiUtilsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NguiHighlightPipe],
                exports: [NguiHighlightPipe],
                providers: [DynamicComponentService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NguiCommonModule {
}
NguiCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NguiInviewModule,
                    NguiListModule,
                    NguiUtilsModule
                ],
                exports: [
                    NguiInviewModule,
                    NguiListModule,
                    NguiUtilsModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent, NguiListModule, DynamicComponentService, NguiHighlightPipe, konsole, fireEvent, NguiUtilsModule, NguiCommonModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1pbnZpZXcvc3JjL25ndWktaW52aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25vLW1hdGNoLWZvdW5kLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbm9uZS1zZWxlY3QudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMva29uc29sZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBBbiBlbGVtZW50IHRoYXQgbGlzdGVucyB0byB2aWV3cG9ydCBwb3NpdGlvbmluZyBhbmQgZmlyZXMgaW5WaWV3IGFuZCBub3RJbnZpZXcgZXZlbnRzXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWluLXZpZXcgW29ic2VydmVyT3B0aW9uc109XCJteU9ic2VydmVyT3B0aW9uc1wiIChpblZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW4tdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ludmlld1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBgLFxyXG4gIHN0eWxlczogWyc6aG9zdCB7ZGlzcGxheTogYmxvY2s7fSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIDxuZy10ZW1wbGF0ZT4gcmVmZXJlbmNlICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIENvbnRyb2xzIHdoZXRoZXIgYmx1ciBlZmZlY3QgaXMgYXBwbGllZCB0byBhIGNvbXBvbmVudCB3aXRoIGxlc3MgdGhhbiA4MCUgaW50ZXJzZWN0aW9uIHJhdGlvLlxyXG4gICAqIE9ubHkgYXBwbGllcyB3aGVuIHRoZXJlIGFyZSBubyBcImludmlld1wiIGV2ZW50IGhhbmRsZXJzIGRlZmluZWQuXHJcbiAgICoqL1xyXG4gIEBJbnB1dCgpIGJsdXJFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCAqL1xyXG4gIGlzSW52aWV3ID0gZmFsc2U7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIDgwJSBpbiB2aWV3cG9ydC4gVXNlZCBieSB0aGUgZGVmYXVsdCBjYWxsYmFjayAqL1xyXG4gIG9uY2U4MFBjdFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBzdG9wIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9XHJcblxyXG4gICAgLyoqIGZpcmVzIChpbnZpZXcpIGFuZCAobm90SW52aWV3KSBldmVudHMgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB2aXNpYmxlIG9yIG5vdCB2aXNpYmxlICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMuaXNJbnZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpO1xyXG4gICAgICAgIHRoaXMuaW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubm90SW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IGludGVyc2VjdGlvbiBoYW5kbGVyLCB3aGljaCBzZXRzIGJsdXIgZGVwZW5kZXMgb24gaW50ZXJzZWN0aW9uIHJhdGlvXHJcbiAgICAgKiB0aGlzIHdvbid0IGJlIGludm9rZWQgaWYgdXNlciBwcm92aWRlcyBhbnkgKGludmlldykgZXZlbnQuIGUuZy4gKGludmlldyk9XCJzb21ldGhpbmcoKVwiXHJcbiAgICAgKi9cclxuICBkZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuYmx1ckVuYWJsZWQgfHwgdGhpcy5vbmNlODBQY3RWaXNpYmxlIHx8IHRoaXMuaW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA8IDAuOCkge1xyXG4gICAgICBjb25zdCBvcGFjaXR5ID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAoMSAvIDAuOCk7XHJcbiAgICAgIGNvbnN0IGJsdXIgPSAyMCAtIE1hdGguZmxvb3IoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAxMCkgKiA0O1xyXG4gICAgICBjb25zdCBmaWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgT2JqZWN0LmFzc2lnbihlbnRyeS50YXJnZXQuc3R5bGUsIHtvcGFjaXR5LCBmaWx0ZXJ9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLmZpbHRlciA9ICd1bnNldCc7XHJcblxyXG4gICAgICB0aGlzLm9uY2U4MFBjdFZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSURcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBGaXJlcyAobmd1aUludmlldykgb3IgKG5ndWlPdXR2aWV3KSBldmVudHMgZGVwZW5kZW50cyBvbiB0aGUgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCBvciBub3RcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd1aUludmlld10sIFtuZ3VpT3V0dmlld10nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG5cclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICAvKiogRGVwcmVjYXRlZCBjb25maWcuIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBpbiB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpSW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gb3V0IG9mICB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpT3V0dmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogU3RvcHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMub2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgKG5ndWlJbnZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0XHJcbiAgICAgKiAgYW5kIGZpcmVzIChuZ3VpT3V0dmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgbm90IGluIHZpZXdwb3J0XHJcbiAgICAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLm5ndWlJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZ3VpT3V0dmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpSW52aWV3Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdEaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQge05ndWlJbnZpZXdDb21wb25lbnQsIE5ndWlJbnZpZXdEaXJlY3RpdmV9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmd1aUludmlld0NvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlJbnZpZXdDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3RGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld01vZHVsZSB7XHJcbn1cclxuIiwiLyoqXHJcbiAqIGZpcmUgdGhlIGdpdmVuIGV2ZW50IHdpdGggb3B0aW9ucyBvbiB0aGUgZWxlbWVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBmaXJlRXZlbnQoZWwsICdjbGljaycpO1xyXG4gKiBmaXJlRXZlbnQoZWwsICdrZXlwcmVzcycsIHtrZXk6ICdFbnRlcid9KTtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogYm9vbGVhbiB7XHJcbiAgbGV0IGV2ZW50O1xyXG4gIGlmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUubWF0Y2goL15tb3VzZS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBNb3VzZUV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXmtleS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXnRvdWNoLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IFRvdWNoRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEluc2VydCBhIGNvbXBvbmVudCBkeW5hbWljYWxseSB1c2luZyBhIHNlcnZpY2VcclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHNcclxuICogaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL2R5bmFtaWMuY29tcG9uZW50LnNlcnZpY2UnO1xyXG4gKiBpbXBvcnQgeyBNeUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL215LTEuY29tcG9uZW50JztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgdGVtcGxhdGU6IGAgLi4uIDxkaXYgI2R5bWFtaWM+PC9kaXY+YFxyXG4gKiB9KVxyXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xyXG4gKiAgIEBWaWV3Q2hpbGQoJ2R5bmFtaWMnLCB7cmVhZDpWaWV3Q29udGFpbmVyUmVmfSkgdmNyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gKlxyXG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkY3M6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlKSB7fVxyXG4gKlxyXG4gKiAgIGluc2VydENvbXAoKSB7XHJcbiAqICAgICBsZXQgY29tcFJlZiA9IHRoaXMuZGNzLmNyZWF0ZUNvbXBvbmVudChNeUR5bmFtaWNDb21wb25lbnQsIHRoaXMudmNyKTtcclxuICogICAgIHRocy5kY3MuaW5zZXJ0Q29tb25lbnQoY21wUmVmKTtcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2UuaXRlbXMgPSBbMSwyLDNdOyAgICAgICAgICAgICAgLy8gZGVhbGluZyB3aXRoIEBpbnB1dFxyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5vdXRwdXQkLnN1YnNjcmliZSh2YWwgPT4ge30pOyAvLyBkZWFsaW5nIHdpdGggQG91dHB1dFxyXG4gKiAgIH1cclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGFibGUsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc2VydmljZSB0byBhZGQgb3IgcmVtb3ZlIGNvbXBvbmVudCBkeW5hbWljYWxseVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudFNlcnZpY2Uge1xyXG4gIC8qKiB1c2VkIHRvIGNyZWF0ZSBhIGZhY3RvcnkgZnJvbSBhIGNvbXBvbmVudCBjbGFzcyAqL1xyXG4gIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xyXG4gIC8qKiBkZWZpbmVzIHdoZXJlIGEgZHluYW1pYyBjb21wb25lbnRzIGluc2VydCBpbnRvICovXHJcbiAgcm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBmYWN0b3J5UmVzb2x2ZXIpIHtcclxuICAgIHRoaXMuZmFjdG9yeVJlc29sdmVyID0gZmFjdG9yeVJlc29sdmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBjb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICogVGhlIHJlYXNvbiB0byBzZXBlcmF0ZSBgY3JlYXRlQ29tcG5lbnRgIGFuZCBgaW5zZXJ0Q29tcG9uZW50YCBpc1xyXG4gICAqIHRvIGFsbG93IHNvbWUgYWN0aW9ucyBiZWZvcmUgd2UgaW5zZXJ0IGludG8gYSBob3N0Vmlldy5cclxuICAgKiBlLmcgc3R5bGluZywgc2V0dGluZyBhdHRyaWJ1dGVzLCBldGNcclxuICAgKi9cclxuICBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGludG8/OiBWaWV3Q29udGFpbmVyUmVmKTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lciA9IGludG8gfHwgdGhpcy5yb290Vmlld0NvbnRhaW5lcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG5cclxuICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZSh0aGlzLnJvb3RWaWV3Q29udGFpbmVyLnBhcmVudEluamVjdG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGluc2VydCBjb21wb25lbnRcclxuICAgKi9cclxuICBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IENvbXBvbmVudCB7XHJcbiAgICBjb25zdCBjb21wSWQgPSBgbmd1aS1keW4tJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCAqKiA3KSArIDEwICoqIDZ9YDtcclxuICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBjb21wSWQpO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmlkID0gY29tcElkO1xyXG5cclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQSBibG9jayBvZiBjb21wb25lbnQgdGhhdCBsaXN0ZW5zIHRvIGluVmlldyBhbmQgb3V0VmlldyBldmVudHMsXHJcbiAqIHNvIHRoYXQgaXQgZW1wdGllcyBjb250ZW50cyB3aGVuIG91dCBvZiB2aWV3IGFmdGVyIGJhY2t1cCBpdGVtc1xyXG4gKiBhbmQgcmVzdG9yZXMgdGhlIGNvbnRlbnRzIHdoZW4gaW4gdmlld1xyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbnZpZXctcGFnZSBbaXRlbXNdPVwiaXRlbXNcIj5cclxuICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICogICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgICA8L2Rpdj5cclxuICogICA8L25nLXRlbXBsYXRlPlxyXG4gKiA8L25ndWktaW52aWV3LXBhZ2U+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldy1wYWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImludmlldy1wYWdlIGNvbnRlbnRzXCJcclxuICAgICAgKG5ndWlJbnZpZXcpPVwicmVzdG9yZUl0ZW1zKClcIlxyXG4gICAgICAobmd1aU91dHZpZXcpPVwiZW1wdHlJdGVtcygpXCI+XHJcbiAgICAgIDwhLS0gYWRkIGJsYW5rIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAgLS0+XHJcbiAgICAgIDwhLS0gbm8gbWF0Y2ggZm91bmQgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGV8fGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntpdGVtczogaXRlbXMsIG91dFZpZXc6IG91dFZpZXd9XCI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwib3V0Vmlld1wiPnt7IGl0ZW1zQmFja3VwLmxlbmd0aCB9fSBpdGVtcyBoaWRkZW48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+IEVycm9yOiByZXF1aXJlcyBbaXRlbXNdIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+IEVycm9yOiByZXF1aXJlcyAmbHQ7bmctdGVtcGxhdGU+PC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgY29udGVudHMgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvLyBASW5wdXQoJ3RlbXBsYXRlJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgYXJlIHVzZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xyXG5cclxuICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgb3V0VmlldyA9IGZhbHNlO1xyXG4gIC8qKiBUaGUgY29weSBvZiBpdGVtcy4gVGhpcyBpcyBzZXQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgaXRlbXNCYWNrdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgaGVpZ2h0IG9mIGl0IHJlbWFpbnMgdGhlIHNhbWUgZXZlbiB3aGVuIGl0ZW1zIGdldCBlbXB0eSBvdXQuXHJcbiAgICovXHJcbiAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgZGVzdHJveWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSBpdGVtcyB3aGVuIGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm91dFZpZXcpIHtcclxuICAgICAgdGhpcy5vdXRWaWV3ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXNCYWNrdXAgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRlbnRzRWwgPVxyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW52aWV3LXBhZ2UuY29udGVudHMnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50Lm5nT25EZXN0cm95KCkgaXMgY2FsbGVkJyk7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbXB0eSBpdGVtcyB3aGVuIG5vdCBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgbm90IHJlbmRlcmVkXHJcbiAgICovXHJcbiAgZW1wdHlJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuY29udGVudHNFbCAmJiAhdGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIC8vIHNldCBoZWlnaHQgYmVmb3JlIGVtcHR5aW5nIGNvbnRlbnRzXHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcclxuXHJcbiAgICAgIHRoaXMub3V0VmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXMgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zID0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5zZXRJdGVtcygpIGlzIGNhbGxlZCB3aXRoJywgaXRlbXMpO1xyXG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVmlydHVhbCBMaXN0XHJcbiAqXHJcbiAqIFRoZSBgPG5ndWktaW52aWV3IC4uPmAgaW5zZXJ0cyA8bmd1aS1pbnZpZXctcGFnZT4gaW50b1xyXG4gKiBgPGRpdiAjcGFnZXM+YCB3aGVuIGl0IGlzIGluIHZpZXdwb3J0XHJcbiAqIFdoZW4gaXQncyBpbnNlcnRlZCwgaXQgd2lsbCBiZSBwdXNoZWQgZG93biwgd2hpY2ggbWFrZXMgaXQgb3V0IG9mIHZpZXdwb3J0LlxyXG4gKiBVc2VyIHNjcm9sbHMgZG93biB0byBzZWUgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCxcclxuICogdGhlbiBpdCB3aWxsIGluc2VydCBhbm90aGVyIGA8bmd1aS1pbnZpZXctcGFnZT5gIGFnYWluLlxyXG4gKlxyXG4gKiA8bmd1aS1pbnZpZXctcGFnZT4gbGlzdGVucyB0byAobmd1aUludmlldykgYW5kIChuZ3VpT3V0dmlldykgZXZlbnRzLFxyXG4gKiB3aGVuIDxuZ3VpLWludmlldy1wYWdlPiBpcyBvdXQgb2YgdmlldyBwb3J0LCBpdCBlbXB0aWVzIG91dCB0aGUgY29udGVudHMuXHJcbiAqIGFuZCBpdCByZXN0b3JlcyBiYWNrIHRoZSBjb250ZW50cyB3aGVuIGl0IGlzIGluIHZpZXdwb3J0IGFnYWluLlxyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICogICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLXZpcnR1YWwtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3VpLXZpcnR1YWwtbGlzdFwiXHJcbiAgICAgIChmb2N1cyk9XCJfZm9jdXNlZCA9IHRydWVcIlxyXG4gICAgICAoY2xpY2spPVwiX2ZvY3VzZWQgPSB0cnVlXCI+XHJcbiAgICAgIDwhLS0gaG9sZCBtdWx0aXBsZSA8bmd1aS1pbnZpZXctcGFnZT4gLS0+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8IS0tIGluc2VydCA8bmd1aS1pbnZpZXctcGFnZT4gaW50byAjcGFnZXMgLS0+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIC8qKiB0aGUgY29udGFpbmVyIE5ndWlJbnZpZXdQYWdlIHdpbGwgYmUgaW5zZXJ0ZWQgKi9cclxuICBAVmlld0NoaWxkKCdwYWdlcycsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcGFnZXNSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gYm90dG9tIG9mIHRoZSB2aXJ0dWFsIGxpc3QgaXMgaW4gdmlld1xyXG4gICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICogSWYgbm90LCBvbmx5IHRoZSBmaXJzdCBwYWdlIGlzIGxvYWRlZCwgYW5kIHJlc3Qgb2YgdGhlIHBhZ2VzIHdvbid0IGJlIGxvYWRlZDtcclxuICAgKlxyXG4gICAqICMjIyBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgKiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAgICogICAgIDwvZGl2PlxyXG4gICAqICAgICA8bmctdGVtcGxhdGUgI25vSXRlbXM+TG9hZGluZzwvbmctdGVtcGxhdGU+XHJcbiAgICogICA8L25nLXRlbXBsYXRlPlxyXG4gICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdHRvbUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gIGludmlld1BhZ2U6IENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD47XHJcbiAgX2ZvY3VzZWQgPSBmYWxzZTtcclxuICAvKiogSW5kaWNhdGVzIGlmIGEgcGFnZSBpcyBzdGlsbCBsb2FkaW5nICovXHJcbiAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICBpbnZpZXdQYWdlczogQXJyYXk8Q29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50Pj4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudGVtcGxhdGUgfHwgIXRoaXMuYm90dG9tSW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignPG5ndWktdmlydHVhbC1saXN0PiByZXF1aXJlcyBbdGVtcGxhdGVdIGFuZCB7Ym90dG9tSW52aWV3KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYm90dG9tIGlzIGludmlldyBwb3J0LCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxyXG4gICAqIEl0IHdpbGwgaW5zZXJ0IGEgZHluYW1pY2FsbCBjcmVhdGVkIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IHdpdGggdGhlIGdpdmVuIHRlbXBsYXRlLlxyXG4gICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgKi9cclxuICBhZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzTGlzdExvYWRpbmcpIHtcclxuICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZSA9XHJcbiAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVDb21wb25lbnQoTmd1aUludmlld1BhZ2VDb21wb25lbnQsIHRoaXMucGFnZXNSZWYpO1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmluc2VydENvbXBvbmVudCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgICAgdGhpcy5pbnZpZXdQYWdlcy5wdXNoKHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmJvdHRvbUludmlldy5lbWl0KHRoaXMpOyAvLyBmaXJlIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGxvYWQgaXRlbXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBbHJlYWR5IGEgcGFnZSBiZWluZyBpbnNlcnRlZCwgc2tpcHBpbmcgYWRkaW5nIGEgcGFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTm9NYXRjaEZvdW5kIHtcclxuICBodG1sID0gJ05vIE1hdGNoIEZvdW5kJztcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTm9uZVNlbGVjdCB7XHJcbiAgaHRtbCA9ICdTZWxlY3QnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2ZpcmUtZXZlbnQnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWF1dG9jb21wbGV0ZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJpc1JlYWR5XCIgY2xhc3M9XCJuZ3VpLWF1dG9jb21wbGV0ZVwiPlxyXG4gICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkTW9yZVBhZ2VzKClcIj48L25ndWktaW52aWV3PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBtYXgtaGVpZ2h0OiAzMDBweDsgb3ZlcmZsb3c6IGF1dG99XHJcbiAgICAubmd1aS1hdXRvY29tcGxldGUgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBwYWRkaW5nOiA0cHggfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmb3I6IHN0cmluZzsgLy8gaW5wdXQgdGFnIGlkXHJcbiAgQElucHV0KCkgbWluSW5wdXRDaGFycyA9IDE7XHJcbiAgQElucHV0KCkgYmxhbmtPcHRpb24gPSAnU2VsZWN0IE9uZSc7XHJcbiAgQElucHV0KCkgbm9NYXRjaEl0ZW0gPSAnTm8gTWF0Y2ggRm91bmQnO1xyXG5cclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgX2ZvY3VzZWQ6IGFueSA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgX2ZvY3VzVGltZXI7XHJcbiAgX2FjVGltZXI7XHJcbiAgX3NlbGVjdGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgX2VzY2FwZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfb3JnSW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9wcmV2SW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9sYXN0U2VsZWN0ZWQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhdXRvY29tcGxldGUgZGlzcGxheSBjb25kaXRpb25cclxuICAgKiBhdXRvY29tcG9sZXRlIGxpc3QgaXMgb25seSB2aXNpYmxlXHJcbiAgICogICAtIHdoZW4gaW5wdXQgZWxlbWVudCBpcyBmb2N1c2VkIG9yIGxpc3QgZWxlbWVudCBpcyBmb2N1c2VkXHJcbiAgICogICAtIHdoZW4gaW5wdXQgdmFsdWUgaGFzIGVub3VnaHQgY2hhcmFjdGVyc1xyXG4gICAqICAgLSBhbmQgdXNlciBqdXN0IGRpZCBub3Qgc2VsZWN0ZWQgb3IgZXNjYXBlZFxyXG4gICAqL1xyXG4gIGdldCBpc1JlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPckVzY2FwZWQgPSB0aGlzLl9zZWxlY3RlZEZyb21MaXN0IHx8IHRoaXMuX2VzY2FwZWRGcm9tTGlzdDtcclxuICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLl9mb2N1c2VkLmlucHV0IHx8IHRoaXMuX2ZvY3VzZWQubGlzdEl0ZW07XHJcbiAgICBjb25zdCBtaW5DaGFycyA9IHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzO1xyXG5cclxuICAgIHJldHVybiAoIXNlbGVjdGVkT3JFc2NhcGVkICYmIGZvY3VzZWQgJiYgbWluQ2hhcnMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmZvcik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIHRoaXMucG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk7XHJcblxyXG4gICAgZnJvbUV2ZW50KHRoaXMuaW5wdXRFbCwgJ2tleXVwJykuc3Vic2NyaWJlKHRoaXMub25JbnB1dEVsS2V5dXAuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uSW5wdXRFbEZvY3VzZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25JbnB1dEVsQmx1cnJlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXNjYXBlZC5zdWJzY3JpYmUodGhpcy5vbkVzY2FwZWQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkKHZhbHVlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy5fbGFzdFNlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7ICAgIC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uU2VsZWN0ZWQoKSBpcyBjYWxsZWQnLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbkVzY2FwZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSB0aGlzLl9vcmdJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbkVzY2FwZWQoKSBpcyBjYWxsZWQnKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEZvY3VzZWQoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uSW5wdXRFbEZvY3VzZWQoKSBpcyBjYWxsZWQnLCBldmVudCk7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsQmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Rm9jdXNlZCgnaW5wdXQnLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhckxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzLmZvckVhY2goY29tcFJlZiA9PiB7XHJcbiAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzID0gW107XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEtleXVwKCkgaXMgY2FsbGVkJywgZXZlbnQua2V5KTtcclxuICAgIGNvbnN0IGZpcnN0TGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25ndWktbGlzdC1pdGVtJyk7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgaWYgKGZpcnN0TGlzdCkge1xyXG4gICAgICAgIGZpcmVFdmVudChmaXJzdExpc3QsICdrZXl1cCcsIHtrZXk6IGV2ZW50LmtleX0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub25Fc2NhcGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpICYmIGZpcnN0TGlzdCkge1xyXG4gICAgICBmaXJzdExpc3QuZm9jdXMoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dVcCcgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xyXG4gICAgICAvL1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoID49IHRoaXMubWluSW5wdXRDaGFycykge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZEF1dG9jb21wbGV0ZUxpc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgKi9cclxuICBhZGRBdXRvY29tcGxldGVMaXN0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYWNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2FjVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTsgLy8gPz8/Pz8/Py9cclxuICAgICAgICB0aGlzLl9wcmV2SW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgICAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhckxpc3QoKTtcclxuICAgICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSBhZnRlciB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgd2hlbiBpdCBzY3JvbGxzIHRvIHRoZSBib3R0b20gKi9cclxuICBhZGRNb3JlUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pbnZpZXdQYWdlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRGb2N1c2VkKGVsVHlwZTogJ2lucHV0JyB8ICdsaXN0SXRlbScsIHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWQgPSB7aW5wdXQ6IGZhbHNlLCBsaXN0SXRlbTogZmFsc2V9O1xyXG4gICAgICB0aGlzLl9mb2N1c2VkW2VsVHlwZV0gPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZm9jdXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0VsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0aGlzSW5wdXRFbEJDUiA9IHRoaXMuaW5wdXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHRvcCA9IHRoaXNJbnB1dEVsQkNSLnRvcCArIHRoaXNJbnB1dEVsQkNSLmhlaWdodCArIHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbGVmdCcsIGAke3RoaXNJbnB1dEVsQkNSLmxlZnR9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAndG9wJywgYCR7dG9wfXB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXNFbCwgJ21pbldpZHRoJywgYCR7dGhpc0lucHV0RWxCQ1Iud2lkdGh9cHhgKTtcclxuICB9XHJcblxyXG4gIC8vIHNldCBpdGVtcyBvZiBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudFxyXG4gIGFkZExpc3QoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFRPRE86IC4uLi4uLi4uIGZvciAxc3QgcGFnZSBvbmx5LCBzaG93IG5vIG1hdGNoIGZvdW5kIG9yIGJsYW5rIG9wdGlvblxyXG4gICAgbGV0IG5vTWF0Y2hJdGVtOiBhbnk7XHJcbiAgICBsZXQgYmxhbmtJdGVtOiBhbnkgPSB7fTtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5ub01hdGNoSXRlbSAmJiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkpIHsgLy8gYWRkIG5vIG1hdGNoIGl0ZW1cclxuICAgICAgICBub01hdGNoSXRlbSA9IG5ldyBOb01hdGNoRm91bmQoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMubm9NYXRjaEl0ZW07XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ibGFua09wdGlvbikge1xyXG4gICAgICAgIGJsYW5rSXRlbSA9IG5ldyBOb25lU2VsZWN0KCk7XHJcbiAgICAgICAgYmxhbmtJdGVtLmh0bWwgPSB0aGlzLmJsYW5rT3B0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxsSXRlbXMgPSBbXS5jb25jYXQobm9NYXRjaEl0ZW0sIGJsYW5rSXRlbSwgaXRlbXMpLmZpbHRlcih4ID0+IHgpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGFsbEl0ZW1zKTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWxpc3QnIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0RGlyZWN0aXZlIHtcclxuICAvKiogRmlyZWQgd2hlbiBjaGlsZCBgPG5ndWktbGlzdC1pdGVtPmAgaXMgc2VsZWN0ZWQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBGaXJlZCB3aGVuIGBFU0NgIGtleSBpcyBwcmVzc2VkIGZyb20gYDxuZ3VpLWxpc3QtaXRlbT5gICovXHJcbiAgQE91dHB1dCgpIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3B0aW9uYWwsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5ndWlMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5cclxuLy8gdGFiaW5kZXgsIGtleWRvd24sIGtleXVwKEVOVEVSLCBFU0MpLCBjbGlja1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdC1pdGVtJyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnaXRlbScpIG9iamVjdDogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcblxyXG4gIG5leHRTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwcmV2U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcGFyZW50TGlzdENvbXA6IE5ndWlMaXN0RGlyZWN0aXZlIHwgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IHwgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGxpc3REaXJlY3RpdmU6IE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIHZpcnR1YWxMaXN0Q29tcG9uZW50OiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgYXV0b2NvbXBsZXRlQ29tcG9uZW50OiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50XHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wID0gdGhpcy5saXN0RGlyZWN0aXZlIHx8IHRoaXMudmlydHVhbExpc3RDb21wb25lbnQgfHwgdGhpcy5hdXRvY29tcGxldGVDb21wb25lbnQ7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50TGlzdENvbXApIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ25ndWktbGlzdC1pdGVtIHJlcXVpcmVzIHBhcmVudCBvZiBuZ3VpLWxpc3QsIG5ndWktdmlydHVhbC1saXN0LCBvciBuZ3VpLWF1dG9jb21wbGV0ZS4nKTtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb25lU2VsZWN0KSB8fCAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb01hdGNoRm91bmQpKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5vYmplY3QuaHRtbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgdXAsIGRvd24sIGxlZnQsIHJpZ2h0XHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pIGtleWRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRoaXNMaXN0SXRlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgcGFyZW50TGlzdEVsID0gdGhpcy5wYXJlbnRMaXN0Q29tcC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBsaXN0SXRlbXM6IEFycmF5PEhUTUxFbGVtZW50PlxyXG4gICAgICA9IEFycmF5LmZyb20ocGFyZW50TGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ25ndWktbGlzdC1pdGVtJykpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW1OZHggPSBsaXN0SXRlbXMuaW5kZXhPZih0aGlzTGlzdEl0ZW0pO1xyXG4gICAgY29uc3QgbmV4dExpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4ICsgMV0gfHwgbGlzdEl0ZW1zWzBdO1xyXG4gICAgY29uc3QgcHJldkxpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4IC0gMV0gfHwgbGlzdEl0ZW1zW2xpc3RJdGVtcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgIGNhc2UgMzc6IGNhc2UgMzg6IC8vIHVwIGFycm93LCBsZWZ0IGFycm93XHJcbiAgICAgIHByZXZMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzk6IGNhc2UgNDA6IC8vIGRvd24gYXJyb3csIHJpZ2h0IGFycm93XHJcbiAgICAgIG5leHRMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCBlbnRlcigxMyksIGVzYygyNylcclxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleXVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0VzY2FwZSc6XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuZXNjYXBlZC5lbWl0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG1vdXNlZG93bigpOiB2b2lkIHtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIGZvY3VzZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBibHVycmVkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpTGlzdEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7Tmd1aUxpc3REaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdQYWdlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4uL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XHJcblxyXG5leHBvcnQge05ndWlBdXRvY29tcGxldGVDb21wb25lbnQsIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSwgTmd1aUxpc3REaXJlY3RpdmUsIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCxcclxuICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxyXG4gICAgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld1BhZ2VDb21wb25lbnQsXHJcbiAgICBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSxcclxuICAgIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmd1aUludmlld1BhZ2VDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdE1vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiB3aW5kb3cua29uc29sZSBhbHRlcm5hdGl2ZVxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGBcclxuICoga29uc29sZS5zZXRMb2dMZXZlbCgnZXJyb3InKTtcclxuICoga29ud29sZS5sb2coMSwyLDMsNCw1KTtcclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3Mga29uc29sZSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAvKiogYWxsIGxvZyBsZXZlbHMgKi9cclxuICBzdGF0aWMgTE9HX0xFVkVMUyA9IHtcclxuICAgIEFMTDogICBwYXJzZUludCgnMDAwMDAnLCAyKSxcclxuICAgIERFQlVHOiBwYXJzZUludCgnMDAwMDEnLCAyKSxcclxuICAgIExPRzogICBwYXJzZUludCgnMDAwMTAnLCAyKSxcclxuICAgIElORk86ICBwYXJzZUludCgnMDAxMDAnLCAyKSxcclxuICAgIFdBUk46ICBwYXJzZUludCgnMDEwMDAnLCAyKSxcclxuICAgIEVSUk9SOiBwYXJzZUludCgnMTAwMDAnLCAyKSxcclxuICAgIE5PTkU6ICBwYXJzZUludCgnMTExMTEnLCAyKVxyXG4gIH07XHJcblxyXG4gIC8qKiBjdXJyZW50IGxvZyBsZXZlbCBzZXQgYnkgc2V0TG9nTGV2ZWwsIGRlZmF1bHQgJ0lORk8nICovXHJcbiAgc3RhdGljIGxvZ0xldmVsID0gJ0lORk8nO1xyXG5cclxuICAvKiogcmV0dXJucyBpZiBpdCBzaG91bGQgY2FsbCBgd2luZG93LmNvbnNvbGVgIG9yIG5vdCAqL1xyXG4gIHN0YXRpYyB0b0xvZyhwYXJhbSk6IGJvb2xlYW4geyAvLyByZXR1cm5zIHRvIGxvZyBvciBub3RcclxuICAgIGNvbnN0IHJlc3RyaWN0aW9uTnVtID0gdGhpcy5MT0dfTEVWRUxTW3RoaXMubG9nTGV2ZWxdO1xyXG4gICAgY29uc3QgcmVxdWlyZWROdW0gPSB0aGlzLkxPR19MRVZFTFNbcGFyYW1dO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlZE51bSA+IHJlc3RyaWN0aW9uTnVtO1xyXG4gIH1cclxuXHJcbiAgLyoqIHNldHMgdGhlIGN1cnJlbnQgbG9nIGxldmVsICovXHJcbiAgc3RhdGljIHNldExvZ0xldmVsKGxvZ0xldmVsOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbG9nTGV2ZWwgPSBsb2dMZXZlbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgY29uc3QgbG9nTGV2ZWxzID0gT2JqZWN0LmtleXModGhpcy5MT0dfTEVWRUxTKTtcclxuICAgIGlmIChsb2dMZXZlbHMuaW5kZXhPZihsb2dMZXZlbCkgPiAtMSkge1xyXG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZSkgeyAvLyBmb3IgYnJvd3NlciBlbnYuXHJcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2tvbnNvbGUuTE9HX0xFVkVMJywgbG9nTGV2ZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yLCBpbnZhbGlkIGxvZ0xldmVsLCBpdCBtdXN0IGJlIG9uZSBvZiAke2xvZ0xldmVsc31gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5kZWJ1ZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBkZWJ1Z2AgKi9cclxuICBzdGF0aWMgZGVidWcoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0RFQlVHJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUubG9nKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGxvZ2AgKi9cclxuICBzdGF0aWMgbG9nKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdMT0cnKSkge1xyXG4gICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmluZm8oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgaW5mb2AgKi9cclxuICBzdGF0aWMgaW5mbyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnSU5GTycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUud2FybigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGB3YXJuYCAqL1xyXG4gIHN0YXRpYyB3YXJuKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdXQVJOJykpIHtcclxuICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZXJyb3IoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZXJyb3JgICovXHJcbiAgc3RhdGljIGVycm9yKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdFUlJPUicpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2FsbCcpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCd5ZXMnKTtcclxuLy8ga29uc29sZS5sb2coJ3llcycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ25vbmUnKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCdubycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnaW5mbycpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdXQVJOJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnRVJST1InKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpSGlnaGxpZ2h0UGlwZX0gZnJvbSAnLi9zcmMvbmd1aS1oaWdobGlnaHQucGlwZSc7XHJcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2V9IGZyb20gJy4vc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBrb25zb2xlIH0gZnJvbSAnLi9zcmMva29uc29sZSc7XHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4vc3JjL2ZpcmUtZXZlbnQnO1xyXG5cclxuZXhwb3J0IHtEeW5hbWljQ29tcG9uZW50U2VydmljZSwgTmd1aUhpZ2hsaWdodFBpcGUsIGtvbnNvbGUsIGZpcmVFdmVudH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIGV4cG9ydHM6IFtOZ3VpSGlnaGxpZ2h0UGlwZV0sXHJcbiAgcHJvdmlkZXJzOiBbRHluYW1pY0NvbXBvbmVudFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVXRpbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcclxuaW1wb3J0IHtOZ3VpTGlzdE1vZHVsZX0gZnJvbSAnLi9uZ3VpLWxpc3Qvbmd1aS1saXN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7Tmd1aVV0aWxzTW9kdWxlfSBmcm9tICcuL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlLFxyXG4gICAgTmd1aUxpc3RNb2R1bGUsXHJcbiAgICBOZ3VpVXRpbHNNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlJbnZpZXdNb2R1bGUsXHJcbiAgICBOZ3VpTGlzdE1vZHVsZSxcclxuICAgIE5ndWlVdGlsc01vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlDb21tb25Nb2R1bGUge1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7QUFpQ0EsTUFBYSxtQkFBbUI7Ozs7O0lBdUI5QixZQUNjLE9BQW1CLEVBQ0UsVUFBZTtRQURwQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBSzs7OztRQXBCekMsb0JBQWUsR0FBNkIsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQzs7Ozs7O1FBTzFGLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLFdBQU0sR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxjQUFTLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7UUFJbEYsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUVqQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7S0FLeEI7Ozs7O0lBR0QsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFFRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMs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