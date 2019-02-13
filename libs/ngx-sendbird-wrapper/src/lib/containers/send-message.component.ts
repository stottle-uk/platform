import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MessageFormComponent } from '../components/message-form.component';
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
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.messageForm.clear();

    const messageFormCmp = this.resolver.resolveComponentFactory(
      MessageFormComponent
    );
    const cmpRef = this.messageForm.createComponent(messageFormCmp);

    cmpRef.instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendMessage(message.caption))
      )
      .subscribe();

    this.componentRef = cmpRef;

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRef.destroy();
  }
}
