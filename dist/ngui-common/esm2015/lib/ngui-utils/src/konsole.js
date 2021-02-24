/**
 * window.konsole alternative
 ### Example
 ```js
 konsole.setLogLevel('error');
 konsole.log(1,2,3,4,5);
 ```
 */
export class konsole {
    /** returns if it should call `window.console` or not */
    static toLog(param) {
        const restrictionNum = this.LOG_LEVELS[this.logLevel];
        const requiredNum = this.LOG_LEVELS[param];
        return requiredNum > restrictionNum;
    }
    /** sets the current log level */
    static setLogLevel(logLevel) {
        logLevel = logLevel.toUpperCase();
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
    /** The same as `console.debug()` if the current log level is greater than `debug` */
    static debug(...args) {
        if (this.toLog('DEBUG')) {
            // noinspection TsLint
            console.debug.apply(console, arguments); // tslint:disable-line
        }
    }
    /** The same as `console.log()` if the current log level is greater than `log` */
    static log(...args) {
        if (this.toLog('LOG')) {
            console.log.apply(console, arguments);
        }
    }
    /** The same as `console.info()` if the current log level is greater than `info` */
    static info(...args) {
        if (this.toLog('INFO')) {
            // noinspection TsLint
            console.info.apply(console, arguments); // tslint:disable-line
        }
    }
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    static warn(...args) {
        if (this.toLog('WARN')) {
            console.warn.apply(console, arguments);
        }
    }
    /** The same as `console.error()` if the current log level is greater than `error` */
    static error(...args) {
        if (this.toLog('ERROR')) {
            console.error.apply(console, arguments);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25ndWktY29tbW9uL3NyYy9saWIvbmd1aS11dGlscy9zcmMva29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFnQixPQUFPO0lBZTNCLHdEQUF3RDtJQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxPQUFPLFdBQVcsR0FBRyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVELGlDQUFpQztJQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQWdCO1FBQ2pDLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxtQkFBbUI7Z0JBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRUQscUZBQXFGO0lBQ3JGLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRTtJQUNILENBQUM7SUFFRCxpRkFBaUY7SUFDakYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQWdCO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsbUZBQW1GO0lBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFnQjtRQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEIsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNqRTtJQUNILENBQUM7SUFFRCxtRkFBbUY7SUFDbkYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQscUZBQXFGO0lBQ3JGLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7QUF2RUQscUJBQXFCO0FBQ2Qsa0JBQVUsR0FBRztJQUNsQixHQUFHLEVBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLEdBQUcsRUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0IsSUFBSSxFQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLEVBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Q0FDNUIsQ0FBQztBQUVGLDJEQUEyRDtBQUNwRCxnQkFBUSxHQUFHLE1BQU0sQ0FBQztBQThEM0IsOEJBQThCO0FBQzlCLHdCQUF3QjtBQUN4QixzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFFeEIsK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFFdkIsK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFFeEIsK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFFeEIsZ0NBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0Qix3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogd2luZG93LmtvbnNvbGUgYWx0ZXJuYXRpdmVcclxuICMjIyBFeGFtcGxlXHJcbiBgYGBqc1xyXG4ga29uc29sZS5zZXRMb2dMZXZlbCgnZXJyb3InKTtcclxuIGtvbnNvbGUubG9nKDEsMiwzLDQsNSk7XHJcbiBgYGBcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBrb25zb2xlIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gIC8qKiBhbGwgbG9nIGxldmVscyAqL1xyXG4gIHN0YXRpYyBMT0dfTEVWRUxTID0ge1xyXG4gICAgQUxMOiAgIHBhcnNlSW50KCcwMDAwMCcsIDIpLFxyXG4gICAgREVCVUc6IHBhcnNlSW50KCcwMDAwMScsIDIpLFxyXG4gICAgTE9HOiAgIHBhcnNlSW50KCcwMDAxMCcsIDIpLFxyXG4gICAgSU5GTzogIHBhcnNlSW50KCcwMDEwMCcsIDIpLFxyXG4gICAgV0FSTjogIHBhcnNlSW50KCcwMTAwMCcsIDIpLFxyXG4gICAgRVJST1I6IHBhcnNlSW50KCcxMDAwMCcsIDIpLFxyXG4gICAgTk9ORTogIHBhcnNlSW50KCcxMTExMScsIDIpXHJcbiAgfTtcclxuXHJcbiAgLyoqIGN1cnJlbnQgbG9nIGxldmVsIHNldCBieSBzZXRMb2dMZXZlbCwgZGVmYXVsdCAnSU5GTycgKi9cclxuICBzdGF0aWMgbG9nTGV2ZWwgPSAnSU5GTyc7XHJcblxyXG4gIC8qKiByZXR1cm5zIGlmIGl0IHNob3VsZCBjYWxsIGB3aW5kb3cuY29uc29sZWAgb3Igbm90ICovXHJcbiAgc3RhdGljIHRvTG9nKHBhcmFtKTogYm9vbGVhbiB7IC8vIHJldHVybnMgdG8gbG9nIG9yIG5vdFxyXG4gICAgY29uc3QgcmVzdHJpY3Rpb25OdW0gPSB0aGlzLkxPR19MRVZFTFNbdGhpcy5sb2dMZXZlbF07XHJcbiAgICBjb25zdCByZXF1aXJlZE51bSA9IHRoaXMuTE9HX0xFVkVMU1twYXJhbV07XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmVkTnVtID4gcmVzdHJpY3Rpb25OdW07XHJcbiAgfVxyXG5cclxuICAvKiogc2V0cyB0aGUgY3VycmVudCBsb2cgbGV2ZWwgKi9cclxuICBzdGF0aWMgc2V0TG9nTGV2ZWwobG9nTGV2ZWw6IHN0cmluZyk6IGFueSB7XHJcbiAgICBsb2dMZXZlbCA9IGxvZ0xldmVsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBsb2dMZXZlbHMgPSBPYmplY3Qua2V5cyh0aGlzLkxPR19MRVZFTFMpO1xyXG4gICAgaWYgKGxvZ0xldmVscy5pbmRleE9mKGxvZ0xldmVsKSA+IC0xKSB7XHJcbiAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LnNlc3Npb25TdG9yYWdlKSB7IC8vIGZvciBicm93c2VyIGVudi5cclxuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgna29uc29sZS5MT0dfTEVWRUwnLCBsb2dMZXZlbCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IsIGludmFsaWQgbG9nTGV2ZWwsIGl0IG11c3QgYmUgb25lIG9mICR7bG9nTGV2ZWxzfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBzYW1lIGFzIGBjb25zb2xlLmRlYnVnKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYGRlYnVnYCAqL1xyXG4gIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50b0xvZygnREVCVUcnKSkge1xyXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUc0xpbnRcclxuICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5sb2coKWAgaWYgdGhlIGN1cnJlbnQgbG9nIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiBgbG9nYCAqL1xyXG4gIHN0YXRpYyBsb2coLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0xPRycpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIHNhbWUgYXMgYGNvbnNvbGUuaW5mbygpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBpbmZvYCAqL1xyXG4gIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvTG9nKCdJTkZPJykpIHtcclxuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHNMaW50XHJcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS53YXJuKClgIGlmIHRoZSBjdXJyZW50IGxvZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gYHdhcm5gICovXHJcbiAgc3RhdGljIHdhcm4oLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ1dBUk4nKSkge1xyXG4gICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgc2FtZSBhcyBgY29uc29sZS5lcnJvcigpYCBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIGBlcnJvcmAgKi9cclxuICBzdGF0aWMgZXJyb3IoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudG9Mb2coJ0VSUk9SJykpIHtcclxuICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnYWxsJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ3llcycpO1xyXG4vLyBrb25zb2xlLmxvZygneWVzJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygneWVzJyk7XHJcbi8vIGtvbnNvbGUud2FybigneWVzJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG5cclxuLy8ga29uc29sZS5zZXRMb2dMZXZlbCgnbm9uZScpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ25vJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdpbmZvJyk7XHJcbi8vIGtvbnNvbGUuZGVidWcoJ25vJyk7XHJcbi8vIGtvbnNvbGUubG9nKCdubycpO1xyXG4vLyBrb25zb2xlLmluZm8oJ3llcycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ3llcycpO1xyXG4vLyBrb25zb2xlLmVycm9yKCd5ZXMnKTtcclxuXHJcbi8vIGtvbnNvbGUuc2V0TG9nTGV2ZWwoJ1dBUk4nKTtcclxuLy8ga29uc29sZS5kZWJ1Zygnbm8nKTtcclxuLy8ga29uc29sZS5sb2coJ25vJyk7XHJcbi8vIGtvbnNvbGUuaW5mbygnbm8nKTtcclxuLy8ga29uc29sZS53YXJuKCd5ZXMnKTtcclxuLy8ga29uc29sZS5lcnJvcigneWVzJyk7XHJcblxyXG4vLyBrb25zb2xlLnNldExvZ0xldmVsKCdFUlJPUicpO1xyXG4vLyBrb25zb2xlLmRlYnVnKCdubycpO1xyXG4vLyBrb25zb2xlLmxvZygnbm8nKTtcclxuLy8ga29uc29sZS5pbmZvKCdubycpO1xyXG4vLyBrb25zb2xlLndhcm4oJ25vJyk7XHJcbi8vIGtvbnNvbGUuZXJyb3IoJ3llcycpO1xyXG4iXX0=