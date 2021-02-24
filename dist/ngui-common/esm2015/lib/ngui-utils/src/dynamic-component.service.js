import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
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
export class DynamicComponentService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsd0JBQXdCLEVBRXhCLE1BQU0sRUFDTixVQUFVLEVBRVgsTUFBTSxlQUFlLENBQUM7QUFFdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQThDLGVBQWU7UUFDM0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsZUFBZSxDQUFDLFNBQWMsRUFBRSxJQUF1QjtRQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZSxDQUFDLFlBQStCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsU0FBQSxFQUFFLEVBQUksQ0FBQyxDQUFBLENBQUMsR0FBRyxTQUFBLEVBQUUsRUFBSSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQzNFLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBRWxDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXJELE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDOzs7WUFuQ0YsVUFBVTs7OzRDQU9JLE1BQU0sU0FBQyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RhYmxlLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBJbnNlcnQgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgdXNpbmcgYSBzZXJ2aWNlXHJcbiAqXHJcblxyXG4gIyMjIEV4YW1wbGVcclxuIGBgYHRzXHJcbiBpbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4vZHluYW1pYy5jb21wb25lbnQuc2VydmljZSc7XHJcbiBpbXBvcnQgeyBNeUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL215LTEuY29tcG9uZW50JztcclxuXHJcbiBAQ29tcG9uZW50KHtcclxuICAgdGVtcGxhdGU6IGAgLi4uIDxkaXYgI2R5bWFtaWM+PC9kaXY+YFxyXG4gfSlcclxuIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAgIEBWaWV3Q2hpbGQoJ2R5bmFtaWMnLCB7cmVhZDpWaWV3Q29udGFpbmVyUmVmfSkgdmNyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICAgY29uc3RydWN0b3IocHVibGljIGRjczogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UpIHt9XHJcblxyXG4gICBpbnNlcnRDb21wKCkge1xyXG4gICAgIGxldCBjb21wUmVmID0gdGhpcy5kY3MuY3JlYXRlQ29tcG9uZW50KE15RHluYW1pY0NvbXBvbmVudCwgdGhpcy52Y3IpO1xyXG4gICAgIHRocy5kY3MuaW5zZXJ0Q29tb25lbnQoY21wUmVmKTtcclxuICAgICBjb21wUmVmLmluc3RhbmNlLml0ZW1zID0gWzEsMiwzXTsgICAgICAgICAgICAgIC8vIGRlYWxpbmcgd2l0aCBAaW5wdXRcclxuICAgICBjb21wUmVmLmluc3RhbmNlLm91dHB1dCQuc3Vic2NyaWJlKHZhbCA9PiB7fSk7IC8vIGRlYWxpbmcgd2l0aCBAb3V0cHV0XHJcbiAgIH1cclxuIH1cclxuIGBgYFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudFNlcnZpY2Uge1xyXG4gIC8qKiB1c2VkIHRvIGNyZWF0ZSBhIGZhY3RvcnkgZnJvbSBhIGNvbXBvbmVudCBjbGFzcyAqL1xyXG4gIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xyXG4gIC8qKiBkZWZpbmVzIHdoZXJlIGEgZHluYW1pYyBjb21wb25lbnRzIGluc2VydCBpbnRvICovXHJcbiAgcm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBmYWN0b3J5UmVzb2x2ZXIpIHtcclxuICAgIHRoaXMuZmFjdG9yeVJlc29sdmVyID0gZmFjdG9yeVJlc29sdmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBjb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICogVGhlIHJlYXNvbiB0byBzZXBlcmF0ZSBgY3JlYXRlQ29tcG5lbnRgIGFuZCBgaW5zZXJ0Q29tcG9uZW50YCBpc1xyXG4gICAqIHRvIGFsbG93IHNvbWUgYWN0aW9ucyBiZWZvcmUgd2UgaW5zZXJ0IGludG8gYSBob3N0Vmlldy5cclxuICAgKiBlLmcgc3R5bGluZywgc2V0dGluZyBhdHRyaWJ1dGVzLCBldGNcclxuICAgKi9cclxuICBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGludG8/OiBWaWV3Q29udGFpbmVyUmVmKTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lciA9IGludG8gfHwgdGhpcy5yb290Vmlld0NvbnRhaW5lcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG5cclxuICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZSh0aGlzLnJvb3RWaWV3Q29udGFpbmVyLnBhcmVudEluamVjdG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGluc2VydCBjb21wb25lbnRcclxuICAgKi9cclxuICBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IENvbXBvbmVudCB7XHJcbiAgICBjb25zdCBjb21wSWQgPSBgbmd1aS1keW4tJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCAqKiA3KSArIDEwICoqIDZ9YDtcclxuICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBjb21wSWQpO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmlkID0gY29tcElkO1xyXG5cclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==