import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import * as myGlobals from './global';



@Injectable({
  providedIn: 'root'
})
export class User1Service {
 data:any
  userapi=myGlobals.userapi_url;
    api=myGlobals.api_url;


  constructor(private http: HttpClient,private rt: Router) { }
   
 



  insertuserInfo(value){
          const url=this.userapi+"/userpersonalinfo"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }
   
    insertuserWork(value){
          const url=this.userapi+"/useraboutwork"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }
   insertuserRef(value){
          const url=this.userapi+"/usercreatepassword"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }

  emailCheck(value){
  console.log("email check"+value)
  const url=this.userapi+"/emailcheck";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}
//edit profile
personalInformation(value){
          const url=this.userapi+"/personalinformation"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }

  education(value){
          const url=this.userapi+"/education"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }
 
 //create_post
 createPost(value){
          const url=this.userapi+"/createPost"
  let httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})}
 return  this.http.post(url,value,httpOptions)
  }

  //
  // details() {
       
  //   this.http.get(this.api+"/name").subscribe(res=>{
  //       console.log("name"+JSON.stringify(res));
        
  //      return res;
  //     });
  // }

//   profileData(){
//   const url=this.api+"/name";
//   return this.http.get(url).map(res=>{
//     this.data=res
//     console.log(this.data)
//     return this.data
//   })
  

// }
 GET(url){
        const URL=this.userapi+"/"+url;
         return this.http.get(URL)
    }


}
