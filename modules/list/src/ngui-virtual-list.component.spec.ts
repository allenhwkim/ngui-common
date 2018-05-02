import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// do not import any other than you test. For others, mock it
import { NguiVirtualListComponent } from './ngui-virtual-list.component';
import { MockComponent } from '../../../test/jest-setup';

describe('AppComponent', () => {
  // let fixture;
  // let component;

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [
    //     NguiVirtualListComponent,
    //     MockComponent('some-component')
    //   ]
    //   // schemas: [NO_ERRORS_SCHEMA]
    // }).compileComponents();
    // fixture = TestBed.createComponent(NguiVirtualListComponent);
    // component = fixture.debugElement.componentInstance;
  }));

  it("should have as title 'app'", async(() => {
    // expect(component).toBeTruthy();
  }));

  it('should render "Module Two Component"', async(() => {
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('p').textContent).toContain('Module Two');
  }));

});
