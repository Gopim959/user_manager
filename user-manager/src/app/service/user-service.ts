import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users: any[] = [];

  constructor() {}

  addUser(user: any) {
    this.users.push(user);
    this.users = this.users.map((obj: any, index: any) => ({
      id: index + 1,
      ...obj
    }));
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
}