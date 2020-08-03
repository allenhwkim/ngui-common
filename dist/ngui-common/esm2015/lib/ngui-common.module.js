import { NgModule } from '@angular/core';
import { NguiInviewModule } from './ngui-inview/ngui-inview.module';
import { NguiListModule } from './ngui-list/ngui-list.module';
import { NguiUtilsModule } from './ngui-utils/ngui-utils.module';
export class NguiCommonModule {
}
NguiCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NguiInviewModule,
                    NguiListModule,
                    NguiUtilsModule
                ],
                exports: [
                    NguiInviewModule,
                    NguiListModule,
                    NguiUtilsModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1jb21tb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd1aS1jb21tb24vc3JjL2xpYi9uZ3VpLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBYy9ELE1BQU0sT0FBTyxnQkFBZ0I7OztZQVo1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3VpSW52aWV3TW9kdWxlfSBmcm9tICcuL25ndWktaW52aWV3L25ndWktaW52aWV3Lm1vZHVsZSc7XHJcbmltcG9ydCB7Tmd1aUxpc3RNb2R1bGV9IGZyb20gJy4vbmd1aS1saXN0L25ndWktbGlzdC5tb2R1bGUnO1xyXG5pbXBvcnQge05ndWlVdGlsc01vZHVsZX0gZnJvbSAnLi9uZ3VpLXV0aWxzL25ndWktdXRpbHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTmd1aUludmlld01vZHVsZSxcclxuICAgIE5ndWlMaXN0TW9kdWxlLFxyXG4gICAgTmd1aVV0aWxzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3VpSW52aWV3TW9kdWxlLFxyXG4gICAgTmd1aUxpc3RNb2R1bGUsXHJcbiAgICBOZ3VpVXRpbHNNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3VpQ29tbW9uTW9kdWxlIHtcclxufVxyXG4iXX0=