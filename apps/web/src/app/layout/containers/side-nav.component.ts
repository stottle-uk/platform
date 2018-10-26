import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'stottle-side-nav',
  template: `
  <stottle-side-nav-inner
    (itemSelected)="itemSelected.emit()"
  ></stottle-side-nav-inner>
  `,
  styles: []
})
export class SideNavComponent {
  @Output() itemSelected = new EventEmitter();
}
