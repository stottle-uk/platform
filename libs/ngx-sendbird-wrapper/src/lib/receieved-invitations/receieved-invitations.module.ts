import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ReceievedInvitationsInnerComponent } from './components/receieved-invitations-inner.component';
import { ReceievedInvitationsComponent } from './containers/receieved-invitations.component';

const declarations = [ReceievedInvitationsComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, ReceievedInvitationsInnerComponent],
  exports: [declarations]
})
export class ReceievedInvitationsModule {}
