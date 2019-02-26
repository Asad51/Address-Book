import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ContactService } from "../../core/http";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit {
  contacts;
  filteredName;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.filteredName = "";
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.showAllContacts().subscribe(
      data => {
        if (data["success"]) {
          this.contacts = null;
        } else {
          this.contacts = data;
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

  onAddClick() {
    this.router.navigate(["contacts/add"], {
      skipLocationChange: true
    });
  }

  onSelectContact(contactId: string) {
    this.router.navigateByUrl(`contacts/${contactId}`, {
      skipLocationChange: true
    });
  }

  onDownloadContacts() {
    this.contactService.downloadContacts().subscribe(
      data => {
        this.downloadFile(data);
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

  downloadFile(data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
