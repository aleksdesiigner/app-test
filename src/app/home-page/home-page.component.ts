import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from '../shared/contacts.service';
import {Contact} from '../shared/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
  }



}
