import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,FontAwesomeModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  [x: string]: any;
  userForm!: FormGroup;
  isUpdating = false;
  users: any[] = [];
  userIndex: any;
  editData: any = localStorage.getItem("editData");
  edit_user: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private route: ActivatedRoute,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.edit_user = JSON.parse(this.editData);
    this.loadForm();
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    if (this.edit_user) {
      this.isUpdating = true;
      this.edit_Data(); // Prefill the form with existing data
    }
  }

  loadForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
     Image:'',
     gender:'male',
     country:'',
     active:true

    });
  }

  edit_Data() {
    this.userForm.patchValue({
     name:this.edit_user.name,
     mobile:this.edit_user.mobile,
     email:this.edit_user.email,
     dob:this.edit_user.dob,
     Image:this.edit_user.Image,
     gender:this.edit_user.gender,
     country:this.edit_user.country,
     active:this.edit_user.active
      
    });
   
   
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.toastr.success("Data Added successfully");
      if (this.isUpdating) {
        this.updateData();
      }
      else {
        var obj: any =
        {
          name: this.userForm.value.name,
          mobile: this.userForm.value.mobile,
          dob: this.userForm.value.dob,
          age: this.userForm.value.age,
          designation: this.userForm.value.designation,
          email: this.userForm.value.email,
          description: this.userForm.value.description
        }
        this.users.push(obj);
        this.users = this.users.map((obj: any, index: any) => ({
          id: index + 1,
          ...obj
        }));
        localStorage.setItem('users', JSON.stringify(this.users));
        // Navigate back to the user list
        this.router.navigate(['/user-list']);
      }
    } else {
      this.userForm.markAllAsTouched();
      this.toastr.error("Required all fields")
    }
  }

  updateData() {
    if (this.isUpdating && this.userIndex !== null) {
      // Check if the form is valid
      if (this.userForm.valid) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex((emp: { id: any; }) => emp.id === this.edit_user.id);

        if (index !== -1) {
          // Get updated data from the form
          const updatedUser = {
            id: this.edit_user.id,
            ...this.userForm.value
          };
          // Update the user data in the array
          users[index] = updatedUser;
          // Save the updated users list back to local storage
          localStorage.setItem('users', JSON.stringify(users));
          this.isUpdating = false;
          this.userIndex = null;
          this.toastr.success('user data updated successfully');
          this.router.navigate(['/user-list']);
        } else {
          this.toastr.error('user not found for update');
        }
      } else {
        this.userForm.markAllAsTouched();
        this.toastr.error('All fields are required and must be valid');
      }
    }
  }

  back() {
    localStorage.removeItem("editData")
    this.router.navigate(['/user-list']);
  }
 

  validateMobileNumber(event: any) {
    const inputValue = event.target.value;
    const regex = /^[0-9\-\s\(\)]+$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1);
    }
  }
 
  
}