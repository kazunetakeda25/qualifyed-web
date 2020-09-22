import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService1 } from '../auth.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
status:any
commin:any
locationRes:any
  constructor(private user: UserService, private router: Router, private auth: AuthService1,private http: HttpClient) { }

  ngOnInit() {
  	this.user.logout().subscribe(data => {
  		
      this.status=data
      // console.log(this.status.status)
      if(this.status.status == true) {
           this.http.get('http://ip-api.com/json').subscribe(res => {
            this.commin = res;
            this.locationRes = {
                ip:this.commin.query,
                id : localStorage.getItem('id')
            }


            this.user.post('/logoutSession', this.locationRes).subscribe(res => {
     /*          localStorage.removeItem('isLoggedIn');
               localStorage.removeItem('token');
               localStorage.removeItem('id');
               localStorage.removeItem('name');*/
               localStorage.clear();
               this.router.navigate([''])
            });
          });
        
       
      } else {
        window.alert('Some problem')
      }
    })
  
  }

}
