import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Auth0RxjsRoutesModule } from './auth0-rxjs-routes.moduls';
import { CallbackComponent } from './components/callback.component';
import {
  AUTH0_LOGOUT_OPTIONS,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService
} from './services';

export function auth0WebAuthFactory(options: auth0.AuthOptions) {
  const auth = function() {
    return new auth0.WebAuth(options);
  };
  return auth;
}

@NgModule({
  imports: [CommonModule, Auth0RxjsRoutesModule],
  declarations: [CallbackComponent]
})
export class Auth0RxjsModule {
  static forRoot(
    options: auth0.AuthOptions,
    logoutOptions: auth0.LogoutOptions
  ): ModuleWithProviders {
    return {
      ngModule: Auth0RxjsModule,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory(options)
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: logoutOptions
        },
        AuthDatesService,
        AuthProviderService
      ]
    };
  }
}
