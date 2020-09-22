<!-- ====================================================
================= CONTENT ===============================
===================================================== -->
<input type="hidden" name="profile_id" value="" id="profile_id">
<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
<script type="text/javascript">
swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
</script>
<?php }
?>
<section id="content">
  <div class="page page-tables-datatables">
    <div class="pageheader">
      <h2>Edit Profile</h2>
      <div class="page-bar">
        <ul class="page-breadcrumb">
          <li>
            <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
          </li>
          <li>
            <a href="#">Edit Profile</a>
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
            <h1 class="custom-font"> Edit Profile </h1>
          </div>
          <!-- /tile header -->
          <!-- tile body -->
          <div class="tile-body">
            <div class="table-responsive">
              <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="create_mail_templates">
                      <form id="save_email" method="POST" action="<?php echo site_url('admin/update_profile'); ?>">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label>Name</label>
                              <input type="text" id="name_v" class="form-control mb-10" name="heading1" value="<?php print_r($admin_info[0]['name']); ?>" />
                            </div>
                            <div class="form-group">
                              <label>Email</label>
                              <input type="text" id="email_v" class="form-control mb-10" name="subject" value="<?php print_r($admin_info[0]['email']); ?>" />
                            </div>
                            <input type="hidden"  name="id" value="<?php print_r($admin_info[0]['id']); ?>"><br/>
                            <input type="Submit" class="btn btn-primary" value="Save">
                            <a role="button" tabindex="0" class="text-uppercase text-strong text-sm mr-10 btn btn-primary" data-toggle="modal" data-target="#changePass" data-options="changePass">Change Password</a>
                          </div>
                        </div>
                      </form>
                    </div>
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
<!--/ CONTENT -->
<div class="modal splash fade" id="changePass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title custom-font">Change Password</h3>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Old Password <span class="required"> *</span></label>
          <input type="password" class="form-control" id="old_password" autocomplete="off" value="" name="old_password">
        </div>
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

<script>

   $('#save_email').submit(function(e){
       Swal({
  title: "Confirm Password",
  text: "Please verify your password",
  input: "password",/*
  Type: "password",*/
  type: 'success',
   showCloseButton: false,
  showCancelButton: true,
/*}, */

 preConfirm: function (value) {
   var name_v = $('#name_v').val();
   var email_v = $('#email_v').val();
      if (!value) {
        Swal.showValidationMessage('You need to write something!')
      }else{

        $.ajax({
        method : "POST",
        url : "<?php echo site_url('admin/checkPass'); ?>",
        data : {password : value, name : name_v, email : email_v}
    }).then(function(res){
        response = JSON.parse(res);
        if(response.success == true)
        {
          swal("Profile Update successfully", response.msg, 'success');
          return true;
        }else{
          swal("Error", response.msg, 'error');
          return false;
        }
    })


      }
    },
  });

  e.preventDefault();
  //e.preventDefault();

    });
  $('#changePassButton').click(function(){
      var old_password = $('#old_password').val();
      var new_password = $('#new_password').val();
      var confirm_password = $('#confirm_password').val();
      var id = $('#profile_id').val();
      if(old_password != '' && new_password != '' && confirm_password != '')
      {

        if(new_password == confirm_password)
        {
          $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/profile_changePassword'); ?>",
            data : {old_password : old_password, new_password : new_password , id : id}
          }).then(function(res){
            response = JSON.parse(res);
            console.log(response.success);  
            if(response.success == true)
            {
              $('#old_password').val('');
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