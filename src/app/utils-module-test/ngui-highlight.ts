import { Component } from '@angular/core';

@Component({
  template: `
    <h2>nguiHighlight pipe test</h2>
    <div [innerHTML]="'nguiHighlight pipe highlights the given word' | nguiHighlight:'highlight'"></div>
  `,
  // tslint:disable
  styles: ['::ng-deep .ngui-highlight { color: red; font-weight: bold;}']
  // tslint:enable
})
export class NguiHighlightPipeTestComponent {
}
