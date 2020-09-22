<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } 
echo '<pre>';
print_r($users_education);
echo '</pre>';
die;
?>
<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Edit User</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage User</a>
               </li>
               <li>
                  <a href="<?php echo site_url('edit_user/1'); ?>">Edit User</a>
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
                     <h1 class="custom-font">Edit User</h1>
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
                     <h3 class="title">Personal Info</h3>
                     <hr class="line-dashed line-full">
                     <h4 class="title">About You</h4>
                       <form id="add_user_form" class="form-horizontal">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="first_name" class="control-label" >First Name <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" name="first_name" autocomplete="off" class="form-control" id="first_name" value="<?php echo $user['fname'] ?>">
                           <input type="hidden" value="<?php echo $user['id'] ?>" name="id">
                           <input type="hidden" value="<?php echo $user['login_id'] ?>" name="login_id">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="last_name" class="control-label" >Last Name <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" class="form-control" autocomplete="off" name="last_name" id="last_name" value="<?php echo $user['lname'] ?>">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="email" class="control-label">Email <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="email" class="form-control" autocomplete="off" value="<?php echo $user['email'] ?>" name="email" id="email">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="contact" class="control-label">Contact</label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control numberOnly" name="contact" id="contact" value="<?php echo $user['phone']?>">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="country"  class="control-label">Country <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <?php // echo "<pre>";print_r($countries); ?>
                              <select class="form-control mb-10" name="country" id="country" required="">
                                 <option value="">Select Country</option>
                                 <?php foreach ($countries as $key => $value) { ?>
                                 <option <?php if ($value['id'] == $user['country_id']) { echo "selected='selected'"; } ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                                 <?php } ?>
                              </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="country" class="control-label">City <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="city" id="city" value="<?php echo $user['city'] ;?>">
                           <!-- </div> -->
                        </div>

                        
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="zip_code" class="control-label">Zip Code</label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="zip_code" id="zip_code" value="<?php echo $user['zipCode'] ;?>">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="dob" class="control-label">Date Of Birth <span class="required" > *</span></label>
                           <!-- <div class=""> -->
                           <input type="text"  class="form-control" autocomplete="off" name="dob" id="dob" value="<?php echo $user['dob'] ;?>">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="state" class="control-label">State <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <select class="form-control" name="state" id="state">
                              <option value="">Select State</option>
                               <?php foreach ($state as $key => $value) { ?>
                                 <option <?php if ($value['id'] == $user['state_id']) { echo "selected='selected'"; } ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                                 <?php } ?>

                           </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="" class="control-label">Gender <span class="required">*</span></label>
                           <div class="row" style="padding-left: 15px; ">
                           <label class="checkbox col-sm-2 checkbox-custom">
                           <input name="gender" <?php if ($user['gender'] == 1) { echo "checked='checked'"; } ?> value="1" type="radio"><i></i> Male
                           </label>
                           <label class="checkbox col-sm-4 checkbox-custom">
                           <input name="gender" <?php if ($user['gender'] == 2) { echo "checked='checked'"; } ?>  type="radio" value="2"><i></i> Female
                           </label>
                           </div>
                        </div>
                     </div>
                     <br>
                     <input  type="submit" class="btn btn-primary col-md-2 btn-md pull-left" name="save" value="Save">
                     <br>
                  </form>
                     <hr class="line-dashed line-full">
                     <h4 class="title">More About You</h4>
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="profile_image" class="control-label">Upload Image</label>
                           <!-- <div class=""> -->
                           <input type="file" class="form-control" name="profile_image" id="profile_image" value>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="resume" class="control-label" style="padding-left: 0px;">Upload Resume</label>
                           <!-- <div class=""> -->
                           <input type="file" name="resume" class="form-control" id="resume">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="video" class="control-label" style="padding-right: 0px;">Upload Bio Video</label>
                           <!-- <div class=""> -->
                           <input type="file" class="form-control" name="video" id="video">
                           <!-- </div> -->
                        </div>
                        <div class="col-lg-6 col-md-6">
                           <label for="interest_1" class="control-label">Primary Field of Interest <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <select class="form-control" name="interest_1" id="interest_1">
                              <option value="">Select primary field of intrest</option>
                              <?php foreach ($master_primary_field_interest as $key => $value) { ?>
                              <option <?php if ($value['id'] == $other_info['primary_field_interest_id']) { echo "selected='selected'"; } ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                              <?php } ?> 

                           </select>
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="interest_2" class="control-label" style="padding-right: 0px;">Secondary Field of Interest</label>
                           <!-- <div class=""> -->
                           <select class="form-control" id="interest_2" name="interest_2">
                              <option value="">Select Secondary Field of Interest</option>
                               <?php foreach ($master_secondary_field_interest as $key => $value) { ?>
                              <option <?php if ($value['id'] == $other_info['secondry_interest_id']) { echo "selected='selected'"; } ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                              <?php } ?>
                           </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="college_attending" class="control-label" style="padding-left: 0px;">College Attending <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="college_attending" id="college_attending" >
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="college_start_date" class="control-label" style="padding-right: 0px;">College Start Date <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="college_start_date" id="college_start_date" value="<?php echo $users_education['collage_start_date']; ?>">

                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="college_end_date" class="control-label" style="padding-left: 0px;">College End Date <span class="required"> *</span> </label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control hasDatepicker" name="college_end_date" id="college_end_date" value="<?php echo $users_education['collage_end_date'] ?>">
                           <!-- </div> -->
                        </div>
                     </div>
                     <!-- <hr class="line-dashed line-full"> -->
                  </div>
                  <!-- /tile body -->
               </section>
               <section class="tile">
                  <div class="tile-body">
                     <h3>About Work</h3>
                     <hr class="line-dashed line-full">
                     <h4>Work preferences/availability and additional info</h4>
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>Please Provide a brief description of the work you would like be doing and/or what you would like to learn <span class="required"> *</span></label>
                           <textarea name="work_like_to_do" autocomplete="off" class="form-control"> <?php echo $other_info['work_additional_info'];?></textarea>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>How many hours per week will you be available to work? <span class="required"> *</span></label>
                           <select name="work_hours" class="form-control">
                              <option disabled="" selected="" value=""><?php echo $other_info['hours_per_week'];?></option>
                                <option value="1-5">1-5</option>
                                <option value="6-10" >6-10</option>
                                <option value="11-15">11-15</option>
                                <option value="16-20">16-20</option>
                                <option value="21-25">21-25</option>
                                <option value="26-30">26-30</option>
                                <option value="31-35">31-35</option>
                                <option value="46-40">40-46</option>
                                <option value="40+">40+</option></select>

                           </select>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>How far away from your provided location are you willing to travel? <span class="required">*</span></label>
                           <select name="travel_distance" class="form-control">
                                <option  disabled="" selected="" value=""><?php echo $other_info['travel_location'];?></option>
                                <option  value="50+" >50+</option>
                                <option  value="60+" >60+</option>
                                <option  value="70+" >70+</option>
                                <option  value="80+" >80+</option>
                           </select>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label class="col-sm-12">Do you have a reliable means of transportation? <span class="required"> *</span></label>
                           <label class="checkbox col-sm-2 checkbox-custom">
                           <input name="transportation" value="1" checked="" type="radio"><i></i> Yes
                           </label>
                           <label class="checkbox col-sm-4 checkbox-custom">
                           <input name="transportation" value="0" type="radio"><i></i> No
                           </label>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>Please list all additional applicable skills and/or experience</label>
                           <textarea name="skills" autocomplete="off" class="form-control"></textarea>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label class="col-sm-12">In 500 words or less, tell us a little bit about yourself (Bio)</label>
                           <textarea name="about_myself" autocomplete="off" class="form-control"><?php echo $other_info['about_bio']; ?></textarea>
                        </div>
                     </div>
                  </div>
               </section>
               <section class="tile">
                  <div class="tile-body">
                     <h3>Reference</h3>
                     <hr class="line-dashed line-full">
                     <h4>Any References?</h4>
                     <div class="row">
                        <label class="col-md-2">Have any refrence ?</label>
                         <label class="checkbox col-sm-1 checkbox-custom refrence">
                           <input name="refrence" id="refrence_yes" type="radio"><i></i> Yes
                           </label>
                           <label class="checkbox col-sm-4 checkbox-custom refrence">
                           <input name="refrence" id="refrence_no" checked="checked" type="radio"><i></i>No
                           </label>
                     </div>
                     <div id="refrecnce_main_box">
                        
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-sm-12">
                           <!-- <button type="reset" class="btn btn-lightred">Cancel</button> -->
                           
                        </div>
                     </div>
                  </div>
               </section>
            </form>
            <!-- tile -->
            <!-- /tile -->
         </div>
         <!-- /col -->
      </div>
      <!-- /row -->
   </div>
</section>
<!--/ CONTENT -->


<script type="text/javascript">
        
        $('#add_user_form').submit(function(e){
      e.preventDefault();
      if($('input').val() == '')
      {
        swal('ERROR',"Please fill empty field", 'error');

      }else{
         var formData = $(this).serializeArray()
         $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/update_user_form1'); ?>",
            data : formData,
         }).then(function(res){
            response = JSON.parse(res);
            if(response.success == true)
            {
               swal(response.error_type, response.msg, response.error_type).then(function(){
                  location.reload(true);
               });
            }else{
               swal(response.error_type, response.msg, response.error_type);
            }
         });
      }
    })
    

     $('#dob').datepicker({
      changeYear : true,
      changeMonth : true,
      yearRange : '-100:-16',
      dateFormat: 'yy-mm-dd',
    });

    $('#college_start_date').datepicker({
       dateFormat: 'yy-mm-dd',
       changeYear : true,
       changeMonth : true,
       yearRange : '-100:+0',
       onSelect: function(dateText) {
         $('#college_end_date').val('');
         $('#college_end_date').datepicker({
            maxDate : dateText,
            dateFormat: 'yy-mm-dd',
            changeYear : true,
            changeMonth : true,
         });

       } 
    })
   
</script>
