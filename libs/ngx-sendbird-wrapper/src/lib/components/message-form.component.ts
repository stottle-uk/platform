import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SendMessage } from '../models/messages.model';

@Component({
  selector: 'stottle-message-form',
  template: `
    <form [formGroup]="messageForm" (ngSubmit)="formSubmit()">
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Type your message"
          formControlName="caption"
        />
      </mat-form-field>
      <button mat-button type="submit" color="primary">Send</button>
    </form>
  `,
  styles: []
})
export class MessageFormComponent {
  @Output()
  messageSubmit = new EventEmitter<SendMessage>();

  messageForm = this.fb.group({
    caption: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  formSubmit(): void {
    if (this.messageForm.valid) {
      this.messageSubmit.emit(this.messageForm.value);
    }
  }
}
