import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {
  constructor(private user: UserService) { }

  isLoggedIn(){
    let status = true;
   		const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

		var data = {
			id : localStorage.getItem('id'),
			ip : localStorage.getItem('ip')
		}

        return this.user.post('checkSession',data).map(res => {
        	return res;
        });

    }

}
