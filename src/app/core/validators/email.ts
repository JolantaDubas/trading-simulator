import { AbstractControl } from '@angular/forms';

// Email validator for formControl
export const email = () => {
  return (control: AbstractControl) => {
    const emailRegEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(control.value) && control.value) {
      return { message: 'Invalid email address' };
    }

    return null;
  };
};
