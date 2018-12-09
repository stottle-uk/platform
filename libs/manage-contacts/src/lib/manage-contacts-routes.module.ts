import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts.component';
import { ContactEditComponent } from './containers/contact-edit.component';
import { ContactsListComponent } from './containers/contacts-list.component';

export const routes: Routes = [
  {
    path: 'manage-contacts',
    component: ContactsComponent,
    children: [
      {
        path: '',
        component: ContactsListComponent
      },
      {
        path: ':id',
        component: ContactEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageContactsRoutesModule {}
