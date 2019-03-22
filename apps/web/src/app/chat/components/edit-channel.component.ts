import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stottle-edit-channel',
  template: `
    <p>
      edit-channel works!
    </p>

    <stottle-edit-current-channel></stottle-edit-current-channel>
  `,
  styles: []
})
export class EditChannelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
