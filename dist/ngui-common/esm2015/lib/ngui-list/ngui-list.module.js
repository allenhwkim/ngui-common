import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiAutocompleteComponent } from './src/ngui-autocomplete.component';
import { NguiListItemDirective } from './src/ngui-list-item.directive';
import { NguiListDirective } from './src/ngui-list.directive';
import { NguiInviewPageComponent } from './src/ngui-inview-page.component';
import { NguiVirtualListComponent } from './src/ngui-virtual-list.component';
import { NguiInviewModule } from '../ngui-inview/ngui-inview.module';
export { NguiAutocompleteComponent, NguiListItemDirective, NguiListDirective, NguiInviewPageComponent, NguiVirtualListComponent };
let NguiListModule = class NguiListModule {
};
NguiListModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            NguiInviewModule
        ],
        declarations: [
            NguiAutocompleteComponent,
            NguiInviewPageComponent,
            NguiListDirective,
            NguiListItemDirective,
            NguiVirtualListComponent
        ],
        exports: [
            NguiAutocompleteComponent,
            NguiInviewPageComponent,
            NguiListDirective,
            NguiListItemDirective,
            NguiVirtualListComponent
        ],
        entryComponents: [NguiInviewPageComponent]
    })
], NguiListModule);
export { NguiListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLWxpc3Qvbmd1aS1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFbkUsT0FBTyxFQUFDLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFDLENBQUM7QUF1QmhJLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FDMUIsQ0FBQTtBQURZLGNBQWM7SUFyQjFCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixnQkFBZ0I7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsd0JBQXdCO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AseUJBQXlCO1lBQ3pCLHVCQUF1QjtZQUN2QixpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLHdCQUF3QjtTQUN6QjtRQUNELGVBQWUsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQzNDLENBQUM7R0FDVyxjQUFjLENBQzFCO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlMaXN0SXRlbURpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1saXN0LWl0ZW0uZGlyZWN0aXZlJztcclxuaW1wb3J0IHtOZ3VpTGlzdERpcmVjdGl2ZX0gZnJvbSAnLi9zcmMvbmd1aS1saXN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7Tmd1aUludmlld1BhZ2VDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktaW52aWV3LXBhZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpVmlydHVhbExpc3RDb21wb25lbnR9IGZyb20gJy4vc3JjL25ndWktdmlydHVhbC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aUludmlld01vZHVsZX0gZnJvbSAnLi4vbmd1aS1pbnZpZXcvbmd1aS1pbnZpZXcubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCwgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLCBOZ3VpTGlzdERpcmVjdGl2ZSwgTmd1aUludmlld1BhZ2VDb21wb25lbnQsIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5ndWlJbnZpZXdNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudCxcclxuICAgIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LFxyXG4gICAgTmd1aUxpc3REaXJlY3RpdmUsXHJcbiAgICBOZ3VpTGlzdEl0ZW1EaXJlY3RpdmUsXHJcbiAgICBOZ3VpVmlydHVhbExpc3RDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCxcclxuICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxyXG4gICAgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ3VpSW52aWV3UGFnZUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5ndWlMaXN0TW9kdWxlIHtcclxufVxyXG4iXX0=