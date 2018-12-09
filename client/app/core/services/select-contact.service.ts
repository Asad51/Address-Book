import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectContactService {
  contactId: string;
  constructor() { }

  setContactId(contactId: string){
    this.contactId = contactId;
  }

  getContactId(){
    return this.contactId;
  }
}
