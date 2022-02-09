import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NguiHighlightPipe {
    transform(text, search) {
        let ret = text;
        if (search) {
            const re = new RegExp(search, 'ig');
            ret = text.replace(re, match => `<span class="ngui-highlight">${match}</span>`);
        }
        return ret;
    }
}
NguiHighlightPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiHighlightPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NguiHighlightPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiHighlightPipe, name: "nguiHighlight" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NguiHighlightPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'nguiHighlight' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS11dGlscy9zcmMvbmd1aS1oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixTQUFTLENBQUMsSUFBWSxFQUFFLE1BQWM7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLEVBQUUsR0FBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEtBQUssU0FBUyxDQUFDLENBQUM7U0FDakY7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OzhHQVRVLGlCQUFpQjs0R0FBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnbmd1aUhpZ2hsaWdodCcgfSlcclxuZXhwb3J0IGNsYXNzIE5ndWlIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJldCA9IHRleHQ7XHJcbiAgICBpZiAoc2VhcmNoKSB7XHJcbiAgICAgIGNvbnN0IHJlICA9IG5ldyBSZWdFeHAoc2VhcmNoLCAnaWcnKTtcclxuICAgICAgcmV0ID0gdGV4dC5yZXBsYWNlKHJlLCBtYXRjaCA9PiBgPHNwYW4gY2xhc3M9XCJuZ3VpLWhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==