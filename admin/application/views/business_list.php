<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
   <input type="hidden" name="business_id" value="" id="business_id">
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>
<section id="content">

   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Business List</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage Business</a>
               </li>
               <li>
                  <a href="<?php echo site_url('admin/business_list'); ?>">Business List</a>
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
                  <h1 class="custom-font">Business List</h1>
                  <ul class="controls">
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
                  </ul>
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
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th>
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($businessData!="" && count($businessData) >0)
                                   {
                                   foreach ($businessData as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['name']; ?></td>
                                       <td><?php echo $value['login_email']; ?></td>
                                       <td><?php echo $value['phone']; ?></td>
                                       <td><div class="onoffswitch greensea inline-block">
                                                    <input type="checkbox" data-id="<?php echo $value['loginid']; ?>" name="onoffswitch" class="onoffswitch-checkbox user_status" id="switch<?php echo $key ?>" <?php if ($value['login_status'] == 1) {
                                                        echo "checked='checked'";
                                                    } ?>>
                                                    <label class="onoffswitch-label" for="switch<?php echo $key ?>">
                                                        <span class="onoffswitch-inner"></span>
                                                        <span class="onoffswitch-switch"></span>
                                                    </label>
                                                </div></td>
                                       <td><?php echo date_format(date_create($value['currentdate']),"d M,Y"); ?></td>
                                       <td class="actions">
                                        <div class="dropdown">
                                            <button class="btn btn-teal dropdown-toggle btn-sm" type="button" data-toggle="dropdown">Actions
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu">
                                        <!--   <li>
                                            <a role="button" href="<?php echo site_url('admin/edit_business/'.base64_encode($value['id'])); ?>" tabindex="0" class="text-primary text-uppercase text-strong text-sm mr-10 edit_class">Edit</a>
                                          </li> -->
                                          <li>
                                            <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash-2 splash-ef-4">View</a>
                                          </li>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['loginid']; ?>" data-toggle="modal" data-target="#changePass" data-options="changePass">Change Password</a>
                                          </li>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['loginid']; ?>" href="<?php echo site_url('admin/view_post/'. $value['loginid']) ?>">View Posts</a>
                                          </li>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['loginid']; ?>" href="<?php echo site_url('business-opportunity/'. $value['loginid']) ?>">View Opportunities</a>
                                          </li>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['loginid']; ?>" href="<?php echo site_url('profile_view/'. $value['loginid']) ?>">User viewed this profile</a>
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
<!-- <button class="btn btn-success mb-10" >Slide in (bottom)</button> -->

</section>

<div class="modal splash fade" id="splash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">View Business</h3>
          </div>
          <div class="modal-body table-responsive">

          </div>
          <div class="modal-footer">
              <button class="btn btn-default btn-border" data-dismiss="modal">OK</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
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
            swal("Update Success", 'Business Status Update Successfully','success');
        })
    });
    $('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : '<?php echo site_url('admin/get_business_by_id'); ?>',
        data : {id : id}
      }).then(function(res){
        var json = JSON.parse(res);
        console.log(json.data);
        var business_details = json.data;
        delete business_details.id;
        delete business_details.loginid;
        delete business_details.work;
        delete business_details.state_id;
        delete business_details.country_id;
        delete business_details.companysize;
        delete business_details.companytype;
        delete business_details.profile_pic_id;
        delete business_details.bio_video_id;
        var html = '<table class="table">';
        $.each( business_details, function( key, value ) {
          if(value == null || value == undefined || value == '')
          {
            value = '-';
          }
          if(key == 'profile' && value != '' && value != '-')
          {
            value = "<img height='50' width='50' src='<?php echo base_url("../src/assets/uploads/images/"); ?>"+value+"'>"
          }

          if(key == 'bio_video' && value != '' && value != '-')
          {
            value = "<video controls height='140'><source src='<?php echo base_url("../src/assets/uploads/bio_video/"); ?>"+value+"'></source>"
          }
          if(key == 'date')
          {
            value = new Date(value);
          }

          html += '<tr><td><b>'+key.toUpperCase().replace('_',' ')+'</b></td><td>'+value+'</td></tr>'
        });
        html += "</table>";
        console.log(html);
        $('.modal-body').children().remove();
        $('.modal-body').append(html);

      });
    });
    $('#changePassButton').click(function(){
      /*var old_password = $('#old_password').val();*/
      var new_password = $('#new_password').val();
      var confirm_password = $('#confirm_password').val();
      var id = $('#business_id').val();
      if(new_password != '' && confirm_password != '')
      {

        if(new_password == confirm_password)
        {
          $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/changePassword'); ?>",
            data : {/*old_password : old_password,*/ new_password : new_password , id : id}
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
    $('.changePP').on('click', function(){
      $('#business_id').val($(this).attr('data-id'));
    });
</script>
<style type="text/css">
  .drop_ul{
    position: absolute;
    z-index: 99;
    background: #fff;
    list-style: none;
    padding: 0px;
    right: 15px;
    top: 75px;
  }
  .drop_ul li{
    border: 1px solid #ddd;
    padding: 8px
  }
</style>