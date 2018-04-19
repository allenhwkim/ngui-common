export var konsole = {

  LOG_LEVELS: {
    ALL:   parseInt('11111', 2),
    DEBUG: parseInt('00001', 2),
    LOG:   parseInt('00010', 2),
    INFO:  parseInt('00100', 2),
    WARN:  parseInt('01000', 2),
    ERROR: parseInt('10000', 2),
    NONE:  parseInt('00000', 2)
  },

  setLogLevel(logLevel) {
    const logLevels = Object.keys(this.LOG_LEVELS);
    if (Object.keys(logLevels).includes(logLevel)) {
      if (window && window.sessionStorage) { // for browser env.
        window.sessionStorage.setItem('konsole.LOG_LEVEL', logLevel);
      } else {
        this.logLevel = logLevel;            // for NodeJS env.
      }
    } else {
      console.error(`Error, invalid logLevel, it must be one of ${logLevels}`);
    }
  },
  getLogLevel() {
    if (window && window.sessionStorage) { // for browser env.
      return window.sessionStorage.getItem('konsole.LOG_LEVEL');
    } else {
      return this.logLevel;
    }
  },
  toLog: function(param) { // returns to log or not
    const logLevel = this.getLogLevel() || 'INFO';
    return  this.LOG_LEVELS[logLevel] >= this.LOG_LEVELS[param];
  },
  
  debug: function() {
    this.toLog('DEBUG') && console.debug.apply(console, arguments);
  },
  log: function() {
    this.toLog('LOG') && console.log.apply(console, arguments);
  },
  info: function() {
    this.toLog('INFO') && console.info.apply(console, arguments);
  },
  warn: function() {
    this.toLog('WARN') && console.warn.apply(console, arguments);
  },
  error: function() {
    this.toLog('ERROR') && console.error.apply(console, arguments);
  }
};

// konsole.setLogLevel('DEBUG');     // this sets logLevel to session storage
//                                   // logLevel is the same althout you refresh browser
// konsole.error('error', 1, 2, 3);  // no
// konsole.log('log', 1,2,3,4,5);    // yes
// konsole.setLogLevel('ERROR');
// konsole.error('error', 1, 2, 3);  // yes
// konsole.log('log', 1,2,3,4,5);    // yes