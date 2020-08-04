# @ngui/common

Angular 10+ UI common directives, functions, services

[![Build Status](https://travis-ci.org/allenhwkim/ngui-common.svg?branch=master)](https://travis-ci.org/allenhwkim/ngui-common)
[![npm](https://img.shields.io/npm/dt/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common) 
[![npm](https://img.shields.io/npm/v/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common)
[![npm](https://img.shields.io/npm/l/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common)
 
[Demo](https://rawgit.com/allenhwkim/ngui-common/master/dist/ngui-common-app/index.html)  
[Object Documentation](https://rawgit.com/allenhwkim/ngui-common/master/documentation/index.html)  
[Code Coverage Report](https://rawgit.com/allenhwkim/ngui-common/master/coverage/index.html)  
[Unit Test Report](https://rawgit.com/allenhwkim/ngui-common/master/test-report.html)  
[Acceptance Report](https://rawgit.com/allenhwkim/ngui-common/master/acceptance-report/mochawesome.html)  
[Article on Medium](https://medium.com/allenhwkim/simple-lazy-loading-with-angular-716dd3b174a)  

## Install

1. install @ngui/common

```
$ npm install @ngui/common --save
```

2. import NguiCommonModule to your AppModule  

```
import { NguiInviewModule, NguiListModule, NguiUtilsModule } from '@ngui/common';

@NgModule({
  imports: [BrowserModule, FormsModule, NguiListModule, NguiInviewModule, NguiUtilsModule],
  declarations: [AppComponent],
  providers: [HTTP_PROVIDERS],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Use it in your code  

```
<!-- the image is only displayed when "ngui-inview" is in viewport -->
<ngui-inview style="min-height: 300px">
  <img *ngIf src="https://picsum.photos/800/300" height="33%">
</ngui-inview>
```

## Modules

### NguiInViewModule 
Handles lazy rendering of Angular components, which utilizes HTML5 IntersectionObserver.

For IE11 and Safari, please add [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) for this module:  
`<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>`
- ngui-inview component
- ngui-inview directive

### NguiUtilsModules
Collection of basic utility functions
- DynamicComponentService
- nguiHilight pipe
- fireEvent function

### NguiListModule
Handles list elements with highlight and keyboard/mouse interaction
- ngui-inview-page component
- ngui-list component
- ngui-virtual-list component
- ngui-autocomplete component
