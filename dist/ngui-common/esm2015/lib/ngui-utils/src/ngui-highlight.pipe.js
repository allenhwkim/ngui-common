/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
export class NguiHighlightPipe {
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    transform(text, search) {
        let /** @type {?} */ ret = text;
        if (search) {
            const /** @type {?} */ re = new RegExp(search, 'ig');
            ret = text.replace(re, match => `<span class="ngui-highlight">${match}</span>`);
        }
        return ret;
    }
}
NguiHighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'nguiHighlight' },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxNQUFNOzs7Ozs7SUFDSixTQUFTLENBQUMsSUFBWSxFQUFFLE1BQWM7UUFDcEMscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCx1QkFBTSxFQUFFLEdBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLGdDQUFnQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaOzs7WUFWRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==