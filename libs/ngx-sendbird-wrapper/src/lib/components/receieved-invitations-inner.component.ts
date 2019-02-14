import {
  AfterViewInit,
  ChangeDetectorRef,
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
  `,
  styles: []
})
export class ReceievedInvitationsInnerComponent
  implements AfterViewInit, OnDestroy {
  @Input()
  invitations: SendBird.GroupChannel[];

  @ViewChildren('invitationsListItem', { read: ViewContainerRef })
  invitationsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('invitationsList', { read: ViewContainerRef })
  invitationsList: QueryList<ViewContainerRef>;

  private get invitationsListItemRefs(): ViewContainerRef[] {
    return this.invitationsListItems.toArray();
  }

  private componentRefs: ComponentRef<
    SendBirdReceievedInvitationsItemComponent
  >[];
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.invitationsList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => this.updateInvitationsList(change)),
        tap(() => this.cdr.detectChanges())
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

  private updateInvitationsList(changes: any[]): void {
    changes.forEach((ref: ViewContainerRef, index: number) => {
      const cmpRef = this.resolver.createComponent(
        this.invitationsListItemRefs[index],
        SendBirdReceievedInvitationsItemComponent
      );
      cmpRef.instance.invitation = this.invitations[index];
      this.componentRefs.push(cmpRef);
    });
  }
}
