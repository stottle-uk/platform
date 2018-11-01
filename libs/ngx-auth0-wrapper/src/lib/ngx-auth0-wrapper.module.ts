import { ModuleWithProviders, NgModule } from '@angular/core';
import * as auth0 from 'auth0-js';
import { CallbackComponent } from './components/callback.component';
import { AuthOptions } from './models/auth.model';
import { NgxAuth0WrapperRoutesModule } from './ngx-auth0-wrapper-routes.module';
import {
  AUTH0_WEB_AUTH,
  AUTH0_WEB_AUTH_OPTIONS,
  AuthDatesService,
  AuthProviderService,
  AUTH_OPTIONS
} from './services';

export function auth0WebAuthFactory(options: auth0.AuthOptions) {
  return new auth0.WebAuth(options);
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
          provide: AUTH_OPTIONS,
          useValue: authOptions
        },
        {
          provide: AUTH0_WEB_AUTH_OPTIONS,
          useValue: authOptions.options
        },
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory,
          deps: [AUTH0_WEB_AUTH_OPTIONS]
        },
        AuthDatesService,
        AuthProviderService
      ]
    };
  }
}
