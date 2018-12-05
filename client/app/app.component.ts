import { Component, OnInit } from '@angular/core';
import { LoginService } from './core/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Address-Book';
  constructor(private loginService: LoginService) {
    
  }
  ngOnInit(){
    this.loginService.checkLogin();
  }
}
