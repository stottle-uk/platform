import {
  AfterViewInit,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';
import { SendbirdCreateChannelFormComponent } from '../templates';

@Component({
  selector: 'stottle-create-group-channel',
  template: `
    <template #channelForm></template>
  `
})
export class CreateGroupChannelComponent implements AfterViewInit {
  @ViewChild('channelForm', { read: ViewContainerRef })
  channelForm: ViewContainerRef;

  private componentRef: ComponentRef<SendbirdCreateChannelFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService<
      SendbirdCreateChannelFormComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.channelForm,
      SendbirdCreateChannelFormComponent
    );

    this.componentRef.instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel =>
          this.vs.createGroupChannel(
            ['first_user', 'other_user'],
            true,
            channel.name
          )
        )
      )
      .subscribe();

    this.componentRef.hostView.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRef.destroy();
  }
}
