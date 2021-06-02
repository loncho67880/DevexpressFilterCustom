import { ChangeDetectionStrategy, Component} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { HomeService } from '../home/services/home.service';

@Component({
  selector: 'app-poc-filter',
  templateUrl: './pocFilter.component.html',
  styleUrls: ['./pocFilter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocFilterComponent {
  dataSource: CustomStore;

  constructor(homeService: HomeService) {
    this.dataSource = new CustomStore({
      key: 'id',
      load: function (loadOptions: any) {
        return homeService.loadClients(loadOptions);
      }
    });
  }
}
