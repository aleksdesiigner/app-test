import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../shared/interfaces';
import {ContactsService} from '../shared/contacts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  contacts$: Observable<Contact[]>

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getAll()
  }

}
