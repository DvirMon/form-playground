import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, disabled, form, required, schema } from '@angular/forms/signals';
import { User } from '../../models/user.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signal-form',
  imports: [Control, JsonPipe],
  templateUrl: './signal-form.component.html',
  styleUrls: ['./signal-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormComponent {
  protected readonly user = signal<User>({
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

  protected formSchema = schema<User>((path) => {
    required(path.firstName, { message: `is required` });
    // required((path.firstName), ( {valueOf}) => valueOf(path.lastName) === 'Doe' );
    disabled(path.firstName, ({ valueOf }) => valueOf(path.lastName) === 'chris');
  });

  protected userForm = form(this.user, this.formSchema);

  //   protected readonly form = this.formService.createForm();
  //   protected readonly submitting = signal(false);
  //   protected readonly formData = signal<User | null>(null);

  protected readonly notificationTypes = ['email', 'sms', 'push'] as const;

  constructor() {
  }

  //   protected getErrorMessage(errors: ValidationErrors | null | undefined): string {
  //     if (!errors) return '';
  //     return this.formService.getErrorMessage(errors);
  //   }

  //   protected getFieldClass(errors: ValidationErrors | null | undefined): string {
  //     return errors && Object.keys(errors).length > 0 ? 'error' : '';
  //   }

  //   protected isNotificationSelected(type: string): boolean {
  //     const notifications = this.form.get('preferences.notifications')?.value as string[];
  //     return notifications.includes(type);
  //   }

  //   protected onNotificationChange(event: Event): void {
  //     const input = event.target as HTMLInputElement;
  //     const notifications = this.form.get('preferences.notifications')?.value as string[];

  //     if (input.checked) {
  //       this.form.patchValue({
  //         preferences: {
  //           notifications: [...notifications, input.value],
  //         },
  //       });
  //     } else {
  //       this.form.patchValue({
  //         preferences: {
  //           notifications: notifications.filter((n) => n !== input.value),
  //         },
  //       });
  //     }
  //   }

  protected async onSubmit(): Promise<void> {
    if (this.userForm.email().valid()) {
      // this.userForm.();
    }
  }
}
