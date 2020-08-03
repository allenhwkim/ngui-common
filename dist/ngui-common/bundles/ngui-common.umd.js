(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ngui/common', ['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (global = global || self, factory((global.ngui = global.ngui || {}, global.ngui.common = {}), global.ng.core, global.ng.common, global.rxjs));
}(this, (function (exports, core, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            this.inview = new core.EventEmitter();
            this.notInview = new core.EventEmitter();
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
            if (common.isPlatformBrowser(this.platformId)) {
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
            { type: core.ElementRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        __decorate([
            core.ContentChild(core.TemplateRef, { static: true }),
            __metadata("design:type", core.TemplateRef)
        ], NguiInviewComponent.prototype, "template", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiInviewComponent.prototype, "observerOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiInviewComponent.prototype, "options", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiInviewComponent.prototype, "blurEnabled", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiInviewComponent.prototype, "inview", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiInviewComponent.prototype, "notInview", void 0);
        NguiInviewComponent = __decorate([
            core.Component({
                selector: 'ngui-inview',
                template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
                styles: [':host {display: block;}']
            }),
            __param(1, core.Inject(core.PLATFORM_ID)),
            __metadata("design:paramtypes", [core.ElementRef, Object])
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
            this.nguiInview = new core.EventEmitter();
            /** Event that will be fired when out of  viewport */
            this.nguiOutview = new core.EventEmitter();
        }
        /** Starts IntersectionObserver */
        NguiInviewDirective.prototype.ngOnInit = function () {
            if (this.options) {
                this.observerOptions = this.options;
            }
            if (common.isPlatformBrowser(this.platformId)) {
                this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
                this.observer.observe(this.element.nativeElement);
            }
        };
        /** Stops IntersectionObserver */
        NguiInviewDirective.prototype.ngOnDestroy = function () {
            if (common.isPlatformBrowser(this.platformId) && this.observer) {
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
            { type: core.ElementRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiInviewDirective.prototype, "observerOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiInviewDirective.prototype, "options", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiInviewDirective.prototype, "nguiInview", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiInviewDirective.prototype, "nguiOutview", void 0);
        NguiInviewDirective = __decorate([
            core.Directive({
                selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
            }),
            __param(1, core.Inject(core.PLATFORM_ID)),
            __metadata("design:paramtypes", [core.ElementRef, Object])
        ], NguiInviewDirective);
        return NguiInviewDirective;
    }());

    var NguiInviewModule = /** @class */ (function () {
        function NguiInviewModule() {
        }
        NguiInviewModule = __decorate([
            core.NgModule({
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
            { type: undefined, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] }] }
        ]; };
        DynamicComponentService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(core.ComponentFactoryResolver)),
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
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.ContentChild(core.TemplateRef, { static: true }),
            __metadata("design:type", core.TemplateRef)
        ], NguiInviewPageComponent.prototype, "template", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NguiInviewPageComponent.prototype, "items", void 0);
        NguiInviewPageComponent = __decorate([
            core.Component({
                selector: 'ngui-inview-page',
                template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
                styles: ["\n    :host {display: block}\n  "]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2,
                core.ChangeDetectorRef])
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
            this.selected = new core.EventEmitter();
            /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
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
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: DynamicComponentService },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.ViewChild('pages', { read: core.ViewContainerRef, static: false }),
            __metadata("design:type", core.ViewContainerRef)
        ], NguiVirtualListComponent.prototype, "pagesRef", void 0);
        __decorate([
            core.ContentChild(core.TemplateRef, { static: false }),
            __metadata("design:type", core.TemplateRef)
        ], NguiVirtualListComponent.prototype, "template", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiVirtualListComponent.prototype, "selected", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiVirtualListComponent.prototype, "escaped", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiVirtualListComponent.prototype, "bottomInview", void 0);
        NguiVirtualListComponent = __decorate([
            core.Component({
                selector: 'ngui-virtual-list',
                template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
                styles: ["\n    :host {display: block}\n  "]
            }),
            __metadata("design:paramtypes", [core.Renderer2,
                core.ElementRef,
                DynamicComponentService,
                core.ChangeDetectorRef])
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
            rxjs.fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
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
            core.Input(),
            __metadata("design:type", String)
        ], NguiAutocompleteComponent.prototype, "for", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiAutocompleteComponent.prototype, "minInputChars", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiAutocompleteComponent.prototype, "blankOption", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NguiAutocompleteComponent.prototype, "noMatchItem", void 0);
        __decorate([
            core.ContentChild(core.TemplateRef, { static: false }),
            __metadata("design:type", core.TemplateRef)
        ], NguiAutocompleteComponent.prototype, "template", void 0);
        NguiAutocompleteComponent = __decorate([
            core.Component({
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
            this.selected = new core.EventEmitter();
            /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
            this.escaped = new core.EventEmitter();
        }
        NguiListDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiListDirective.prototype, "selected", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], NguiListDirective.prototype, "escaped", void 0);
        NguiListDirective = __decorate([
            core.Directive({
                selector: 'ngui-list' // tslint:disable-line
            }),
            __metadata("design:paramtypes", [core.ElementRef])
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
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ViewContainerRef },
            { type: NguiListDirective, decorators: [{ type: core.Optional }, { type: core.Host }] },
            { type: NguiVirtualListComponent, decorators: [{ type: core.Optional }, { type: core.Host }] },
            { type: NguiAutocompleteComponent, decorators: [{ type: core.Optional }, { type: core.Host }] }
        ]; };
        __decorate([
            core.Input('item'),
            __metadata("design:type", Object)
        ], NguiListItemDirective.prototype, "object", void 0);
        __decorate([
            core.HostListener('keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], NguiListItemDirective.prototype, "keydown", null);
        __decorate([
            core.HostListener('keyup', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], NguiListItemDirective.prototype, "keyup", null);
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], NguiListItemDirective.prototype, "mousedown", null);
        __decorate([
            core.HostListener('focus', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], NguiListItemDirective.prototype, "focused", null);
        __decorate([
            core.HostListener('blur', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], NguiListItemDirective.prototype, "blurred", null);
        NguiListItemDirective = __decorate([
            core.Directive({
                selector: 'ngui-list-item' // tslint:disable-line
            }),
            __param(3, core.Optional()), __param(3, core.Host()),
            __param(4, core.Optional()), __param(4, core.Host()),
            __param(5, core.Optional()), __param(5, core.Host()),
            __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2,
                core.ViewContainerRef,
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
            core.NgModule({
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
            core.Pipe({ name: 'nguiHighlight' })
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
            core.NgModule({
                imports: [
                    common.CommonModule
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
            core.NgModule({
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

    exports.DynamicComponentService = DynamicComponentService;
    exports.NguiAutocompleteComponent = NguiAutocompleteComponent;
    exports.NguiCommonModule = NguiCommonModule;
    exports.NguiHighlightPipe = NguiHighlightPipe;
    exports.NguiInviewComponent = NguiInviewComponent;
    exports.NguiInviewDirective = NguiInviewDirective;
    exports.NguiInviewModule = NguiInviewModule;
    exports.NguiInviewPageComponent = NguiInviewPageComponent;
    exports.NguiListDirective = NguiListDirective;
    exports.NguiListItemDirective = NguiListItemDirective;
    exports.NguiListModule = NguiListModule;
    exports.NguiUtilsModule = NguiUtilsModule;
    exports.NguiVirtualListComponent = NguiVirtualListComponent;
    exports.fireEvent = fireEvent;
    exports.konsole = konsole;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngui-common.umd.js.map
