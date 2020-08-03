import { __decorate, __metadata, __param, __extends } from 'tslib';
import { EventEmitter, ElementRef, Inject, PLATFORM_ID, ContentChild, TemplateRef, Input, Output, Component, Directive, NgModule, ComponentFactoryResolver, Injectable, Renderer2, ChangeDetectorRef, ViewChild, ViewContainerRef, Optional, Host, HostListener, Pipe } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';

/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-inview>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /** Controls whether blur effect is applied to a component with less than 80% intersection ratio.
         * Only applies when there are no "inview" event handlers defined.
         **/
        this.blurEnabled = true;
        this.inview = new EventEmitter();
        this.notInview = new EventEmitter();
        /** indicates that this element is in viewport */
        this.isInview = false;
        /** indicates that this element is 80% in viewport. Used by the default callback */
        this.once80PctVisible = false;
    }
    /** Starts IntersectionObserver */
    NguiInviewComponent.prototype.ngOnInit = function () {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** stop IntersectionObserver */
    NguiInviewComponent.prototype.ngOnDestroy = function () {
        this.observer.disconnect();
    };
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    NguiInviewComponent.prototype.handleIntersect = function (entries) {
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
    NguiInviewComponent.prototype.defaultInviewHandler = function (entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            var opacity = entry.intersectionRatio * (1 / 0.8);
            var blur_1 = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            var filter = "blur(" + blur_1 + "px)";
            Object.assign(entry.target.style, { opacity: opacity, filter: filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    };
    NguiInviewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        ContentChild(TemplateRef, { static: true }),
        __metadata("design:type", TemplateRef)
    ], NguiInviewComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "observerOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "blurEnabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewComponent.prototype, "inview", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewComponent.prototype, "notInview", void 0);
    NguiInviewComponent = __decorate([
        Component({
            selector: 'ngui-inview',
            template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
            styles: [':host {display: block;}']
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], NguiInviewComponent);
    return NguiInviewComponent;
}());

/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /** Event that will be fired when in viewport */
        this.nguiInview = new EventEmitter();
        /** Event that will be fired when out of  viewport */
        this.nguiOutview = new EventEmitter();
    }
    /** Starts IntersectionObserver */
    NguiInviewDirective.prototype.ngOnInit = function () {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** Stops IntersectionObserver */
    NguiInviewDirective.prototype.ngOnDestroy = function () {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    };
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
     */
    NguiInviewDirective.prototype.handleIntersect = function (entries) {
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
    NguiInviewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewDirective.prototype, "observerOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewDirective.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewDirective.prototype, "nguiInview", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewDirective.prototype, "nguiOutview", void 0);
    NguiInviewDirective = __decorate([
        Directive({
            selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], NguiInviewDirective);
    return NguiInviewDirective;
}());

var NguiInviewModule = /** @class */ (function () {
    function NguiInviewModule() {
    }
    NguiInviewModule = __decorate([
        NgModule({
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
        })
    ], NguiInviewModule);
    return NguiInviewModule;
}());

/**
 * fire the given event with options on the element
 * @example
 * fireEvent(el, 'click');
 * fireEvent(el, 'keypress', {key: 'Enter'});
 */
function fireEvent(el, type, options) {
    if (options === void 0) { options = {}; }
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
    DynamicComponentService.prototype.createComponent = function (component, into) {
        this.rootViewContainer = into || this.rootViewContainer;
        var factory = this.factoryResolver.resolveComponentFactory(component);
        return factory.create(this.rootViewContainer.parentInjector);
    };
    /**
     * insert component
     */
    DynamicComponentService.prototype.insertComponent = function (componentRef) {
        var compId = "ngui-dyn-" + (Math.floor(Math.random() * Math.pow(10, 7)) + Math.pow(10, 6));
        componentRef.location.nativeElement.setAttribute('id', compId);
        componentRef.instance.id = compId;
        this.rootViewContainer.insert(componentRef.hostView);
        return componentRef.instance;
    };
    DynamicComponentService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
    ]; };
    DynamicComponentService = __decorate([
        Injectable(),
        __param(0, Inject(ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], DynamicComponentService);
    return DynamicComponentService;
}());

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
        /** Indicates that the page of out of viewport */
        this.outView = false;
        /** The copy of items. This is set when this element is out of viewport */
        this.itemsBackup = [];
    }
    /**
     * Restore items when in viewport, so that elements are rendered
     */
    NguiInviewPageComponent.prototype.restoreItems = function () {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    };
    NguiInviewPageComponent.prototype.ngOnInit = function () {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    };
    NguiInviewPageComponent.prototype.ngOnDestroy = function () {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    };
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    NguiInviewPageComponent.prototype.emptyItems = function () {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
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
    NguiInviewPageComponent.prototype.setItems = function (items) {
        if (!this.destroyed) {
            console.log('NguiInviewPageComponent.setItems() is called with', items);
            this.items = items;
            this.cdRef.detectChanges();
        }
    };
    NguiInviewPageComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        ContentChild(TemplateRef, { static: true }),
        __metadata("design:type", TemplateRef)
    ], NguiInviewPageComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NguiInviewPageComponent.prototype, "items", void 0);
    NguiInviewPageComponent = __decorate([
        Component({
            selector: 'ngui-inview-page',
            template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            ChangeDetectorRef])
    ], NguiInviewPageComponent);
    return NguiInviewPageComponent;
}());

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
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
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
    NguiVirtualListComponent.prototype.ngAfterViewInit = function () {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    };
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
     */
    NguiVirtualListComponent.prototype.addAnInviewPageToPages = function () {
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
    NguiVirtualListComponent.prototype.addList = function (items) {
        this.isListLoading = false;
        console.log('>>>>>> NguiVirtualListComponent.addList() is called()');
        this.inviewPage.instance.setItems(items);
    };
    NguiVirtualListComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: DynamicComponentService },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        ViewChild('pages', { read: ViewContainerRef, static: false }),
        __metadata("design:type", ViewContainerRef)
    ], NguiVirtualListComponent.prototype, "pagesRef", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], NguiVirtualListComponent.prototype, "template", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "selected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "escaped", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiVirtualListComponent.prototype, "bottomInview", void 0);
    NguiVirtualListComponent = __decorate([
        Component({
            selector: 'ngui-virtual-list',
            template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef,
            DynamicComponentService,
            ChangeDetectorRef])
    ], NguiVirtualListComponent);
    return NguiVirtualListComponent;
}());

var NoMatchFound = /** @class */ (function () {
    function NoMatchFound() {
        this.html = 'No Match Found';
    }
    return NoMatchFound;
}());

var NoneSelect = /** @class */ (function () {
    function NoneSelect() {
        this.html = 'Select';
    }
    return NoneSelect;
}());

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
        get: function () {
            var selectedOrEscaped = this._selectedFromList || this._escapedFromList;
            var focused = this._focused.input || this._focused.listItem;
            var minChars = this.inputEl.value.length >= this.minInputChars;
            return (!selectedOrEscaped && focused && minChars);
        },
        enumerable: true,
        configurable: true
    });
    NguiAutocompleteComponent.prototype.ngOnInit = function () {
        this.inputEl = document.querySelector('#' + this.for); // tslint:disable-line
        this.positionThisUnderInputEl();
        fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
        this.inputEl.addEventListener('focus', this.onInputElFocused.bind(this));
        this.inputEl.addEventListener('blur', this.onInputElBlurred.bind(this));
        this.selected.subscribe(this.onSelected.bind(this));
        this.escaped.subscribe(this.onEscaped.bind(this));
    };
    NguiAutocompleteComponent.prototype.onSelected = function (value) {
        this._selectedFromList = true;
        this.inputEl.focus();
        this._lastSelected = value;
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onSelected() is called', value);
    };
    NguiAutocompleteComponent.prototype.onEscaped = function () {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
        console.log('NguiAutoCompleteComponent.onEscaped() is called');
    };
    NguiAutocompleteComponent.prototype.onInputElFocused = function (event) {
        console.log('NguiAutoCompleteComponent.onInputElFocused() is called', event);
        this.isListLoading = false;
        if (typeof this._orgInputValue === 'undefined') {
            this._orgInputValue = this.inputEl.value;
        }
        this._prevInputValue = this.inputEl.value;
        this.setFocused('input', true);
    };
    NguiAutocompleteComponent.prototype.onInputElBlurred = function () {
        this.setFocused('input', false);
    };
    NguiAutocompleteComponent.prototype.clearList = function () {
        this.inviewPages.forEach(function (compRef) {
            compRef.destroy();
        });
        this.inviewPages = [];
    };
    NguiAutocompleteComponent.prototype.onInputElKeyup = function (event) {
        console.log('NguiAutoCompleteComponent.onInputKeyup() is called', event.key);
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
    NguiAutocompleteComponent.prototype.addAutocompleteList = function () {
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
    NguiAutocompleteComponent.prototype.addMorePages = function () {
        if (this.inviewPages.length) {
            this.addAnInviewPageToPages();
        }
    };
    NguiAutocompleteComponent.prototype.setFocused = function (elType, val) {
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
    NguiAutocompleteComponent.prototype.positionThisUnderInputEl = function () {
        var thisEl = this.element.nativeElement;
        var thisInputElBCR = this.inputEl.getBoundingClientRect();
        var top = thisInputElBCR.top + thisInputElBCR.height + window.scrollY;
        this.renderer.setStyle(thisEl, 'left', thisInputElBCR.left + "px");
        this.renderer.setStyle(thisEl, 'top', top + "px");
        this.renderer.setStyle(thisEl, 'minWidth', thisInputElBCR.width + "px");
    };
    // set items of NguiInviewPageComponent
    NguiAutocompleteComponent.prototype.addList = function (items) {
        console.log('>>>>>> NguiAutocompleteComponent.addList() is called()');
        this.isListLoading = false;
        // TODO: ........ for 1st page only, show no match found or blank option
        var noMatchItem;
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
        var allItems = [].concat(noMatchItem, blankItem, items).filter(function (x) { return x; });
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
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
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], NguiAutocompleteComponent.prototype, "template", void 0);
    NguiAutocompleteComponent = __decorate([
        Component({
            selector: 'ngui-autocomplete',
            template: "\n    <div *ngIf=\"isReady\" class=\"ngui-autocomplete\">\n      <div #pages></div>\n      <ngui-inview (inview)=\"addMorePages()\"></ngui-inview>\n    </div>\n  ",
            styles: ["\n    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }\n  "]
        })
    ], NguiAutocompleteComponent);
    return NguiAutocompleteComponent;
}(NguiVirtualListComponent));

var NguiListDirective = /** @class */ (function () {
    function NguiListDirective(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new EventEmitter();
    }
    NguiListDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiListDirective.prototype, "selected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiListDirective.prototype, "escaped", void 0);
    NguiListDirective = __decorate([
        Directive({
            selector: 'ngui-list' // tslint:disable-line
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], NguiListDirective);
    return NguiListDirective;
}());

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
    NguiListItemDirective.prototype.ngOnInit = function () {
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
    NguiListItemDirective.prototype.keydown = function (event) {
        var thisListItem = this.el.nativeElement;
        var keyCode = event.which || event.keyCode;
        var parentListEl = this.parentListComp.element.nativeElement;
        var listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        var listItemNdx = listItems.indexOf(thisListItem);
        var nextListItem = listItems[listItemNdx + 1] || listItems[0];
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
    NguiListItemDirective.prototype.keyup = function (event) {
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
    NguiListItemDirective.prototype.mousedown = function () {
        this.parentListComp.selected.emit(this.object);
    };
    NguiListItemDirective.prototype.focused = function () {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    };
    NguiListItemDirective.prototype.blurred = function () {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', false);
        }
    };
    NguiListItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef },
        { type: NguiListDirective, decorators: [{ type: Optional }, { type: Host }] },
        { type: NguiVirtualListComponent, decorators: [{ type: Optional }, { type: Host }] },
        { type: NguiAutocompleteComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    __decorate([
        Input('item'),
        __metadata("design:type", Object)
    ], NguiListItemDirective.prototype, "object", void 0);
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "keydown", null);
    __decorate([
        HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "keyup", null);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "mousedown", null);
    __decorate([
        HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "focused", null);
    __decorate([
        HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "blurred", null);
    NguiListItemDirective = __decorate([
        Directive({
            selector: 'ngui-list-item' // tslint:disable-line
        }),
        __param(3, Optional()), __param(3, Host()),
        __param(4, Optional()), __param(4, Host()),
        __param(5, Optional()), __param(5, Host()),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            ViewContainerRef,
            NguiListDirective,
            NguiVirtualListComponent,
            NguiAutocompleteComponent])
    ], NguiListItemDirective);
    return NguiListItemDirective;
}());

var NguiListModule = /** @class */ (function () {
    function NguiListModule() {
    }
    NguiListModule = __decorate([
        NgModule({
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
        })
    ], NguiListModule);
    return NguiListModule;
}());

var NguiHighlightPipe = /** @class */ (function () {
    function NguiHighlightPipe() {
    }
    NguiHighlightPipe.prototype.transform = function (text, search) {
        var ret = text;
        if (search) {
            var re = new RegExp(search, 'ig');
            ret = text.replace(re, function (match) { return "<span class=\"ngui-highlight\">" + match + "</span>"; });
        }
        return ret;
    };
    NguiHighlightPipe = __decorate([
        Pipe({ name: 'nguiHighlight' })
    ], NguiHighlightPipe);
    return NguiHighlightPipe;
}());

/**
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 */
var konsole = /** @class */ (function () {
    function konsole() {
    }
    /** returns if it should call `window.console` or not */
    konsole.toLog = function (param) {
        var restrictionNum = this.LOG_LEVELS[this.logLevel];
        var requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    };
    /** sets the current log level */
    konsole.setLogLevel = function (logLevel) {
        logLevel = logLevel.toUpperCase();
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
    konsole.debug = function () {
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
    konsole.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    };
    /** The same as `console.info()` if the current log level is greater than `info` */
    konsole.info = function () {
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
    konsole.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    };
    /** The same as `console.error()` if the current log level is greater than `error` */
    konsole.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    };
    /** all log levels */
    konsole.LOG_LEVELS = {
        ALL: parseInt('00000', 2),
        DEBUG: parseInt('00001', 2),
        LOG: parseInt('00010', 2),
        INFO: parseInt('00100', 2),
        WARN: parseInt('01000', 2),
        ERROR: parseInt('10000', 2),
        NONE: parseInt('11111', 2)
    };
    /** current log level set by setLogLevel, default 'INFO' */
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

var NguiUtilsModule = /** @class */ (function () {
    function NguiUtilsModule() {
    }
    NguiUtilsModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [NguiHighlightPipe],
            exports: [NguiHighlightPipe],
            providers: [DynamicComponentService]
        })
    ], NguiUtilsModule);
    return NguiUtilsModule;
}());

var NguiCommonModule = /** @class */ (function () {
    function NguiCommonModule() {
    }
    NguiCommonModule = __decorate([
        NgModule({
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
        })
    ], NguiCommonModule);
    return NguiCommonModule;
}());

/*
 * Public API Surface of ngui-common
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicComponentService, NguiAutocompleteComponent, NguiCommonModule, NguiHighlightPipe, NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiInviewPageComponent, NguiListDirective, NguiListItemDirective, NguiListModule, NguiUtilsModule, NguiVirtualListComponent, fireEvent, konsole };
//# sourceMappingURL=ngui-common.js.map
