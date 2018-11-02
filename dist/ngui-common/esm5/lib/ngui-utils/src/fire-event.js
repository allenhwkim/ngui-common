/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * fire the given event with options on the element
 * \@example
 * fireEvent(el, 'click');
 * fireEvent(el, 'keypress', {key: 'Enter'});
 * @param {?} el
 * @param {?} type
 * @param {?=} options
 * @return {?}
 */
export function fireEvent(el, type, options) {
    if (options === void 0) { options = {}; }
    /** @type {?} */
    var event;
    if (type === 'click' || type.match(/^mouse/)) {
        event = new MouseEvent(type, options);
    }
    else if (type.match(/^key/)) {
        event = new KeyboardEvent(type, options);
    }
    else if (type.match(/^touch/)) {
        event = new TouchEvent(type, options);
    }
    return el.dispatchEvent(event);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsTUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFlLEVBQUUsSUFBWSxFQUFFLE9BQWlCO0lBQWpCLHdCQUFBLEVBQUEsWUFBaUI7O1FBQ3BFLEtBQUs7SUFDVCxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdCLEtBQUssR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDMUM7U0FBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0IsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2QztJQUVELE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGZpcmUgdGhlIGdpdmVuIGV2ZW50IHdpdGggb3B0aW9ucyBvbiB0aGUgZWxlbWVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBmaXJlRXZlbnQoZWwsICdjbGljaycpO1xyXG4gKiBmaXJlRXZlbnQoZWwsICdrZXlwcmVzcycsIHtrZXk6ICdFbnRlcid9KTtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogYm9vbGVhbiB7XHJcbiAgbGV0IGV2ZW50O1xyXG4gIGlmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUubWF0Y2goL15tb3VzZS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBNb3VzZUV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXmtleS8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZS5tYXRjaCgvXnRvdWNoLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IFRvdWNoRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuIl19