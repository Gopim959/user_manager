import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  isUpdating: boolean = false;
  userIndex: any;
  searchText: any;
  forSearch: any;
  page: any = 1;
  filteredusers: any;
 

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private modalService: NgbModal,
    // private toast: ToastrService,
  
    ) {}

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = this.users;
    this.page = localStorage.getItem("page") ? localStorage.getItem("page") : 1;
    localStorage.removeItem("page");
  
   
  }

  addUser() {
    localStorage.removeItem("editData")
    this.router.navigate(['add-user']);
    
  }
  editData(editData: any) {
   
    localStorage.setItem("page", this.page)
    localStorage.setItem("editData", JSON.stringify(editData))
    this.router.navigate(['add-user']);
  }

  DeleteAlert(index: number) {
    Swal.fire({
      title: "Do you want to delete it?",
      text: "Delete users",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.deleteData(index);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  deleteData(index: number) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (index >= 0 && index < users.length) {
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
      this.users = users;
     
      Swal.fire(
        'Deleted!',
        'The users has been deleted.',
        'success'
      );
    } else {
      Swal.fire(
        'Error!',
        'The  users could not be found.',
        'error'
      );
    }
  }

  updateData() {
    if (this.isUpdating && this.userIndex !== null) {
      const updatedusers = this.users[this.userIndex];
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users[this.userIndex] = updatedusers;  // Replace with updated users data
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem(users);
      this.isUpdating = false;
      this.userIndex = null;
      this.router.navigate(['user-list']);
    }
  }
  viewData(user: any) {
    
    const viewuser = this.modalService.open(UserInfoComponent, {
      size: "lg",
      centered: true,
      // backdrop: "static"
    });
    viewuser.componentInstance.Viewusers = user;
  }

  searchList() {
    if (this.searchText) {
      this.forSearch = this.users.filter((item: any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
      return this.users.filter((item: any) => item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
      
    } else {
      this.users = this.users.sort((a, b) => a.name.localeCompare(b.name));
      return this.users
    }  
  }
 

}
