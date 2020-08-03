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
var NguiListModule = /** @class */ (function () {
    function NguiListModule() {
    }
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
    return NguiListModule;
}());
export { NguiListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLWxpc3Qvbmd1aS1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFbkUsT0FBTyxFQUFDLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFDLENBQUM7QUF1QmhJO0lBQUE7SUFDQSxDQUFDO0lBRFksY0FBYztRQXJCMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osZ0JBQWdCO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLHlCQUF5QjtnQkFDekIsdUJBQXVCO2dCQUN2QixpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsd0JBQXdCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QjtnQkFDekIsdUJBQXVCO2dCQUN2QixpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsd0JBQXdCO2FBQ3pCO1lBQ0QsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDM0MsQ0FBQztPQUNXLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUF1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9zcmMvbmd1aS1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpTGlzdEl0ZW1EaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7Tmd1aUxpc3REaXJlY3RpdmV9IGZyb20gJy4vc3JjL25ndWktbGlzdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdQYWdlQ29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLWludmlldy1wYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50fSBmcm9tICcuL3NyYy9uZ3VpLXZpcnR1YWwtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05ndWlJbnZpZXdNb2R1bGV9IGZyb20gJy4uL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XHJcblxyXG5leHBvcnQge05ndWlBdXRvY29tcGxldGVDb21wb25lbnQsIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSwgTmd1aUxpc3REaXJlY3RpdmUsIE5ndWlJbnZpZXdQYWdlQ29tcG9uZW50LCBOZ3VpVmlydHVhbExpc3RDb21wb25lbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5ndWlBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBOZ3VpSW52aWV3UGFnZUNvbXBvbmVudCxcclxuICAgIE5ndWlMaXN0RGlyZWN0aXZlLFxyXG4gICAgTmd1aUxpc3RJdGVtRGlyZWN0aXZlLFxyXG4gICAgTmd1aVZpcnR1YWxMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3VpQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgTmd1aUludmlld1BhZ2VDb21wb25lbnQsXHJcbiAgICBOZ3VpTGlzdERpcmVjdGl2ZSxcclxuICAgIE5ndWlMaXN0SXRlbURpcmVjdGl2ZSxcclxuICAgIE5ndWlWaXJ0dWFsTGlzdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmd1aUludmlld1BhZ2VDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpTGlzdE1vZHVsZSB7XHJcbn1cclxuIl19