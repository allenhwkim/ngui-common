import {
  Component,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { NguiVirtualListComponent } from './ngui-virtual-list.component';

@Component({
  selector: 'ngui-autocomplete',
  template: `
    <div *ngIf="isReady"
      class="ngui-autocomplete">
      <div #pages></div>
      <ngui-inview (inview)="addAnInviewPageToPages()"></ngui-inview>
    </div>
  `
})
export class NguiAutocompleteComponent extends NguiVirtualListComponent {
  focused: any = {input: false, listItem: false};
  focusTimer;

  get isReady(): boolean {
    return this.focused.input || this.focused.listItem;
  }

  setFocused(elType: 'input' | 'listItem', val: boolean): void {
    if (val) {
      clearTimeout(this.focusTimer);
      this.focused = {input: false, listItem: false};
      this.focused[elType] = true;
    } else {
      this.focusTimer = setTimeout(_ => {
        this.focused[elType] = false;
        this.cdr.detectChanges();
      }, 500);
    }
  }
}
