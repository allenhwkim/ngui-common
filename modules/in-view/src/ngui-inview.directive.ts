import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[nguiInview], [nguiOutview]' // tslint:disable-line
})
export class NguiInviewDirective implements OnInit, OnDestroy {
  observer: IntersectionObserver;

  @Input() options: any = {};

  @Output() nguiInview: EventEmitter<any> = new EventEmitter();
  @Output() nguiOutview: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer.disconnect();
    }
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.nguiInview.emit(entry);
      } else {
        this.nguiOutview.emit(entry);
      }
    });
  }
}
