import { Component } from '@angular/core';

@Component({
  template: `
    <h2>nguiHighlight pipe test</h2>
    <div [innerHTML]="'nguiHighlight pipe highlights the given word' | nguiHighlight:'highlight'"></div>
  `,
  /* eslint-disable */
  styles: ['::ng-deep .ngui-highlight { color: red; font-weight: bold;}']
  /* eslint-enable */
})
export class NguiHighlightPipeTestComponent {
}
