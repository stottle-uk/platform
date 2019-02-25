import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ReceievedInvitationsInnerComponent } from './components/receieved-invitations-inner.component';
import { ReceievedInvitationsComponent } from './containers/receieved-invitations.component';
import { SendBirdReceievedInvitationsItemComponent } from './templates';

const entryComponents = [SendBirdReceievedInvitationsItemComponent];

const declarations = [ReceievedInvitationsComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [
    declarations,
    entryComponents,
    ReceievedInvitationsInnerComponent
  ],
  entryComponents: [entryComponents],
  exports: [declarations]
})
export class ReceievedInvitationsModule {}
