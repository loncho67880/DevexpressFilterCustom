import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { MyApplicationInsights } from './applicationInsights/ApplicationInsights';
@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    LoadingComponent
  ],
  providers: [MyApplicationInsights]
})
export class SharedModule { }
