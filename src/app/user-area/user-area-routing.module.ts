import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeedsComponent } from './feeds/feeds.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserAreaComponent } from './user-area.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'feed',
        component: FeedsComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'post',
        component: NewPostComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }
