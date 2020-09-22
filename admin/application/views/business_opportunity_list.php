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
         <h2>Business Opportunity List</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="<?php echo site_url("business_list"); ?>">Manage Business</a>
               </li>
               <li>
                  <a><?php echo $userName;?></a>
               </li>
               <li>
                  <a href="#">Opportunity List</a>
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
                  <h1 class="custom-font">Opportunity List</h1>
                  <!-- <ul class="controls">
                     <li class="dropdown">
                        <a role="button" tabindex="0" class="dropdown-toggle settings" data-toggle="dropdown">
                        <i class="fa fa-cog"></i>
                        <i class="fa fa-spinner fa-spin"></i>
                        </a>
                        <ul class="dropdown-menu pull-right with-arrow animated littleFadeInUp">
                           <li>
                              <a role="button" tabindex="0" class="tile-toggle">
                              <span class="minimize"><i class="fa fa-angle-down"></i>&nbsp;&nbsp;&nbsp;Minimize</span>
                              <span class="expand"><i class="fa fa-angle-up"></i>&nbsp;&nbsp;&nbsp;Expand</span>
                              </a>
                           </li>
                           <li>
                              <a role="button" tabindex="0" class="tile-fullscreen">
                              <i class="fa fa-expand"></i> Fullscreen
                              </a>
                           </li>
                        </ul>
                     </li>
                  </ul> -->
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
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Title</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Total Interview Request</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Created Date</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Status</th>
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <?php 
                                    if($data!="" && count($data) >0)
                                    {
                                   foreach ($data as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['title']; ?></td>
                                       <td><?php echo $value['interview_request']; ?></td>
                                       <td><?php echo date_format(date_create($value['created_date']),"d M,Y"); ?></td>
                                       <td><?php echo $value['is_closed']; ?></td>
                                      
                                       
                                       <td class="actions">
                                        <div class="dropdown">
                                            <button class="btn btn-teal dropdown-toggle btn-sm" type="button" data-toggle="dropdown">Actions
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu">              
                                          <li>
                                              <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash">View Detail</a>
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
        url : '<?php echo site_url('opportunity/viewOpportunityDetail'); ?>',
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

 $(".showResumeLink").click(function () { 
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
      
  });
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

