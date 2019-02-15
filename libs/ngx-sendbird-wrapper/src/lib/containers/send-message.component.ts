import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';
import { SendBirdMessageFormComponent } from '../templates/send-bird-message-form.component';

@Component({
  selector: 'stottle-send-message',
  template: `
    <template #messageForm></template>
  `
})
export class SendMessageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageForm', { read: ViewContainerRef })
  messageForm: ViewContainerRef;

  private componentRef: ComponentRef<SendBirdMessageFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService<
      SendBirdMessageFormComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.messageForm,
      SendBirdMessageFormComponent
    );

    this.componentRef.instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendMessage(message.caption))
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
