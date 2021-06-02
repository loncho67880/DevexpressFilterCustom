import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './store/revenue.actions';
import * as fromStore from './store/revenue.reducer';
import * as fromSelector from './store/revenue.selectors';
import { ClientRevenue } from './models/clientRevenue';
import { ClientFee } from './models/clientFee';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueComponent {
  clientRevenue$: Observable<ClientRevenue>;
  clientFee$: Observable<ClientFee[]>;
  id: string;
  todayDate: Date;
  fYActual: string;
  fYPrevious: string;
  fYPreviousPrevious: string;

  constructor(private route: ActivatedRoute, private store: Store<fromStore.RevenueState>,
    private translateService: TranslateService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.requestLoadClientRevenueInfo({id: this.id}));
      this.clientRevenue$ = this.store.select(fromSelector.clientRevenueInfo);

      this.store.dispatch(fromActions.requestLoadClientFeeInfo({id: this.id}));
      this.clientFee$ = this.store.select(fromSelector.clientFeeInfo);
      this.todayDate = new Date();
      this.translateService.get('client.fY21').subscribe(text => {
        this.fYActual = (text as string).replace('XX', this.calculateYear(0).toString());
      });
      this.translateService.get('client.fY20').subscribe(text => {
        this.fYPrevious = (text as string).replace('XX', this.calculateYear(1).toString());
      });
      this.translateService.get('client.fY19').subscribe(text => {
        this.fYPreviousPrevious = (text as string).replace('XX', this.calculateYear(2).toString());
      });
    });
  }

  calculateYear(substractYear: number): number {
    if (substractYear > 0) {
      return this.todayDate.getFullYear() - substractYear;
    } else {
      return this.todayDate.getFullYear();
    }
  }
}
