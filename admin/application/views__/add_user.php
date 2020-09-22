<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>
<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Add User</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage User</a>
               </li>
               <li>
                  <a href="<?php echo site_url('add_user'); ?>">Add User</a>
               </li>
            </ul>
         </div>
      </div>
      <!-- row -->
      <div class="row">
         <!-- col -->
         <div class="col-md-12">
            <form id="add_user_form" class="form-horizontal" action="<?php echo site_url('admin/add_user'); ?>" method="post" role="form" enctype="multipart/form-data">
               <section class="tile">
                  <!-- tile header -->
                  <div class="tile-header dvd dvd-btm">
                     <h1 class="custom-font">Add User</h1>
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
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="first_name" class="control-label" >First Name <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" name="first_name" autocomplete="off" class="form-control" id="first_name">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="last_name" class="control-label" >Last Name <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" class="form-control" autocomplete="off" name="last_name" id="last_name">
                           <input type="hidden" name="login_id">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="email" class="control-label">Email <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" class="form-control" autocomplete="off" value="" name="email" id="email">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="contact" class="control-label">Contact</label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control numberOnly" name="contact" id="contact">
                           <!-- </div> -->
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="password" class="control-label">Password <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="password" autocomplete="off" name="password" class="form-control" id="password">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="confirm_password"  class="control-label">Confirm Password <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="password" autocomplete="off" name="confirm_password" class="form-control" id="confirm_password">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="country"  class="control-label">Country <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <select class="form-control" name="country" id="country">
                              <option value="">Select Country</option>
                              <?php foreach ($countries as $key => $value) { ?>
                              <option value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                              <?php } ?>
                           </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="country" class="control-label">City <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="city" id="city">
                           <!-- </div> -->
                        </div>

                        
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="zip_code" class="control-label">Zip Code</label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="zip_code" id="zip_code">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="dob" class="control-label">Date Of Birth <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text"  class="form-control" autocomplete="off" name="dob" id="dob">
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
                           </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="" class="control-label">Gender <span class="required">*</span></label>
                           <div class="row" style="padding-left: 15px; ">
                              
                           <label class="checkbox col-sm-2 checkbox-custom">
                           <input name="gender" checked="checked" value="1" type="radio"><i></i> Male
                           </label>
                           <label class="checkbox col-sm-4 checkbox-custom">
                           <input name="gender" value="2" type="radio"><i></i> Female
                           </label>
                           </div>
                        </div>
                     </div>
                     <!-- <hr class="line-dashed line-full"> -->
                     <?php /*<h4 class="title">More About You</h4>
                     <div class="row">
                        <div class="col-md-6 col-lg-6">
                           <label for="profile_image" class="control-label">Upload Image</label>
                           <!-- <div class=""> -->
                           <input type="file" class="form-control" name="profile_image" id="profile_image">
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
                        <!-- <div class="col-lg-6 col-md-6">
                           <label for="interest_1" class="control-label">Primary Field of Interest <span class="required"> *</span></label> -->
                           <!-- <div class=""> -->
                          <!--  <select class="form-control" name="interest_1" id="interest_1">
                              <option value="">Select primary field of intrest</option>
                              <?php foreach($intrest as $key => $value){ ?>
                                <option value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                              <?php } ?>
                           </select> -->
                           <!-- </div> -->
                        <!-- </div> -->
                     </div>
                     
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="interest_2" class="control-label" style="padding-right: 0px;">Secondary Field of Interest</label>
                           <!-- <div class=""> -->
                           <select class="form-control" id="interest_2" name="interest_2">
                              <option value="">Select Secondary Field of Interest</option>
                               <?php foreach($intrest_2 as $key => $value){ ?>
                                <option value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                              <?php } ?>
                           </select>
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="college_attending" class="control-label" style="padding-left: 0px;">College Attending <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="college_attending" id="college_attending">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="college_start_date" class="control-label" style="padding-right: 0px;">College Start Date <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="college_start_date" id="college_start_date">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="college_end_date" class="control-label" style="padding-left: 0px;">College End Date <span class="required"> *</span> </label>
                           <!-- <div class=""> -->
                           <input type="text" autocomplete="off" class="form-control" name="college_end_date" id="college_end_date">
                           <!-- </div> -->
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <h4 class="title">Create Password</h4>
                     <div class="row">
                        <div class="col-lg-6 col-md-6">
                           <label for="password" class="control-label">Password <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="password" autocomplete="off" name="password" class="form-control" id="password">
                           <!-- </div> -->
                        </div>
                        <div class="col-md-6 col-lg-6">
                           <label for="confirm_password"  class="control-label">Confirm Password <span class="required"> *</span></label>
                           <!-- <div class=""> -->
                           <input type="password" autocomplete="off" name="confirm_password" class="form-control" id="confirm_password">
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
                           <textarea name="work_like_to_do" autocomplete="off" class="form-control"></textarea>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>How many hours per week will you be available to work? <span class="required"> *</span></label>
                           <select name="work_hours" class="form-control">
                              <option disabled="" selected="" value="">Select Hours Per Week</option>
                                <option value="1-5">1-5</option>
                                <option value="6-10">6-10</option>
                                <option value="11-15">11-15</option>
                                <option value="16-20">16-20</option>
                                <option value="21-25">21-25</option>
                                <option value="26-30">26-30</option>
                                <option value="31-35">31-35</option>
                                <option value="40-46">40-46</option>
                                <option value="40+">40+</option></select>
                           </select>
                        </div>
                     </div>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <label>How far away from your provided location are you willing to travel? <span class="required">*</span></label>
                           <select name="travel_distance" class="form-control">
                                <option  disabled="" selected="" value="">Select Location</option>
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
                           <textarea name="about_myself" autocomplete="off" class="form-control"></textarea>
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
                     */?>
                     <hr class="line-dashed line-full">
                     <div class="row">
                        <div class="col-sm-12">
                           <!-- <button type="reset" class="btn btn-lightred">Cancel</button> -->
                           <button type="submit" class="btn btn-primary col-md-2 btn-md pull-right">Add User</button>
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
    var new_id = makeid(3); 
    var refrence_html = '<div class="refrence_boxs"> <h5 class="refrence_count">Refrence 1</h5> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Name</label> <input type="text" name="refrence_name[]" id="name_'+new_id+'" class="form-control"> <label for="name_'+new_id+'" class="error"></label></div><div class="col-md-6 col-lg-6"> <label>Relationship</label> <input type="text" name="refrence_relation[]" id="relation_'+new_id+'" class="form-control"> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Years Known</label> <select id="year_known_'+new_id+'" name="year_known[]" class="form-control"> <option value="">Select Year</option> <option value="2">2 years</option> <option value="3">3 years</option> <option value="4">4 years</option> <option value="5">5 years</option> </select> </div><div class="col-md-6 col-lg-6"> <label>Months Known</label> <select id="month_known_'+new_id+'" name="month_known[]" class="form-control"> <option>Select month</option> <option value="2 month">2 month</option> <option value="3 month">3 month</option> <option value="4 month">4 month</option> <option value="5 month">5 month</option> </select> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Employer</label> <input type="text" id="employer_'+new_id+'" name="employer[]" class="form-control"> </div><div class="col-md-6 col-lg-6"> <label>Current Position</label> <input id="current_position_'+new_id+'" type="text" name="current_position[]" class="form-control"> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Phone #</label> <input type="number" id="phone_'+new_id+'" name="phone[]" class="form-control numberOnly"> </div><div class="col-md-6 col-lg-6"> <label>Email Address</label> <input type="email" name="refrence_email[]" id="email_'+new_id+'" class="form-control"> </div></div></div>';
    $('.refrence').on('change', function(){
        if($('#refrence_yes').prop('checked') == true)
        {
            refrence_html_2 = '<div id="another_refrence_box" ></div><div class="row"> <div class="col-md-6 col-lg-6"><br><span onclick="append_refrence_function()" id="another_refrence_button" class="btn btn-primary">Add another refrence</span></div></div>';
            $('#refrecnce_main_box').html(refrence_html+refrence_html_2);
            $('.numberOnly').on('keypress', function(e){
               if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                  e.preventDefault();
               }
            });

            $('.numberOnly').on('change', function(e){
               var reg =  new RegExp('^[0-9]*$');
               var value = $('.numberOnly').val();
               if(reg.test(value) == false)
               {
                  $(this).val('');
               }
            });
        }else{
            $('#refrecnce_main_box').html('');
        }
    })
    
    function append_refrence_function()
    {
        var id = makeid(6);
        var new_id = makeid(3); 
    var refrence_html = '<div class="refrence_boxs"> <h5 class="refrence_count">Refrence 1</h5> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Name</label> <input type="text" name="refrence_name[]" id="name_'+new_id+'" class="form-control"> <label for="name_'+new_id+'" class="error"></label></div><div class="col-md-6 col-lg-6"> <label>Relationship</label> <input type="text" name="refrence_relation[]" id="relation_'+new_id+'" class="form-control"> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Years Known</label> <select id="year_known_'+new_id+'" name="year_known[]" class="form-control"> <option value="">Select Year</option> <option value="2">2 years</option> <option value="3">3 years</option> <option value="4">4 years</option> <option value="5">5 years</option> </select> </div><div class="col-md-6 col-lg-6"> <label>Months Known</label> <select id="month_known_'+new_id+'" name="month_known[]" class="form-control"> <option value="">Select month</option> <option value="2 month">2 month</option> <option value="3 month">3 month</option> <option value="4 month">4 month</option> <option value="5 month">5 month</option> </select> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Employer</label> <input type="text" id="employer_'+new_id+'" name="employer[]" class="form-control"> </div><div class="col-md-6 col-lg-6"> <label>Current Position</label> <input id="current_position_'+new_id+'" type="text" name="current_position[]" class="form-control"> </div></div><hr class="line-dashed line-full"> <div class="row"> <div class="col-md-6 col-lg-6"> <label>Phone #</label> <input type="number" id="phone_'+new_id+'" name="phone[]" class="form-control numberOnly"> </div><div class="col-md-6 col-lg-6"> <label>Email Address</label> <input type="email" name="refrence_email[]" id="email_'+new_id+'" class="form-control"> </div></div></div>';
        var refrence_html_1 = '<div id="'+id+'"><span class="btn btn-default btn-round" onclick="remove_refrence('+id+')"> X </span>';
        $('#another_refrence_box').append(refrence_html_1+refrence_html+'</div><hr class="line-dashed line-full"> ');
        $('.refrence_boxs').each(function(index){
            $($(this).children()[0]).text('Refrence '+(index+1));
        }); 
    }
    function remove_refrence(id)
    {
        $(id).remove();
         $('.refrence_boxs').each(function(index){
            $($(this).children()[0]).text('Refrence '+(index+1));
        });
    }
    
    $('#college_start_date, #dob, #college_end_date').keypress(function(e){
      e.preventDefault();  
    });

    $('#college_start_date, #dob, #college_end_date').change(function(e){
      if(Date.parse($(this).val()))
      {  
         var date_array = $(this).val().split('-');
         if(date_array.length != 3)
         {
            $(this).val('');
         }
      }else{
         $(this).val('');
      }
    });
function makeid(length) {
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

              return text;
            }

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
   
   $("#add_user_form").validate({
      //onkeyup: false,
      rules: {
         first_name : {
            required: true,
         },
         last_name : {
            required: true,
         },
         email : {
            required: true,
            email:true,
            remote: {
                      type: "POST",
                      url: "admin/isEmailExist",                      
                     },
         },
         country : {
            required: true,
         },
         city : {
            required: true,
         },
         dob : {
            required: true,
         },
         state : {
            required: true,
         },
         gender : {
            required: true,
         },
         interest_1 : {
            required: true,
         },
         college_attending : {
            required: true,
         },
         college_start_date : {
            required: true,
         },
         college_end_date : {
            required: true,
         },
         password : {
            required: true,
         },
         confirm_password : {
            required: true,
            equalTo : password
         },
         work_like_to_do : {
            required: true,
         },
         work_hours : {
            required: true,
         },
         travel_distance : {
            required: true,
         },
         transportation : {
            required: true,
         },
         'refrence_name[]' : {
            required: true,
         },
         'refrence_relation[]' : {
            required: true,
         },
         'year_known[]' : {
            required: true,
         },
         'month_known[]' : {
            required: true,
         },
         'employer[]' : {
            required: true,
         },
         'current_position[]' : {
            required: true,
         },
         'phone[]' : {
            required: true,
         },
         'refrence_email[]' : {
            required: true,
         },

      },
      messages : {
         first_name : {
            required: 'Please enter user first name',
         },
         last_name : {
            required: 'Please enter user last name',
         },
         email : {
            required: 'Please enter user email id',
            remote: 'Email already in use',
         },
         country : {
            required: 'Please select user country',
         },
         city : {
            required: 'Please enter user city',
         },
         dob : {
            required: 'Please select user date of birth',
         },
         state : {
            required: 'Please select user state',
         },
         gender : {
            required: 'Please select user gender',
         },
         interest_1 : {
            required: 'Please select user primary field of intrest',
         },
         college_attending : {
            required: 'Please select user college attending',
         },
         college_start_date : {
            required: 'Please select user college start date',
         },
         college_end_date : {
            required: 'Please select user college end date',
         },
         password : {
            required: 'Please enter user password',
         },
         confirm_password : {
            required: 'Please enter confirm password',
         },
         work_like_to_do : {
            required: 'Please enter description of work you like',
         },
         work_hours : {
            required: 'Please select working hours',
         },
         travel_distance : {
            required: 'Please select distance',
         },
         transportation : {
            required: 'Please select transportation',
         },
         'refrence_name[]' : {
            required: 'Please enter refrence name',
         },
         'refrence_relation[]' : {
            required: 'Please enter refrence relation',
         },
         'year_known[]' : {
            required: 'Please select year known',
         },
         'month_known[]' : {
            required: 'Please select month known',
         },
         'employer[]' : {
            required: 'Please enter employer',
         },
         'current_position[]' : {
            required: 'Please enter current position',
         },
         'phone[]' : {
            required: 'Please enter phone',
         },
         'refrence_email[]' : {
            required: 'Please enter email id',
         },
      }, 
      submitHandler: function(form) {
          $('.loader').show();
          $('#add_user_form').submit();
      return true;
    }
   })
</script>
