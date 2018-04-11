import { Injectable } from '@angular/core';

import { ValueService } from './value.service';

@Injectable()
export class MasterService {

  constructor(private valueService: ValueService) {
  }

  getValue(): any {
    return this.valueService.getValue();
  }

}
