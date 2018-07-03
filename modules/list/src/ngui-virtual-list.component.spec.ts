/* tslint:disable */
import { async, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { MockComponent } from '../../../test/jest-setup';

import {ChangeDetectorRef, ComponentRef, ElementRef, Renderer2} from '@angular/core';

import { DynamicComponentService } from '../../utils';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {};
}

class MockDynamicComponentService extends DynamicComponentService {
  createComponent(comp, ref) {
    return <ComponentRef<any>>{ instance: {} }
  }
  insertComponent(param) {}
}

describe('NguiVirtualListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NguiVirtualListComponent,
        MockComponent('ngui-inview')
      ],
      providers: [
        Renderer2,
        ChangeDetectorRef,
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: DynamicComponentService, useClass: MockDynamicComponentService } // will be mocked
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NguiVirtualListComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should test #ngAfterViewInit', async(() => {
    const spyError = jest.spyOn(console, 'error');
    component.ngAfterViewInit();

    expect(spyError).toHaveBeenCalled();
  }));

  it('should #addAnInviewPageToPages', async(() => {
    const spy = jest.spyOn(component.bottomInview, 'emit');
    component.addAnInviewPageToPages();

    expect(spy).toHaveBeenCalled();
  }));

  it('should #addList', async(() => {
    component.inviewPage = { instance: { setItems: _ => {} } }
    const spy = jest.spyOn(component.inviewPage.instance, 'setItems');
    component.addList([]);

    expect(spy).toHaveBeenCalled();
  }));
});
