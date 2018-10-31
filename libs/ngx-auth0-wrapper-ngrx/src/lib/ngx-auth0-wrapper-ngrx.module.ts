import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { auth0WebAuthFactory, AUTH0_WEB_AUTH, AuthDatesService, AuthOptions, AuthProviderService, AUTH_OPTIONS } from '@stottle-platform/ngx-auth0-wrapper';
import { AuthenticationEffects, authenticationReducer, AuthorizationEffects, authorizationReducer, AuthState, AUTH_FEATURE_KEY, ChangePasswordEffects, changePasswordReducer, CheckSessionEffects, checkSessionReducer, UserInfoEffects, userInfoReducer } from './+state';
import { CallbackComponent } from './components';
import { NgxAuth0WrapperNgrxRoutesModule } from './ngx-auth0-wrapper-ngrx-routes.moduls';
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
    NgxAuth0WrapperNgrxRoutesModule
  ],
  declarations: [CallbackComponent]
})
export class NgxAuth0WrapperNgrxModule {
  static forRoot(authOptions: AuthOptions): ModuleWithProviders {
    return {
      ngModule: NgxAuth0WrapperNgrxModule,
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
