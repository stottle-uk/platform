import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditChannel } from '@stottle-platform/ngx-sendbird-wrapper';
import { SendBirdChannelFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/channels/templates/send-bird-channel-form.component';

@Component({
  selector: 'stottle-edit-open-channel-form',
  template: `
    <form [formGroup]="channelForm" (ngSubmit)="formSubmit()">
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
  channelSubmit = new EventEmitter<EditChannel>();

  channelForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterContentInit(): void {
    if (this.channel) {
      this.channelForm.patchValue({
        name: this.channel.name
      });
    }
  }

  formSubmit(): void {
    if (this.channelForm.valid) {
      this.channelSubmit.emit(this.buildChannelData());
      this.channelForm.reset();
    }
  }

  private buildChannelData(): EditChannel {
    return {
      ...this.channelForm.value,
      callback: channel => {
        this.router.navigate(['../../', channel.url], {
          relativeTo: this.activatedRoute
        });
      }
    };
  }
}
