import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EditChannel } from '@stottle-platform/ngx-sendbird-wrapper';
import { SendBirdChannelFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/channels/templates/send-bird-channel-form.component';

@Component({
  selector: 'stottle-edit-open-channel-form',
  template: `
    <form [formGroup]="messageForm" (ngSubmit)="formSubmit()">
      <input
        type="text"
        placeholder="Your channel name"
        formControlName="name"
      />
      <button type="submit" color="primary">Send</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditOpenChannelFormComponent
  implements SendBirdChannelFormComponent, AfterContentInit {
  @Input()
  channel: SendBird.OpenChannel;
  @Output()
  messageSubmit = new EventEmitter<EditChannel>();

  messageForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngAfterContentInit(): void {
    if (this.channel) {
      this.messageForm.patchValue({
        name: this.channel.name
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
