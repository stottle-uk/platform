import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgrxAuth0Module } from '@stottle-platform-internal/ngrx-auth0';
import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { RouterClientModule } from './router-client/router-client.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterClientModule,
    HttpClientModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ name: 'stottle-web' }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    NgrxAuth0Module.forRoot(
      {
        clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
        domain: 'stottle.eu.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile email',
        audience: 'https://stottle-auth0-ngrx-api/'
      },
      {
        returnTo: 'http://localhost:4200'
      }
    ),
    UsersModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
