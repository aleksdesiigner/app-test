import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact, FbCreateResponse} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ContactsService {

  contact$: Observable<Contact>;

  constructor(private http: HttpClient) {
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.fbDbUrl}/contacts.json`, contact)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...contact,
          id: response.name
        }
      }))
  }

  getAll(): Observable<Contact[]> {
    return this.http.get(`${environment.fbDbUrl}/contacts.json`)
      .pipe(map((response: {[key: string]:any}) => {
        return Object.keys(response)
          .map(key =>({
            ...response[key],
            id: key
          }))

      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/contacts/${id}.json`)
  }

}
