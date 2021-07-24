import { AbstractControl } from '@angular/forms';

// Max value validator
export const maxValue = (valueMax: number, message: string) => {
  return (control: AbstractControl) => {
    if (+control.value > valueMax) {
      return { message };
    }

    return null;
  };
};
