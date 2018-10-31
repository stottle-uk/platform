import { ModuleWithProviders, NgModule } from '@angular/core';
import * as auth0 from 'auth0-js';
import { CallbackComponent } from './components/callback.component';
import { AuthOptions } from './models/auth.model';
import { NgxAuth0WrapperRoutesModule } from './ngx-auth0-wrapper-routes.module';
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
  imports: [NgxAuth0WrapperRoutesModule],
  declarations: [CallbackComponent]
})
export class NgxAuth0WrapperModule {
  static forRoot(authOptions: AuthOptions): ModuleWithProviders {
    return {
      ngModule: NgxAuth0WrapperModule,
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
