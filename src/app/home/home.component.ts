import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Home } from './models/Home';
import { Portfolio } from './models/portfolio';
import * as fromStore from './store/home.reducer';
import * as fromActions from './store/home.actions';
import * as fromSelector from './store/home.selectors';
import { FiscalYear } from './models/fiscalyear';
import { Indicators } from './models/indicators';
import { HomeService } from './services/home.service';
import { SearchColumns } from './models/searchColumns';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  homeInfo$: Observable<Home>;
  portfolio$: Observable<Portfolio[]>;
  fiscalyear$: Observable<FiscalYear[]>;
  indicators$: Observable<Indicators>;
  loading$: Observable<boolean>;
  columntooltip: string;
  dataSource: CustomStore;
  searchColumns$: Observable<SearchColumns[]>;
  searchColumns: SearchColumns[] = [];

  constructor(private store: Store<fromStore.HomeState>, homeService: HomeService
    , private fb: FormBuilder, private translate: TranslateService) {
    // Create form search
    this.store.dispatch(fromActions.requestLoadHomeInfo());
    this.store.dispatch(fromActions.requestLoadHomePortfolioInfo());
    this.store.dispatch(fromActions.requestLoadHomeFiscalYearInfo());
    this.store.dispatch(fromActions.requestLoadHomeIndicatorsInfo());
    this.store.dispatch(fromActions.requestLoadHomeColumnsFilter());
    this.store.dispatch(fromActions.requestLoadDistinctColumns());
    this.homeInfo$ = this.store.select(fromSelector.HomeInfo);
    this.portfolio$ = this.store.select(fromSelector.portfolioInfo);
    this.fiscalyear$ = this.store.select(fromSelector.fiscalyearInfo);
    this.indicators$ = this.store.select(fromSelector.indicatorInfo);
    this.loading$ = this.store.select(fromSelector.isLoading);
    this.dataSource = new CustomStore({
      key: 'id',
      load: function (loadOptions: any) {
        return homeService.loadClients(loadOptions);
      }
    });
    this.searchColumns$ = this.store.select(fromSelector.searchColumnsGet);
    this.searchColumns$.subscribe(data => {
      if (data) {
        // Add columns
        data.forEach(column => {
          this.translate.get(column.tableName).subscribe(text => {
            const columnSearch = { ...column };
            columnSearch.tableName = text;
            this.searchColumns.push(columnSearch);
          });
        });
      }
    });
  }

  clickFilter(column: string) {
    this.columntooltip = column;
  }

  isColumnTooltip(column: string) {
    return this.columntooltip === column;
  }
}
