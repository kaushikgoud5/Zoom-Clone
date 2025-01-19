import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginReactiveForm: FormGroup;
  isLogin: boolean = true;
  constructor(private authService: AuthService, private toastr: ToastrService,private router:Router) { }
  ngOnInit() {
    this.loginReactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      username:new FormControl(null),
    })
  }
  SwitchMode() {
    this.isLogin = !this.isLogin;
  }
  login(form: FormGroup) {
    const email = form.value['email'];
    const password = form.value['password'];
    const data = {
      email: email,
      password: password
    }
    this.authService.login(data).subscribe({
      next:(data)=>{
        console.log(data)
        this.toastr.success(`Welcome to the Yoom , ${data['username']}👋`);
        this.router.navigate(['home/dashboard']);
      },
      error:()=>{
        this.toastr.error("Login Failed");
      }
    })
    form.reset();
  }
  signUp(form: FormGroup) {
    const email = form.value['email'];
    const password = form.value['password'];
    const username = form.value['username'];
    const data = {
      username : username,
      email: email,
      password: password
    }
    this.authService.signUp(data).subscribe({
      next:(res)=>{
        this.toastr.success("Registered Successfully🚀🚀") ;
      },
      error:(err)=>{
        this.toastr.error("Registered Failed");
      },
    });
    form.reset();
  }
  onClickLogin(loginReactiveForm: FormGroup) {
    this.isLogin ? this.login(loginReactiveForm) : this.signUp(loginReactiveForm);
  }

}
