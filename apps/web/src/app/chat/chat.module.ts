import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutesModule } from './chat-routes.module';
import { ChatComponent } from './components/chat.component';

@NgModule({
  imports: [SharedModule, ChatRoutesModule],
  declarations: [ChatComponent]
})
export class ChatModule {}
