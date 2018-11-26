import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  authorizationQuery,
  AuthState,
  fromAuthenticationActions
} from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';
import { filter, map, switchMap, take } from 'rxjs/operators';

//

@Component({
  selector: 'stottle-platform-root',
  template: `
  
  <stottle-container>
  <button (click)="closeConnection()">close</button>
  </stottle-container>
  
  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  constructor(
    private store: Store<AuthState>,
    private signalrService: SignalrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new fromAuthenticationActions.CheckAuthenticationStatus()
    );

    this.store
      .select(authorizationQuery.selectIsAuthenticated(new Date().getTime()))
      .pipe(
        filter(accessToken => !!accessToken),
        take(1),
        switchMap(accessToken =>
          this.signalrService
            .start('https://localhost:44305/stottlehub/', {
              accessTokenFactory: () => accessToken
            })
            .pipe(switchMap(() => this.signalrService.setupListners()))
        )
      )
      .subscribe(result => console.log(result), error => console.error(error));

    this.signalrService.onClose().pipe(
      switchMap(() =>
        this.signalrService
          .start('https://localhost:44305/stottlehub/', {
            accessTokenFactory: () =>
              this.store
                .select(authorizationQuery.selectAuthorizationData)
                .pipe(map(data => data.accessToken))
                .toPromise()
          })
          .pipe(switchMap(() => this.signalrService.setupListners()))
      )
    );
    // interval(10000)
    //   .pipe(
    //     switchMap(() =>
    //       this.signalrService
    //         .invoke()
    //         .pipe(catchError(error => of(console.error(error))))
    //     )
    //   )
    //   .subscribe(result => console.log(result), error => console.error(error));

    // this.signalrService
    //   .setupListners()
    //   .subscribe(result => console.log(result), error => console.error(error));
  }

  closeConnection(): void {
    this.signalrService.stop(true).subscribe();
  }
}
