import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PERSISTENCE } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAreaComponent } from './user-area/user-area.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ProfileHeaderComponent } from './layout/profile-header/profile-header.component';
import { LoaderComponent } from './layout/loader/loader.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [AppComponent, UserAreaComponent, SidenavComponent, ProfileHeaderComponent, LoaderComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' }],
  bootstrap: [AppComponent],
  exports: [MatIconModule, Ng2SearchPipe]
})
export class AppModule { }
