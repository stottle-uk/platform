import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat.component';
import { EditChannelComponent } from './components/edit-channel.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  },
  {
    path: 'edit/:channelUrl',
    component: EditChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutesModule {}
