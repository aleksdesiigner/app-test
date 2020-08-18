import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../interfaces';
import {ContactsService} from '../../contacts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  @Input() contact: Contact

  contacts: Contact[] = []
  deleteSub: Subscription

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }


  remove(id: any) {
    this.deleteSub = this.contactsService.remove(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
    })
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }
}

