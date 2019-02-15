import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendBirdReceievedInvitationsItemComponent } from '../templates/send-bird-receieved-invitations-item.component';

@Component({
  selector: 'stottle-receieved-invitations-inner',
  template: `
    <div class="receieved-invitations-container">
      <ng-container
        #invitationsList
        *ngFor="let invitation of invitations; trackBy: trackByFn"
      >
        <template #invitationsListItem></template>
      </ng-container>
    </div>
  `
})
export class ReceievedInvitationsInnerComponent
  implements AfterViewInit, OnDestroy {
  @Input()
  invitations: SendBird.GroupChannel[];

  @ViewChildren('invitationsListItem', { read: ViewContainerRef })
  invitationsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('invitationsList', { read: ViewContainerRef })
  invitationsList: QueryList<ViewContainerRef>;

  private destroy$ = new Subject();
  private componentRefs: ComponentRef<
    SendBirdReceievedInvitationsItemComponent
  >[];

  constructor(
    private resolver: SendbirdComponentResolverService<
      SendBirdReceievedInvitationsItemComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.resolver
      .trackChanges(
        SendBirdReceievedInvitationsItemComponent,
        this.invitationsList,
        this.invitationsListItems,
        this.updateInstance.bind(this)
      )
      .pipe(
        takeUntil(this.destroy$),
        tap(refs => (this.componentRefs = refs))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRefs.forEach(ref => ref.destroy());
  }

  trackByFn(index: number, item: SendBird.OpenChannel): string {
    return item ? item.url : index.toString();
  }

  private updateInstance(
    instance: SendBirdReceievedInvitationsItemComponent,
    index: number
  ): void {
    instance.invitation = this.invitations[index];
  }
}
