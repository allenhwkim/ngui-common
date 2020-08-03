import {Component, ElementRef} from '@angular/core';

@Component({
  template: `
    <h2>ngui-inview component test</h2>
    <hr/>
    List Of Images
    <hr/>

    <div *ngFor="let i of numArr">
      <ngui-inview
        (inview)="updateImageCount()"
      > <!-- only displays when this is in viewport -->
        <img *ngIf src="https://picsum.photos/800/300?image={{i}}" height="33%">
      </ngui-inview>
    </div>

    <div class="num-images">
      Number of &lt;img> tag on document: {{ numImages }}
    </div>
  `,
  styles: [`
    ngui-inview {
      min-height: 300px;
    }
    .num-images {
      position: fixed; padding: 5px;
      bottom: 0; right: 0; background: #333;color: #fff;
    }
  `]
})
export class InviewComponent {
  numImages = 0;
  numArr = Array.from(Array(100), (_, x) => x);

  constructor(public element: ElementRef) {}

  updateImageCount() {
    this.numImages = this.element.nativeElement.querySelectorAll('img').length;
  }
}
