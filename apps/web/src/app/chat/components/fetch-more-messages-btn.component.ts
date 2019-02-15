import { Component } from '@angular/core';
import { SendbirdFetchMoreMessagesBtnComponent } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-fetch-more-messages-btn',
  template: `
    <button type="button">
      <span stottleFetchMoreMessages>Load More</span>
    </button>
  `
})
export class FetchMoreMessagesBtnComponent
  implements SendbirdFetchMoreMessagesBtnComponent {}
