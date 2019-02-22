import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../models/contacts.http';

@Component({
  selector: 'stottle-platform-contact-form',
  template: `
    <mat-toolbar color="accent">
      <button type="button" mat-icon-button (click)="cancel.emit()">
        <mat-icon aria-label="Side nav toggle icon">arrow_back</mat-icon>
      </button>

      <span fxFlex="100" *ngIf="!saving">{{ headerLabel }}</span>
      <span fxFlex="100" *ngIf="saving">Saving</span>
    </mat-toolbar>

    <form class="contact-form" [formGroup]="contactForm">
      <mat-form-field class="contact-full-width">
        <input
          matInput
          type="text"
          placeholder="Your name"
          formControlName="name"
        />
        <mat-error
          *ngIf="
            emailControl.hasError('name') || emailControl.hasError('required')
          "
        >
          Please enter a valid name
        </mat-error>
      </mat-form-field>

      <mat-form-field class="contact-full-width">
        <input
          matInput
          type="text"
          placeholder="Your Address"
          formControlName="street"
        />
      </mat-form-field>

      <mat-form-field class="contact-full-width">
        <input
          matInput
          type="email"
          placeholder="Your Email"
          formControlName="email"
        />
        <mat-error *ngIf="emailControl.hasError('email')">
          Please enter a valid email address
        </mat-error>
      </mat-form-field>

      <mat-form-field class="contact-full-width">
        <input
          matInput
          type="tel"
          placeholder="Your Phone"
          formControlName="phone"
        />
      </mat-form-field>

      <mat-form-field class="contact-full-width">
        <input
          matInput
          type="number"
          min="10"
          max="99"
          placeholder="Your Age"
          formControlName="age"
        />
      </mat-form-field>

      <div class="header-container">
        <button
          mat-raised-button
          color="primary"
          [disabled]="this.contactForm.invalid"
          (click)="submitForm()"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .contact-form {
        margin: 0 auto;
        padding: 20px;
        max-width: 500px;
      }

      .contact-full-width {
        width: 100%;
      }
    `
  ]
})
export class ContactFormComponent implements OnChanges {
  @Input() contact: Contact;
  @Input() saving: boolean;
  @Output() contactSaved = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter();

  contactForm = this.fb.group({
    id: [null],
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required]],
    age: [null, [Validators.required]]
  });

  get headerLabel(): string {
    return !!this.contact && !!this.contact.name
      ? `Editing - ${this.contactName} (${this.contactId})`
      : `Create new contact`;
  }

  get contactId(): number {
    return this.contact && this.contact.id;
  }

  get contactName(): string {
    return this.contact && this.contact.name;
  }

  get idControl(): AbstractControl {
    return this.contactForm.controls.id;
  }

  get nameControl(): AbstractControl {
    return this.contactForm.controls.name;
  }

  get emailControl(): AbstractControl {
    return this.contactForm.controls.email;
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.contact && this.idControl.value !== this.contact.id) {
      this.contactForm.setValue(
        {
          id: this.contact.id,
          name: this.contact.name,
          street: this.contact.street,
          email: this.contact.email,
          phone: this.contact.phone,
          age: this.contact.age
        },
        {
          emitEvent: false
        }
      );
    }
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      this.contactSaved.emit(this.contactForm.value);
    }
  }
}
