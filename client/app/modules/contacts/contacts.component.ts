import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactService } from '../../core/http';
import { AlertService } from '../../core/services';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts;

  constructor( 
    private contactService: ContactService, 
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.contactService.showAllContacts().subscribe(
      (data)=>{
        if(data['success']){
          this.contacts = null;
        }
        else{
          this.contacts = data;
        }
        console.log(this.contacts)
      },
      (err)=>{
        this.alertService.error(err.error['error']);
      }
    )
  }

  onSelectContact(contactId: string){
    this.router.navigate([`${contactId}`], {relativeTo: this.activatedRoute})
  }

  onDownloadContacts(){
    this.contactService.downloadContacts().subscribe(
      (data)=>{
        this.downloadFile(data);
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }

  downloadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
