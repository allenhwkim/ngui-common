import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nguiHighlight' })
export class NguiHighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    let ret = text;
    if (search) {
      const re  = new RegExp(search, 'i');
      ret = text.replace(re, `<span class="ngui-highlight">${search}</span>`);
    }

    return ret;
  }
}
