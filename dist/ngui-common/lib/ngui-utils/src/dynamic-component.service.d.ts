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
import { Component, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
/**
 * Provide service to add or remove component dynamically
 */
import * as ɵngcc0 from '@angular/core';
export declare class DynamicComponentService {
    /** used to create a factory from a component class */
    factoryResolver: ComponentFactoryResolver;
    /** defines where a dynamic components insert into */
    rootViewContainer: ViewContainerRef;
    constructor(factoryResolver: any);
    /**
     * returns component reference
     * The reason to seperate `createCompnent` and `insertComponent` is
     * to allow some actions before we insert into a hostView.
     * e.g styling, setting attributes, etc
     */
    createComponent(component: any, into?: ViewContainerRef): ComponentRef<any>;
    /**
     * insert component
     */
    insertComponent(componentRef: ComponentRef<any>): Component;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DynamicComponentService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DynamicComponentService>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJkeW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBJbnNlcnQgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgdXNpbmcgYSBzZXJ2aWNlXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIGltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9keW5hbWljLmNvbXBvbmVudC5zZXJ2aWNlJztcclxuICogaW1wb3J0IHsgTXlEeW5hbWljQ29tcG9uZW50IH0gZnJvbSAnLi9teS0xLmNvbXBvbmVudCc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHRlbXBsYXRlOiBgIC4uLiA8ZGl2ICNkeW1hbWljPjwvZGl2PmBcclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcclxuICogICBAVmlld0NoaWxkKCdkeW5hbWljJywge3JlYWQ6Vmlld0NvbnRhaW5lclJlZn0pIHZjcjogVmlld0NvbnRhaW5lclJlZjtcclxuICpcclxuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZGNzOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSkge31cclxuICpcclxuICogICBpbnNlcnRDb21wKCkge1xyXG4gKiAgICAgbGV0IGNvbXBSZWYgPSB0aGlzLmRjcy5jcmVhdGVDb21wb25lbnQoTXlEeW5hbWljQ29tcG9uZW50LCB0aGlzLnZjcik7XHJcbiAqICAgICB0aHMuZGNzLmluc2VydENvbW9uZW50KGNtcFJlZik7XHJcbiAqICAgICBjb21wUmVmLmluc3RhbmNlLml0ZW1zID0gWzEsMiwzXTsgICAgICAgICAgICAgIC8vIGRlYWxpbmcgd2l0aCBAaW5wdXRcclxuICogICAgIGNvbXBSZWYuaW5zdGFuY2Uub3V0cHV0JC5zdWJzY3JpYmUodmFsID0+IHt9KTsgLy8gZGVhbGluZyB3aXRoIEBvdXRwdXRcclxuICogICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8qKlxyXG4gKiBQcm92aWRlIHNlcnZpY2UgdG8gYWRkIG9yIHJlbW92ZSBjb21wb25lbnQgZHluYW1pY2FsbHlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIC8qKiB1c2VkIHRvIGNyZWF0ZSBhIGZhY3RvcnkgZnJvbSBhIGNvbXBvbmVudCBjbGFzcyAqL1xyXG4gICAgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XHJcbiAgICAvKiogZGVmaW5lcyB3aGVyZSBhIGR5bmFtaWMgY29tcG9uZW50cyBpbnNlcnQgaW50byAqL1xyXG4gICAgcm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICBjb25zdHJ1Y3RvcihmYWN0b3J5UmVzb2x2ZXI6IGFueSk7XHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgY29tcG9uZW50IHJlZmVyZW5jZVxyXG4gICAgICogVGhlIHJlYXNvbiB0byBzZXBlcmF0ZSBgY3JlYXRlQ29tcG5lbnRgIGFuZCBgaW5zZXJ0Q29tcG9uZW50YCBpc1xyXG4gICAgICogdG8gYWxsb3cgc29tZSBhY3Rpb25zIGJlZm9yZSB3ZSBpbnNlcnQgaW50byBhIGhvc3RWaWV3LlxyXG4gICAgICogZS5nIHN0eWxpbmcsIHNldHRpbmcgYXR0cmlidXRlcywgZXRjXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgaW50bz86IFZpZXdDb250YWluZXJSZWYpOiBDb21wb25lbnRSZWY8YW55PjtcclxuICAgIC8qKlxyXG4gICAgICogaW5zZXJ0IGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IENvbXBvbmVudDtcclxufVxyXG4iXX0=