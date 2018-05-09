import { DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

import { NguiHighlightPipe } from './ngui-highlight.pipe';

describe('Highlight Component - Highlight pipe', () => {
  it('highlights search term in the text', () => {
    const pipe = new NguiHighlightPipe();
    const result = pipe.transform('search text', 'text');
    expect(result).toBe('search <span class="ngui-highlight">text</span>');
  });

  it('shoudl return same text', () => {
    const pipe = new NguiHighlightPipe();
    const result = pipe.transform('search text', '');
    expect(result).toBe('search text');
  });
});
