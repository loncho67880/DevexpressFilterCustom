import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvantagedClient } from '../models/advantageclient';
import { environment } from '../../../environments/environment';
import { HomeService } from 'src/app/home/services/home.service';
import { FilterHome } from 'src/app/home/models/filterHome';
import { OrderColumns } from 'src/app/home/models/orderColumns';

@Injectable({
  providedIn: 'root'
})
export class PocFilterService {

  cantperPage = 15;
  page = 0;
  listClientsLoaded: number[] = [];
  totalCount = 0;
  filtered = false;
  ordered = false;
  clients$: Observable<AdvantagedClient[]>;

  constructor(private http: HttpClient, private homeService: HomeService) { }

  loadAdvantagedClient(page: number): Observable<AdvantagedClient[]> {
    return this.http.get<AdvantagedClient[]>(`${environment.URL}DeloitteClient/GetAll?startup=${page}&count=${this.cantperPage}`)
            .pipe(map(x => x['items']));
  }

  setPage() {
    this.listClientsLoaded.push(this.page);
    this.page += this.cantperPage;
  }

  resetPage() {
    this.listClientsLoaded = [];
    this.page = 0;
  }

  getPage(): number {
    return this.page;
  }

  isPageLoaded(page: number): boolean {
    return this.listClientsLoaded.find(x => x === page) === undefined;
  }

  loadClients(loadOptions: any): Promise<any> {
    const isloaded = this.isPageLoaded(this.getPage());
    const filterHome: FilterHome[] = [];
    let orderColumns: OrderColumns;
    if (loadOptions.filter) {
      if (loadOptions.filter.filterValue) {
        if (!this.filtered) {
          this.resetPage();
        }
        loadOptions.filter.forEach(filters => {
          const filter = new FilterHome(filters[0], filters.filterValue);
          filterHome.push(filter);
        });
      }
    } else {
      if (this.filtered) {
        this.resetPage();
      }
      this.filtered = false;
    }
    if (loadOptions.sort && loadOptions.sort.length > 0) {
      if (!this.ordered) {
        this.resetPage();
      }
      orderColumns = new OrderColumns(loadOptions.sort[0].selector, false, loadOptions.sort[0].desc ? 'DESC' : 'ASC');
      this.ordered = true;
    } else {
      this.ordered = false;
    }
    this.clientObservable(filterHome, orderColumns);
    if (isloaded && this.getPage() > 0 && this.listClientsLoaded.length <= (this.numPages() + 1)) {
      return this.clients$
        .toPromise()
        .then((data: any) => {
          this.setPage();
          this.totalCount = data.totalCount;
          return {
            data: data.items,
            totalCount: data.totalCount
          };
        })
        .catch(error => { throw new Error('Data Loading Error' + JSON.stringify(error)); });
    } else {
      return this.clients$
        .toPromise()
        .then((data: any) => {
          this.setPage();
          this.totalCount = data.totalCount;
          return {
            data: data.items,
            totalCount: data.totalCount
          };
        })
        .catch(error => { throw new Error('Data Loading Error' + JSON.stringify(error)); });
    }
  }

  numPages() {
    return this.totalCount / this.cantperPage;
  }

  clientObservable(filterHome: FilterHome[], orderColumns: OrderColumns) {
    if (filterHome) {
      this.filtered = true;
      this.clients$ = this.homeService.loadFilterAdvantagedClient(this.getPage(), filterHome, orderColumns);
    } else {
      this.clients$ = this.homeService.loadAdvantagedClient(this.getPage(), orderColumns);
    }
  }
}
