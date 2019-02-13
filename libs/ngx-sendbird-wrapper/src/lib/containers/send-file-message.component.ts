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
import { MessageFileFormComponent } from '../components/message-file-form.component';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-file-message',
  template: `
    <template #messageFileForm></template>
  `
})
export class SendFileMessageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageFileForm', { read: ViewContainerRef })
  messageFileForm: ViewContainerRef;

  private componentRef: ComponentRef<MessageFileFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.messageFileForm.clear();

    const messageFileFormCmp = this.resolver.resolveComponentFactory(
      MessageFileFormComponent
    );
    const cmpRef = this.messageFileForm.createComponent(messageFileFormCmp);

    cmpRef.instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendFileMessage(message.file))
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
