import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiHighlightPipe } from './src/ngui-highlight.pipe';
import { DynamicComponentService } from './src/dynamic-component.service';
import { konsole } from './src/konsole';
import { fireEvent } from './src/fire-event';
import * as i0 from "@angular/core";
export { DynamicComponentService, NguiHighlightPipe, konsole, fireEvent };
export class NguiUtilsModule {
}
NguiUtilsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiUtilsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NguiUtilsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiUtilsModule, declarations: [NguiHighlightPipe], imports: [CommonModule], exports: [NguiHighlightPipe] });
NguiUtilsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiUtilsModule, providers: [DynamicComponentService], imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiUtilsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [NguiHighlightPipe],
                    exports: [NguiHighlightPipe],
                    providers: [DynamicComponentService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS11dGlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3VpLWNvbW1vbi9zcmMvbGliL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBRTdDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFVeEUsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFKWCxpQkFBaUIsYUFGOUIsWUFBWSxhQUdKLGlCQUFpQjs2R0FHaEIsZUFBZSxhQUZmLENBQUMsdUJBQXVCLENBQUMsWUFMM0I7WUFDUCxZQUFZO1NBQ2I7MkZBS1UsZUFBZTtrQkFSM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd1aUhpZ2hsaWdodFBpcGV9IGZyb20gJy4vc3JjL25ndWktaGlnaGxpZ2h0LnBpcGUnO1xyXG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlfSBmcm9tICcuL3NyYy9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsga29uc29sZSB9IGZyb20gJy4vc3JjL2tvbnNvbGUnO1xyXG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tICcuL3NyYy9maXJlLWV2ZW50JztcclxuXHJcbmV4cG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2UsIE5ndWlIaWdobGlnaHRQaXBlLCBrb25zb2xlLCBmaXJlRXZlbnR9O1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05ndWlIaWdobGlnaHRQaXBlXSxcclxuICBleHBvcnRzOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIHByb3ZpZGVyczogW0R5bmFtaWNDb21wb25lbnRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd1aVV0aWxzTW9kdWxlIHsgfVxyXG4iXX0=