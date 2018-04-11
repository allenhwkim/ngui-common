// do not import any other than you test. For others, mock it
import { MasterService } from './master.service';

// For http test, look at this. https://izifortune.com/unit-testing-angular-applications-with-jest/
// Straight Jasmine testing without Angular's testing support
describe('MasterService', () => {
  let service;
  let valueService;
  class ValueService {
    getValue = function() {};
  }

  beforeEach(() => {
    valueService = new ValueService();
    service = new MasterService(valueService);
  });

  it('#getValue should return value', () => {
    const spy = jest.spyOn(valueService, 'getValue');
    spy.mockReturnValue('stub value');

    expect(service.getValue()).toBe('stub value');
    expect(spy).toHaveBeenCalled();
  });
});
