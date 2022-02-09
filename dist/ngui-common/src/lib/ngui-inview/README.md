# NguiInviewModule
Handles lazy loading of Angular components

- Utilize [HTML5 IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- For IE11, please add polyfill for this module
  `<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>`

## Example
```
  <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
    <img *ngIf src="https://picsum.photos/800/300?image=1>
  </ngui-in-view>
```

## Documentation
* [NguiInviewComponent]()
* [NguiInviewDirective]()
