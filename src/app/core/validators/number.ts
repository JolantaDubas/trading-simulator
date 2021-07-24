import { AbstractControl } from '@angular/forms';

export const number = () => {
  return (control: AbstractControl) => {
    const numberRegEx = /^[+]?[0-9]*\.?[0-9]+$/;
    if (!numberRegEx.test(control.value) && control.value) {
      return { message: 'Only number allowed' };
    }

    return null;
  };
};
