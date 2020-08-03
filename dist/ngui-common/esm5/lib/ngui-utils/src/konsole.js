/**
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 */
var konsole = /** @class */ (function () {
    function konsole() {
    }
    /** returns if it should call `window.console` or not */
    konsole.toLog = function (param) {
        var restrictionNum = this.LOG_LEVELS[this.logLevel];
        var requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    };
    /** sets the current log level */
    konsole.setLogLevel = function (logLevel) {
        logLevel = logLevel.toUpperCase();
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
    konsole.debug = function () {
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
    konsole.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    };
    /** The same as `console.info()` if the current log level is greater than `info` */
    konsole.info = function () {
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
    konsole.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    };
    /** The same as `console.error()` if the current log level is greater than `error` */
    konsole.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    };
    /** all log levels */
    konsole.LOG_LEVELS = {
        ALL: parseInt('00000', 2),
        DEBUG: parseInt('00001', 2),
        LOG: parseInt('00010', 2),
        INFO: parseInt('00100', 2),
        WARN: parseInt('01000', 2),
        ERROR: parseInt('10000', 2),
        NONE: parseInt('11111', 2)
    };
    /** current log level set by setLogLevel, default 'INFO' */
    konsole.logLevel = 'INFO';
    return konsole;
}());
export { konsole };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3VpL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9uZ3VpLXV0aWxzL3NyYy9rb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSDtJQUFBO0lBeUVBLENBQUM7SUExREMsd0RBQXdEO0lBQ2pELGFBQUssR0FBWixVQUFhLEtBQUs7UUFDaEIsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxPQUFPLFdBQVcsR0FBRyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVELGlDQUFpQztJQUMxQixtQkFBVyxHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsbUJBQW1CO2dCQUN4RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RDtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUE4QyxTQUFXLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7SUFFRCxxRkFBcUY7SUFDOUUsYUFBSyxHQUFaO1FBQWEsY0FBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLHlC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QUNoQyx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEIsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIHdpbmRvdy5rb25zb2xlIGFsdGVybmF0aXZlXHJcbiAqICMjIyBleGFtcGxlXHJcbiAqIGBgYFxyXG4gKiBrb25zb2xlLnNldExvZ0xldmVsKCdlcnJvcicpO1xyXG4gKiBrb253b2xlLmxvZygxLDIsMyw0LDUpO1xyXG4gKiBgYGBcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBrb25zb2xlIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gIC8qKiBhbGwgbG9nIGxldmVscyAqL1xyXG4gIHN0YXRpYyBMT0dfTEVWRUxTID0ge1xyXG4gICAgQUxMOiAgIHBhcnNlSW50KCcwMDAwMCcsIDIpLFxyXG4gICAgREVCVUc6IHBhcnNlSW50KCcwMDAwMScsIDIpLFxyXG4gICAgTE9HOiAgIHBhcnNlSW50KCcwMDAxMCcsIDIpLFxyXG4gICAgSU5GTzogIHBhcnNlSW50KCcwMDEwMCcsIDIpLFxyXG4gICAgV0FSTjogIHBhcnNlSW50KCcwMTAwMCcsIDIpLFxyXG4gICAgRVJST1I6IHBhcnNlSW50KCcxMDAwMCcsIDIpLFxyXG4gICAgTk9ORTogIHBhcnNlSW50KCcxMTExMScsIDIpXHJcbiAgfTtcclxuXHJcbiAgLyoqIGN1cnJlbnQgbG9nIGxldmVsIHNldCBieSBzZXRMb2dMZXZlbCwgZGVmYXVsdCAnSU5GTycgKi9cclxuICBzdGF0aWMgbG9nTGV2ZWwgPSAnSU5GTyc7XHJcblxyXG4gIC8qKiByZXR1cm5zIGlmIGl0IHNob3VsZCBjYWxsIGB3aW5kb3cuY29uc29sZWAgb3Igbm90ICovXHJcbiAgc3RhdGljIHRvTG9nKHBhcmFtKTogYm9vbGVhbiB7IC8vIHJldHVybnMgdG8gbG9nIG9yIG5vdFxyXG4gICAgY29uc3QgcmVzdHJpY3Rpb25OdW0gPSB0aGlzLkxPR19MRVZFTFNbdGhpcy5sb2dMZXZlbF07XHJcbiAgICBjb25zdCByZXF1aXJlZE51bSA9IHRoaXMuTE9HX0xFVkVMU1twYXJhbV07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmVkTnVtID4gcmVzdHJpY3Rpb25OdW07XHJcbiAgfVxyXG5cclxuICAvKiogc2V0cyB0aGUgY3VycmVudCBsb2cgbGV2ZWwgKi9cclxuICBzdGF0aWMgc2V0TG9nTGV2ZWwobG9nTGV2ZWw6IHN0cmluZyk6IGFueSB7XHJcbiAgICBsb2dMZXZlbCA9IGxvZ0xldmVsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBsb2dMZXZlbHMgPSBPYmplY3Qua2V5cyh0aGlzLkxPR19MRVZFTFMpO1xyXG4gICAgaWYgKGxvZ0xldmVscy5pbmRleE9mKGxvZ0xldmVsKSA+IC0xKSB7XHJcbiAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnNlc3Npb25TdG9yYWdlKSB7IC8vIGZvciBicm93c2VyIGVudi5cclxuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgna29uc29sZS5MT0dfTEVWRUwnLCBsb2dMZXZlbCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IsIGludmFsaWQgbG9nTGV2ZWwsIGl0IG11c3QgYmUgb25lIG9mICR7bG9nTGV2ZWxzfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmRlYnVnKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGRlYnVnYCAqL1xyXG4gIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnREVCVUcnKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5sb2coKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgbG9nYCAqL1xyXG4gIHN0YXRpYyBsb2coLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0xPRycpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuaW5mbygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBpbmZvYCAqL1xyXG4gIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdJTkZPJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS53YXJuKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYHdhcm5gICovXHJcbiAgc3RhdGljIHdhcm4oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ1dBUk4nKSkge1xyXG4gICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5lcnJvcigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBlcnJvcmAgKi9cclxuICBzdGF0aWMgZXJyb3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0VSUk9SJykpIHtcclxuICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnYWxsJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ3llcycpO1xyXG4vLyBrb25zb2xlLmxvZygneWVzJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnbm9uZScpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ25vJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdpbmZvJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ1dBUk4nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdFUlJPUicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG4iXX0=