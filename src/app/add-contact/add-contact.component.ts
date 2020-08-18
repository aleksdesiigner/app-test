import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../shared/interfaces';
import {ContactsService} from '../shared/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  form: FormGroup;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(new RegExp(`[0-9]{12}`))]),
      address: new FormControl('', null)
    });
  }

  submit() {
     if (this.form.invalid) {
       return
     }

     const contact: Contact = {
       name: this.form.value.name,
       email: this.form.value.email,
       phone: this.form.value.phone,
       address: this.form.value.address
     };

     this.contactsService.create(contact).subscribe(() => {
       this.form.reset()
     })
  }
}
