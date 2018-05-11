## List of Modules

Name | Definition | Exports
---- | ---------- | -------
InViewModule | Handles element viewport visibility | NguiInviewComonent<br/>NguiviewLoadingComponent
ListModule | List with interaction | NguiListComopnent
UtilsModule | Collection of basic functions | computedStyle<br/> outerHeight<br/> outerWidth

## InviewModule Example
```
<ngui-inview ...>
  <img src="big-image.png" />
</ngui-inview>
```

## ListModule Example
```
TODO
```

### UtilsModule Example
```
import {computedStyle, outerHeight, outerWidth} from '@ngui/common';

let style = computedStyle(el, 'backgroundColor');
let height = outerHeight(el);
let width = outerWidth(el);
```