// tslint:disble
import { async, TestBed } from '@angular/core/testing';

import { NguiInviewPageComponent } from './ngui-inview-page.component';
import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import 'jest';
import {NguiInviewModule} from '../../ngui-inview/ngui-inview.module';

class MockElementRef extends ElementRef {
  nativeElement = {
  };
  constructor() { super(undefined); }
}
(window as any).HTMLElement = jest.fn();
(window as any).IntersectionObserver = jest.fn();
IntersectionObserver.prototype.observe = jest.fn();
IntersectionObserver.prototype.disconnect = jest.fn();

describe('NguiInviewPageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NguiInviewPageComponent
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        Renderer2,
        ChangeDetectorRef
      ],
      imports: [NguiInviewModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NguiInviewPageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should run #restoreItems()', async(() => {
    component.outView = true;
    component.renderer.setStyle = jest.fn();
    component.restoreItems();

    expect(component.renderer.setStyle).toHaveBeenCalled();
  }));

  it('should run #ngOnInit()', async(() => {
    component.element.nativeElement.querySelector = jest.fn();
    component.ngOnInit();

    expect(component.element.nativeElement.querySelector).toHaveBeenCalled();
  }));

  it('should run #ngOnDestroy()', async(() => {
    component.ngOnDestroy();

    expect(component.destroyed).toBeTruthy();
  }));

  it('should run #emptyItems()', async(() => {
    component.items = [];
    component.contentsEl = 'sth';
    component.outView = false;
    component.element.nativeElement.getBoundingClientRect =
      jest.fn().mockReturnValue({height: 100});
    component.renderer.setStyle = jest.fn();

    component.emptyItems();
    expect(component.renderer.setStyle).toHaveBeenCalled();
  }));

  it('should run #setItems()', async(() => {
    const items = [1, 2, 3];
    component.setItems(items);

    expect(component.items).toEqual([1, 2, 3]);
  }));

});
