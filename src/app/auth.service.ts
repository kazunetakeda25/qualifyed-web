import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import * as myGlobals from './global';


@Injectable({
  providedIn: 'root'
})
export class AuthService1 {
 api=myGlobals.api_url;  
loginstatus:any

  constructor(private http:HttpClient,private rt:Router) { 
   
  }

  isLoggedIn(){
    let status = false;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        
        if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
          var data = {'user_login_id':localStorage.getItem('id'), 'user_type':localStorage.getItem('token'),'user_name':localStorage.getItem('name')}
          this.http.post(this.api+'/regenerateSession',data,httpOptions).subscribe(res=>{})
          status = true;
        }

       else if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
          status = true;
          var data = {'user_login_id':localStorage.getItem('id'), 'user_type':localStorage.getItem('token'),'user_name':localStorage.getItem('name')}
          this.http.post(this.api+'/regenerateSession',data,httpOptions).subscribe(res=>{})
        }
        else{
          status = false;
        }
        return status;
    }
}

