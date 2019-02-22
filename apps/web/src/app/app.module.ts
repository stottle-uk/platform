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
import {
  Contact,
  InMemoryContactsService
} from '@stottle-platform/manage-contacts';
import { NgxAuth0WrapperNgrxModule } from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { NgxSignalrWrapperNgrxModule } from '@stottle-platform/ngx-signalr-wrapper-ngrx';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {
  EntityMetadata,
  EntityMetadataMap,
  NgrxDataModule,
  NgrxDataModuleConfig
} from 'ngrx-data';
import { authOptions, environment } from '../environments/environment';
import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RouterClientModule } from './router-client/router-client.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

const contactMetaData: Partial<EntityMetadata<Contact>> = {
  selectId: contact => contact.id,
  sortComparer: (a, b) => (a > b ? -1 : 1)
};

const entityMetadata: EntityMetadataMap = {
  Contact: contactMetaData
};

export const entityConfig: NgrxDataModuleConfig = {
  entityMetadata
};

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
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  NgrxDataModule.forRoot(entityConfig)
];

const thirdPatyModules = [
  NgxAuth0WrapperNgrxModule.forRoot(authOptions),
  NgxSignalrWrapperNgrxModule.forRoot(),
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
