/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ restrictionNum = this.LOG_LEVELS[this.logLevel];
        const /** @type {?} */ requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    }
    /**
     * sets the current log level
     * @param {?} logLevel
     * @return {?}
     */
    static setLogLevel(logLevel) {
        logLevel = logLevel.toUpperCase();
        const /** @type {?} */ logLevels = Object.keys(this.LOG_LEVELS);
        if (logLevels.indexOf(logLevel) > -1) {
            if (window && window.sessionStorage) {
                // for browser env.
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
function konsole_tsickle_Closure_declarations() {
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
// konsole.setLogLevel('all');
// konsole.debug('yes');
// konsole.log('yes');
// konsole.info('yes');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('none');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('no');
// konsole.error('no');
// konsole.setLogLevel('info');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('yes');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('WARN');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('yes');
// konsole.error('yes');
// konsole.setLogLevel('ERROR');
// konsole.debug('no');
// konsole.log('no');
// konsole.info('no');
// konsole.warn('no');
// konsole.error('yes');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9rb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQSxNQUFNOzs7Ozs7SUFnQkosTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOztRQUNoQix1QkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsdUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7S0FDckM7Ozs7OztJQUdELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBZ0I7UUFDakMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyx1QkFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztnQkFDcEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMxQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUMxRTtLQUNGOzs7Ozs7SUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBZ0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRXRCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzQztLQUNGOzs7Ozs7SUFHRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBZ0I7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7Ozs7OztJQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFnQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFckIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzFDO0tBQ0Y7Ozs7OztJQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFnQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDeEM7S0FDRjs7Ozs7O0lBR0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQWdCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN6QztLQUNGOzs7OztxQkF0RW1CO0lBQ2xCLEdBQUcsRUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxFQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLElBQUksRUFBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLElBQUksRUFBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUM1Qjs7OzttQkFHaUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiB3aW5kb3cua29uc29sZSBhbHRlcm5hdGl2ZVxyXG4gKiAjIyMgZXhhbXBsZVxyXG4gKiBgYGBcclxuICoga29uc29sZS5zZXRMb2dMZXZlbCgnZXJyb3InKTtcclxuICoga29ud29sZS5sb2coMSwyLDMsNCw1KTtcclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3Mga29uc29sZSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAvKiogYWxsIGxvZyBsZXZlbHMgKi9cclxuICBzdGF0aWMgTE9HX0xFVkVMUyA9IHtcclxuICAgIEFMTDogICBwYXJzZUludCgnMDAwMDAnLCAyKSxcclxuICAgIERFQlVHOiBwYXJzZUludCgnMDAwMDEnLCAyKSxcclxuICAgIExPRzogICBwYXJzZUludCgnMDAwMTAnLCAyKSxcclxuICAgIElORk86ICBwYXJzZUludCgnMDAxMDAnLCAyKSxcclxuICAgIFdBUk46ICBwYXJzZUludCgnMDEwMDAnLCAyKSxcclxuICAgIEVSUk9SOiBwYXJzZUludCgnMTAwMDAnLCAyKSxcclxuICAgIE5PTkU6ICBwYXJzZUludCgnMTExMTEnLCAyKVxyXG4gIH07XHJcblxyXG4gIC8qKiBjdXJyZW50IGxvZyBsZXZlbCBzZXQgYnkgc2V0TG9nTGV2ZWwsIGRlZmF1bHQgJ0lORk8nICovXHJcbiAgc3RhdGljIGxvZ0xldmVsID0gJ0lORk8nO1xyXG5cclxuICAvKiogcmV0dXJucyBpZiBpdCBzaG91bGQgY2FsbCBgd2luZG93LmNvbnNvbGVgIG9yIG5vdCAqL1xyXG4gIHN0YXRpYyB0b0xvZyhwYXJhbSk6IGJvb2xlYW4geyAvLyByZXR1cm5zIHRvIGxvZyBvciBub3RcclxuICAgIGNvbnN0IHJlc3RyaWN0aW9uTnVtID0gdGhpcy5MT0dfTEVWRUxTW3RoaXMubG9nTGV2ZWxdO1xyXG4gICAgY29uc3QgcmVxdWlyZWROdW0gPSB0aGlzLkxPR19MRVZFTFNbcGFyYW1dO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlZE51bSA+IHJlc3RyaWN0aW9uTnVtO1xyXG4gIH1cclxuXHJcbiAgLyoqIHNldHMgdGhlIGN1cnJlbnQgbG9nIGxldmVsICovXHJcbiAgc3RhdGljIHNldExvZ0xldmVsKGxvZ0xldmVsOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbG9nTGV2ZWwgPSBsb2dMZXZlbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgY29uc3QgbG9nTGV2ZWxzID0gT2JqZWN0LmtleXModGhpcy5MT0dfTEVWRUxTKTtcclxuICAgIGlmIChsb2dMZXZlbHMuaW5kZXhPZihsb2dMZXZlbCkgPiAtMSkge1xyXG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZSkgeyAvLyBmb3IgYnJvd3NlciBlbnYuXHJcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2tvbnNvbGUuTE9HX0xFVkVMJywgbG9nTGV2ZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yLCBpbnZhbGlkIGxvZ0xldmVsLCBpdCBtdXN0IGJlIG9uZSBvZiAke2xvZ0xldmVsc31gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5kZWJ1ZygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBkZWJ1Z2AgKi9cclxuICBzdGF0aWMgZGVidWcoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0RFQlVHJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUubG9nKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGxvZ2AgKi9cclxuICBzdGF0aWMgbG9nKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdMT0cnKSkge1xyXG4gICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmluZm8oKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgaW5mb2AgKi9cclxuICBzdGF0aWMgaW5mbyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnSU5GTycpKSB7XHJcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFRzTGludFxyXG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUud2FybigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGB3YXJuYCAqL1xyXG4gIHN0YXRpYyB3YXJuKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdXQVJOJykpIHtcclxuICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuZXJyb3IoKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgZXJyb3JgICovXHJcbiAgc3RhdGljIGVycm9yKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdFUlJPUicpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ2FsbCcpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCd5ZXMnKTtcclxuLy8ga29uc29sZS5sb2coJ3llcycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ25vbmUnKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCdubycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnaW5mbycpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCd5ZXMnKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdXQVJOJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ25vJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnRVJST1InKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCdubycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuIl19