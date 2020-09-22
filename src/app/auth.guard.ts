import { Injectable } from '@angular/core';
import { AuthService1 } from './auth.service';
import { AuthSessionService } from './auth-session.service';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

common : any;
constructor(private router : Router,private auth:AuthService1,private authSession:AuthSessionService){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

	if (!this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
    
    this.authSession.isLoggedIn().subscribe(res => {
    	this.common = res;
    	if(this.common.status == false)
    	{
			localStorage.clear();
			this.router.navigate(['']);
			return false;
    	}
    })
    return true;
  }
}


