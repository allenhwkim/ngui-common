import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { NguiInviewComponent } from './ngui-inview.component';

describe('AppComponent', () => {
  let component: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguiInviewComponent ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    component = TestBed.createComponent(NguiInviewComponent;
  }));

  it("should run '#constructor'", async(() => {
    // const comp = component.debugElement.componentInstance;
    // expect(comp).toBeTruthy();
  }));

  it('should run "#ngOnInit"', async(() => {
    // const fixture = TestBed.createComponent(TwoComponent);
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('p').textContent).toContain('Module Two');
  }));

  it('should run "#handleInteect"', async(() => {
    //
  }));

  it('should run "#defaultInviewHandler"', async(() => {
    //
  }));

});
