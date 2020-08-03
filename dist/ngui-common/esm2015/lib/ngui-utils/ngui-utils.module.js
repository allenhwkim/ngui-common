import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiHighlightPipe } from './src/ngui-highlight.pipe';
import { DynamicComponentService } from './src/dynamic-component.service';
import { konsole } from './src/konsole';
import { fireEvent } from './src/fire-event';
export { DynamicComponentService, NguiHighlightPipe, konsole, fireEvent };
export class NguiUtilsModule {
}
NguiUtilsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NguiHighlightPipe],
                exports: [NguiHighlightPipe],
                providers: [DynamicComponentService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS11dGlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3VpLWNvbW1vbi9zcmMvbGliL25ndWktdXRpbHMvbmd1aS11dGlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0MsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQztBQVV4RSxNQUFNLE9BQU8sZUFBZTs7O1lBUjNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3VpSGlnaGxpZ2h0UGlwZX0gZnJvbSAnLi9zcmMvbmd1aS1oaWdobGlnaHQucGlwZSc7XHJcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudFNlcnZpY2V9IGZyb20gJy4vc3JjL2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBrb25zb2xlIH0gZnJvbSAnLi9zcmMva29uc29sZSc7XHJcbmltcG9ydCB7IGZpcmVFdmVudCB9IGZyb20gJy4vc3JjL2ZpcmUtZXZlbnQnO1xyXG5cclxuZXhwb3J0IHtEeW5hbWljQ29tcG9uZW50U2VydmljZSwgTmd1aUhpZ2hsaWdodFBpcGUsIGtvbnNvbGUsIGZpcmVFdmVudH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd1aUhpZ2hsaWdodFBpcGVdLFxyXG4gIGV4cG9ydHM6IFtOZ3VpSGlnaGxpZ2h0UGlwZV0sXHJcbiAgcHJvdmlkZXJzOiBbRHluYW1pY0NvbXBvbmVudFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpVXRpbHNNb2R1bGUgeyB9XHJcbiJdfQ==