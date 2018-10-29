import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Auth0RxjsRoutesModule } from './auth0-rxjs-routes.moduls';
import { CallbackComponent } from './components/callback.component';
import { AuthOptions } from './models/auth.model';
import {
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService,
  AUTH_OPTIONS
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
  static forRoot(authOptions: AuthOptions): ModuleWithProviders {
    return {
      ngModule: Auth0RxjsModule,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory(authOptions.options)
        },
        {
          provide: AUTH_OPTIONS,
          useValue: authOptions.logoutOptions
        },
        AuthDatesService,
        AuthProviderService
      ]
    };
  }
}
