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
export class konsole {
    /**
     * returns if it should call `window.console` or not
     * @param {?} param
     * @return {?}
     */
    static toLog(param) {
        // returns to log or not
        /** @type {?} */
        const restrictionNum = this.LOG_LEVELS[this.logLevel];
        /** @type {?} */
        const requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    }
    /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    static setLogLevel(logLevel) {
        logLevel = logLevel.toUpperCase();
        /** @type {?} */
        const logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) { // for browser env.
                window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
            }
            this.logLevel = logLevel;
        }
        else {
            console.error(`Error, invalid logLevel, it must be one of ${logLevels}`);
        }
    }
    /**
     * The same as `console.debug()` if the current log level is greater than `debug`
     * @param {...?} args
     * @return {?}
     */
    static debug(...args) {
        if (this.toLog('DEBUG')) {
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
        }
    }
    /**
     * The same as `console.log()` if the current log level is greater than `log`
     * @param {...?} args
     * @return {?}
     */
    static log(...args) {
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    }
    /**
     * The same as `console.info()` if the current log level is greater than `info`
     * @param {...?} args
     * @return {?}
     */
    static info(...args) {
        if (this.toLog('INFO')) {
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
        }
    }
    /**
     * The same as `console.warn()` if the current log level is greater than `warn`
     * @param {...?} args
     * @return {?}
     */
    static warn(...args) {
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    }
    /**
     * The same as `console.error()` if the current log level is greater than `error`
     * @param {...?} args
     * @return {?}
     */
    static error(...args) {
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9rb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLE9BQWdCLE9BQU87Ozs7OztJQWdCM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs7Y0FDVixjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztjQUMvQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFMUMsT0FBTyxXQUFXLEdBQUcsY0FBYyxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUdELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBZ0I7UUFDakMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Y0FDNUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLG1CQUFtQjtnQkFDeEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMxQjthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7Ozs7OztJQUdELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRTtJQUNILENBQUM7Ozs7OztJQUdELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFnQjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Ozs7O0lBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQixzQkFBc0I7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2pFO0lBQ0gsQ0FBQzs7Ozs7O0lBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDOzs7Ozs7SUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBZ0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7Ozs7OztBQXRFTSxrQkFBVSxHQUFHO0lBQ2xCLEdBQUcsRUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxFQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLElBQUksRUFBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLElBQUksRUFBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUM1QixDQUFDOzs7O0FBR0ssZ0JBQVEsR0FBRyxNQUFNLENBQUM7Ozs7OztJQVh6QixtQkFRRTs7Ozs7SUFHRixpQkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogd2luZG93LmtvbnNvbGUgYWx0ZXJuYXRpdmVcclxuICogIyMjIGV4YW1wbGVcclxuICogYGBgXHJcbiAqIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2Vycm9yJyk7XHJcbiAqIGtvbndvbGUubG9nKDEsMiwzLDQsNSk7XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIGtvbnNvbGUgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgLyoqIGFsbCBsb2cgbGV2ZWxzICovXHJcbiAgc3RhdGljIExPR19MRVZFTFMgPSB7XHJcbiAgICBBTEw6ICAgcGFyc2VJbnQoJzAwMDAwJywgMiksXHJcbiAgICBERUJVRzogcGFyc2VJbnQoJzAwMDAxJywgMiksXHJcbiAgICBMT0c6ICAgcGFyc2VJbnQoJzAwMDEwJywgMiksXHJcbiAgICBJTkZPOiAgcGFyc2VJbnQoJzAwMTAwJywgMiksXHJcbiAgICBXQVJOOiAgcGFyc2VJbnQoJzAxMDAwJywgMiksXHJcbiAgICBFUlJPUjogcGFyc2VJbnQoJzEwMDAwJywgMiksXHJcbiAgICBOT05FOiAgcGFyc2VJbnQoJzExMTExJywgMilcclxuICB9O1xyXG5cclxuICAvKiogY3VycmVudCBsb2cgbGV2ZWwgc2V0IGJ5IHNldExvZ0xldmVsLCBkZWZhdWx0ICdJTkZPJyAqL1xyXG4gIHN0YXRpYyBsb2dMZXZlbCA9ICdJTkZPJztcclxuXHJcbiAgLyoqIHJldHVybnMgaWYgaXQgc2hvdWxkIGNhbGwgYHdpbmRvdy5jb25zb2xlYCBvciBub3QgKi9cclxuICBzdGF0aWMgdG9Mb2cocGFyYW0pOiBib29sZWFuIHsgLy8gcmV0dXJucyB0byBsb2cgb3Igbm90XHJcbiAgICBjb25zdCByZXN0cmljdGlvbk51bSA9IHRoaXMuTE9HX0xFVkVMU1t0aGlzLmxvZ0xldmVsXTtcclxuICAgIGNvbnN0IHJlcXVpcmVkTnVtID0gdGhpcy5MT0dfTEVWRUxTW3BhcmFtXTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWlyZWROdW0gPiByZXN0cmljdGlvbk51bTtcclxuICB9XHJcblxyXG4gIC8qKiBzZXRzIHRoZSBjdXJyZW50IGxvZyBsZXZlbCAqL1xyXG4gIHN0YXRpYyBzZXRMb2dMZXZlbChsb2dMZXZlbDogc3RyaW5nKTogYW55IHtcclxuICAgIGxvZ0xldmVsID0gbG9nTGV2ZWwudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGxvZ0xldmVscyA9IE9iamVjdC5rZXlzKHRoaXMuTE9HX0xFVkVMUyk7XHJcbiAgICBpZiAobG9nTGV2ZWxzLmluZGV4T2YobG9nTGV2ZWwpID4gLTEpIHtcclxuICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHsgLy8gZm9yIGJyb3dzZXIgZW52LlxyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdrb25zb2xlLkxPR19MRVZFTCcsIGxvZ0xldmVsKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciwgaW52YWxpZCBsb2dMZXZlbCwgaXQgbXVzdCBiZSBvbmUgb2YgJHtsb2dMZXZlbHN9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZGVidWcoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZGVidWdgICovXHJcbiAgc3RhdGljIGRlYnVnKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdERUJVRycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmxvZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBsb2dgICovXHJcbiAgc3RhdGljIGxvZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnTE9HJykpIHtcclxuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5pbmZvKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGluZm9gICovXHJcbiAgc3RhdGljIGluZm8oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0lORk8nKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLndhcm4oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgd2FybmAgKi9cclxuICBzdGF0aWMgd2FybiguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnV0FSTicpKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmVycm9yKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGVycm9yYCAqL1xyXG4gIHN0YXRpYyBlcnJvciguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnRVJST1InKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdhbGwnKTtcclxuLy8ga29uc29sZS5kZWJ1ZygneWVzJyk7XHJcbi8vIGtvbnNvbGUubG9nKCd5ZXMnKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdub25lJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcignbm8nKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2luZm8nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnV0FSTicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ0VSUk9SJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2Fybignbm8nKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcbiJdfQ==