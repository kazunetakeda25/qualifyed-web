import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
