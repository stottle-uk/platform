import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CreateChannelFormComponent } from '../components/create-channel-form.component';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-create-open-channel',
  template: `
    <template #channelForm></template>
  `
})
export class CreateOpenChannelComponent {
  @ViewChild('channelForm', { read: ViewContainerRef })
  channelForm: ViewContainerRef;

  private componentRef: ComponentRef<CreateChannelFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.channelForm,
      CreateChannelFormComponent
    );

    this.componentRef.instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.createOpenChannel(message.name))
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
