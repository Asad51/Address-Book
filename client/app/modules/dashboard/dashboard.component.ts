import { Component, OnInit } from "@angular/core";
import { UserService, LoginService } from "../../core/http";
import { AlertService } from "../../core/services";
import { User } from "../../shared/models";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  profile: User;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginService.checkLogin();
    this.profileForm = this.formBuilder.group({
          name: this.formBuilder.control({value: "", disabled: true}),
          userName: this.formBuilder.control({value: "", disabled: true}),
          email: this.formBuilder.control({value: "", disabled: true})
        });
  }

  ngOnInit() {
    this.userService.showProfile().subscribe(
      (data) => {
        this.profileForm.setValue({
          name: data['name'],
          userName: data['userName'] ,
          email: data['email']
        });
      },
      err => {
        if(err.error['error']){
          this.router.navigate(["login"]);
        }
      }
    );
  }

  onEditProfile(){
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onChangePassword(){
    this.router.navigate(['change-password'], {relativeTo: this.activatedRoute});
  }

  onDeleteProfile(){
    this.userService.deleteProfile().subscribe(
      (data)=>{
        this.alertService.success(data['success']);
        this.loginService.checkLogin();
        setTimeout(() => {
          this.router.navigate(["login"]);
        }, 2000);
      },
      (err)=>{
        this.alertService.error(err.error['error']);
        setTimeout(() => {
          this.router.navigate(["login"]);
        }, 2000);
      }
    )
  }

  get name(){
    return this.profileForm.get('name');
  }
}
