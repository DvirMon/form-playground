import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserFormService } from '../../services/user-form.service';
import { Control, form } from '@angular/forms/signals';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, Control],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFormService],
})
export class UserFormComponent {
  private formService = inject(UserFormService);

  private readonly user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    preferences: {
      newsletter: false,
      notifications: [],
      theme: 'system',
    },
  });

  protected userForm = form(this.user);

  protected readonly form = this.formService.createForm();
  protected readonly submitting = signal(false);
  protected readonly formData = signal<User | null>(null);

  protected readonly notificationTypes = ['email', 'sms', 'push'] as const;

  protected getErrorMessage(errors: ValidationErrors | null | undefined): string {
    if (!errors) return '';
    return this.formService.getErrorMessage(errors);
  }

  protected getFieldClass(errors: ValidationErrors | null | undefined): string {
    return errors && Object.keys(errors).length > 0 ? 'error' : '';
  }

  protected isNotificationSelected(type: string): boolean {
    const notifications = this.form.get('preferences.notifications')?.value as string[];
    return notifications.includes(type);
  }

  protected onNotificationChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const notifications = this.form.get('preferences.notifications')?.value as string[];

    if (input.checked) {
      this.form.patchValue({
        preferences: {
          notifications: [...notifications, input.value],
        },
      });
    } else {
      this.form.patchValue({
        preferences: {
          notifications: notifications.filter((n) => n !== input.value),
        },
      });
    }
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.submitting.set(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.formData.set(this.form.value as User);
        console.log('Form submitted:', this.form.value);
      } finally {
        this.submitting.set(false);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
