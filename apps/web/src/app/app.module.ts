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
import { NgxSendbirdWrapperModule } from '@stottle-platform/ngx-sendbird-wrapper';
import { NgxSignalrWrapperNgrxModule } from '@stottle-platform/ngx-signalr-wrapper-ngrx';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryContactsService } from 'libs/manage-contacts/src/lib/services/in-memerory-contacts.service'; // TODO: SORT OUT THIS
import { ChannelListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/channel-list-item.component';
import { ChannelParticipantsListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/channel-participants-list-item.component';
import { CreateChannelFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/create-channel-form.component';
import { FetchMoreMessagesBtnComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/fetch-more-messages-btn.component';
import { MessageFileFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/message-file-form.component';
import { MessageFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/message-form.component';
import { MessagesListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/messages-list-item.component';
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
  HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsService, {
    delay: 500,
    passThruUnknownUrl: true
  }),
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
  NgxSignalrWrapperNgrxModule.forRoot(),
  NgxSendbirdWrapperModule.forRoot({
    appId: 'DE368CF8-F364-498C-A481-554B90C33D4A',
    declarations: [
      MessageFormComponent,
      MessageFileFormComponent,
      MessagesListItemComponent,
      FetchMoreMessagesBtnComponent,
      CreateChannelFormComponent,
      ChannelListItemComponent,
      ChannelParticipantsListItemComponent
    ]
  }),
  NxModule.forRoot()
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    angularModules,
    appModules,
    ngrxModules,
    thirdPatyModules,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
