import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  SendBirdMessageFormComponent,
  SendMessage
} from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-message-form',
  template: `
    <form [formGroup]="messageForm" (ngSubmit)="formSubmit()">
      <input
        type="text"
        placeholder="Type your message"
        formControlName="caption"
      />
      <button type="submit" color="primary">Send</button>
    </form>
  `
})
export class MessageFormComponent
  implements SendBirdMessageFormComponent, AfterContentInit {
  @Input()
  message: SendBird.UserMessage;
  @Output()
  messageSubmit = new EventEmitter<SendMessage>();

  messageForm = this.fb.group({
    caption: [null, Validators.required],
    id: null
  });

  constructor(private fb: FormBuilder) {}

  ngAfterContentInit(): void {
    if (this.message) {
      this.messageForm.patchValue({
        caption: this.message.message,
        id: this.message.messageId
      });
    }
  }

  formSubmit(): void {
    if (this.messageForm.valid) {
      this.messageSubmit.emit(this.messageForm.value);
      this.messageForm.reset();
    }
  }
}
