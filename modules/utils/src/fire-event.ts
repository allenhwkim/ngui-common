/**
 * fire the given event with options on the element
 * @example
 * fireEvent(el, 'click');
 * fireEvent(el, 'keypress', {key: 'Enter'});
 */
export function fireEvent(el: HTMLElement, type: string, options: any = {}): boolean {
  var event;
  if (type === 'click' || type.match(/^mouse/)) {
    event = new MouseEvent(type, options);
  } else if (type.match(/^key/)) {
    event = new KeyboardEvent(type, options);
  } else if (type.match(/^touch/)) {
    event = new TouchEvent(type, options);
  }

  return el.dispatchEvent(event);
}
