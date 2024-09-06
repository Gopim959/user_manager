import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {UserServiceService} from '../../service/user-service';
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
  users: any[] = [];
  userIndex: any;
  UserServiceService: any;

  constructor(private fb: FormBuilder,
    private router: Router,
   private service:UserServiceService
   
   ) { }

  ngOnInit() {
    this.loadForm();

  }
  loadForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      Image:['',Validators.required],
      gender:'',
      country:'',
      Active:true
     
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const user = {
        name: this.userForm.value.name,
        mobile: this.userForm.value.mobile,
        dob: this.userForm.value.dob,
        email: this.userForm.value.email
      };
      
      this.service.addUser(user);  // Use the service to add the user
      this.router.navigate(['/user-list']);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  validateMobileNumber(event: any) {
    const inputValue = event.target.value;
    const regex = /^[0-9\-\s\(\)]+$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1);
    }
  }
  
}