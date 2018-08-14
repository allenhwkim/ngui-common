import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef, Directive, NgModule, ComponentFactoryResolver, Injectable, ChangeDetectorRef, Renderer2, ViewChild, ViewContainerRef, Host, HostListener, Optional, Pipe } from '@angular/core';
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
 * <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, platformId) {
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
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
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
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
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
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        observerOptions: [{ type: Input }],
        options: [{ type: Input }],
        blurEnabled: [{ type: Input }],
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
    function NguiInviewDirective(element, platformId) {
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
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
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
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NguiInviewDirective.propDecorators = {
        observerOptions: [{ type: Input }],
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
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
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
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
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

export { NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent, NguiListModule, DynamicComponentService, NguiHighlightPipe, konsole, fireEvent, NguiUtilsModule, NguiCommonModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1pbnZpZXcvc3JjL25ndWktaW52aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25vLW1hdGNoLWZvdW5kLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbm9uZS1zZWxlY3QudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMva29uc29sZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBBbiBlbGVtZW50IHRoYXQgbGlzdGVucyB0byB2aWV3cG9ydCBwb3NpdGlvbmluZyBhbmQgZmlyZXMgaW5WaWV3IGFuZCBub3RJbnZpZXcgZXZlbnRzXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWluLXZpZXcgW29ic2VydmVyT3B0aW9uc109XCJteU9ic2VydmVyT3B0aW9uc1wiIChpblZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW4tdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ludmlld1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBgLFxyXG4gIHN0eWxlczogWyc6aG9zdCB7ZGlzcGxheTogYmxvY2s7fSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIDxuZy10ZW1wbGF0ZT4gcmVmZXJlbmNlICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIENvbnRyb2xzIHdoZXRoZXIgYmx1ciBlZmZlY3QgaXMgYXBwbGllZCB0byBhIGNvbXBvbmVudCB3aXRoIGxlc3MgdGhhbiA4MCUgaW50ZXJzZWN0aW9uIHJhdGlvLlxyXG4gICAqIE9ubHkgYXBwbGllcyB3aGVuIHRoZXJlIGFyZSBubyBcImludmlld1wiIGV2ZW50IGhhbmRsZXJzIGRlZmluZWQuXHJcbiAgICoqL1xyXG4gIEBJbnB1dCgpIGJsdXJFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG5vdEludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgKi9cclxuICBpc0ludmlldyA9IGZhbHNlO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyA4MCUgaW4gdmlld3BvcnQuIFVzZWQgYnkgdGhlIGRlZmF1bHQgY2FsbGJhY2sgKi9cclxuICBvbmNlODBQY3RWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogc3RvcCBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBmaXJlcyAoaW52aWV3KSBhbmQgKG5vdEludmlldykgZXZlbnRzIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdmlzaWJsZSBvciBub3QgdmlzaWJsZSAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLmlzSW52aWV3ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5vdEludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVmYXVsdCBpbnRlcnNlY3Rpb24gaGFuZGxlciwgd2hpY2ggc2V0cyBibHVyIGRlcGVuZGVzIG9uIGludGVyc2VjdGlvbiByYXRpb1xyXG4gICAgICogdGhpcyB3b24ndCBiZSBpbnZva2VkIGlmIHVzZXIgcHJvdmlkZXMgYW55IChpbnZpZXcpIGV2ZW50LiBlLmcuIChpbnZpZXcpPVwic29tZXRoaW5nKClcIlxyXG4gICAgICovXHJcbiAgZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpOiBhbnkge1xyXG4gICAgaWYgKCF0aGlzLmJsdXJFbmFibGVkIHx8IHRoaXMub25jZTgwUGN0VmlzaWJsZSB8fCB0aGlzLmludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPCAwLjgpIHtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IGVudHJ5LmludGVyc2VjdGlvblJhdGlvICogKDEgLyAwLjgpO1xyXG4gICAgICBjb25zdCBibHVyID0gMjAgLSBNYXRoLmZsb29yKGVudHJ5LmludGVyc2VjdGlvblJhdGlvICogMTApICogNDtcclxuICAgICAgY29uc3QgZmlsdGVyID0gYGJsdXIoJHtibHVyfXB4KWA7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oZW50cnkudGFyZ2V0LnN0eWxlLCB7b3BhY2l0eSwgZmlsdGVyfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbnRyeS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5maWx0ZXIgPSAndW5zZXQnO1xyXG5cclxuICAgICAgdGhpcy5vbmNlODBQY3RWaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vKipcclxuICogRmlyZXMgKG5ndWlJbnZpZXcpIG9yIChuZ3VpT3V0dmlldykgZXZlbnRzIGRlcGVuZGVudHMgb24gdGhlIGVsZW1lbnQgaXMgaW4gdmlld3BvcnQgb3Igbm90XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25ndWlJbnZpZXddLCBbbmd1aU91dHZpZXddJyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuXHJcbiAgICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIEBJbnB1dCgpIG9ic2VydmVyT3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge3RocmVzaG9sZDogWy4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOF19O1xyXG4gICAgLyoqIERlcHJlY2F0ZWQgY29uZmlnLiBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC5cclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLiAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuXHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gaW4gdmlld3BvcnQgKi9cclxuICBAT3V0cHV0KCkgbmd1aUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gb3V0IG9mICB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpT3V0dmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdG9wcyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5vYnNlcnZlcikge1xyXG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyAobmd1aUludmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcclxuICAgICAqICBhbmQgZmlyZXMgKG5ndWlPdXR2aWV3KSBldmVudCB3aGVuIHRoaXMgZWxlbWVudCBpcyBub3QgaW4gdmlld3BvcnRcclxuICAgICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMubmd1aUludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5ndWlPdXR2aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05ndWlJbnZpZXdDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aUludmlld0RpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCB7Tmd1aUludmlld0NvbXBvbmVudCwgTmd1aUludmlld0RpcmVjdGl2ZX07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ3VpSW52aWV3Q29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmd1aUludmlld0NvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdEaXJlY3RpdmVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3TW9kdWxlIHtcclxufVxyXG4iLCIvKipcclxuICogZmlyZSB0aGUgZ2l2ZW4gZXZlbnQgd2l0aCBvcHRpb25zIG9uIHRoZSBlbGVtZW50XHJcbiAqIEBleGFtcGxlXHJcbiAqIGZpcmVFdmVudChlbCwgJ2NsaWNrJyk7XHJcbiAqIGZpcmVFdmVudChlbCwgJ2tleXByZXNzJywge2tleTogJ0VudGVyJ30pO1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pOiBib29sZWFuIHtcclxuICBsZXQgZXZlbnQ7XHJcbiAgaWYgKHR5cGUgPT09ICdjbGljaycgfHwgdHlwZS5tYXRjaCgvXm1vdXNlLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9ea2V5LykpIHtcclxuICAgIGV2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9edG91Y2gvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgVG91Y2hFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG4iLCIvKipcclxuICogSW5zZXJ0IGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IHVzaW5nIGEgc2VydmljZVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiBpbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4vZHluYW1pYy5jb21wb25lbnQuc2VydmljZSc7XHJcbiAqIGltcG9ydCB7IE15RHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vbXktMS5jb21wb25lbnQnO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogICB0ZW1wbGF0ZTogYCAuLi4gPGRpdiAjZHltYW1pYz48L2Rpdj5gXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqICAgQFZpZXdDaGlsZCgnZHluYW1pYycsIHtyZWFkOlZpZXdDb250YWluZXJSZWZ9KSB2Y3I6IFZpZXdDb250YWluZXJSZWY7XHJcbiAqXHJcbiAqICAgY29uc3RydWN0b3IocHVibGljIGRjczogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UpIHt9XHJcbiAqXHJcbiAqICAgaW5zZXJ0Q29tcCgpIHtcclxuICogICAgIGxldCBjb21wUmVmID0gdGhpcy5kY3MuY3JlYXRlQ29tcG9uZW50KE15RHluYW1pY0NvbXBvbmVudCwgdGhpcy52Y3IpO1xyXG4gKiAgICAgdGhzLmRjcy5pbnNlcnRDb21vbmVudChjbXBSZWYpO1xyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5pdGVtcyA9IFsxLDIsM107ICAgICAgICAgICAgICAvLyBkZWFsaW5nIHdpdGggQGlucHV0XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLm91dHB1dCQuc3Vic2NyaWJlKHZhbCA9PiB7fSk7IC8vIGRlYWxpbmcgd2l0aCBAb3V0cHV0XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBzZXJ2aWNlIHRvIGFkZCBvciByZW1vdmUgY29tcG9uZW50IGR5bmFtaWNhbGx5XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB7XHJcbiAgLyoqIHVzZWQgdG8gY3JlYXRlIGEgZmFjdG9yeSBmcm9tIGEgY29tcG9uZW50IGNsYXNzICovXHJcbiAgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XHJcbiAgLyoqIGRlZmluZXMgd2hlcmUgYSBkeW5hbWljIGNvbXBvbmVudHMgaW5zZXJ0IGludG8gKi9cclxuICByb290Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIGZhY3RvcnlSZXNvbHZlcikge1xyXG4gICAgdGhpcy5mYWN0b3J5UmVzb2x2ZXIgPSBmYWN0b3J5UmVzb2x2ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGNvbXBvbmVudCByZWZlcmVuY2VcclxuICAgKiBUaGUgcmVhc29uIHRvIHNlcGVyYXRlIGBjcmVhdGVDb21wbmVudGAgYW5kIGBpbnNlcnRDb21wb25lbnRgIGlzXHJcbiAgICogdG8gYWxsb3cgc29tZSBhY3Rpb25zIGJlZm9yZSB3ZSBpbnNlcnQgaW50byBhIGhvc3RWaWV3LlxyXG4gICAqIGUuZyBzdHlsaW5nLCBzZXR0aW5nIGF0dHJpYnV0ZXMsIGV0Y1xyXG4gICAqL1xyXG4gIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgaW50bz86IFZpZXdDb250YWluZXJSZWYpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aGlzLnJvb3RWaWV3Q29udGFpbmVyID0gaW50byB8fCB0aGlzLnJvb3RWaWV3Q29udGFpbmVyO1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuZmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcblxyXG4gICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKHRoaXMucm9vdFZpZXdDb250YWluZXIucGFyZW50SW5qZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaW5zZXJ0IGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGluc2VydENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogQ29tcG9uZW50IHtcclxuICAgIGNvbnN0IGNvbXBJZCA9IGBuZ3VpLWR5bi0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICoqIDcpICsgMTAgKiogNn1gO1xyXG4gICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGNvbXBJZCk7XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuaWQgPSBjb21wSWQ7XHJcblxyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBBIGJsb2NrIG9mIGNvbXBvbmVudCB0aGF0IGxpc3RlbnMgdG8gaW5WaWV3IGFuZCBvdXRWaWV3IGV2ZW50cyxcclxuICogc28gdGhhdCBpdCBlbXB0aWVzIGNvbnRlbnRzIHdoZW4gb3V0IG9mIHZpZXcgYWZ0ZXIgYmFja3VwIGl0ZW1zXHJcbiAqIGFuZCByZXN0b3JlcyB0aGUgY29udGVudHMgd2hlbiBpbiB2aWV3XHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlIFtpdGVtc109XCJpdGVtc1wiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS1pbnZpZXctcGFnZT5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3LXBhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW52aWV3LXBhZ2UgY29udGVudHNcIlxyXG4gICAgICAobmd1aUludmlldyk9XCJyZXN0b3JlSXRlbXMoKVwiXHJcbiAgICAgIChuZ3VpT3V0dmlldyk9XCJlbXB0eUl0ZW1zKClcIj5cclxuICAgICAgPCEtLSBhZGQgYmxhbmsgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uICAtLT5cclxuICAgICAgPCEtLSBubyBtYXRjaCBmb3VuZCBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXx8ZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW1zOiBpdGVtcywgb3V0Vmlldzogb3V0Vmlld31cIj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJvdXRWaWV3XCI+e3sgaXRlbXNCYWNrdXAubGVuZ3RoIH19IGl0ZW1zIGhpZGRlbjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj4gRXJyb3I6IHJlcXVpcmVzIFtpdGVtc10gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIj4gRXJyb3I6IHJlcXVpcmVzICZsdDtuZy10ZW1wbGF0ZT48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBjb250ZW50cyAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8vIEBJbnB1dCgndGVtcGxhdGUnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBhcmUgdXNlZCB0byByZW5kZXIgdGhpcyBlbGVtZW50ICovXHJcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PGFueT47XHJcblxyXG4gIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgb3B0aW9uczogYW55O1xyXG4gIC8qKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBvZiBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBvdXRWaWV3ID0gZmFsc2U7XHJcbiAgLyoqIFRoZSBjb3B5IG9mIGl0ZW1zLiBUaGlzIGlzIHNldCB3aGVuIHRoaXMgZWxlbWVudCBpcyBvdXQgb2Ygdmlld3BvcnQgKi9cclxuICBpdGVtc0JhY2t1cDogQXJyYXk8YW55PiA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoaXMgY29tcG9uZW50LlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgaXQgcmVtYWlucyB0aGUgc2FtZSBldmVuIHdoZW4gaXRlbXMgZ2V0IGVtcHR5IG91dC5cclxuICAgKi9cclxuICBjb250ZW50c0VsOiBIVE1MRWxlbWVudDtcclxuICBkZXN0cm95ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIGl0ZW1zIHdoZW4gaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIHJlbmRlcmVkXHJcbiAgICovXHJcbiAgcmVzdG9yZUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3V0Vmlldykge1xyXG4gICAgICB0aGlzLm91dFZpZXcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pdGVtcyA9IEFycmF5LmZyb20odGhpcy5pdGVtc0JhY2t1cCB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgdW5kZWZpbmVkKTtcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGVudHNFbCA9XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnZpZXctcGFnZS5jb250ZW50cycpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUludmlld1BhZ2VDb21wb25lbnQubmdPbkRlc3Ryb3koKSBpcyBjYWxsZWQnKTtcclxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHR5IGl0ZW1zIHdoZW4gbm90IGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSBub3QgcmVuZGVyZWRcclxuICAgKi9cclxuICBlbXB0eUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5jb250ZW50c0VsICYmICF0aGlzLm91dFZpZXcpIHtcclxuICAgICAgLy8gc2V0IGhlaWdodCBiZWZvcmUgZW1wdHlpbmcgY29udGVudHNcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xyXG5cclxuICAgICAgdGhpcy5vdXRWaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IEFycmF5LmZyb20odGhpcy5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbXMoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50LnNldEl0ZW1zKCkgaXMgY2FsbGVkIHdpdGgnLCBpdGVtcyk7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd1aUludmlld1BhZ2VDb21wb25lbnQgfSBmcm9tICcuL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBWaXJ0dWFsIExpc3RcclxuICpcclxuICogVGhlIGA8bmd1aS1pbnZpZXcgLi4+YCBpbnNlcnRzIDxuZ3VpLWludmlldy1wYWdlPiBpbnRvXHJcbiAqIGA8ZGl2ICNwYWdlcz5gIHdoZW4gaXQgaXMgaW4gdmlld3BvcnRcclxuICogV2hlbiBpdCdzIGluc2VydGVkLCBpdCB3aWxsIGJlIHB1c2hlZCBkb3duLCB3aGljaCBtYWtlcyBpdCBvdXQgb2Ygdmlld3BvcnQuXHJcbiAqIFVzZXIgc2Nyb2xscyBkb3duIHRvIHNlZSB0aGUgYm90dG9tIG9mIHRoZSBsaXN0LFxyXG4gKiB0aGVuIGl0IHdpbGwgaW5zZXJ0IGFub3RoZXIgYDxuZ3VpLWludmlldy1wYWdlPmAgYWdhaW4uXHJcbiAqXHJcbiAqIDxuZ3VpLWludmlldy1wYWdlPiBsaXN0ZW5zIHRvIChuZ3VpSW52aWV3KSBhbmQgKG5ndWlPdXR2aWV3KSBldmVudHMsXHJcbiAqIHdoZW4gPG5ndWktaW52aWV3LXBhZ2U+IGlzIG91dCBvZiB2aWV3IHBvcnQsIGl0IGVtcHRpZXMgb3V0IHRoZSBjb250ZW50cy5cclxuICogYW5kIGl0IHJlc3RvcmVzIGJhY2sgdGhlIGNvbnRlbnRzIHdoZW4gaXQgaXMgaW4gdmlld3BvcnQgYWdhaW4uXHJcbiAqXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+TG9hZGluZzwvZGl2PlxyXG4gKiAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktdmlydHVhbC1saXN0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm5ndWktdmlydHVhbC1saXN0XCJcclxuICAgICAgKGZvY3VzKT1cIl9mb2N1c2VkID0gdHJ1ZVwiXHJcbiAgICAgIChjbGljayk9XCJfZm9jdXNlZCA9IHRydWVcIj5cclxuICAgICAgPCEtLSBob2xkIG11bHRpcGxlIDxuZ3VpLWludmlldy1wYWdlPiAtLT5cclxuICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDwhLS0gaW5zZXJ0IDxuZ3VpLWludmlldy1wYWdlPiBpbnRvICNwYWdlcyAtLT5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgLyoqIHRoZSBjb250YWluZXIgTmd1aUludmlld1BhZ2Ugd2lsbCBiZSBpbnNlcnRlZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3BhZ2VzJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBwYWdlc1JlZjogVmlld0NvbnRhaW5lclJlZjtcclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZmlyZWQgd2hlbiBib3R0b20gb2YgdGhlIHZpcnR1YWwgbGlzdCBpcyBpbiB2aWV3XHJcbiAgICogVGhlIGhhbmRsZXIgb2YgdGhpcyBldmVudCBtdXN0IGNhbGwgYCRldmVudC5hZGRJdGVtcyhpdGVtczogQXJyYXk8YW55PilgIHRvIGZpbGwgY29udGVudHNcclxuICAgKiBJZiBub3QsIG9ubHkgdGhlIGZpcnN0IHBhZ2UgaXMgbG9hZGVkLCBhbmQgcmVzdCBvZiB0aGUgcGFnZXMgd29uJ3QgYmUgbG9hZGVkO1xyXG4gICAqXHJcbiAgICogIyMjIGV4YW1wbGVcclxuICAgKiBgYGB0c1xyXG4gICAqIDxuZ3VpLXZpcnR1YWwtbGlzdCAoYm90dG9tSW52aWV3KT1cImxvYWRJdGVtcygkZXZlbnQpXCI+XHJcbiAgICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICAgKiAgICAgPGRpdiAqbmdJZj1cIml0ZW1zIGVsc2Ugbm9JdGVtc1wiPlxyXG4gICAqICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICAgKiAgICAgPC9kaXY+XHJcbiAgICogICAgIDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5Mb2FkaW5nPC9uZy10ZW1wbGF0ZT5cclxuICAgKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICogPC9uZ3VpLXZpcnR1YWwtbGlzdD5cclxuICAgKiBgYGBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYm90dG9tSW52aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqIFRoZSBsYXN0IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IGJlaW5nIGluc2VydGVkICovXHJcbiAgaW52aWV3UGFnZTogQ29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50PjtcclxuICBfZm9jdXNlZCA9IGZhbHNlO1xyXG4gIC8qKiBJbmRpY2F0ZXMgaWYgYSBwYWdlIGlzIHN0aWxsIGxvYWRpbmcgKi9cclxuICBpc0xpc3RMb2FkaW5nOiBib29sZWFuO1xyXG4gIGludmlld1BhZ2VzOiBBcnJheTxDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgZHluYW1pY0NvbXBvbmVudFNlcnZpY2U6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlLFxyXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKiBDaGVjayBpZiBuZWNlc3NhcnkgaW5wdXQgYW5kIG91dHB1dCBpcyBwcm92aWRlZCAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy50ZW1wbGF0ZSB8fCAhdGhpcy5ib3R0b21JbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCc8bmd1aS12aXJ0dWFsLWxpc3Q+IHJlcXVpcmVzIFt0ZW1wbGF0ZV0gYW5kIHtib3R0b21JbnZpZXcpJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBib3R0b20gaXMgaW52aWV3IHBvcnQsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgICogSXQgd2lsbCBpbnNlcnQgYSBkeW5hbWljYWxsIGNyZWF0ZWQgTmd1aUludmlld1BhZ2VDb21wb25lbnQgd2l0aCB0aGUgZ2l2ZW4gdGVtcGxhdGUuXHJcbiAgICogSXQgd2lsbCBhbHNvIGZpcmVzIChib3R0b21JbnZpZXcpIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGZpbGwgdXAgaXRlbXMgZm9yIHRoZSBwYWdlLlxyXG4gICAqL1xyXG4gIGFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNMaXN0TG9hZGluZykge1xyXG4gICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlID1cclxuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZUNvbXBvbmVudChOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCwgdGhpcy5wYWdlc1JlZik7XHJcbiAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuaW5zZXJ0Q29tcG9uZW50KHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2UudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gICAgICB0aGlzLmludmlld1BhZ2VzLnB1c2godGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuYm90dG9tSW52aWV3LmVtaXQodGhpcyk7IC8vIGZpcmUgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gbG9hZCBpdGVtc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FscmVhZHkgYSBwYWdlIGJlaW5nIGluc2VydGVkLCBza2lwcGluZyBhZGRpbmcgYSBwYWdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaXRlbXMgb2YgTmd1aUludmlld1BhZ2VDb21wb25lbnRcclxuICBhZGRMaXN0KGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGl0ZW1zKTtcclxuICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBOb01hdGNoRm91bmQge1xyXG4gIGh0bWwgPSAnTm8gTWF0Y2ggRm91bmQnO1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBOb25lU2VsZWN0IHtcclxuICBodG1sID0gJ1NlbGVjdCc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZmlyZUV2ZW50IH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZmlyZS1ldmVudCc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9NYXRjaEZvdW5kIH0gZnJvbSAnLi9uby1tYXRjaC1mb3VuZCc7XHJcbmltcG9ydCB7IE5vbmVTZWxlY3QgfSBmcm9tICcuL25vbmUtc2VsZWN0JztcclxuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktYXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cImlzUmVhZHlcIiBjbGFzcz1cIm5ndWktYXV0b2NvbXBsZXRlXCI+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8bmd1aS1pbnZpZXcgKGludmlldyk9XCJhZGRNb3JlUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtwb3NpdGlvbjogYWJzb2x1dGU7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IG1heC1oZWlnaHQ6IDMwMHB4OyBvdmVyZmxvdzogYXV0b31cclxuICAgIC5uZ3VpLWF1dG9jb21wbGV0ZSB7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IHBhZGRpbmc6IDRweCB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgZXh0ZW5kcyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZvcjogc3RyaW5nOyAvLyBpbnB1dCB0YWcgaWRcclxuICBASW5wdXQoKSBtaW5JbnB1dENoYXJzID0gMTtcclxuICBASW5wdXQoKSBibGFua09wdGlvbiA9ICdTZWxlY3QgT25lJztcclxuICBASW5wdXQoKSBub01hdGNoSXRlbSA9ICdObyBNYXRjaCBGb3VuZCc7XHJcblxyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDtcclxuICBfZm9jdXNlZDogYW55ID0ge2lucHV0OiBmYWxzZSwgbGlzdEl0ZW06IGZhbHNlfTtcclxuICBfZm9jdXNUaW1lcjtcclxuICBfYWNUaW1lcjtcclxuICBfc2VsZWN0ZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfZXNjYXBlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gIF9vcmdJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX3ByZXZJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgX2xhc3RTZWxlY3RlZDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGF1dG9jb21wbGV0ZSBkaXNwbGF5IGNvbmRpdGlvblxyXG4gICAqIGF1dG9jb21wb2xldGUgbGlzdCBpcyBvbmx5IHZpc2libGVcclxuICAgKiAgIC0gd2hlbiBpbnB1dCBlbGVtZW50IGlzIGZvY3VzZWQgb3IgbGlzdCBlbGVtZW50IGlzIGZvY3VzZWRcclxuICAgKiAgIC0gd2hlbiBpbnB1dCB2YWx1ZSBoYXMgZW5vdWdodCBjaGFyYWN0ZXJzXHJcbiAgICogICAtIGFuZCB1c2VyIGp1c3QgZGlkIG5vdCBzZWxlY3RlZCBvciBlc2NhcGVkXHJcbiAgICovXHJcbiAgZ2V0IGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE9yRXNjYXBlZCA9IHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgfHwgdGhpcy5fZXNjYXBlZEZyb21MaXN0O1xyXG4gICAgY29uc3QgZm9jdXNlZCA9IHRoaXMuX2ZvY3VzZWQuaW5wdXQgfHwgdGhpcy5fZm9jdXNlZC5saXN0SXRlbTtcclxuICAgIGNvbnN0IG1pbkNoYXJzID0gdGhpcy5pbnB1dEVsLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbklucHV0Q2hhcnM7XHJcblxyXG4gICAgcmV0dXJuICghc2VsZWN0ZWRPckVzY2FwZWQgJiYgZm9jdXNlZCAmJiBtaW5DaGFycyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuZm9yKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgdGhpcy5wb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5pbnB1dEVsLCAna2V5dXAnKS5zdWJzY3JpYmUodGhpcy5vbklucHV0RWxLZXl1cC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25JbnB1dEVsRm9jdXNlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vbklucHV0RWxCbHVycmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5zdWJzY3JpYmUodGhpcy5vblNlbGVjdGVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5lc2NhcGVkLnN1YnNjcmliZSh0aGlzLm9uRXNjYXBlZC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWQodmFsdWUpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICB0aGlzLl9sYXN0U2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgICAgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25TZWxlY3RlZCgpIGlzIGNhbGxlZCcsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uRXNjYXBlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIGlmICghdGhpcy5fbGFzdFNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IHRoaXMuX29yZ0lucHV0VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7IC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uRXNjYXBlZCgpIGlzIGNhbGxlZCcpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsRm9jdXNlZChldmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEVsRm9jdXNlZCgpIGlzIGNhbGxlZCcsIGV2ZW50KTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vcmdJbnB1dFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLl9vcmdJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcHJldklucHV0VmFsdWUgPSB0aGlzLmlucHV0RWwudmFsdWU7XHJcbiAgICB0aGlzLnNldEZvY3VzZWQoJ2lucHV0JywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxCbHVycmVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMuZm9yRWFjaChjb21wUmVmID0+IHtcclxuICAgICAgY29tcFJlZi5kZXN0cm95KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaW52aWV3UGFnZXMgPSBbXTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbklucHV0S2V5dXAoKSBpcyBjYWxsZWQnLCBldmVudC5rZXkpO1xyXG4gICAgY29uc3QgZmlyc3RMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbmd1aS1saXN0LWl0ZW0nKTtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpZiAoZmlyc3RMaXN0KSB7XHJcbiAgICAgICAgZmlyZUV2ZW50KGZpcnN0TGlzdCwgJ2tleXVwJywge2tleTogZXZlbnQua2V5fSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vbkVzY2FwZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICgoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JykgJiYgZmlyc3RMaXN0KSB7XHJcbiAgICAgIGZpcnN0TGlzdC5mb2N1cygpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XHJcbiAgICAgIC8vXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkQXV0b2NvbXBsZXRlTGlzdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSAqL1xyXG4gIGFkZEF1dG9jb21wbGV0ZUxpc3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hY1RpbWVyKTtcclxuICAgICAgdGhpcy5fYWNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlOyAvLyA/Pz8/Pz8/L1xyXG4gICAgICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsZWFyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENvbXBsZXRlIGFmdGVyIHRoZSBmaXJzdCBwYWdlIG9mIGF1dG9jb21wbGV0ZSB3aGVuIGl0IHNjcm9sbHMgdG8gdGhlIGJvdHRvbSAqL1xyXG4gIGFkZE1vcmVQYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEZvY3VzZWQoZWxUeXBlOiAnaW5wdXQnIHwgJ2xpc3RJdGVtJywgdmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9mb2N1c1RpbWVyKTtcclxuICAgICAgdGhpcy5fZm9jdXNlZCA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9mb2N1c1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNlZFtlbFR5cGVdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvblRoaXNVbmRlcklucHV0RWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzRWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHRoaXNJbnB1dEVsQkNSID0gdGhpcy5pbnB1dEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgdG9wID0gdGhpc0lucHV0RWxCQ1IudG9wICsgdGhpc0lucHV0RWxCQ1IuaGVpZ2h0ICsgd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICdsZWZ0JywgYCR7dGhpc0lucHV0RWxCQ1IubGVmdH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICd0b3AnLCBgJHt0b3B9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbWluV2lkdGgnLCBgJHt0aGlzSW5wdXRFbEJDUi53aWR0aH1weGApO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJz4+Pj4+PiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LmFkZExpc3QoKSBpcyBjYWxsZWQoKScpO1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVE9ETzogLi4uLi4uLi4gZm9yIDFzdCBwYWdlIG9ubHksIHNob3cgbm8gbWF0Y2ggZm91bmQgb3IgYmxhbmsgb3B0aW9uXHJcbiAgICBsZXQgbm9NYXRjaEl0ZW06IGFueTtcclxuICAgIGxldCBibGFua0l0ZW06IGFueSA9IHt9O1xyXG4gICAgaWYgKHRoaXMuaW52aWV3UGFnZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLm5vTWF0Y2hJdGVtICYmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSkgeyAvLyBhZGQgbm8gbWF0Y2ggaXRlbVxyXG4gICAgICAgIG5vTWF0Y2hJdGVtID0gbmV3IE5vTWF0Y2hGb3VuZCgpO1xyXG4gICAgICAgIGJsYW5rSXRlbS5odG1sID0gdGhpcy5ub01hdGNoSXRlbTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmJsYW5rT3B0aW9uKSB7XHJcbiAgICAgICAgYmxhbmtJdGVtID0gbmV3IE5vbmVTZWxlY3QoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMuYmxhbmtPcHRpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGxJdGVtcyA9IFtdLmNvbmNhdChub01hdGNoSXRlbSwgYmxhbmtJdGVtLCBpdGVtcykuZmlsdGVyKHggPT4geCk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoYWxsSXRlbXMpO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdCcgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3REaXJlY3RpdmUge1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3QsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmd1aUxpc3REaXJlY3RpdmUgfSBmcm9tICcuL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vbmVTZWxlY3QgfSBmcm9tICcuL25vbmUtc2VsZWN0JztcclxuaW1wb3J0IHsgTm9NYXRjaEZvdW5kIH0gZnJvbSAnLi9uby1tYXRjaC1mb3VuZCc7XHJcblxyXG4vLyB0YWJpbmRleCwga2V5ZG93biwga2V5dXAoRU5URVIsIEVTQyksIGNsaWNrXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0LWl0ZW0nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCdpdGVtJykgb2JqZWN0OiBhbnk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuXHJcbiAgbmV4dFNpYmxpbmc6IEhUTUxFbGVtZW50O1xyXG4gIHByZXZTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwYXJlbnRMaXN0Q29tcDogTmd1aUxpc3REaXJlY3RpdmUgfCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfCBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgbGlzdERpcmVjdGl2ZTogTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgdmlydHVhbExpc3RDb21wb25lbnQ6IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBhdXRvY29tcGxldGVDb21wb25lbnQ6IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnRcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAgPSB0aGlzLmxpc3REaXJlY3RpdmUgfHwgdGhpcy52aXJ0dWFsTGlzdENvbXBvbmVudCB8fCB0aGlzLmF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuICAgIGlmICghdGhpcy5wYXJlbnRMaXN0Q29tcCkge1xyXG4gICAgICB0aHJvdyBFcnJvcignbmd1aS1saXN0LWl0ZW0gcmVxdWlyZXMgcGFyZW50IG9mIG5ndWktbGlzdCwgbmd1aS12aXJ0dWFsLWxpc3QsIG9yIG5ndWktYXV0b2NvbXBsZXRlLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vbmVTZWxlY3QpIHx8ICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIE5vTWF0Y2hGb3VuZCkpIHtcclxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLm9iamVjdC5odG1sO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCB1cCwgZG93biwgbGVmdCwgcmlnaHRcclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkga2V5ZG93bihldmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0xpc3RJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICBjb25zdCBwYXJlbnRMaXN0RWwgPSB0aGlzLnBhcmVudExpc3RDb21wLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGxpc3RJdGVtczogQXJyYXk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgID0gQXJyYXkuZnJvbShwYXJlbnRMaXN0RWwucXVlcnlTZWxlY3RvckFsbCgnbmd1aS1saXN0LWl0ZW0nKSk7XHJcbiAgICBjb25zdCBsaXN0SXRlbU5keCA9IGxpc3RJdGVtcy5pbmRleE9mKHRoaXNMaXN0SXRlbSk7XHJcbiAgICBjb25zdCBuZXh0TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggKyAxXSB8fCBsaXN0SXRlbXNbMF07XHJcbiAgICBjb25zdCBwcmV2TGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1OZHggLSAxXSB8fCBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xyXG4gICAgY2FzZSAzNzogY2FzZSAzODogLy8gdXAgYXJyb3csIGxlZnQgYXJyb3dcclxuICAgICAgcHJldkxpc3RJdGVtLmZvY3VzKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOTogY2FzZSA0MDogLy8gZG93biBhcnJvdywgcmlnaHQgYXJyb3dcclxuICAgICAgbmV4dExpc3RJdGVtLmZvY3VzKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBoYW5kbGVzIGtleWJvYXJkIGVudGVyKDEzKSwgZXNjKDI3KVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSkga2V5dXAoZXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRXNjYXBlJzpcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5lc2NhcGVkLmVtaXQoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgbW91c2Vkb3duKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSkgZm9jdXNlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pIGJsdXJyZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlMaXN0SXRlbURpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlJztcclxuaW1wb3J0IHtOZ3VpTGlzdERpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1saXN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7Tmd1aUludmlld1BhZ2VDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpVmlydHVhbExpc3RDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aUludmlld01vZHVsZX0gZnJvbSAnLi4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCwgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLCBOZ3VpTGlzdERpcmVjdGl2ZSwgTmd1aUludmlld1BhZ2VDb21wb25lbnQsIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5ndWlJbnZpZXdNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LFxyXG4gICAgTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUsXHJcbiAgICBOZ3VpVmlydHVhbExpc3RDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCxcclxuICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxyXG4gICAgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ3VpSW52aWV3UGFnZUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0TW9kdWxlIHtcclxufVxyXG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICduZ3VpSGlnaGxpZ2h0JyB9KVxyXG5leHBvcnQgY2xhc3MgTmd1aUhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgcmV0ID0gdGV4dDtcclxuICAgIGlmIChzZWFyY2gpIHtcclxuICAgICAgY29uc3QgcmUgID0gbmV3IFJlZ0V4cChzZWFyY2gsICdpZycpO1xyXG4gICAgICByZXQgPSB0ZXh0LnJlcGxhY2UocmUsIG1hdGNoID0+IGA8c3BhbiBjbGFzcz1cIm5ndWktaGlnaGxpZ2h0XCI+JHttYXRjaH08L3NwYW4+YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIHdpbmRvdy5rb25zb2xlIGFsdGVybmF0aXZlXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYFxyXG4gKiBrb25zb2xlLnNldExvZ0xldmVsKCdlcnJvcicpO1xyXG4gKiBrb253b2xlLmxvZygxLDIsMyw0LDUpO1xyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBrb25zb2xlIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gIC8qKiBhbGwgbG9nIGxldmVscyAqL1xyXG4gIHN0YXRpYyBMT0dfTEVWRUxTID0ge1xyXG4gICAgQUxMOiAgIHBhcnNlSW50KCcwMDAwMCcsIDIpLFxyXG4gICAgREVCVUc6IHBhcnNlSW50KCcwMDAwMScsIDIpLFxyXG4gICAgTE9HOiAgIHBhcnNlSW50KCcwMDAxMCcsIDIpLFxyXG4gICAgSU5GTzogIHBhcnNlSW50KCcwMDEwMCcsIDIpLFxyXG4gICAgV0FSTjogIHBhcnNlSW50KCcwMTAwMCcsIDIpLFxyXG4gICAgRVJST1I6IHBhcnNlSW50KCcxMDAwMCcsIDIpLFxyXG4gICAgTk9ORTogIHBhcnNlSW50KCcxMTExMScsIDIpXHJcbiAgfTtcclxuXHJcbiAgLyoqIGN1cnJlbnQgbG9nIGxldmVsIHNldCBieSBzZXRMb2dMZXZlbCwgZGVmYXVsdCAnSU5GTycgKi9cclxuICBzdGF0aWMgbG9nTGV2ZWwgPSAnSU5GTyc7XHJcblxyXG4gIC8qKiByZXR1cm5zIGlmIGl0IHNob3VsZCBjYWxsIGB3aW5kb3cuY29uc29sZWAgb3Igbm90ICovXHJcbiAgc3RhdGljIHRvTG9nKHBhcmFtKTogYm9vbGVhbiB7IC8vIHJldHVybnMgdG8gbG9nIG9yIG5vdFxyXG4gICAgY29uc3QgcmVzdHJpY3Rpb25OdW0gPSB0aGlzLkxPR19MRVZFTFNbdGhpcy5sb2dMZXZlbF07XHJcbiAgICBjb25zdCByZXF1aXJlZE51bSA9IHRoaXMuTE9HX0xFVkVMU1twYXJhbV07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmVkTnVtID4gcmVzdHJpY3Rpb25OdW07XHJcbiAgfVxyXG5cclxuICAvKiogc2V0cyB0aGUgY3VycmVudCBsb2cgbGV2ZWwgKi9cclxuICBzdGF0aWMgc2V0TG9nTGV2ZWwobG9nTGV2ZWw6IHN0cmluZyk6IGFueSB7XHJcbiAgICBsb2dMZXZlbCA9IGxvZ0xldmVsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBsb2dMZXZlbHMgPSBPYmplY3Qua2V5cyh0aGlzLkxPR19MRVZFTFMpO1xyXG4gICAgaWYgKGxvZ0xldmVscy5pbmRleE9mKGxvZ0xldmVsKSA+IC0xKSB7XHJcbiAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnNlc3Npb25TdG9yYWdlKSB7IC8vIGZvciBicm93c2VyIGVudi5cclxuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgna29uc29sZS5MT0dfTEVWRUwnLCBsb2dMZXZlbCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IsIGludmFsaWQgbG9nTGV2ZWwsIGl0IG11c3QgYmUgb25lIG9mICR7bG9nTGV2ZWxzfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmRlYnVnKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGRlYnVnYCAqL1xyXG4gIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnREVCVUcnKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5sb2coKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgbG9nYCAqL1xyXG4gIHN0YXRpYyBsb2coLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0xPRycpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuaW5mbygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBpbmZvYCAqL1xyXG4gIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdJTkZPJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS53YXJuKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYHdhcm5gICovXHJcbiAgc3RhdGljIHdhcm4oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ1dBUk4nKSkge1xyXG4gICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5lcnJvcigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBlcnJvcmAgKi9cclxuICBzdGF0aWMgZXJyb3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0VSUk9SJykpIHtcclxuICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnYWxsJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ3llcycpO1xyXG4vLyBrb25zb2xlLmxvZygneWVzJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnbm9uZScpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ25vJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdpbmZvJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ1dBUk4nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdFUlJPUicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05ndWlIaWdobGlnaHRQaXBlfSBmcm9tICcuL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlJztcclxuaW1wb3J0IHtEeW5hbWljQ29tcG9uZW50U2VydmljZX0gZnJvbSAnLi9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGtvbnNvbGUgfSBmcm9tICcuL3NyYy9rb25zb2xlJztcclxuaW1wb3J0IHsgZmlyZUV2ZW50IH0gZnJvbSAnLi9zcmMvZmlyZS1ldmVudCc7XHJcblxyXG5leHBvcnQge0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlLCBOZ3VpSGlnaGxpZ2h0UGlwZSwga29uc29sZSwgZmlyZUV2ZW50fTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3VpSGlnaGxpZ2h0UGlwZV0sXHJcbiAgZXhwb3J0czogW05ndWlIaWdobGlnaHRQaXBlXSxcclxuICBwcm92aWRlcnM6IFtEeW5hbWljQ29tcG9uZW50U2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlVdGlsc01vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd1aUludmlld01vZHVsZX0gZnJvbSAnLi9uZ3VpLWludmlldy9uZ3VpLWludmlldy5tb2R1bGUnO1xyXG5pbXBvcnQge05ndWlMaXN0TW9kdWxlfSBmcm9tICcuL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlJztcclxuaW1wb3J0IHtOZ3VpVXRpbHNNb2R1bGV9IGZyb20gJy4vbmd1aS11dGlscy9uZ3VpLXV0aWxzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE5ndWlJbnZpZXdNb2R1bGUsXHJcbiAgICBOZ3VpTGlzdE1vZHVsZSxcclxuICAgIE5ndWlVdGlsc01vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmd1aUludmlld01vZHVsZSxcclxuICAgIE5ndWlMaXN0TW9kdWxlLFxyXG4gICAgTmd1aVV0aWxzTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUNvbW1vbk1vZHVsZSB7XHJcbn1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztJQXdERSw2QkFDYyxTQUNxQixVQUFlO1FBRHBDLFlBQU8sR0FBUCxPQUFPO1FBQ2MsZUFBVSxHQUFWLFVBQVUsQ0FBSzs7OzsrQkFwQkcsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7Ozs7OzsyQkFPM0UsSUFBSTtzQkFFVyxJQUFJLFlBQVksRUFBRTt5QkFDZixJQUFJLFlBQVksRUFBRTs7Ozt3QkFJaEQsS0FBSzs7OztnQ0FFRyxLQUFLO0tBS3ZCOzs7Ozs7SUFHRCxzQ0FBUTs7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDtLQUNGOzs7Ozs7SUFHRCx5Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7OztJQUdELDZDQUFlOzs7OztJQUFmLFVBQWdCLE9BQU87UUFBdkIsaUJBVUM7UUFUQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0M7WUFDL0MsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7Ozs7SUFNRCxrREFBb0I7Ozs7OztJQUFwQixVQUFxQixLQUFLO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDOUUsT0FBTztTQUNSO1FBRUQsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxFQUFFO1lBQ2pDLHFCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELHFCQUFNLE1BQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELHFCQUFNLE1BQU0sR0FBRyxVQUFRLE1BQUksUUFBSyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQyxPQUFPLFNBQUEsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUVwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0tBQ0Y7O2dCQXRGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSw0R0FHUDtvQkFDSCxNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDcEM7Ozs7Z0JBN0JHLFVBQVU7Z0RBdURMLE1BQU0sU0FBQyxXQUFXOzs7MkJBdkJ4QixZQUFZLFNBQUMsV0FBVztrQ0FHeEIsS0FBSzswQkFHTCxLQUFLOzhCQUlMLEtBQUs7eUJBRUwsTUFBTTs0QkFDTixNQUFNOzs4QkFoRFQ7Ozs7Ozs7QUNBQTs7OztJQWlDRSw2QkFDYSxTQUNzQixVQUFlO1FBRHJDLFlBQU8sR0FBUCxPQUFPO1FBQ2UsZUFBVSxHQUFWLFVBQVUsQ0FBSzs7OzsrQkFaRyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQzs7OzswQkFNeEQsSUFBSSxZQUFZLEVBQUU7Ozs7MkJBRWpCLElBQUksWUFBWSxFQUFFO0tBSzVEOzs7Ozs7SUFHRCxzQ0FBUTs7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDtLQUNGOzs7Ozs7SUFHRCx5Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0tBQ0Y7Ozs7Ozs7Ozs7O0lBTUQsNkNBQWU7Ozs7OztJQUFmLFVBQWdCLE9BQU87UUFBdkIsaUJBUUM7UUFQQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0M7WUFDL0MsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Z0JBckRGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2lCQUMxQzs7OztnQkFoQkcsVUFBVTtnREFpQ0wsTUFBTSxTQUFDLFdBQVc7OztrQ0FaeEIsS0FBSzswQkFHTCxLQUFLOzZCQUdMLE1BQU07OEJBRU4sTUFBTTs7OEJBL0JUOzs7Ozs7O0FDQUE7Ozs7Z0JBT0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3FCQUNwQjtpQkFDRjs7MkJBbkJEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ01BLG1CQUEwQixFQUFlLEVBQUUsSUFBWSxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7SUFDeEUscUJBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM3QixLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzFDO1NBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQy9CLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7SUFFRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEM7Ozs7OztBQ1FEOzs7O0lBbUJFLGlDQUE4QyxlQUFlO1FBQzNELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0tBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUQsaURBQWU7Ozs7Ozs7OztJQUFmLFVBQWdCLFNBQWMsRUFBRSxJQUF1QjtRQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4RSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzlEOzs7Ozs7Ozs7SUFLRCxpREFBZTs7Ozs7SUFBZixVQUFnQixZQUErQjtRQUM3QyxxQkFBTSxNQUFNLEdBQUcsZUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxTQUFBLEVBQUUsRUFBSSxDQUFDLENBQUEsQ0FBQyxHQUFHLFNBQUEsRUFBRSxFQUFJLENBQUMsQ0FBQSxDQUFFLENBQUM7UUFDM0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRCxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckQsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0tBQzlCOztnQkFuQ0YsVUFBVTs7OztnREFPSSxNQUFNLFNBQUMsd0JBQXdCOztrQ0E1QzlDOzs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMEVFLGlDQUNVLFNBQ0EsVUFDQTtRQUZBLFlBQU8sR0FBUCxPQUFPO1FBQ1AsYUFBUSxHQUFSLFFBQVE7UUFDUixVQUFLLEdBQUwsS0FBSzs7Ozt1QkFiTCxLQUFLOzs7OzJCQUVXLEVBQUU7S0FZdkI7Ozs7Ozs7O0lBS0wsOENBQVk7Ozs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO0tBQ0Y7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVTtZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3JFOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3ZCOzs7Ozs7OztJQUtELDRDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7O1lBRWxELHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBSyxNQUFNLE9BQUksQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7S0FDRjs7Ozs7SUFFRCwwQ0FBUTs7OztJQUFSLFVBQVMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO0tBQ0Y7O2dCQW5HRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLG1yQkFpQlQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsa0NBRVIsQ0FBQztpQkFDSDs7OztnQkEvQ0MsVUFBVTtnQkFJVixTQUFTO2dCQVBULGlCQUFpQjs7OzJCQXNEaEIsWUFBWSxTQUFDLFdBQVc7d0JBSXhCLEtBQUs7O2tDQTNEUjs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4RkUsa0NBQ1MsVUFDQSxTQUNBLHlCQUNBO1FBSEEsYUFBUSxHQUFSLFFBQVE7UUFDUixZQUFPLEdBQVAsT0FBTztRQUNQLDRCQUF1QixHQUF2Qix1QkFBdUI7UUFDdkIsUUFBRyxHQUFILEdBQUc7Ozs7d0JBbEM0QixJQUFJLFlBQVksRUFBRTs7Ozt1QkFFbkIsSUFBSSxZQUFZLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFtQmIsSUFBSSxZQUFZLEVBQUU7d0JBSW5ELEtBQUs7MkJBRzRDLEVBQUU7S0FPMUQ7Ozs7OztJQUdKLGtEQUFlOzs7O0lBQWY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN6RCxPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDN0U7S0FDRjs7Ozs7Ozs7Ozs7O0lBT0QseURBQXNCOzs7Ozs7SUFBdEI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUUxQixJQUFJLENBQUMsVUFBVTtnQkFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQztTQUN0RTtLQUNGOzs7Ozs7SUFHRCwwQ0FBTzs7OztJQUFQLFVBQVEsS0FBaUI7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxQzs7Z0JBOUZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUseVVBU1Q7b0JBQ0QsTUFBTSxFQUFFLENBQUMsa0NBRVIsQ0FBQztpQkFDSDs7OztnQkEvQ0MsU0FBUztnQkFIVCxVQUFVO2dCQVNILHVCQUF1QjtnQkFiOUIsaUJBQWlCOzs7MkJBMERoQixTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDOzJCQUUzQyxZQUFZLFNBQUMsV0FBVzsyQkFFeEIsTUFBTTswQkFFTixNQUFNOytCQW1CTixNQUFNOzttQ0FyRlQ7Ozs7Ozs7QUNBQSxJQUFBOztvQkFDUyxnQkFBZ0I7O3VCQUR6QjtJQUVDLENBQUE7Ozs7OztBQ0ZELElBQUE7O29CQUNTLFFBQVE7O3FCQURqQjtJQUVDLENBQUE7Ozs7Ozs7SUN5QjhDQSw2Q0FBd0I7Ozs4QkFFNUMsQ0FBQzs0QkFDSCxZQUFZOzRCQUNaLGdCQUFnQjt5QkFNdkIsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7OztJQWdCL0Msc0JBQUksOENBQU87Ozs7Ozs7Ozs7Ozs7Ozs7UUFBWDtZQUNFLHFCQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDMUUscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQzlELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUVqRSxRQUFRLENBQUMsaUJBQWlCLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtTQUNwRDs7O09BQUE7Ozs7SUFFRCw0Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxxQkFBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDekUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsOENBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFDZCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hFOzs7O0lBRUQsNkNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELENBQUMsQ0FBQztLQUNoRTs7Ozs7SUFFRCxvREFBZ0I7Ozs7SUFBaEIsVUFBaUIsS0FBSztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFBRTtZQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoQzs7OztJQUVELG9EQUFnQjs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDakM7Ozs7SUFFRCw2Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDOUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ25CLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELGtEQUFjOzs7O0lBQWQsVUFBZSxLQUFvQjtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3RSxxQkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0UsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNuRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7U0FDRjthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDakYsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ25CO2FBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUVoRTthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCO0tBQ0Y7Ozs7OztJQUdELHVEQUFtQjs7OztJQUFuQjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQy9CLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDtLQUNGOzs7Ozs7SUFHRCxnREFBWTs7OztJQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtLQUNGOzs7Ozs7SUFFRCw4Q0FBVTs7Ozs7SUFBVixVQUFXLE1BQTRCLEVBQUUsR0FBWTtRQUFyRCxpQkFXQztRQVZDLElBQUksR0FBRyxFQUFFO1lBQ1AsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDOUI7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUM1QixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDOUIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7S0FDRjs7OztJQUVELDREQUF3Qjs7O0lBQXhCO1FBQ0UscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzFDLHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQscUJBQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXhFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUssY0FBYyxDQUFDLElBQUksT0FBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBSyxHQUFHLE9BQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUssY0FBYyxDQUFDLEtBQUssT0FBSSxDQUFDLENBQUM7S0FDekU7Ozs7OztJQUdELDJDQUFPOzs7O0lBQVAsVUFBUSxLQUFpQjtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7O1FBRzNCLHFCQUFJLFdBQWdCLENBQUM7UUFDckIscUJBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTs7Z0JBQ3RELFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNqQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDbkM7aUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMzQixTQUFTLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDN0IsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ25DO1NBQ0Y7UUFFRCxxQkFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDMUI7O2dCQXZMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLG9LQUtUO29CQUNELE1BQU0sRUFBRSxDQUFDLGtLQUdSLENBQUM7aUJBQ0g7OztzQkFFRSxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUdMLFlBQVksU0FBQyxXQUFXOztvQ0FsQzNCO0VBMkIrQyx3QkFBd0I7Ozs7OztBQzNCdkU7SUFnQkUsMkJBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7Ozs7d0JBSkUsSUFBSSxZQUFZLEVBQUU7Ozs7dUJBRW5CLElBQUksWUFBWSxFQUFFO0tBRWQ7O2dCQVQ1QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzs7O2dCQVBDLFVBQVU7OzsyQkFVVCxNQUFNOzBCQUVOLE1BQU07OzRCQWRUOzs7Ozs7O0FDQUE7SUE2QkUsK0JBQ1UsSUFDQSxVQUNBLGVBQ29CLGFBQWdDLEVBQ2hDLG9CQUE4QyxFQUM5QyxxQkFBZ0Q7UUFMcEUsT0FBRSxHQUFGLEVBQUU7UUFDRixhQUFRLEdBQVIsUUFBUTtRQUNSLGtCQUFhLEdBQWIsYUFBYTtRQUNPLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTBCO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMkI7S0FDekU7Ozs7SUFFTCx3Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsTUFBTSxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQztTQUN0RztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLFVBQVUsTUFBTSxJQUFJLENBQUMsTUFBTSxZQUFZLFlBQVksQ0FBQyxFQUFFO1lBQ2hGLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3BEO0tBQ0Y7Ozs7OztJQUdvQyx1Q0FBTzs7OztJQUE1QyxVQUE2QyxLQUFLO1FBQ2hELHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxxQkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzdDLHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDL0QscUJBQU0sU0FBUyxHQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNoRSxxQkFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxxQkFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUscUJBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkYsUUFBUSxPQUFPO1lBQ2YsS0FBSyxFQUFFLENBQUM7WUFBQyxLQUFLLEVBQUU7O2dCQUNkLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTTtZQUNSLEtBQUssRUFBRSxDQUFDO1lBQUMsS0FBSyxFQUFFOztnQkFDZCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1A7S0FDRjs7Ozs7O0lBR2tDLHFDQUFLOzs7O0lBQXhDLFVBQXlDLEtBQUs7UUFDNUMsUUFBUSxLQUFLLENBQUMsR0FBRztZQUNqQixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDUDtLQUNGOzs7O0lBRWtDLHlDQUFTOzs7SUFBNUM7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRWtDLHVDQUFPOzs7SUFBMUM7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7S0FDRjs7OztJQUVpQyx1Q0FBTzs7O0lBQXpDO1FBQ0UsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7O2dCQWxGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBbkJDLFVBQVU7Z0JBTVYsU0FBUztnQkFDVCxnQkFBZ0I7Z0JBR1QsaUJBQWlCLHVCQXFCckIsUUFBUSxZQUFJLElBQUk7Z0JBcEJaLHdCQUF3Qix1QkFxQjVCLFFBQVEsWUFBSSxJQUFJO2dCQXBCWix5QkFBeUIsdUJBcUI3QixRQUFRLFlBQUksSUFBSTs7O3lCQVpsQixLQUFLLFNBQUMsTUFBTTswQkE0QlosWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkF1QmxDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBYWhDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBSWhDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBTWhDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQWpHbEM7Ozs7Ozs7QUNBQTs7OztnQkFXQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oseUJBQXlCO3dCQUN6Qix1QkFBdUI7d0JBQ3ZCLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLHdCQUF3QjtxQkFDekI7b0JBQ0QsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQzNDOzt5QkEvQkQ7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFJRSxxQ0FBUzs7Ozs7SUFBVCxVQUFVLElBQVksRUFBRSxNQUFjO1FBQ3BDLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLE1BQU0sRUFBRTtZQUNWLHFCQUFNLEVBQUUsR0FBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsb0NBQWdDLEtBQUssWUFBUyxHQUFBLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sR0FBRyxDQUFDO0tBQ1o7O2dCQVZGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUU7OzRCQUYvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3dCUyxhQUFLOzs7OztJQUFaLFVBQWEsS0FBSzs7UUFDaEIscUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELHFCQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLE9BQU8sV0FBVyxHQUFHLGNBQWMsQ0FBQztLQUNyQzs7Ozs7OztJQUdNLG1CQUFXOzs7OztJQUFsQixVQUFtQixRQUFnQjtRQUNqQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLHFCQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTs7Z0JBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQThDLFNBQVcsQ0FBQyxDQUFDO1NBQzFFO0tBQ0Y7Ozs7Ozs7SUFHTSxhQUFLOzs7OztJQUFaO1FBQWEsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFOztZQUVyQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDM0M7S0FDRjs7Ozs7OztJQUdNLFdBQUc7Ozs7O0lBQVY7UUFBVyxjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7Ozs7Ozs7SUFHTSxZQUFJOzs7OztJQUFYO1FBQVksY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztZQUVwQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDMUM7S0FDRjs7Ozs7OztJQUdNLFlBQUk7Ozs7O0lBQVg7UUFBWSxjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0Y7Ozs7Ozs7SUFHTSxhQUFLOzs7OztJQUFaO1FBQWEsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN6QztLQUNGOzs7O3lCQXRFbUI7UUFDbEIsR0FBRyxFQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQixHQUFHLEVBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxFQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksRUFBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxFQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQzVCOzs7O3VCQUdpQixNQUFNO2tCQXJCMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztnQkFTQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM1QixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDckM7OzBCQWhCRDs7Ozs7OztBQ0FBOzs7O2dCQUtDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsZUFBZTtxQkFDaEI7aUJBQ0Y7OzJCQWhCRDs7Ozs7Ozs7Ozs7Ozs7OyJ9