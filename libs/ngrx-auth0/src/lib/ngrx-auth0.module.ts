import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  Auth0RxjsModule,
  auth0WebAuthFactory,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthOptions,
  AuthProviderService,
  AUTH_OPTIONS
} from '@stottle-platform/auth0-rxjs';
import { authEffects, authReducers, AUTH_FEATURE_KEY } from './+state';
import { CallbackComponent } from './components';
import { NgrxAuth0RoutesModule } from './ngrx-auth0-routes.moduls';
import { AuthGuardService, AuthIntercepterService } from './services';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducers),
    EffectsModule.forFeature(authEffects),
    NgrxAuth0RoutesModule,
    Auth0RxjsModule
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
