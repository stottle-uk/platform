import { Component, ViewChild } from '@angular/core';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';

@Component({
  selector: 'stottle-send-bird-fetch-more-messages-btn',
  template: `
    <span stottle-fetch-more-messages>
      stottle-send-bird-fetch-more-messages-btn
    </span>
  `
})
export class SendbirdFetchMoreMessagesBtnComponent {
  @ViewChild(FetchMoreMessagesComponent)
  fetchMoreMessages: FetchMoreMessagesComponent;
}
