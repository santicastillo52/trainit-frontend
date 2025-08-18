import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [
    { path: '', component: UsersListComponent },
    { path: 'edit/:id', component: UsersEditComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UsersListComponent,
        UsersEditComponent,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }