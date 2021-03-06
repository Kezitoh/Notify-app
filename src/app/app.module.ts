import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FilterComponent } from './components/filter/filter.component';
import { TypesPage } from './pages/types/types.page';
import { UsersPage } from './pages/users/users.page';
import { GroupsPage } from './pages/groups/groups.page';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { IonicSelectableModule } from "ionic-selectable";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, IonicStorageModule.forRoot(), IonicSelectableModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage, FileTransfer, File, FileChooser, FilePath, PreviewAnyFile, AndroidPermissions, FilterComponent, TypesPage, UsersPage, GroupsPage, NotificationsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
