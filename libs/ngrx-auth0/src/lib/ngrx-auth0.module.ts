import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  Auth0RxjsRoutesModule,
  auth0WebAuthFactory,
  AUTH0_LOGOUT_OPTIONS,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService,
  CallbackComponent
} from '@stottle-platform/auth0-rxjs';
import { AuthGuardService, AuthIntercepterService } from './services';
import * as fromAuth from './store';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    Auth0RxjsRoutesModule
  ],
  declarations: [CallbackComponent]
})
export class NgrxAuth0Module {
  static forRoot(
    options: auth0.AuthOptions,
    logoutOptions: auth0.LogoutOptions
  ): ModuleWithProviders {
    return {
      ngModule: NgrxAuth0Module,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory(options)
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: logoutOptions
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthIntercepterService,
          multi: true
        },
        AuthDatesService,
        AuthGuardService,
        AuthProviderService
      ]
    };
  }
}
