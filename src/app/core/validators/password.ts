import { AbstractControl } from '@angular/forms';

export const password = () => {
  return (control: AbstractControl) => {
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegEx.test(control.value) && control.value) {
      return {
        message:
          'Password need to have minimum eight characters, at least one letter, one number and one special character.',
      };
    }

    return null;
  };
};
