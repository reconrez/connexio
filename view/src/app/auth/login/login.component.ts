import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm : FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  userLogin = ()=>{
    console.log(this.loginForm.value);
    if(this.loginForm.value.username == 'backend login success'){
      console.log("redirecting to dashboard")
    }
  }

  errorMessage = ()=>{
    if(this.loginForm.value.username == 'valid' && this.loginForm.value.password == 'valid'){
      return false
    }else if(this.loginForm.value.username == 'ServiceData'){
      console.log("service")
    }
  }

  validationCheck = ()=>{
    if(this.loginForm.value.username == 'admin' && this.loginForm.value.password == '123'){
      console.log("Login Success")
      this.userLogin()
    }else{
      console.log("Login Failed")
      this.errorMessage()
    }
  }

  ngOnInit(): void {
  }

}
