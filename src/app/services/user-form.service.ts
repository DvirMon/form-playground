import { inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

export class UserFormService {
  private readonly fb = inject(FormBuilder);

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.dateValidator()]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]],
        country: ['', Validators.required],
      }),
      preferences: this.fb.group({
        newsletter: [false],
        notifications: [[]],
        theme: ['system'],
      }),
    });
  }

  private dateValidator() {
    return (control: AbstractControl) => {
      const date = new Date(control.value);
      const now = new Date();
      const minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());

      if (isNaN(date.getTime())) {
        return { invalidDate: true };
      }

      if (date > now) {
        return { futureDate: true };
      }

      if (date < minDate) {
        return { tooOld: true };
      }

      return null;
    };
  }

  getErrorMessage(error: { [key: string]: any }): string {
    if (error['required']) return 'This field is required';
    if (error['email']) return 'Please enter a valid email address';
    if (error['minlength'])
      return `Must be at least ${error['minlength'].requiredLength} characters`;
    if (error['pattern']) return 'Please enter a valid format';
    if (error['invalidDate']) return 'Please enter a valid date';
    if (error['futureDate']) return 'Date cannot be in the future';
    if (error['tooOld']) return 'Date is too far in the past';
    return 'Invalid value';
  }
}
