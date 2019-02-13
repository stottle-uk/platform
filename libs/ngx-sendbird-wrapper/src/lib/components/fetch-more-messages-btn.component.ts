import { Component, ViewChild } from '@angular/core';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';

@Component({
  selector: 'stottle-fetch-more-messages-btn',
  template: `
    <button type="button">
      <span stottle-fetch-more-messages>Load More</span>
    </button>
  `,
  styles: []
})
export class FetchMoreMessagesBtnComponent {
  @ViewChild(FetchMoreMessagesComponent)
  fetchMoreMessages: FetchMoreMessagesComponent;
}
