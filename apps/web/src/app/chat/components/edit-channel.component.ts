import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'stottle-edit-channel',
  template: `
    <button stottleDeleteOpenChannel>Delete Channel</button>
    <stottle-edit-current-channel></stottle-edit-current-channel>
  `
})
export class EditChannelComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
