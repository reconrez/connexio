import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  loginForm : FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  userLogin = ()=>{
    console.log(`Login Values ${JSON.stringify(this.loginForm.value)}`);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
    if(this.loginForm.value.username){
      console.log("redirecting to dashboard")
    }
  }

  checkAuthentication() {
    if (localStorage.getItem('access_token')) {
      console.log("Navigate to home page")
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.checkAuthentication()
  }

}
