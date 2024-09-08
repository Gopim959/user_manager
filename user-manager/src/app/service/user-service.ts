import { Injectable } from '@angular/core';
import { UserListComponent } from '../component/user-list/user-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor() {}

  // Get all users
  getUsers() {
    return this.users; 
  }

  getUserList(){
    return UserListComponent

  }
  
  getUserInfo(){

  }
  DeleteUser(){

  }
  

}