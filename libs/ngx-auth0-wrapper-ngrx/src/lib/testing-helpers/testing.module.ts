import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence, NxModule } from '@nrwl/nx';
import {
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthOptions,
  AuthProviderService,
  AUTH_OPTIONS
} from '@stottle-platform/ngx-auth0-wrapper';
import { WebAuth } from 'auth0-js';
import { NgxAuth0WrapperNgrxModule } from '../ngx-auth0-wrapper-ngrx.module';
import { AuthGuardService, AuthIntercepterService } from '../services';

export const authOptions: AuthOptions = {
  logoutOptions: {
    returnTo: 'returnUrl'
  },
  options: {
    clientID: 'clientID',
    domain: 'domain'
  },
  sessionRenewalInterval: 5
};

@NgModule({
  imports: [
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxAuth0WrapperNgrxModule
  ]
})
export class TestingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TestingModule,
      providers: [
        {
          provide: AUTH0_WEB_AUTH,
          useValue: new WebAuth({
            clientID: '',
            domain: ''
          })
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
        AuthProviderService,
        DataPersistence,
        AuthIntercepterService
      ]
    };
  }
}
