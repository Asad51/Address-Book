import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts = [
    {
      name: "Asad",
      nickName: "asad",
      birthDate: "31-01-1996"
    },
    {
      name: "Shuvo",
      nickName: "shuvo",
      birthDate: "12-02-1996"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
