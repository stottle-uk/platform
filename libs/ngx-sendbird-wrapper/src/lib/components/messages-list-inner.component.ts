import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    dsfsdf
    <pre>{{ messages | json }}</pre>
  `,
  styles: []
})
export class MessagesListInnerComponent implements OnInit {
  @Input() messages: SendBird.UserMessage[];
  constructor() {}

  ngOnInit() {}
}
