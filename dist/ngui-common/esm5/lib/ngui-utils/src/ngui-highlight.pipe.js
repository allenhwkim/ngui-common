/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var NguiHighlightPipe = /** @class */ (function () {
    function NguiHighlightPipe() {
    }
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    NguiHighlightPipe.prototype.transform = /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    function (text, search) {
        var /** @type {?} */ ret = text;
        if (search) {
            var /** @type {?} */ re = new RegExp(search, 'ig');
            ret = text.replace(re, function (match) { return "<span class=\"ngui-highlight\">" + match + "</span>"; });
        }
        return ret;
    };
    NguiHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'nguiHighlight' },] },
    ];
    return NguiHighlightPipe;
}());
export { NguiHighlightPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBSWxELHFDQUFTOzs7OztJQUFULFVBQVUsSUFBWSxFQUFFLE1BQWM7UUFDcEMscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxxQkFBTSxFQUFFLEdBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLG9DQUFnQyxLQUFLLFlBQVMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaOztnQkFWRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFOzs0QkFGL0I7O1NBR2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==