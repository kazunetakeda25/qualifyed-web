import { TestComponent } from './../test/test.component';
import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../global';
import { MatDialog, MatDialogConfig } from "@angular/material";
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-bussinessprofile',
    templateUrl: './bussinessprofile.component.html',
    styleUrls: ['./bussinessprofile.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class BussinessprofileComponent implements OnInit {
    status: any
    nameData: any
    api = myGlobals.api_url;
    userapi = myGlobals.userapi_url;
    media_url = myGlobals.media_url;
    createPost: any
    submitted=false;
    data: any
    sharePost: any
    pic_path:any;
    postData: any
    hasVideo: any
    haspdf: any;
    parentId : any ;
    BusData: any = {};
    hasImage: any
    showBtn1 : any
    likedata: any
    pid: any
    delpostid : any
    delpost : any
    likestatus: any
    lstatus = 0;
    postid: any
    alllike: any
    showLoader = false;
    commentForm: any
    commentdata: any
    allcomment=[]
    createPost1 : any
    server_name = myGlobals.server_name
    post_name: any
    post_img: any
    getCount : any
    post_video: any
    post_attach: any
    currentCount : any
    db: any = {};
    postUserData: any = {}
    connection_count: any
    common : any 
    interReq:any
     lowerlimit:number=0;
 upperlimit:number=5;
    activeOpp:any
    day_count:any
    profileview_count:any
    bio_video_view_count:any
    show:number=0;
    resData:any
    final:any
    comment_count:any
    commentReplyForm:any
 show_comment_reply:number=0
  reply_post:number=0;
 show_comment_post_btn:number=0;
saved:any
 data1:any
 data2:any
 show_like_comment:number=0 
 comment_like_count:any
img:any
test_count:any
count_comments_post:any
login_id:any
happy:any
showAllSetting:any
select_post_privacy:any

report_comment:any
report_com_status:any
report_comment_element_id:any
type:any
 lowerlimit1:number=10;
 upperlimit1:number=0;
 file_status=false;
 token_type:any
    constructor(public datepipe: DatePipe, private http: HttpClient, private fb: FormBuilder, private user: UserService, private dialog: MatDialog, private cd: ChangeDetectorRef, private rt: Router) {}
    // showToggle(id) {
    //     $("." + id).toggle();
    //     //console.log(id);
    //         this.show=1;
    //           this.user.post("getcomment",{id:id,limit:"0,5"}).subscribe(res => {
    //               this.final=res
    //         this.allcomment = this.final
    //           //console.log("all",this.allcomment)
             
    //     })
    // }

    //     showToggle1(id) {
    //     $("." + id).toggle();
    //     //console.log(id);
    //         this.show=0;
    //         this.lowerlimit=0;
           
    // }

    showToggle(id,h) {
      //  $("." + id).toggle();
       // //console.log(id);
          // this.show=1;
              this.user.post("getcomment",{id:id,limit:"0,5"}).subscribe(res => {
                  this.final=res
            this.allcomment = this.final
            //console.log("allcomment",this.allcomment)

            for (var i = 0; i < this.allcomment.length; ++i) {
             this.user.post("getcommentreply",{id:this.allcomment[i].id,limit:"0,5", i : i}).subscribe(res1 => {
                  this.common = res1;
                  if(this.common.length > 0)
                  {this.allcomment[res1[0].i].subcoment = res1} 
                })
             this.user.post("get_total_count_comment_reply",{id:this.allcomment[i].id,i : i}).subscribe(res2=>{
                 this.common = res2;
                  if(this.common.length > 0)
                  {this.allcomment[res2[0].i].subcoment_count = this.common[0].count}
               })
                this.data1=this.allcomment[i].id
                this.data2=this.allcomment[i].user_login_id

                    const url="get_comment_like_status";

                    this.user.post(url,{id:this.data1,limit:"0,5", cout : i}).subscribe(res=>{
                        this.saved=res

                        this.allcomment[this.saved[0].cout].saved_status = this.saved[0].saved_status
                        
                    })
                 this.user.post( "countPostLike_comment", {'count': this.allcomment[i].id,i: i}).subscribe(res => {
                    this.db = res;
                    this.allcomment[this.db.i].comment_count = this.db.count;
                })
            }
              //console.log("finalReply",this.allcomment)
             
             
        })
    }

     showToggleV2(id,j)
    {
      localStorage.setItem("user_open_comment",j);

     document.getElementById('commentOpener_'+j).classList.toggle('displayNone');
     //console.log(document.getElementById('commentOpener_'+j));
     this.showToggle(id,j)

    }


        showToggle1(id) {
       // $("." + id).toggle();
       // //console.log(id);
            this.show=0;
            this.lowerlimit=0;
            //this.ngOnInit()
    }

        showmoreComment(id){
        this.showLoader=true;
        //console.log("se mol",id)
        this.lowerlimit =this.lowerlimit+this.upperlimit
        //console.log(this.lowerlimit,this.upperlimit)
           this.user.post("getcomment",{id:id,limit:""+this.lowerlimit+","+this.upperlimit+""}).subscribe(res => {
               this.showLoader=false;
            this.final = res
                 for (var j = 0; j < this.final.length; ++j) {

                     (this.allcomment).push(this.final[j])
                       //console.log("More",this.allcomment)
                   }
          })
    }
    ngOnInit(value = '') {
        this.showLoader=true
        this.login_id = localStorage.getItem("id");
        this.token_type = localStorage.getItem("token");
            this.user.post("view_profile/getAllSetting", {
                id:  this.login_id
            }).subscribe(res => {
                this.showLoader=false
                this.happy = res
                if (this.happy.length > 0) {
                    this.showAllSetting = res[0];
                    this.select_post_privacy=this.showAllSetting.who_can_see_timeline
              if(this.select_post_privacy == 0)
                    {
                      this.select_post_privacy=1
                    }       
                     this.createPost.controls['privacy'].setValue(this.select_post_privacy, {onlySelf: true});           }
                  })
        //document.body.scrollTop = document.documentElement.scrollTop = 0;
    	this.getCount = 0;
        this.showLoader=true
    	this.user.post('getpostCount',{userid:this.login_id,usertype:this.token_type}).subscribe(res => {
            this.showLoader=false
            if(res != '')
            {
                this.getCount = res[0].post_count-5;
            	this.currentCount = 0;
            }else{
                this.getCount = 0;
                this.currentCount = 0;
            }
        })
          this.showLoader=true
        this.user.post("opportunity/dashCount",{userid:this.login_id}).subscribe(res => {
            this.showLoader=false
            this.interReq = res;
            this.interReq = this.interReq[0].count;
        });
          this.showLoader=true
         this.user.post("profileviewcount",{userid:this.login_id}).subscribe(res=>{
             this.showLoader=false
             this.profileview_count=res[0].total_view_profile
         })
        this.showLoader=true
         this.user.post("bioviewcount",{userid:this.login_id}).subscribe(res=>{

this.showLoader=false
             this.bio_video_view_count=res[0].total_view_bio
         })

        this.createPost1 = this.fb.group({
           id:[''],
           postName: [''],
        })

        var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");

        if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1") {
            this.rt.navigate(['bussinessprofile']);
        } else if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2") {
            this.rt.navigate(['user-profile']);
        }

        $(".showToggle").click(function() {});

        this.hasImage = 0;
        this.hasVideo = 0;
        this.haspdf = 0;
        $('#textMe').val('');
        // $('.file_multi_up').val('');
        $('#privacy_type').val(1);
        $('#postModal').hide();
          this.showLoader=true
        this.user.showpostData({userid:this.login_id,usertype:this.token_type,limit:'0,5'}).subscribe(res => {
            this.postData = res;
            for (var i = 0; i < this.postData.length; ++i) {
                let httpOption = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }

                if (this.postData[i].parent_id != 0) {
	                this.http.post(this.api + "/getFeedParent", {
	                    'count': this.postData[i].parent_id,
	                    'i': i

	                }, httpOption).subscribe(res => {
	                	this.postData[res[0].counting].parent_data = res[0];
	                })

                }
                this.http.post(this.api + "/countPostLike", {
                    'count': this.postData[i].id,
                    'i': i
                }, httpOption).subscribe(res => {
                    this.db = res;
                    this.postData[this.db.i].count = this.db.count;
                })

                 this.http.post(this.api + "/countPostComment", {
                    'count': this.postData[i].id,
                    'i': i
                }, httpOption).subscribe(res => {
                    this.db = res;
                    this.postData[this.db.i].comment_count_post = this.db.count;
                })

                if(this.postData[i].user_login_id != localStorage.getItem('id'))
                {
                    this.user.getdata(i,this.postData[i].user_login_id,this.postData[i].user_type).subscribe(res => {
                        this.postData[res[0].cout].userDisplayData = res[0];
                    });
                }

            }
                   //onsole.log("testing",this.postData)
this.showLoader=false
        })
         this.showLoader=true
        this.user.post('getconnectioncount',{userid:this.login_id,usertype:this.token_type}).subscribe(res => {
            this.showLoader=false
            this.connection_count = res[0].total_connections;
        })
           this.showLoader=true
        this.user.profileData({userid:this.login_id,usertype:this.token_type}).subscribe(res => {


      this.nameData=res;
      this.pic_path="uploads/images/" + this.nameData[0].profile_pic_name
      
           this.Check_picture();
      this.BusData=this.nameData[0];
      this.img=this.nameData[0].profile_pic_name

      if(this.nameData[0].date != '' && this.nameData[0].date != null && this.nameData[0].date != undefined && this.nameData[0].date != 'NaN-NaN-NaN')
      {
        this.nameData[0].date=this.datepipe.transform(this.nameData[0].date, 'y');
      }
      this.showLoader=false
  })

           this.showLoader=true
        this.user.post('getlike',{userid:this.login_id}).subscribe(res => {
            this.alllike = res
              this.showLoader=false
        })

  

        this.createPost = this.fb.group({

            postName: [''],
            privacy: [''],
            postImage: [''],
            postVideo: [''],
            postAttach: ['']



        })
 this.report_comment = this.fb.group({
   report_comment: [''],
   
  })
        this.sharePost = this.fb.group({
            privacy: [''],
            parentId : [''],
            postName: [''],
        })
          this.commentReplyForm = this.fb.group({
   commentreply: ['']
  })
        this.commentForm = this.fb.group({
            comment: ['']
        })

        if (value != '') {
            setTimeout(function() {
                $("." + value).show();
            }, 200);
        }

    }

    option8(i) {

        this.showBtn1 = i;
        this.createPost1.setValue({
            id: this.postData[i].id,
            postName: this.postData[i].post,
        })

    }
    close8(index) {
        this.showBtn1 = -1;
    }

    public onCloseClick(): void {

        this.hasImage = 0;
        this.hasVideo = 0;
        this.haspdf = 0;
        this.filesToUpload = []
        this.filesToUpload2 = []
    }
    public closeModalFunction(): void {
        this.hasImage = 0;
        this.hasVideo = 0;
        this.haspdf = 0;
        $('#postModal').hide();
        $('#postModal2').hide();
        $('#postModal_Report').hide();
        $('#privacy_type').val(1);
        $('#textMe').val('');

    }

    // public onCloseClick1(): void {


    // }
    // public onCloseClick2(): void {

    //   }

    image() {
        this.hasImage = 1;
        //console.log($('#image_here'));
        $(document).on("change", ".file_multi_image", function(evt) {
            var $source = $('#image_here');
            $source[0].src = URL.createObjectURL(this.files[0]);
            // $source.parent()[0].load();
        });
    }
    video() {
        this.hasVideo = 1;
        //console.log(this.hasVideo)


        $(document).on("change", ".file_multi_video", function(evt) {
            var $source = $('#video_here');
            this.videoname = $('#video_here');
            $source[0].src = URL.createObjectURL(this.files[0]);
            // $source.parent()[0].load();
        });
    }
    pdf() {
        this.haspdf = 1;
        //console.log(this.haspdf)


        $(document).on("change", ".file_multi_pdf", function(evt) {
            var $source = $('#pdf_here');
            this.videoname = $('#pdf_here');
            $source[0].src = URL.createObjectURL(this.files[0]);
            // $source.parent()[0].load();
        });


    }

    images(fileInput: any) {
        this.filesToUpload = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
    doc(fileInput: any) {
        this.filesToUpload1 = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
    videos(fileInput: any) {
        this.filesToUpload2 = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }

    closeFun() {
        $("#postModal").hide();
        $("#postModal2").hide();
    }
    filesToUpload: Array < File > = [];
    filesToUpload1: Array < File > = [];
    filesToUpload2: Array < File > = [];


    onSubmitPost() {
        if(this.createPost.value.privacy == '')
      {
        this.createPost.value.privacy = 1;  
      }
        this.showLoader = true;
        this.post_name = this.createPost.value.postName;
        this.post_img = this.createPost.value.postImage;
        this.post_video = this.createPost.value.postVideo;
        this.post_attach = this.createPost.value.postAttach;
        var check = true;
        if (this.post_img == '' && this.post_video == '' && this.post_attach == '') {
            check = false;
        } else {
            check = true;
        }
        if (this.post_name == '' && check == false) {
            Swal.fire({
                text: "Please select media or type something to post",
                type: "error"
            });
            this.showLoader=false;
            this.ngOnInit();
        } else {

            const formData: any = new FormData();
            const files: Array < File > = this.filesToUpload;

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i]['name'], files[i]['size']);
            }
            // //console.log('form data variable :   '+ formData.toString());
            this.http.post(this.api + '/imagepost', formData)
                .map(files => JSON.stringify(files))
                .subscribe(res =>

                    {

                        this.data = JSON.parse(res);

                        //this.ngOnInit()
                        const formData: any = new FormData();
                        const files: Array < File > = this.filesToUpload1;
                        // //console.log(files);

                        for (let i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i]['name']);
                        }
                        // //console.log('form data variable :   '+ formData.toString());
                        this.http.post(this.api + '/doc', formData)
                            .map(files => JSON.stringify(files))
                            .subscribe(res => {
                                this.data = JSON.parse(res);

                                //this.ngOnInit()
                                const formData: any = new FormData();
                                const files: Array < File > = this.filesToUpload2;
                                // //console.log(files);

                                for (let i = 0; i < files.length; i++) {
                                    formData.append("uploads[]", files[i], files[i]['name']);
                                }
                                // //console.log('form data variable :   '+ formData.toString());
                                this.http.post(this.api + '/videopost', formData)
                                    .map(files => JSON.stringify(files))
                                    .subscribe(res => {

                                        this.data = JSON.parse(res);

                                        //this.ngOnInit()
                                        const url = this.api + "/createPost"
                                        let httpOption = {
                                            headers: new HttpHeaders({
                                                'Content-Type': 'application/json'
                                            })
                                        }
                                        this.http.post(url, this.createPost.value, httpOption).subscribe(res => {
                                            //console.log(res);
                                            this.showLoader=true
                           setTimeout(()=>{this.rt.navigateByUrl('/test', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["bussinessprofile"]));
                                            Swal.fire({
                                                text: "Post Successfully",
                                                type: "success"
                                            })
                                            this.showLoader=false
                                         },6000)

                                        })
                                    })

                            })


                    })


        }


    }


    onSubmitsharePost()
    {
      this.showLoader = true;
      this.sharePost.value.parentId = this.parentId;
      if(this.sharePost.value.privacy == '')
      {
      	this.sharePost.value.privacy = 1;	
      }

		let httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
		this.http.post(this.api + "/shareFeed", this.sharePost.value, httpOption).subscribe(res => {
      		this.showLoader = false;
			this.ngOnInit()

			Swal.fire({
			    text: "Post Successfully",
			    type: "success"
			})
		});

    }



    myFunction() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var x = document.getElementById("postModal");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    myFunction2(id) {
//console.log("ididud",id)
        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/getPostWhere", {
            'id': id
        }, httpOption).subscribe(res => {
            // //console.log();
            this.postUserData = res[0];
            //console.log(this.postUserData);
            this.parentId = this.postUserData.id
        })

        var y = document.getElementById("pp_pic");
        document.getElementsByClassName('ac_c')[0].setAttribute('src', y.getAttribute('src'));
        document.getElementsByClassName('ac_c')[1].setAttribute('src', y.getAttribute('src'));

        var x = document.getElementById("postModal2");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        this.sharePost.controls['privacy'].setValue(1 , { onlySelf: true });
    }


    // reportFunction() {
    //     var x = document.getElementById("reportBox");
    //     if (x.style.display === "block") {
    //         x.style.display = "none";
    //     } else {
    //         x.style.display = "block";
    //     }
    // }



    likefunction(value, target, i,id) 
    {

        this.pid = JSON.stringify({
            post_id: value,
            connection_id:id
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + '/like', this.pid, httpOptions).subscribe(res => {
            this.likestatus = res;
            if (this.likestatus.status == 1) {
                target.classList.remove('far');
                target.classList.add('fas');

            } else {
                target.classList.remove('fas');
                target.classList.add('far');
            }
            var el = document.getElementById(String("C_" + i)).innerHTML = " " + this.likestatus.data[0].count;
            this.lstatus = this.likestatus.status
            this.postid = this.likestatus.data[0].entity_id
            // target.classList.add('far');
            // target.classList.add('fas');
        })
    }
    closeFun1() {
   Swal.fire({
            title: 'Are you sure?',
            text: 'You want to discard your changes ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, discard it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
  $("#hideEdit").hide();
}
})
 }
    onSubmitPost1(i) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to save your post ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.showLoader = true;

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.userapi + "/editpost", this.createPost1.value, httpOptions).subscribe(res => {
                     this.common = res;
                     if(this.common.status == true)
                     {
                        Swal.fire({text :"Post update successfully", type : "success"});
                        this.postData[i].post = this.createPost1.value.postName;
                     }else{
                        Swal.fire({text :"Post update successfully", type : "success"});
                     }
                     this.showLoader = false;
                     this.showBtn1 = -1;
                })
            }
        })

    }
    Comment(value,i) 
    {

            var xyz = localStorage.getItem("user_open_comment");

if (this.commentForm.value.comment == ''){
Swal.fire({
    text: "Please type anything to comment",
    type: "error"
   });
return false;
   }
      
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.commentdata = this.commentForm.value;
        this.commentdata.id = value
        //console.log("comment is", this.commentdata)
        this.http.post(this.api + '/comment', this.commentdata, httpOptions).subscribe(res => {
            this.user.post("countPostComment", {'count': value,'i': i}).subscribe(res1 => {
                 //console.log("................-----dc---",res1)
                   // this.db = res1;
                this.test_count=res1
               this.count_comments_post= this.test_count.count
              this.postData[this.test_count.i].comment_count_post = this.count_comments_post;
               //console.log("................-dd--dd--dc---",this.postData)
                })
             this.commentForm.reset()
    this.showToggle(value,xyz);
 /*       this.rt.navigateByUrl('/test', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["bussinessprofile"]));*/
                // this.showPost();

        })
    }
    deletePost(indx, i) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete your post ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                // this.showLoader = true;


                this.delpostid = JSON.stringify({
                    id: indx
                })
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.userapi + "/delpost", this.delpostid, httpOptions).subscribe(res => {
                    this.delpost = res;
            if (this.delpost.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/test', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["bussinessprofile"]));
                Swal.fire({
                    text: "Post Deleted Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/test', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user-profile"]));
                Swal.fire({
                    text: " Deleted Failed",
                    type: "warning"
                })



            }
                })
            }
        })
    }
    videoPop()
    {
      if(this.BusData.video_name == '' || this.BusData.video_name == 'novideo.jpg' || this.BusData.video_name == undefined || this.BusData.video_name == null)
      {
        Swal.fire({text : "Sorry no video available", type: "error"});
      }else{
        Swal.fire({html : '<video controls autoplay><source src="'+this.media_url+'/uploads/bio_video/'+this.BusData.video_name+'" type="video/mp4"></video>"',customClass: {popup: 'animated tada'}});
      }
      return false;
    }

    showAction(i)
    {
        document.getElementById('action_'+i).classList.toggle('displayNone');
    }
close(i){
        document.getElementById('action_' + i).classList.add('displayNone');
    }
    loadMore()
    {

    	if(this.getCount > 0)
    	{
    		this.getCount = this.getCount - 5;	
    		this.currentCount += 5;
    		if(this.getCount < 0)
    		{
    			this.getCount = 0;	
    		}
    		this.user.showpostData({userid:this.login_id,usertype:this.token_type,limit:((this.currentCount) + ',' + (5)).toString()}).subscribe(res => {
	            // this.postData = res;

                for (var i = 0; i < res.length; ++i) {
                    this.postData.push(res[i]);    
                }


	            for (var i = 0; i < this.postData.length; ++i) {
                    let httpOption = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    }

                    if (this.postData[i].parent_id != 0) {
                        this.http.post(this.api + "/getFeedParent", {
                            'count': this.postData[i].parent_id,
                            'i': i
                        }, httpOption).subscribe(res => {
                            this.postData[res[0].counting].parent_data = res[0];
                        })

                    }
                    this.http.post(this.api + "/countPostLike", {
                        'count': this.postData[i].id,
                        'i': i
                    }, httpOption).subscribe(res => {
                        this.db = res;
                        this.postData[this.db.i].count = this.db.count;
                    })

                    if(this.postData[i].user_login_id != localStorage.getItem('id'))
                    {
                        this.user.getdata(i,this.postData[i].user_login_id,this.postData[i].user_type).subscribe(res => {
                            this.postData[res[0].cout].userDisplayData = res[0];
                        });
                    }

                }
	        })

    	}else{
    		this.getCount = 0;
    	}
    	return false;
    }
showCommOnComm(id){
  // this.commOnComm = 1;
  var closeClass = document.getElementsByClassName('closeReply');
  for (var i = 0; i < closeClass.length; ++i) {
    if(closeClass[i].getAttribute('id') == 'reply_'+id)
    {
      document.getElementById('reply_'+id).classList.remove('displayNone');
    }else{
      closeClass[i].classList.add('displayNone');
    }
  }
}
CommentReply(id,w){
      var xyz = localStorage.getItem("user_open_comment");

    if (this.commentReplyForm.value.commentreply == ''){
Swal.fire({
    text: "Please type anything to comment",
    type: "error"
   });
return false;
   }
  this.commentReplyForm.value.entity_id=id
  this.user.post("replay_comments",this.commentReplyForm.value).subscribe(res =>{
             this.commentReplyForm.reset()

    this.show_comment_reply=1
    this.showToggle(w,xyz);

  })
     


}
load_more_comment_reply(id){
 this.upperlimit1 =this.lowerlimit1+this.upperlimit1

  // 
for (var i = 0; i < this.allcomment.length; ++i) {

   this.user.post("getcommentreply",{id:id,limit:""+0+","+this.upperlimit1+"", i : i}).subscribe(res1 => {
                  this.common = res1;
              if(this.common.length > 0 && this.allcomment[res1[0].i].id == id)           
                     {this.allcomment[res1[0].i].subcoment = res1} 
                })
   }}
openReplyPost(){
  this.reply_post = 1

}
show_comment_post_btnn(){
  this.show_comment_post_btn = 1
}
  likeOnComment(arg1,w){
     //console.log("arg=>",arg1)
  

        this.user.post("likepost",{post_id:arg1,type:4}).subscribe(res=>{
          this.comment_like_count=res
          this.show_like_comment = 0
         // this.ngOnInit(w)
          this.showToggle(w,w)
     
        })
    }

    showPost(){

        this.user.showpostData({userid:this.login_id,usertype:this.token_type,limit:'0,5'}).subscribe(res => {
            this.postData = res;
            //console.log("testing",this.postData)
            for (var i = 0; i < this.postData.length; ++i) {
                let httpOption = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }

                if (this.postData[i].parent_id != 0) {
                    this.http.post(this.api + "/getFeedParent", {
                        'count': this.postData[i].parent_id,
                        'i': i

                    }, httpOption).subscribe(res => {
                        this.postData[res[0].counting].parent_data = res[0];
                    })

                }
                this.http.post(this.api + "/countPostLike", {
                    'count': this.postData[i].id,
                    'i': i
                }, httpOption).subscribe(res => {
                    this.db = res;
                    this.postData[this.db.i].count = this.db.count;
                })

                if(this.postData[i].user_login_id != localStorage.getItem('id'))
                {
                    this.user.getdata(i,this.postData[i].user_login_id,this.postData[i].user_type).subscribe(res => {
                        this.postData[res[0].cout].userDisplayData = res[0];
                    });
                }

            }
            //console.log("share===>",this.postData)

        })
    }
    reportFunction(j){
 document.getElementById('commentOpener1_'+j).classList.toggle('displayNone');
}
reportAbouse(element,type){
  
  this.report_comment_element_id=element
  this.type=type

this.report_comment_sub()
}
report_comment_sub()
{ 
  var entity_id=this.report_comment_element_id 
  var entity_type = this.type
   

        Swal.fire({
  title: 'Submit your reason ',
  input: 'textarea',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Report',
  showLoaderOnConfirm: true,
 
}).then((result) => {
  if (result.value) {
                this.showLoader = true;
 this.user.post("report_on_comment",{entity_id:entity_id,comments:result.value,entity_type:entity_type}).subscribe(res=>{
                    this.report_com_status=res
                    if(this.report_com_status.status == true)

                    {
                     this.showLoader=false;

                      Swal.fire({
                    text: "Report And Abuse Sent Successfully",
                    type: "success"
                })
                    }
                    else{
                      Swal.fire({
                    text: "Report And Abuse Sent Failed",
                    type: "warning"
                })
                    }
                  })
                  this.report_comment.reset()
                   
                   this.closeModalFunction()
              }
            })
}
likeNotification(id, status){
        if(status.getAttribute('class') != 'fa-heart far' && id != this.login_id)
        {
        this.user.post("opportunity/likeNotification",{connection_id:id}).subscribe(res=>{

        })          
        }
   
}
comment_notification(id){
     if(id != this.login_id){
    this.user.post("opportunity/comment_Notification",{connection_id:id}).subscribe(res=>{

        })
}
}
comment_reply_noti(id){
    if(id != this.login_id){

      this.user.post("opportunity/comment_reply_Notification",{connection_id:id}).subscribe(res=>{

        })
    }
}
like_reply_noti(id, status){
        if(status == 0 && this.login_id != id)
        {
        this.user.post("opportunity/like_comment_Notification",{connection_id:id}).subscribe(res=>{

        })          
        }
   
}
Check_picture(){
    this.user.fileExists('src/assets/'+this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
        });
}
}