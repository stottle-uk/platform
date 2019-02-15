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
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';
import { SendbirdMessageFileFormComponent } from '../templates/send-bird-message-file-form.component';

@Component({
  selector: 'stottle-send-file-message',
  template: `
    <template #messageFileForm></template>
  `
})
export class SendFileMessageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageFileForm', { read: ViewContainerRef })
  messageFileForm: ViewContainerRef;

  private componentRef: ComponentRef<SendbirdMessageFileFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private vs: SendbirdViewStateService,
    private resolver: SendbirdComponentResolverService<
      SendbirdMessageFileFormComponent
    >,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.messageFileForm,
      SendbirdMessageFileFormComponent
    );

    this.componentRef.instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendFileMessage(message.file))
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
