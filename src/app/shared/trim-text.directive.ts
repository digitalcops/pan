import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { NoWhitespaceValidator } from './no-whitespace.validator';

@Directive({
  selector: '[appTrimText]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TrimTextDirective, multi: true }]

})
export class TrimTextDirective implements Validator {

  constructor() { }

  readonly valFn = NoWhitespaceValidator();
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }

}
