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

/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * @example
 * <ngui-in-view [options]="myOptions" (inView)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-in-view>
 */
@Component({
  selector: 'ngui-inview',
  template: `
    <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
    </ng-container>
  `,
  styles: [':host {display: block;}']
})
export class NguiInviewComponent implements OnInit, OnDestroy {
  /** <ng-template> reference */
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  /** IntersectionObserver options */
  @Input() options: any = {threshold: [.1, .2, .3, .4, .5, .6, .7, .8]};
  @Output() inview: EventEmitter<any> = new EventEmitter();
  @Output() notInview: EventEmitter<any> = new EventEmitter();

  observer: IntersectionObserver;
  /** indicates that this element is in viewport */
  isInview = false;
  /** indicates that this element is 80% in viewport. Used by the default callback */
  once80PctVisible = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) {}

  /** Starts IntersectionObserver */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  /** stop IntersectionObserver */
  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  /** fires (inview) and (notInview) events when this component is visible or not visible  */
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

  /**
   * default intersection handler, which sets blur dependes on intersection ratio
   * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
   */
  defaultInviewHandler(entry): any {
    if (this.once80PctVisible)        return false;
    if (this.inview.observers.length) return false;

    if (entry.intersectionRatio < 0.8) {
      const opacity = entry.intersectionRatio * (1 / 0.8);
      const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
      const filter = `blur(${blur}px)`;
      Object.assign(entry.target.style, {opacity, filter});
    } else {
       entry.target.style.opacity = 1;
       entry.target.style.filter = 'unset';

       this.once80PctVisible = true;
    }
  }
}
