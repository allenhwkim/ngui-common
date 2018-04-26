import { DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

import { NguiHighlightPipe } from './ngui-highlight.pipe';

describe('Highlight Component - Highlight pipe', () => {
  let pipe: NguiHighlightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ NguiHighlightPipe]
    });
  });

  beforeEach(inject([NguiHighlightPipe], p => {
    pipe = p;
  }));

  it('highlights search term in the text', () => {
    const result = pipe.transform('search text', 'text');
    expect(result).toBe('search <span class="ngui-highlight">text</span>');
  });

  it('shoudl return same text', () => {
    const result = pipe.transform('search text', '');
    expect(result).toBe('search text');
  });
});
