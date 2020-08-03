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
import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
/**
 * Provide service to add or remove component dynamically
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS11dGlscy9zcmMvZHluYW1pYy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsT0FBTyxFQUVMLHdCQUF3QixFQUV4QixNQUFNLEVBQ04sVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQyxZQUE4QyxlQUFlO1FBQzNELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGVBQWUsQ0FBQyxTQUFjLEVBQUUsSUFBdUI7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4RSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxZQUErQjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQUEsRUFBRSxFQUFJLENBQUMsQ0FBQSxDQUFDLEdBQUcsU0FBQSxFQUFFLEVBQUksQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUMzRSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUVsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQzs7O1lBbkNGLFVBQVU7Ozs0Q0FPSSxNQUFNLFNBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEluc2VydCBhIGNvbXBvbmVudCBkeW5hbWljYWxseSB1c2luZyBhIHNlcnZpY2VcclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHNcclxuICogaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL2R5bmFtaWMuY29tcG9uZW50LnNlcnZpY2UnO1xyXG4gKiBpbXBvcnQgeyBNeUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuL215LTEuY29tcG9uZW50JztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgdGVtcGxhdGU6IGAgLi4uIDxkaXYgI2R5bWFtaWM+PC9kaXY+YFxyXG4gKiB9KVxyXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xyXG4gKiAgIEBWaWV3Q2hpbGQoJ2R5bmFtaWMnLCB7cmVhZDpWaWV3Q29udGFpbmVyUmVmfSkgdmNyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gKlxyXG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkY3M6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlKSB7fVxyXG4gKlxyXG4gKiAgIGluc2VydENvbXAoKSB7XHJcbiAqICAgICBsZXQgY29tcFJlZiA9IHRoaXMuZGNzLmNyZWF0ZUNvbXBvbmVudChNeUR5bmFtaWNDb21wb25lbnQsIHRoaXMudmNyKTtcclxuICogICAgIHRocy5kY3MuaW5zZXJ0Q29tb25lbnQoY21wUmVmKTtcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2UuaXRlbXMgPSBbMSwyLDNdOyAgICAgICAgICAgICAgLy8gZGVhbGluZyB3aXRoIEBpbnB1dFxyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5vdXRwdXQkLnN1YnNjcmliZSh2YWwgPT4ge30pOyAvLyBkZWFsaW5nIHdpdGggQG91dHB1dFxyXG4gKiAgIH1cclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGFibGUsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgc2VydmljZSB0byBhZGQgb3IgcmVtb3ZlIGNvbXBvbmVudCBkeW5hbWljYWxseVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudFNlcnZpY2Uge1xyXG4gIC8qKiB1c2VkIHRvIGNyZWF0ZSBhIGZhY3RvcnkgZnJvbSBhIGNvbXBvbmVudCBjbGFzcyAqL1xyXG4gIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xyXG4gIC8qKiBkZWZpbmVzIHdoZXJlIGEgZHluYW1pYyBjb21wb25lbnRzIGluc2VydCBpbnRvICovXHJcbiAgcm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSBmYWN0b3J5UmVzb2x2ZXIpIHtcclxuICAgIHRoaXMuZmFjdG9yeVJlc29sdmVyID0gZmFjdG9yeVJlc29sdmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBjb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICogVGhlIHJlYXNvbiB0byBzZXBlcmF0ZSBgY3JlYXRlQ29tcG5lbnRgIGFuZCBgaW5zZXJ0Q29tcG9uZW50YCBpc1xyXG4gICAqIHRvIGFsbG93IHNvbWUgYWN0aW9ucyBiZWZvcmUgd2UgaW5zZXJ0IGludG8gYSBob3N0Vmlldy5cclxuICAgKiBlLmcgc3R5bGluZywgc2V0dGluZyBhdHRyaWJ1dGVzLCBldGNcclxuICAgKi9cclxuICBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGludG8/OiBWaWV3Q29udGFpbmVyUmVmKTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lciA9IGludG8gfHwgdGhpcy5yb290Vmlld0NvbnRhaW5lcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG5cclxuICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZSh0aGlzLnJvb3RWaWV3Q29udGFpbmVyLnBhcmVudEluamVjdG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGluc2VydCBjb21wb25lbnRcclxuICAgKi9cclxuICBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IENvbXBvbmVudCB7XHJcbiAgICBjb25zdCBjb21wSWQgPSBgbmd1aS1keW4tJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCAqKiA3KSArIDEwICoqIDZ9YDtcclxuICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBjb21wSWQpO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmlkID0gY29tcElkO1xyXG5cclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==