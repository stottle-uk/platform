import { Component } from '@angular/core';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';

@Component({
  selector: 'stottle-fetch-more-messages-btn',
  template: `
    stottle-fetch-more-messages-btn
  `
})
export class SendbirdFetchMoreMessagesBtnComponent {
  fetchMoreMessages: FetchMoreMessagesComponent;
}
