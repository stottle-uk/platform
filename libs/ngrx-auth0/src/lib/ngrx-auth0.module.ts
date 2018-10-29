import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  Auth0RxjsModule,
  auth0WebAuthFactory,
  AUTH0_LOGOUT_OPTIONS,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/auth0-rxjs';
import { authEffects, authReducers, AUTH_FEATURE_KEY } from './+state';
import { AuthGuardService, AuthIntercepterService } from './services';
import { CHANGEPASSWORD_FEATURE_KEY, initialState as changePasswordInitialState, changePasswordReducer } from './+state/change-password.reducer';
import { ChangePasswordEffects } from './+state/change-password.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducers),
    EffectsModule.forFeature([...authEffects]),
    Auth0RxjsModule,
    StoreModule.forFeature(CHANGEPASSWORD_FEATURE_KEY, changePasswordReducer, { initialState: changePasswordInitialState }),
    EffectsModule.forFeature([ChangePasswordEffects])
  ]
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
