import { DynamicComponentService } from './dynamic-component.service';

// For http test, look at this. https://izifortune.com/unit-testing-angular-applications-with-jest/
// Straight Jasmine testing without Angular's testing support
describe('DynamicComponentService', () => {
  let service;
  const aFactory = {
      create: jest.fn()
    };

  const factoryResolver = {
    resolveComponentFactory: _ => aFactory
  };

  beforeEach(() => {
    service = new DynamicComponentService(factoryResolver);
  });

  it('should run #createComponent', () => {
    const component = {};
    const into = {rootViewContainer: {}};
    service.createComponent(component, into);

    expect(aFactory.create).toHaveBeenCalled();
  });

  it('should run #insertComponent', () => {
    const component = {
      location: {
        nativeElement: { setAttribute: jest.fn() }
      },
      instance: {}
    };

    service.rootViewContainer = {
      insert: jest.fn()
    };
    service.insertComponent(component);

    expect(service.rootViewContainer.insert).toHaveBeenCalled();
  });
});
