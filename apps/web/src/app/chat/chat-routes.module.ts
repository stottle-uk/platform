import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRouteComponent } from './components/chat-route.component';
import { ChatComponent } from './components/chat.component';
import { EditChannelComponent } from './components/edit-channel.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatRouteComponent,
    children: [
      {
        path: '',
        component: ChatComponent
      },
      {
        path: ':channelUrl',
        component: ChatComponent
      },
      {
        path: ':channelUrl/edit',
        component: EditChannelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutesModule {}
