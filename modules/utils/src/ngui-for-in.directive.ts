import {
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { NgForOf, NgForOfContext } from '@angular/common';

interface NguiForInChanges extends SimpleChanges {
  ngForIn?: SimpleChange;
  ngForOf?: SimpleChange;
}

@Directive({
  selector: '[nguiFor][nguiForIn]' // tslint:disable-line
})
export class NguiForInDirective<T> extends NgForOf<T> implements OnChanges {

  @Input() nguiForIn: any;

  ngOnChanges(changes: NguiForInChanges): void {
    if (changes.nguiForIn) {
      this.ngForOf = Object.keys(this.nguiForIn) as Array<any>;

      const change = changes.nguiForIn;
      const currentValue = Object.keys(change.currentValue);
      const previousValue = change.previousValue ? Object.keys(change.previousValue) : undefined;
      changes.ngForOf =  new SimpleChange(previousValue, currentValue, change.firstChange);

      super.ngOnChanges(changes);
    }
  }
}
