import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, Renderer2, TemplateRef, Directive, NgModule, ComponentFactoryResolver, Injectable, ChangeDetectorRef, ViewChild, ViewContainerRef, Host, HostListener, Optional, Pipe } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { __extends } from 'tslib';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-in-view [options]="myOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.options = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
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
    /** Starts IntersectionObserver */
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    NguiInviewComponent.prototype.ngOnInit = /**
     * Starts IntersectionObserver
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** stop IntersectionObserver */
    /**
     * stop IntersectionObserver
     * @return {?}
     */
    NguiInviewComponent.prototype.ngOnDestroy = /**
     * stop IntersectionObserver
     * @return {?}
     */
    function () {
        this.observer.disconnect();
    };
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    /**
     * fires (inview) and (notInview) events when this component is visible or not visible
     * @param {?} entries
     * @return {?}
     */
    NguiInviewComponent.prototype.handleIntersect = /**
     * fires (inview) and (notInview) events when this component is visible or not visible
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            if (entry['isIntersecting']) {
                _this.isInview = true;
                _this.defaultInviewHandler(entry);
                _this.inview.emit(entry);
            }
            else {
                _this.notInview.emit(entry);
            }
        });
    };
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     * @param {?} entry
     * @return {?}
     */
    NguiInviewComponent.prototype.defaultInviewHandler = /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            var /** @type {?} */ opacity = entry.intersectionRatio * (1 / 0.8);
            var /** @type {?} */ blur_1 = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            var /** @type {?} */ filter = "blur(" + blur_1 + "px)";
            Object.assign(entry.target.style, { opacity: opacity, filter: filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    };
    NguiInviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-inview',
                    template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
                    styles: [':host {display: block;}']
                },] },
    ];
    /** @nocollapse */
    NguiInviewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        options: [{ type: Input }],
        inview: [{ type: Output }],
        notInview: [{ type: Output }]
    };
    return NguiInviewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
        /**
         * IntersectionObserver options
         */
        this.options = {};
        /**
         * Event that will be fired when in viewport
         */
        this.nguiInview = new EventEmitter();
        /**
         * Event that will be fired when out of  viewport
         */
        this.nguiOutview = new EventEmitter();
    }
    /** Starts IntersectionObserver */
    /**
     * Starts IntersectionObserver
     * @return {?}
     */
    NguiInviewDirective.prototype.ngOnInit = /**
     * Starts IntersectionObserver
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** Stops IntersectionObserver */
    /**
     * Stops IntersectionObserver
     * @return {?}
     */
    NguiInviewDirective.prototype.ngOnDestroy = /**
     * Stops IntersectionObserver
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    };
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     */
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    NguiInviewDirective.prototype.handleIntersect = /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            if (entry['isIntersecting']) {
                _this.nguiInview.emit(entry);
            }
            else {
                _this.nguiOutview.emit(entry);
            }
        });
    };
    NguiInviewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    NguiInviewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewDirective.propDecorators = {
        options: [{ type: Input }],
        nguiInview: [{ type: Output }],
        nguiOutview: [{ type: Output }]
    };
    return NguiInviewDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiInviewModule = /** @class */ (function () {
    function NguiInviewModule() {
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
                },] },
    ];
    return NguiInviewModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function fireEvent(el, type, options) {
    if (options === void 0) { options = {}; }
    var /** @type {?} */ event;
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
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provide service to add or remove component dynamically
 */
var DynamicComponentService = /** @class */ (function () {
    function DynamicComponentService(factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     */
    /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     * @param {?} component
     * @param {?=} into
     * @return {?}
     */
    DynamicComponentService.prototype.createComponent = /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     * @param {?} component
     * @param {?=} into
     * @return {?}
     */
    function (component, into) {
        this.rootViewContainer = into || this.rootViewContainer;
        var /** @type {?} */ factory = this.factoryResolver.resolveComponentFactory(component);
        return factory.create(this.rootViewContainer.parentInjector);
    };
    /**
     * insert component
     */
    /**
     * insert component
     * @param {?} componentRef
     * @return {?}
     */
    DynamicComponentService.prototype.insertComponent = /**
     * insert component
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        var /** @type {?} */ compId = "ngui-dyn-" + (Math.floor(Math.random() * Math.pow(10, 7)) + Math.pow(10, 6));
        componentRef.location.nativeElement.setAttribute('id', compId);
        componentRef.instance.id = compId;
        this.rootViewContainer.insert(componentRef.hostView);
        return componentRef.instance;
    };
    DynamicComponentService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
    ]; };
    return DynamicComponentService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
var NguiInviewPageComponent = /** @class */ (function () {
    function NguiInviewPageComponent(element, renderer, cdRef) {
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
     */
    /**
     * Restore items when in viewport, so that elements are rendered
     * @return {?}
     */
    NguiInviewPageComponent.prototype.restoreItems = /**
     * Restore items when in viewport, so that elements are rendered
     * @return {?}
     */
    function () {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    NguiInviewPageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    };
    /**
     * @return {?}
     */
    NguiInviewPageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    };
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    NguiInviewPageComponent.prototype.emptyItems = /**
     * Empty items when not in viewport, so that elements are not rendered
     * @return {?}
     */
    function () {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
            var /** @type {?} */ height = this.element.nativeElement.getBoundingClientRect().height;
            this.renderer.setStyle(this.contentsEl, 'height', height + "px");
            this.outView = true;
            this.itemsBackup = Array.from(this.items || []);
            this.items = undefined;
            if (!this.destroyed) {
                this.cdRef.detectChanges();
            }
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    NguiInviewPageComponent.prototype.setItems = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (!this.destroyed) {
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    };
    NguiInviewPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-inview-page',
                    template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
                    styles: ["\n    :host {display: block}\n  "]
                },] },
    ];
    /** @nocollapse */
    NguiInviewPageComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    NguiInviewPageComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        items: [{ type: Input }]
    };
    return NguiInviewPageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
var NguiVirtualListComponent = /** @class */ (function () {
    function NguiVirtualListComponent(renderer, element, dynamicComponentService, cdr) {
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
    /** Check if necessary input and output is provided */
    /**
     * Check if necessary input and output is provided
     * @return {?}
     */
    NguiVirtualListComponent.prototype.ngAfterViewInit = /**
     * Check if necessary input and output is provided
     * @return {?}
     */
    function () {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    };
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     */
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     * @return {?}
     */
    NguiVirtualListComponent.prototype.addAnInviewPageToPages = /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     * @return {?}
     */
    function () {
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
    };
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    NguiVirtualListComponent.prototype.addList = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    };
    NguiVirtualListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-virtual-list',
                    template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
                    styles: ["\n    :host {display: block}\n  "]
                },] },
    ];
    /** @nocollapse */
    NguiVirtualListComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: DynamicComponentService },
        { type: ChangeDetectorRef }
    ]; };
    NguiVirtualListComponent.propDecorators = {
        pagesRef: [{ type: ViewChild, args: ['pages', { read: ViewContainerRef },] }],
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        selected: [{ type: Output }],
        escaped: [{ type: Output }],
        bottomInview: [{ type: Output }]
    };
    return NguiVirtualListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoMatchFound = /** @class */ (function () {
    function NoMatchFound() {
        this.html = 'No Match Found';
    }
    return NoMatchFound;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoneSelect = /** @class */ (function () {
    function NoneSelect() {
        this.html = 'Select';
    }
    return NoneSelect;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiAutocompleteComponent = /** @class */ (function (_super) {
    __extends(NguiAutocompleteComponent, _super);
    function NguiAutocompleteComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            var /** @type {?} */ selectedOrEscaped = this._selectedFromList || this._escapedFromList;
            var /** @type {?} */ focused = this._focused.input || this._focused.listItem;
            var /** @type {?} */ minChars = this.inputEl.value.length >= this.minInputChars;
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
        this.inputEl = /** @type {?} */ (document.querySelector('#' + this.for)); // tslint:disable-line
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
        var /** @type {?} */ firstList = this.element.nativeElement.querySelector('ngui-list-item');
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
        var /** @type {?} */ thisEl = this.element.nativeElement;
        var /** @type {?} */ thisInputElBCR = this.inputEl.getBoundingClientRect();
        var /** @type {?} */ top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;
        this.renderer.setStyle(thisEl, 'left', thisInputElBCR.left + "px");
        this.renderer.setStyle(thisEl, 'top', top + "px");
        this.renderer.setStyle(thisEl, 'minWidth', thisInputElBCR.width + "px");
    };
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    NguiAutocompleteComponent.prototype.addList = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
        this.isListLoading = false;
        // TODO: ........ for 1st page only, show no match found or blank option
        var /** @type {?} */ noMatchItem;
        var /** @type {?} */ blankItem = {};
        if (this.inviewPages.length === 1) {
            if (this.noMatchItem && (!items || items.length === 0)) {
                // add no match item
                noMatchItem = new NoMatchFound();
                blankItem.html = this.noMatchItem;
            }
            else if (this.blankOption) {
                blankItem = new NoneSelect();
                blankItem.html = this.blankOption;
            }
        }
        var /** @type {?} */ allItems = [].concat(noMatchItem, blankItem, items).filter(function (x) { return x; });
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
    };
    NguiAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngui-autocomplete',
                    template: "\n    <div *ngIf=\"isReady\" class=\"ngui-autocomplete\">\n      <div #pages></div>\n      <ngui-inview (inview)=\"addMorePages()\"></ngui-inview>\n    </div>\n  ",
                    styles: ["\n    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }\n  "]
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiListDirective = /** @class */ (function () {
    function NguiListDirective(element) {
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
    NguiListDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ngui-list' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    NguiListDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NguiListDirective.propDecorators = {
        selected: [{ type: Output }],
        escaped: [{ type: Output }]
    };
    return NguiListDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiListModule = /** @class */ (function () {
    function NguiListModule() {
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
                },] },
    ];
    return NguiListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiHighlightPipe = /** @class */ (function () {
    function NguiHighlightPipe() {
    }
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    NguiHighlightPipe.prototype.transform = /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    function (text, search) {
        var /** @type {?} */ ret = text;
        if (search) {
            var /** @type {?} */ re = new RegExp(search, 'ig');
            ret = text.replace(re, function (match) { return "<span class=\"ngui-highlight\">" + match + "</span>"; });
        }
        return ret;
    };
    NguiHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'nguiHighlight' },] },
    ];
    return NguiHighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
var konsole = /** @class */ (function () {
    function konsole() {
    }
    /** returns if it should call `window.console` or not */
    /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    konsole.toLog = /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    function (param) {
        // returns to log or not
        var /** @type {?} */ restrictionNum = this.LOG_LEVELS[this.logLevel];
        var /** @type {?} */ requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    };
    /** sets the current log level */
    /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    konsole.setLogLevel = /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    function (logLevel) {
        logLevel = logLevel.toUpperCase();
        var /** @type {?} */ logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) {
                // for browser env.
                window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
            }
            this.logLevel = logLevel;
        }
        else {
            console.error("Error, invalid logLevel, it must be one of " + logLevels);
        }
    };
    /** The same as `console.debug()` if the current log level is greater than `debug` */
    /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    konsole.debug = /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('DEBUG')) {
            console.debug.apply(console, arguments);
        }
    };
    /** The same as `console.log()` if the current log level is greater than `log` */
    /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    konsole.log = /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    };
    /** The same as `console.info()` if the current log level is greater than `info` */
    /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    konsole.info = /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('INFO')) {
            console.info.apply(console, arguments);
        }
    };
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    konsole.warn = /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    };
    /** The same as `console.error()` if the current log level is greater than `error` */
    /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    konsole.error = /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    };
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
    return konsole;
}());
// konsole.setLogLevel('all');
// konsole.debug('yes');
// konsole.log('yes');
// konsole.info('yes');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('none');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('no');
// konsole.error('no');
// konsole.setLogLevel('info');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('yes');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('WARN');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('ERROR');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('no');
// konsole.error('yes');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiUtilsModule = /** @class */ (function () {
    function NguiUtilsModule() {
    }
    NguiUtilsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [NguiHighlightPipe],
                    exports: [NguiHighlightPipe],
                    providers: [DynamicComponentService]
                },] },
    ];
    return NguiUtilsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NguiCommonModule = /** @class */ (function () {
    function NguiCommonModule() {
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
                },] },
    ];
    return NguiCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NguiCommonModule, NguiInviewModule, NguiInviewComponent, NguiInviewDirective, NguiListModule, NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent, NguiUtilsModule, konsole, fireEvent, DynamicComponentService, NguiHighlightPipe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1pbnZpZXcvc3JjL25ndWktaW52aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25vLW1hdGNoLWZvdW5kLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbm9uZS1zZWxlY3QudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMva29uc29sZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBBbiBlbGVtZW50IHRoYXQgbGlzdGVucyB0byB2aWV3cG9ydCBwb3NpdGlvbmluZyBhbmQgZmlyZXMgaW5WaWV3IGFuZCBub3RJbnZpZXcgZXZlbnRzXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWluLXZpZXcgW29wdGlvbnNdPVwibXlPcHRpb25zXCIgKGluVmlldyk9XCJkb0EoKVwiIChub3RJbnZpZXcpPVwiZG9CKClcIj5cclxuICogICA8aW1nICpuZ0lmIHNyYz1cImh0dHBzOi8vcGljc3VtLnBob3Rvcy84MDAvMzAwP2ltYWdlPTE+XHJcbiAqIDwvbmd1aS1pbi12aWV3PlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3VpLWludmlldycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ludmlld1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbJzpob3N0IHtkaXNwbGF5OiBibG9jazt9J11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKiogPG5nLXRlbXBsYXRlPiByZWZlcmVuY2UgKi9cclxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueSA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIEBPdXRwdXQoKSBpbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIG5vdEludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCAqL1xyXG4gICAgaXNJbnZpZXcgPSBmYWxzZTtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgODAlIGluIHZpZXdwb3J0LiBVc2VkIGJ5IHRoZSBkZWZhdWx0IGNhbGxiYWNrICovXHJcbiAgICBvbmNlODBQY3RWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHN0b3AgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBmaXJlcyAoaW52aWV3KSBhbmQgKG5vdEludmlldykgZXZlbnRzIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdmlzaWJsZSBvciBub3QgdmlzaWJsZSAgKi9cclxuICAgIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZpZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90SW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IGludGVyc2VjdGlvbiBoYW5kbGVyLCB3aGljaCBzZXRzIGJsdXIgZGVwZW5kZXMgb24gaW50ZXJzZWN0aW9uIHJhdGlvXHJcbiAgICAgKiB0aGlzIHdvbid0IGJlIGludm9rZWQgaWYgdXNlciBwcm92aWRlcyBhbnkgKGludmlldykgZXZlbnQuIGUuZy4gKGludmlldyk9XCJzb21ldGhpbmcoKVwiXHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5vbmNlODBQY3RWaXNpYmxlIHx8IHRoaXMuaW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDwgMC44KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqICgxIC8gMC44KTtcclxuICAgICAgICAgICAgY29uc3QgYmx1ciA9IDIwIC0gTWF0aC5mbG9vcihlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqIDEwKSAqIDQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudHJ5LnRhcmdldC5zdHlsZSwge29wYWNpdHksIGZpbHRlcn0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLmZpbHRlciA9ICd1bnNldCc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uY2U4MFBjdFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBGaXJlcyAobmd1aUludmlldykgb3IgKG5ndWlPdXR2aWV3KSBldmVudHMgZGVwZW5kZW50cyBvbiB0aGUgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCBvciBub3RcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd1aUludmlld10sIFtuZ3VpT3V0dmlld10nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBpbiB2aWV3cG9ydCAqL1xyXG4gICAgQE91dHB1dCgpIG5ndWlJbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIG91dCBvZiAgdmlld3BvcnQgKi9cclxuICAgIEBPdXRwdXQoKSBuZ3VpT3V0dmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaGFuZGxlSW50ZXJzZWN0LmJpbmQodGhpcyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTdG9wcyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5vYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyAobmd1aUludmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcclxuICAgICAqICBhbmQgZmlyZXMgKG5ndWlPdXR2aWV3KSBldmVudCB3aGVuIHRoaXMgZWxlbWVudCBpcyBub3QgaW4gdmlld3BvcnRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlSW50ZXJzZWN0KGVudHJpZXMpOiB2b2lkIHtcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ3VpSW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ3VpT3V0dmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05ndWlJbnZpZXdDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQge05ndWlJbnZpZXdEaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZ3VpSW52aWV3Q29tcG9uZW50LFxuICAgICAgICBOZ3VpSW52aWV3RGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5ndWlJbnZpZXdDb21wb25lbnQsXG4gICAgICAgIE5ndWlJbnZpZXdEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdNb2R1bGUge1xufVxuXG5leHBvcnQge05ndWlJbnZpZXdDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmNvbXBvbmVudCc7XG5leHBvcnQge05ndWlJbnZpZXdEaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmRpcmVjdGl2ZSc7XG4iLCIvKipcclxuICogZmlyZSB0aGUgZ2l2ZW4gZXZlbnQgd2l0aCBvcHRpb25zIG9uIHRoZSBlbGVtZW50XHJcbiAqIEBleGFtcGxlXHJcbiAqIGZpcmVFdmVudChlbCwgJ2NsaWNrJyk7XHJcbiAqIGZpcmVFdmVudChlbCwgJ2tleXByZXNzJywge2tleTogJ0VudGVyJ30pO1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pOiBib29sZWFuIHtcclxuICBsZXQgZXZlbnQ7XHJcbiAgaWYgKHR5cGUgPT09ICdjbGljaycgfHwgdHlwZS5tYXRjaCgvXm1vdXNlLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9ea2V5LykpIHtcclxuICAgIGV2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9edG91Y2gvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgVG91Y2hFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG4iLCIvKipcclxuICogSW5zZXJ0IGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IHVzaW5nIGEgc2VydmljZVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiBpbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4vZHluYW1pYy5jb21wb25lbnQuc2VydmljZSc7XHJcbiAqIGltcG9ydCB7IE15RHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vbXktMS5jb21wb25lbnQnO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogICB0ZW1wbGF0ZTogYCAuLi4gPGRpdiAjZHltYW1pYz48L2Rpdj5gXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqICAgQFZpZXdDaGlsZCgnZHluYW1pYycsIHtyZWFkOlZpZXdDb250YWluZXJSZWZ9KSB2Y3I6IFZpZXdDb250YWluZXJSZWY7XHJcbiAqXHJcbiAqICAgY29uc3RydWN0b3IocHVibGljIGRjczogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UpIHt9XHJcbiAqXHJcbiAqICAgaW5zZXJ0Q29tcCgpIHtcclxuICogICAgIGxldCBjb21wUmVmID0gdGhpcy5kY3MuY3JlYXRlQ29tcG9uZW50KE15RHluYW1pY0NvbXBvbmVudCwgdGhpcy52Y3IpO1xyXG4gKiAgICAgdGhzLmRjcy5pbnNlcnRDb21vbmVudChjbXBSZWYpO1xyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5pdGVtcyA9IFsxLDIsM107ICAgICAgICAgICAgICAvLyBkZWFsaW5nIHdpdGggQGlucHV0XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLm91dHB1dCQuc3Vic2NyaWJlKHZhbCA9PiB7fSk7IC8vIGRlYWxpbmcgd2l0aCBAb3V0cHV0XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBzZXJ2aWNlIHRvIGFkZCBvciByZW1vdmUgY29tcG9uZW50IGR5bmFtaWNhbGx5XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB7XHJcbiAgLyoqIHVzZWQgdG8gY3JlYXRlIGEgZmFjdG9yeSBmcm9tIGEgY29tcG9uZW50IGNsYXNzICovXHJcbiAgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XHJcbiAgLyoqIGRlZmluZXMgd2hlcmUgYSBkeW5hbWljIGNvbXBvbmVudHMgaW5zZXJ0IGludG8gKi9cclxuICByb290Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIGZhY3RvcnlSZXNvbHZlcikge1xyXG4gICAgdGhpcy5mYWN0b3J5UmVzb2x2ZXIgPSBmYWN0b3J5UmVzb2x2ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGNvbXBvbmVudCByZWZlcmVuY2VcclxuICAgKiBUaGUgcmVhc29uIHRvIHNlcGVyYXRlIGBjcmVhdGVDb21wbmVudGAgYW5kIGBpbnNlcnRDb21wb25lbnRgIGlzXHJcbiAgICogdG8gYWxsb3cgc29tZSBhY3Rpb25zIGJlZm9yZSB3ZSBpbnNlcnQgaW50byBhIGhvc3RWaWV3LlxyXG4gICAqIGUuZyBzdHlsaW5nLCBzZXR0aW5nIGF0dHJpYnV0ZXMsIGV0Y1xyXG4gICAqL1xyXG4gIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgaW50bz86IFZpZXdDb250YWluZXJSZWYpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aGlzLnJvb3RWaWV3Q29udGFpbmVyID0gaW50byB8fCB0aGlzLnJvb3RWaWV3Q29udGFpbmVyO1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuZmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcblxyXG4gICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKHRoaXMucm9vdFZpZXdDb250YWluZXIucGFyZW50SW5qZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaW5zZXJ0IGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGluc2VydENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogQ29tcG9uZW50IHtcclxuICAgIGNvbnN0IGNvbXBJZCA9IGBuZ3VpLWR5bi0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICoqIDcpICsgMTAgKiogNn1gO1xyXG4gICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGNvbXBJZCk7XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuaWQgPSBjb21wSWQ7XHJcblxyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3LXBhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW52aWV3LXBhZ2UgY29udGVudHNcIlxyXG4gICAgICAobmd1aUludmlldyk9XCJyZXN0b3JlSXRlbXMoKVwiXHJcbiAgICAgIChuZ3VpT3V0dmlldyk9XCJlbXB0eUl0ZW1zKClcIj5cclxuICAgICAgPCEtLSBhZGQgYmxhbmsgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uICAtLT5cclxuICAgICAgPCEtLSBubyBtYXRjaCBmb3VuZCBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXx8ZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW1zOiBpdGVtcywgb3V0Vmlldzogb3V0Vmlld31cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJvdXRWaWV3XCI+e3sgaXRlbXNCYWNrdXAubGVuZ3RoIH19IGl0ZW1zIGhpZGRlbjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj4gRXJyb3I6IHJlcXVpcmVzIFtpdGVtc10gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj4gRXJyb3I6IHJlcXVpcmVzICZsdDtuZy10ZW1wbGF0ZT48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBjb250ZW50cyAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8vIEBJbnB1dCgndGVtcGxhdGUnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBhcmUgdXNlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50ICovXHJcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PGFueT47XHJcblxyXG4gIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgb3B0aW9uczogYW55O1xyXG4gIC8qKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBvZiBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBvdXRWaWV3ID0gZmFsc2U7XHJcbiAgLyoqIFRoZSBjb3B5IG9mIGl0ZW1zLiBUaGlzIGlzIHNldCB3aGVuIHRoaXMgZWxlbWVudCBpcyBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBpdGVtc0JhY2t1cDogQXJyYXk8YW55PiA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoaXMgY29tcG9uZW50LlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgaXQgcmVtYWlucyB0aGUgc2FtZSBldmVuIHdoZW4gaXRlbXMgZ2V0IGVtcHR5IG91dC5cclxuICAgKi9cclxuICBjb250ZW50c0VsOiBIVE1MRWxlbWVudDtcclxuICBkZXN0cm95ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIGl0ZW1zIHdoZW4gaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIHJlbmRlcmVkXHJcbiAgICovXHJcbiAgcmVzdG9yZUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3V0Vmlldykge1xyXG4gICAgICB0aGlzLm91dFZpZXcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pdGVtcyA9IEFycmF5LmZyb20odGhpcy5pdGVtc0JhY2t1cCB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgdW5kZWZpbmVkKTtcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGVudHNFbCA9XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnZpZXctcGFnZS5jb250ZW50cycpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUludmlld1BhZ2VDb21wb25lbnQubmdPbkRlc3Ryb3koKSBpcyBjYWxsZWQnKTtcclxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHR5IGl0ZW1zIHdoZW4gbm90IGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSBub3QgcmVuZGVyZWRcclxuICAgKi9cclxuICBlbXB0eUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jb250ZW50c0VsICYmICF0aGlzLm91dFZpZXcpIHtcclxuICAgICAgLy8gc2V0IGhlaWdodCBiZWZvcmUgZW1wdHlpbmcgY29udGVudHNcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xyXG5cclxuICAgICAgdGhpcy5vdXRWaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IEFycmF5LmZyb20odGhpcy5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbXMoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50LnNldEl0ZW1zKCkgaXMgY2FsbGVkIHdpdGgnLCBpdGVtcyk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd1aUludmlld1BhZ2VDb21wb25lbnQgfSBmcm9tICcuL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBWaXJ0dWFsIExpc3RcclxuICpcclxuICogVGhlIGA8bmd1aS1pbnZpZXcgLi4+YCBpbnNlcnRzIDxuZ3VpLWludmlldy1wYWdlPiBpbnRvXHJcbiAqIGA8ZGl2ICNwYWdlcz5gIHdoZW4gaXQgaXMgaW4gdmlld3BvcnRcclxuICogV2hlbiBpdCdzIGluc2VydGVkLCBpdCB3aWxsIGJlIHB1c2hlZCBkb3duLCB3aGljaCBtYWtlcyBpdCBvdXQgb2Ygdmlld3BvcnQuXHJcbiAqIFVzZXIgc2Nyb2xscyBkb3duIHRvIHNlZSB0aGUgYm90dG9tIG9mIHRoZSBsaXN0LFxyXG4gKiB0aGVuIGl0IHdpbGwgaW5zZXJ0IGFub3RoZXIgYDxuZ3VpLWludmlldy1wYWdlPmAgYWdhaW4uXHJcbiAqXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlPiBsaXN0ZW5zIHRvIChuZ3VpSW52aWV3KSBhbmQgKG5ndWlPdXR2aWV3KSBldmVudHMsXHJcbiAqIHdoZW4gPG5ndWktaW52aWV3LXBhZ2U+IGlzIG91dCBvZiB2aWV3IHBvcnQsIGl0IGVtcHRpZXMgb3V0IHRoZSBjb250ZW50cy5cclxuICogYW5kIGl0IHJlc3RvcmVzIGJhY2sgdGhlIGNvbnRlbnRzIHdoZW4gaXQgaXMgaW4gdmlld3BvcnQgYWdhaW4uXHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+TG9hZGluZzwvZGl2PlxyXG4gKiAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktdmlydHVhbC1saXN0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm5ndWktdmlydHVhbC1saXN0XCJcclxuICAgICAgKGZvY3VzKT1cIl9mb2N1c2VkID0gdHJ1ZVwiXHJcbiAgICAgIChjbGljayk9XCJfZm9jdXNlZCA9IHRydWVcIj5cclxuICAgICAgPCEtLSBob2xkIG11bHRpcGxlIDxuZ3VpLWludmlldy1wYWdlPiAtLT5cclxuICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDwhLS0gaW5zZXJ0IDxuZ3VpLWludmlldy1wYWdlPiBpbnRvICNwYWdlcyAtLT5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3BhZ2VzJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwYWdlc1JlZjogVmlld0NvbnRhaW5lclJlZjtcclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZmlyZWQgd2hlbiBib3R0b20gb2YgdGhlIHZpcnR1YWwgbGlzdCBpcyBpbiB2aWV3XHJcbiAgICogVGhlIGhhbmRsZXIgb2YgdGhpcyBldmVudCBtdXN0IGNhbGwgYCRldmVudC5hZGRJdGVtcyhpdGVtczogQXJyYXk8YW55PilgIHRvIGZpbGwgY29udGVudHNcclxuICAgKiBJZiBub3QsIG9ubHkgdGhlIGZpcnN0IHBhZ2UgaXMgbG9hZGVkLCBhbmQgcmVzdCBvZiB0aGUgcGFnZXMgd29uJ3QgYmUgbG9hZGVkO1xyXG4gICAqXHJcbiAgICogIyMjIGV4YW1wbGVcclxuICAgKiBgYGB0c1xyXG4gICAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAgICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICAgKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gICAqICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgKiAgICAgPC9kaXY+XHJcbiAgICogICAgIDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5Mb2FkaW5nPC9uZy10ZW1wbGF0ZT5cclxuICAgKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICAgKiBgYGBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYm90dG9tSW52aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqIFRoZSBsYXN0IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGJlaW5nIGluc2VydGVkICovXHJcbiAgaW52aWV3UGFnZTogQ29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50PjtcclxuICBfZm9jdXNlZCA9IGZhbHNlO1xyXG4gIC8qKiBJbmRpY2F0ZXMgaWYgYSBwYWdlIGlzIHN0aWxsIGxvYWRpbmcgKi9cclxuICBpc0xpc3RMb2FkaW5nOiBib29sZWFuO1xyXG4gIGludmlld1BhZ2VzOiBBcnJheTxDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgZHluYW1pY0NvbXBvbmVudFNlcnZpY2U6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlLFxyXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKiBDaGVjayBpZiBuZWNlc3NhcnkgaW5wdXQgYW5kIG91dHB1dCBpcyBwcm92aWRlZCAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy50ZW1wbGF0ZSB8fCAhdGhpcy5ib3R0b21JbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCc8bmd1aS12aXJ0dWFsLWxpc3Q+IHJlcXVpcmVzIFt0ZW1wbGF0ZV0gYW5kIHtib3R0b21JbnZpZXcpJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBib3R0b20gaXMgaW52aWV3IHBvcnQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgICogSXQgd2lsbCBpbnNlcnQgYSBkeW5hbWljYWxsIGNyZWF0ZWQgTmd1aUludmlld1BhZ2VDb21wb25lbnQgd2l0aCB0aGUgZ2l2ZW4gdGVtcGxhdGUuXHJcbiAgICogSXQgd2lsbCBhbHNvIGZpcmVzIChib3R0b21JbnZpZXcpIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGZpbGwgdXAgaXRlbXMgZm9yIHRoZSBwYWdlLlxyXG4gICAqL1xyXG4gIGFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNMaXN0TG9hZGluZykge1xyXG4gICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlID1cclxuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZUNvbXBvbmVudChOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCwgdGhpcy5wYWdlc1JlZik7XHJcbiAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuaW5zZXJ0Q29tcG9uZW50KHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgICB0aGlzLmludmlld1BhZ2VzLnB1c2godGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuYm90dG9tSW52aWV3LmVtaXQodGhpcyk7IC8vIGZpcmUgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gbG9hZCBpdGVtc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FscmVhZHkgYSBwYWdlIGJlaW5nIGluc2VydGVkLCBza2lwcGluZyBhZGRpbmcgYSBwYWdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaXRlbXMgb2YgTmd1aUludmlld1BhZ2VDb21wb25lbnRcclxuICBhZGRMaXN0KGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGl0ZW1zKTtcclxuICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBOb01hdGNoRm91bmQge1xyXG4gIGh0bWwgPSAnTm8gTWF0Y2ggRm91bmQnO1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBOb25lU2VsZWN0IHtcclxuICBodG1sID0gJ1NlbGVjdCc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZmlyZUV2ZW50IH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZmlyZS1ldmVudCc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9NYXRjaEZvdW5kIH0gZnJvbSAnLi9uby1tYXRjaC1mb3VuZCc7XHJcbmltcG9ydCB7IE5vbmVTZWxlY3QgfSBmcm9tICcuL25vbmUtc2VsZWN0JztcclxuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktYXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cImlzUmVhZHlcIiBjbGFzcz1cIm5ndWktYXV0b2NvbXBsZXRlXCI+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8bmd1aS1pbnZpZXcgKGludmlldyk9XCJhZGRNb3JlUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtwb3NpdGlvbjogYWJzb2x1dGU7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IG1heC1oZWlnaHQ6IDMwMHB4OyBvdmVyZmxvdzogYXV0b31cclxuICAgIC5uZ3VpLWF1dG9jb21wbGV0ZSB7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IHBhZGRpbmc6IDRweCB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgZXh0ZW5kcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZvcjogc3RyaW5nOyAvLyBpbnB1dCB0YWcgaWRcclxuICBASW5wdXQoKSBtaW5JbnB1dENoYXJzID0gMTtcclxuICBASW5wdXQoKSBibGFua09wdGlvbiA9ICdTZWxlY3QgT25lJztcclxuICBASW5wdXQoKSBub01hdGNoSXRlbSA9ICdObyBNYXRjaCBGb3VuZCc7XHJcblxyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDtcclxuICBfZm9jdXNlZDogYW55ID0ge2lucHV0OiBmYWxzZSwgbGlzdEl0ZW06IGZhbHNlfTtcclxuICBfZm9jdXNUaW1lcjtcclxuICBfYWNUaW1lcjtcclxuICBfc2VsZWN0ZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfZXNjYXBlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gIF9vcmdJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX3ByZXZJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX2xhc3RTZWxlY3RlZDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGF1dG9jb21wbGV0ZSBkaXNwbGF5IGNvbmRpdGlvblxyXG4gICAqIGF1dG9jb21wb2xldGUgbGlzdCBpcyBvbmx5IHZpc2libGVcclxuICAgKiAgIC0gd2hlbiBpbnB1dCBlbGVtZW50IGlzIGZvY3VzZWQgb3IgbGlzdCBlbGVtZW50IGlzIGZvY3VzZWRcclxuICAgKiAgIC0gd2hlbiBpbnB1dCB2YWx1ZSBoYXMgZW5vdWdodCBjaGFyYWN0ZXJzXHJcbiAgICogICAtIGFuZCB1c2VyIGp1c3QgZGlkIG5vdCBzZWxlY3RlZCBvciBlc2NhcGVkXHJcbiAgICovXHJcbiAgZ2V0IGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE9yRXNjYXBlZCA9IHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgfHwgdGhpcy5fZXNjYXBlZEZyb21MaXN0O1xyXG4gICAgY29uc3QgZm9jdXNlZCA9IHRoaXMuX2ZvY3VzZWQuaW5wdXQgfHwgdGhpcy5fZm9jdXNlZC5saXN0SXRlbTtcclxuICAgIGNvbnN0IG1pbkNoYXJzID0gdGhpcy5pbnB1dEVsLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbklucHV0Q2hhcnM7XHJcblxyXG4gICAgcmV0dXJuICghc2VsZWN0ZWRPckVzY2FwZWQgJiYgZm9jdXNlZCAmJiBtaW5DaGFycyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuZm9yKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgdGhpcy5wb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5pbnB1dEVsLCAna2V5dXAnKS5zdWJzY3JpYmUodGhpcy5vbklucHV0RWxLZXl1cC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25JbnB1dEVsRm9jdXNlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vbklucHV0RWxCbHVycmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5zdWJzY3JpYmUodGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5lc2NhcGVkLnN1YnNjcmliZSh0aGlzLm9uRXNjYXBlZC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWQodmFsdWUpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICB0aGlzLl9sYXN0U2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgICAgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25TZWxlY3RlZCgpIGlzIGNhbGxlZCcsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uRXNjYXBlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIGlmICghdGhpcy5fbGFzdFNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IHRoaXMuX29yZ0lucHV0VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7IC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uRXNjYXBlZCgpIGlzIGNhbGxlZCcpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsRm9jdXNlZChldmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEVsRm9jdXNlZCgpIGlzIGNhbGxlZCcsIGV2ZW50KTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vcmdJbnB1dFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLl9vcmdJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcHJldklucHV0VmFsdWUgPSB0aGlzLmlucHV0RWwudmFsdWU7XHJcbiAgICB0aGlzLnNldEZvY3VzZWQoJ2lucHV0JywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxCbHVycmVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMuZm9yRWFjaChjb21wUmVmID0+IHtcclxuICAgICAgY29tcFJlZi5kZXN0cm95KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbklucHV0S2V5dXAoKSBpcyBjYWxsZWQnLCBldmVudC5rZXkpO1xyXG4gICAgY29uc3QgZmlyc3RMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbmd1aS1saXN0LWl0ZW0nKTtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpZiAoZmlyc3RMaXN0KSB7XHJcbiAgICAgICAgZmlyZUV2ZW50KGZpcnN0TGlzdCwgJ2tleXVwJywge2tleTogZXZlbnQua2V5fSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vbkVzY2FwZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICgoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JykgJiYgZmlyc3RMaXN0KSB7XHJcbiAgICAgIGZpcnN0TGlzdC5mb2N1cygpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XHJcbiAgICAgIC8vXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkQXV0b2NvbXBsZXRlTGlzdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSAqL1xyXG4gIGFkZEF1dG9jb21wbGV0ZUxpc3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hY1RpbWVyKTtcclxuICAgICAgdGhpcy5fYWNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlOyAvLyA/Pz8/Pz8/L1xyXG4gICAgICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsZWFyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIGFmdGVyIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSB3aGVuIGl0IHNjcm9sbHMgdG8gdGhlIGJvdHRvbSAqL1xyXG4gIGFkZE1vcmVQYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEZvY3VzZWQoZWxUeXBlOiAnaW5wdXQnIHwgJ2xpc3RJdGVtJywgdmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9mb2N1c1RpbWVyKTtcclxuICAgICAgdGhpcy5fZm9jdXNlZCA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9mb2N1c1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNlZFtlbFR5cGVdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzRWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHRoaXNJbnB1dEVsQkNSID0gdGhpcy5pbnB1dEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgdG9wID0gdGhpc0lucHV0RWxCQ1IudG9wICsgdGhpc0lucHV0RWxCQ1IuaGVpZ2h0ICsgd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICdsZWZ0JywgYCR7dGhpc0lucHV0RWxCQ1IubGVmdH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICd0b3AnLCBgJHt0b3B9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbWluV2lkdGgnLCBgJHt0aGlzSW5wdXRFbEJDUi53aWR0aH1weGApO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJz4+Pj4+PiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVE9ETzogLi4uLi4uLi4gZm9yIDFzdCBwYWdlIG9ubHksIHNob3cgbm8gbWF0Y2ggZm91bmQgb3IgYmxhbmsgb3B0aW9uXHJcbiAgICBsZXQgbm9NYXRjaEl0ZW06IGFueTtcclxuICAgIGxldCBibGFua0l0ZW06IGFueSA9IHt9O1xyXG4gICAgaWYgKHRoaXMuaW52aWV3UGFnZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLm5vTWF0Y2hJdGVtICYmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSkgeyAvLyBhZGQgbm8gbWF0Y2ggaXRlbVxyXG4gICAgICAgIG5vTWF0Y2hJdGVtID0gbmV3IE5vTWF0Y2hGb3VuZCgpO1xyXG4gICAgICAgIGJsYW5rSXRlbS5odG1sID0gdGhpcy5ub01hdGNoSXRlbTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmJsYW5rT3B0aW9uKSB7XHJcbiAgICAgICAgYmxhbmtJdGVtID0gbmV3IE5vbmVTZWxlY3QoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMuYmxhbmtPcHRpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGxJdGVtcyA9IFtdLmNvbmNhdChub01hdGNoSXRlbSwgYmxhbmtJdGVtLCBpdGVtcykuZmlsdGVyKHggPT4geCk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoYWxsSXRlbXMpO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdCcgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3REaXJlY3RpdmUge1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3QsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmd1aUxpc3REaXJlY3RpdmUgfSBmcm9tICcuL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vbmVTZWxlY3QgfSBmcm9tICcuL25vbmUtc2VsZWN0JztcclxuaW1wb3J0IHsgTm9NYXRjaEZvdW5kIH0gZnJvbSAnLi9uby1tYXRjaC1mb3VuZCc7XHJcblxyXG4vLyB0YWJpbmRleCwga2V5ZG93biwga2V5dXAoRU5URVIsIEVTQyksIGNsaWNrXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0LWl0ZW0nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCdpdGVtJykgb2JqZWN0OiBhbnk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuXHJcbiAgbmV4dFNpYmxpbmc6IEhUTUxFbGVtZW50O1xyXG4gIHByZXZTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwYXJlbnRMaXN0Q29tcDogTmd1aUxpc3REaXJlY3RpdmUgfCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfCBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgbGlzdERpcmVjdGl2ZTogTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgdmlydHVhbExpc3RDb21wb25lbnQ6IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBhdXRvY29tcGxldGVDb21wb25lbnQ6IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnRcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAgPSB0aGlzLmxpc3REaXJlY3RpdmUgfHwgdGhpcy52aXJ0dWFsTGlzdENvbXBvbmVudCB8fCB0aGlzLmF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuICAgIGlmICghdGhpcy5wYXJlbnRMaXN0Q29tcCkge1xyXG4gICAgICB0aHJvdyBFcnJvcignbmd1aS1saXN0LWl0ZW0gcmVxdWlyZXMgcGFyZW50IG9mIG5ndWktbGlzdCwgbmd1aS12aXJ0dWFsLWxpc3QsIG9yIG5ndWktYXV0b2NvbXBsZXRlLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vbmVTZWxlY3QpIHx8ICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vTWF0Y2hGb3VuZCkpIHtcclxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLm9iamVjdC5odG1sO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCB1cCwgZG93biwgbGVmdCwgcmlnaHRcclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkga2V5ZG93bihldmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0xpc3RJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICBjb25zdCBwYXJlbnRMaXN0RWwgPSB0aGlzLnBhcmVudExpc3RDb21wLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGxpc3RJdGVtczogQXJyYXk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgID0gQXJyYXkuZnJvbShwYXJlbnRMaXN0RWwucXVlcnlTZWxlY3RvckFsbCgnbmd1aS1saXN0LWl0ZW0nKSk7XHJcbiAgICBjb25zdCBsaXN0SXRlbU5keCA9IGxpc3RJdGVtcy5pbmRleE9mKHRoaXNMaXN0SXRlbSk7XHJcbiAgICBjb25zdCBuZXh0TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggKyAxXSB8fCBsaXN0SXRlbXNbMF07XHJcbiAgICBjb25zdCBwcmV2TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggLSAxXSB8fCBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xyXG4gICAgICBjYXNlIDM3OiBjYXNlIDM4OiAvLyB1cCBhcnJvdywgbGVmdCBhcnJvd1xyXG4gICAgICAgIHByZXZMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM5OiBjYXNlIDQwOiAvLyBkb3duIGFycm93LCByaWdodCBhcnJvd1xyXG4gICAgICAgIG5leHRMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCBlbnRlcigxMyksIGVzYygyNylcclxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleXVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnRXNjYXBlJzpcclxuICAgICAgICB0aGlzLnBhcmVudExpc3RDb21wLmVzY2FwZWQuZW1pdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBtb3VzZWRvd24oKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKSBmb2N1c2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgYmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7Tmd1aUxpc3RJdGVtRGlyZWN0aXZlfSBmcm9tICcuL3NyYy9uZ3VpLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtOZ3VpTGlzdERpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1saXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQge05ndWlJbnZpZXdQYWdlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge05ndWlWaXJ0dWFsTGlzdENvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7Tmd1aUludmlld01vZHVsZX0gZnJvbSAnLi4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTmd1aUludmlld01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXG4gICAgICAgIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LFxuICAgICAgICBOZ3VpTGlzdERpcmVjdGl2ZSxcbiAgICAgICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxuICAgICAgICBOZ3VpVmlydHVhbExpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgTmd1aUludmlld1BhZ2VDb21wb25lbnQsXG4gICAgICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxuICAgICAgICBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUsXG4gICAgICAgIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTmd1aUludmlld1BhZ2VDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0TW9kdWxlIHtcbn1cblxuZXhwb3J0IHtOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuZXhwb3J0IHtOZ3VpTGlzdEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5leHBvcnQge05ndWlMaXN0RGlyZWN0aXZlfSBmcm9tICcuL3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcbmV4cG9ydCB7Tmd1aUludmlld1BhZ2VDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcbmV4cG9ydCB7Tmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiB3aW5kb3cua29uc29sZSBhbHRlcm5hdGl2ZVxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGBcclxuICoga29uc29sZS5zZXRMb2dMZXZlbCgnZXJyb3InKTtcclxuICoga29ud29sZS5sb2coMSwyLDMsNCw1KTtcclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3Mga29uc29sZSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAvKiogYWxsIGxvZyBsZXZlbHMgKi9cclxuICBzdGF0aWMgTE9HX0xFVkVMUyA9IHtcclxuICAgIEFMTDogICBwYXJzZUludCgnMDAwMDAnLCAyKSxcclxuICAgIERFQlVHOiBwYXJzZUludCgnMDAwMDEnLCAyKSxcclxuICAgIExPRzogICBwYXJzZUludCgnMDAwMTAnLCAyKSxcclxuICAgIElORk86ICBwYXJzZUludCgnMDAxMDAnLCAyKSxcclxuICAgIFdBUk46ICBwYXJzZUludCgnMDEwMDAnLCAyKSxcclxuICAgIEVSUk9SOiBwYXJzZUludCgnMTAwMDAnLCAyKSxcclxuICAgIE5PTkU6ICBwYXJzZUludCgnMTExMTEnLCAyKVxyXG4gIH07XHJcblxyXG4gIC8qKiBjdXJyZW50IGxvZyBsZXZlbCBzZXQgYnkgc2V0TG9nTGV2ZWwsIGRlZmF1bHQgJ0lORk8nICovXHJcbiAgc3RhdGljIGxvZ0xldmVsID0gJ0lORk8nO1xyXG5cclxuICAvKiogcmV0dXJucyBpZiBpdCBzaG91bGQgY2FsbCBgd2luZG93LmNvbnNvbGVgIG9yIG5vdCAqL1xyXG4gIHN0YXRpYyB0b0xvZyhwYXJhbSk6IGJvb2xlYW4geyAvLyByZXR1cm5zIHRvIGxvZyBvciBub3RcclxuICAgIGNvbnN0IHJlc3RyaWN0aW9uTnVtID0gdGhpcy5MT0dfTEVWRUxTW3RoaXMubG9nTGV2ZWxdO1xyXG4gICAgY29uc3QgcmVxdWlyZWROdW0gPSB0aGlzLkxPR19MRVZFTFNbcGFyYW1dO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlZE51bSA+IHJlc3RyaWN0aW9uTnVtO1xyXG4gIH1cclxuXHJcbiAgLyoqIHNldHMgdGhlIGN1cnJlbnQgbG9nIGxldmVsICovXHJcbiAgc3RhdGljIHNldExvZ0xldmVsKGxvZ0xldmVsOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbG9nTGV2ZWwgPSBsb2dMZXZlbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgY29uc3QgbG9nTGV2ZWxzID0gT2JqZWN0LmtleXModGhpcy5MT0dfTEVWRUxTKTtcclxuICAgIGlmIChsb2dMZXZlbHMuaW5kZXhPZihsb2dMZXZlbCkgPiAtMSkge1xyXG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZSkgeyAvLyBmb3IgYnJvd3NlciBlbnYuXHJcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2tvbnNvbGUuTE9HX0xFVkVMJywgbG9nTGV2ZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yLCBpbnZhbGlkIGxvZ0xldmVsLCBpdCBtdXN0IGJlIG9uZSBvZiAke2xvZ0xldmVsc31gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5kZWJ1ZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBkZWJ1Z2AgKi9cclxuICBzdGF0aWMgZGVidWcoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0RFQlVHJykpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUubG9nKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGxvZ2AgKi9cclxuICBzdGF0aWMgbG9nKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdMT0cnKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuaW5mbygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBpbmZvYCAqL1xyXG4gIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdJTkZPJykpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS53YXJuKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYHdhcm5gICovXHJcbiAgc3RhdGljIHdhcm4oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ1dBUk4nKSkge1xyXG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmVycm9yKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGVycm9yYCAqL1xyXG4gIHN0YXRpYyBlcnJvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnRVJST1InKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2FsbCcpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCd5ZXMnKTtcclxuLy8ga29uc29sZS5sb2coJ3llcycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ25vbmUnKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCdubycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnaW5mbycpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdXQVJOJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnRVJST1InKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05ndWlIaWdobGlnaHRQaXBlfSBmcm9tICcuL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlJztcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2V9IGZyb20gJy4vc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxuICAgIGV4cG9ydHM6IFtOZ3VpSGlnaGxpZ2h0UGlwZV0sXG4gICAgcHJvdmlkZXJzOiBbRHluYW1pY0NvbXBvbmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5ndWlVdGlsc01vZHVsZSB7IH1cblxuZXhwb3J0IHsga29uc29sZSB9IGZyb20gJy4vc3JjL2tvbnNvbGUnO1xuZXhwb3J0IHsgZmlyZUV2ZW50IH0gZnJvbSAnLi9zcmMvZmlyZS1ldmVudCc7XG5leHBvcnQge0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlfSBmcm9tICcuL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcbmV4cG9ydCB7Tmd1aUhpZ2hsaWdodFBpcGV9IGZyb20gJy4vc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUnO1xuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcbmltcG9ydCB7Tmd1aUxpc3RNb2R1bGV9IGZyb20gJy4vbmd1aS1saXN0L25ndWktbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHtOZ3VpVXRpbHNNb2R1bGV9IGZyb20gJy4vbmd1aS11dGlscy9uZ3VpLXV0aWxzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOZ3VpSW52aWV3TW9kdWxlLFxuICAgICAgICBOZ3VpTGlzdE1vZHVsZSxcbiAgICAgICAgTmd1aVV0aWxzTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5ndWlJbnZpZXdNb2R1bGUsXG4gICAgICAgIE5ndWlMaXN0TW9kdWxlLFxuICAgICAgICBOZ3VpVXRpbHNNb2R1bGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5ndWlDb21tb25Nb2R1bGUge1xufVxuXG5leHBvcnQgKiBmcm9tICcuL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbmd1aS11dGlscy9uZ3VpLXV0aWxzLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUnO1xuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztJQWdESSw2QkFDWSxTQUNBLFVBQ3FCLFVBQWU7UUFGcEMsWUFBTyxHQUFQLE9BQU87UUFDUCxhQUFRLEdBQVIsUUFBUTtRQUNhLGVBQVUsR0FBVixVQUFVLENBQUs7Ozs7dUJBYnhCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO3NCQUMvQixJQUFJLFlBQVksRUFBRTt5QkFDZixJQUFJLFlBQVksRUFBRTs7Ozt3QkFJaEQsS0FBSzs7OztnQ0FFRyxLQUFLO0tBTXZCOzs7Ozs7SUFHRCxzQ0FBUTs7OztJQUFSO1FBQ0ksSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3JEO0tBQ0o7Ozs7OztJQUdELHlDQUFXOzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzlCOzs7Ozs7O0lBR0QsNkNBQWU7Ozs7O0lBQWYsVUFBZ0IsT0FBTztRQUF2QixpQkFVQztRQVRHLE9BQU8sQ0FB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