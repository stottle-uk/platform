import { Directive, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleEditCurrentChannelLink]'
})
export class EditCurrentChannelLinkDirective {
  @Input()
  location: string;

  constructor(
    private vs: ChannelsViewStateService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  @HostListener('click')
  channelSelected(): void {
    this.vs.currentChannel$
      .pipe(
        take(1),
        tap(channel =>
          this.route.navigate([this.location, channel.url], {
            relativeTo: this.activatedRoute
          })
        )
      )
      .subscribe();
  }
}
