import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { ChannelsViewStateService } from '../../channels/services/channels-view-state.services';
import { ConnectionViewStateService } from '../services/connection-view-state.service';

@Directive({
  selector: '[stottleConnection]'
})
export class ConnectionDirective implements OnInit, OnDestroy {
  @Input()
  userId: string;

  constructor(
    private sb: ConnectionViewStateService,
    private cvs: ChannelsViewStateService
  ) {}

  ngOnInit(): void {
    this.internalConnect(this.userId);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  disconnect(): void {
    this.sb.disconnect().subscribe(console.log, console.error);
  }

  private internalConnect(userId: string) {
    const connect$ = this.sb.connect(userId);

    merge(connect$, this.cvs.setupHandlers()).subscribe(
      console.log,
      console.error
    );
  }
}
