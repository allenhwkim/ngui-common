# @ngui/common

Angular5+ UI common directives, functions, services

[![npm](https://img.shields.io/npm/dt/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common) 
[![npm](https://img.shields.io/npm/v/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common)
[![npm](https://img.shields.io/npm/l/@ngui/common.svg)](https://www.npmjs.com/package/@ngui/common)

## Demo 
- [InviewModule]()  
- [ListModule]()   
- [UtilsModule]()   

## Install

1. install @ngui/common
```
$ npm install @ngui/common --save
```

2. import NguiCommonModule to your AppModule

```
import { InViewModule } from '@ngui/common';

@NgModule({
  imports: [BrowserModule, FormsModule, InViewModule],
  declarations: [AppComponent],
  providers: [HTTP_PROVIDERS],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Use it in your code

```
<input auto-complete [(ngModel)]="myData" [source]="mySource" />
```

## Modules

### InViewModule
Handles lazy loading of Angular components
- Utilize HTML5 IntersectionObserver 
- For IE11, please add polyfill for this module
  `<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>`

#### Componente: `<ngui-in-view ..>`
**Input**
<table>
  <tr><th>name</th><th>type</th><th>Description</th><th>example</th></tr>
  <tr><td>[userData]</td>
    <td>object</td>
    <td>data used for callback functions.</td>
    <td>userData="myData"</td>
  </tr>
  <tr><td>[showInView]</td>
    <td>boolean</td>
    <td>if true, shows the contents only in view.</td>
    <td>[showInView]="false", default true </td>
  </tr>
  <tr><td>[options]</td>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options">Options</a></td>
    <td>IntersectionObserver options</td>
    <td> IntersectionObserverOptions]="myOptions"</td>
  </tr>
</table>
InteractoinObserverOptions
<table><tr><th>name</th><th>description</th></tr>
  <tr><td>root</td>
    <td>The base element to check visivility of this component. Default, null(browser viewport)</td>
  </tr>
  <tr><td>rootMargin</td>
    <td>margin around the root element, e.g. "10px 20px 30px 40px". Default '0 0 0 0'</td>
  </tr>
  <tr><td>threshold</td>
    <td> array of numbers, percentage numbers that callback should trigger. e.e. [0.1, 0.5, 1.0]. Default [0], trigger once as soon as element is visible</td>
  </tr>
</table>

**Output**
<table>
  <tr><th>name</th><th>Description</th><th>example></th></tr>
  <tr><td>(inView)</td>
    <td> function that will be executed when element is visible.</td>
    <td> e.g., (inView)="showMe()"</td>
  </tr>
  <tr><td>(notInView)</td>
    <td>function that will be executed when element is fully not visible</td>
    <td>(notInView="hideMe()"</td>
  </tr>
</table>

#### Component: `<ngui-in-view-loading ..>`
The contents of this element is visible while rendering of the main element is in progress.
Parent Comopnent: ngui-in-view 

### UtilsModules
- computedStyle function, https://github.com/ng2-ui/utils/blob/master/src/dom-functions/computed-style.ts
- outerHeight function, https://github.com/ng2-ui/utils/blob/master/src/dom-functions/outer-height.ts
- outerWidth function, https://github.com/ng2-ui/utils/blob/master/src/dom-functions/outer-width.ts

## ListModule

#### Component: `<ngui-list ..>'

Handles list elements with highlight and keyboard/mouse interaction

- using async pipe
- keyboard up/down, mouse click, enter -> this can be done by tabindex
**inputs**
   - nguiHighlightWord=“XXX”
   - nguiHighlightClass=“XXXX” 
   - https://gist.github.com/adamrecsko/0f28f474eca63e0279455476cc11eca7
   - https://stackoverflow.com/questions/44961759/highlight-the-search-text-angular-2

**outputs**
   - (selected)=“select(XXX)”

filtering https://stackoverflow.com/questions/34164413/how-to-apply-filters-to-ngfor

