import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendBirdMessageFormComponent } from '../../templates/send-bird-message-form.component';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Component({
  selector: 'stottle-send-message',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class SendMessageComponent implements OnDestroy {
  options: GenericOptions<SendBirdMessageFormComponent> = {
    component: SendBirdMessageFormComponent,
    updateInstance: this.updateInstance.bind(this)
  };

  private destroy$ = new Subject();

  constructor(private vs: ConversationsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendBirdMessageFormComponent): void {
    instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.sendMessage(message.caption))
      )
      .subscribe();
  }
}