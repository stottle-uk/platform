import { Component, ViewChild } from '@angular/core';
import {
  FetchMoreMessagesComponent,
  SendbirdFetchMoreMessagesBtnComponent
} from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-fetch-more-messages-btn',
  template: `
    <button type="button">
      <span stottle-fetch-more-messages>Load More</span>
    </button>
  `
})
export class FetchMoreMessagesBtnComponent
  implements SendbirdFetchMoreMessagesBtnComponent {
  @ViewChild(FetchMoreMessagesComponent)
  fetchMoreMessages: FetchMoreMessagesComponent;
}
