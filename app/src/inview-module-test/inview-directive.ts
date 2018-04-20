import { Component, ElementRef } from '@angular/core';

@Component({
  template: `
    <h2>(nguiInview) (nguiOutview) directive test</h2>

    <div style="height: 800px; border: 1px solid #ccc">
    This is filler element to push down the greyed element. <br/>
    Scroll down to see how message reacts to when the greyed
    element is in viewport and out of viewport.
    <div style="text-align: center; font-size: 200px">&#8595;</div>
    <div style="text-align: center; font-size: 200px">&#8595;</div>
    <div style="text-align: center; font-size: 200px">&#8595;</div>
    </div>

    <div style="background: #ccc"
      (nguiInview)="message='nguiInview'"
      (nguiOutview)="message='nguiOutview'">
      If this is in viewport, message is 'nguiInview'. <br/>
      If this is out ot viewport, message is 'nguiOutview'. <br/>
    </div>

    <div class="message"> {{ message }} </div>
  `,
  styles: [`
    div {padding: 12px}
    .message { position: fixed; padding: 5px; bottom: 0; left: 50%; background: #333;color: #fff; }
  `]
})
export class InviewDirectiveTestComponent {
  message: string;
}
