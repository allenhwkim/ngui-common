// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {NguiListItemDirective} from './ngui-list-item.directive';
import {Component, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
import {NguiListDirective} from './ngui-list.directive';
import {NguiVirtualListComponent} from './ngui-virtual-list.component';
import {NguiAutocompleteComponent} from './ngui-autocomplete.component';
import {NoMatchFound} from './no-match-found';
import 'jest';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
}
class MockNguiListDirective extends NguiListDirective {
}
      
class MockNguiVirtualListComponent extends NguiVirtualListComponent {
}
      
class MockNguiAutocompleteComponent extends NguiAutocompleteComponent {
}
      
(<any>window).HTMLElement = jest.fn();
      
@Component({
  template: `
    <ngui-list-item [item]="object" ></ngui-list-item>
  `
})
class DirectiveTestComponent {
  object: any;
}

describe('NguiListItemDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NguiListItemDirective, DirectiveTestComponent],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        Renderer2,
        ViewContainerRef,
        {provide: NguiListDirective, useClass: MockNguiListDirective},
        {provide: NguiVirtualListComponent, useClass: MockNguiVirtualListComponent},
        {provide: NguiAutocompleteComponent, useClass: MockNguiAutocompleteComponent},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(NguiListItemDirective));
    directive = directiveEl.injector.get(NguiListItemDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

  it('should run #ngOnInit()', async(() => {
    expect(() => {
      directive.ngOnInit();
    }).toThrow();

    directive.listDirective = true;
    directive.object = new NoMatchFound();

    directive.ngOnInit();
    expect(directive.el.nativeElement.innerHTML).toBe('No Match Found');
  }));
        
  it('should run #keydown()', async(() => {
    function El() { this.focus = jest.fn(); }
    const thisEl = new El();
    const allEl = [new El(), thisEl, new El()];

    directive.el.nativeElement = thisEl;
    directive.parentListComp = {
      element: {
        nativeElement: {
          querySelectorAll: () => allEl
        }
      }
    };
    directive.keydown({which: 1});
    expect(thisEl.focus).not.toHaveBeenCalled();

    directive.keydown({which: 37});
    expect(allEl[0].focus).toHaveBeenCalled();

    directive.keydown({which: 39});
    expect(allEl[2].focus).toHaveBeenCalled();
  }));
        
  it('should run #keyup()', async(() => {
    directive.parentListComp = {
      selected: { emit: jest.fn() },
      escaped: { emit: jest.fn() }
    };

    directive.keyup({key: 'Enter'});
    expect(directive.parentListComp.selected.emit).toHaveBeenCalled();

    directive.keyup({key: 'Escape'});
    expect(directive.parentListComp.escaped.emit).toHaveBeenCalled();
  }));
        
  it('should run #mousedown()', async(() => {
    directive.parentListComp = {
      selected: { emit: jest.fn() }
    };

    directive.mousedown();
    expect(directive.parentListComp.selected.emit).toHaveBeenCalled();
  }));
        
  it('should run #focused()', async(() => {
    directive.parentListComp = { setFocused: jest.fn() };

    directive.focused();
    expect(directive.parentListComp.setFocused)
      .toHaveBeenCalledWith('listItem', true);
  }));
        
  it('should run #blurred()', async(() => {
    directive.parentListComp = { setFocused: jest.fn() };

    directive.blurred();
    expect(directive.parentListComp.setFocused)
      .toHaveBeenCalledWith('listItem', false);
  }));
      
});