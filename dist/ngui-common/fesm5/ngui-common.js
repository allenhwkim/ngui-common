import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef, Directive, NgModule, ComponentFactoryResolver, Injectable, ChangeDetectorRef, Renderer2, ViewChild, ViewContainerRef, Host, HostListener, Optional, Pipe } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { __extends } from 'tslib';
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
            /** @type {?} */
            var opacity = entry.intersectionRatio * (1 / 0.8);
            /** @type {?} */
            var blur_1 = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            /** @type {?} */
            var filter = "blur(" + blur_1 + "px)";
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
                }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
    ];
    return NguiInviewModule;
}());

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
function fireEvent(el, type, options) {
    if (options === void 0) { options = {}; }
    /** @type {?} */
    var event;
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
        /** @type {?} */
        var factory = this.factoryResolver.resolveComponentFactory(component);
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
        /** @type {?} */
        var compId = "ngui-dyn-" + (Math.floor(Math.random() * Math.pow(10, 7)) + Math.pow(10, 6));
        componentRef.location.nativeElement.setAttribute('id', compId);
        componentRef.instance.id = compId;
        this.rootViewContainer.insert(componentRef.hostView);
        return componentRef.instance;
    };
    DynamicComponentService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
    ]; };
    return DynamicComponentService;
}());

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
            /** @type {?} */
            var height = this.element.nativeElement.getBoundingClientRect().height;
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
                }] }
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
    // set items of NguiInviewPageComponent
    /**
     * @param {?} items
     * @return {?}
     */
    NguiVirtualListComponent.prototype.addList = 
    // set items of NguiInviewPageComponent
    /**
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
                }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NoMatchFound = /** @class */ (function () {
    function NoMatchFound() {
        this.html = 'No Match Found';
    }
    return NoMatchFound;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NoneSelect = /** @class */ (function () {
    function NoneSelect() {
        this.html = 'Select';
    }
    return NoneSelect;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NguiAutocompleteComponent = /** @class */ (function (_super) {
    __extends(NguiAutocompleteComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// tabindex, keydown, keyup(ENTER, ESC), click
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
    // handles keyboard up, down, left, right
    /**
     * @param {?} event
     * @return {?}
     */
    NguiListItemDirective.prototype.keydown = 
    // handles keyboard up, down, left, right
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var thisListItem = this.el.nativeElement;
        /** @type {?} */
        var keyCode = event.which || event.keyCode;
        /** @type {?} */
        var parentListEl = this.parentListComp.element.nativeElement;
        /** @type {?} */
        var listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        /** @type {?} */
        var listItemNdx = listItems.indexOf(thisListItem);
        /** @type {?} */
        var nextListItem = listItems[listItemNdx + 1] || listItems[0];
        /** @type {?} */
        var prevListItem = listItems[listItemNdx - 1] || listItems[listItems.length - 1];
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
    };
    // handles keyboard enter(13), esc(27)
    // handles keyboard enter(13), esc(27)
    /**
     * @param {?} event
     * @return {?}
     */
    NguiListItemDirective.prototype.keyup = 
    // handles keyboard enter(13), esc(27)
    /**
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
                },] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
    ];
    return NguiListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
        /** @type {?} */
        var ret = text;
        if (search) {
            /** @type {?} */
            var re = new RegExp(search, 'ig');
            ret = text.replace(re, function (match) { return "<span class=\"ngui-highlight\">" + match + "</span>"; });
        }
        return ret;
    };
    NguiHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'nguiHighlight' },] }
    ];
    return NguiHighlightPipe;
}());

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
        /** @type {?} */
        var restrictionNum = this.LOG_LEVELS[this.logLevel];
        /** @type {?} */
        var requiredNum = this.LOG_LEVELS[param];
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
        /** @type {?} */
        var logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) { // for browser env.
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
    return konsole;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
    ];
    return NguiUtilsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                },] }
    ];
    return NguiCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent, NguiListModule, DynamicComponentService, NguiHighlightPipe, konsole, fireEvent, NguiUtilsModule, NguiCommonModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24uanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1pbnZpZXcvc3JjL25ndWktaW52aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25vLW1hdGNoLWZvdW5kLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbm9uZS1zZWxlY3QudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9uZ3VpLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMva29uc29sZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBBbiBlbGVtZW50IHRoYXQgbGlzdGVucyB0byB2aWV3cG9ydCBwb3NpdGlvbmluZyBhbmQgZmlyZXMgaW5WaWV3IGFuZCBub3RJbnZpZXcgZXZlbnRzXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIDxuZ3VpLWluLXZpZXcgW29ic2VydmVyT3B0aW9uc109XCJteU9ic2VydmVyT3B0aW9uc1wiIChpblZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW4tdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25ndWktaW52aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ludmlld1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBgLFxyXG4gIHN0eWxlczogWyc6aG9zdCB7ZGlzcGxheTogYmxvY2s7fSddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIDxuZy10ZW1wbGF0ZT4gcmVmZXJlbmNlICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIENvbnRyb2xzIHdoZXRoZXIgYmx1ciBlZmZlY3QgaXMgYXBwbGllZCB0byBhIGNvbXBvbmVudCB3aXRoIGxlc3MgdGhhbiA4MCUgaW50ZXJzZWN0aW9uIHJhdGlvLlxyXG4gICAqIE9ubHkgYXBwbGllcyB3aGVuIHRoZXJlIGFyZSBubyBcImludmlld1wiIGV2ZW50IGhhbmRsZXJzIGRlZmluZWQuXHJcbiAgICoqL1xyXG4gIEBJbnB1dCgpIGJsdXJFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCAqL1xyXG4gIGlzSW52aWV3ID0gZmFsc2U7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIDgwJSBpbiB2aWV3cG9ydC4gVXNlZCBieSB0aGUgZGVmYXVsdCBjYWxsYmFjayAqL1xyXG4gIG9uY2U4MFBjdFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBzdG9wIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9XHJcblxyXG4gICAgLyoqIGZpcmVzIChpbnZpZXcpIGFuZCAobm90SW52aWV3KSBldmVudHMgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB2aXNpYmxlIG9yIG5vdCB2aXNpYmxlICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMuaXNJbnZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpO1xyXG4gICAgICAgIHRoaXMuaW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubm90SW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IGludGVyc2VjdGlvbiBoYW5kbGVyLCB3aGljaCBzZXRzIGJsdXIgZGVwZW5kZXMgb24gaW50ZXJzZWN0aW9uIHJhdGlvXHJcbiAgICAgKiB0aGlzIHdvbid0IGJlIGludm9rZWQgaWYgdXNlciBwcm92aWRlcyBhbnkgKGludmlldykgZXZlbnQuIGUuZy4gKGludmlldyk9XCJzb21ldGhpbmcoKVwiXHJcbiAgICAgKi9cclxuICBkZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuYmx1ckVuYWJsZWQgfHwgdGhpcy5vbmNlODBQY3RWaXNpYmxlIHx8IHRoaXMuaW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA8IDAuOCkge1xyXG4gICAgICBjb25zdCBvcGFjaXR5ID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAoMSAvIDAuOCk7XHJcbiAgICAgIGNvbnN0IGJsdXIgPSAyMCAtIE1hdGguZmxvb3IoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAxMCkgKiA0O1xyXG4gICAgICBjb25zdCBmaWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgT2JqZWN0LmFzc2lnbihlbnRyeS50YXJnZXQuc3R5bGUsIHtvcGFjaXR5LCBmaWx0ZXJ9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLmZpbHRlciA9ICd1bnNldCc7XHJcblxyXG4gICAgICB0aGlzLm9uY2U4MFBjdFZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSURcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBGaXJlcyAobmd1aUludmlldykgb3IgKG5ndWlPdXR2aWV3KSBldmVudHMgZGVwZW5kZW50cyBvbiB0aGUgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCBvciBub3RcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd1aUludmlld10sIFtuZ3VpT3V0dmlld10nIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG5cclxuICAgIC8qKiBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb25zICovXHJcbiAgQElucHV0KCkgb2JzZXJ2ZXJPcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7dGhyZXNob2xkOiBbLjEsIC4yLCAuMywgLjQsIC41LCAuNiwgLjcsIC44XX07XHJcbiAgICAvKiogRGVwcmVjYXRlZCBjb25maWcuIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBpbiB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpSW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAvKiogRXZlbnQgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gb3V0IG9mICB2aWV3cG9ydCAqL1xyXG4gIEBPdXRwdXQoKSBuZ3VpT3V0dmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xyXG4gIH1cclxuXHJcbiAgICAvKiogU3RhcnRzIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5oYW5kbGVJbnRlcnNlY3QuYmluZCh0aGlzKSwgdGhpcy5vYnNlcnZlck9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICAvKiogU3RvcHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMub2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgKG5ndWlJbnZpZXcpIGV2ZW50IHdoZW4gdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0XHJcbiAgICAgKiAgYW5kIGZpcmVzIChuZ3VpT3V0dmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgbm90IGluIHZpZXdwb3J0XHJcbiAgICAgKi9cclxuICBoYW5kbGVJbnRlcnNlY3QoZW50cmllcyk6IHZvaWQge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoZW50cnlbJ2lzSW50ZXJzZWN0aW5nJ10pIHtcclxuICAgICAgICB0aGlzLm5ndWlJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZ3VpT3V0dmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpSW52aWV3Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdEaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQge05ndWlJbnZpZXdDb21wb25lbnQsIE5ndWlJbnZpZXdEaXJlY3RpdmV9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmd1aUludmlld0NvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlJbnZpZXdDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3RGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld01vZHVsZSB7XHJcbn1cclxuIiwiLyoqXHJcbiAqIGZpcmUgdGhlIGdpdmVuIGV2ZW50IHdpdGggb3B0aW9ucyBvbiB0aGUgZWxlbWVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBmaXJlRXZlbnQoZWwsICdjbGljaycpO1xyXG4gKiBmaXJlRXZlbnQoZWwsICdrZXlwcmVzcycsIHtrZXk6ICdFbnRlcid9KTtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogYm9vbGVhbiB7XHJcbiAgbGV0IGV2ZW50O1xyXG4gIGlmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUubWF0Y2goL15tb3VzZS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBNb3VzZUV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXmtleS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXnRvdWNoLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IFRvdWNoRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEluc2VydCBhIGNvbXBvbmVudCBkeW5hbWljYWxseSB1c2luZyBhIHNlcnZpY2VcclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHNcclxuICogaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL2R5bmFtaWMuY29tcG9uZW50LnNlcnZpY2UnO1xyXG4gKiBpbXBvcnQgeyBNeUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL215LTEuY29tcG9uZW50JztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgdGVtcGxhdGU6IGAgLi4uIDxkaXYgI2R5bWFtaWM+PC9kaXY+YFxyXG4gKiB9KVxyXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xyXG4gKiAgIEBWaWV3Q2hpbGQoJ2R5bmFtaWMnLCB7cmVhZDpWaWV3Q29udGFpbmVyUmVmfSkgdmNyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gKlxyXG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkY3M6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlKSB7fVxyXG4gKlxyXG4gKiAgIGluc2VydENvbXAoKSB7XHJcbiAqICAgICBsZXQgY29tcFJlZiA9IHRoaXMuZGNzLmNyZWF0ZUNvbXBvbmVudChNeUR5bmFtaWNDb21wb25lbnQsIHRoaXMudmNyKTtcclxuICogICAgIHRocy5kY3MuaW5zZXJ0Q29tb25lbnQoY21wUmVmKTtcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2UuaXRlbXMgPSBbMSwyLDNdOyAgICAgICAgICAgICAgLy8gZGVhbGluZyB3aXRoIEBpbnB1dFxyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5vdXRwdXQkLnN1YnNjcmliZSh2YWwgPT4ge30pOyAvLyBkZWFsaW5nIHdpdGggQG91dHB1dFxyXG4gKiAgIH1cclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGFibGUsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc2VydmljZSB0byBhZGQgb3IgcmVtb3ZlIGNvbXBvbmVudCBkeW5hbWljYWxseVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudFNlcnZpY2Uge1xyXG4gIC8qKiB1c2VkIHRvIGNyZWF0ZSBhIGZhY3RvcnkgZnJvbSBhIGNvbXBvbmVudCBjbGFzcyAqL1xyXG4gIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xyXG4gIC8qKiBkZWZpbmVzIHdoZXJlIGEgZHluYW1pYyBjb21wb25lbnRzIGluc2VydCBpbnRvICovXHJcbiAgcm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBmYWN0b3J5UmVzb2x2ZXIpIHtcclxuICAgIHRoaXMuZmFjdG9yeVJlc29sdmVyID0gZmFjdG9yeVJlc29sdmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBjb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICogVGhlIHJlYXNvbiB0byBzZXBlcmF0ZSBgY3JlYXRlQ29tcG5lbnRgIGFuZCBgaW5zZXJ0Q29tcG9uZW50YCBpc1xyXG4gICAqIHRvIGFsbG93IHNvbWUgYWN0aW9ucyBiZWZvcmUgd2UgaW5zZXJ0IGludG8gYSBob3N0Vmlldy5cclxuICAgKiBlLmcgc3R5bGluZywgc2V0dGluZyBhdHRyaWJ1dGVzLCBldGNcclxuICAgKi9cclxuICBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGludG8/OiBWaWV3Q29udGFpbmVyUmVmKTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lciA9IGludG8gfHwgdGhpcy5yb290Vmlld0NvbnRhaW5lcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG5cclxuICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZSh0aGlzLnJvb3RWaWV3Q29udGFpbmVyLnBhcmVudEluamVjdG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGluc2VydCBjb21wb25lbnRcclxuICAgKi9cclxuICBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IENvbXBvbmVudCB7XHJcbiAgICBjb25zdCBjb21wSWQgPSBgbmd1aS1keW4tJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCAqKiA3KSArIDEwICoqIDZ9YDtcclxuICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBjb21wSWQpO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmlkID0gY29tcElkO1xyXG5cclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQSBibG9jayBvZiBjb21wb25lbnQgdGhhdCBsaXN0ZW5zIHRvIGluVmlldyBhbmQgb3V0VmlldyBldmVudHMsXHJcbiAqIHNvIHRoYXQgaXQgZW1wdGllcyBjb250ZW50cyB3aGVuIG91dCBvZiB2aWV3IGFmdGVyIGJhY2t1cCBpdGVtc1xyXG4gKiBhbmQgcmVzdG9yZXMgdGhlIGNvbnRlbnRzIHdoZW4gaW4gdmlld1xyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbnZpZXctcGFnZSBbaXRlbXNdPVwiaXRlbXNcIj5cclxuICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICogICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAqICAgICA8L2Rpdj5cclxuICogICA8L25nLXRlbXBsYXRlPlxyXG4gKiA8L25ndWktaW52aWV3LXBhZ2U+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldy1wYWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImludmlldy1wYWdlIGNvbnRlbnRzXCJcclxuICAgICAgKG5ndWlJbnZpZXcpPVwicmVzdG9yZUl0ZW1zKClcIlxyXG4gICAgICAobmd1aU91dHZpZXcpPVwiZW1wdHlJdGVtcygpXCI+XHJcbiAgICAgIDwhLS0gYWRkIGJsYW5rIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAgLS0+XHJcbiAgICAgIDwhLS0gbm8gbWF0Y2ggZm91bmQgbmd1aS1saXN0LWl0ZW0gYnkgY29uZGl0aW9uIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGV8fGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntpdGVtczogaXRlbXMsIG91dFZpZXc6IG91dFZpZXd9XCI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwib3V0Vmlld1wiPnt7IGl0ZW1zQmFja3VwLmxlbmd0aCB9fSBpdGVtcyBoaWRkZW48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWl0ZW1zXCI+IEVycm9yOiByZXF1aXJlcyBbaXRlbXNdIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXRlbXBsYXRlXCI+IEVycm9yOiByZXF1aXJlcyAmbHQ7bmctdGVtcGxhdGU+PC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge2Rpc3BsYXk6IGJsb2NrfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgY29udGVudHMgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvLyBASW5wdXQoJ3RlbXBsYXRlJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgYXJlIHVzZWQgdG8gcmVuZGVyIHRoaXMgZWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xyXG5cclxuICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICAvKiogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugb2Ygb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgb3V0VmlldyA9IGZhbHNlO1xyXG4gIC8qKiBUaGUgY29weSBvZiBpdGVtcy4gVGhpcyBpcyBzZXQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgb3V0IG9mIHZpZXdwb3J0ICovXHJcbiAgaXRlbXNCYWNrdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cclxuICAgKiBUaGUgaGVpZ2h0IG9mIGl0IHJlbWFpbnMgdGhlIHNhbWUgZXZlbiB3aGVuIGl0ZW1zIGdldCBlbXB0eSBvdXQuXHJcbiAgICovXHJcbiAgY29udGVudHNFbDogSFRNTEVsZW1lbnQ7XHJcbiAgZGVzdHJveWVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSBpdGVtcyB3aGVuIGluIHZpZXdwb3J0LCBzbyB0aGF0IGVsZW1lbnRzIGFyZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm91dFZpZXcpIHtcclxuICAgICAgdGhpcy5vdXRWaWV3ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXNCYWNrdXAgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudHNFbCwgJ2hlaWdodCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRlbnRzRWwgPVxyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW52aWV3LXBhZ2UuY29udGVudHMnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlJbnZpZXdQYWdlQ29tcG9uZW50Lm5nT25EZXN0cm95KCkgaXMgY2FsbGVkJyk7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbXB0eSBpdGVtcyB3aGVuIG5vdCBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgbm90IHJlbmRlcmVkXHJcbiAgICovXHJcbiAgZW1wdHlJdGVtcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuY29udGVudHNFbCAmJiAhdGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIC8vIHNldCBoZWlnaHQgYmVmb3JlIGVtcHR5aW5nIGNvbnRlbnRzXHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcclxuXHJcbiAgICAgIHRoaXMub3V0VmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXRlbXNCYWNrdXAgPSBBcnJheS5mcm9tKHRoaXMuaXRlbXMgfHwgW10pO1xyXG4gICAgICB0aGlzLml0ZW1zID0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5zZXRJdGVtcygpIGlzIGNhbGxlZCB3aXRoJywgaXRlbXMpO1xyXG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogVmlydHVhbCBMaXN0XHJcbiAqXHJcbiAqIFRoZSBgPG5ndWktaW52aWV3IC4uPmAgaW5zZXJ0cyA8bmd1aS1pbnZpZXctcGFnZT4gaW50b1xyXG4gKiBgPGRpdiAjcGFnZXM+YCB3aGVuIGl0IGlzIGluIHZpZXdwb3J0XHJcbiAqIFdoZW4gaXQncyBpbnNlcnRlZCwgaXQgd2lsbCBiZSBwdXNoZWQgZG93biwgd2hpY2ggbWFrZXMgaXQgb3V0IG9mIHZpZXdwb3J0LlxyXG4gKiBVc2VyIHNjcm9sbHMgZG93biB0byBzZWUgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCxcclxuICogdGhlbiBpdCB3aWxsIGluc2VydCBhbm90aGVyIGA8bmd1aS1pbnZpZXctcGFnZT5gIGFnYWluLlxyXG4gKlxyXG4gKiA8bmd1aS1pbnZpZXctcGFnZT4gbGlzdGVucyB0byAobmd1aUludmlldykgYW5kIChuZ3VpT3V0dmlldykgZXZlbnRzLFxyXG4gKiB3aGVuIDxuZ3VpLWludmlldy1wYWdlPiBpcyBvdXQgb2YgdmlldyBwb3J0LCBpdCBlbXB0aWVzIG91dCB0aGUgY29udGVudHMuXHJcbiAqIGFuZCBpdCByZXN0b3JlcyBiYWNrIHRoZSBjb250ZW50cyB3aGVuIGl0IGlzIGluIHZpZXdwb3J0IGFnYWluLlxyXG4gKlxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gKiAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPkxvYWRpbmc8L2Rpdj5cclxuICogICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgIDwvbmctdGVtcGxhdGU+XHJcbiAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLXZpcnR1YWwtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3VpLXZpcnR1YWwtbGlzdFwiXHJcbiAgICAgIChmb2N1cyk9XCJfZm9jdXNlZCA9IHRydWVcIlxyXG4gICAgICAoY2xpY2spPVwiX2ZvY3VzZWQgPSB0cnVlXCI+XHJcbiAgICAgIDwhLS0gaG9sZCBtdWx0aXBsZSA8bmd1aS1pbnZpZXctcGFnZT4gLS0+XHJcbiAgICAgIDxkaXYgI3BhZ2VzPjwvZGl2PlxyXG4gICAgICA8IS0tIGluc2VydCA8bmd1aS1pbnZpZXctcGFnZT4gaW50byAjcGFnZXMgLS0+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKVwiPjwvbmd1aS1pbnZpZXc+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIC8qKiB0aGUgY29udGFpbmVyIE5ndWlJbnZpZXdQYWdlIHdpbGwgYmUgaW5zZXJ0ZWQgKi9cclxuICBAVmlld0NoaWxkKCdwYWdlcycsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcGFnZXNSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKiBGaXJlZCB3aGVuIGNoaWxkIGA8bmd1aS1saXN0LWl0ZW0+YCBpcyBzZWxlY3RlZCAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIEZpcmVkIHdoZW4gYEVTQ2Aga2V5IGlzIHByZXNzZWQgZnJvbSBgPG5ndWktbGlzdC1pdGVtPmAgKi9cclxuICBAT3V0cHV0KCkgZXNjYXBlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gYm90dG9tIG9mIHRoZSB2aXJ0dWFsIGxpc3QgaXMgaW4gdmlld1xyXG4gICAqIFRoZSBoYW5kbGVyIG9mIHRoaXMgZXZlbnQgbXVzdCBjYWxsIGAkZXZlbnQuYWRkSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pYCB0byBmaWxsIGNvbnRlbnRzXHJcbiAgICogSWYgbm90LCBvbmx5IHRoZSBmaXJzdCBwYWdlIGlzIGxvYWRlZCwgYW5kIHJlc3Qgb2YgdGhlIHBhZ2VzIHdvbid0IGJlIGxvYWRlZDtcclxuICAgKlxyXG4gICAqICMjIyBleGFtcGxlXHJcbiAgICogYGBgdHNcclxuICAgKiA8bmd1aS12aXJ0dWFsLWxpc3QgKGJvdHRvbUludmlldyk9XCJsb2FkSXRlbXMoJGV2ZW50KVwiPlxyXG4gICAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAgICogICAgIDxkaXYgKm5nSWY9XCJpdGVtcyBlbHNlIG5vSXRlbXNcIj5cclxuICAgKiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBudW0gb2YgaXRlbXM7IHRyYWNrQnk6IG51bVwiPnJvdyBudW1iZXI6IHt7IG51bSB9fTwvbGk+XHJcbiAgICogICAgIDwvZGl2PlxyXG4gICAqICAgICA8bmctdGVtcGxhdGUgI25vSXRlbXM+TG9hZGluZzwvbmctdGVtcGxhdGU+XHJcbiAgICogICA8L25nLXRlbXBsYXRlPlxyXG4gICAqIDwvbmd1aS12aXJ0dWFsLWxpc3Q+XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdHRvbUludmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKiBUaGUgbGFzdCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCBiZWluZyBpbnNlcnRlZCAqL1xyXG4gIGludmlld1BhZ2U6IENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD47XHJcbiAgX2ZvY3VzZWQgPSBmYWxzZTtcclxuICAvKiogSW5kaWNhdGVzIGlmIGEgcGFnZSBpcyBzdGlsbCBsb2FkaW5nICovXHJcbiAgaXNMaXN0TG9hZGluZzogYm9vbGVhbjtcclxuICBpbnZpZXdQYWdlczogQXJyYXk8Q29tcG9uZW50UmVmPE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50Pj4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQ2hlY2sgaWYgbmVjZXNzYXJ5IGlucHV0IGFuZCBvdXRwdXQgaXMgcHJvdmlkZWQgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudGVtcGxhdGUgfHwgIXRoaXMuYm90dG9tSW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignPG5ndWktdmlydHVhbC1saXN0PiByZXF1aXJlcyBbdGVtcGxhdGVdIGFuZCB7Ym90dG9tSW52aWV3KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgYm90dG9tIGlzIGludmlldyBwb3J0LCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZFxyXG4gICAqIEl0IHdpbGwgaW5zZXJ0IGEgZHluYW1pY2FsbCBjcmVhdGVkIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50IHdpdGggdGhlIGdpdmVuIHRlbXBsYXRlLlxyXG4gICAqIEl0IHdpbGwgYWxzbyBmaXJlcyAoYm90dG9tSW52aWV3KSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBmaWxsIHVwIGl0ZW1zIGZvciB0aGUgcGFnZS5cclxuICAgKi9cclxuICBhZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzTGlzdExvYWRpbmcpIHtcclxuICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZSA9XHJcbiAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVDb21wb25lbnQoTmd1aUludmlld1BhZ2VDb21wb25lbnQsIHRoaXMucGFnZXNSZWYpO1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmluc2VydENvbXBvbmVudCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICAgICAgdGhpcy5pbnZpZXdQYWdlcy5wdXNoKHRoaXMuaW52aWV3UGFnZSk7XHJcblxyXG4gICAgICB0aGlzLmJvdHRvbUludmlldy5lbWl0KHRoaXMpOyAvLyBmaXJlIGV2ZW50LCBzbyB0aGF0IHVzZXIgY2FuIGxvYWQgaXRlbXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBbHJlYWR5IGEgcGFnZSBiZWluZyBpbnNlcnRlZCwgc2tpcHBpbmcgYWRkaW5nIGEgcGFnZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGl0ZW1zIG9mIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50XHJcbiAgYWRkTGlzdChpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhpdGVtcyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTm9NYXRjaEZvdW5kIHtcclxuICBodG1sID0gJ05vIE1hdGNoIEZvdW5kJztcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTm9uZVNlbGVjdCB7XHJcbiAgaHRtbCA9ICdTZWxlY3QnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2ZpcmUtZXZlbnQnO1xyXG5pbXBvcnQgeyBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQgfSBmcm9tICcuL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWF1dG9jb21wbGV0ZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJpc1JlYWR5XCIgY2xhc3M9XCJuZ3VpLWF1dG9jb21wbGV0ZVwiPlxyXG4gICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPG5ndWktaW52aWV3IChpbnZpZXcpPVwiYWRkTW9yZVBhZ2VzKClcIj48L25ndWktaW52aWV3PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBtYXgtaGVpZ2h0OiAzMDBweDsgb3ZlcmZsb3c6IGF1dG99XHJcbiAgICAubmd1aS1hdXRvY29tcGxldGUgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBwYWRkaW5nOiA0cHggfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmb3I6IHN0cmluZzsgLy8gaW5wdXQgdGFnIGlkXHJcbiAgQElucHV0KCkgbWluSW5wdXRDaGFycyA9IDE7XHJcbiAgQElucHV0KCkgYmxhbmtPcHRpb24gPSAnU2VsZWN0IE9uZSc7XHJcbiAgQElucHV0KCkgbm9NYXRjaEl0ZW0gPSAnTm8gTWF0Y2ggRm91bmQnO1xyXG5cclxuICAvKiogVGVtcGxhdGUgb2YgTmd1aUludmlld1BhZ2UuIEFsbG93IHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gdGVtcGxhdGUgICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgX2ZvY3VzZWQ6IGFueSA9IHtpbnB1dDogZmFsc2UsIGxpc3RJdGVtOiBmYWxzZX07XHJcbiAgX2ZvY3VzVGltZXI7XHJcbiAgX2FjVGltZXI7XHJcbiAgX3NlbGVjdGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgX2VzY2FwZWRGcm9tTGlzdDogYm9vbGVhbjtcclxuICBfb3JnSW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9wcmV2SW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIF9sYXN0U2VsZWN0ZWQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhdXRvY29tcGxldGUgZGlzcGxheSBjb25kaXRpb25cclxuICAgKiBhdXRvY29tcG9sZXRlIGxpc3QgaXMgb25seSB2aXNpYmxlXHJcbiAgICogICAtIHdoZW4gaW5wdXQgZWxlbWVudCBpcyBmb2N1c2VkIG9yIGxpc3QgZWxlbWVudCBpcyBmb2N1c2VkXHJcbiAgICogICAtIHdoZW4gaW5wdXQgdmFsdWUgaGFzIGVub3VnaHQgY2hhcmFjdGVyc1xyXG4gICAqICAgLSBhbmQgdXNlciBqdXN0IGRpZCBub3Qgc2VsZWN0ZWQgb3IgZXNjYXBlZFxyXG4gICAqL1xyXG4gIGdldCBpc1JlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPckVzY2FwZWQgPSB0aGlzLl9zZWxlY3RlZEZyb21MaXN0IHx8IHRoaXMuX2VzY2FwZWRGcm9tTGlzdDtcclxuICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLl9mb2N1c2VkLmlucHV0IHx8IHRoaXMuX2ZvY3VzZWQubGlzdEl0ZW07XHJcbiAgICBjb25zdCBtaW5DaGFycyA9IHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5JbnB1dENoYXJzO1xyXG5cclxuICAgIHJldHVybiAoIXNlbGVjdGVkT3JFc2NhcGVkICYmIGZvY3VzZWQgJiYgbWluQ2hhcnMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmZvcik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIHRoaXMucG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk7XHJcblxyXG4gICAgZnJvbUV2ZW50KHRoaXMuaW5wdXRFbCwgJ2tleXVwJykuc3Vic2NyaWJlKHRoaXMub25JbnB1dEVsS2V5dXAuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uSW5wdXRFbEZvY3VzZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25JbnB1dEVsQmx1cnJlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMub25TZWxlY3RlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXNjYXBlZC5zdWJzY3JpYmUodGhpcy5vbkVzY2FwZWQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkKHZhbHVlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy5fbGFzdFNlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7ICAgIC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uU2VsZWN0ZWQoKSBpcyBjYWxsZWQnLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbkVzY2FwZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSB0aGlzLl9vcmdJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbkVzY2FwZWQoKSBpcyBjYWxsZWQnKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEZvY3VzZWQoZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uSW5wdXRFbEZvY3VzZWQoKSBpcyBjYWxsZWQnLCBldmVudCk7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5fb3JnSW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX3ByZXZJbnB1dFZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRGb2N1c2VkKCdpbnB1dCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsQmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Rm9jdXNlZCgnaW5wdXQnLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhckxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzLmZvckVhY2goY29tcFJlZiA9PiB7XHJcbiAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmludmlld1BhZ2VzID0gW107XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25JbnB1dEtleXVwKCkgaXMgY2FsbGVkJywgZXZlbnQua2V5KTtcclxuICAgIGNvbnN0IGZpcnN0TGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25ndWktbGlzdC1pdGVtJyk7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgaWYgKGZpcnN0TGlzdCkge1xyXG4gICAgICAgIGZpcmVFdmVudChmaXJzdExpc3QsICdrZXl1cCcsIHtrZXk6IGV2ZW50LmtleX0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub25Fc2NhcGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpICYmIGZpcnN0TGlzdCkge1xyXG4gICAgICBmaXJzdExpc3QuZm9jdXMoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dVcCcgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xyXG4gICAgICAvL1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoID49IHRoaXMubWluSW5wdXRDaGFycykge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2VzY2FwZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZEF1dG9jb21wbGV0ZUxpc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgKi9cclxuICBhZGRBdXRvY29tcGxldGVMaXN0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYWNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2FjVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTsgLy8gPz8/Pz8/Py9cclxuICAgICAgICB0aGlzLl9wcmV2SW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgICAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhckxpc3QoKTtcclxuICAgICAgICB0aGlzLmFkZEFuSW52aWV3UGFnZVRvUGFnZXMoKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDb21wbGV0ZSBhZnRlciB0aGUgZmlyc3QgcGFnZSBvZiBhdXRvY29tcGxldGUgd2hlbiBpdCBzY3JvbGxzIHRvIHRoZSBib3R0b20gKi9cclxuICBhZGRNb3JlUGFnZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pbnZpZXdQYWdlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRGb2N1c2VkKGVsVHlwZTogJ2lucHV0JyB8ICdsaXN0SXRlbScsIHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNUaW1lcik7XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWQgPSB7aW5wdXQ6IGZhbHNlLCBsaXN0SXRlbTogZmFsc2V9O1xyXG4gICAgICB0aGlzLl9mb2N1c2VkW2VsVHlwZV0gPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZm9jdXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzZWRbZWxUeXBlXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25UaGlzVW5kZXJJbnB1dEVsKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGhpc0VsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0aGlzSW5wdXRFbEJDUiA9IHRoaXMuaW5wdXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHRvcCA9IHRoaXNJbnB1dEVsQkNSLnRvcCArIHRoaXNJbnB1dEVsQkNSLmhlaWdodCArIHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAnbGVmdCcsIGAke3RoaXNJbnB1dEVsQkNSLmxlZnR9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpc0VsLCAndG9wJywgYCR7dG9wfXB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXNFbCwgJ21pbldpZHRoJywgYCR7dGhpc0lucHV0RWxCQ1Iud2lkdGh9cHhgKTtcclxuICB9XHJcblxyXG4gIC8vIHNldCBpdGVtcyBvZiBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudFxyXG4gIGFkZExpc3QoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4gTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudC5hZGRMaXN0KCkgaXMgY2FsbGVkKCknKTtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFRPRE86IC4uLi4uLi4uIGZvciAxc3QgcGFnZSBvbmx5LCBzaG93IG5vIG1hdGNoIGZvdW5kIG9yIGJsYW5rIG9wdGlvblxyXG4gICAgbGV0IG5vTWF0Y2hJdGVtOiBhbnk7XHJcbiAgICBsZXQgYmxhbmtJdGVtOiBhbnkgPSB7fTtcclxuICAgIGlmICh0aGlzLmludmlld1BhZ2VzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5ub01hdGNoSXRlbSAmJiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkpIHsgLy8gYWRkIG5vIG1hdGNoIGl0ZW1cclxuICAgICAgICBub01hdGNoSXRlbSA9IG5ldyBOb01hdGNoRm91bmQoKTtcclxuICAgICAgICBibGFua0l0ZW0uaHRtbCA9IHRoaXMubm9NYXRjaEl0ZW07XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ibGFua09wdGlvbikge1xyXG4gICAgICAgIGJsYW5rSXRlbSA9IG5ldyBOb25lU2VsZWN0KCk7XHJcbiAgICAgICAgYmxhbmtJdGVtLmh0bWwgPSB0aGlzLmJsYW5rT3B0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxsSXRlbXMgPSBbXS5jb25jYXQobm9NYXRjaEl0ZW0sIGJsYW5rSXRlbSwgaXRlbXMpLmZpbHRlcih4ID0+IHgpO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlLmluc3RhbmNlLnNldEl0ZW1zKGFsbEl0ZW1zKTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWxpc3QnIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0RGlyZWN0aXZlIHtcclxuICAvKiogRmlyZWQgd2hlbiBjaGlsZCBgPG5ndWktbGlzdC1pdGVtPmAgaXMgc2VsZWN0ZWQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBGaXJlZCB3aGVuIGBFU0NgIGtleSBpcyBwcmVzc2VkIGZyb20gYDxuZ3VpLWxpc3QtaXRlbT5gICovXHJcbiAgQE91dHB1dCgpIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3B0aW9uYWwsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5ndWlMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb25lU2VsZWN0IH0gZnJvbSAnLi9ub25lLXNlbGVjdCc7XHJcbmltcG9ydCB7IE5vTWF0Y2hGb3VuZCB9IGZyb20gJy4vbm8tbWF0Y2gtZm91bmQnO1xyXG5cclxuLy8gdGFiaW5kZXgsIGtleWRvd24sIGtleXVwKEVOVEVSLCBFU0MpLCBjbGlja1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25ndWktbGlzdC1pdGVtJyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnaXRlbScpIG9iamVjdDogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcblxyXG4gIG5leHRTaWJsaW5nOiBIVE1MRWxlbWVudDtcclxuICBwcmV2U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcGFyZW50TGlzdENvbXA6IE5ndWlMaXN0RGlyZWN0aXZlIHwgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IHwgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGxpc3REaXJlY3RpdmU6IE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIHZpcnR1YWxMaXN0Q29tcG9uZW50OiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQsXHJcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgYXV0b2NvbXBsZXRlQ29tcG9uZW50OiBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50XHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wID0gdGhpcy5saXN0RGlyZWN0aXZlIHx8IHRoaXMudmlydHVhbExpc3RDb21wb25lbnQgfHwgdGhpcy5hdXRvY29tcGxldGVDb21wb25lbnQ7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50TGlzdENvbXApIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ25ndWktbGlzdC1pdGVtIHJlcXVpcmVzIHBhcmVudCBvZiBuZ3VpLWxpc3QsIG5ndWktdmlydHVhbC1saXN0LCBvciBuZ3VpLWF1dG9jb21wbGV0ZS4nKTtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb25lU2VsZWN0KSB8fCAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBOb01hdGNoRm91bmQpKSB7XHJcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5vYmplY3QuaHRtbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgdXAsIGRvd24sIGxlZnQsIHJpZ2h0XHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pIGtleWRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRoaXNMaXN0SXRlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgcGFyZW50TGlzdEVsID0gdGhpcy5wYXJlbnRMaXN0Q29tcC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBsaXN0SXRlbXM6IEFycmF5PEhUTUxFbGVtZW50PlxyXG4gICAgICA9IEFycmF5LmZyb20ocGFyZW50TGlzdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ25ndWktbGlzdC1pdGVtJykpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW1OZHggPSBsaXN0SXRlbXMuaW5kZXhPZih0aGlzTGlzdEl0ZW0pO1xyXG4gICAgY29uc3QgbmV4dExpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4ICsgMV0gfHwgbGlzdEl0ZW1zWzBdO1xyXG4gICAgY29uc3QgcHJldkxpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtTmR4IC0gMV0gfHwgbGlzdEl0ZW1zW2xpc3RJdGVtcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgIGNhc2UgMzc6IGNhc2UgMzg6IC8vIHVwIGFycm93LCBsZWZ0IGFycm93XHJcbiAgICAgIHByZXZMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzk6IGNhc2UgNDA6IC8vIGRvd24gYXJyb3csIHJpZ2h0IGFycm93XHJcbiAgICAgIG5leHRMaXN0SXRlbS5mb2N1cygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaGFuZGxlcyBrZXlib2FyZCBlbnRlcigxMyksIGVzYygyNylcclxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleXVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0VzY2FwZSc6XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXAuZXNjYXBlZC5lbWl0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG1vdXNlZG93bigpOiB2b2lkIHtcclxuICAgIHRoaXMucGFyZW50TGlzdENvbXAuc2VsZWN0ZWQuZW1pdCh0aGlzLm9iamVjdCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIGZvY3VzZWQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKSB7XHJcbiAgICAgIHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSgnbGlzdEl0ZW0nLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBibHVycmVkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpTGlzdEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7Tmd1aUxpc3REaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdQYWdlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4uL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XHJcblxyXG5leHBvcnQge05ndWlBdXRvY29tcGxldGVDb21wb25lbnQsIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSwgTmd1aUxpc3REaXJlY3RpdmUsIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCxcclxuICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxyXG4gICAgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld1BhZ2VDb21wb25lbnQsXHJcbiAgICBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSxcclxuICAgIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmd1aUludmlld1BhZ2VDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdE1vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiB3aW5kb3cua29uc29sZSBhbHRlcm5hdGl2ZVxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGBcclxuICoga29uc29sZS5zZXRMb2dMZXZlbCgnZXJyb3InKTtcclxuICoga29ud29sZS5sb2coMSwyLDMsNCw1KTtcclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3Mga29uc29sZSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAvKiogYWxsIGxvZyBsZXZlbHMgKi9cclxuICBzdGF0aWMgTE9HX0xFVkVMUyA9IHtcclxuICAgIEFMTDogICBwYXJzZUludCgnMDAwMDAnLCAyKSxcclxuICAgIERFQlVHOiBwYXJzZUludCgnMDAwMDEnLCAyKSxcclxuICAgIExPRzogICBwYXJzZUludCgnMDAwMTAnLCAyKSxcclxuICAgIElORk86ICBwYXJzZUludCgnMDAxMDAnLCAyKSxcclxuICAgIFdBUk46ICBwYXJzZUludCgnMDEwMDAnLCAyKSxcclxuICAgIEVSUk9SOiBwYXJzZUludCgnMTAwMDAnLCAyKSxcclxuICAgIE5PTkU6ICBwYXJzZUludCgnMTExMTEnLCAyKVxyXG4gIH07XHJcblxyXG4gIC8qKiBjdXJyZW50IGxvZyBsZXZlbCBzZXQgYnkgc2V0TG9nTGV2ZWwsIGRlZmF1bHQgJ0lORk8nICovXHJcbiAgc3RhdGljIGxvZ0xldmVsID0gJ0lORk8nO1xyXG5cclxuICAvKiogcmV0dXJucyBpZiBpdCBzaG91bGQgY2FsbCBgd2luZG93LmNvbnNvbGVgIG9yIG5vdCAqL1xyXG4gIHN0YXRpYyB0b0xvZyhwYXJhbSk6IGJvb2xlYW4geyAvLyByZXR1cm5zIHRvIGxvZyBvciBub3RcclxuICAgIGNvbnN0IHJlc3RyaWN0aW9uTnVtID0gdGhpcy5MT0dfTEVWRUxTW3RoaXMubG9nTGV2ZWxdO1xyXG4gICAgY29uc3QgcmVxdWlyZWROdW0gPSB0aGlzLkxPR19MRVZFTFNbcGFyYW1dO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlZE51bSA+IHJlc3RyaWN0aW9uTnVtO1xyXG4gIH1cclxuXHJcbiAgLyoqIHNldHMgdGhlIGN1cnJlbnQgbG9nIGxldmVsICovXHJcbiAgc3RhdGljIHNldExvZ0xldmVsKGxvZ0xldmVsOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbG9nTGV2ZWwgPSBsb2dMZXZlbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgY29uc3QgbG9nTGV2ZWxzID0gT2JqZWN0LmtleXModGhpcy5MT0dfTEVWRUxTKTtcclxuICAgIGlmIChsb2dMZXZlbHMuaW5kZXhPZihsb2dMZXZlbCkgPiAtMSkge1xyXG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZSkgeyAvLyBmb3IgYnJvd3NlciBlbnYuXHJcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2tvbnNvbGUuTE9HX0xFVkVMJywgbG9nTGV2ZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yLCBpbnZhbGlkIGxvZ0xldmVsLCBpdCBtdXN0IGJlIG9uZSBvZiAke2xvZ0xldmVsc31gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5kZWJ1ZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBkZWJ1Z2AgKi9cclxuICBzdGF0aWMgZGVidWcoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0RFQlVHJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUubG9nKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGxvZ2AgKi9cclxuICBzdGF0aWMgbG9nKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdMT0cnKSkge1xyXG4gICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmluZm8oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgaW5mb2AgKi9cclxuICBzdGF0aWMgaW5mbyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnSU5GTycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUud2FybigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGB3YXJuYCAqL1xyXG4gIHN0YXRpYyB3YXJuKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdXQVJOJykpIHtcclxuICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZXJyb3IoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZXJyb3JgICovXHJcbiAgc3RhdGljIGVycm9yKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdFUlJPUicpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2FsbCcpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCd5ZXMnKTtcclxuLy8ga29uc29sZS5sb2coJ3llcycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ25vbmUnKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCdubycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnaW5mbycpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdXQVJOJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnRVJST1InKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpSGlnaGxpZ2h0UGlwZX0gZnJvbSAnLi9zcmMvbmd1aS1oaWdobGlnaHQucGlwZSc7XHJcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2V9IGZyb20gJy4vc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBrb25zb2xlIH0gZnJvbSAnLi9zcmMva29uc29sZSc7XHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4vc3JjL2ZpcmUtZXZlbnQnO1xyXG5cclxuZXhwb3J0IHtEeW5hbWljQ29tcG9uZW50U2VydmljZSwgTmd1aUhpZ2hsaWdodFBpcGUsIGtvbnNvbGUsIGZpcmVFdmVudH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIGV4cG9ydHM6IFtOZ3VpSGlnaGxpZ2h0UGlwZV0sXHJcbiAgcHJvdmlkZXJzOiBbRHluYW1pY0NvbXBvbmVudFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVXRpbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcclxuaW1wb3J0IHtOZ3VpTGlzdE1vZHVsZX0gZnJvbSAnLi9uZ3VpLWxpc3Qvbmd1aS1saXN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7Tmd1aVV0aWxzTW9kdWxlfSBmcm9tICcuL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlLFxyXG4gICAgTmd1aUxpc3RNb2R1bGUsXHJcbiAgICBOZ3VpVXRpbHNNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlJbnZpZXdNb2R1bGUsXHJcbiAgICBOZ3VpTGlzdE1vZHVsZSxcclxuICAgIE5ndWlVdGlsc01vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlDb21tb25Nb2R1bGUge1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7OztBQXlCQTtJQStCRSw2QkFDYyxPQUFtQixFQUNFLFVBQWU7UUFEcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNFLGVBQVUsR0FBVixVQUFVLENBQUs7Ozs7UUFwQnpDLG9CQUFlLEdBQTZCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUM7Ozs7OztRQU8xRixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVsQixXQUFNLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckUsY0FBUyxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBSWxGLGFBQVEsR0FBRyxLQUFLLENBQUM7Ozs7UUFFakIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0tBS3hCOzs7Ozs7SUFHRCxzQ0FBUTs7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxD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