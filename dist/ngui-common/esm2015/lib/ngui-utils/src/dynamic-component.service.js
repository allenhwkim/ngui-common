import * as tslib_1 from "tslib";
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
let DynamicComponentService = class DynamicComponentService {
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
};
DynamicComponentService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
];
DynamicComponentService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(ComponentFactoryResolver)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DynamicComponentService);
export { DynamicComponentService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsT0FBTyxFQUVMLHdCQUF3QixFQUV4QixNQUFNLEVBQ04sVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCOztHQUVHO0FBRUgsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFNbEMsWUFBOEMsZUFBZTtRQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsU0FBYyxFQUFFLElBQXVCO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlLENBQUMsWUFBK0I7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxTQUFBLEVBQUUsRUFBSSxDQUFDLENBQUEsQ0FBQyxHQUFHLFNBQUEsRUFBRSxFQUFJLENBQUMsQ0FBQSxFQUFFLENBQUM7UUFDM0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRCxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckQsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7Q0FFRixDQUFBOzs0Q0E5QmMsTUFBTSxTQUFDLHdCQUF3Qjs7QUFOakMsdUJBQXVCO0lBRG5DLFVBQVUsRUFBRTtJQU9FLG1CQUFBLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBOztHQU5sQyx1QkFBdUIsQ0FvQ25DO1NBcENZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBJbnNlcnQgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgdXNpbmcgYSBzZXJ2aWNlXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIGltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9keW5hbWljLmNvbXBvbmVudC5zZXJ2aWNlJztcclxuICogaW1wb3J0IHsgTXlEeW5hbWljQ29tcG9uZW50IH0gZnJvbSAnLi9teS0xLmNvbXBvbmVudCc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHRlbXBsYXRlOiBgIC4uLiA8ZGl2ICNkeW1hbWljPjwvZGl2PmBcclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcclxuICogICBAVmlld0NoaWxkKCdkeW5hbWljJywge3JlYWQ6Vmlld0NvbnRhaW5lclJlZn0pIHZjcjogVmlld0NvbnRhaW5lclJlZjtcclxuICpcclxuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZGNzOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSkge31cclxuICpcclxuICogICBpbnNlcnRDb21wKCkge1xyXG4gKiAgICAgbGV0IGNvbXBSZWYgPSB0aGlzLmRjcy5jcmVhdGVDb21wb25lbnQoTXlEeW5hbWljQ29tcG9uZW50LCB0aGlzLnZjcik7XHJcbiAqICAgICB0aHMuZGNzLmluc2VydENvbW9uZW50KGNtcFJlZik7XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLml0ZW1zID0gWzEsMiwzXTsgICAgICAgICAgICAgIC8vIGRlYWxpbmcgd2l0aCBAaW5wdXRcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2Uub3V0cHV0JC5zdWJzY3JpYmUodmFsID0+IHt9KTsgLy8gZGVhbGluZyB3aXRoIEBvdXRwdXRcclxuICogICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RhYmxlLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHNlcnZpY2UgdG8gYWRkIG9yIHJlbW92ZSBjb21wb25lbnQgZHluYW1pY2FsbHlcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIHtcclxuICAvKiogdXNlZCB0byBjcmVhdGUgYSBmYWN0b3J5IGZyb20gYSBjb21wb25lbnQgY2xhc3MgKi9cclxuICBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcclxuICAvKiogZGVmaW5lcyB3aGVyZSBhIGR5bmFtaWMgY29tcG9uZW50cyBpbnNlcnQgaW50byAqL1xyXG4gIHJvb3RWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgZmFjdG9yeVJlc29sdmVyKSB7XHJcbiAgICB0aGlzLmZhY3RvcnlSZXNvbHZlciA9IGZhY3RvcnlSZXNvbHZlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgY29tcG9uZW50IHJlZmVyZW5jZVxyXG4gICAqIFRoZSByZWFzb24gdG8gc2VwZXJhdGUgYGNyZWF0ZUNvbXBuZW50YCBhbmQgYGluc2VydENvbXBvbmVudGAgaXNcclxuICAgKiB0byBhbGxvdyBzb21lIGFjdGlvbnMgYmVmb3JlIHdlIGluc2VydCBpbnRvIGEgaG9zdFZpZXcuXHJcbiAgICogZS5nIHN0eWxpbmcsIHNldHRpbmcgYXR0cmlidXRlcywgZXRjXHJcbiAgICovXHJcbiAgY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBpbnRvPzogVmlld0NvbnRhaW5lclJlZik6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIHRoaXMucm9vdFZpZXdDb250YWluZXIgPSBpbnRvIHx8IHRoaXMucm9vdFZpZXdDb250YWluZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuXHJcbiAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUodGhpcy5yb290Vmlld0NvbnRhaW5lci5wYXJlbnRJbmplY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBpbnNlcnQgY29tcG9uZW50XHJcbiAgICovXHJcbiAgaW5zZXJ0Q29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiBDb21wb25lbnQge1xyXG4gICAgY29uc3QgY29tcElkID0gYG5ndWktZHluLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKiogNykgKyAxMCAqKiA2fWA7XHJcbiAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgY29tcElkKTtcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5pZCA9IGNvbXBJZDtcclxuXHJcbiAgICB0aGlzLnJvb3RWaWV3Q29udGFpbmVyLmluc2VydChjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG5cclxuICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=