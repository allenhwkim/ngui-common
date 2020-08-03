import { EventEmitter, Component, ElementRef, Inject, PLATFORM_ID, ContentChild, TemplateRef, Input, Output, Directive, NgModule, Injectable, ComponentFactoryResolver, Renderer2, ChangeDetectorRef, ViewChild, ViewContainerRef, Optional, Host, HostListener, Pipe } from '@angular/core';
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
class NguiInviewComponent {
    constructor(element, platformId) {
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
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /** stop IntersectionObserver */
    ngOnDestroy() {
        this.observer.disconnect();
    }
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
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
     */
    defaultInviewHandler(entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            const opacity = entry.intersectionRatio * (1 / 0.8);
            const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
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
            },] }
];
NguiInviewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NguiInviewComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef, { static: true },] }],
    observerOptions: [{ type: Input }],
    options: [{ type: Input }],
    blurEnabled: [{ type: Input }],
    inview: [{ type: Output }],
    notInview: [{ type: Output }]
};

/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
class NguiInviewDirective {
    constructor(element, platformId) {
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
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /** Stops IntersectionObserver */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId) && this.observer) {
            this.observer.disconnect();
        }
    }
    /**
     * Fires (nguiInview) event when this element is in viewport
     *  and fires (nguiOutview) event when this element is not in viewport
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
 * fire the given event with options on the element
 * @example
 * fireEvent(el, 'click');
 * fireEvent(el, 'keypress', {key: 'Enter'});
 */
function fireEvent(el, type, options = {}) {
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
 * Insert a component dynamically using a service
 *
 * ### Example
 * ```ts
 * import { DynamicComponentService } from './dynamic.component.service';
 * import { MyDynamicComponent } from './my-1.component';
 *
 * @Component({
 *   template: ` ... <div #dymamic></div>`
 * })
 * export class MyComponent {
 *   @ViewChild('dynamic', {read:ViewContainerRef}) vcr: ViewContainerRef;
 *
 *   constructor(public dcs: DynamicComponentService) {}
 *
 *   insertComp() {
 *     let compRef = this.dcs.createComponent(MyDynamicComponent, this.vcr);
 *     ths.dcs.insertComonent(cmpRef);
 *     compRef.instance.items = [1,2,3];              // dealing with @input
 *     compRef.instance.output$.subscribe(val => {}); // dealing with @output
 *   }
 * }
 * ```
 */
/**
 * Provide service to add or remove component dynamically
 */
class DynamicComponentService {
    constructor(factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     */
    createComponent(component, into) {
        this.rootViewContainer = into || this.rootViewContainer;
        const factory = this.factoryResolver.resolveComponentFactory(component);
        return factory.create(this.rootViewContainer.parentInjector);
    }
    /**
     * insert component
     */
    insertComponent(componentRef) {
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
DynamicComponentService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
];

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
    constructor(element, renderer, cdRef) {
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
    restoreItems() {
        if (this.outView) {
            this.outView = false;
            this.items = Array.from(this.itemsBackup || []);
            this.itemsBackup = undefined;
            this.renderer.setStyle(this.contentsEl, 'height', undefined);
            this.cdRef.detectChanges();
        }
    }
    ngOnInit() {
        this.contentsEl =
            this.element.nativeElement.querySelector('.inview-page.contents');
    }
    ngOnDestroy() {
        console.log('NguiInviewPageComponent.ngOnDestroy() is called');
        this.destroyed = true;
    }
    /**
     * Empty items when not in viewport, so that elements are not rendered
     */
    emptyItems() {
        if (this.items && this.contentsEl && !this.outView) {
            // set height before emptying contents
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
            },] }
];
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NguiInviewPageComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef, { static: true },] }],
    items: [{ type: Input }]
};

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
    constructor(renderer, element, dynamicComponentService, cdr) {
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
    ngAfterViewInit() {
        if (!this.template || !this.bottomInview.observers.length) {
            console.error('<ngui-virtual-list> requires [template] and {bottomInview)');
        }
    }
    /**
     * When the bottom is inview port, this function is called
     * It will insert a dynamicall created NguiInviewPageComponent with the given template.
     * It will also fires (bottomInview) event, so that user can fill up items for the page.
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
    </div>
    <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
  `,
                styles: [`
    :host {display: block}
  `]
            },] }
];
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

class NoMatchFound {
    constructor() {
        this.html = 'No Match Found';
    }
}

class NoneSelect {
    constructor() {
        this.html = 'Select';
    }
}

class NguiAutocompleteComponent extends NguiVirtualListComponent {
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
}
NguiAutocompleteComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NguiAutocompleteComponent.propDecorators = {
    for: [{ type: Input }],
    minInputChars: [{ type: Input }],
    blankOption: [{ type: Input }],
    noMatchItem: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};

class NguiListDirective {
    constructor(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new EventEmitter();
    }
}
NguiListDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-list' // tslint:disable-line
            },] }
];
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
NguiListDirective.propDecorators = {
    selected: [{ type: Output }],
    escaped: [{ type: Output }]
};

// tabindex, keydown, keyup(ENTER, ESC), click
class NguiListItemDirective {
    constructor(el, renderer, viewContainer, listDirective, virtualListComponent, autocompleteComponent) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.listDirective = listDirective;
        this.virtualListComponent = virtualListComponent;
        this.autocompleteComponent = autocompleteComponent;
    }
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
    keydown(event) {
        const thisListItem = this.el.nativeElement;
        const keyCode = event.which || event.keyCode;
        const parentListEl = this.parentListComp.element.nativeElement;
        const listItems = Array.from(parentListEl.querySelectorAll('ngui-list-item'));
        const listItemNdx = listItems.indexOf(thisListItem);
        const nextListItem = listItems[listItemNdx + 1] || listItems[0];
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
    mousedown() {
        this.parentListComp.selected.emit(this.object);
    }
    focused() {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    }
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

class NguiHighlightPipe {
    transform(text, search) {
        let ret = text;
        if (search) {
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
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 */
class konsole {
    /** returns if it should call `window.console` or not */
    static toLog(param) {
        const restrictionNum = this.LOG_LEVELS[this.logLevel];
        const requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    }
    /** sets the current log level */
    static setLogLevel(logLevel) {
        logLevel = logLevel.toUpperCase();
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
    /** The same as `console.debug()` if the current log level is greater than `debug` */
    static debug(...args) {
        if (this.toLog('DEBUG')) {
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
        }
    }
    /** The same as `console.log()` if the current log level is greater than `log` */
    static log(...args) {
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    }
    /** The same as `console.info()` if the current log level is greater than `info` */
    static info(...args) {
        if (this.toLog('INFO')) {
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
        }
    }
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    static warn(...args) {
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    }
    /** The same as `console.error()` if the current log level is greater than `error` */
    static error(...args) {
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    }
}
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

/*
 * Public API Surface of ngui-common
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicComponentService, NguiAutocompleteComponent, NguiCommonModule, NguiHighlightPipe, NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiInviewPageComponent, NguiListDirective, NguiListItemDirective, NguiListModule, NguiUtilsModule, NguiVirtualListComponent, fireEvent, konsole };
//# sourceMappingURL=ngui-common.js.map
