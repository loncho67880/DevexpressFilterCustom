import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyApplicationInsights {

  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true
      }
    });

    this.appInsights.loadAppInsights();
  }

  logPageView(title: any) {
    this.appInsights.trackPageView(title);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({exception, severityLevel});
  }

  getApplicationInsight() {
    return this.appInsights;
  }
}
