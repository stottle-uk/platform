import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelsViewStateService } from 'libs/ngx-sendbird-wrapper/src/lib/channels/services/channels-view-state.services';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'stottle-chat',
  template: `
    <div fxLayout="row">
      <div fxFlex="grow">
        <a routerLink="edit">Edit Channel</a>
        <stottle-messages-list></stottle-messages-list>
        <stottle-send-message></stottle-send-message>
        <stottle-send-file-message></stottle-send-file-message>
      </div>

      <div>
        <stottle-channel-participants-list></stottle-channel-participants-list>
        <stottle-receieved-invitations></stottle-receieved-invitations>
        <stottle-users-list></stottle-users-list>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  constructor(
    private vs: ChannelsViewStateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const t = this.activatedRoute.paramMap
      .pipe(
        filter(params => params.has('channelUrl')),
        map(params => ({
          channelUrl: params.get('channelUrl'),
          isOpen: params.get('channelUrl').startsWith('sendbird_open_channel')
        })),
        switchMap(channelParams =>
          channelParams.isOpen
            ? this.getAndEnterOpenChannel(channelParams)
            : this.getAndEnterGroupChannel(channelParams)
        )
      )
      .subscribe();
  }

  private getAndEnterGroupChannel(channelParams: {
    channelUrl: string;
    isOpen: boolean;
  }) {
    return this.vs
      .getGroupChannel(channelParams.channelUrl)
      .pipe(switchMap(channel => this.vs.enterGroupChannel(channel)));
  }

  private getAndEnterOpenChannel(channelParams: {
    channelUrl: string;
    isOpen: boolean;
  }) {
    return this.vs
      .getOpenChannel(channelParams.channelUrl)
      .pipe(switchMap(channel => this.vs.enterOpenChannel(channel)));
  }
}
