import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';
import { SendBirdMessageFormComponent } from '../templates';

@Component({
  selector: 'stottle-update-message',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class UpdateMessageComponent implements OnDestroy {
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
    this.handleSubmit(instance);
    this.setMessage(instance);
  }

  private handleSubmit(instance: SendBirdMessageFormComponent) {
    instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => this.vs.updateMessage(message.id, message.caption))
      )
      .subscribe();
  }

  private setMessage(instance: SendBirdMessageFormComponent) {
    this.vs.currentSelectedMessage$
      .pipe(
        take(1),
        map(currentMessage => currentMessage as SendBird.UserMessage),
        tap(currentMessage => (instance.message = currentMessage))
      )
      .subscribe();
  }
}
