/**
 * fire the given event with options on the element
 ### Example
 ```js
 fireEvent(el, 'click');
 fireEvent(el, 'keypress', {key: 'Enter'});
 ```
 */
export declare function fireEvent(el: HTMLElement, type: string, options?: any): boolean;
