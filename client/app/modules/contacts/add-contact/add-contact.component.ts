import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

import { ContactService } from "../../../core/http";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      nickName: [""],
      email: ["", Validators.email],
      phones: this.fb.array([]),
      website: [""],
      birthDate: [""],
      address: this.fb.group({
        city: [""],
        district: [""],
        zipCode: [""]
      }),
      imagePath: [""]
    });
  }

  onContactFormSubmit() {
    this.contactService
      .addContact(this.contactForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success(data["success"]);
          this.getAllContacts();
          this.router.navigate(["/contacts"]);
        },
        err => {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      );
  }

  getAllContacts() {
    this.contactService.showAllContacts().subscribe(
      data => {
        if (data["success"]) {
          this.contactService.contacts = null;
        } else {
          this.contactService.contacts = data;
        }
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong."
        );
        if (err.error["notLoggedIn"]) {
          localStorage.removeItem("x-auth");
          this.router.navigate(["login"]);
        }
      }
    );
  }

  onAddPhone() {
    let control = new FormControl("");
    (<FormArray>this.contactForm.get("phones")).push(control);
  }

  get f() {
    return this.contactForm.controls;
  }

  get name() {
    return this.contactForm.get("name");
  }

  get nickName() {
    return this.contactForm.get("nickName");
  }

  get email() {
    return this.contactForm.get("email");
  }

  get phones() {
    return this.contactForm.get("phones");
  }

  get website() {
    return this.contactForm.get("website");
  }

  get birthDate() {
    return this.contactForm.get("birthDate");
  }

  get address() {
    return this.contactForm.get("address");
  }

  get city() {
    return this.address.get("city");
  }

  get district() {
    return this.address.get("district");
  }

  get zipCode() {
    return this.address.get("zipCode");
  }

  get imagePath() {
    return this.contactForm.get("imagePath");
  }
}
