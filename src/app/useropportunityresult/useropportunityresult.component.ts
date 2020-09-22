import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import $ from 'jquery';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators } from '@angular/forms';
import * as myGlobals from '../global';
import {UserService} from '../user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-useropportunityresult',
  templateUrl: './useropportunityresult.component.html',
  styleUrls: ['./useropportunityresult.component.css']
})
export class UseropportunityresultComponent implements OnInit {
data:any
oppdata:any
	oppurtunityForm : any;
  result:any
  server_name=myGlobals.server_name
  constructor(private fb:FormBuilder,private http: HttpClient,private user:UserService,private rt:Router,private route:ActivatedRoute ) {
  	
   }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
/*this.data=localStorage.getItem('data')
this.result=JSON.parse(this.data)

console.log(this.result)*/
this.oppurtunityForm=this.fb.group({
  opportunity:[''],
  location:['']
})

  }

	onSubmit(){
	}
}
