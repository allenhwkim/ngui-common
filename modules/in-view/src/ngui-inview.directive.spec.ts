import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { NguiInviewDirective } from './ngui-inview.directive';

// Ref. https://codecraft.tv/courses/angular/unit-testing/directives/
@Component({
  template: `
    <div (nguiInview)="a($event)" (nguiOutview)="b($event)">`
})
class TestComponent {
  a(entry): void {/* */}
  b(entry): void {/* */}
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguiInviewDirective, TestComponent ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it("should run '#constructor'", async(() => {
    // const comp = fixture.debugElement.componentInstance;
    // expect(comp).toBeTruthy();
  }));

  it('should run "#ngOnInit"', async(() => {
    // const fixture = TestBed.createComponent(TwoComponent);
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('p').textContent).toContain('Module Two');
  }));

  it('should run "#handleIntersect"', async(() => {
    // TODO
  }));

});
