import { __decorate, __metadata, __param } from "tslib";
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
        { type: undefined, decorators: [{ type: Inject, args: [ComponentFactoryResolver,] }] }
    ]; };
    DynamicComponentService = __decorate([
        Injectable(),
        __param(0, Inject(ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], DynamicComponentService);
    return DynamicComponentService;
}());
export { DynamicComponentService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsT0FBTyxFQUVMLHdCQUF3QixFQUV4QixNQUFNLEVBQ04sVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCOztHQUVHO0FBRUg7SUFNRSxpQ0FBOEMsZUFBZTtRQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxpREFBZSxHQUFmLFVBQWdCLFNBQWMsRUFBRSxJQUF1QjtRQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaURBQWUsR0FBZixVQUFnQixZQUErQjtRQUM3QyxJQUFNLE1BQU0sR0FBRyxlQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQUEsRUFBRSxFQUFJLENBQUMsQ0FBQSxDQUFDLEdBQUcsU0FBQSxFQUFFLEVBQUksQ0FBQyxDQUFBLENBQUUsQ0FBQztRQUMzRSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUVsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQzs7Z0RBNUJZLE1BQU0sU0FBQyx3QkFBd0I7O0lBTmpDLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7UUFPRSxXQUFBLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBOztPQU5sQyx1QkFBdUIsQ0FvQ25DO0lBQUQsOEJBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQXBDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSW5zZXJ0IGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IHVzaW5nIGEgc2VydmljZVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiBpbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4vZHluYW1pYy5jb21wb25lbnQuc2VydmljZSc7XHJcbiAqIGltcG9ydCB7IE15RHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vbXktMS5jb21wb25lbnQnO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogICB0ZW1wbGF0ZTogYCAuLi4gPGRpdiAjZHltYW1pYz48L2Rpdj5gXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqICAgQFZpZXdDaGlsZCgnZHluYW1pYycsIHtyZWFkOlZpZXdDb250YWluZXJSZWZ9KSB2Y3I6IFZpZXdDb250YWluZXJSZWY7XHJcbiAqXHJcbiAqICAgY29uc3RydWN0b3IocHVibGljIGRjczogRHluYW1pY0NvbXBvbmVudFNlcnZpY2UpIHt9XHJcbiAqXHJcbiAqICAgaW5zZXJ0Q29tcCgpIHtcclxuICogICAgIGxldCBjb21wUmVmID0gdGhpcy5kY3MuY3JlYXRlQ29tcG9uZW50KE15RHluYW1pY0NvbXBvbmVudCwgdGhpcy52Y3IpO1xyXG4gKiAgICAgdGhzLmRjcy5pbnNlcnRDb21vbmVudChjbXBSZWYpO1xyXG4gKiAgICAgY29tcFJlZi5pbnN0YW5jZS5pdGVtcyA9IFsxLDIsM107ICAgICAgICAgICAgICAvLyBkZWFsaW5nIHdpdGggQGlucHV0XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLm91dHB1dCQuc3Vic2NyaWJlKHZhbCA9PiB7fSk7IC8vIGRlYWxpbmcgd2l0aCBAb3V0cHV0XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZSBzZXJ2aWNlIHRvIGFkZCBvciByZW1vdmUgY29tcG9uZW50IGR5bmFtaWNhbGx5XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB7XHJcbiAgLyoqIHVzZWQgdG8gY3JlYXRlIGEgZmFjdG9yeSBmcm9tIGEgY29tcG9uZW50IGNsYXNzICovXHJcbiAgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XHJcbiAgLyoqIGRlZmluZXMgd2hlcmUgYSBkeW5hbWljIGNvbXBvbmVudHMgaW5zZXJ0IGludG8gKi9cclxuICByb290Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIGZhY3RvcnlSZXNvbHZlcikge1xyXG4gICAgdGhpcy5mYWN0b3J5UmVzb2x2ZXIgPSBmYWN0b3J5UmVzb2x2ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGNvbXBvbmVudCByZWZlcmVuY2VcclxuICAgKiBUaGUgcmVhc29uIHRvIHNlcGVyYXRlIGBjcmVhdGVDb21wbmVudGAgYW5kIGBpbnNlcnRDb21wb25lbnRgIGlzXHJcbiAgICogdG8gYWxsb3cgc29tZSBhY3Rpb25zIGJlZm9yZSB3ZSBpbnNlcnQgaW50byBhIGhvc3RWaWV3LlxyXG4gICAqIGUuZyBzdHlsaW5nLCBzZXR0aW5nIGF0dHJpYnV0ZXMsIGV0Y1xyXG4gICAqL1xyXG4gIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgaW50bz86IFZpZXdDb250YWluZXJSZWYpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICB0aGlzLnJvb3RWaWV3Q29udGFpbmVyID0gaW50byB8fCB0aGlzLnJvb3RWaWV3Q29udGFpbmVyO1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuZmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcblxyXG4gICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKHRoaXMucm9vdFZpZXdDb250YWluZXIucGFyZW50SW5qZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaW5zZXJ0IGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGluc2VydENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogQ29tcG9uZW50IHtcclxuICAgIGNvbnN0IGNvbXBJZCA9IGBuZ3VpLWR5bi0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICoqIDcpICsgMTAgKiogNn1gO1xyXG4gICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGNvbXBJZCk7XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuaWQgPSBjb21wSWQ7XHJcblxyXG4gICAgdGhpcy5yb290Vmlld0NvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbn1cclxuIl19