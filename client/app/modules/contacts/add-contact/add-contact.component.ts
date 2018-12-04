import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators'

import { ContactService } from '../../../core/http';
import { AlertService } from '../../../core/services';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor( private fb: FormBuilder, private contactService: ContactService, private alertService: AlertService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required ],
      nickName: [''],
      email: ['', Validators.email ],
      phones: this.fb.array([]),
      website: [''],
      birthDate: [''],
      address: this.fb.group({
        village: [''],
        district: ['']
      })
    });
  }

  onContactFormSubmit(){
    this.contactService.addContact(this.contactForm.value)
    .pipe(first())
    .subscribe(
      (data)=>{
          this.alertService.success(data['success']);
        
        console.log(data)
      },
      (err)=>{
        this.alertService.error(err.error);
        console.log(err)
      }
    );
  }

  onAddPhone(){
    let control = new FormControl('');
    (<FormArray>this.contactForm.get('phones')).push(control);
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

  get address(){
    return this.contactForm.get('address');
  }

  get village(){
    return this.address.get('village');
  }

  get district(){
    return this.address.get('district');
  }

}
