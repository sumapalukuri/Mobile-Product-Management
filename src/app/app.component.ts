import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mobiles';
  loggedInUser: boolean = false;

  constructor(
    public router: Router
  ){}

  ngOnInit(): void {
    this.loggedInUser = sessionStorage.getItem("isAdminLoggedIn") === "logged In" ? true: false;
  }
}
