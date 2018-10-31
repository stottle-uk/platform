import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  auth0WebAuthFactory,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthOptions,
  AuthProviderService,
  AUTH_OPTIONS
} from '@stottle-platform/auth0-rxjs';
import {
  AuthenticationEffects,
  authenticationReducer,
  AuthorizationEffects,
  authorizationReducer,
  AuthState,
  AUTH_FEATURE_KEY,
  ChangePasswordEffects,
  changePasswordReducer,
  CheckSessionEffects,
  checkSessionReducer,
  UserInfoEffects,
  userInfoReducer
} from './+state';
import { CallbackComponent } from './components';
import { NgrxAuth0RoutesModule } from './ngrx-auth0-routes.moduls';
import { AuthGuardService, AuthIntercepterService } from './services';

export const authReducers: ActionReducerMap<AuthState> = {
  authentication: authenticationReducer,
  authorization: authorizationReducer,
  changePassword: changePasswordReducer,
  checkSession: checkSessionReducer,
  userInfo: userInfoReducer
};

export const authEffects = [
  AuthenticationEffects,
  AuthorizationEffects,
  ChangePasswordEffects,
  CheckSessionEffects,
  UserInfoEffects
];

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducers),
    EffectsModule.forFeature(authEffects),
    NgrxAuth0RoutesModule
  ],
  declarations: [CallbackComponent]
})
export class NgrxAuth0Module {
  static forRoot(authOptions: AuthOptions): ModuleWithProviders {
    return {
      ngModule: NgrxAuth0Module,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useFactory: auth0WebAuthFactory(authOptions.options)
        },
        {
          provide: AUTH_OPTIONS,
          useValue: authOptions
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
