/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class NguiHighlightPipe {
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    transform(text, search) {
        /** @type {?} */
        let ret = text;
        if (search) {
            /** @type {?} */
            const re = new RegExp(search, 'ig');
            ret = text.replace(re, match => `<span class="ngui-highlight">${match}</span>`);
        }
        return ret;
    }
}
NguiHighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'nguiHighlight' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFDNUIsU0FBUyxDQUFDLElBQVksRUFBRSxNQUFjOztZQUNoQyxHQUFHLEdBQUcsSUFBSTtRQUNkLElBQUksTUFBTSxFQUFFOztrQkFDSixFQUFFLEdBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUNwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsS0FBSyxTQUFTLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7O1lBVkYsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ25ndWlIaWdobGlnaHQnIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh0ZXh0OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCByZXQgPSB0ZXh0O1xyXG4gICAgaWYgKHNlYXJjaCkge1xyXG4gICAgICBjb25zdCByZSAgPSBuZXcgUmVnRXhwKHNlYXJjaCwgJ2lnJyk7XHJcbiAgICAgIHJldCA9IHRleHQucmVwbGFjZShyZSwgbWF0Y2ggPT4gYDxzcGFuIGNsYXNzPVwibmd1aS1oaWdobGlnaHRcIj4ke21hdGNofTwvc3Bhbj5gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxufVxyXG4iXX0=