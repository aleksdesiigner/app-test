import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ContactsService} from '../shared/contacts.service';
import {Observable} from 'rxjs';
import {Contact} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {

  }

}
