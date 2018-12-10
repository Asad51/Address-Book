import { Component, OnInit, Input, OnChanges } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ContactService } from "../../../core/http";
import { AlertService } from "../../../core/services";

@Component({
  selector: "app-edit-contact",
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.scss"]
})
export class EditContactComponent implements OnInit {
  contact;
  contactId: string;

  editContactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editContactForm = this.fb.group({
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

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contactId = params["id"];
      this.contactService.getContact(this.contactId).subscribe(data => {
        this.contact = data[0];
        this.editContactForm.patchValue({
          name: data[0].name,
          nickName: data[0].nickName,
          email: data[0].email,
          website: data[0].website,
          phones: [""],
          address: {
            city: data[0].address.city,
            district: data[0].address.district,
            zipCode: data[0].address.zipCode
          },
          birthDate: data[0].birthDate,
          imagePath: data[0].imagePath
        });
        for (
          let i = 0;
          i <= (<FormArray>this.editContactForm.get("phones")).length;
          i++
        ) {
          (<FormArray>this.editContactForm.get("phones")).removeAt(i);
        }
        for (let phone of data[0].phones) {
          let control = new FormControl(phone);
          (<FormArray>this.editContactForm.get("phones")).push(control);
        }
      });
    });
  }

  onEditContactFormSubmit() {
    this.contactService
      .updateContact(this.contact._id, this.editContactForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success(data["success"]);
          this.router.navigate(["/contacts"]);
        },
        err => {
          this.alertService.error(err.error["error"]);
        }
      );
  }

  onDeleteContact() {
    this.contactService.deleteContact(this.contact._id).subscribe(
      data => {
        this.alertService.success(data["success"]);
        this.router.navigate(["contacts"]);
      },
      err => {
        this.alertService.error(err.error["error"]);
      }
    );
  }

  onAddPhone() {
    let control = new FormControl("");
    (<FormArray>this.editContactForm.get("phones")).push(control);
  }

  get f() {
    return this.editContactForm.controls;
  }

  get name() {
    return this.editContactForm.get("name");
  }

  get nickName() {
    return this.editContactForm.get("nickName");
  }

  get email() {
    return this.editContactForm.get("email");
  }

  get phones() {
    return this.editContactForm.get("phones");
  }

  get website() {
    return this.editContactForm.get("website");
  }

  get birthDate() {
    return this.editContactForm.get("birthDate");
  }

  get address() {
    return this.editContactForm.get("address");
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
    return this.editContactForm.get("imagePath");
  }
}
