import { Component, OnInit } from '@angular/core';
import { LoginService } from 'client/app/core/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: Boolean = false;
  constructor( private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      data => {
        if (data === "true") {
          this.isLoggedIn = true;

        } else {
          this.isLoggedIn = false;
        }
        console.log("Data in data page " + data);
      },
      err => {
        this.isLoggedIn = false;
        console.log("Data in error page " + err);
      }
    );
  }

}
