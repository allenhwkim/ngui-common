// It's too big to have it in config.json
module.exports = {
  "collectCoverage": false,
  "collectCoverageFrom": [
    "modules/**/*.{component,directive,service,pipe}.ts"
  ],
  "coverageReporters": [
    "text",
    "html"
  ],
  "coverageThreshold": {
    "global": {
      "functions": 80,
      "lines": 80
    }
  },
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/test/jest-setup.ts",
  "globals": {
    "__TRANSFORM_HTML__": true,
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  "testMatch": [
    "**/+(*.)+(spec).+(ts|js)?(x)"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "html"
  ],
  "moduleNameMapper": null,
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx)"
  ],
  "testResultsProcessor": "./node_modules/jest-html-reporter"
};

