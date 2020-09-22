import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router,CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as myGlobals from './global';
import * as io from 'socket.io-client';

@Injectable()/*({
  providedIn: 'root'
})*/
export class SocketGuard implements CanActivate {
	socket : any;
	api_url_ = myGlobals.api_url_;
	url = this.api_url_;
constructor(private router : Router,private user:UserService){
	this.socket = io(this.url);

}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
	//console.log(this.socket.disconnect());
	return true;
}
  
}
