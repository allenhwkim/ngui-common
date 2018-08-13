import { async, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  PLATFORM_ID,
} from '@angular/core';
import { By } from '@angular/platform-browser';

// do not import any other than you test. For others, mock it
import { NguiInviewDirective } from './ngui-inview.directive';
import 'jest';

(window as any).IntersectionObserver = jest.fn();
IntersectionObserver.prototype.observe = jest.fn();
IntersectionObserver.prototype.disconnect = jest.fn();

class MockElementRef extends ElementRef {
  nativeElement = {};
  constructor() { super(undefined); }
}

@Component({
  template: `
    <div
      [options]="options"
      (nguiInview)="onNguiInview($event)"
      (nguiOutview)="onNguiOutview($event)">
    </div>
  `
})
class DirectiveTestComponent {
  options: any;
  onNguiInview(): void {/* */}
  onNguiOutvie(): void {/* */}
}

describe('NguiInviewDirective', () => {
  let fixture;
  let component;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NguiInviewDirective, DirectiveTestComponent],
      providers: [
        { provide: ElementRef, useClass: MockElementRef },
        { provide: PLATFORM_ID, useValue: 'browser'}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(NguiInviewDirective));
    directive = directiveEl.injector.get(NguiInviewDirective);
    directive.observer = { disconnect: jest.fn() };
  }));

  it('should run a directive', async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

  it('should run #ngOnInit', async(() => {
    directive.ngOnInit();
    expect(directive.observer).toBeTruthy();
  }));

  it('should run #ngOnDestroy', async(() => {
    directive.ngOnDestroy();
    expect(directive.observer.disconnect).toHaveBeenCalled();
  }));

  it('should run #handleIntersect', async(() => {
    let entries = [ {isIntersecting: true} ];
    directive.nguiInview.emit = jest.fn();
    directive.handleIntersect(entries);
    expect(directive.nguiInview.emit).toHaveBeenCalled();

    entries = [ {isIntersecting: false} ];
    directive.nguiOutview.emit = jest.fn();
    directive.handleIntersect(entries);
    expect(directive.nguiOutview.emit).toHaveBeenCalled();
  }));

});
