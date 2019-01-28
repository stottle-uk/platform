import { NgModule } from '@angular/core';
import { NgxSendbirdWrapperModule } from '@stottle-platform/ngx-sendbird-wrapper';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutesModule } from './chat-routes.module';
import { ChatComponent } from './components/chat.component';

@NgModule({
  imports: [SharedModule, NgxSendbirdWrapperModule, ChatRoutesModule],
  declarations: [ChatComponent]
})
export class ChatModule {}
