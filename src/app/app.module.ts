import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterComponent } from './footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyApplicationInsights } from './shared/applicationInsights/ApplicationInsights';
import { ErrorHandlerService } from './shared/applicationInsights/ErrorHandlerService';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HeaderModule,
    HomeModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
      { path: 'client/:id', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
      { path: 'contactus', loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule)},
      { path: 'filter', loadChildren: () => import('./pocFilter/pocFilter.module').then(m => m.PocFilterModule) }
    ], { relativeLinkResolution: 'legacy', useHash: true }),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    NgbModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [MyApplicationInsights,
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.URL + 'TextResource/GetAll?filterBy=lang&filterValue=', '.json');
}

platformBrowserDynamic().bootstrapModule(AppModule);
