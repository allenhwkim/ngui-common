import { async, TestBed } from '@angular/core/testing';
import {
  ElementRef,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';

import { NguiInviewComponent } from './ngui-inview.component';
import 'jest';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {};
}

(window as any).IntersectionObserver = jest.fn();
IntersectionObserver.prototype.observe = jest.fn();
IntersectionObserver.prototype.disconnect = jest.fn();

describe('NguiInviewComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NguiInviewComponent ],
      providers: [
        Renderer2,
        { provide: ElementRef, useClass: MockElementRef },
        { provide: PLATFORM_ID, useValue: 'browser'}
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(NguiInviewComponent);
    component = fixture.debugElement.componentInstance;
    component.observer = { disconnect: jest.fn() };
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should run #ngOnInit', async(() => {
    component.ngOnInit();
    expect(component.observer).toBeTruthy();
  }));

  it('should run #ngOnDestroy', async(() => {
    component.ngOnDestroy();
    expect(component.observer.disconnect).toHaveBeenCalled();
  }));

  it('should run #handleIntersect', async(() => {
    let entries = [ {isIntersecting: true} ];
    component.defaultInviewHandler = jest.fn();
    component.inview.emit = jest.fn();
    component.handleIntersect(entries);
    expect(component.inview.emit).toHaveBeenCalled();

    entries = [ {isIntersecting: false} ];
    component.notInview.emit = jest.fn();
    component.handleIntersect(entries);
    expect(component.notInview.emit).toHaveBeenCalled();
  }));

  it('should run #defaultInviewHandler', async(() => {
    const entry: any = {target: {style: {}}};

    entry.intersectionRatio = 0.7;
    component.defaultInviewHandler(entry);
    expect(entry.target.style.opacity).toBeTruthy();
    expect(entry.target.style.filter).toBeTruthy();

    entry.intersectionRatio = 0.9;
    component.defaultInviewHandler(entry);
    expect(entry.target.style.opacity).toBe(1);
    expect(entry.target.style.filter).toBe('unset');
  }));

});
