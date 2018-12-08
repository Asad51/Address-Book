import { Component, OnInit } from '@angular/core';

import { Contact } from '../../shared/models';
import { ContactService } from '../../core/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts;

  constructor( private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.showAllContacts().subscribe(
      (data)=>{
        if(!data){
          this.contacts = null;
        }
        else{
          this.contacts = data;
        }
        console.log(this.contacts);
      },
      (err)=>{
        console.log(err.error['error']);
      }
    )
  }

}
