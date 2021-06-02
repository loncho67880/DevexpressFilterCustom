import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';

import { ClientComponent } from './client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModule } from './profile/profile.module';
import { TeaminformationModule } from './teaminformation/teaminformation.module';
import { ClientSnapshotModule } from './clientsnapshot/clientSnapshot.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RevenueModule } from './revenue/revenue.module';
import { NotesModule } from './notes/notes.module';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ClientRoutingModule,
    NgbModule,
    ProfileModule,
    ClientSnapshotModule,
    RevenueModule,
    TeaminformationModule,
    NotesModule,
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
})
export class ClientModule { }
