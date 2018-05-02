// do not import any other than you test. For others, mock it
import { DynamicComponentService } from './dynamic-component.service';

// For http test, look at this. https://izifortune.com/unit-testing-angular-applications-with-jest/
// Straight Jasmine testing without Angular's testing support
describe('DynamicComponentService', () => {
  // let service;
  // let valueService;
  class ValueService {
    getValue = () => void(0);
  }

  beforeEach(() => {
    // valueService = new ValueService();
    // service = new DynamicComponentService(valueService);
  });

  it('#getValue should return value', () => {
    // const spy = jest.spyOn(valueService, 'getValue');
    // spy.mockReturnValue('stub value');

    // expect(service.getValue()).toBe('stub value');
    // expect(spy).toHaveBeenCalled();
  });
});
