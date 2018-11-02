/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 * @abstract
 */
var konsole = /** @class */ (function () {
    function konsole() {
    }
    /** returns if it should call `window.console` or not */
    /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    konsole.toLog = /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    function (param) {
        // returns to log or not
        /** @type {?} */
        var restrictionNum = this.LOG_LEVELS[this.logLevel];
        /** @type {?} */
        var requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    };
    /** sets the current log level */
    /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    konsole.setLogLevel = /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    function (logLevel) {
        logLevel = logLevel.toUpperCase();
        /** @type {?} */
        var logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) { // for browser env.
                window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
            }
            this.logLevel = logLevel;
        }
        else {
            console.error("Error, invalid logLevel, it must be one of " + logLevels);
        }
    };
    /** The same as `console.debug()` if the current log level is greater than `debug` */
    /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    konsole.debug = /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('DEBUG')) {
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
        }
    };
    /** The same as `console.log()` if the current log level is greater than `log` */
    /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    konsole.log = /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    };
    /** The same as `console.info()` if the current log level is greater than `info` */
    /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    konsole.info = /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('INFO')) {
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
        }
    };
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    konsole.warn = /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    };
    /** The same as `console.error()` if the current log level is greater than `error` */
    /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    konsole.error = /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    };
    // tslint:disable-line
    /**
     * all log levels
     */
    konsole.LOG_LEVELS = {
        ALL: parseInt('00000', 2),
        DEBUG: parseInt('00001', 2),
        LOG: parseInt('00010', 2),
        INFO: parseInt('00100', 2),
        WARN: parseInt('01000', 2),
        ERROR: parseInt('10000', 2),
        NONE: parseInt('11111', 2)
    };
    /**
     * current log level set by setLogLevel, default 'INFO'
     */
    konsole.logLevel = 'INFO';
    return konsole;
}());
export { konsole };
if (false) {
    /**
     * all log levels
     * @type {?}
     */
    konsole.LOG_LEVELS;
    /**
     * current log level set by setLogLevel, default 'INFO'
     * @type {?}
     */
    konsole.logLevel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9rb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQTtJQUFBO0lBeUVBLENBQUM7SUExREMsd0RBQXdEOzs7Ozs7SUFDakQsYUFBSzs7Ozs7SUFBWixVQUFhLEtBQUs7OztZQUNWLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O1lBQy9DLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUUxQyxPQUFPLFdBQVcsR0FBRyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVELGlDQUFpQzs7Ozs7O0lBQzFCLG1CQUFXOzs7OztJQUFsQixVQUFtQixRQUFnQjtRQUNqQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUM1QixTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsbUJBQW1CO2dCQUN4RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RDtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUE4QyxTQUFXLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7SUFFRCxxRkFBcUY7Ozs7OztJQUM5RSxhQUFLOzs7OztJQUFaO1FBQWEsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlCQUFtQjs7UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JCLHNCQUFzQjtZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEU7SUFDSCxDQUFDO0lBRUQsaUZBQWlGOzs7Ozs7SUFDMUUsV0FBRzs7Ozs7SUFBVjtRQUFXLGNBQW1CO2FBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtZQUFuQix5QkFBbUI7O1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsbUZBQW1GOzs7Ozs7SUFDNUUsWUFBSTs7Ozs7SUFBWDtRQUFZLGNBQW1CO2FBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtZQUFuQix5QkFBbUI7O1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQixzQkFBc0I7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2pFO0lBQ0gsQ0FBQztJQUVELG1GQUFtRjs7Ozs7O0lBQzVFLFlBQUk7Ozs7O0lBQVg7UUFBWSxjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELHFGQUFxRjs7Ozs7O0lBQzlFLGFBQUs7Ozs7O0lBQVo7UUFBYSxjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7Ozs7SUF0RU0sa0JBQVUsR0FBRztRQUNsQixHQUFHLEVBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsRUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxFQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDNUIsQ0FBQzs7OztJQUdLLGdCQUFRLEdBQUcsTUFBTSxDQUFDO0lBNEQzQixjQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F6RXFCLE9BQU87Ozs7OztJQUUzQixtQkFRRTs7Ozs7SUFHRixpQkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogd2luZG93LmtvbnNvbGUgYWx0ZXJuYXRpdmVcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgXHJcbiAqIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2Vycm9yJyk7XHJcbiAqIGtvbndvbGUubG9nKDEsMiwzLDQsNSk7XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIGtvbnNvbGUgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgLyoqIGFsbCBsb2cgbGV2ZWxzICovXHJcbiAgc3RhdGljIExPR19MRVZFTFMgPSB7XHJcbiAgICBBTEw6ICAgcGFyc2VJbnQoJzAwMDAwJywgMiksXHJcbiAgICBERUJVRzogcGFyc2VJbnQoJzAwMDAxJywgMiksXHJcbiAgICBMT0c6ICAgcGFyc2VJbnQoJzAwMDEwJywgMiksXHJcbiAgICBJTkZPOiAgcGFyc2VJbnQoJzAwMTAwJywgMiksXHJcbiAgICBXQVJOOiAgcGFyc2VJbnQoJzAxMDAwJywgMiksXHJcbiAgICBFUlJPUjogcGFyc2VJbnQoJzEwMDAwJywgMiksXHJcbiAgICBOT05FOiAgcGFyc2VJbnQoJzExMTExJywgMilcclxuICB9O1xyXG5cclxuICAvKiogY3VycmVudCBsb2cgbGV2ZWwgc2V0IGJ5IHNldExvZ0xldmVsLCBkZWZhdWx0ICdJTkZPJyAqL1xyXG4gIHN0YXRpYyBsb2dMZXZlbCA9ICdJTkZPJztcclxuXHJcbiAgLyoqIHJldHVybnMgaWYgaXQgc2hvdWxkIGNhbGwgYHdpbmRvdy5jb25zb2xlYCBvciBub3QgKi9cclxuICBzdGF0aWMgdG9Mb2cocGFyYW0pOiBib29sZWFuIHsgLy8gcmV0dXJucyB0byBsb2cgb3Igbm90XHJcbiAgICBjb25zdCByZXN0cmljdGlvbk51bSA9IHRoaXMuTE9HX0xFVkVMU1t0aGlzLmxvZ0xldmVsXTtcclxuICAgIGNvbnN0IHJlcXVpcmVkTnVtID0gdGhpcy5MT0dfTEVWRUxTW3BhcmFtXTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWlyZWROdW0gPiByZXN0cmljdGlvbk51bTtcclxuICB9XHJcblxyXG4gIC8qKiBzZXRzIHRoZSBjdXJyZW50IGxvZyBsZXZlbCAqL1xyXG4gIHN0YXRpYyBzZXRMb2dMZXZlbChsb2dMZXZlbDogc3RyaW5nKTogYW55IHtcclxuICAgIGxvZ0xldmVsID0gbG9nTGV2ZWwudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGxvZ0xldmVscyA9IE9iamVjdC5rZXlzKHRoaXMuTE9HX0xFVkVMUyk7XHJcbiAgICBpZiAobG9nTGV2ZWxzLmluZGV4T2YobG9nTGV2ZWwpID4gLTEpIHtcclxuICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHsgLy8gZm9yIGJyb3dzZXIgZW52LlxyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdrb25zb2xlLkxPR19MRVZFTCcsIGxvZ0xldmVsKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciwgaW52YWxpZCBsb2dMZXZlbCwgaXQgbXVzdCBiZSBvbmUgb2YgJHtsb2dMZXZlbHN9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZGVidWcoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZGVidWdgICovXHJcbiAgc3RhdGljIGRlYnVnKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdERUJVRycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmxvZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBsb2dgICovXHJcbiAgc3RhdGljIGxvZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnTE9HJykpIHtcclxuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5pbmZvKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGluZm9gICovXHJcbiAgc3RhdGljIGluZm8oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0lORk8nKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLndhcm4oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgd2FybmAgKi9cclxuICBzdGF0aWMgd2FybiguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnV0FSTicpKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmVycm9yKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGVycm9yYCAqL1xyXG4gIHN0YXRpYyBlcnJvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnRVJST1InKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdhbGwnKTtcclxuLy8ga29uc29sZS5kZWJ1ZygneWVzJyk7XHJcbi8vIGtvbnNvbGUubG9nKCd5ZXMnKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdub25lJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcignbm8nKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2luZm8nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnV0FSTicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ0VSUk9SJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcbiJdfQ==