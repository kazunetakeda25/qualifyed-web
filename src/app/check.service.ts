import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as myGlobals from './global';

interface myData {
  userid: any,
  status: boolean,
  data:any

}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CheckService {
    server_name=myGlobals.server_name

constructor(private http: HttpClient) { }

  getData() {
     const url=this.server_name+"api/data"
    return this.http.get<myData>(url)
  }

  isLoggedIn(): Observable<isLoggedIn> {
     const url=this.server_name+"api/isloggedIn"

    return this.http.get<isLoggedIn>(url)
  }

  logout() {
       const url=this.server_name+"api/logout"
    return this.http.get<logoutStatus>(url)
  }
}
