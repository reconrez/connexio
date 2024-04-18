import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // For making API calls (if applicable)
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    this.checkAuthentication()
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const repassword = formGroup.get('repassword').value;
    console.log(password, repassword)

    if (password !== repassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  sayHello(){
    console.log("hello")
  }

  checkAuthentication() {
    if (localStorage.getItem('access_token')) {
      console.log("Navigate to home page")
      this.router.navigate(['/home']);
    }
  }


  signUp(){

      if (this.registerForm.invalid) {
        console.log("invalid form")
      }
  
      // Replace with your actual API call if applicable
      console.log(this.registerForm.value); // For development purposes

      this.authService.register(this.registerForm.value)

      // Example API call (modify based on your backend)
      // this.http.post('/api/register', this.registerForm.value)
      //   .subscribe(response => {
      //     // Handle successful registration response
      //   }, error => {
      //     // Handle registration errors
      //   });
  }

 
}
