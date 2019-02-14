import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  CreateChannel,
  SendbirdCreateChannelFormComponent
} from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-create-channel-form',
  template: `
    <form [formGroup]="channelForm" (ngSubmit)="formSubmit()">
      <input
        type="text"
        placeholder="Type your channel name"
        formControlName="name"
      />
      <button type="submit" color="primary">Create</button>
    </form>
  `
})
export class CreateChannelFormComponent
  implements SendbirdCreateChannelFormComponent {
  @Output()
  channelSubmit = new EventEmitter<CreateChannel>();

  channelForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  formSubmit(): void {
    if (this.channelForm.valid) {
      this.channelSubmit.emit(this.channelForm.value);
      this.channelForm.reset();
    }
  }
}