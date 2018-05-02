import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { fireEvent } from '../../../modules';

@Component({
  template: `
    <div id="test-div" style="border: 1px solid #ccc"
      (click)="myEvent($event)"
      (mousedown)="myEvent($event)"
      (mouseup)="myEvent($event)"
      (keydown)="myEvent($event)"
      (keyup)="myEvent($event)"
      (keypress)="myEvent($event)"
      (touchstart)="myEvent($event)"
      (touchmove)="myEvent($event)"
      (touchend)="myEvent($event)">
      <br/> Target:
      <br/> #test-div(Event will be fire on this element)
      <br/><br/>
    </div>
    Fire the following event programmtically on the target.
    <div>
      <button id="a1" (click)="fireEventTo('#test-div', 'click')">click</button>
      <button id="a2" (click)="fireEventTo('#test-div', 'mousedown')">mousedown</button>
      <button id="a3" (click)="fireEventTo('#test-div', 'mouseup')">mouseup</button>
      <br/>
      <button id="a4" (click)="fireEventTo('#test-div', 'keydown', {key: 'Enter'})">keydown</button>
      <button id="a5" (click)="fireEventTo('#test-div', 'keyup',  {key: 'Enter'})">keyup</button>
      <button id="a6" (click)="fireEventTo('#test-div', 'keypress',  {key: 'Enter'})">keypress</button>
      <br/>
      <button id="a7" (click)="fireEventTo('#test-div', 'touchstart')">touchstart</button>
      <button id="a8" (click)="fireEventTo('#test-div', 'touchmove')">touchmove</button>
      <button id="a9" (click)="fireEventTo('#test-div', 'touchend')">touchend</button>
    </div>
    Log:
    <div id="log">{{ message }}</div>
  `
})
export class FireEventTestComponent {
  message: string;

  constructor(private el: ElementRef) {}

  fireEventTo(selector: string, type, options): void {
    const target = this.el.nativeElement.querySelector(selector);
    fireEvent(target, type, options);
  }

  myEvent(event: any): void {
    this.message = `${event['type']} event is fired on #${event.target.id}`;
  }

}
