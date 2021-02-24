import { EventEmitter, Component, ElementRef, Inject, PLATFORM_ID, ContentChild, TemplateRef, Input, Output, Directive, NgModule, Injectable, ComponentFactoryResolver, Renderer2, ChangeDetectorRef, ViewChild, ViewContainerRef, Optional, Host, HostListener, Pipe } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';

/**
 An element that listens to viewport positioning and fires inView and notInview events
 ### Example
 ```html
 <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
   <img *ngIf src="https://picsum.photos/800/300?image=1>
 </ngui-inview>
 ```
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function NguiInviewComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0, 1);
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
} }
function NguiInviewPageComponent_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtext(1, " Error: requires [items] ");
    ɵngcc0.ɵɵelementEnd();
} }
function NguiInviewPageComponent_ng_template_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtext(1, " Error: requires <ng-template>");
    ɵngcc0.ɵɵelementEnd();
} }
function NguiInviewPageComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, NguiInviewPageComponent_ng_template_2_div_0_Template, 2, 0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, NguiInviewPageComponent_ng_template_2_div_1_Template, 2, 0, "div", 3);
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r1.items);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r1.template);
} }
const _c0 = function (a0, a1) { return { items: a0, outView: a1 }; };
const _c1 = ["pages"];
function NguiAutocompleteComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "div", 1);
    ɵngcc0.ɵɵelement(2, "div", null, 2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "ngui-inview", 3);
    ɵngcc0.ɵɵlistener("inview", function NguiAutocompleteComponent_ng_container_0_Template_ngui_inview_inview_4_listener() { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.addMorePages(); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} }
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
NguiInviewComponent.ɵfac = function NguiInviewComponent_Factory(t) { return new (t || NguiInviewComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(PLATFORM_ID)); };
NguiInviewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NguiInviewComponent, selectors: [["ngui-inview"]], contentQueries: function NguiInviewComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵstaticContentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, inputs: { observerOptions: "observerOptions", blurEnabled: "blurEnabled", options: "options" }, outputs: { inview: "inview", notInview: "notInview" }, decls: 1, vars: 1, consts: [[3, "ngTemplateOutlet", 4, "ngIf"], [3, "ngTemplateOutlet"]], template: function NguiInviewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NguiInviewComponent_ng_container_0_Template, 1, 1, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.isInview);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {display: block;}"] });
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiInviewComponent, [{
        type: Component,
        args: [{
                selector: 'ngui-inview',
                template: `
        <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
        </ng-container>
    `,
                styles: [':host {display: block;}']
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }]; }, { observerOptions: [{
            type: Input
        }], blurEnabled: [{
            type: Input
        }], inview: [{
            type: Output
        }], notInview: [{
            type: Output
        }], template: [{
            type: ContentChild,
            args: [TemplateRef, { static: true }]
        }], options: [{
            type: Input
        }] }); })();

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
NguiInviewDirective.ɵfac = function NguiInviewDirective_Factory(t) { return new (t || NguiInviewDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(PLATFORM_ID)); };
NguiInviewDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NguiInviewDirective, selectors: [["", "nguiInview", ""], ["", "nguiOutview", ""]], inputs: { observerOptions: "observerOptions", options: "options" }, outputs: { nguiInview: "nguiInview", nguiOutview: "nguiOutview" } });
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiInviewDirective, [{
        type: Directive,
        args: [{
                selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }]; }, { observerOptions: [{
            type: Input
        }], nguiInview: [{
            type: Output
        }], nguiOutview: [{
            type: Output
        }], options: [{
            type: Input
        }] }); })();

class NguiInviewModule {
}
NguiInviewModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NguiInviewModule });
NguiInviewModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NguiInviewModule_Factory(t) { return new (t || NguiInviewModule)(); }, imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NguiInviewModule, { declarations: function () { return [NguiInviewComponent, NguiInviewDirective]; }, imports: function () { return [CommonModule]; }, exports: function () { return [NguiInviewComponent, NguiInviewDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiInviewModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

/**
 * fire the given event with options on the element
 ### Example
 ```js
 fireEvent(el, 'click');
 fireEvent(el, 'keypress', {key: 'Enter'});
 ```
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

 ### Example
 ```ts
 import { DynamicComponentService } from './dynamic.component.service';
 import { MyDynamicComponent } from './my-1.component';

 @Component({
   template: ` ... <div #dymamic></div>`
 })
 export class MyComponent {
   @ViewChild('dynamic', {read:ViewContainerRef}) vcr: ViewContainerRef;

   constructor(public dcs: DynamicComponentService) {}

   insertComp() {
     let compRef = this.dcs.createComponent(MyDynamicComponent, this.vcr);
     ths.dcs.insertComonent(cmpRef);
     compRef.instance.items = [1,2,3];              // dealing with @input
     compRef.instance.output$.subscribe(val => {}); // dealing with @output
   }
 }
 ```
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
DynamicComponentService.ɵfac = function DynamicComponentService_Factory(t) { return new (t || DynamicComponentService)(ɵngcc0.ɵɵinject(ComponentFactoryResolver)); };
DynamicComponentService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: DynamicComponentService, factory: DynamicComponentService.ɵfac });
DynamicComponentService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DynamicComponentService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [ComponentFactoryResolver]
            }] }]; }, null); })();

/**
 * A block of component that listens to inView and outView events,
 * so that it empties contents when out of view after backup items
 * and restores the contents when in view

 ### Example
 ```html
 <ngui-inview-page [items]="items">
   <ng-template let-items="items">
     <div *ngIf="items else noItems">
       <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
     </div>
   </ng-template>
 </ngui-inview-page>
 ```
 */
class NguiInviewPageComponent {
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [0, .01] };
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
            this.items = items;
            this.cdRef.detectChanges();
        }
    }
}
NguiInviewPageComponent.ɵfac = function NguiInviewPageComponent_Factory(t) { return new (t || NguiInviewPageComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
NguiInviewPageComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NguiInviewPageComponent, selectors: [["ngui-inview-page"]], contentQueries: function NguiInviewPageComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵstaticContentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, inputs: { observerOptions: "observerOptions", items: "items" }, decls: 4, vars: 6, consts: [[1, "inview-page", "contents", 3, "observerOptions", "nguiInview", "nguiOutview"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], [4, "ngIf"]], template: function NguiInviewPageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("nguiInview", function NguiInviewPageComponent_Template_div_nguiInview_0_listener() { return ctx.restoreItems(); })("nguiOutview", function NguiInviewPageComponent_Template_div_nguiOutview_0_listener() { return ctx.emptyItems(); });
        ɵngcc0.ɵɵelementContainer(1, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(2, NguiInviewPageComponent_ng_template_2_Template, 2, 2, "ng-template", null, 2, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r0 = ɵngcc0.ɵɵreference(3);
        ɵngcc0.ɵɵproperty("observerOptions", ctx.observerOptions);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx.template || _r0)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(3, _c0, ctx.items, ctx.outView));
    } }, directives: [NguiInviewDirective, ɵngcc1.NgTemplateOutlet, ɵngcc1.NgIf], styles: ["[_nghost-%COMP%] {display: block}"] });
NguiInviewPageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NguiInviewPageComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef, { static: true },] }],
    items: [{ type: Input }],
    observerOptions: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiInviewPageComponent, [{
        type: Component,
        args: [{
                selector: 'ngui-inview-page',
                template: `
    <div class="inview-page contents"
      [observerOptions]="observerOptions"
      (nguiInview)="restoreItems()"
      (nguiOutview)="emptyItems()">
      <!-- add blank ngui-list-item by condition  -->
      <!-- no match found ngui-list-item by condition -->
      <ng-container
        [ngTemplateOutlet]="template||defaultTemplate"
        [ngTemplateOutletContext]="{items: items, outView: outView}">
      </ng-container>
    </div>

    <ng-template #defaultTemplate>
      <div *ngIf="!items"> Error: requires [items] </div>
      <div *ngIf="!template"> Error: requires &lt;ng-template></div>
    </ng-template>
  `,
                styles: [`
    :host {display: block}
  `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }]; }, { observerOptions: [{
            type: Input
        }], items: [{
            type: Input
        }], template: [{
            type: ContentChild,
            args: [TemplateRef, { static: true }]
        }] }); })();

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

 ### Example
 ```html
 <ngui-virtual-list (bottomInview)="loadItems($event)">
   <ng-template let-items="items">
     <div *ngIf="!items">Loading</div>
     <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
   </ng-template>
 </ngui-virtual-list>
 ```
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
      
         ### Example
         ```html
         <ngui-virtual-list (bottomInview)="loadItems($event)">
           <ng-template let-items="items">
             <div *ngIf="items else noItems">
                <li *ngFor="let num of items; trackBy: num">row number: {{ num }}</li>
             </div>
             <ng-template #noItems>Loading</ng-template>
           </ng-template>
         </ngui-virtual-list>
         ```
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
    }
    // set items of NguiInviewPageComponent
    addList(items) {
        this.isListLoading = false;
        this.inviewPage.instance.setItems(items);
    }
}
NguiVirtualListComponent.ɵfac = function NguiVirtualListComponent_Factory(t) { return new (t || NguiVirtualListComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(DynamicComponentService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
NguiVirtualListComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NguiVirtualListComponent, selectors: [["ngui-virtual-list"]], contentQueries: function NguiVirtualListComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, viewQuery: function NguiVirtualListComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c1, true, ViewContainerRef);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.pagesRef = _t.first);
    } }, outputs: { selected: "selected", escaped: "escaped", bottomInview: "bottomInview" }, decls: 4, vars: 0, consts: [[1, "ngui-virtual-list", 3, "focus", "click"], ["pages", ""], [3, "inview"]], template: function NguiVirtualListComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("focus", function NguiVirtualListComponent_Template_div_focus_0_listener() { return ctx._focused = true; })("click", function NguiVirtualListComponent_Template_div_click_0_listener() { return ctx._focused = true; });
        ɵngcc0.ɵɵelement(1, "div", null, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "ngui-inview", 2);
        ɵngcc0.ɵɵlistener("inview", function NguiVirtualListComponent_Template_ngui_inview_inview_3_listener() { return ctx.addAnInviewPageToPages(); });
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [NguiInviewComponent], styles: ["[_nghost-%COMP%] {display: block}"] });
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiVirtualListComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }, { type: DynamicComponentService }, { type: ɵngcc0.ChangeDetectorRef }]; }, { selected: [{
            type: Output
        }], escaped: [{
            type: Output
        }], bottomInview: [{
            type: Output
        }], pagesRef: [{
            type: ViewChild,
            args: ['pages', { read: ViewContainerRef }]
        }], template: [{
            type: ContentChild,
            args: [TemplateRef]
        }] }); })();

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
    }
    onEscaped() {
        this._escapedFromList = true;
        this.inputEl.focus();
        if (!this._lastSelected) {
            this.inputEl.value = this._orgInputValue;
        }
        this.cdr.detectChanges(); // for ChangeDetectionStrategy.OnPush
    }
    onInputElFocused(event) {
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
NguiAutocompleteComponent.ɵfac = function NguiAutocompleteComponent_Factory(t) { return ɵNguiAutocompleteComponent_BaseFactory(t || NguiAutocompleteComponent); };
NguiAutocompleteComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NguiAutocompleteComponent, selectors: [["ngui-autocomplete"]], contentQueries: function NguiAutocompleteComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, inputs: { minInputChars: "minInputChars", blankOption: "blankOption", noMatchItem: "noMatchItem", for: "for" }, features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ngui-autocomplete"], ["pages", ""], [3, "inview"]], template: function NguiAutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NguiAutocompleteComponent_ng_container_0_Template, 5, 0, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.isReady);
    } }, directives: [ɵngcc1.NgIf, NguiInviewComponent], styles: ["[_nghost-%COMP%] {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete[_ngcontent-%COMP%] { border: 1px solid #ccc; padding: 4px }"] });
NguiAutocompleteComponent.propDecorators = {
    for: [{ type: Input }],
    minInputChars: [{ type: Input }],
    blankOption: [{ type: Input }],
    noMatchItem: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
const ɵNguiAutocompleteComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(NguiAutocompleteComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiAutocompleteComponent, [{
        type: Component,
        args: [{
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
            }]
    }], null, { minInputChars: [{
            type: Input
        }], blankOption: [{
            type: Input
        }], noMatchItem: [{
            type: Input
        }], for: [{
            type: Input
        }], template: [{
            type: ContentChild,
            args: [TemplateRef]
        }] }); })();

class NguiListDirective {
    constructor(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new EventEmitter();
    }
}
NguiListDirective.ɵfac = function NguiListDirective_Factory(t) { return new (t || NguiListDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
NguiListDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NguiListDirective, selectors: [["ngui-list"]], outputs: { selected: "selected", escaped: "escaped" } });
NguiListDirective.ctorParameters = () => [
    { type: ElementRef }
];
NguiListDirective.propDecorators = {
    selected: [{ type: Output }],
    escaped: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiListDirective, [{
        type: Directive,
        args: [{
                selector: 'ngui-list' // tslint:disable-line
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { selected: [{
            type: Output
        }], escaped: [{
            type: Output
        }] }); })();

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
NguiListItemDirective.ɵfac = function NguiListItemDirective_Factory(t) { return new (t || NguiListItemDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(NguiListDirective, 9), ɵngcc0.ɵɵdirectiveInject(NguiVirtualListComponent, 9), ɵngcc0.ɵɵdirectiveInject(NguiAutocompleteComponent, 9)); };
NguiListItemDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NguiListItemDirective, selectors: [["ngui-list-item"]], hostBindings: function NguiListItemDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("keydown", function NguiListItemDirective_keydown_HostBindingHandler($event) { return ctx.keydown($event); })("keyup", function NguiListItemDirective_keyup_HostBindingHandler($event) { return ctx.keyup($event); })("click", function NguiListItemDirective_click_HostBindingHandler($event) { return ctx.mousedown($event); })("focus", function NguiListItemDirective_focus_HostBindingHandler($event) { return ctx.focused($event); })("blur", function NguiListItemDirective_blur_HostBindingHandler($event) { return ctx.blurred($event); });
    } }, inputs: { object: ["item", "object"] } });
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiListItemDirective, [{
        type: Directive,
        args: [{
                selector: 'ngui-list-item' // tslint:disable-line
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }, { type: NguiListDirective, decorators: [{
                type: Optional
            }, {
                type: Host
            }] }, { type: NguiVirtualListComponent, decorators: [{
                type: Optional
            }, {
                type: Host
            }] }, { type: NguiAutocompleteComponent, decorators: [{
                type: Optional
            }, {
                type: Host
            }] }]; }, { keydown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], keyup: [{
            type: HostListener,
            args: ['keyup', ['$event']]
        }], mousedown: [{
            type: HostListener,
            args: ['click', ['$event']]
        }], focused: [{
            type: HostListener,
            args: ['focus', ['$event']]
        }], blurred: [{
            type: HostListener,
            args: ['blur', ['$event']]
        }], object: [{
            type: Input,
            args: ['item']
        }] }); })();

class NguiListModule {
}
NguiListModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NguiListModule });
NguiListModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NguiListModule_Factory(t) { return new (t || NguiListModule)(); }, imports: [[
            CommonModule,
            NguiInviewModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NguiListModule, { declarations: function () { return [NguiAutocompleteComponent, NguiInviewPageComponent, NguiListDirective, NguiListItemDirective, NguiVirtualListComponent]; }, imports: function () { return [CommonModule, NguiInviewModule]; }, exports: function () { return [NguiAutocompleteComponent, NguiInviewPageComponent, NguiListDirective, NguiListItemDirective, NguiVirtualListComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiListModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

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
NguiHighlightPipe.ɵfac = function NguiHighlightPipe_Factory(t) { return new (t || NguiHighlightPipe)(); };
NguiHighlightPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "nguiHighlight", type: NguiHighlightPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiHighlightPipe, [{
        type: Pipe,
        args: [{ name: 'nguiHighlight' }]
    }], null, null); })();

/**
 * window.konsole alternative
 ### Example
 ```js
 konsole.setLogLevel('error');
 konsole.log(1,2,3,4,5);
 ```
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
NguiUtilsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NguiUtilsModule });
NguiUtilsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NguiUtilsModule_Factory(t) { return new (t || NguiUtilsModule)(); }, providers: [DynamicComponentService], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NguiUtilsModule, { declarations: function () { return [NguiHighlightPipe]; }, imports: function () { return [CommonModule]; }, exports: function () { return [NguiHighlightPipe]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiUtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NguiHighlightPipe],
                exports: [NguiHighlightPipe],
                providers: [DynamicComponentService]
            }]
    }], null, null); })();

class NguiCommonModule {
}
NguiCommonModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NguiCommonModule });
NguiCommonModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NguiCommonModule_Factory(t) { return new (t || NguiCommonModule)(); }, imports: [[
            NguiInviewModule,
            NguiListModule,
            NguiUtilsModule
        ], NguiInviewModule, NguiListModule, NguiUtilsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NguiCommonModule, { imports: [NguiInviewModule, NguiListModule, NguiUtilsModule], exports: [NguiInviewModule, NguiListModule, NguiUtilsModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NguiCommonModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

/*
 * Public API Surface of ngui-common
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicComponentService, NguiAutocompleteComponent, NguiCommonModule, NguiHighlightPipe, NguiInviewComponent, NguiInviewDirective, NguiInviewModule, NguiInviewPageComponent, NguiListDirective, NguiListItemDirective, NguiListModule, NguiUtilsModule, NguiVirtualListComponent, fireEvent, konsole };

//# sourceMappingURL=ngui-common.js.map