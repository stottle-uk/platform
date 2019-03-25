import { Directive, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleDeleteOpenChannel]'
})
export class DeleteOpenChannelDirective {
  constructor(private vs: ChannelsViewStateService) {}

  @HostListener('click')
  onClick(): void {
    this.vs
      .deleteOpenChannel()
      .pipe(take(1))
      .subscribe();
  }
}
