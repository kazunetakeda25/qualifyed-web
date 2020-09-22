<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
   <style type="text/css">
     .doc {
    width: 100%;
    height: 500px;
}
   </style>
 <input type="hidden" name="user_id" value="" id="user_id">
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>


<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>User List</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage User</a>
               </li>
               <li>
                  <a href="<?php echo site_url('user_list'); ?>">User List</a>
               </li>
            </ul>
         </div>
      </div>
      <!-- row -->
      <div class="row">
         <!-- col -->
         <div class="col-md-12">
            <section class="tile">
               <!-- tile header -->
               <div class="tile-header dvd dvd-btm">
                  <h1 class="custom-font">User List</h1>                  
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                              <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Email</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Contact</th>
                                        <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Status</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Changes Status</th>
                                      
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th>
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <?php 
                                    if($userData!="" && count($userData) >0)
                                    {
                                   foreach ($userData as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['fname'].' '.$value['lname']; ?></td>
                                       <td><?php echo $value['login_email']; ?></td>
                                       <td><?php echo $value['phone']; ?></td>
                                       <td><?php if ($value['login_status'] == 1) {
                                              echo "Active";
                                          } elseif($value['login_status'] == 0) {echo "Inactive";} 
                                          elseif($value['login_status'] == 2) {echo "Pending";}
                                           elseif($value['login_status'] == 3) {echo "Deleted";}
                                        ?>
                                          
                                        </td>
                                       <td><div class="onoffswitch greensea inline-block">
                                          <input type="checkbox" data-id="<?php echo $value['login_id']; ?>" name="onoffswitch" class="onoffswitch-checkbox user_status" id="switch<?php echo $key ?>" <?php if ($value['login_status'] == 1) {
                                              echo "checked='checked'";
                                          } ?>>
                                          <label class="onoffswitch-label" for="switch<?php echo $key ?>">
                                              <span class="onoffswitch-inner"></span>
                                              <span class="onoffswitch-switch"></span>
                                          </label>
                                      </div></td>
                                      
                                       <td><?php echo date_format(date_create($value['created_date']),"d M,Y"); ?></td>
                                       <td class="actions">
                                        <div class="dropdown">
                                            <button class="btn btn-teal dropdown-toggle btn-sm" type="button" data-toggle="dropdown">Actions
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu">
                                         <!--  <li>
                                            <a role="button" href="<?php echo site_url('admin/edit_user/'.base64_encode($value['id'])); ?>" tabindex="0" class="text-primary text-uppercase text-strong text-sm mr-10 edit_class">Edit</a>
                                          </li> -->
                                          <li>
                                              <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['login_id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash">View Detail</a>
                                          </li>
                                         <li>
                                              <?php 
                                              $resume_file = '';
                                              $ext = '';
                                              if($value['resume_file']!="")
                                              {
                                                $resume_file = base_url("../src/assets/uploads/resume/").$value['resume_file'];
                                                $ext = pathinfo($resume_file, PATHINFO_EXTENSION);
                                              }
                                              else
                                              {
                                                $resume_file = '#';
                                              }
                                              ?>
                                              <a target="_blank" role="button" href="<?php echo $resume_file; ?>" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10" >View Resume</a>
                                          </li>
                                          <li>
                                             <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['login_id']; ?>" data-toggle="modal" data-target="#changePass" data-options="changePass">Change Password</a>
                                          </li>
                                          <li>
                                              <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['login_id']; ?>" href="<?php echo site_url('admin/view_post/'.$value['login_id']) ?>">View Posts</a>
                                          </li>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['login_id']; ?>" href="<?php echo site_url('profile_view/'. $value['login_id']) ?>">User viewed this profile</a>
                                          </li>
                                        </ul>
                                          </div>
                                          </td>
                                    </tr>
                                   <?php endforeach;
                                    }
                                    ?>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- /tile body -->
            </section>
            <!-- tile -->
            <!-- /tile -->
         </div>
         <!-- /col -->
      </div>
      <!-- /row -->
   </div>
</section>


<div class="modal splash fade" id="splash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 685px">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">View User Detail</h3>
          </div>
          <div class="modal-body table-responsive" id="showDataInModal">
            
          </div>
          <div class="modal-footer">
              <!-- <button class="btn btn-default btn-border" data-dismiss="modal">OK</button> -->
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>
 <div id="dialog" style="display: none">
  <iframe style="width: 618px; height: 800px" id="myFrame" src="" allowtransparency="false"></iframe>
</div>

<div class="modal splash fade" id="changePass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">Change Password</h3>
          </div>
          <div class="modal-body">
               <div class="form-group">
                <label>New Password <span class="required"> *</span></label>
                <input type="password" class="form-control" id="new_password" autocomplete="off" value="" name="new_password">
              </div>
              <div class="form-group">
                <label>Confirm Password <span class="required"> *</span></label>
                <input type="password" class="form-control" id="confirm_password" autocomplete="off" value="" name="confirm_password">
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-primary" id="changePassButton">Change Password</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>
<!--/ CONTENT -->
<script>
    $('.user_status').on('change', function(){
        if($(this).prop('checked') == true)
        {
            status = 1;
        }else{
            status = 0;
        }
        $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/user_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'User Status Update Successfully', 'success');
        })
    });

    $('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : '<?php echo site_url('admin/getUserDetail'); ?>',
        data : {id : id},
        success : function(data){

          /*$("#showDataInModal").html(data);
          $('#splash').modal('toggle');*/
          $('.modal-body').children().remove();
          $('#showDataInModal').append(data);
        },
        error: function(){
                             // body...
          }
      })
    });

     /*$(".showResumeLink").click(function () { 
      alert("hello");
      var fileName = $(this).attr("data-filename");
      var fileExt = $(this).attr("data-ext");
      var object = '';
      console.log(fileName);
            $("#dialog").dialog({
                modal: true,
                title: fileName,
                width: 540,
                height: 450,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                },
                open: function () {
                    if(fileName!="" && fileExt=='pdf'){
                     object = "<object data=\"{FileName}\" type=\"application/pdf\" width=\"500px\" height=\"300px\">";
                    object += "If you are unable to view file, you can download from <a href = \"{FileName}\">here</a>";
                    object += " or download <a target = \"_blank\" href = \"http://get.adobe.com/reader/\">Adobe PDF Reader</a> to view the file.";
                    object += "</object>";
                    object = object.replace(/{FileName}/g, "Files/" + fileName);
                    
                  }
                  else if(fileName!="" && (fileExt=='doc' || fileExt=='docx')){
                    object = '<iframe class="doc" src="'+fileName+'"></iframe>';
                  }
                  else if(fileName!="" && (fileExt=='jpg' || fileExt=='jpeg' || fileExt=='png')){
                    object = '<img src="'+fileName+'" height="200px" width="200px">';
                  }
                  else
                  {
                    object = 'Resume not found';
                    
                  }
                  $("#dialog").html(object);
                }
            });
        });*/

 /*$(".showResumeLink").click(function () { 
      var fileName = $(this).attr("data-filename");
      var fileExt = $(this).attr("data-ext");
       $("#dialog").dialog({
                modal: true,
                title: fileName,
                width: 540,
                height: 450,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                },
                 open: function () {
                  $('#myFrame').attr("src", fileName + "#view=VFit" + "&toolbar=0" + "&navpanes=0");

                 }
        }); 
      
  });*/
    $('#changePassButton').click(function(){
      /*var old_password = $('#old_password').val();*/
      var new_password = $('#new_password').val();
      var confirm_password = $('#confirm_password').val();
      var id = $('#user_id').val();
      if(new_password != '' && confirm_password != '')
      {
        if(new_password == confirm_password)
        {
          $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/UserchangePassword'); ?>",
            data : {new_password : new_password , id : id}
          }).then(function(res){
            response = JSON.parse(res);
            console.log(response.success);  
            if(response.success == true)
            {
              /*$('#old_password').val('');*/
              $('#new_password').val('');
              $('#confirm_password').val('');
              swal("Password updated", response.msg, 'success');
              $('#changePass').modal('toggle');
            }else{
              swal("Error", response.msg, 'error');
            }
          });
        }else{
          swal("ERROR", "Password and confirm password not match", 'error');
        }
      }else{
          swal("All Field required", "Please fill all required fileds", 'error');
      }
    });
    
</script>
        


