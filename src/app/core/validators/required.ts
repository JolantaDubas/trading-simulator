import { AbstractControl } from '@angular/forms';

// Required validator
export const required = () => {
  return (control: AbstractControl) => {
    if (!control.value || control.value.length === 0) {
      return { message: 'This field is required' };
    }

    return null;
  };
};
