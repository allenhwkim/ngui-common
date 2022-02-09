/**
 * Jest initial setup actions
 *
 * It also enables the following to all Jest tests
 *  . window.localStorage
 *  . window.sessionStorage
 *  . window.getComputedStyle
 *  . document.doctype
 *  . document.body.style.transform
 *  . MockPipe()
 *  . MockComponent()
 *  . MockDirective()
 */
import 'jest-preset-angular';

import 'zone.js/fesm2015/zone-testing-bundle.min.js';
import './jest-global-mocks';

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: {
    destroyAfterEach: true
  }
});
