import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ContactsService} from '../shared/contacts.service';
import {switchMap} from 'rxjs/operators';
import {Contact} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  contact: Contact;
  submitted = false;
  updateSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.contactsService.getById(params[`id`]);
    })).subscribe((contact: Contact) => {
      this.contact = contact;
      this.form = new FormGroup({
        name: new FormControl(contact.name, Validators.required),
        email: new FormControl(contact.email, Validators.required),
        phone: new FormControl(contact.phone, Validators.required),
        address: new FormControl(contact.address, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    this.updateSub = this.contactsService.update( {
      ...this.contact,
      id: this.contact.id,
      name: this.contact.name,
      email: this.contact.email,
      phone: this.contact.phone,
      address: this.contact.address
    }).subscribe(() => {
      this.submitted = false
    })

  }
}
