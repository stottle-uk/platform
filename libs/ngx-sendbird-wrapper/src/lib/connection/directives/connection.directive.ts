import { Directive, Input } from '@angular/core';
import { ConnectionViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';
import { merge } from 'rxjs';

@Directive({
  selector: '[stottleConnection]'
})
export class ConnectionDirective {
  @Input()
  userId: string;

  constructor(private sb: ConnectionViewStateService) {}

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

    merge(connect$).subscribe(console.log, console.error);
  }
}
