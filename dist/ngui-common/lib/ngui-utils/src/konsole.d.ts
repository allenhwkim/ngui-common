/**
 * window.konsole alternative
 * ### example
 * ```
 * konsole.setLogLevel('error');
 * konwole.log(1,2,3,4,5);
 * ```
 */
export declare abstract class konsole {
    /** all log levels */
    static LOG_LEVELS: {
        ALL: number;
        DEBUG: number;
        LOG: number;
        INFO: number;
        WARN: number;
        ERROR: number;
        NONE: number;
    };
    /** current log level set by setLogLevel, default 'INFO' */
    static logLevel: string;
    /** returns if it should call `window.console` or not */
    static toLog(param: any): boolean;
    /** sets the current log level */
    static setLogLevel(logLevel: string): any;
    /** The same as `console.debug()` if the current log level is greater than `debug` */
    static debug(...args: Array<any>): void;
    /** The same as `console.log()` if the current log level is greater than `log` */
    static log(...args: Array<any>): void;
    /** The same as `console.info()` if the current log level is greater than `info` */
    static info(...args: Array<any>): void;
    /** The same as `console.warn()` if the current log level is greater than `warn` */
    static warn(...args: Array<any>): void;
    /** The same as `console.error()` if the current log level is greater than `error` */
    static error(...args: Array<any>): void;
}
