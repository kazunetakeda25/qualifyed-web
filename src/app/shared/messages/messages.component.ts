import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {UserService} from './../../user.service'
import * as myGlobals from './../../global';
import Swal from 'sweetalert2';
import $ from 'jquery';
import RTCMultiConnection from 'rtcmulticonnection'
import * as io from 'socket.io-client';
import {NgxImageCompressService} from 'ngx-image-compress';
import {DOC_ORIENTATION} from 'ngx-image-compress/lib/image-compress';
import {connect} from 'twilio-video';
import * as moment from 'moment-timezone';

// import  {  NgxEmojModule  }  from  'ngx-emoj';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
     list: any = []; server_name = myGlobals.server_name; showLoader = false; api_url_ = myGlobals.api_url_; newChat : any = []; showPermission = false; api = myGlobals.api_url; showVideo = false; name: any; room: any; status = false; sendSection = true; checkId: any; connection: any; tab1 = true; permissionboxMsg : any = ""; showButton : any = false; cc_id: any = 0; tab2 = false; chat: any; showAttach = true; myid = localStorage.getItem('id'); image: any; message: string; messages: string[] = []; url = this.api_url_; files: any = []; data: any; id: any; common: any; messageForm: any; set_value: any; current_id: any; searchData: any = []; private socket; check:any;
    common_res : any ;
    user_name:any
    callAcceptedStatus = false;
    activeRoom : any;
    acceptStatus = false;
    text:  string  =  '';
    media_url = myGlobals.media_url;
    constructor(private http: HttpClient, private fb: FormBuilder, private rt: Router, private user: UserService, private imageCompress: NgxImageCompressService) {
        this.id = localStorage.getItem('chatId')
        this.socket = io('https://careerqualifyed.com', {transports: ['polling']});
    }
    imgResultBeforeCompress: string;
    imgResultAfterCompress: string;
list_len:any

    ngOnInit() {

        // this.user.get('getToken').subscribe(res=>{
        //     console.log(res);
        // });


        
 
        



        this.set_value = this.user.set_data;
        if (this.set_value.id != undefined && this.set_value.id != '') {

            this.current_id = this.set_value.id
            if (this.current_id != undefined) {
                this.checkRoom(this.current_id)
            }
        }

        this.user.send_data('');
        this.getList()

        this.id = localStorage.getItem('chatId');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");



        this.messageForm = this.fb.group({
            message: [''],
            file: ['']
        })


        this.user.post("view_profile/getblock",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.check = res[0]
        })

        // USERCHAT LIST START
        // setInterval(function() {

            if (this.tab2 == true) {
                var user_lists = document.getElementById('user_lists');
                var user_list_button = document.getElementById('user_list_button');
                var user_listing_close = document.getElementById('user_lists_close');
                // console.log(user_list_button);
                user_list_button.onclick = function(event) {
                    user_lists.style.display = "block";
                }

                user_listing_close.onclick = function(event) {
                    user_lists.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == user_lists) {
                        user_lists.style.display = "none";
                    }
                }


                // VIDEO CHAT SCREEN
                var video_chat_button = document.getElementById('start_videochat');
                var video_chat_window = document.getElementById('video_window');
                var video_chat_cancel = document.getElementById('video_chat_cancel');

                video_chat_button.onclick = function(event) {
                    video_chat_window.style.display = "block";
                    document.body.classList.add('hide_overflow');
                }

                video_chat_cancel.onclick = function(event) {
                    video_chat_window.style.display = "none";
                    document.body.classList.remove('hide_overflow');
                }
                // VIDEO CHAT SCREEN

            }
        // }, 300)




        var id = 1


        var xyz = localStorage.getItem("message_id");
        if (xyz != null) {

            this.checkRoom(xyz)
            localStorage.removeItem('message_id')

        } else {
            this.user.post("messagelist",{userid:localStorage.getItem('id')}).subscribe(res => {
             this.list = res
             this.list_len=this.list.length
             if(this.list != null){
                 
                this.checkRoom(this.list[0].user_login_id)
             }
            })
        }

        this.user
            .getMessages()
            .subscribe((data: any) => {
                if (data.message == 'GETTING_CALL_REQ' && this.id != data.id) {
                    this.status = true;
                    this.checkId = data.id;
                    this.videoCallReq();
                    
                } else if (data.message == "ACEEPTED_CALL") {
                        this.callAcceptedStatus = true;
                        this.status = false;
                        this.acceptStatus = true;
                } else if (data.message == "REJECT_CALL") {
                    this.rejectAction();
                } else {
                    this.chatCheckerSetting(localStorage.getItem('chatId'));
                    this.markRead(this.id, this.room);
                    setTimeout(()=>{
                        this.common = {};
                        this.common.media = data.media;
                        this.common.message_from = data.id;
                        this.common.message_to = 0;
                        this.common.room = 0;
                        this.common.status = 1;
                        this.common.created_date = new Date();
                        this.common.type = 0;
                        console.log(this.common);
                        if (typeof data.media === "number") {
                            this.user.post('getmedia', {
                                id: this.common.media
                            }).subscribe(res => {
                                var newRes: any = res
                                if (newRes.length > 0) {
                                    this.common.media = 'https://asset.careerqualifyed.com/uploads/chatAttachments/' + res[0].name;
                                    this.common.type = res[0].file_type;
                                }
                                this.files = [];
                            });
                        } else if (this.common.media != '' && this.common.media != null && this.common.media != undefined) {
                            this.common.type = 1;
                        } else {
                            this.common.type = 0;
                        }
                        this.common.created_date = new Date();
                        this.common.message = data.message;
                        if ((data.sender == localStorage.getItem('id') && data.id == localStorage.getItem('chatId')) || (data.sender == localStorage.getItem('chatId') && data.id == localStorage.getItem('id'))) {
                            this.chat.push(this.common);
                        }
                        console.log(this.chat);
                        this.chatAssembler();
                        this.getList();
                        this.scrollFunction();
                    },100)
                }

            });
    }

    markRead(id, room_id) {
        this.user.post('markChatReadWhere', {
            id: id,
            room_id: room_id
        }).subscribe(res => {
            for (var i = 0; i < this.list.length; ++i) {
                if (this.list[i].user_login_id == id) {
                    this.list[i].count = 0;
                }
            }
        });
    }

    videoCallReq()
    {
        var video_chat_window = document.getElementById('video_window');
        video_chat_window.style.display = "block";
        document.body.classList.add('hide_overflow');
    }
    handleEmoji(e)  {
        this.messageForm.value.message +=  e.char;
        $('#message_type_textarea').val($('#message_type_textarea').val() + e.char);
        return false;
    }
     
    handleCharDelete(e)  {
        if (this.text.length >  0) {
            this.text =  this.text.substr(0,  this.text.length -  2);
        }
    }

    checkRoom(id) {
        if (this.check != undefined) {
            if (id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked this person for Messaging  ",
                    type: "warning"
                });
                return
            } else if (id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.chatCheckerSetting(id);

        // this.sendSection = false;    

        var check = 0;
        for (var i = 0; i < this.list.length; ++i) {
            if (this.list[i].user_login_id == id) {
                check += 1;
            }
        }

        if (check == 0) {
            for (var i = 0; i < this.searchData.length; ++i) {
                if (this.searchData[i].user_login_id == id) {
                    this.list.push(this.searchData[i]);
                }
            }
        }


        this.chat = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.cc_id = 0;
        this.http.post(this.api_url_ + 'insert', {
            chat_id: id
        }, httpOptions).subscribe(res => {
            // console.log(res);
            this.common = res;

           
            localStorage.setItem('chatId', id);
            this.room = res[0].room
            this.user.joinRoom(this.room)
            this.tab1 = false;
            this.tab2 = true;
            this.id = localStorage.getItem('chatId')
            this.cc_id = localStorage.getItem('chatId');
            this.user.post("fetchchat", {
                room_id: this.room
            }).subscribe(res => {
                // console.log(res)
                this.chat = res;
                // for (var i = 0; i < this.chat.length; ++i) {
                //     this.chat[i].created_date=moment(this.chat[i].created_date).format('LLL')
                // }
                this.markRead(id, this.room);
                this.chatAssembler();
            })
       this.user.post("get_user_name",{id:id}).subscribe(res=>{
           
           this.user_name=res[0].name
       })
        });

        this.searchData = [];
        this.scrollFunction();

    }

    chatAssembler(){
        
        var old_date = 0;
        var finalAray : any = [];
        console.log('dev msg',this.chat)

        for (var i = 0; i < this.chat.length; ++i) {
            var date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
            if(old_date == 0)
            {
                var date12 = new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();
                old_date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
                
                if(date12 == old_date)
                {
                    finalAray.push({created_date : "Today" , id : '', cust : 1});
                }else if(date12 == (old_date+1))
                {
                    finalAray.push({created_date : "Yesterday" , id : '', cust : 1});
                }else{
                    finalAray.push({created_date : this.chat[i].created_date , id : '',cust : 0});
                }
               
            }else{
                if(date != old_date)
                {
                    var date12 = new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();

                    old_date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
                    if(date12 == old_date)
                    {
                        finalAray.push({created_date : "Today" , id : '', cust : 1});
                    }else if(date12 == (old_date+1))
                    {
                        finalAray.push({created_date : "Yesterday" , id : '', cust : 1});
                    }else{
                        finalAray.push({created_date : this.chat[i].created_date , id : '',cust : 0});
                    }
                    
                }
            }



            // if(this.chat[i].media == '' || this.chat[i].media == undefined || this.chat[i].media == null)
            // {


                if (this.chat[i].base64 == '' && this.chat[i].media_id != ''  && this.chat[i].media_id != 0) {
                    // this.chat[i].type = 0;
                    // this.chat[i].media = 0;

                    // this.user.post('getmedia', {
                    //     id: this.chat[i].media_id,
                    //     i: i
                    // }).subscribe(res => {
                    //     this.common = res;
                    //     if (this.common.length > 0) {
                            this.chat[i].media = this.media_url + '/uploads/chatAttachments/' + this.chat[i].media;
                            // this.chat[res[0].i].type = res[0].file_type;
                            // finalAray.push(this.chat[i]);
                    //     }
                    // });

                } else if((this.chat[i].media_id == '' || this.chat[i].media_id == 0) && (this.chat[i].base64 == '' || this.chat[i].base64 == null || this.chat[i].base64 == undefined)){
                    this.chat[i].type = 0;
                    // finalAray.push(this.chat[i]);
                }else{
                    this.chat[i].media = this.chat[i].base64
                    this.chat[i].type = 1;
                    
                    // console.log(i,"SARA");
                    
                }
            // }else{
            //     finalAray.push(this.chat[i]);
            // }
            finalAray.push(this.chat[i]);
        }
        // console.log(finalAray)
        this.newChat = finalAray;
        this.scrollFunction();

    }

    userListOpener(){
        var user_lists = document.getElementById('user_lists');
        // user_lists.style.display = "block !important";
         document.getElementById("user_lists").setAttribute("style", "display:block !important"); 
        console.log("hi---",user_lists)
        var user_listing_close = document.getElementById('user_lists_close');
        user_listing_close.onclick = function(event) {
                user_lists.style.display = "none";
            }

        window.onclick = function(event) {
            if (event.target == user_lists) {
                user_lists.style.display = "none";
            }
        }
    }

    closeList()
    {
        var user_lists = document.getElementById('user_lists');
        user_lists.style.display = "none";
    }

    getList() {
        this.user.post("messagelist",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.list = res;

            if (this.list != null) {
                for (var i = 0; i < this.list.length; ++i) {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    }
                    this.http.post(this.api_url_ + 'insert', {
                        chat_id: this.list[i].user_login_id,
                        i: i
                    }, httpOptions).subscribe(res => {
                        this.common = res;
                        var room = res[0].room;
                        
                        this.user.post('getchatRoom', {
                            roomid: room,
                            i: res[0].i
                        }).subscribe(res => {
                            var c : any;
                            c = res;
                            if (c.length > 0) {
                                this.list[res[0].i].count = res[0].unread_count;
                                this.list[res[0].i].message = res[0].message;
                                var date = new Date().getFullYear()+new Date().getMonth()+new Date().getDate();
                                var date1 = new Date(res[0].created_date).getFullYear()+new Date(res[0].created_date).getMonth()+new Date(res[0].created_date).getDate();
                                if(date == date1)
                                {
                                    this.list[res[0].i].time = res[0].created_date;
                                    this.list[res[0].i].timeType = 0;
                                }
                                else if(date == (date1+1))
                                {
                                    this.list[res[0].i].time = "Yesterday";
                                    this.list[res[0].i].timeType = 1;
                                }
                                else
                                {
                                    this.list[res[0].i].time = res[0].created_date;
                                    this.list[res[0].i].timeType = 2;
                                }
                            }
                        });

                        this.user.joinRoom(room);
                        
                    })
                }
            }
        })
    }

    Message(event) {
        if(event != undefined)
        {
            if(event.key != 'Enter')
            {
                return false;
            }
        }
        
        $('#message_type_textarea1').focus();
        document.getElementById('toolbox1').classList.add('displayNone');

        this.messageForm.value.message = $('#message_type_textarea1').val();
        var msg = this.messageForm.value.message;
        

        if ((msg == '' || msg == null) && this.files.length == 0 && (this.imgResultAfterCompress == undefined || this.imgResultAfterCompress == '')) {
            return false;
        }

        if (msg == '' || msg == null || msg == undefined) {
            msg = 'Media';
        }

        if (this.files != '') {
            const formData: any = new FormData();
            const files: Array < File > = this.files;
            formData.append("uploads[]", files[0], files[0]['name']);


            this.http.post(this.api + '/postAttach', formData).subscribe(res => {
                this.common = res;
                this.user.sendMessage({
                    msg: msg,
                    sender : localStorage.getItem('id'),
                    media: this.common.insertId,
                    id: localStorage.getItem('chatId'),
                    room: this.room
                });
            })
            this.files = [];
            this.imgResultBeforeCompress = '';
        } else if (this.imgResultAfterCompress != '') {
            this.user.sendMessage({
                msg: this.messageForm.value.message,
                id: localStorage.getItem('chatId'),
                    sender : localStorage.getItem('id'),

                media: this.imgResultAfterCompress,
                room: this.room
            });
            this.imgResultAfterCompress = ''
            this.files = [];
            this.showVideo = false;
        } else {

            this.user.sendMessage({
                msg: this.messageForm.value.message,
                    sender : localStorage.getItem('id'),

                id: localStorage.getItem('chatId'),
                media: 0,
                room: this.room
            });
        }

        this.messageForm.reset()
    }

    search(value) {
        if (value == '') {
            $('.searchBarContainer').hide();
            this.searchData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /*  this.data = JSON.stringify({
               string: newVal
              });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.user.post("searchmessage", {
                string: newVal
            }).subscribe(res => {
                this.searchData = res;
            })
        }
    }

    scrollFunction() {
        setTimeout(function() {
            $('#data').animate({
                scrollTop: $('#data').prop("scrollHeight")
            }, 500);
        }, 100)
    }
    
    chatCheckerSetting(anotherUserId) {
        var userWhoLogedinId = localStorage.getItem('id');
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) }
        
        this.http.post(this.api_url_ + 'insert', {chat_id: anotherUserId, i: 0 }, httpOptions).subscribe(res => {
            this.common_res = res;
            this.user.post("fetchchat", {room_id: res[0].room }).subscribe(res => {
                var chat : any = res;
                if(this.common_res.length > 0)
                {
                    if(this.common_res[0].status == 1)
                    {
                        this.sendSection = true;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 2 || this.common_res[0].status == null )
                    {    
                        if(chat.length > 0 && this.common_res[0].chat_status == 0)
                        {

                            if(chat[0].message_from != localStorage.getItem('id') && this.common_res[0].status_by == 0)
                            {
                                this.permissionboxMsg = "";
                                this.showButton = true;
                                this.sendSection = false;
                                this.showPermission = true;
                            }else if(this.common_res[0].status_by != 0)
                            { 
                                          
                                this.user.post('getUserName', {id : this.common_res[0].status_by}).subscribe(res => {
                                    if(this.common_res[0].status_by == localStorage.getItem('id'))
                                    {
                                        this.permissionboxMsg = "You have decline, request for chat with demo user";
                                    }else{
                                        this.permissionboxMsg = "Demo user decline you'r request for chat";
                                    }
                                    this.showButton = false;
                                    this.sendSection = false;
                                    this.showPermission = true;
                                });

                            }else{
                                this.permissionboxMsg = "You have requested to "+this.user_name+" for chat, this message appears because you are not connected, so you both need to agree to start chat";
                                this.showButton = false;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                        }else{
                            this.showPermission = false;
                            
                            this.sendSection = true;
                        } 
                    }
                    else if(this.common_res[0].status == 3)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 4)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 5)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }else{
                        if(chat.length > 0 && this.common_res[0].chat_status == 0)
                        {
                            
                            if(chat[0].message_from != localStorage.getItem('id'))
                            {
                                this.permissionboxMsg = "";
                                this.showButton = true;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                            else if(this.common_res[0].status_by != 0)
                            {

                                this.user.post('getUserName', {id : this.common_res[0].status_by}).subscribe(res => {
                                   
                                    if(this.common_res[0].status_by == localStorage.getItem('id'))
                                    {
                                        this.permissionboxMsg = "You have decline, request for chat with demo user";
                                    }else{
                                        this.permissionboxMsg = "Demo user decline you'r request for chat";
                                    }
                                    this.showButton = false;
                                    this.sendSection = false;
                                    this.showPermission = true;


                                });

                            }
                            else{
                                   
                                this.permissionboxMsg = "You have requested to "+this.user_name+" for chat, this message appears because you are not connected, so you both need to agree to start chat";
                                this.showButton = false;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                        }else{

                            this.sendSection = true;
                            this.showPermission = false;

                        } 
                    }
                }else{
                    this.sendSection = true;
                    this.showPermission = false;

                }
            })
        })
    }

    permissionAction(type){
        this.user.post('alloweUser',{type : type, chatId : localStorage.getItem('chatId'), user_id : localStorage.getItem('id')}).subscribe(res => {
             
             this.chatCheckerSetting(localStorage.getItem('chatId'));
        });
    }

    // ===============================
    // Start media chat coding

   showToolBox() {

        document.getElementById('toolbox1').classList.toggle('displayNone');
    }

    compressFile(obj) {
        document.getElementById('toolbox1').classList.add('displayNone');

        this.imageCompress.uploadFile().then(({
            image,
            orientation
        }) => {
            var a = this.base64MimeType(image);
            if (a.split('/')[0] != 'image') {
                Swal.fire({
                    text: "This is not a image file",
                    type: "error"
                });
                return false;
            }

            this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
                this.imgResultAfterCompress = result;
            });

        });
        // document.getElementById('toolbox1').classList.toggle('displayNone');
        this.showAttach = false;
    }

    base64MimeType(encoded) {
        var result = null;

        if (typeof encoded !== 'string') {
            return result;
        }

        var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }

    showImg(url, type) {
        var load = this.showLoader;
        setTimeout(function(){
            Swal.fire({
                html: "<video controls autoplay style='width: 100%;'><source src='" + url + "'></video>",
                showConfirmButton : false,
                showCancelButton : true,
                cancelButtonText : 'Close',
            });
        },300)
    }

    removeAttach() {
        this.imgResultAfterCompress = '';
        this.imgResultBeforeCompress = '';
        this.files = [];
    }

    images(fileInput: any) {

        document.getElementById('toolbox1').classList.add('displayNone');

        this.files = < Array < File >> fileInput.target.files;
        var type = this.files[0].type.split('/')[0];


        if (type != "video") {
            this.files = [];
            document.getElementById('toolbox1').classList.add('displayNone');
            Swal.fire({
                text: "This is not a video file ",
                type: "error"
            });
            return false;
        }

        if (this.files[0].size > 2000000) {
            this.files = [];
            document.getElementById('toolbox1').classList.add('displayNone');
            Swal.fire({
                text: "Please select video less than 2 mb",
                type: "error"
            });
            return false;
        }



        this.imgResultBeforeCompress = URL.createObjectURL(this.files[0])
    }

    other(fileInput: any) {

        document.getElementById('toolbox1').classList.add('displayNone');
        this.files = < Array < File >> fileInput.target.files;
        var type = this.files[0].name.split('.');
        var ext = type[type.length - 1];
        if (ext != "doc" && ext != "zip" && ext != "docx" && ext != "pdf" && ext != "rar" && ext != "xls" && ext != "xlsx") {
            this.files = [];
            Swal.fire({
                text: "This is not a zip / document file ",
                type: "error"
            });
            return false;
        }

        if (this.files[0].size > 2000000) {
            this.files = [];
            Swal.fire({
                text: "Please select file less than 2 mb",
                type: "error"
            });
            return false;
        }

        this.imgResultBeforeCompress = URL.createObjectURL(this.files[0])
    }
    
    // End media chat coding
    // ===============================
    // Video Chat Function

    startChat() {



        this.videoChat()
        
        this.socket.emit('startVideoChat', {
            id: localStorage.getItem('chatId'),
            room: this.room
        });
        var d = this.callAcceptedStatus;
        setTimeout(()=>{
           if(this.callAcceptedStatus == false) {
               this.socket.emit('rejectCall', {
                    id: localStorage.getItem('chatId'),
                    room: this.room
                });
               this.rejectCall();
           }
        },30000)

    }

    videoChat() {
        var activeRoom;
        var previewTracks;
        var identity;
        var roomName;

        function attachTrack(track, container) {
          container.appendChild(track.attach());
        }

        function attachTracks(tracks, container) {
          tracks.forEach(function(track) {
            attachTrack(track, container);
          });
        }

        function getTracks(participant:any) {
          return Array.from(participant.tracks.values()).filter(function(publication:any) {
            return publication.track;
          }).map(function(publication:any) {
            return publication.track;
          });
        }

        function detachTrack(track) {
          track.detach().forEach(function(element) {
            element.remove();
          });
        }

        function trackPublished(publication, container) {
          if (publication.isSubscribed) {
            attachTrack(publication.track, container);
          }
          publication.on('subscribed', function(track) {
            attachTrack(track, container);
          });
          publication.on('unsubscribed', detachTrack);
        }
        function trackUnpublished(publication) {

        }

        function participantConnected(participant, container) {
          participant.tracks.forEach(function(publication) {
            trackPublished(publication, container);
          });
          participant.on('trackPublished', function(publication) {
            trackPublished(publication, container);
          });
          participant.on('trackUnpublished', trackUnpublished);
        }

        function detachParticipantTracks(participant) {
          var tracks = getTracks(participant);
          tracks.forEach(detachTrack);
        }

        function roomJoined(room) {

          activeRoom = room;
          // window.room = this.activeRoom ;

          // document.getElementById('button-join').style.display = 'none';
          // document.getElementById('button-leave').style.display = 'inline';

          var previewContainer = document.getElementById('local-media');
          if (!previewContainer.querySelector('video')) {
            attachTracks(getTracks(room.localParticipant), previewContainer);
          }

          var remoteMediaContainer = document.getElementById('remote-media');
          room.participants.forEach(function(participant) {
            participantConnected(participant, remoteMediaContainer);
          });

          room.on('participantConnected', function(participant) {
            participantConnected(participant, remoteMediaContainer);
          });

          room.on('participantDisconnected', function(participant) {
            detachParticipantTracks(participant);
          });

          room.on('disconnected', function() {
            
            this.socket.emit('rejectCall', {
                id: localStorage.getItem('chatId'),
                room: this.room
            });
           this.rejectCall();

            if (previewTracks) {
              previewTracks.forEach(function(track) {
                track.stop();
              });
              previewTracks = null;
            }
            detachParticipantTracks(room.localParticipant);
            room.participants.forEach(detachParticipantTracks);
            activeRoom = null;
            // document.getElementById('button-join').style.display = 'inline';
            // document.getElementById('button-leave').style.display = 'none';
          });
        }

        this.user.post('getToken', {room : this.room, id : localStorage.getItem('id')}).subscribe(res=>{
            var resb : any; 
            resb = res;
            connect(resb.token, {name : this.room}).then(roomJoined, function(error) {
              
            });
        });

        var video_chat_window = document.getElementById('video_window');
        video_chat_window.style.display = "block";
        document.body.classList.add('hide_overflow');
        
        if(this.callAcceptedStatus == true) {
           
       }
    }
    
    acceptCall() {
        this.videoChat();
        this.status = false;
        this.socket.emit('acceptCall', {
            id: localStorage.getItem('chatId'),
            room: this.room
        });
    }
    
    rejectCall() {
        this.status = false;
        this.socket.emit('rejectCall', {
            id: localStorage.getItem('chatId'),
            room: this.room
        });
        // location.reload();
        // this.rt.navigateByUrl('/test', {
        //     skipLocationChange: true
        // }).then(() =>
        //    this.rt.navigate(["messages"])
        // );
    }
    
    addEmoticon(d){
        console.log('hello');
        $('#message_type_textarea').val($('#message_type_textarea').val() + d.path[0].innerHTML);
    }

    activeEmoticonDiv(id)
    {
        $('.emojiC').addClass('displayNone');
        document.getElementById('div'+id).classList.remove('displayNone')
    }

    rejectAction() {
        this.status = false;
        // this.connection.closeSocket();
        var video_chat_window = document.getElementById('video_window');
        video_chat_window.style.display = "none";
        location.reload();

        // document.body.classList.remove('hide_overflow');
        // this.connection.    .forEach(function(stream) {
        //     stream.stop();
        // });


        this.rt.navigateByUrl('/test', {
            skipLocationChange: true
        }).then(() =>
            this.rt.navigate(["messages"]));
        // window.location.reload();
        

        // d.disconnect();
           
        // document.getElementById('button-leave').onclick = function() {

          // };
    }

    // End Video Chat Function
    // ===============================
}