import { Directive, HostListener, Input } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleDeleteOpenChannel]'
})
export class DeleteOpenChannelDirective {
  @Input()
  callback: () => void;

  constructor(private vs: ChannelsViewStateService) {}

  @HostListener('click')
  onClick(): void {
    this.vs
      .deleteOpenChannel()
      .pipe(
        take(1),
        tap(() => !!this.callback && this.callback())
      )
      .subscribe();
  }
}
