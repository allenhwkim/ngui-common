import { Component, ContentChild, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 An element that listens to viewport positioning and fires inView and notInview events
 ### Example
 ```html
 <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
   <img *ngIf src="https://picsum.photos/800/300?image=1>
 </ngui-inview>
 ```
 */
export class NguiInviewComponent {
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        /** IntersectionObserver options */
        this.observerOptions = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
        /** Controls whether blur effect is applied to a component with less than 80% intersection ratio.
         * Only applies when there are no "inview" event handlers defined.
         **/
        this.blurEnabled = true;
        this.inview = new EventEmitter();
        this.notInview = new EventEmitter();
        /** indicates that this element is in viewport */
        this.isInview = false;
        /** indicates that this element is 80% in viewport. Used by the default callback */
        this.once80PctVisible = false;
    }
    /** Starts IntersectionObserver */
    ngOnInit() {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    }
    /** stop IntersectionObserver */
    ngOnDestroy() {
        this.observer.disconnect();
    }
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry['isIntersecting']) {
                this.isInview = true;
                this.defaultInviewHandler(entry);
                this.inview.emit(entry);
            }
            else {
                this.notInview.emit(entry);
            }
        });
    }
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    defaultInviewHandler(entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            const opacity = entry.intersectionRatio * (1 / 0.8);
            const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            const filter = `blur(${blur}px)`;
            Object.assign(entry.target.style, { opacity, filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    }
}
NguiInviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiInviewComponent, deps: [{ token: i0.ElementRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
NguiInviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.2", type: NguiInviewComponent, selector: "ngui-inview", inputs: { observerOptions: "observerOptions", options: "options", blurEnabled: "blurEnabled" }, outputs: { inview: "inview", notInview: "notInview" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: `
        <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
        </ng-container>
    `, isInline: true, styles: [":host{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiInviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngui-inview',
                    template: `
        <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
        </ng-container>
    `,
                    styles: [':host {display: block;}']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }], observerOptions: [{
                type: Input
            }], options: [{
                type: Input
            }], blurEnabled: [{
                type: Input
            }], inview: [{
                type: Output
            }], notInview: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWludmlldy9zcmMvbmd1aS1pbnZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUVaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1gsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFFbEQ7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sbUJBQW1CO0lBdUI5QixZQUNjLE9BQW1CLEVBQ0UsVUFBZTtRQURwQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQXJCaEQsbUNBQW1DO1FBQzVCLG9CQUFlLEdBQTZCLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFJbkc7O1lBRUk7UUFDSyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVsQixXQUFNLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckUsY0FBUyxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2hGLGlEQUFpRDtRQUNuRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2YsbUZBQW1GO1FBQ3JGLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQUt6QixDQUFDO0lBRUMsa0NBQWtDO0lBQ3BDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FB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dENoaWxkLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUExBVEZPUk1fSUQsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gQW4gZWxlbWVudCB0aGF0IGxpc3RlbnMgdG8gdmlld3BvcnQgcG9zaXRpb25pbmcgYW5kIGZpcmVzIGluVmlldyBhbmQgbm90SW52aWV3IGV2ZW50c1xyXG4gIyMjIEV4YW1wbGVcclxuIGBgYGh0bWxcclxuIDxuZ3VpLWludmlldyBbb2JzZXJ2ZXJPcHRpb25zXT1cIm15T2JzZXJ2ZXJPcHRpb25zXCIgKGludmlldyk9XCJkb0EoKVwiIChub3RJbnZpZXcpPVwiZG9CKClcIj5cclxuICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gPC9uZ3VpLWludmlldz5cclxuIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3VpLWludmlldycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJbnZpZXdcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgYCxcclxuICBzdHlsZXM6IFsnOmhvc3Qge2Rpc3BsYXk6IGJsb2NrO30nXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aUludmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIC8qKiA8bmctdGVtcGxhdGU+IHJlZmVyZW5jZSAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICAvKiogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9ucyAqL1xyXG4gIEBJbnB1dCgpIG9ic2VydmVyT3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge3RocmVzaG9sZDogWy4xLCAuMiwgLjMsIC40LCAuNSwgLjYsIC43LCAuOF19O1xyXG4gICAgLyoqIERlcHJlY2F0ZWQgY29uZmlnLiBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC5cclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgb2JzZXJ2ZXJPcHRpb25zYCBpbnN0ZWFkLiAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuICAvKiogQ29udHJvbHMgd2hldGhlciBibHVyIGVmZmVjdCBpcyBhcHBsaWVkIHRvIGEgY29tcG9uZW50IHdpdGggbGVzcyB0aGFuIDgwJSBpbnRlcnNlY3Rpb24gcmF0aW8uXHJcbiAgICogT25seSBhcHBsaWVzIHdoZW4gdGhlcmUgYXJlIG5vIFwiaW52aWV3XCIgZXZlbnQgaGFuZGxlcnMgZGVmaW5lZC5cclxuICAgKiovXHJcbiAgQElucHV0KCkgYmx1ckVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgaW52aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG5vdEludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIGluIHZpZXdwb3J0ICovXHJcbiAgaXNJbnZpZXcgPSBmYWxzZTtcclxuICAgIC8qKiBpbmRpY2F0ZXMgdGhhdCB0aGlzIGVsZW1lbnQgaXMgODAlIGluIHZpZXdwb3J0LiBVc2VkIGJ5IHRoZSBkZWZhdWx0IGNhbGxiYWNrICovXHJcbiAgb25jZTgwUGN0VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHtcclxuICB9XHJcblxyXG4gICAgLyoqIFN0YXJ0cyBJbnRlcnNlY3Rpb25PYnNlcnZlciAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICB0aGlzLm9ic2VydmVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaGFuZGxlSW50ZXJzZWN0LmJpbmQodGhpcyksIHRoaXMub2JzZXJ2ZXJPcHRpb25zKTtcclxuICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgLyoqIHN0b3AgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgICAvKiogZmlyZXMgKGludmlldykgYW5kIChub3RJbnZpZXcpIGV2ZW50cyB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHZpc2libGUgb3Igbm90IHZpc2libGUgICovXHJcbiAgaGFuZGxlSW50ZXJzZWN0KGVudHJpZXMpOiB2b2lkIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcclxuICAgICAgaWYgKGVudHJ5Wydpc0ludGVyc2VjdGluZyddKSB7XHJcbiAgICAgICAgdGhpcy5pc0ludmlldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5pbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ub3RJbnZpZXcuZW1pdChlbnRyeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHQgaW50ZXJzZWN0aW9uIGhhbmRsZXIsIHdoaWNoIHNldHMgYmx1ciBkZXBlbmRlcyBvbiBpbnRlcnNlY3Rpb24gcmF0aW9cclxuICAgICAqIHRoaXMgd29uJ3QgYmUgaW52b2tlZCBpZiB1c2VyIHByb3ZpZGVzIGFueSAoaW52aWV3KSBldmVudC4gZS5nLiAoaW52aWV3KT1cInNvbWV0aGluZygpXCJcclxuICAgICAqL1xyXG4gIGRlZmF1bHRJbnZpZXdIYW5kbGVyKGVudHJ5KTogYW55IHtcclxuICAgIGlmICghdGhpcy5ibHVyRW5hYmxlZCB8fCB0aGlzLm9uY2U4MFBjdFZpc2libGUgfHwgdGhpcy5pbnZpZXcub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDwgMC44KSB7XHJcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqICgxIC8gMC44KTtcclxuICAgICAgY29uc3QgYmx1ciA9IDIwIC0gTWF0aC5mbG9vcihlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyAqIDEwKSAqIDQ7XHJcbiAgICAgIGNvbnN0IGZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICBPYmplY3QuYXNzaWduKGVudHJ5LnRhcmdldC5zdHlsZSwge29wYWNpdHksIGZpbHRlcn0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICBlbnRyeS50YXJnZXQuc3R5bGUuZmlsdGVyID0gJ3Vuc2V0JztcclxuXHJcbiAgICAgIHRoaXMub25jZTgwUGN0VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==