import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../core/http';
import { AlertService, SelectContactService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';

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
    private selectContactService: SelectContactService,
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
      },
      (err)=>{
        this.alertService.error(err.error['error']);
      }
    )
  }

  onSelectContact(contactId: string){
    this.selectContactService.setContactId(contactId);
    this.router.navigateByUrl('/contacts/edit', {skipLocationChange: true}).then(()=>
    this.router.navigateByUrl('/contacts/edit'));
  }

}
