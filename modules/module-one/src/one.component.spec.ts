import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { OneComponent } from './one.component';
import { MockComponent } from '../../../test/jest-setup';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneComponent,
        MockComponent('some-component')
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it("should have as title 'app'", async(done => {
    const fixture = TestBed.createComponent(OneComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
    comp.buttonClicked$.subscribe(g => {
      expect(g).toBeTruthy();
      done();
    });
  }));

  it('should render "Click This" in a button tag', async(() => {
    const fixture = TestBed.createComponent(OneComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Click This');
  }));

});
