import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgxAuth0WrapperNgrxModule } from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { NgxSignalrWrapperModule } from '@stottle-platform/ngx-signalr-wrapper';
import { authOptions, environment } from '../environments/environment';
import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RouterClientModule } from './router-client/router-client.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production
  })
];

const appModules = [
  SharedModule,
  LayoutModule,
  RouterClientModule,
  UsersModule
];

const ngrxModules = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ name: 'stottle-web' }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
];

const thirdPatyModules = [
  NgxAuth0WrapperNgrxModule.forRoot(authOptions),
  NgxSignalrWrapperModule,
  NxModule.forRoot()
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...angularModules,
    ...appModules,
    ...ngrxModules,
    ...thirdPatyModules,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
