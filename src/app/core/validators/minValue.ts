import { AbstractControl } from '@angular/forms';

// Max value validator
export const minValue = (valueMin: number, message: string) => {
  return (control: AbstractControl) => {
    if (+control.value < valueMin) {
      return { message };
    }

    return null;
  };
};
