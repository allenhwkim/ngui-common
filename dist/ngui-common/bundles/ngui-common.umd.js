(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/internal/observable/fromEvent')) :
    typeof define === 'function' && define.amd ? define('@ngui/common', ['exports', '@angular/core', '@angular/common', 'rxjs/internal/observable/fromEvent'], factory) :
    (factory((global.ngui = global.ngui || {}, global.ngui.common = {}),global.ng.core,global.ng.common,global.rxjs['internal/observable/fromEvent']));
}(this, (function (exports,core,common,fromEvent) { 'use strict';

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
            this.inview = new core.EventEmitter();
            this.notInview = new core.EventEmitter();
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
                if (common.isPlatformBrowser(this.platformId)) {
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
            { type: core.Component, args: [{
                        selector: 'ngui-inview',
                        template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
                        styles: [':host {display: block;}']
                    }] }
        ];
        /** @nocollapse */
        NguiInviewComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        NguiInviewComponent.propDecorators = {
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            observerOptions: [{ type: core.Input }],
            options: [{ type: core.Input }],
            blurEnabled: [{ type: core.Input }],
            inview: [{ type: core.Output }],
            notInview: [{ type: core.Output }]
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
            this.nguiInview = new core.EventEmitter();
            /**
             * Event that will be fired when out of  viewport
             */
            this.nguiOutview = new core.EventEmitter();
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                if (common.isPlatformBrowser(this.platformId) && this.observer) {
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
            { type: core.Directive, args: [{
                        selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
                    },] }
        ];
        /** @nocollapse */
        NguiInviewDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        NguiInviewDirective.propDecorators = {
            observerOptions: [{ type: core.Input }],
            options: [{ type: core.Input }],
            nguiInview: [{ type: core.Output }],
            nguiOutview: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
        if (options === void 0) {
            options = {};
        }
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DynamicComponentService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] }] }
            ];
        };
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
            { type: core.Component, args: [{
                        selector: 'ngui-inview-page',
                        template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
                        styles: ["\n    :host {display: block}\n  "]
                    }] }
        ];
        /** @nocollapse */
        NguiInviewPageComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef }
            ];
        };
        NguiInviewPageComponent.propDecorators = {
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            items: [{ type: core.Input }]
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
            this.selected = new core.EventEmitter();
            /**
             * Fired when `ESC` key is pressed from `<ngui-list-item>`
             */
            this.escaped = new core.EventEmitter();
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
            this.bottomInview = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'ngui-virtual-list',
                        template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
                        styles: ["\n    :host {display: block}\n  "]
                    }] }
        ];
        /** @nocollapse */
        NguiVirtualListComponent.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef },
                { type: DynamicComponentService },
                { type: core.ChangeDetectorRef }
            ];
        };
        NguiVirtualListComponent.propDecorators = {
            pagesRef: [{ type: core.ViewChild, args: ['pages', { read: core.ViewContainerRef },] }],
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }],
            selected: [{ type: core.Output }],
            escaped: [{ type: core.Output }],
            bottomInview: [{ type: core.Output }]
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
             */ function () {
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
                this.inputEl = ( /** @type {?} */(document.querySelector('#' + this.for))); // tslint:disable-line
                this.positionThisUnderInputEl();
                fromEvent.fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
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
            { type: core.Component, args: [{
                        selector: 'ngui-autocomplete',
                        template: "\n    <div *ngIf=\"isReady\" class=\"ngui-autocomplete\">\n      <div #pages></div>\n      <ngui-inview (inview)=\"addMorePages()\"></ngui-inview>\n    </div>\n  ",
                        styles: ["\n    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }\n  "]
                    }] }
        ];
        NguiAutocompleteComponent.propDecorators = {
            for: [{ type: core.Input }],
            minInputChars: [{ type: core.Input }],
            blankOption: [{ type: core.Input }],
            noMatchItem: [{ type: core.Input }],
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }]
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
            this.selected = new core.EventEmitter();
            /**
             * Fired when `ESC` key is pressed from `<ngui-list-item>`
             */
            this.escaped = new core.EventEmitter();
        }
        NguiListDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'ngui-list' // tslint:disable-line
                    },] }
        ];
        /** @nocollapse */
        NguiListDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        NguiListDirective.propDecorators = {
            selected: [{ type: core.Output }],
            escaped: [{ type: core.Output }]
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
            { type: core.Directive, args: [{
                        selector: 'ngui-list-item' // tslint:disable-line
                    },] }
        ];
        /** @nocollapse */
        NguiListItemDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ViewContainerRef },
                { type: NguiListDirective, decorators: [{ type: core.Optional }, { type: core.Host }] },
                { type: NguiVirtualListComponent, decorators: [{ type: core.Optional }, { type: core.Host }] },
                { type: NguiAutocompleteComponent, decorators: [{ type: core.Optional }, { type: core.Host }] }
            ];
        };
        NguiListItemDirective.propDecorators = {
            object: [{ type: core.Input, args: ['item',] }],
            keydown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }],
            keyup: [{ type: core.HostListener, args: ['keyup', ['$event'],] }],
            mousedown: [{ type: core.HostListener, args: ['click', ['$event'],] }],
            focused: [{ type: core.HostListener, args: ['focus', ['$event'],] }],
            blurred: [{ type: core.HostListener, args: ['blur', ['$event'],] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
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
            { type: core.Pipe, args: [{ name: 'nguiHighlight' },] }
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
            { type: core.NgModule, args: [{
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

    exports.NguiInviewComponent = NguiInviewComponent;
    exports.NguiInviewDirective = NguiInviewDirective;
    exports.NguiInviewModule = NguiInviewModule;
    exports.NguiAutocompleteComponent = NguiAutocompleteComponent;
    exports.NguiListItemDirective = NguiListItemDirective;
    exports.NguiListDirective = NguiListDirective;
    exports.NguiInviewPageComponent = NguiInviewPageComponent;
    exports.NguiVirtualListComponent = NguiVirtualListComponent;
    exports.NguiListModule = NguiListModule;
    exports.DynamicComponentService = DynamicComponentService;
    exports.NguiHighlightPipe = NguiHighlightPipe;
    exports.konsole = konsole;
    exports.fireEvent = fireEvent;
    exports.NguiUtilsModule = NguiUtilsModule;
    exports.NguiCommonModule = NguiCommonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24udW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1pbnZpZXcvc3JjL25ndWktaW52aWV3LmRpcmVjdGl2ZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWludmlldy9uZ3VpLWludmlldy5tb2R1bGUudHMiLCJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvc3JjL2ZpcmUtZXZlbnQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktbGlzdC9zcmMvbm8tbWF0Y2gtZm91bmQudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9ub25lLXNlbGVjdC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLWxpc3Qvc3JjL25ndWktbGlzdC5kaXJlY3RpdmUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L3NyYy9uZ3VpLWxpc3QtaXRlbS5kaXJlY3RpdmUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1saXN0L25ndWktbGlzdC5tb2R1bGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS11dGlscy9zcmMvbmd1aS1oaWdobGlnaHQucGlwZS50cyIsIm5nOi8vQG5ndWkvY29tbW9uL2xpYi9uZ3VpLXV0aWxzL3NyYy9rb25zb2xlLnRzIiwibmc6Ly9Abmd1aS9jb21tb24vbGliL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUudHMiLCJuZzovL0BuZ3VpL2NvbW1vbi9saWIvbmd1aS1jb21tb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb250ZW50Q2hpbGQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRCxcclxuICAgIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEFuIGVsZW1lbnQgdGhhdCBsaXN0ZW5zIHRvIHZpZXdwb3J0IHBvc2l0aW9uaW5nIGFuZCBmaXJlcyBpblZpZXcgYW5kIG5vdEludmlldyBldmVudHNcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktaW4tdmlldyBbb2JzZXJ2ZXJPcHRpb25zXT1cIm15T2JzZXJ2ZXJPcHRpb25zXCIgKGluVmlldyk9XCJkb0EoKVwiIChub3RJbnZpZXcpPVwiZG9CKClcIj5cclxuICogICA8aW1nICpuZ0lmIHNyYz1cImh0dHBzOi8vcGljc3VtLnBob3Rvcy84MDAvMzAwP2ltYWdlPTE+XHJcbiAqIDwvbmd1aS1pbi12aWV3PlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1pbnZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSW52aWV3XCIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIGAsXHJcbiAgc3R5bGVzOiBbJzpob3N0IHtkaXNwbGF5OiBibG9jazt9J11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKiogPG5nLXRlbXBsYXRlPiByZWZlcmVuY2UgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIEBJbnB1dCgpIG9ic2VydmVyT3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge3RocmVzaG9sZDogWy4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOF19O1xyXG4gICAgLyoqIERlcHJlY2F0ZWQgY29uZmlnLiBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC5cclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLiAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuICAvKiogQ29udHJvbHMgd2hldGhlciBibHVyIGVmZmVjdCBpcyBhcHBsaWVkIHRvIGEgY29tcG9uZW50IHdpdGggbGVzcyB0aGFuIDgwJSBpbnRlcnNlY3Rpb24gcmF0aW8uXHJcbiAgICogT25seSBhcHBsaWVzIHdoZW4gdGhlcmUgYXJlIG5vIFwiaW52aWV3XCIgZXZlbnQgaGFuZGxlcnMgZGVmaW5lZC5cclxuICAgKiovXHJcbiAgQElucHV0KCkgYmx1ckVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgaW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG5vdEludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0ICovXHJcbiAgaXNJbnZpZXcgPSBmYWxzZTtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgODAlIGluIHZpZXdwb3J0LiBVc2VkIGJ5IHRoZSBkZWZhdWx0IGNhbGxiYWNrICovXHJcbiAgb25jZTgwUGN0VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHtcclxuICB9XHJcblxyXG4gICAgLyoqIFN0YXJ0cyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICB0aGlzLm9ic2VydmVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaGFuZGxlSW50ZXJzZWN0LmJpbmQodGhpcyksIHRoaXMub2JzZXJ2ZXJPcHRpb25zKTtcclxuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqIHN0b3AgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgICAvKiogZmlyZXMgKGludmlldykgYW5kIChub3RJbnZpZXcpIGV2ZW50cyB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHZpc2libGUgb3Igbm90IHZpc2libGUgICovXHJcbiAgaGFuZGxlSW50ZXJzZWN0KGVudHJpZXMpOiB2b2lkIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcclxuICAgICAgaWYgKGVudHJ5Wydpc0ludGVyc2VjdGluZyddKSB7XHJcbiAgICAgICAgdGhpcy5pc0ludmlldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5pbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ub3RJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHQgaW50ZXJzZWN0aW9uIGhhbmRsZXIsIHdoaWNoIHNldHMgYmx1ciBkZXBlbmRlcyBvbiBpbnRlcnNlY3Rpb24gcmF0aW9cclxuICAgICAqIHRoaXMgd29uJ3QgYmUgaW52b2tlZCBpZiB1c2VyIHByb3ZpZGVzIGFueSAoaW52aWV3KSBldmVudC4gZS5nLiAoaW52aWV3KT1cInNvbWV0aGluZygpXCJcclxuICAgICAqL1xyXG4gIGRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTogYW55IHtcclxuICAgIGlmICghdGhpcy5ibHVyRW5hYmxlZCB8fCB0aGlzLm9uY2U4MFBjdFZpc2libGUgfHwgdGhpcy5pbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDwgMC44KSB7XHJcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqICgxIC8gMC44KTtcclxuICAgICAgY29uc3QgYmx1ciA9IDIwIC0gTWF0aC5mbG9vcihlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqIDEwKSAqIDQ7XHJcbiAgICAgIGNvbnN0IGZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICBPYmplY3QuYXNzaWduKGVudHJ5LnRhcmdldC5zdHlsZSwge29wYWNpdHksIGZpbHRlcn0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICBlbnRyeS50YXJnZXQuc3R5bGUuZmlsdGVyID0gJ3Vuc2V0JztcclxuXHJcbiAgICAgIHRoaXMub25jZTgwUGN0VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVzIChuZ3VpSW52aWV3KSBvciAobmd1aU91dHZpZXcpIGV2ZW50cyBkZXBlbmRlbnRzIG9uIHRoZSBlbGVtZW50IGlzIGluIHZpZXdwb3J0IG9yIG5vdFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ3VpSW52aWV3XSwgW25ndWlPdXR2aWV3XScgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcblxyXG4gICAgLyoqIEV2ZW50IHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGluIHZpZXdwb3J0ICovXHJcbiAgQE91dHB1dCgpIG5ndWlJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIC8qKiBFdmVudCB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBvdXQgb2YgIHZpZXdwb3J0ICovXHJcbiAgQE91dHB1dCgpIG5ndWlPdXR2aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdG9wcyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5vYnNlcnZlcikge1xyXG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyAobmd1aUludmlldykgZXZlbnQgd2hlbiB0aGlzIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcclxuICAgICAqICBhbmQgZmlyZXMgKG5ndWlPdXR2aWV3KSBldmVudCB3aGVuIHRoaXMgZWxlbWVudCBpcyBub3QgaW4gdmlld3BvcnRcclxuICAgICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMubmd1aUludmlldy5lbWl0KGVudHJ5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5ndWlPdXR2aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05ndWlJbnZpZXdDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aUludmlld0RpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1pbnZpZXcuZGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCB7Tmd1aUludmlld0NvbXBvbmVudCwgTmd1aUludmlld0RpcmVjdGl2ZX07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ3VpSW52aWV3Q29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmd1aUludmlld0NvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdEaXJlY3RpdmVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSW52aWV3TW9kdWxlIHtcclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8qKlxyXG4gKiBmaXJlIHRoZSBnaXZlbiBldmVudCB3aXRoIG9wdGlvbnMgb24gdGhlIGVsZW1lbnRcclxuICogQGV4YW1wbGVcclxuICogZmlyZUV2ZW50KGVsLCAnY2xpY2snKTtcclxuICogZmlyZUV2ZW50KGVsLCAna2V5cHJlc3MnLCB7a2V5OiAnRW50ZXInfSk7XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IGJvb2xlYW4ge1xyXG4gIGxldCBldmVudDtcclxuICBpZiAodHlwZSA9PT0gJ2NsaWNrJyB8fCB0eXBlLm1hdGNoKC9ebW91c2UvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgTW91c2VFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUubWF0Y2goL15rZXkvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgS2V5Ym9hcmRFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUubWF0Y2goL150b3VjaC8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBUb3VjaEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBJbnNlcnQgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgdXNpbmcgYSBzZXJ2aWNlXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIGltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9keW5hbWljLmNvbXBvbmVudC5zZXJ2aWNlJztcclxuICogaW1wb3J0IHsgTXlEeW5hbWljQ29tcG9uZW50IH0gZnJvbSAnLi9teS0xLmNvbXBvbmVudCc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHRlbXBsYXRlOiBgIC4uLiA8ZGl2ICNkeW1hbWljPjwvZGl2PmBcclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcclxuICogICBAVmlld0NoaWxkKCdkeW5hbWljJywge3JlYWQ6Vmlld0NvbnRhaW5lclJlZn0pIHZjcjogVmlld0NvbnRhaW5lclJlZjtcclxuICpcclxuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZGNzOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSkge31cclxuICpcclxuICogICBpbnNlcnRDb21wKCkge1xyXG4gKiAgICAgbGV0IGNvbXBSZWYgPSB0aGlzLmRjcy5jcmVhdGVDb21wb25lbnQoTXlEeW5hbWljQ29tcG9uZW50LCB0aGlzLnZjcik7XHJcbiAqICAgICB0aHMuZGNzLmluc2VydENvbW9uZW50KGNtcFJlZik7XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLml0ZW1zID0gWzEsMiwzXTsgICAgICAgICAgICAgIC8vIGRlYWxpbmcgd2l0aCBAaW5wdXRcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2Uub3V0cHV0JC5zdWJzY3JpYmUodmFsID0+IHt9KTsgLy8gZGVhbGluZyB3aXRoIEBvdXRwdXRcclxuICogICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RhYmxlLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHNlcnZpY2UgdG8gYWRkIG9yIHJlbW92ZSBjb21wb25lbnQgZHluYW1pY2FsbHlcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIHtcclxuICAvKiogdXNlZCB0byBjcmVhdGUgYSBmYWN0b3J5IGZyb20gYSBjb21wb25lbnQgY2xhc3MgKi9cclxuICBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcclxuICAvKiogZGVmaW5lcyB3aGVyZSBhIGR5bmFtaWMgY29tcG9uZW50cyBpbnNlcnQgaW50byAqL1xyXG4gIHJvb3RWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgZmFjdG9yeVJlc29sdmVyKSB7XHJcbiAgICB0aGlzLmZhY3RvcnlSZXNvbHZlciA9IGZhY3RvcnlSZXNvbHZlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgY29tcG9uZW50IHJlZmVyZW5jZVxyXG4gICAqIFRoZSByZWFzb24gdG8gc2VwZXJhdGUgYGNyZWF0ZUNvbXBuZW50YCBhbmQgYGluc2VydENvbXBvbmVudGAgaXNcclxuICAgKiB0byBhbGxvdyBzb21lIGFjdGlvbnMgYmVmb3JlIHdlIGluc2VydCBpbnRvIGEgaG9zdFZpZXcuXHJcbiAgICogZS5nIHN0eWxpbmcsIHNldHRpbmcgYXR0cmlidXRlcywgZXRjXHJcbiAgICovXHJcbiAgY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBpbnRvPzogVmlld0NvbnRhaW5lclJlZik6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIgPSBpbnRvIHx8IHRoaXMucm9vdFZpZXdDb250YWluZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuXHJcbiAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUodGhpcy5yb290Vmlld0NvbnRhaW5lci5wYXJlbnRJbmplY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBpbnNlcnQgY29tcG9uZW50XHJcbiAgICovXHJcbiAgaW5zZXJ0Q29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiBDb21wb25lbnQge1xyXG4gICAgY29uc3QgY29tcElkID0gYG5ndWktZHluLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKiogNykgKyAxMCAqKiA2fWA7XHJcbiAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgY29tcElkKTtcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5pZCA9IGNvbXBJZDtcclxuXHJcbiAgICB0aGlzLnJvb3RWaWV3Q29udGFpbmVyLmluc2VydChjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG5cclxuICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEEgYmxvY2sgb2YgY29tcG9uZW50IHRoYXQgbGlzdGVucyB0byBpblZpZXcgYW5kIG91dFZpZXcgZXZlbnRzLFxyXG4gKiBzbyB0aGF0IGl0IGVtcHRpZXMgY29udGVudHMgd2hlbiBvdXQgb2YgdmlldyBhZnRlciBiYWNrdXAgaXRlbXNcclxuICogYW5kIHJlc3RvcmVzIHRoZSBjb250ZW50cyB3aGVuIGluIHZpZXdcclxuICpcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktaW52aWV3LXBhZ2UgW2l0ZW1zXT1cIml0ZW1zXCI+XHJcbiAqICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtcz1cIml0ZW1zXCI+XHJcbiAqICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAqICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICogPC9uZ3VpLWludmlldy1wYWdlPlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1pbnZpZXctcGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJpbnZpZXctcGFnZSBjb250ZW50c1wiXHJcbiAgICAgIChuZ3VpSW52aWV3KT1cInJlc3RvcmVJdGVtcygpXCJcclxuICAgICAgKG5ndWlPdXR2aWV3KT1cImVtcHR5SXRlbXMoKVwiPlxyXG4gICAgICA8IS0tIGFkZCBibGFuayBuZ3VpLWxpc3QtaXRlbSBieSBjb25kaXRpb24gIC0tPlxyXG4gICAgICA8IS0tIG5vIG1hdGNoIGZvdW5kIG5ndWktbGlzdC1pdGVtIGJ5IGNvbmRpdGlvbiAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlfHxkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbXM6IGl0ZW1zLCBvdXRWaWV3OiBvdXRWaWV3fVwiPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPGRpdiAqbmdJZj1cIm91dFZpZXdcIj57eyBpdGVtc0JhY2t1cC5sZW5ndGggfX0gaXRlbXMgaGlkZGVuPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpdGVtc1wiPiBFcnJvcjogcmVxdWlyZXMgW2l0ZW1zXSA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPiBFcnJvcjogcmVxdWlyZXMgJmx0O25nLXRlbXBsYXRlPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtkaXNwbGF5OiBibG9ja31cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld1BhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKiBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGNvbnRlbnRzICovXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLy8gQElucHV0KCd0ZW1wbGF0ZScpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKiogTGlzdCBvZiBlbGVtZW50cyB0aGF0IGFyZSB1c2VkIHRvIHJlbmRlciB0aGlzIGVsZW1lbnQgKi9cclxuICBASW5wdXQoKSBpdGVtczogQXJyYXk8YW55PjtcclxuXHJcbiAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIEluZGljYXRlcyB0aGF0IHRoZSBwYWdlIG9mIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIG91dFZpZXcgPSBmYWxzZTtcclxuICAvKiogVGhlIGNvcHkgb2YgaXRlbXMuIFRoaXMgaXMgc2V0IHdoZW4gdGhpcyBlbGVtZW50IGlzIG91dCBvZiB2aWV3cG9ydCAqL1xyXG4gIGl0ZW1zQmFja3VwOiBBcnJheTxhbnk+ID0gW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuXHJcbiAgICogVGhlIGhlaWdodCBvZiBpdCByZW1haW5zIHRoZSBzYW1lIGV2ZW4gd2hlbiBpdGVtcyBnZXQgZW1wdHkgb3V0LlxyXG4gICAqL1xyXG4gIGNvbnRlbnRzRWw6IEhUTUxFbGVtZW50O1xyXG4gIGRlc3Ryb3llZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RvcmUgaXRlbXMgd2hlbiBpbiB2aWV3cG9ydCwgc28gdGhhdCBlbGVtZW50cyBhcmUgcmVuZGVyZWRcclxuICAgKi9cclxuICByZXN0b3JlSXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vdXRWaWV3KSB7XHJcbiAgICAgIHRoaXMub3V0VmlldyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLml0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zQmFja3VwIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtc0JhY2t1cCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRzRWwsICdoZWlnaHQnLCB1bmRlZmluZWQpO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZW50c0VsID1cclxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmludmlldy1wYWdlLmNvbnRlbnRzJyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpSW52aWV3UGFnZUNvbXBvbmVudC5uZ09uRGVzdHJveSgpIGlzIGNhbGxlZCcpO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1wdHkgaXRlbXMgd2hlbiBub3QgaW4gdmlld3BvcnQsIHNvIHRoYXQgZWxlbWVudHMgYXJlIG5vdCByZW5kZXJlZFxyXG4gICAqL1xyXG4gIGVtcHR5SXRlbXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLmNvbnRlbnRzRWwgJiYgIXRoaXMub3V0Vmlldykge1xyXG4gICAgICAvLyBzZXQgaGVpZ2h0IGJlZm9yZSBlbXB0eWluZyBjb250ZW50c1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50c0VsLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcblxyXG4gICAgICB0aGlzLm91dFZpZXcgPSB0cnVlO1xyXG4gICAgICB0aGlzLml0ZW1zQmFja3VwID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zIHx8IFtdKTtcclxuICAgICAgdGhpcy5pdGVtcyA9IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJdGVtcyhpdGVtczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTmd1aUludmlld1BhZ2VDb21wb25lbnQuc2V0SXRlbXMoKSBpcyBjYWxsZWQgd2l0aCcsIGl0ZW1zKTtcclxuICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL25ndWktdXRpbHMvc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIFZpcnR1YWwgTGlzdFxyXG4gKlxyXG4gKiBUaGUgYDxuZ3VpLWludmlldyAuLj5gIGluc2VydHMgPG5ndWktaW52aWV3LXBhZ2U+IGludG9cclxuICogYDxkaXYgI3BhZ2VzPmAgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydFxyXG4gKiBXaGVuIGl0J3MgaW5zZXJ0ZWQsIGl0IHdpbGwgYmUgcHVzaGVkIGRvd24sIHdoaWNoIG1ha2VzIGl0IG91dCBvZiB2aWV3cG9ydC5cclxuICogVXNlciBzY3JvbGxzIGRvd24gdG8gc2VlIHRoZSBib3R0b20gb2YgdGhlIGxpc3QsXHJcbiAqIHRoZW4gaXQgd2lsbCBpbnNlcnQgYW5vdGhlciBgPG5ndWktaW52aWV3LXBhZ2U+YCBhZ2Fpbi5cclxuICpcclxuICogPG5ndWktaW52aWV3LXBhZ2U+IGxpc3RlbnMgdG8gKG5ndWlJbnZpZXcpIGFuZCAobmd1aU91dHZpZXcpIGV2ZW50cyxcclxuICogd2hlbiA8bmd1aS1pbnZpZXctcGFnZT4gaXMgb3V0IG9mIHZpZXcgcG9ydCwgaXQgZW1wdGllcyBvdXQgdGhlIGNvbnRlbnRzLlxyXG4gKiBhbmQgaXQgcmVzdG9yZXMgYmFjayB0aGUgY29udGVudHMgd2hlbiBpdCBpcyBpbiB2aWV3cG9ydCBhZ2Fpbi5cclxuICpcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgdHNcclxuICogPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICogICA8bmctdGVtcGxhdGUgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cclxuICogICAgIDxkaXYgKm5nSWY9XCIhaXRlbXNcIj5Mb2FkaW5nPC9kaXY+XHJcbiAqICAgICA8bGkgKm5nRm9yPVwibGV0IG51bSBvZiBpdGVtczsgdHJhY2tCeTogbnVtXCI+cm93IG51bWJlcjoge3sgbnVtIH19PC9saT5cclxuICogICA8L25nLXRlbXBsYXRlPlxyXG4gKiA8L25ndWktdmlydHVhbC1saXN0PlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS12aXJ0dWFsLWxpc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmd1aS12aXJ0dWFsLWxpc3RcIlxyXG4gICAgICAoZm9jdXMpPVwiX2ZvY3VzZWQgPSB0cnVlXCJcclxuICAgICAgKGNsaWNrKT1cIl9mb2N1c2VkID0gdHJ1ZVwiPlxyXG4gICAgICA8IS0tIGhvbGQgbXVsdGlwbGUgPG5ndWktaW52aWV3LXBhZ2U+IC0tPlxyXG4gICAgICA8ZGl2ICNwYWdlcz48L2Rpdj5cclxuICAgICAgPCEtLSBpbnNlcnQgPG5ndWktaW52aWV3LXBhZ2U+IGludG8gI3BhZ2VzIC0tPlxyXG4gICAgICA8bmd1aS1pbnZpZXcgKGludmlldyk9XCJhZGRBbkludmlld1BhZ2VUb1BhZ2VzKClcIj48L25ndWktaW52aWV3PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7ZGlzcGxheTogYmxvY2t9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAvKiogdGhlIGNvbnRhaW5lciBOZ3VpSW52aWV3UGFnZSB3aWxsIGJlIGluc2VydGVkICovXHJcbiAgQFZpZXdDaGlsZCgncGFnZXMnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHBhZ2VzUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gIC8qKiBUZW1wbGF0ZSBvZiBOZ3VpSW52aWV3UGFnZS4gQWxsb3cgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biB0ZW1wbGF0ZSAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAvKiogRmlyZWQgd2hlbiBjaGlsZCBgPG5ndWktbGlzdC1pdGVtPmAgaXMgc2VsZWN0ZWQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBGaXJlZCB3aGVuIGBFU0NgIGtleSBpcyBwcmVzc2VkIGZyb20gYDxuZ3VpLWxpc3QtaXRlbT5gICovXHJcbiAgQE91dHB1dCgpIGVzY2FwZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBmaXJlZCB3aGVuIGJvdHRvbSBvZiB0aGUgdmlydHVhbCBsaXN0IGlzIGluIHZpZXdcclxuICAgKiBUaGUgaGFuZGxlciBvZiB0aGlzIGV2ZW50IG11c3QgY2FsbCBgJGV2ZW50LmFkZEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KWAgdG8gZmlsbCBjb250ZW50c1xyXG4gICAqIElmIG5vdCwgb25seSB0aGUgZmlyc3QgcGFnZSBpcyBsb2FkZWQsIGFuZCByZXN0IG9mIHRoZSBwYWdlcyB3b24ndCBiZSBsb2FkZWQ7XHJcbiAgICpcclxuICAgKiAjIyMgZXhhbXBsZVxyXG4gICAqIGBgYHRzXHJcbiAgICogPG5ndWktdmlydHVhbC1saXN0IChib3R0b21JbnZpZXcpPVwibG9hZEl0ZW1zKCRldmVudClcIj5cclxuICAgKiAgIDxuZy10ZW1wbGF0ZSBsZXQtaXRlbXM9XCJpdGVtc1wiPlxyXG4gICAqICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMgZWxzZSBub0l0ZW1zXCI+XHJcbiAgICogICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbnVtIG9mIGl0ZW1zOyB0cmFja0J5OiBudW1cIj5yb3cgbnVtYmVyOiB7eyBudW0gfX08L2xpPlxyXG4gICAqICAgICA8L2Rpdj5cclxuICAgKiAgICAgPG5nLXRlbXBsYXRlICNub0l0ZW1zPkxvYWRpbmc8L25nLXRlbXBsYXRlPlxyXG4gICAqICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgKiA8L25ndWktdmlydHVhbC1saXN0PlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBib3R0b21JbnZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKiogVGhlIGxhc3QgTmd1aUludmlld1BhZ2VDb21wb25lbnQgYmVpbmcgaW5zZXJ0ZWQgKi9cclxuICBpbnZpZXdQYWdlOiBDb21wb25lbnRSZWY8Tmd1aUludmlld1BhZ2VDb21wb25lbnQ+O1xyXG4gIF9mb2N1c2VkID0gZmFsc2U7XHJcbiAgLyoqIEluZGljYXRlcyBpZiBhIHBhZ2UgaXMgc3RpbGwgbG9hZGluZyAqL1xyXG4gIGlzTGlzdExvYWRpbmc6IGJvb2xlYW47XHJcbiAgaW52aWV3UGFnZXM6IEFycmF5PENvbXBvbmVudFJlZjxOZ3VpSW52aWV3UGFnZUNvbXBvbmVudD4+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHB1YmxpYyBkeW5hbWljQ29tcG9uZW50U2VydmljZTogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UsXHJcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge31cclxuXHJcbiAgLyoqIENoZWNrIGlmIG5lY2Vzc2FyeSBpbnB1dCBhbmQgb3V0cHV0IGlzIHByb3ZpZGVkICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnRlbXBsYXRlIHx8ICF0aGlzLmJvdHRvbUludmlldy5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJzxuZ3VpLXZpcnR1YWwtbGlzdD4gcmVxdWlyZXMgW3RlbXBsYXRlXSBhbmQge2JvdHRvbUludmlldyknKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGJvdHRvbSBpcyBpbnZpZXcgcG9ydCwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcclxuICAgKiBJdCB3aWxsIGluc2VydCBhIGR5bmFtaWNhbGwgY3JlYXRlZCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCB3aXRoIHRoZSBnaXZlbiB0ZW1wbGF0ZS5cclxuICAgKiBJdCB3aWxsIGFsc28gZmlyZXMgKGJvdHRvbUludmlldykgZXZlbnQsIHNvIHRoYXQgdXNlciBjYW4gZmlsbCB1cCBpdGVtcyBmb3IgdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0xpc3RMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmludmlld1BhZ2UgPVxyXG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlQ29tcG9uZW50KE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCB0aGlzLnBhZ2VzUmVmKTtcclxuICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5pbnNlcnRDb21wb25lbnQodGhpcy5pbnZpZXdQYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICAgIHRoaXMuaW52aWV3UGFnZXMucHVzaCh0aGlzLmludmlld1BhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5ib3R0b21JbnZpZXcuZW1pdCh0aGlzKTsgLy8gZmlyZSBldmVudCwgc28gdGhhdCB1c2VyIGNhbiBsb2FkIGl0ZW1zXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnQWxyZWFkeSBhIHBhZ2UgYmVpbmcgaW5zZXJ0ZWQsIHNraXBwaW5nIGFkZGluZyBhIHBhZ2UnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHNldCBpdGVtcyBvZiBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudFxyXG4gIGFkZExpc3QoaXRlbXM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIHRoaXMuaXNMaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgY29uc29sZS5sb2coJz4+Pj4+PiBOZ3VpVmlydHVhbExpc3RDb21wb25lbnQuYWRkTGlzdCgpIGlzIGNhbGxlZCgpJyk7XHJcbiAgICB0aGlzLmludmlld1BhZ2UuaW5zdGFuY2Uuc2V0SXRlbXMoaXRlbXMpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5vTWF0Y2hGb3VuZCB7XHJcbiAgaHRtbCA9ICdObyBNYXRjaCBGb3VuZCc7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5vbmVTZWxlY3Qge1xyXG4gIGh0bWwgPSAnU2VsZWN0JztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tICcuLi8uLi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50JztcclxuaW1wb3J0IHsgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb01hdGNoRm91bmQgfSBmcm9tICcuL25vLW1hdGNoLWZvdW5kJztcclxuaW1wb3J0IHsgTm9uZVNlbGVjdCB9IGZyb20gJy4vbm9uZS1zZWxlY3QnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1hdXRvY29tcGxldGUnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXNSZWFkeVwiIGNsYXNzPVwibmd1aS1hdXRvY29tcGxldGVcIj5cclxuICAgICAgPGRpdiAjcGFnZXM+PC9kaXY+XHJcbiAgICAgIDxuZ3VpLWludmlldyAoaW52aWV3KT1cImFkZE1vcmVQYWdlcygpXCI+PC9uZ3VpLWludmlldz5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge3Bvc2l0aW9uOiBhYnNvbHV0ZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgbWF4LWhlaWdodDogMzAwcHg7IG92ZXJmbG93OiBhdXRvfVxyXG4gICAgLm5ndWktYXV0b2NvbXBsZXRlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgcGFkZGluZzogNHB4IH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCBleHRlbmRzIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZm9yOiBzdHJpbmc7IC8vIGlucHV0IHRhZyBpZFxyXG4gIEBJbnB1dCgpIG1pbklucHV0Q2hhcnMgPSAxO1xyXG4gIEBJbnB1dCgpIGJsYW5rT3B0aW9uID0gJ1NlbGVjdCBPbmUnO1xyXG4gIEBJbnB1dCgpIG5vTWF0Y2hJdGVtID0gJ05vIE1hdGNoIEZvdW5kJztcclxuXHJcbiAgLyoqIFRlbXBsYXRlIG9mIE5ndWlJbnZpZXdQYWdlLiBBbGxvdyB1c2VycyB0byBkZWZpbmUgdGhlaXIgb3duIHRlbXBsYXRlICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIF9mb2N1c2VkOiBhbnkgPSB7aW5wdXQ6IGZhbHNlLCBsaXN0SXRlbTogZmFsc2V9O1xyXG4gIF9mb2N1c1RpbWVyO1xyXG4gIF9hY1RpbWVyO1xyXG4gIF9zZWxlY3RlZEZyb21MaXN0OiBib29sZWFuO1xyXG4gIF9lc2NhcGVkRnJvbUxpc3Q6IGJvb2xlYW47XHJcbiAgX29yZ0lucHV0VmFsdWU6IHN0cmluZztcclxuICBfcHJldklucHV0VmFsdWU6IHN0cmluZztcclxuICBfbGFzdFNlbGVjdGVkOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgYXV0b2NvbXBsZXRlIGRpc3BsYXkgY29uZGl0aW9uXHJcbiAgICogYXV0b2NvbXBvbGV0ZSBsaXN0IGlzIG9ubHkgdmlzaWJsZVxyXG4gICAqICAgLSB3aGVuIGlucHV0IGVsZW1lbnQgaXMgZm9jdXNlZCBvciBsaXN0IGVsZW1lbnQgaXMgZm9jdXNlZFxyXG4gICAqICAgLSB3aGVuIGlucHV0IHZhbHVlIGhhcyBlbm91Z2h0IGNoYXJhY3RlcnNcclxuICAgKiAgIC0gYW5kIHVzZXIganVzdCBkaWQgbm90IHNlbGVjdGVkIG9yIGVzY2FwZWRcclxuICAgKi9cclxuICBnZXQgaXNSZWFkeSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkT3JFc2NhcGVkID0gdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCB8fCB0aGlzLl9lc2NhcGVkRnJvbUxpc3Q7XHJcbiAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5fZm9jdXNlZC5pbnB1dCB8fCB0aGlzLl9mb2N1c2VkLmxpc3RJdGVtO1xyXG4gICAgY29uc3QgbWluQ2hhcnMgPSB0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoID49IHRoaXMubWluSW5wdXRDaGFycztcclxuXHJcbiAgICByZXR1cm4gKCFzZWxlY3RlZE9yRXNjYXBlZCAmJiBmb2N1c2VkICYmIG1pbkNoYXJzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5mb3IpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB0aGlzLnBvc2l0aW9uVGhpc1VuZGVySW5wdXRFbCgpO1xyXG5cclxuICAgIGZyb21FdmVudCh0aGlzLmlucHV0RWwsICdrZXl1cCcpLnN1YnNjcmliZSh0aGlzLm9uSW5wdXRFbEtleXVwLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vbklucHV0RWxGb2N1c2VkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLm9uSW5wdXRFbEJsdXJyZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkLnN1YnNjcmliZSh0aGlzLm9uU2VsZWN0ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmVzY2FwZWQuc3Vic2NyaWJlKHRoaXMub25Fc2NhcGVkLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZCh2YWx1ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIHRoaXMuX2xhc3RTZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpOyAgICAvLyBmb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vblNlbGVjdGVkKCkgaXMgY2FsbGVkJywgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25Fc2NhcGVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgaWYgKCF0aGlzLl9sYXN0U2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gdGhpcy5fb3JnSW5wdXRWYWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTsgLy8gZm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgY29uc29sZS5sb2coJ05ndWlBdXRvQ29tcGxldGVDb21wb25lbnQub25Fc2NhcGVkKCkgaXMgY2FsbGVkJyk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0RWxGb2N1c2VkKGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnTmd1aUF1dG9Db21wbGV0ZUNvbXBvbmVudC5vbklucHV0RWxGb2N1c2VkKCkgaXMgY2FsbGVkJywgZXZlbnQpO1xyXG4gICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuX29yZ0lucHV0VmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMuX29yZ0lucHV0VmFsdWUgPSB0aGlzLmlucHV0RWwudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wcmV2SW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIHRoaXMuc2V0Rm9jdXNlZCgnaW5wdXQnLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRFbEJsdXJyZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldEZvY3VzZWQoJ2lucHV0JywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJMaXN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlcy5mb3JFYWNoKGNvbXBSZWYgPT4ge1xyXG4gICAgICBjb21wUmVmLmRlc3Ryb3koKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5pbnZpZXdQYWdlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEVsS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdOZ3VpQXV0b0NvbXBsZXRlQ29tcG9uZW50Lm9uSW5wdXRLZXl1cCgpIGlzIGNhbGxlZCcsIGV2ZW50LmtleSk7XHJcbiAgICBjb25zdCBmaXJzdExpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCduZ3VpLWxpc3QtaXRlbScpO1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgIGlmIChmaXJzdExpc3QpIHtcclxuICAgICAgICBmaXJlRXZlbnQoZmlyc3RMaXN0LCAna2V5dXAnLCB7a2V5OiBldmVudC5rZXl9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9uRXNjYXBlZCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKChldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nIHx8IGV2ZW50LmtleSA9PT0gJ0Fycm93UmlnaHQnKSAmJiBmaXJzdExpc3QpIHtcclxuICAgICAgZmlyc3RMaXN0LmZvY3VzKCk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcclxuICAgICAgLy9cclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dEVsLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbklucHV0Q2hhcnMpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9lc2NhcGVkRnJvbUxpc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRBdXRvY29tcGxldGVMaXN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ29tcGxldGUgdGhlIGZpcnN0IHBhZ2Ugb2YgYXV0b2NvbXBsZXRlICovXHJcbiAgYWRkQXV0b2NvbXBsZXRlTGlzdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FjVGltZXIpO1xyXG4gICAgICB0aGlzLl9hY1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc0xpc3RMb2FkaW5nID0gZmFsc2U7IC8vID8/Pz8/Pz8vXHJcbiAgICAgICAgdGhpcy5fcHJldklucHV0VmFsdWUgPSB0aGlzLmlucHV0RWwudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fZXNjYXBlZEZyb21MaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRGcm9tTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRBbkludmlld1BhZ2VUb1BhZ2VzKCk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ29tcGxldGUgYWZ0ZXIgdGhlIGZpcnN0IHBhZ2Ugb2YgYXV0b2NvbXBsZXRlIHdoZW4gaXQgc2Nyb2xscyB0byB0aGUgYm90dG9tICovXHJcbiAgYWRkTW9yZVBhZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaW52aWV3UGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYWRkQW5JbnZpZXdQYWdlVG9QYWdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Rm9jdXNlZChlbFR5cGU6ICdpbnB1dCcgfCAnbGlzdEl0ZW0nLCB2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ZvY3VzVGltZXIpO1xyXG4gICAgICB0aGlzLl9mb2N1c2VkID0ge2lucHV0OiBmYWxzZSwgbGlzdEl0ZW06IGZhbHNlfTtcclxuICAgICAgdGhpcy5fZm9jdXNlZFtlbFR5cGVdID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2ZvY3VzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkW2VsVHlwZV0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7IC8vIGZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBvc2l0aW9uVGhpc1VuZGVySW5wdXRFbCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRoaXNFbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgdGhpc0lucHV0RWxCQ1IgPSB0aGlzLmlucHV0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB0b3AgPSB0aGlzSW5wdXRFbEJDUi50b3AgKyB0aGlzSW5wdXRFbEJDUi5oZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXNFbCwgJ2xlZnQnLCBgJHt0aGlzSW5wdXRFbEJDUi5sZWZ0fXB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXNFbCwgJ3RvcCcsIGAke3RvcH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzRWwsICdtaW5XaWR0aCcsIGAke3RoaXNJbnB1dEVsQkNSLndpZHRofXB4YCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaXRlbXMgb2YgTmd1aUludmlld1BhZ2VDb21wb25lbnRcclxuICBhZGRMaXN0KGl0ZW1zOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQuYWRkTGlzdCgpIGlzIGNhbGxlZCgpJyk7XHJcbiAgICB0aGlzLmlzTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBUT0RPOiAuLi4uLi4uLiBmb3IgMXN0IHBhZ2Ugb25seSwgc2hvdyBubyBtYXRjaCBmb3VuZCBvciBibGFuayBvcHRpb25cclxuICAgIGxldCBub01hdGNoSXRlbTogYW55O1xyXG4gICAgbGV0IGJsYW5rSXRlbTogYW55ID0ge307XHJcbiAgICBpZiAodGhpcy5pbnZpZXdQYWdlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgaWYgKHRoaXMubm9NYXRjaEl0ZW0gJiYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApKSB7IC8vIGFkZCBubyBtYXRjaCBpdGVtXHJcbiAgICAgICAgbm9NYXRjaEl0ZW0gPSBuZXcgTm9NYXRjaEZvdW5kKCk7XHJcbiAgICAgICAgYmxhbmtJdGVtLmh0bWwgPSB0aGlzLm5vTWF0Y2hJdGVtO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYmxhbmtPcHRpb24pIHtcclxuICAgICAgICBibGFua0l0ZW0gPSBuZXcgTm9uZVNlbGVjdCgpO1xyXG4gICAgICAgIGJsYW5rSXRlbS5odG1sID0gdGhpcy5ibGFua09wdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFsbEl0ZW1zID0gW10uY29uY2F0KG5vTWF0Y2hJdGVtLCBibGFua0l0ZW0sIGl0ZW1zKS5maWx0ZXIoeCA9PiB4KTtcclxuICAgIHRoaXMuaW52aWV3UGFnZS5pbnN0YW5jZS5zZXRJdGVtcyhhbGxJdGVtcyk7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1saXN0JyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdERpcmVjdGl2ZSB7XHJcbiAgLyoqIEZpcmVkIHdoZW4gY2hpbGQgYDxuZ3VpLWxpc3QtaXRlbT5gIGlzIHNlbGVjdGVkICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogRmlyZWQgd2hlbiBgRVNDYCBrZXkgaXMgcHJlc3NlZCBmcm9tIGA8bmd1aS1saXN0LWl0ZW0+YCAqL1xyXG4gIEBPdXRwdXQoKSBlc2NhcGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ3VpTGlzdERpcmVjdGl2ZSB9IGZyb20gJy4vbmd1aS1saXN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTm9uZVNlbGVjdCB9IGZyb20gJy4vbm9uZS1zZWxlY3QnO1xyXG5pbXBvcnQgeyBOb01hdGNoRm91bmQgfSBmcm9tICcuL25vLW1hdGNoLWZvdW5kJztcclxuXHJcbi8vIHRhYmluZGV4LCBrZXlkb3duLCBrZXl1cChFTlRFUiwgRVNDKSwgY2xpY2tcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWxpc3QtaXRlbScgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoJ2l0ZW0nKSBvYmplY3Q6IGFueTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG5cclxuICBuZXh0U2libGluZzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJldlNpYmxpbmc6IEhUTUxFbGVtZW50O1xyXG4gIHBhcmVudExpc3RDb21wOiBOZ3VpTGlzdERpcmVjdGl2ZSB8IE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudCB8IE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBsaXN0RGlyZWN0aXZlOiBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSB2aXJ0dWFsTGlzdENvbXBvbmVudDogTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50LFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIGF1dG9jb21wbGV0ZUNvbXBvbmVudDogTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgdGhpcy5wYXJlbnRMaXN0Q29tcCA9IHRoaXMubGlzdERpcmVjdGl2ZSB8fCB0aGlzLnZpcnR1YWxMaXN0Q29tcG9uZW50IHx8IHRoaXMuYXV0b2NvbXBsZXRlQ29tcG9uZW50O1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudExpc3RDb21wKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCduZ3VpLWxpc3QtaXRlbSByZXF1aXJlcyBwYXJlbnQgb2Ygbmd1aS1saXN0LCBuZ3VpLXZpcnR1YWwtbGlzdCwgb3Igbmd1aS1hdXRvY29tcGxldGUuJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgTm9uZVNlbGVjdCkgfHwgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgTm9NYXRjaEZvdW5kKSkge1xyXG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMub2JqZWN0Lmh0bWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBoYW5kbGVzIGtleWJvYXJkIHVwLCBkb3duLCBsZWZ0LCByaWdodFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBrZXlkb3duKGV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzTGlzdEl0ZW0gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcclxuICAgIGNvbnN0IHBhcmVudExpc3RFbCA9IHRoaXMucGFyZW50TGlzdENvbXAuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgbGlzdEl0ZW1zOiBBcnJheTxIVE1MRWxlbWVudD5cclxuICAgICAgPSBBcnJheS5mcm9tKHBhcmVudExpc3RFbC5xdWVyeVNlbGVjdG9yQWxsKCduZ3VpLWxpc3QtaXRlbScpKTtcclxuICAgIGNvbnN0IGxpc3RJdGVtTmR4ID0gbGlzdEl0ZW1zLmluZGV4T2YodGhpc0xpc3RJdGVtKTtcclxuICAgIGNvbnN0IG5leHRMaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbU5keCArIDFdIHx8IGxpc3RJdGVtc1swXTtcclxuICAgIGNvbnN0IHByZXZMaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbU5keCAtIDFdIHx8IGxpc3RJdGVtc1tsaXN0SXRlbXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICBjYXNlIDM3OiBjYXNlIDM4OiAvLyB1cCBhcnJvdywgbGVmdCBhcnJvd1xyXG4gICAgICBwcmV2TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM5OiBjYXNlIDQwOiAvLyBkb3duIGFycm93LCByaWdodCBhcnJvd1xyXG4gICAgICBuZXh0TGlzdEl0ZW0uZm9jdXMoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGhhbmRsZXMga2V5Ym9hcmQgZW50ZXIoMTMpLCBlc2MoMjcpXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKSBrZXl1cChldmVudCk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcC5zZWxlY3RlZC5lbWl0KHRoaXMub2JqZWN0KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdFc2NhcGUnOlxyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wLmVzY2FwZWQuZW1pdCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBtb3VzZWRvd24oKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhcmVudExpc3RDb21wLnNlbGVjdGVkLmVtaXQodGhpcy5vYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKSBmb2N1c2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50TGlzdENvbXBbJ3NldEZvY3VzZWQnXSkge1xyXG4gICAgICB0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10oJ2xpc3RJdGVtJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgYmx1cnJlZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhcmVudExpc3RDb21wWydzZXRGb2N1c2VkJ10pIHtcclxuICAgICAgdGhpcy5wYXJlbnRMaXN0Q29tcFsnc2V0Rm9jdXNlZCddKCdsaXN0SXRlbScsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05ndWlBdXRvY29tcGxldGVDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aUxpc3RJdGVtRGlyZWN0aXZlfSBmcm9tICcuL3NyYy9uZ3VpLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge05ndWlMaXN0RGlyZWN0aXZlfSBmcm9tICcuL3NyYy9uZ3VpLWxpc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtOZ3VpSW52aWV3UGFnZUNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS1pbnZpZXctcGFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlWaXJ0dWFsTGlzdENvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS12aXJ0dWFsLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpSW52aWV3TW9kdWxlfSBmcm9tICcuLi9uZ3VpLWludmlldy9uZ3VpLWludmlldy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHtOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LCBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUsIE5ndWlMaXN0RGlyZWN0aXZlLCBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCwgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50fTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmd1aUludmlld01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld1BhZ2VDb21wb25lbnQsXHJcbiAgICBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSxcclxuICAgIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LFxyXG4gICAgTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUsXHJcbiAgICBOZ3VpVmlydHVhbExpc3RDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05ndWlJbnZpZXdQYWdlQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUxpc3RNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ25ndWlIaWdobGlnaHQnIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh0ZXh0OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCByZXQgPSB0ZXh0O1xyXG4gICAgaWYgKHNlYXJjaCkge1xyXG4gICAgICBjb25zdCByZSAgPSBuZXcgUmVnRXhwKHNlYXJjaCwgJ2lnJyk7XHJcbiAgICAgIHJldCA9IHRleHQucmVwbGFjZShyZSwgbWF0Y2ggPT4gYDxzcGFuIGNsYXNzPVwibmd1aS1oaWdobGlnaHRcIj4ke21hdGNofTwvc3Bhbj5gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogd2luZG93LmtvbnNvbGUgYWx0ZXJuYXRpdmVcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgXHJcbiAqIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2Vycm9yJyk7XHJcbiAqIGtvbndvbGUubG9nKDEsMiwzLDQsNSk7XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIGtvbnNvbGUgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgLyoqIGFsbCBsb2cgbGV2ZWxzICovXHJcbiAgc3RhdGljIExPR19MRVZFTFMgPSB7XHJcbiAgICBBTEw6ICAgcGFyc2VJbnQoJzAwMDAwJywgMiksXHJcbiAgICBERUJVRzogcGFyc2VJbnQoJzAwMDAxJywgMiksXHJcbiAgICBMT0c6ICAgcGFyc2VJbnQoJzAwMDEwJywgMiksXHJcbiAgICBJTkZPOiAgcGFyc2VJbnQoJzAwMTAwJywgMiksXHJcbiAgICBXQVJOOiAgcGFyc2VJbnQoJzAxMDAwJywgMiksXHJcbiAgICBFUlJPUjogcGFyc2VJbnQoJzEwMDAwJywgMiksXHJcbiAgICBOT05FOiAgcGFyc2VJbnQoJzExMTExJywgMilcclxuICB9O1xyXG5cclxuICAvKiogY3VycmVudCBsb2cgbGV2ZWwgc2V0IGJ5IHNldExvZ0xldmVsLCBkZWZhdWx0ICdJTkZPJyAqL1xyXG4gIHN0YXRpYyBsb2dMZXZlbCA9ICdJTkZPJztcclxuXHJcbiAgLyoqIHJldHVybnMgaWYgaXQgc2hvdWxkIGNhbGwgYHdpbmRvdy5jb25zb2xlYCBvciBub3QgKi9cclxuICBzdGF0aWMgdG9Mb2cocGFyYW0pOiBib29sZWFuIHsgLy8gcmV0dXJucyB0byBsb2cgb3Igbm90XHJcbiAgICBjb25zdCByZXN0cmljdGlvbk51bSA9IHRoaXMuTE9HX0xFVkVMU1t0aGlzLmxvZ0xldmVsXTtcclxuICAgIGNvbnN0IHJlcXVpcmVkTnVtID0gdGhpcy5MT0dfTEVWRUxTW3BhcmFtXTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWlyZWROdW0gPiByZXN0cmljdGlvbk51bTtcclxuICB9XHJcblxyXG4gIC8qKiBzZXRzIHRoZSBjdXJyZW50IGxvZyBsZXZlbCAqL1xyXG4gIHN0YXRpYyBzZXRMb2dMZXZlbChsb2dMZXZlbDogc3RyaW5nKTogYW55IHtcclxuICAgIGxvZ0xldmVsID0gbG9nTGV2ZWwudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGxvZ0xldmVscyA9IE9iamVjdC5rZXlzKHRoaXMuTE9HX0xFVkVMUyk7XHJcbiAgICBpZiAobG9nTGV2ZWxzLmluZGV4T2YobG9nTGV2ZWwpID4gLTEpIHtcclxuICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHsgLy8gZm9yIGJyb3dzZXIgZW52LlxyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdrb25zb2xlLkxPR19MRVZFTCcsIGxvZ0xldmVsKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciwgaW52YWxpZCBsb2dMZXZlbCwgaXQgbXVzdCBiZSBvbmUgb2YgJHtsb2dMZXZlbHN9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZGVidWcoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZGVidWdgICovXHJcbiAgc3RhdGljIGRlYnVnKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdERUJVRycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmxvZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBsb2dgICovXHJcbiAgc3RhdGljIGxvZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnTE9HJykpIHtcclxuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5pbmZvKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGluZm9gICovXHJcbiAgc3RhdGljIGluZm8oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0lORk8nKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLndhcm4oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgd2FybmAgKi9cclxuICBzdGF0aWMgd2FybiguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnV0FSTicpKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmVycm9yKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGVycm9yYCAqL1xyXG4gIHN0YXRpYyBlcnJvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnRVJST1InKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdhbGwnKTtcclxuLy8ga29uc29sZS5kZWJ1ZygneWVzJyk7XHJcbi8vIGtvbnNvbGUubG9nKCd5ZXMnKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdub25lJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcignbm8nKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2luZm8nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnV0FSTicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ0VSUk9SJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUhpZ2hsaWdodFBpcGV9IGZyb20gJy4vc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUnO1xyXG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlfSBmcm9tICcuL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsga29uc29sZSB9IGZyb20gJy4vc3JjL2tvbnNvbGUnO1xyXG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tICcuL3NyYy9maXJlLWV2ZW50JztcclxuXHJcbmV4cG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2UsIE5ndWlIaWdobGlnaHRQaXBlLCBrb25zb2xlLCBmaXJlRXZlbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05ndWlIaWdobGlnaHRQaXBlXSxcclxuICBleHBvcnRzOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIHByb3ZpZGVyczogW0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVV0aWxzTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3VpSW52aWV3TW9kdWxlfSBmcm9tICcuL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XHJcbmltcG9ydCB7Tmd1aUxpc3RNb2R1bGV9IGZyb20gJy4vbmd1aS1saXN0L25ndWktbGlzdC5tb2R1bGUnO1xyXG5pbXBvcnQge05ndWlVdGlsc01vZHVsZX0gZnJvbSAnLi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTmd1aUludmlld01vZHVsZSxcclxuICAgIE5ndWlMaXN0TW9kdWxlLFxyXG4gICAgTmd1aVV0aWxzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlLFxyXG4gICAgTmd1aUxpc3RNb2R1bGUsXHJcbiAgICBOZ3VpVXRpbHNNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpQ29tbW9uTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIklucHV0IiwiT3V0cHV0IiwiRGlyZWN0aXZlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJJbmplY3RhYmxlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiUmVuZGVyZXIyIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJWaWV3Q2hpbGQiLCJWaWV3Q29udGFpbmVyUmVmIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJmcm9tRXZlbnQiLCJPcHRpb25hbCIsIkhvc3QiLCJIb3N0TGlzdGVuZXIiLCJQaXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7OztBQXlCQTtRQStCRSw2QkFDYyxPQUFtQixFQUNFLFVBQWU7WUFEcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtZQUNFLGVBQVUsR0FBVixVQUFVLENBQUs7Ozs7WUFwQnpDLG9CQUFlLEdBQTZCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUM7Ozs7OztZQU8xRixnQkFBVyxHQUFHLElBQUksQ0FBQztZQUVsQixXQUFNLEdBQTRDLElBQUlBLGlCQUFZLEVBQUUsQ0FBQztZQUNyRSxjQUFTLEdBQTRDLElBQUlBLGlCQUFZLEVBQUUsQ0FBQzs7OztZQUlsRixhQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1lBRWpCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztTQUt4Qjs7Ozs7O1FBR0Qsc0NBQVE7Ozs7WUFBUjtnQkFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDckM7Z0JBRUQsSUFBSUMsd0JBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVB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