import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserAreaRoutingModule } from './user-area-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { SettingComponent } from './setting/setting.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    FeedsComponent,
    SettingComponent,
    NewPostComponent,
    ContactUsComponent,
    AboutComponent,
    HomeComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  exports: [MatIconModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class UserAreaModule { }
