import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { TwoComponent } from './two.component';
import { MockComponent } from '../../../test/jest-setup';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TwoComponent,
        MockComponent('some-component')
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it("should have as title 'app'", async(() => {
    const fixture = TestBed.createComponent(TwoComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should render "Module Two Component"', async(() => {
    const fixture = TestBed.createComponent(TwoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Module Two');
  }));

});
