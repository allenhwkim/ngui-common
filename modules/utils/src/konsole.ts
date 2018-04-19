/**
 * window.konsole alternative
 * @example
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 */
export abstract class konsole { // tslint:disable-line
  /** all log levels */
  static LOG_LEVELS = {
    ALL:   parseInt('00000', 2),
    DEBUG: parseInt('00001', 2),
    LOG:   parseInt('00010', 2),
    INFO:  parseInt('00100', 2),
    WARN:  parseInt('01000', 2),
    ERROR: parseInt('10000', 2),
    NONE:  parseInt('11111', 2)
  };

  /** current log level set by setLogLevel, default 'INFO' */
  static logLevel = 'INFO';

  /** returns if it should call `window.console` or not */
  static toLog(param): boolean { // returns to log or not
    const restrictionNum = this.LOG_LEVELS[this.logLevel];
    const requiredNum = this.LOG_LEVELS[param];

    return requiredNum > restrictionNum;
  }

  /** sets the current log level */
  static setLogLevel(logLevel: string): any {
    logLevel = logLevel.toUpperCase();
    const logLevels = Object.keys(this.LOG_LEVELS);
    if (logLevels.indexOf(logLevel) > -1) {
      if (window && window.sessionStorage) { // for browser env.
        window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
      }
      this.logLevel = logLevel;
    } else {
      console.error(`Error, invalid logLevel, it must be one of ${logLevels}`);
    }
  }

  /** The same as `console.debug()` if the current log level is greater than `debug` */
  static debug(...args: Array<any>): void {
    this.toLog('DEBUG') && console.debug.apply(console, arguments);
  }

  /** The same as `console.log()` if the current log level is greater than `log` */
  static log(...args: Array<any>): void {
    this.toLog('LOG') && console.log.apply(console, arguments);
  }

  /** The same as `console.info()` if the current log level is greater than `info` */
  static info(...args: Array<any>): void {
    this.toLog('INFO') && console.info.apply(console, arguments);
  }

  /** The same as `console.warn()` if the current log level is greater than `warn` */
  static warn(...args: Array<any>): void {
    this.toLog('WARN') && console.warn.apply(console, arguments);
  }

  /** The same as `console.error()` if the current log level is greater than `error` */
  static error(...args: Array<any>): void {
    this.toLog('ERROR') && console.error.apply(console, arguments);
  }
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