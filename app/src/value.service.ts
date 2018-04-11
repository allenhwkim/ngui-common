import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ValueService {
  getValue = () => 'real value';
  getObservableValue = () => Observable.of('observable value');
  getPromiseValue = () => Promise.resolve('promise value');
}
