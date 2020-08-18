import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact, FbCreateResponse} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ContactsService {

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
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response)
          .map(key =>({
            ...response[key],
            id: key
          }))

      }))
  }

  getById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${environment.fbDbUrl}/contacts/${id}.json`)
      .pipe(map((contact: Contact) => {
        return {
          ...contact, id
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/contacts/${id}.json`)
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.fbDbUrl}/contacts/${contact.id}.json`, contact)
  }

}
