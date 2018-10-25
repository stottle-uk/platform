import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgrxAuth0Module } from '@stottle-platform-internal/ngrx-auth0';
import { authLogoutOptions, authOptions } from '../environments/environment';
import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { RouterClientModule } from './router-client/router-client.module';
import { UsersModule } from './users/users.module';

const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  FlexLayoutModule
];

const appModules = [RouterClientModule, UsersModule];

const ngrxModules = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ name: 'stottle-web' }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
];

const thirdPatyModules = [
  NgrxAuth0Module.forRoot(authOptions, authLogoutOptions)
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...angularModules,
    ...appModules,
    ...ngrxModules,
    ...thirdPatyModules,
    NxModule.forRoot(),
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
