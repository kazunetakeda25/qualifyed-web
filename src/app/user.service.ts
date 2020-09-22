import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as myGlobals from './global';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   api=myGlobals.api_url;
api_url_ = myGlobals.api_url_;
url = this.api_url_;
      userapi=myGlobals.userapi_url;
edit:any
id:any
data:any
data1:any
data2:any
data3:any
data6:any
data4:any
data5:any
data7:any
result:any
chat:any
opportunity:any
opportunitydata:any
masterhour:any
myhours:any
show:any
allnotificationcount:any
data12:any
set_data={}
opp_Data:any;
private  socket;    
  constructor(private http:HttpClient,private rt:Router) {
this.socket = io(this.url);
   }



bussinessRegistration(value){
  const url=this.api+"/bussinessprofileinsertion";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}

  getLoginDetails(value) {
    // post these details to API server return user info if correct
    const url=this.api+"/login"
    let httpOption={headers: new HttpHeaders({'Content-Type':'application/json'})}
    return this.http.post(url,value,httpOption)
  }
  generateSendOtp(value)
  {
    //console.log(value);
    const url=this.api+"/generateSendOtp"
    let httpOption={headers: new HttpHeaders({'Content-Type':'application/json'})}
      return this.http.post(url,{email : value},httpOption).map(res => {
        return res;
      });
  }

emailCheck(value){
  // //console.log("email check"+value)
  const url=this.api+"/emailcheck";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}

emailCheck1(value){
  // //console.log("email check1"+value)

  const url=this.api+"/emailcheck1";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}


logout() {
       const url=this.api+"/logout"
    return this.http.get(url)
  }

forgotMail(value){
  // //console.log("email check"+value)
  const url=this.api+"/forgotmail";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}


resetPassword(value){
 const url=this.api+"/resetpassword";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions).map(res=>{
     //console.log(res)
     this.id=res
     // //console.log("service id is"+this.id[0].id)
     return this.id;

    
     
   })
}

resetPassword1(value){
 const url=this.api+"/resetpassword1";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}

verifyEmail(value){
   const url=this.api+"/verifymail";

  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(url,value,httpOptions)
}

profileData(value){
  const url=this.api+"/name";
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

  return this.http.post(url,value,httpOptions).map(res=>{
    this.data=res
    return this.data
  })
  

}

// myworkinghours(){
//   const url=this.api+"/myworkinghours";
//   return this.http.get(url).map(res=>{
//     this.myhours=res;
//     return this.myhours;
//   })
// }

editData(value){
 
  const url=this.api+"/name";
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

  return this.http.post(url,value,httpOptions).map(res=>{
    this.data1=res
  return this.data1

  })
  


}



educationData(id){
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
  const url=this.api+"/educationdata";
  return this.http.post(url,{userid:id},httpOptions).map(res=>{
    this.data6=res
    // //console.log(this.data)
    return this.data6
  })


}
getdata(i, loginId, type)
{
  const url=this.api+"/getUserBusinessDataId";
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

  return this.http.post(url, {loginId : loginId, i : i, type : type},httpOptions).map(res=>{
    this.data2=res
    return this.data2
  })
}
 experienceData(id){
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
  const url=this.api+"/experiencedata";
  return this.http.post(url,{userid:id},httpOptions).map(res=>{
    this.data3=res
    return this.data3
  }) }

 
  workdayData(){
  const url=this.api+"/workdaydata";
  return this.http.get(url).map(res=>{
    this.data7=res
    return this.data7
  }) }

   skillsData(id){
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
  const url=this.api+"/skills";
  return this.http.post(url,{userid:id},httpOptions).map(res=>{
    this.data5=res
    return this.data5
  }) }


 workData(){
  const url=this.api+"/workdata";
  return this.http.get(url).map(res=>{
    this.data4=res
    return this.data4
  }) }
showpostData(value){
  const url=this.api+"/showpost";
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

  return this.http.post(url, value,httpOptions).map(res=>{
    this.data2=res
    return this.data2
  })
  

}
showpostData1(value){
  const url=this.api+"/showpost1";
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

  return this.http.post(url, value,httpOptions).map(res=>{
    this.data12=res
  //console.log("in in induid",this.data12)
    return this.data12
  })
  

}

  Post(value){
 const url=this.api+"/post";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
  }

userOpportinity(value){
 
  //console.log(value)

  const url=this.api+"/opportunity/useropportunity";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)

}


resendOtp(value){
    const url=this.api+"/resendotpcheck";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

resendOtp1(value){
    const url=this.api+"/resendotp";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

savedOpportunity(value){
  


  const url=this.api+"/opportunity/saveopportunity";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

unsavedOpportunity(value){
  
//console.log(value)

  const url=this.api+"/opportunity/unsaveopportunity";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

getsaveopp(){

  const url=this.api+"/opportunity/getsavedopportunity";
 return this.http.get(url)
}

sendRequest(value){
  
//console.log(value)

  const url=this.api+"/opportunity/sendrequest";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

getappliedopp(){

  const url=this.api+"/opportunity/getappliedopportunity";
 return this.http.get(url)
}

getinterviewRequest(value){
   const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
  const url=this.api+"/opportunity/getinterviewrequest";
 return this.http.post(url,value,httpOptions)
}

acceptinterviewRequest(value){
  
//console.log(value)

  const url=this.api+"/opportunity/acceptinterviewreq";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

/*acceptinterviewRequest1(value){
  
//console.log(value)

  const url=this.api+"/opportunity/acceptinterviewreq1";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}*/

DeclineinterviewRequest(value){
    const url=this.api+"/opportunity/declineinterviewreq";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

RescheduleinterviewRequest(value){
  //console.log(value)
    const url=this.api+"/opportunity/rescheduleinterviewreq";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

notificationSeen(value){
   //console.log(value)
    const url=this.api+"/notification/seennotification";
 const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
 return this.http.post(url,value,httpOptions)
}

allnotificationCount(){
    const url=this.api+"/notification/allnotificationCount";
 return this.http.get(url).map(res=>{
   if(res != null)
   {
     this.allnotificationcount=res[0].allnotification_count;
     return this.allnotificationcount;
   }else{
     return Array
   }
 })
}
  connectionData(limit){
     const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
  return this.http.post(this.api+'/getconnections',{limit:limit},httpOptions).map(res=>{
      this.result=res
    return this.result
  })
    }

    ShowConnection(limit){
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
     return this.http.post(this.api+'/showconnections',{limit:limit},httpOptions).map(res=>{
          this.result=res
         return this.result
      })
    }
getMoreComment(limit){
  //console.log("limikt jd",limit)
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
     return this.http.post(this.api+'/getCommentAll',{limit:limit},httpOptions).map(res=>{
          this.result=res
         return this.result
      })
    }

    Profieviewinsert(value){
         const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
     return this.http.post(this.api+'/profileviewinsert',{userloginid:value},httpOptions)
    }


    
    
    GET(url){
        const URL=this.api+"/"+url;
         return this.http.get(URL)
    }

   

    post(url,value){
         const URL=this.api+"/"+url;
         const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
         return this.http.post(URL,value,httpOptions)
    }


    fileExists(file)
    {
     const URL=this.api+"/checkFileExists";
     const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
     return this.http.post(URL,{url : file},httpOptions)
    }
     fileExists1(file,i)
    {
     const URL=this.api+"/checkFileExists1";
     const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
     return this.http.post(URL,{url : file,i:i},httpOptions)
    }


      deactivate(){
        this.socket.disconnect();
      }
      
      activate(){}
      sendMessage(message) {this.socket.emit('sendchat', message); }

   public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('updatechat', (username,data, media, sender) => {
              this.chat={id:username,message:data, media : media, sender : sender}
                observer.next(this.chat);
            });
        });
    }

         joinRoom(room) {

         this.socket.emit('adduser', room);
         this.socket.on('check',function(username,data){

         })
         
         this.socket.on('updatechat', function (username,data) {
           this.chat={
             message_from:username,
             message:data
           }


           localStorage.setItem('message',JSON.stringify(this.chat))
         
           });
    }
send_data(id){
  this.set_data['id']=id
  this.set_data['status']='true'
}
/*editOpportunity(id){
     const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   return this.http.post(this.api+'/getopportunitydata',{id:id},httpOptions).map(res=>{
      this.opp_Data=res
      localStorage.setItem('opp',JSON.stringify(this.opp_Data))
      console.log(this.opp_Data)
    return this.opp_Data
    
  })
}*/
} 