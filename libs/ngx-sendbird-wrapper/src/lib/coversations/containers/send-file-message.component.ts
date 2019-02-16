import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendbirdMessageFileFormComponent } from '../../templates/send-bird-message-file-form.component';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Component({
  selector: 'stottle-send-file-message',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class SendFileMessageComponent implements OnDestroy {
  options: GenericOptions<SendbirdMessageFileFormComponent> = {
    component: SendbirdMessageFileFormComponent,
    updateInstance: this.updateInstance.bind(this)
  };

  private destroy$ = new Subject();

  constructor(private vs: ConversationsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendbirdMessageFileFormComponent): void {
    instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendFileMessage(message.file))
      )
      .subscribe();
  }
}
