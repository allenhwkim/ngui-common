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
}
