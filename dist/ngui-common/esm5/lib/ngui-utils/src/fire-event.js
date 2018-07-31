/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    var /** @type {?} */ event;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9maXJlLWV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsTUFBTSxvQkFBb0IsRUFBZSxFQUFFLElBQVksRUFBRSxPQUFpQjtJQUFqQix3QkFBQSxFQUFBLFlBQWlCO0lBQ3hFLHFCQUFJLEtBQUssQ0FBQztJQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2QztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7SUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBmaXJlIHRoZSBnaXZlbiBldmVudCB3aXRoIG9wdGlvbnMgb24gdGhlIGVsZW1lbnRcclxuICogQGV4YW1wbGVcclxuICogZmlyZUV2ZW50KGVsLCAnY2xpY2snKTtcclxuICogZmlyZUV2ZW50KGVsLCAna2V5cHJlc3MnLCB7a2V5OiAnRW50ZXInfSk7XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSk6IGJvb2xlYW4ge1xyXG4gIGxldCBldmVudDtcclxuICBpZiAodHlwZSA9PT0gJ2NsaWNrJyB8fCB0eXBlLm1hdGNoKC9ebW91c2UvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgTW91c2VFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUubWF0Y2goL15rZXkvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgS2V5Ym9hcmRFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9IGVsc2UgaWYgKHR5cGUubWF0Y2goL150b3VjaC8pKSB7XHJcbiAgICBldmVudCA9IG5ldyBUb3VjaEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcbiJdfQ==