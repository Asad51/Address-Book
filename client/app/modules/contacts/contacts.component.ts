import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ContactService } from "../../core/http";
import { AlertService } from "../../core/services";

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
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredName = "";
    this.contactService.showAllContacts().subscribe(
      data => {
        if (data["success"]) {
          this.contacts = null;
        } else {
          this.contacts = data;
        }
      },
      err => {
        if (err.error["error"]) {
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
        if (err.error["error"]) {
          this.alertService.error(err.error["error"]);
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
