import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  ViewContainerRef
} from '@angular/core';

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
@Injectable()
export class DynamicComponentService {
  /** used to create a factory from a component class */
  factoryResolver: ComponentFactoryResolver;
  /** defines where a dynamic components insert into */
  rootViewContainer: ViewContainerRef;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  /**
   * returns component reference
   * The reason to seperate `createCompnent` and `insertComponent` is
   * to allow some actions before we insert into a hostView.
   * e.g styling, setting attributes, etc
   */
  createComponent(component: any, into?: ViewContainerRef): ComponentRef<any> {
    this.rootViewContainer = into || this.rootViewContainer;
    const factory = this.factoryResolver.resolveComponentFactory(component);

    return factory.create(this.rootViewContainer.parentInjector);
  }

  /**
   * insert component
   */
  insertComponent(componentRef: ComponentRef<any>): Component {
    const compId = `ngui-dyn-${Math.floor(Math.random() * 10 ** 7) + 10 ** 6}`;
    componentRef.location.nativeElement.setAttribute('id', compId);
    componentRef.instance.id = compId;

    this.rootViewContainer.insert(componentRef.hostView);

    return componentRef.instance;
  }

}
