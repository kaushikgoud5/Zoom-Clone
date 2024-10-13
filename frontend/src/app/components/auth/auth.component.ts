import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
loginReactiveForm:FormGroup;
isLogin:boolean=true;
constructor(private authService:AuthService){}
ngOnInit(){
  this.loginReactiveForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  })
}
SwitchMode(){
  this.isLogin=!this.isLogin;
}
login(form:FormGroup){

}
signUp(form:FormGroup){
  console.log(form);
  const email=form.value['email'];
  const password=form.value['password'];
  const data:User={
    email:email,
    password:password
  }
  // this.authService.
}
onClickLogin(loginReactiveForm:FormGroup){
  this.isLogin?this.login(loginReactiveForm):this.signUp(loginReactiveForm);
}

}
