import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var NguiHighlightPipe = /** @class */ (function () {
    function NguiHighlightPipe() {
    }
    NguiHighlightPipe.prototype.transform = function (text, search) {
        var ret = text;
        if (search) {
            var re = new RegExp(search, 'ig');
            ret = text.replace(re, function (match) { return "<span class=\"ngui-highlight\">" + match + "</span>"; });
        }
        return ret;
    };
    NguiHighlightPipe = tslib_1.__decorate([
        Pipe({ name: 'nguiHighlight' })
    ], NguiHighlightPipe);
    return NguiHighlightPipe;
}());
export { NguiHighlightPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd1aS1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9uZ3VpLWhpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBVUEsQ0FBQztJQVRDLHFDQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsTUFBYztRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQU0sRUFBRSxHQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxvQ0FBZ0MsS0FBSyxZQUFTLEVBQTlDLENBQThDLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQVRVLGlCQUFpQjtRQUQ3QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUM7T0FDbkIsaUJBQWlCLENBVTdCO0lBQUQsd0JBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICduZ3VpSGlnaGxpZ2h0JyB9KVxyXG5leHBvcnQgY2xhc3MgTmd1aUhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgcmV0ID0gdGV4dDtcclxuICAgIGlmIChzZWFyY2gpIHtcclxuICAgICAgY29uc3QgcmUgID0gbmV3IFJlZ0V4cChzZWFyY2gsICdpZycpO1xyXG4gICAgICByZXQgPSB0ZXh0LnJlcGxhY2UocmUsIG1hdGNoID0+IGA8c3BhbiBjbGFzcz1cIm5ndWktaGlnaGxpZ2h0XCI+JHttYXRjaH08L3NwYW4+YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcbn1cclxuIl19