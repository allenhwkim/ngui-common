/* tslint:disable */
import { async, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { NguiAutocompleteComponent } from './ngui-autocomplete.component';
import { MockComponent } from '../../../../../../test/test-utils';

import {ChangeDetectorRef, ComponentRef, ElementRef, Injectable, Renderer2} from '@angular/core';

import { DynamicComponentService } from '../../ngui-utils/src/dynamic-component.service';
import 'jest';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {
    getBoundingClientRect: () => ({
      top: 10, height: 10
    })
  };
}

@Injectable()
class MockDynamicComponentService extends DynamicComponentService {
  createComponent() {
    return <ComponentRef<any>>{ instance: {} }
  }
  // @ts-ignore
    insertComponent() {}
}

describe('NguiAutocompleteComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    document.body.innerHTML = '<input id="my-input">';

    TestBed.configureTestingModule({
      declarations: [
        NguiAutocompleteComponent,
        MockComponent('ngui-inview')
      ],
      providers: [
        Renderer2,
        ChangeDetectorRef,
        // { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: DynamicComponentService, useClass: MockDynamicComponentService } // will be mocked
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NguiAutocompleteComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should run #isReady', async(() => {
    component.inputEl = document.querySelector('#my-input');
    expect(component.isReady).toBe(false);
  }));

  it('should run #ngOnInit', async(() => {
    component.for = 'my-input';
    component.positionThisUnderInputEl = jest.fn();
    component.onInputElKeyup = jest.fn();
    component.onInputElFocused = jest.fn();
    component.onInputElBlurred = jest.fn();
    component.onSelected = jest.fn();
    component.onEscaped = jest.fn();

    component.ngOnInit();
    expect(component.positionThisUnderInputEl).toHaveBeenCalled();
  }));

  it('should run #onSelected', async(() => {
    component.inputEl = document.querySelector('#my-input');
    component.onSelected(1);
    expect(component._lastSelected).toBe(1);
  }));

  it('should run #onEscaped', async(() => {
    component.inputEl = document.querySelector('#my-input');
    component._orgInputValue = 0;
    component.onEscaped();
    expect(component.inputEl.value).toBe('0');
  }));

  it('should run #onInputElFocused', async(() => {
    component.inputEl = document.querySelector('#my-input');
    component.setFocused = jest.fn();
    component.onInputElFocused();
    expect(component.setFocused).toHaveBeenCalledWith('input', true);
  }));

  it('should run #onInputElBlurred', async(() => {
    component.setFocused = jest.fn();
    component.onInputElBlurred();
    expect(component.setFocused).toHaveBeenCalledWith('input', false);
  }));

  it('should run #clearList', async(() => {
    component.inviewPages = [ {destroy: jest.fn()} ];
    component.clearList();
    expect(component.inviewPages).toEqual([]);
  }));

  it('should run #onInputElKeup', async(() => {
    component.element.nativeElement.querySelector
      = jest.fn().mockReturnValue({focus: jest.fn()});
    component.onEscaped = jest.fn();
    component.addAutocompleteList = jest.fn();
    //
  }));

  it('should run #addAutocompleteList', async(() => {
    Object.defineProperty(component, 'isReady', {value: () => true});
    component.inputEl = document.querySelector('#my-input');
    component.clearList = jest.fn();
    component.addAnInviewPageToPages = jest.fn();
    component.addAutocompleteList();
    // expect(component.addAnInviewPageToPages).toHaveBeenCalled();
  }));

  it('should run #addMorePages', async(() => {
    component.inviewPages = [1,2];
    component.addAnInviewPageToPages = jest.fn();
    component.addMorePages();
    expect(component.addAnInviewPageToPages).toHaveBeenCalled();
  }));

  it('should run #setFocused', async(() => {
    component.cdr.detectChanges = jest.fn();
    component.setFocused('input', true);
    expect(component._focused.input).toBe(true);
    component.setFocused('input', false);
  }));

  it('should run #positionThisUnderInputEl', async(() => {
    component.inputEl = document.querySelector('#my-input');
    component.renderer.setStyle = jest.fn();
    component.positionThisUnderInputEl();
    expect(component.renderer.setStyle).toHaveBeenCalled();
  }));

  it('should run #addList', async(() => {
    component.cdr.detectChanges = jest.fn();
    component.inviewPages = [1];
    component.inviewPage = {
      instance: { setItems: jest.fn()}
    };
    component.addList([123]);
    expect(component.inviewPage.instance.setItems).toHaveBeenCalled();
  }));

});
