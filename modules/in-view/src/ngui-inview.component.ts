import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild
 } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ngui-inview',
  template: `
    <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
    </ng-container>
  `,
  styles: [':host {display: block;}']
})
export class NguiInviewComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  isInview = false;
  once50PctVisible = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() options: any = {threshold: [.1, .2, .3, .4, .5, .6, .7, .8]};
  @Output() inview: EventEmitter<any> = new EventEmitter();
  @Output() notInview: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.isInview = true;
        this.defaultInviewHandler(entry);
        this.inview.emit(entry);
      } else {
        this.notInview.emit(entry);
      }
    });
  }

  defaultInviewHandler(entry): any {
    if (this.once50PctVisible)        return false;
    if (this.inview.observers.length) return false;

    if (entry.intersectionRatio < 0.8) {
      const opacity = entry.intersectionRatio * (1 / 0.8);
      const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
      const filter = `blur(${blur}px)`;
      Object.assign(entry.target.style, {opacity, filter});
    } else {
       entry.target.style.opacity = 1;
       entry.target.style.filter = 'unset';

       this.once50PctVisible = true;
    }
  }
}
