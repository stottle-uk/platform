import { Component } from '@angular/core';
import { SendbirdFetchMoreMessagesBtnComponent } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-fetch-more-messages-btn',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <button type="button" mat-icon-button stottleFetchMoreMessages>
        <mat-icon aria-label="Edit Channel">
          more
        </mat-icon>
      </button>
    </div>
  `
})
export class FetchMoreMessagesBtnComponent
  implements SendbirdFetchMoreMessagesBtnComponent {}
