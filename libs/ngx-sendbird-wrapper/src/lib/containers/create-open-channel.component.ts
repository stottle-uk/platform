import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';
import { SendbirdCreateChannelFormComponent } from '../templates/send-bird-create-channel-form.component';

@Component({
  selector: 'stottle-create-open-channel',
  template: `
    <template #channelForm></template>
  `
})
export class CreateOpenChannelComponent implements AfterViewInit {
  @ViewChild('channelForm', { read: ViewContainerRef })
  channelForm: ViewContainerRef;

  private componentRef: ComponentRef<SendbirdCreateChannelFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService<
      SendbirdCreateChannelFormComponent
    >,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.channelForm,
      SendbirdCreateChannelFormComponent
    );

    this.componentRef.instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel => this.vs.createOpenChannel(channel.name))
      )
      .subscribe();

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRef.destroy();
  }
}
