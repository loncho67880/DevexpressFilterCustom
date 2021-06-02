import { ErrorHandler, Injectable } from '@angular/core';
import { MyApplicationInsights } from './ApplicationInsights';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
    /**
     *
     */
    constructor(private appInsight: MyApplicationInsights) {
      super();
    }

    handleError(error: Error) {
      this.appInsight.logException(error);
    }
}
