import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiHighlightPipe } from './src/ngui-highlight.pipe';
import { DynamicComponentService } from './src/dynamic-component.service';
import { konsole } from './src/konsole';
import { fireEvent } from './src/fire-event';
export { DynamicComponentService, NguiHighlightPipe, konsole, fireEvent };
var NguiUtilsModule = /** @class */ (function () {
    function NguiUtilsModule() {
    }
    NguiUtilsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [NguiHighlightPipe],
            exports: [NguiHighlightPipe],
            providers: [DynamicComponentService]
        })
    ], NguiUtilsModule);
    return NguiUtilsModule;
}());
export { NguiUtilsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS11dGlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd1aS9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbmd1aS11dGlscy9uZ3VpLXV0aWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0MsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQztBQVV4RTtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQVIzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDckMsQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUhpZ2hsaWdodFBpcGV9IGZyb20gJy4vc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUnO1xyXG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlfSBmcm9tICcuL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsga29uc29sZSB9IGZyb20gJy4vc3JjL2tvbnNvbGUnO1xyXG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tICcuL3NyYy9maXJlLWV2ZW50JztcclxuXHJcbmV4cG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2UsIE5ndWlIaWdobGlnaHRQaXBlLCBrb25zb2xlLCBmaXJlRXZlbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05ndWlIaWdobGlnaHRQaXBlXSxcclxuICBleHBvcnRzOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIHByb3ZpZGVyczogW0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVV0aWxzTW9kdWxlIHsgfVxyXG4iXX0=