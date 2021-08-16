import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPayload } from '../models/authentication.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private loginService: LoginService,
    private toastr: ToastrService) { }
  /**
   * Function used to initialise the login form
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  /**
   * Function used to call the login api and on success routing it to dashboard
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const payload: LoginPayload = {
        userName: this.loginForm.controls.username.value.trim(),
        password: this.loginForm.controls.password.value.trim()
      }
      this.loginService.postLoginDetails(payload).subscribe((response) => {
        if (response) {
          sessionStorage.setItem("isAdminLoggedIn", "logged In")
          this.toastr.success("Successfully Logged In", "Success!!", {
            timeOut: 4000, positionClass: 'toast-top-center'
          })
          this.route.navigate(['/mobiles'])
        }
      },
        (error) => {
            this.toastr.error(error, 'Error Message', {
              timeOut: 4000, positionClass: 'toast-top-center'
            })
        }
        )
    }
  }
}
