import { Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UserListComponent } from './component/user-list/user-list.component';

export const routes: Routes = [
    {path:'',component:AddUserComponent},
    {
        path:'user-list',component:UserListComponent
    },
    {
        path:'add-user',component:AddUserComponent
    }
    
];
