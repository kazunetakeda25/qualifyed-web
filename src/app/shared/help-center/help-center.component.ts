import { Component, OnInit } from '@angular/core';
import {UserService } from './../../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.css']
})
export class HelpCenterComponent implements OnInit {
set_help_center:any;
mail_category:any = [];
sub_category:any = [];
question:any = [];
current_ans : any = 0;
  currentId : any = 0;
  serach_result:any
  len_ques:any
  fname:any
  showLoader:any
  filter_len:any
  currentQuestion = 0;
  constructor(private user:UserService) { }

  ngOnInit() {
     localStorage.removeItem('current_stage');
        localStorage.removeItem('incomplete_id');
        localStorage.removeItem('register_id');
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
    if(localStorage.getItem('name') != null){
var fname = localStorage.getItem('name').split(' ')
     this.fname=fname[0]
    }
  
    this.user.post("get_category",{data:'0'}).subscribe(res=>{
     this.mail_category = res;
       if(this.mail_category.length > 0){
         setTimeout(()=>{
           this.expandLi(this.mail_category[0].id, 0);
           setTimeout(()=>{
             this.get_ques(this.mail_category[0].id,this.sub_category[0].id,0);
           },500)
         },100);
       }
     });

}
expandLi(id,i)
  {
    this.sub_category=[]
    i += 1;
    this.user.post("get_category",{data:id}).subscribe(res=>{
      this.sub_category=res
  });
     var classC = document.getElementsByClassName('second_ul');
    for (var d = classC.length - 1; d >= 0; d--) {
      if(classC[d].getAttribute('id') == 'show_list'+i)
      {
        document.getElementById('show_list'+i).classList.toggle('displayNone');
       }else{
       classC[d].classList.add('displayNone');
      }
    }
    setTimeout(()=>{
      var x = document.getElementById('show_list'+i).getAttribute('class');
      var l = x.split(' ').length;
      if(l == 1)
      {
       this.currentId = i; 
      }else{
       this.currentId = 0; 
      }
    },100);
}
get_ques(pid,sub_cat_id,f){
  this.currentQuestion = 0
  this.serach_result=[]
  this.filter_len =1
  this.user.post("get_question",{pid:pid,sub_cat_id:sub_cat_id}).subscribe(res=>{
    this.question=res
    this.len_ques=this.question.length
  var a = document.getElementsByClassName('allLinkSubCat');
  for (var i = a.length - 1; i >= 0; i--) {
    a[i].classList.remove('highlite');
  }
  document.getElementById('highlite_'+f).classList.add('highlite');
  });
  setTimeout(()=>{ 
   this.open_ans(0)
 },1000);
}
open_ans(d){
    console.log('d',d)

  d = d+1;
  var cls = document.getElementsByClassName('anwerP');
  console.log(cls)
  for (var i = cls.length - 1; i >= 0; i--) {
    if(cls[i].getAttribute('id') == "open_ans"+d){

      document.getElementById("open_ans"+d).classList.toggle('displayNone');

    }else{
      cls[i].classList.add('displayNone');
    }
  }
  setTimeout(()=>{ 
        
        var x = document.getElementById('open_ans'+d).getAttribute('class');
        var l = x.split(' ').length;
        if(l == 1)
        {
         this.currentQuestion = d; 
        }else{
         this.currentQuestion = 0; 
        }
      },100);
 }
onEnter(value: string, event){
  console.log("test",value)
  this.currentQuestion = 0
  this.question=[]
if(value ==  undefined || value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }else{
          this.showLoader=true
     this.user.post("get_search_data",{value:value}).subscribe(res=>{
       this.showLoader=false
       console.log(res)
       this.serach_result=res
      this.filter_len= this.serach_result.length
      })
        }
}
}