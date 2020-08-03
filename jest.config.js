// It's too big to have it in config.json
module.exports = {
  "collectCoverage": false,
  "collectCoverageFrom": [
    "projects/ngui-common/src/lib/**/src/*.{component,directive,service,pipe}.ts"
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
  "setupFilesAfterEnv": ["<rootDir>/test/jest-setup.ts"],
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "stringifyContentPathRegex": /\.html$/
    }
  },
  "testMatch": [
    "**/*.spec.ts"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "html"
  ],
  "moduleNameMapper": null,
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-test))"
  ],
  "testResultsProcessor": "./node_modules/jest-html-reporter"
};

