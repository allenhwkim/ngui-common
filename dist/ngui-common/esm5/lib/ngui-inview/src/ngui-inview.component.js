import { __decorate, __metadata, __param } from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * An element that listens to viewport positioning and fires inView and notInview events
 * ### example
 * ```ts
 * <ngui-inview [observerOptions]="myObserverOptions" (inview)="doA()" (notInview)="doB()">
 *   <img *ngIf src="https://picsum.photos/800/300?image=1>
 * </ngui-inview>
 * ```
 */
var NguiInviewComponent = /** @class */ (function () {
    function NguiInviewComponent(element, platformId) {
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
    NguiInviewComponent.prototype.ngOnInit = function () {
        if (this.options) {
            this.observerOptions = this.options;
        }
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
            this.observer.observe(this.element.nativeElement);
        }
    };
    /** stop IntersectionObserver */
    NguiInviewComponent.prototype.ngOnDestroy = function () {
        this.observer.disconnect();
    };
    /** fires (inview) and (notInview) events when this component is visible or not visible  */
    NguiInviewComponent.prototype.handleIntersect = function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            if (entry['isIntersecting']) {
                _this.isInview = true;
                _this.defaultInviewHandler(entry);
                _this.inview.emit(entry);
            }
            else {
                _this.notInview.emit(entry);
            }
        });
    };
    /**
     * default intersection handler, which sets blur dependes on intersection ratio
     * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
     */
    NguiInviewComponent.prototype.defaultInviewHandler = function (entry) {
        if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length) {
            return;
        }
        if (entry.intersectionRatio < 0.8) {
            var opacity = entry.intersectionRatio * (1 / 0.8);
            var blur_1 = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
            var filter = "blur(" + blur_1 + "px)";
            Object.assign(entry.target.style, { opacity: opacity, filter: filter });
        }
        else {
            entry.target.style.opacity = 1;
            entry.target.style.filter = 'unset';
            this.once80PctVisible = true;
        }
    };
    NguiInviewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        ContentChild(TemplateRef, { static: true }),
        __metadata("design:type", TemplateRef)
    ], NguiInviewComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "observerOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NguiInviewComponent.prototype, "blurEnabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewComponent.prototype, "inview", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NguiInviewComponent.prototype, "notInview", void 0);
    NguiInviewComponent = __decorate([
        Component({
            selector: 'ngui-inview',
            template: "\n        <ng-container *ngIf=\"isInview\" [ngTemplateOutlet]=\"template\">\n        </ng-container>\n    ",
            styles: [':host {display: block;}']
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], NguiInviewComponent);
    return NguiInviewComponent;
}());
export { NguiInviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1pbnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ndWkvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL25ndWktaW52aWV3L3NyYy9uZ3VpLWludmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxEOzs7Ozs7OztHQVFHO0FBU0g7SUF1QkUsNkJBQ2MsT0FBbUIsRUFDRSxVQUFlO1FBRHBDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDRSxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBckJoRCxtQ0FBbUM7UUFDNUIsb0JBQWUsR0FBNkIsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUluRzs7WUFFSTtRQUNLLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLFdBQU0sR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxjQUFTLEdBQTRDLElBQUksWUFBWSxFQUFFLENBQUM7UUFHaEYsaURBQWlEO1FBQ25ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDZixtRkFBbUY7UUFDckYscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBS3pCLENBQUM7SUFFQyxrQ0FBa0M7SUFDcEMsc0NBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7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QXhCdEIsbUJBQW1CLENBK0UvQjtJQUFELDBCQUFDO0NBQUEsQUEvRUQsSUErRUM7U0EvRVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFBMQVRGT1JNX0lELFxyXG4gICAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vKipcclxuICogQW4gZWxlbWVudCB0aGF0IGxpc3RlbnMgdG8gdmlld3BvcnQgcG9zaXRpb25pbmcgYW5kIGZpcmVzIGluVmlldyBhbmQgbm90SW52aWV3IGV2ZW50c1xyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGB0c1xyXG4gKiA8bmd1aS1pbnZpZXcgW29ic2VydmVyT3B0aW9uc109XCJteU9ic2VydmVyT3B0aW9uc1wiIChpbnZpZXcpPVwiZG9BKClcIiAobm90SW52aWV3KT1cImRvQigpXCI+XHJcbiAqICAgPGltZyAqbmdJZiBzcmM9XCJodHRwczovL3BpY3N1bS5waG90b3MvODAwLzMwMD9pbWFnZT0xPlxyXG4gKiA8L25ndWktaW52aWV3PlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd1aS1pbnZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSW52aWV3XCIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIGAsXHJcbiAgc3R5bGVzOiBbJzpob3N0IHtkaXNwbGF5OiBibG9jazt9J11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlJbnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKiogPG5nLXRlbXBsYXRlPiByZWZlcmVuY2UgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqIEludGVyc2VjdGlvbk9ic2VydmVyIG9wdGlvbnMgKi9cclxuICBASW5wdXQoKSBvYnNlcnZlck9wdGlvbnM6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHt0aHJlc2hvbGQ6IFsuMSwgLjIsIC4zLCAuNCwgLjUsIC42LCAuNywgLjhdfTtcclxuICAgIC8qKiBEZXByZWNhdGVkIGNvbmZpZy4gVXNlIGBvYnNlcnZlck9wdGlvbnNgIGluc3RlYWQuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYG9ic2VydmVyT3B0aW9uc2AgaW5zdGVhZC4gKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgLyoqIENvbnRyb2xzIHdoZXRoZXIgYmx1ciBlZmZlY3QgaXMgYXBwbGllZCB0byBhIGNvbXBvbmVudCB3aXRoIGxlc3MgdGhhbiA4MCUgaW50ZXJzZWN0aW9uIHJhdGlvLlxyXG4gICAqIE9ubHkgYXBwbGllcyB3aGVuIHRoZXJlIGFyZSBubyBcImludmlld1wiIGV2ZW50IGhhbmRsZXJzIGRlZmluZWQuXHJcbiAgICoqL1xyXG4gIEBJbnB1dCgpIGJsdXJFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGludmlldzogRXZlbnRFbWl0dGVyPEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBub3RJbnZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG4gICAgLyoqIGluZGljYXRlcyB0aGF0IHRoaXMgZWxlbWVudCBpcyBpbiB2aWV3cG9ydCAqL1xyXG4gIGlzSW52aWV3ID0gZmFsc2U7XHJcbiAgICAvKiogaW5kaWNhdGVzIHRoYXQgdGhpcyBlbGVtZW50IGlzIDgwJSBpbiB2aWV3cG9ydC4gVXNlZCBieSB0aGUgZGVmYXVsdCBjYWxsYmFjayAqL1xyXG4gIG9uY2U4MFBjdFZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XHJcbiAgfVxyXG5cclxuICAgIC8qKiBTdGFydHMgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLmhhbmRsZUludGVyc2VjdC5iaW5kKHRoaXMpLCB0aGlzLm9ic2VydmVyT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8qKiBzdG9wIEludGVyc2VjdGlvbk9ic2VydmVyICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9XHJcblxyXG4gICAgLyoqIGZpcmVzIChpbnZpZXcpIGFuZCAobm90SW52aWV3KSBldmVudHMgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB2aXNpYmxlIG9yIG5vdCB2aXNpYmxlICAqL1xyXG4gIGhhbmRsZUludGVyc2VjdChlbnRyaWVzKTogdm9pZCB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeVsnaXNJbnRlcnNlY3RpbmcnXSkge1xyXG4gICAgICAgIHRoaXMuaXNJbnZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdEludmlld0hhbmRsZXIoZW50cnkpO1xyXG4gICAgICAgIHRoaXMuaW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubm90SW52aWV3LmVtaXQoZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IGludGVyc2VjdGlvbiBoYW5kbGVyLCB3aGljaCBzZXRzIGJsdXIgZGVwZW5kZXMgb24gaW50ZXJzZWN0aW9uIHJhdGlvXHJcbiAgICAgKiB0aGlzIHdvbid0IGJlIGludm9rZWQgaWYgdXNlciBwcm92aWRlcyBhbnkgKGludmlldykgZXZlbnQuIGUuZy4gKGludmlldyk9XCJzb21ldGhpbmcoKVwiXHJcbiAgICAgKi9cclxuICBkZWZhdWx0SW52aWV3SGFuZGxlcihlbnRyeSk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuYmx1ckVuYWJsZWQgfHwgdGhpcy5vbmNlODBQY3RWaXNpYmxlIHx8IHRoaXMuaW52aWV3Lm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA8IDAuOCkge1xyXG4gICAgICBjb25zdCBvcGFjaXR5ID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAoMSAvIDAuOCk7XHJcbiAgICAgIGNvbnN0IGJsdXIgPSAyMCAtIE1hdGguZmxvb3IoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gKiAxMCkgKiA0O1xyXG4gICAgICBjb25zdCBmaWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgT2JqZWN0LmFzc2lnbihlbnRyeS50YXJnZXQuc3R5bGUsIHtvcGFjaXR5LCBmaWx0ZXJ9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVudHJ5LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgZW50cnkudGFyZ2V0LnN0eWxlLmZpbHRlciA9ICd1bnNldCc7XHJcblxyXG4gICAgICB0aGlzLm9uY2U4MFBjdFZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=