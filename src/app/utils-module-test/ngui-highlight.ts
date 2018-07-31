import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <h2>nguiHighlight pipe test</h2>
    <div [innerHTML]="'nguiHighlight pipe highlights the given word' | nguiHighlight:'highlight'"></div>
  `,
  // tslint:disable
  styles: ['.ngui-highlight { color: red; font-weight: bold;}'],
  // tslint:enable
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NguiHighlightPipeTestComponent {
}
