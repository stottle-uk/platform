import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
          formControlName="message"
        />
      </mat-form-field>
      <button mat-button type="submit" color="primary">Send</button>
    </form>
  `,
  styles: []
})
export class MessageFormComponent implements OnInit {
  @Output()
  messageSubmit = new EventEmitter<SendMessage>();

  messageForm = this.fb.group({
    message: [null, Validators.required]
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  formSubmit(): void {
    if (this.messageForm.valid) {
      this.messageSubmit.emit(this.messageForm.value);
    }
  }
}
