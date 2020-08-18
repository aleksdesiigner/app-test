import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Contact} from '../shared/interfaces';
import {ContactsService} from '../shared/contacts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  contacts$: Observable<Contact[]>
  contacts: Contact[]
  contactSub: Subscription

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getAll();

    this.contactSub = this.contactService.getAll().subscribe(contacts => {
      this.contacts = contacts
    })
  }

  ngOnDestroy() {
    if (this.contactSub) {
      this.contactSub.unsubscribe()
    }
  }

}
