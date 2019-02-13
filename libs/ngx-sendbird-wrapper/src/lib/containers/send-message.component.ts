import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MessageFormComponent } from '../components/message-form.component';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-message',
  template: `
    <template #messageForm></template>
  `
})
export class SendMessageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageForm', { read: ViewContainerRef })
  messageForm: ViewContainerRef;

  private componentRef: ComponentRef<MessageFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.messageForm,
      MessageFormComponent
    );

    this.componentRef.instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendMessage(message.caption))
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
