import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required ],
      nickName: [''],
      email: ['', Validators.email ],
      phones: this.fb.array,
      website: [''],
      birthDate: ['']
    });
  }

  onContactFormSubmit(){
    console.log(this.contactForm.value);
  }

  get f(){
    return this.contactForm.controls;
  }

  get name(){
    return this.contactForm.get('name');
  }

  get nickName(){
    return this.contactForm.get('nickName');
  }

  get email(){
    return this.contactForm.get('email');
  }

  get phones(){
    return this.contactForm.get('phones');
  }

  get website(){
    return this.contactForm.get('website');
  }

  get birthDate(){
    return this.contactForm.get('birthDate');
  }

}
