// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {NguiListDirective} from './ngui-list.directive';
import {Component, ElementRef} from '@angular/core';
import 'jest';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
}

@Component({
  template: `
    <ngui-list
      (selected)="onSelected()"
      (escaped)="onEscaped()">
    </ngui-list>
  `
})
class DirectiveTestComponent {
  onSelected(): void { /* */ }
  onEscaped(): void { /* */ }
}

describe('NguiListDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NguiListDirective, DirectiveTestComponent],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(NguiListDirective));
    directive = directiveEl.injector.get(NguiListDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

});
