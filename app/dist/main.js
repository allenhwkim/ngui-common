(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app/main.ts":
/*!*********************!*\
  !*** ./app/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__(/*! ./src/app.module */ "./app/src/app.module.ts");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./app/src/app.component.css":
/*!***********************************!*\
  !*** ./app/src/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".links, .test {\n  display: inline-block;\n  padding: 12px;\n}\n.links {\n  background: #eee;\n}\n.test {\n  border: 1px solid #ccc;\n  vertical-align: top;\n  min-width: 50%;\n}"

/***/ }),

/***/ "./app/src/app.component.html":
/*!************************************!*\
  !*** ./app/src/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>@ngui/common Test Page</h1>\n\n<nav class=\"links\">\n  <h2>Modules</h2>\n\n  <h3>inview module</h3>\n  <ul>\n    <li><a routerLink=\"/inview/ngui-inview\">ngui-inview component</a></li>\n    <li><a routerLink=\"/inview/nguiInview\">ngui-inview directive</a></li>\n  </ul>\n\n  <h3>list module</h3>\n  <ul>\n    <li><a routerLink=\"/list/ngui-inview-page\">ngui-inview-page component</a></li>\n    <li><a routerLink=\"/list/ngui-list\">ngui-list component</a></li>\n    <li><a routerLink=\"/list/ngui-virtual-list\">ngui-virtual-list component</a></li>\n    <li><a routerLink=\"/list/ngui-autocomplete\">ngui-autocomplete component</a></li>\n  </ul>\n\n  <h3>utils module</h3>\n  <ul>\n    <li><a routerLink=\"/utils/dynamic-component-service\">DynamicComponentService</a></li>\n    <li><a routerLink=\"/utils/ngui-highlight\">nguiHilight pipe</a></li>\n    <li><a routerLink=\"/utils/fire-event\">fireEvent function</a></li>\n  </ul>\n</nav>\n\n<div class=\"test\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./app/src/app.component.ts":
/*!**********************************!*\
  !*** ./app/src/app.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./app/src/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./app/src/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./app/src/app.module.ts":
/*!*******************************!*\
  !*** ./app/src/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var modules_1 = __webpack_require__(/*! ../../modules */ "./modules/index.ts");
var app_component_1 = __webpack_require__(/*! ./app.component */ "./app/src/app.component.ts");
var inview_module_test_1 = __webpack_require__(/*! ./inview-module-test */ "./app/src/inview-module-test/index.ts");
var list_module_test_1 = __webpack_require__(/*! ./list-module-test */ "./app/src/list-module-test/index.ts");
var utils_module_test_1 = __webpack_require__(/*! ./utils-module-test */ "./app/src/utils-module-test/index.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                platform_browser_1.BrowserModule,
                modules_1.NguiListModule,
                modules_1.NguiInviewModule,
                modules_1.NguiUtilsModule,
                router_1.RouterModule.forRoot([
                    { path: 'inview/ngui-inview', component: inview_module_test_1.InviewComponent },
                    { path: 'inview/nguiInview', component: inview_module_test_1.InviewDirectiveTestComponent },
                    { path: 'list/ngui-inview-page', component: list_module_test_1.InviewPageComponent },
                    { path: 'list/ngui-list', component: list_module_test_1.ListComponent },
                    { path: 'list/ngui-virtual-list', component: list_module_test_1.VirtualListComponent },
                    { path: 'list/ngui-autocomplete', component: list_module_test_1.AutocompleteComponent },
                    { path: 'utils/dynamic-component-service', component: utils_module_test_1.DynamicComponentServiceTestComponent },
                    { path: 'utils/ngui-highlight', component: utils_module_test_1.NguiHighlightPipeTestComponent },
                    { path: 'utils/fire-event', component: utils_module_test_1.FireEventTestComponent },
                    { path: '', redirectTo: '/inview/ngui-inview', pathMatch: 'full' }
                ] // , { enableTracing: true } // debugging purposes only
                )
            ],
            declarations: [
                app_component_1.AppComponent,
                inview_module_test_1.InviewComponent,
                inview_module_test_1.InviewDirectiveTestComponent,
                list_module_test_1.InviewPageComponent,
                list_module_test_1.ListComponent,
                list_module_test_1.VirtualListComponent,
                list_module_test_1.AutocompleteComponent,
                utils_module_test_1.MyDynamicComponent,
                utils_module_test_1.DynamicComponentServiceTestComponent,
                utils_module_test_1.NguiHighlightPipeTestComponent,
                utils_module_test_1.FireEventTestComponent
            ],
            providers: [],
            entryComponents: [utils_module_test_1.MyDynamicComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./app/src/inview-module-test/index.ts":
/*!*********************************************!*\
  !*** ./app/src/inview-module-test/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inview_component_1 = __webpack_require__(/*! ./inview-component */ "./app/src/inview-module-test/inview-component.ts");
exports.InviewComponent = inview_component_1.InviewComponent;
var inview_directive_1 = __webpack_require__(/*! ./inview-directive */ "./app/src/inview-module-test/inview-directive.ts");
exports.InviewDirectiveTestComponent = inview_directive_1.InviewDirectiveTestComponent;


/***/ }),

/***/ "./app/src/inview-module-test/inview-component.ts":
/*!********************************************************!*\
  !*** ./app/src/inview-module-test/inview-component.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var InviewComponent = /** @class */ (function () {
    function InviewComponent(element) {
        this.element = element;
        this.numArr = Array.from(Array(100), function (_, x) { return x; });
        this.trackBy = function (index, item) { return item; };
    }
    Object.defineProperty(InviewComponent.prototype, "numImages", {
        get: function () {
            return this.element.nativeElement.querySelectorAll('img').length;
        },
        enumerable: true,
        configurable: true
    });
    InviewComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>ngui-inview component test</h2>\n    <hr/>\n    List Of Images\n    <hr/>\n\n    <div *ngFor=\"let i of numArr\">\n      <ngui-inview> <!-- only displays when this is in viewport -->\n        <img *ngIf src=\"https://picsum.photos/800/300?image={{i}}\" height=\"33%\">\n      </ngui-inview>\n    </div>\n\n    <div class=\"num-images\">\n      Number of &lt;img> tag on document: {{ numImages }}\n    </div>\n  ",
            styles: ["\n    ngui-inview {\n      min-height: 300px;\n    }\n    .num-images {\n      position: fixed; padding: 5px;\n      bottom: 0; right: 0; background: #333;color: #fff;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], InviewComponent);
    return InviewComponent;
}());
exports.InviewComponent = InviewComponent;


/***/ }),

/***/ "./app/src/inview-module-test/inview-directive.ts":
/*!********************************************************!*\
  !*** ./app/src/inview-module-test/inview-directive.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var InviewDirectiveTestComponent = /** @class */ (function () {
    function InviewDirectiveTestComponent() {
    }
    InviewDirectiveTestComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>(nguiInview) (nguiOutview) directive test</h2>\n\n    <div style=\"height: 800px; border: 1px solid #ccc\">\n    This is filler element to push down the greyed element. <br/>\n    Scroll down to see how message reacts to when the greyed\n    element is in viewport and out of viewport.\n    <div style=\"text-align: center; font-size: 200px\">&#8595;</div>\n    <div style=\"text-align: center; font-size: 200px\">&#8595;</div>\n    <div style=\"text-align: center; font-size: 200px\">&#8595;</div>\n    </div>\n\n    <div style=\"background: #ccc\"\n      (nguiInview)=\"message='nguiInview'\"\n      (nguiOutview)=\"message='nguiOutview'\">\n      If this is in viewport, message is 'nguiInview'. <br/>\n      If this is out ot viewport, message is 'nguiOutview'. <br/>\n    </div>\n\n    <div class=\"message\"> {{ message }} </div>\n  ",
            styles: ["\n    div {padding: 12px}\n    .message { position: fixed; padding: 5px; bottom: 0; left: 50%; background: #333;color: #fff; }\n  "]
        })
    ], InviewDirectiveTestComponent);
    return InviewDirectiveTestComponent;
}());
exports.InviewDirectiveTestComponent = InviewDirectiveTestComponent;


/***/ }),

/***/ "./app/src/list-module-test/autocomplete-component.ts":
/*!************************************************************!*\
  !*** ./app/src/list-module-test/autocomplete-component.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var list_1 = __webpack_require__(/*! ../../../modules/list */ "./modules/list/index.ts");
var of_1 = __webpack_require__(/*! rxjs/internal/observable/of */ "./node_modules/rxjs/internal/observable/of.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent() {
        this.numPage = 0;
        this.search = new forms_1.FormControl();
    }
    AutocompleteComponent.prototype.selected = function (obj) {
        console.log('selected() is called', obj);
    };
    AutocompleteComponent.prototype.escaped = function () {
        console.log('escaped() is called');
    };
    AutocompleteComponent.prototype.loadList = function () {
        var _this = this;
        console.log('AutoCompleteComponent.loadList is called();');
        var keyword = this.autocomplete.inputEl.value;
        var items = Array(50).fill(0).map(function () {
            return { id: 1, value: "foo" + keyword + "bar" };
        });
        of_1.of(items).pipe(operators_1.delay(500)).subscribe(function (result) {
            _this.autocomplete.addList(result);
            // this.autocomplete.addList([]);
            _this.numPage++;
        });
    };
    __decorate([
        core_1.ViewChild('autocomplete'),
        __metadata("design:type", list_1.NguiAutocompleteComponent)
    ], AutocompleteComponent.prototype, "autocomplete", void 0);
    AutocompleteComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <h2>ngui-autocomplete component test</h2>\n\n    <input id=\"search\" [formControl]=\"search\" />\n\n    <ngui-autocomplete for=\"search\" #autocomplete\n      (bottomInview)=\"loadList()\"\n      (selected)=\"selected($event)\"\n      (escaped)=\"escaped()\">\n      <ng-template #items let-items=\"items\" let-keyword=\"keyword\">\n        <div *ngIf=\"!items\">Loading</div> <!-- loading text -->\n        <ngui-list-item [item]=\"item\" *ngFor=\"let item of items; trackBy: id\">\n          <span [innerHTML]=\"item.value\"></span>\n        </ngui-list-item>\n      </ng-template>\n    </ngui-autocomplete>\n  ",
            styles: ["\n    ngui-list-item {display: block}\n  "]
        })
    ], AutocompleteComponent);
    return AutocompleteComponent;
}());
exports.AutocompleteComponent = AutocompleteComponent;


/***/ }),

/***/ "./app/src/list-module-test/index.ts":
/*!*******************************************!*\
  !*** ./app/src/list-module-test/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inview_page_component_1 = __webpack_require__(/*! ./inview-page-component */ "./app/src/list-module-test/inview-page-component.ts");
exports.InviewPageComponent = inview_page_component_1.InviewPageComponent;
var list_component_1 = __webpack_require__(/*! ./list-component */ "./app/src/list-module-test/list-component.ts");
exports.ListComponent = list_component_1.ListComponent;
var virtual_list_component_1 = __webpack_require__(/*! ./virtual-list-component */ "./app/src/list-module-test/virtual-list-component.ts");
exports.VirtualListComponent = virtual_list_component_1.VirtualListComponent;
var autocomplete_component_1 = __webpack_require__(/*! ./autocomplete-component */ "./app/src/list-module-test/autocomplete-component.ts");
exports.AutocompleteComponent = autocomplete_component_1.AutocompleteComponent;


/***/ }),

/***/ "./app/src/list-module-test/inview-page-component.ts":
/*!***********************************************************!*\
  !*** ./app/src/list-module-test/inview-page-component.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var InviewPageComponent = /** @class */ (function () {
    function InviewPageComponent(element) {
        this.element = element;
        this.items = Array.from(Array(50), function (_, x) { return x; });
    }
    Object.defineProperty(InviewPageComponent.prototype, "numElements", {
        get: function () {
            return this.element.nativeElement.querySelectorAll('li').length;
        },
        enumerable: true,
        configurable: true
    });
    InviewPageComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <h2>ngui-inview-page component test</h2>\n\n    <h3>[items] and [template] not given</h3>\n    <ngui-inview-page id=\"item-template-missing\"></ngui-inview-page>\n\n    <h3>[items] not given</h3>\n    <ngui-inview-page id=\"items-missing\">\n      <ng-template let-items=\"items\">template without [items]</ng-template>\n    </ngui-inview-page>\n\n    <h3>[template] not given</h3>\n    <ngui-inview-page id=\"templaxte-missing\" [items]=\"items\"></ngui-inview-page>\n\n    <h3>[item] and [template] given</h3>\n    <ngui-inview-page id=\"item-template-given\" style=\"border:1px solid #ccc\" [items]=\"items\">\n      <ng-template let-items=\"items\">\n        <div *ngIf=\"items; else noItems\">\n          <li *ngFor=\"let num of items\">row number: {{ num }}</li>\n        </div>\n      </ng-template>\n    </ngui-inview-page>\n\n    <h3>filler</h3>\n    <div style=\"height: 800px; border: 1px solid #ccc\">\n      This is filler to make the above item out of view.<br/>\n      Please scroll down to the bottom of the page.\n      <div style=\"text-align: center; font-size: 200px\">&#8595;</div>\n    </div>\n\n    <div class=\"num-elements\">\n      Number of &lt;li> tag on document: {{ numElements }}\n    </div>\n  ",
            styles: ["\n    .num-elements {\n      position: fixed; padding: 5px;\n      bottom: 0; left: 50%; background: #333;color: #fff;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], InviewPageComponent);
    return InviewPageComponent;
}());
exports.InviewPageComponent = InviewPageComponent;


/***/ }),

/***/ "./app/src/list-module-test/list-component.ts":
/*!****************************************************!*\
  !*** ./app/src/list-module-test/list-component.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.items = (new Array(10)).fill(0).map(function (_, i) { return ({ id: i, value: "value " + i }); });
    }
    ListComponent.prototype.selected = function (item) {
        console.log('item selected', item);
    };
    ListComponent.prototype.escaped = function () {
        console.log('escaped from list');
    };
    ListComponent = __decorate([
        core_1.Component({
            template: "\n    <ngui-list (selected)=\"selected($event)\" (escaped)=\"escaped()\">\n      <ngui-list-item *ngFor=\"let item of items\" [item]=\"item\">\n        <span [innerHTML]=\"item.value | nguiHighlight:'val'\"></span>\n      </ngui-list-item>\n    </ngui-list>",
            styles: ["\n     ngui-list-item { display: block; }\n     .ngui-highlight { font-weight: bold; }\n   "],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;


/***/ }),

/***/ "./app/src/list-module-test/virtual-list-component.ts":
/*!************************************************************!*\
  !*** ./app/src/list-module-test/virtual-list-component.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var list_1 = __webpack_require__(/*! ../../../modules/list */ "./modules/list/index.ts");
var of_1 = __webpack_require__(/*! rxjs/internal/observable/of */ "./node_modules/rxjs/internal/observable/of.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var VirtualListComponent = /** @class */ (function () {
    function VirtualListComponent(element) {
        this.element = element;
        this.totalPage = 0;
    }
    Object.defineProperty(VirtualListComponent.prototype, "numDomElements", {
        get: function () {
            return this.element.nativeElement.querySelectorAll('*').length;
        },
        enumerable: true,
        configurable: true
    });
    VirtualListComponent.prototype.loadItems = function (virtualList) {
        var _this = this;
        var items = Array.from(Array(50), function (_, x) { return (_this.totalPage * 50) + x; });
        of_1.of(items).pipe(operators_1.delay(1000)).subscribe(function (result) {
            console.log('VirtualListComponent.loadItems() is called');
            virtualList.addList(result);
            _this.totalPage++;
        });
    };
    __decorate([
        core_1.ViewChild('autocomplete'),
        __metadata("design:type", list_1.NguiVirtualListComponent)
    ], VirtualListComponent.prototype, "autocomplete", void 0);
    VirtualListComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <h2>ngui-virtual-list component test</h2>\n\n    <ngui-virtual-list (bottomInview)=\"loadItems($event)\">\n      <ng-template let-items=\"items\">\n        <div *ngIf=\"!items\">Loading</div>\n        <ngui-list-item *ngFor=\"let num of items; trackBy: num\">\n          row number: {{ num }}\n        </ngui-list-item>\n      </ng-template>\n    </ngui-virtual-list>\n\n    <div class=\"num-elements\">\n      Number of all elements on document: {{ numDomElements }}\n    </div>\n  ",
            styles: ["\n    ngui-list-item {display: block}\n    .num-elements {\n      position: fixed; padding: 5px;\n      bottom: 0; left: 50%; background: #333;color: #fff;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], VirtualListComponent);
    return VirtualListComponent;
}());
exports.VirtualListComponent = VirtualListComponent;


/***/ }),

/***/ "./app/src/utils-module-test/dynamic-component-service.ts":
/*!****************************************************************!*\
  !*** ./app/src/utils-module-test/dynamic-component-service.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var utils_1 = __webpack_require__(/*! ../../../modules/utils */ "./modules/utils/index.ts");
// component 1
var MyDynamicComponent = /** @class */ (function () {
    function MyDynamicComponent() {
        this.remove = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MyDynamicComponent.prototype, "remove", void 0);
    MyDynamicComponent = __decorate([
        core_1.Component({
            template: "\n    <div>\n      This is MyComponent({{ id }}), which is inserted dynamically.\n      <a href=\"javascript:void(0)\" (click)=\"remove.emit()\">Remove</a>\n    </div>\n  "
        })
    ], MyDynamicComponent);
    return MyDynamicComponent;
}());
exports.MyDynamicComponent = MyDynamicComponent;
// component 2
var DynamicComponentServiceTestComponent = /** @class */ (function () {
    function DynamicComponentServiceTestComponent(dcs) {
        this.dcs = dcs;
    }
    DynamicComponentServiceTestComponent.prototype.insertComponent = function () {
        var compRef = this.dcs.createComponent(MyDynamicComponent, this.containerRef);
        this.dcs.insertComponent(compRef);
        compRef.instance.remove.subscribe(function () { return compRef.destroy(); }); // dealing with @output
    };
    __decorate([
        core_1.ViewChild('dynamic', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], DynamicComponentServiceTestComponent.prototype, "containerRef", void 0);
    DynamicComponentServiceTestComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>DynamicComponentService test</h2>\n\n    Components will be add into the following section.\n    <div #dynamic></div>\n    <button (click)=\"insertComponent()\">Insert MyComponent</button>\n  ",
            styles: ["\n  "]
        }),
        __metadata("design:paramtypes", [utils_1.DynamicComponentService])
    ], DynamicComponentServiceTestComponent);
    return DynamicComponentServiceTestComponent;
}());
exports.DynamicComponentServiceTestComponent = DynamicComponentServiceTestComponent;


/***/ }),

/***/ "./app/src/utils-module-test/fire-event.ts":
/*!*************************************************!*\
  !*** ./app/src/utils-module-test/fire-event.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var utils_1 = __webpack_require__(/*! ../../../modules/utils */ "./modules/utils/index.ts");
var FireEventTestComponent = /** @class */ (function () {
    function FireEventTestComponent(el) {
        this.el = el;
    }
    FireEventTestComponent.prototype.fireEventTo = function (selector, type, options) {
        var target = this.el.nativeElement.querySelector(selector);
        utils_1.fireEvent(target, type, options);
    };
    FireEventTestComponent.prototype.myEvent = function (event) {
        this.message = event['type'] + " event is fired on #" + event.target.id;
    };
    FireEventTestComponent = __decorate([
        core_1.Component({
            template: "\n    <div id=\"test-div\" style=\"border: 1px solid #ccc\"\n      (click)=\"myEvent($event)\"\n      (mousedown)=\"myEvent($event)\"\n      (mouseup)=\"myEvent($event)\"\n      (keydown)=\"myEvent($event)\"\n      (keyup)=\"myEvent($event)\"\n      (keypress)=\"myEvent($event)\"\n      (touchstart)=\"myEvent($event)\"\n      (touchmove)=\"myEvent($event)\"\n      (touchend)=\"myEvent($event)\">\n      <br/> Target:\n      <br/> #test-div(Event will be fire on this element)\n      <br/><br/>\n    </div>\n    Fire the following event programmtically on the target.\n    <div>\n      <button id=\"a1\" (click)=\"fireEventTo('#test-div', 'click')\">click</button>\n      <button id=\"a2\" (click)=\"fireEventTo('#test-div', 'mousedown')\">mousedown</button>\n      <button id=\"a3\" (click)=\"fireEventTo('#test-div', 'mouseup')\">mouseup</button>\n      <br/>\n      <button id=\"a4\" (click)=\"fireEventTo('#test-div', 'keydown', {key: 'Enter'})\">keydown</button>\n      <button id=\"a5\" (click)=\"fireEventTo('#test-div', 'keyup',  {key: 'Enter'})\">keyup</button>\n      <button id=\"a6\" (click)=\"fireEventTo('#test-div', 'keypress',  {key: 'Enter'})\">keypress</button>\n      <br/>\n      <button id=\"a7\" (click)=\"fireEventTo('#test-div', 'touchstart')\">touchstart</button>\n      <button id=\"a8\" (click)=\"fireEventTo('#test-div', 'touchmove')\">touchmove</button>\n      <button id=\"a9\" (click)=\"fireEventTo('#test-div', 'touchend')\">touchend</button>\n    </div>\n    Log:\n    <div id=\"log\">{{ message }}</div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FireEventTestComponent);
    return FireEventTestComponent;
}());
exports.FireEventTestComponent = FireEventTestComponent;


/***/ }),

/***/ "./app/src/utils-module-test/index.ts":
/*!********************************************!*\
  !*** ./app/src/utils-module-test/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_component_service_1 = __webpack_require__(/*! ./dynamic-component-service */ "./app/src/utils-module-test/dynamic-component-service.ts");
exports.DynamicComponentServiceTestComponent = dynamic_component_service_1.DynamicComponentServiceTestComponent;
var ngui_highlight_1 = __webpack_require__(/*! ./ngui-highlight */ "./app/src/utils-module-test/ngui-highlight.ts");
exports.NguiHighlightPipeTestComponent = ngui_highlight_1.NguiHighlightPipeTestComponent;
var dynamic_component_service_2 = __webpack_require__(/*! ./dynamic-component-service */ "./app/src/utils-module-test/dynamic-component-service.ts");
exports.MyDynamicComponent = dynamic_component_service_2.MyDynamicComponent;
var fire_event_1 = __webpack_require__(/*! ./fire-event */ "./app/src/utils-module-test/fire-event.ts");
exports.FireEventTestComponent = fire_event_1.FireEventTestComponent;


/***/ }),

/***/ "./app/src/utils-module-test/ngui-highlight.ts":
/*!*****************************************************!*\
  !*** ./app/src/utils-module-test/ngui-highlight.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var NguiHighlightPipeTestComponent = /** @class */ (function () {
    function NguiHighlightPipeTestComponent() {
    }
    NguiHighlightPipeTestComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>nguiHighlight pipe test</h2>\n    <div [innerHTML]=\"'nguiHighlight pipe highlights the given word' | nguiHighlight:'highlight'\"></div>\n  ",
            // tslint:disable
            styles: ['.ngui-highlight { color: red; font-weight: bold;}'],
            // tslint:enable
            encapsulation: core_1.ViewEncapsulation.Emulated
        })
    ], NguiHighlightPipeTestComponent);
    return NguiHighlightPipeTestComponent;
}());
exports.NguiHighlightPipeTestComponent = NguiHighlightPipeTestComponent;


/***/ }),

/***/ "./modules/index.ts":
/*!**************************!*\
  !*** ./modules/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inview_1 = __webpack_require__(/*! ./inview */ "./modules/inview/index.ts");
exports.NguiInviewModule = inview_1.NguiInviewModule;
var list_1 = __webpack_require__(/*! ./list */ "./modules/list/index.ts");
exports.NguiListModule = list_1.NguiListModule;
var utils_1 = __webpack_require__(/*! ./utils */ "./modules/utils/index.ts");
exports.NguiUtilsModule = utils_1.NguiUtilsModule;


/***/ }),

/***/ "./modules/inview/index.ts":
/*!*********************************!*\
  !*** ./modules/inview/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ngui_inview_module_1 = __webpack_require__(/*! ./src/ngui-inview.module */ "./modules/inview/src/ngui-inview.module.ts");
exports.NguiInviewModule = ngui_inview_module_1.NguiInviewModule;


/***/ }),

/***/ "./modules/inview/src/ngui-inview.component.ts":
/*!*****************************************************!*\
  !*** ./modules/inview/src/ngui-inview.component.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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
        /** IntersectionObserver options */
        this.options = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        this.inview = new core_1.EventEmitter();
        this.notInview = new core_1.EventEmitter();
        /** indicates that this element is in viewport */
        this.isInview = false;
        /** indicates that this element is 80% in viewport. Used by the default callback */
        this.once80PctVisible = false;
    }
    /** Starts IntersectionObserver */
    NguiInviewComponent.prototype.ngOnInit = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
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
        if (this.once80PctVisible)
            return false;
        if (this.inview.observers.length)
            return false;
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
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NguiInviewComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiInviewComponent.prototype, "inview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiInviewComponent.prototype, "notInview", void 0);
    NguiInviewComponent = __decorate([
        core_1.Component({
            selector: 'ngui-inview',
            template: "\n    <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n    </ng-container>\n  ",
            styles: [':host {display: block;}']
        }),
        __param(2, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2, Object])
    ], NguiInviewComponent);
    return NguiInviewComponent;
}());
exports.NguiInviewComponent = NguiInviewComponent;


/***/ }),

/***/ "./modules/inview/src/ngui-inview.directive.ts":
/*!*****************************************************!*\
  !*** ./modules/inview/src/ngui-inview.directive.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/**
 * Fires (nguiInview) or (nguiOutview) events dependents on the element is in viewport or not
 */
var NguiInviewDirective = /** @class */ (function () {
    function NguiInviewDirective(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.options = {};
        /** Event that will be fired when in viewport */
        this.nguiInview = new core_1.EventEmitter();
        /** Event that will be fired when out of  viewport */
        this.nguiOutview = new core_1.EventEmitter();
    }
    /** Starts IntersectionObserver */
    NguiInviewDirective.prototype.ngOnInit = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** Stops IntersectionObserver */
    NguiInviewDirective.prototype.ngOnDestroy = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.observer && this.observer.disconnect();
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NguiInviewDirective.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiInviewDirective.prototype, "nguiInview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiInviewDirective.prototype, "nguiOutview", void 0);
    NguiInviewDirective = __decorate([
        core_1.Directive({
            selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
        }),
        __param(2, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2, Object])
    ], NguiInviewDirective);
    return NguiInviewDirective;
}());
exports.NguiInviewDirective = NguiInviewDirective;


/***/ }),

/***/ "./modules/inview/src/ngui-inview.module.ts":
/*!**************************************************!*\
  !*** ./modules/inview/src/ngui-inview.module.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var ngui_inview_component_1 = __webpack_require__(/*! ./ngui-inview.component */ "./modules/inview/src/ngui-inview.component.ts");
var ngui_inview_directive_1 = __webpack_require__(/*! ./ngui-inview.directive */ "./modules/inview/src/ngui-inview.directive.ts");
var NguiInviewModule = /** @class */ (function () {
    function NguiInviewModule() {
    }
    NguiInviewModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ngui_inview_component_1.NguiInviewComponent, ngui_inview_directive_1.NguiInviewDirective],
            exports: [ngui_inview_component_1.NguiInviewComponent, ngui_inview_directive_1.NguiInviewDirective]
        })
    ], NguiInviewModule);
    return NguiInviewModule;
}());
exports.NguiInviewModule = NguiInviewModule;


/***/ }),

/***/ "./modules/list/index.ts":
/*!*******************************!*\
  !*** ./modules/list/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ngui_list_module_1 = __webpack_require__(/*! ./src/ngui-list.module */ "./modules/list/src/ngui-list.module.ts");
exports.NguiListModule = ngui_list_module_1.NguiListModule;
exports.NguiAutocompleteComponent = ngui_list_module_1.NguiAutocompleteComponent;
exports.NguiVirtualListComponent = ngui_list_module_1.NguiVirtualListComponent;


/***/ }),

/***/ "./modules/list/src/ngui-autocomplete.component.ts":
/*!*********************************************************!*\
  !*** ./modules/list/src/ngui-autocomplete.component.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var utils_1 = __webpack_require__(/*! ../../utils */ "./modules/utils/index.ts");
var ngui_virtual_list_component_1 = __webpack_require__(/*! ./ngui-virtual-list.component */ "./modules/list/src/ngui-virtual-list.component.ts");
var no_match_found_1 = __webpack_require__(/*! ./no-match-found */ "./modules/list/src/no-match-found.ts");
var none_select_1 = __webpack_require__(/*! ./none-select */ "./modules/list/src/none-select.ts");
var fromEvent_1 = __webpack_require__(/*! rxjs/internal/observable/fromEvent */ "./node_modules/rxjs/internal/observable/fromEvent.js");
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
        fromEvent_1.fromEvent(this.inputEl, 'keyup').subscribe(this.onInputElKeyup.bind(this));
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
                utils_1.fireEvent(firstList, 'keyup', { key: event.key });
            }
            else {
                this.onEscaped();
            }
        }
        else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            firstList && firstList.focus();
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
        console.debug('NguiAutocompleteComponent.addMorePages() is called.');
        if (this.inviewPages.length) {
            this.addAnInviewPageToPages();
        }
        else {
            console.debug('skipping addMorePages');
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
            if (this.noMatchItem && (!items || items.length === 0)) {
                noMatchItem = new no_match_found_1.NoMatchFound();
                blankItem.html = this.noMatchItem;
            }
            else if (this.blankOption) {
                blankItem = new none_select_1.NoneSelect();
                blankItem.html = this.blankOption;
            }
        }
        var allItems = [].concat(noMatchItem, blankItem, items).filter(function (x) { return x; });
        this.inviewPage.instance.setItems(allItems);
        this.cdr.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NguiAutocompleteComponent.prototype, "for", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NguiAutocompleteComponent.prototype, "minInputChars", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NguiAutocompleteComponent.prototype, "blankOption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NguiAutocompleteComponent.prototype, "noMatchItem", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NguiAutocompleteComponent.prototype, "template", void 0);
    NguiAutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'ngui-autocomplete',
            template: "\n    <div *ngIf=\"isReady\" class=\"ngui-autocomplete\">\n      <div #pages></div>\n      <ngui-inview (inview)=\"addMorePages()\"></ngui-inview>\n    </div>\n  ",
            styles: ["\n    :host {position: absolute; background-color: #fff; max-height: 300px; overflow: auto}\n    .ngui-autocomplete { border: 1px solid #ccc; padding: 4px }\n  "]
        })
    ], NguiAutocompleteComponent);
    return NguiAutocompleteComponent;
}(ngui_virtual_list_component_1.NguiVirtualListComponent));
exports.NguiAutocompleteComponent = NguiAutocompleteComponent;


/***/ }),

/***/ "./modules/list/src/ngui-inview-page.component.ts":
/*!********************************************************!*\
  !*** ./modules/list/src/ngui-inview-page.component.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NguiInviewPageComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NguiInviewPageComponent.prototype, "items", void 0);
    NguiInviewPageComponent = __decorate([
        core_1.Component({
            selector: 'ngui-inview-page',
            template: "\n    <div class=\"inview-page contents\"\n      (nguiInview)=\"restoreItems()\"\n      (nguiOutview)=\"emptyItems()\">\n      <!-- add blank ngui-list-item by condition  -->\n      <!-- no match found ngui-list-item by condition -->\n      <ng-container\n        [ngTemplateOutlet]=\"template||defaultTemplate\"\n        [ngTemplateOutletContext]=\"{items: items, outView: outView}\">\n      </ng-container>\n      <div *ngIf=\"outView\">{{ itemsBackup.length }} items hidden</div>\n    </div>\n\n    <ng-template #defaultTemplate>\n      <div *ngIf=\"!items\"> Error: requires [items] </div>\n      <div *ngIf=\"!template\"> Error: requires &lt;ng-template></div>\n    </ng-template>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            core_1.ChangeDetectorRef])
    ], NguiInviewPageComponent);
    return NguiInviewPageComponent;
}());
exports.NguiInviewPageComponent = NguiInviewPageComponent;


/***/ }),

/***/ "./modules/list/src/ngui-list-item.directive.ts":
/*!******************************************************!*\
  !*** ./modules/list/src/ngui-list-item.directive.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ngui_list_directive_1 = __webpack_require__(/*! ./ngui-list.directive */ "./modules/list/src/ngui-list.directive.ts");
var ngui_virtual_list_component_1 = __webpack_require__(/*! ./ngui-virtual-list.component */ "./modules/list/src/ngui-virtual-list.component.ts");
var ngui_autocomplete_component_1 = __webpack_require__(/*! ./ngui-autocomplete.component */ "./modules/list/src/ngui-autocomplete.component.ts");
var none_select_1 = __webpack_require__(/*! ./none-select */ "./modules/list/src/none-select.ts");
var no_match_found_1 = __webpack_require__(/*! ./no-match-found */ "./modules/list/src/no-match-found.ts");
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
        if ((this.object instanceof none_select_1.NoneSelect) || (this.object instanceof no_match_found_1.NoMatchFound)) {
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
            case 38:// up arrow, left arrow
                prevListItem.focus();
                break;
            case 39:
            case 40:// down arrow, right arrow
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
    NguiListItemDirective.prototype.mousedown = function (event) {
        this.parentListComp.selected.emit(this.object);
    };
    NguiListItemDirective.prototype.focused = function (event) {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', true);
        }
    };
    NguiListItemDirective.prototype.blurred = function (event) {
        if (this.parentListComp['setFocused']) {
            this.parentListComp['setFocused']('listItem', false);
        }
    };
    __decorate([
        core_1.Input('item'),
        __metadata("design:type", Object)
    ], NguiListItemDirective.prototype, "object", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "keydown", null);
    __decorate([
        core_1.HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "keyup", null);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "mousedown", null);
    __decorate([
        core_1.HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "focused", null);
    __decorate([
        core_1.HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NguiListItemDirective.prototype, "blurred", null);
    NguiListItemDirective = __decorate([
        core_1.Directive({
            selector: 'ngui-list-item' // tslint:disable-line
        }),
        __param(3, core_1.Optional()), __param(3, core_1.Host()),
        __param(4, core_1.Optional()), __param(4, core_1.Host()),
        __param(5, core_1.Optional()), __param(5, core_1.Host()),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            core_1.ViewContainerRef,
            ngui_list_directive_1.NguiListDirective,
            ngui_virtual_list_component_1.NguiVirtualListComponent,
            ngui_autocomplete_component_1.NguiAutocompleteComponent])
    ], NguiListItemDirective);
    return NguiListItemDirective;
}());
exports.NguiListItemDirective = NguiListItemDirective;


/***/ }),

/***/ "./modules/list/src/ngui-list.directive.ts":
/*!*************************************************!*\
  !*** ./modules/list/src/ngui-list.directive.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var NguiListDirective = /** @class */ (function () {
    function NguiListDirective(element) {
        this.element = element;
        /** Fired when child `<ngui-list-item>` is selected */
        this.selected = new core_1.EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiListDirective.prototype, "selected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiListDirective.prototype, "escaped", void 0);
    NguiListDirective = __decorate([
        core_1.Directive({
            selector: 'ngui-list' // tslint:disable-line
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NguiListDirective);
    return NguiListDirective;
}());
exports.NguiListDirective = NguiListDirective;


/***/ }),

/***/ "./modules/list/src/ngui-list.module.ts":
/*!**********************************************!*\
  !*** ./modules/list/src/ngui-list.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var inview_1 = __webpack_require__(/*! ../../inview */ "./modules/inview/index.ts");
var ngui_inview_page_component_1 = __webpack_require__(/*! ./ngui-inview-page.component */ "./modules/list/src/ngui-inview-page.component.ts");
var ngui_virtual_list_component_1 = __webpack_require__(/*! ./ngui-virtual-list.component */ "./modules/list/src/ngui-virtual-list.component.ts");
var ngui_list_directive_1 = __webpack_require__(/*! ./ngui-list.directive */ "./modules/list/src/ngui-list.directive.ts");
var ngui_list_item_directive_1 = __webpack_require__(/*! ./ngui-list-item.directive */ "./modules/list/src/ngui-list-item.directive.ts");
var ngui_autocomplete_component_1 = __webpack_require__(/*! ./ngui-autocomplete.component */ "./modules/list/src/ngui-autocomplete.component.ts");
var NguiListModule = /** @class */ (function () {
    function NguiListModule() {
    }
    NguiListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                inview_1.NguiInviewModule // for (nguiInview) and (nguiOutview)
            ],
            declarations: [
                ngui_autocomplete_component_1.NguiAutocompleteComponent,
                ngui_inview_page_component_1.NguiInviewPageComponent,
                ngui_list_directive_1.NguiListDirective,
                ngui_list_item_directive_1.NguiListItemDirective,
                ngui_virtual_list_component_1.NguiVirtualListComponent
            ],
            exports: [
                ngui_autocomplete_component_1.NguiAutocompleteComponent,
                ngui_inview_page_component_1.NguiInviewPageComponent,
                ngui_list_directive_1.NguiListDirective,
                ngui_list_item_directive_1.NguiListItemDirective,
                ngui_virtual_list_component_1.NguiVirtualListComponent
            ],
            entryComponents: [ngui_inview_page_component_1.NguiInviewPageComponent]
        })
    ], NguiListModule);
    return NguiListModule;
}());
exports.NguiListModule = NguiListModule;
var ngui_autocomplete_component_2 = __webpack_require__(/*! ./ngui-autocomplete.component */ "./modules/list/src/ngui-autocomplete.component.ts");
exports.NguiAutocompleteComponent = ngui_autocomplete_component_2.NguiAutocompleteComponent;
var ngui_virtual_list_component_2 = __webpack_require__(/*! ./ngui-virtual-list.component */ "./modules/list/src/ngui-virtual-list.component.ts");
exports.NguiVirtualListComponent = ngui_virtual_list_component_2.NguiVirtualListComponent;


/***/ }),

/***/ "./modules/list/src/ngui-virtual-list.component.ts":
/*!*********************************************************!*\
  !*** ./modules/list/src/ngui-virtual-list.component.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var utils_1 = __webpack_require__(/*! ../../utils */ "./modules/utils/index.ts");
var ngui_inview_page_component_1 = __webpack_require__(/*! ./ngui-inview-page.component */ "./modules/list/src/ngui-inview-page.component.ts");
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
        this.selected = new core_1.EventEmitter();
        /** Fired when `ESC` key is pressed from `<ngui-list-item>` */
        this.escaped = new core_1.EventEmitter();
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
        this.bottomInview = new core_1.EventEmitter();
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
                this.dynamicComponentService.createComponent(ngui_inview_page_component_1.NguiInviewPageComponent, this.pagesRef);
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
    __decorate([
        core_1.ViewChild('pages', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], NguiVirtualListComponent.prototype, "pagesRef", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NguiVirtualListComponent.prototype, "template", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiVirtualListComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiVirtualListComponent.prototype, "escaped", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NguiVirtualListComponent.prototype, "bottomInview", void 0);
    NguiVirtualListComponent = __decorate([
        core_1.Component({
            selector: 'ngui-virtual-list',
            template: "\n    <div class=\"ngui-virtual-list\"\n      (focus)=\"_focused = true\"\n      (click)=\"_focused = true\">\n      <!-- hold multiple <ngui-inview-page> -->\n      <div #pages></div>\n      <!-- insert <ngui-inview-page> into #pages -->\n      <ngui-inview (inview)=\"addAnInviewPageToPages()\"></ngui-inview>\n    </div>\n  ",
            styles: ["\n    :host {display: block}\n  "]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            core_1.ElementRef,
            utils_1.DynamicComponentService,
            core_1.ChangeDetectorRef])
    ], NguiVirtualListComponent);
    return NguiVirtualListComponent;
}());
exports.NguiVirtualListComponent = NguiVirtualListComponent;


/***/ }),

/***/ "./modules/list/src/no-match-found.ts":
/*!********************************************!*\
  !*** ./modules/list/src/no-match-found.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NoMatchFound = /** @class */ (function () {
    function NoMatchFound() {
        this.html = 'No Match Found';
    }
    return NoMatchFound;
}());
exports.NoMatchFound = NoMatchFound;


/***/ }),

/***/ "./modules/list/src/none-select.ts":
/*!*****************************************!*\
  !*** ./modules/list/src/none-select.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NoneSelect = /** @class */ (function () {
    function NoneSelect() {
        this.html = 'Select';
    }
    return NoneSelect;
}());
exports.NoneSelect = NoneSelect;


/***/ }),

/***/ "./modules/utils/index.ts":
/*!********************************!*\
  !*** ./modules/utils/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_component_service_1 = __webpack_require__(/*! ./src/dynamic-component.service */ "./modules/utils/src/dynamic-component.service.ts");
exports.DynamicComponentService = dynamic_component_service_1.DynamicComponentService;
var konsole_1 = __webpack_require__(/*! ./src/konsole */ "./modules/utils/src/konsole.ts");
exports.konsole = konsole_1.konsole;
var fire_event_1 = __webpack_require__(/*! ./src/fire-event */ "./modules/utils/src/fire-event.ts");
exports.fireEvent = fire_event_1.fireEvent;
var ngui_utils_module_1 = __webpack_require__(/*! ./src/ngui-utils.module */ "./modules/utils/src/ngui-utils.module.ts");
exports.NguiUtilsModule = ngui_utils_module_1.NguiUtilsModule;


/***/ }),

/***/ "./modules/utils/src/dynamic-component.service.ts":
/*!********************************************************!*\
  !*** ./modules/utils/src/dynamic-component.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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
    DynamicComponentService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], DynamicComponentService);
    return DynamicComponentService;
}());
exports.DynamicComponentService = DynamicComponentService;


/***/ }),

/***/ "./modules/utils/src/fire-event.ts":
/*!*****************************************!*\
  !*** ./modules/utils/src/fire-event.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.fireEvent = fireEvent;


/***/ }),

/***/ "./modules/utils/src/konsole.ts":
/*!**************************************!*\
  !*** ./modules/utils/src/konsole.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
            if (window && window.sessionStorage) {
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
        this.toLog('DEBUG') && console.debug.apply(console, arguments);
    };
    /** The same as `console.log()` if the current log level is greater than `log` */
    konsole.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.toLog('LOG') && console.log.apply(console, arguments);
    };
    /** The same as `console.info()` if the current log level is greater than `info` */
    konsole.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.toLog('INFO') && console.info.apply(console, arguments);
    };
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    konsole.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.toLog('WARN') && console.warn.apply(console, arguments);
    };
    /** The same as `console.error()` if the current log level is greater than `error` */
    konsole.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.toLog('ERROR') && console.error.apply(console, arguments);
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
exports.konsole = konsole;
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


/***/ }),

/***/ "./modules/utils/src/ngui-highlight.pipe.ts":
/*!**************************************************!*\
  !*** ./modules/utils/src/ngui-highlight.pipe.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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
        core_1.Pipe({ name: 'nguiHighlight' })
    ], NguiHighlightPipe);
    return NguiHighlightPipe;
}());
exports.NguiHighlightPipe = NguiHighlightPipe;


/***/ }),

/***/ "./modules/utils/src/ngui-utils.module.ts":
/*!************************************************!*\
  !*** ./modules/utils/src/ngui-utils.module.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var dynamic_component_service_1 = __webpack_require__(/*! ./dynamic-component.service */ "./modules/utils/src/dynamic-component.service.ts");
var ngui_highlight_pipe_1 = __webpack_require__(/*! ./ngui-highlight.pipe */ "./modules/utils/src/ngui-highlight.pipe.ts");
var NguiUtilsModule = /** @class */ (function () {
    function NguiUtilsModule() {
    }
    NguiUtilsModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [ngui_highlight_pipe_1.NguiHighlightPipe],
            exports: [ngui_highlight_pipe_1.NguiHighlightPipe],
            providers: [dynamic_component_service_1.DynamicComponentService]
        })
    ], NguiUtilsModule);
    return NguiUtilsModule;
}());
exports.NguiUtilsModule = NguiUtilsModule;


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./app/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/allen.kim/github/ngui-common/app/main.ts */"./app/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map