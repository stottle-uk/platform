import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
} from 'rxjs/operators';
import { Contact } from '../+state/contacts.model';

@Component({
  selector: 'stottle-contact-edit-inner',
  template: `
    <form class="example-form" [formGroup]="contactForm">
      <mat-form-field class="example-full-width">
        <input matInput type="text" placeholder="Your name" formControlName="name">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <input matInput type="text" placeholder="Your Address" formControlName="street">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <input matInput type="email" placeholder="Your Email" formControlName="email">
        <mat-error *ngIf="emailControl.hasError('email')">
          Please enter a valid email address
        </mat-error>
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <input matInput type="tel" placeholder="Your Phone" formControlName="phone">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <input matInput type="number" placeholder="Your Age" formControlName="age">
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `
  ]
})
export class ContactEditInnerComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  @Output() contactUpdated = new EventEmitter<Contact>();

  contactForm = this.fb.group({
    id: [0],
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required]],
    age: [null, [Validators.required]]
  });

  get idControl(): AbstractControl {
    return this.contactForm.controls.id;
  }

  get emailControl(): AbstractControl {
    return this.contactForm.controls.email;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm.valueChanges
      .pipe(
        filter(() => this.contactForm.valid),
        debounceTime(200),
        distinctUntilChanged(),
        map(contact => contact as Contact),
        tap(contact => this.contactUpdated.emit(contact))
      )
      .subscribe();
  }

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
}
