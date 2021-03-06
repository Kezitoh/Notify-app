import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'outbox',
    loadChildren: () => import('./pages/outbox/outbox.module').then(m => m.OutboxPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'restore-password',
    loadChildren: () => import('./pages/restore-password/restore-password.module').then( m => m.RestorePasswordPageModule)
  },
  {
    path: 'notification-modal',
    loadChildren: () => import('./modals/notification-modal/notification-modal.module').then( m => m.NotificationModalPageModule)
  },
  {
    path: 'create-notification',
    loadChildren: () => import('./pages/create-notification/create-notification.module').then( m => m.CreateNotificationPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'password-change',
    loadChildren: () => import('./modals/password-change/password-change.module').then( m => m.PasswordChangePageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user/create-user.module').then( m => m.CreateUserPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'create-group',
    loadChildren: () => import('./pages/create-group/create-group.module').then( m => m.CreateGroupPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'create-type',
    loadChildren: () => import('./pages/create-type/create-type.module').then( m => m.CreateTypePageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'downloads',
    loadChildren: () => import('./pages/downloads/downloads.module').then( m => m.DownloadsPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'notification-tracking-modal',
    loadChildren: () => import('./modals/notification-tracking-modal/notification-tracking-modal.module').then( m => m.NotificationTrackingModalPageModule)
  },
  {
    path: 'notification-admin-modal',
    loadChildren: () => import('./modals/notification-admin-modal/notification-admin-modal.module').then( m => m.NotificationAdminModalPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'types',
    loadChildren: () => import('./pages/types/types.module').then( m => m.TypesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then( m => m.GroupsPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'type-modal',
    loadChildren: () => import('./modals/type-modal/type-modal.module').then( m => m.TypeModalPageModule)
  },
  {
    path: 'group-modal',
    loadChildren: () => import('./modals/group-modal/group-modal.module').then( m => m.GroupModalPageModule)
  },
  {
    path: 'user-modal',
    loadChildren: () => import('./modals/user-modal/user-modal.module').then( m => m.UserModalPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./modals/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'edit-group',
    loadChildren: () => import('./modals/edit-group/edit-group.module').then( m => m.EditGroupPageModule)
  },
  {
    path: 'edit-type',
    loadChildren: () => import('./modals/edit-type/edit-type.module').then( m => m.EditTypePageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
