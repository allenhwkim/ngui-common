/**
 * fire the given event with options on the element
 ### Example
 ```js
 fireEvent(el, 'click');
 fireEvent(el, 'keypress', {key: 'Enter'});
 ```
 */
export function fireEvent(el, type, options = {}) {
    let event;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS11dGlscy9zcmMvZmlyZS1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFlLEVBQUUsSUFBWSxFQUFFLFVBQWUsRUFBRTtJQUN4RSxJQUFJLEtBQUssQ0FBQztJQUNWLElBQUksSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7U0FBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0IsS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMxQztTQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMvQixLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZmlyZSB0aGUgZ2l2ZW4gZXZlbnQgd2l0aCBvcHRpb25zIG9uIHRoZSBlbGVtZW50XHJcbiAjIyMgRXhhbXBsZVxyXG4gYGBganNcclxuIGZpcmVFdmVudChlbCwgJ2NsaWNrJyk7XHJcbiBmaXJlRXZlbnQoZWwsICdrZXlwcmVzcycsIHtrZXk6ICdFbnRlcid9KTtcclxuIGBgYFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pOiBib29sZWFuIHtcclxuICBsZXQgZXZlbnQ7XHJcbiAgaWYgKHR5cGUgPT09ICdjbGljaycgfHwgdHlwZS5tYXRjaCgvXm1vdXNlLykpIHtcclxuICAgIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9ea2V5LykpIHtcclxuICAgIGV2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQodHlwZSwgb3B0aW9ucyk7XHJcbiAgfSBlbHNlIGlmICh0eXBlLm1hdGNoKC9edG91Y2gvKSkge1xyXG4gICAgZXZlbnQgPSBuZXcgVG91Y2hFdmVudCh0eXBlLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG4iXX0=