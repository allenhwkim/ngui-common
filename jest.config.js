const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

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
  preset: 'jest-preset-angular',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "test-report.html",
      "includeFailureMsg": true
    }]
  ]
};

