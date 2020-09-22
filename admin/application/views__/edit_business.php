<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");

    </script>
<?php } ?>
<?php // echo "<pre>"; print_r($businessData);exit(); ?>
<section id="content">
   <div class="page page-forms-validate">
      <div class="pageheader">
         <h2>Add Business</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="#"><i class="fa fa-home"></i>Qualifyed</a>
               </li>
               <li>
                  <a href="#">Manage Business</a>
               </li>
               <li>
                  <a href="form-validate.html">Add Business</a>
               </li>
            </ul>
         </div>
      </div>
      <div class="row">
         <div class="col-md-12">
            <section class="tile">
               <div class="tile-header dvd dvd-btm">
                  <h1 class="custom-font">Add Business  </h1>
               </div>
               <div class="tile-body">
                  <form class="form-horizontal" name="form3" role="form" id="form3" method="post" enctype="multipart/form-data" action="<?php echo site_url('admin/edit_business '); ?>">
                              <input type="hidden" name="login_id"  value="<?php echo $businessData['loginid'] ?>">
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Business Name <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="business_name" class="form-control mb-10" value="<?php echo $businessData['name'] ?>" placeholder="Business Name" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Address Line 1 <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="address_line_1" value="<?php echo $businessData['addressline1']; ?>" class="form-control" placeholder="Address Line 1" required>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Address Line 2</label>
                           <div class="">
                              <input type="text" value="<?php echo $businessData['addressline2']; ?>" name="address_line_2" class="form-control mb-10" placeholder="Address Line 2">
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Phone <span class="required"> *</span></label>
                           <div class="">
                              <input value="<?php echo $businessData['phone']; ?>" type="number" name="phone" class="form-control" placeholder="Phone" required>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Country <span class="required"> *</span></label>
                           <div class="">
                              <?php // echo "<pre>";print_r($countries); ?>
                              <select class="form-control mb-10" name="country" id="country" required="">
                                 <option value="">Select Country</option>
                                 <?php foreach ($countries as $key => $value) { ?>
                                 <option <?php if ($value['id'] == $businessData['country_id']) { echo "selected='selected'"; } ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                                 <?php } ?>
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">State <span class="required"> *</span></label>
                           <div class="">
                              <select class="form-control mb-10" id="state" required="" name="state">
                                 <option value="">Select State</option>
                                 <?php foreach($master_state as $key => $value){?>
                                    <option <?php if ($value['id'] == $businessData['state_id']): ?>
                                       selected="selected"
                                    <?php endif ?> value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                                 <?php } ?>
                              </select>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">City <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" value="<?php echo $businessData['city']; ?>" name="city" class="form-control" placeholder="City" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Zip Code <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="zipcode" class="form-control" placeholder="Zip Code" value="<?php echo $businessData['zipcode']; ?>" required>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Email Address <span class="required"> *</span></label>
                           <div class="">
                              <input type="email" name="email" value="<?php echo $businessData['email']; ?>"  class="form-control" placeholder="Email Address" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Field of work/Industry <span class="required"> *</span></label>
                           <div class="">
                              <select class="form-control mb-10" name="field_of_intrest" required>
                                 <option value="">Select Field of work/Industry</option>
                                 <?php foreach ($field_of_intrest as $key1 => $value1) { ?>
                                 <option <?php if ($businessData['work'] == $value1['id']): ?>
                                    selected = "selected"
                                 <?php endif ?> value="<?php echo $value1['id']; ?>"><?php echo $value1['name']; ?></option>
                                 <?php } ?>
                              </select>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Discription of business (BIO) <span class="required"> *</span></label>
                           <div class="">
                              <textarea type="text" name="discriotion_of_business" class="form-control" placeholder="Discription of business (BIO) " required><?php echo $businessData['description']; ?></textarea>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Upload Picture</label>
                           <div class="">
                              <img height="50" width="50" src="<?php echo base_url().'../src/assets/uploads/images/'.$businessData['profile']; ?>">
                              <input type="hidden" name="picture_id" value="<?php echo $businessData['profile_pic_id']; ?>">
                              <input type="hidden" name="old_picture" value="<?php echo $businessData['profile']; ?>">
                              <input type="file" name="upload_picture" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Upload Bio Video</label>
                           <div class="">
                              <input type="file" name="upload_bio_video" class="form-control">
                              <br>
                              <?php if($businessData['bio_video'] != ''){ ?>

                              <video height="140" controls style="border: 1px solid #ddd;">
                                 <source src="<?php echo base_url('../src/assets/uploads/bio_video/'.$businessData['bio_video']) ?>" type="">
                              </video>
                              <input type="hidden" name="video_id" value="<?php echo $businessData['bio_video_id']; ?>">
                              <input type="hidden" name="old_video" value="<?php echo $businessData['bio_video']; ?>">
                              <?php } ?>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class="
                              control-label">Company Size</label> 
                           <div class="">
                              <select name="company_size" class="form-control">
                                 <option value="">Select company size</option>
                                 <?php
                                    foreach ($company_size as $key2 => $value2) { ?>
                                 <option <?php if ($businessData['work'] == $value2['id']): ?>
                                    selected = "selected"
                                 <?php endif ?> value="<?php echo $value2['id']; ?>"><?php
                                    echo $value2['size']; ?></option>
                                 <?php } ?> 
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Location of headquarters</label>
                           <div class="">
                              <input type="text" value="<?php echo $businessData['location']; ?>" name="location" placeholder="Location of headquarters" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Company Type</label>
                           <div class="">
                              <select name="company_type" class="form-control">
                                 <option value="">Select company type</option>
                                 <?php
                                    foreach ($company_type as $key3 => $value3) { ?>
                                 <option <?php if ($businessData['companytype'] == $value3['id']): ?>
                                    selected = "selected"
                                 <?php endif ?> value="<?php echo $value3['id']; ?>"><?php
                                    echo $value3['name']; ?></option>
                                 <?php } ?> 
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Date founded</label>
                           <div class="">
                              <input type="text" id="date_founded" value="<?php echo $businessData['date']; ?>" name="date_founded" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Website</label>
                           <div class="">
                              <input type="url" value="<?php echo $businessData['website']; ?>" name="website" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
               </div>
                   <div class="tile-footer bg-tr-black lter dvd dvd-top">
                        <button type="submit" class="btn btn-success" id="form3Submit">Update Business</button>
                   </div>
                </form>
            </section>
         </div>
      </div>
   </div>
</section>
<script type="text/javascript">
   $('#date_founded').datepicker({dateFormat : 'yy-mm-dd',changeYear : true,changeMonth : true,maxDate : 0, yearRange: "-100:+0",});


   $("#form3").validate({
      rules: {
         business_name : {
            required: true,
         },
         address_line_1 : {
            required: true,
         },
         phone : {
            required: true,
         },
         country : {
            required: true,
         },
         city : {
            required: true,
         },
         state : {
            required: true,
         },
         password : {
            required: true,
         },
         confirm_password : {
            required: true,
            equalTo : $('#password')
         },
         email : {
            required: true,
         },

         zipcode : {
            required: true,
         },

         field_of_intrest : {
            required: true,
         },

         discriotion_of_business : {
            required: true,
         },

      },
      messages : {
         business_name : {
            required: 'Please enter business name',
         },
         address_line_1 : {
            required: 'Please enter address line 1',
         },
         phone : {
            required: 'Please enter phone number',
         },
         country : {
            required: 'Please select country',
         },
         city : {
            required: 'Please enter city',
         },
         state : {
            required: 'Please select state',
         },
         password : {
            required: 'Please enter password',
         },
         confirm_password : {
            required: 'Please enter confirm password',
            equalTo:  'Password and confirm password should be same',
         },
         email : {
            required : 'Please enter email',
         },
         zipcode : {
            required : 'Please enter zipcode',
         },
         field_of_intrest : {
            required : 'Please select field of work/industry',
         },
         discriotion_of_business : {
            required : 'Please enter discription of business',
         },
      }, 
      submitHandler: function(form) {
      $.ajax({
         data : new FormData(form),
         method : "POST",
         url : '<?php echo site_url('admin/edit_business'); ?>',
         cache:false,
         enctype: 'multipart/form-data',
         contentType: false,
       processData: false,
      }).then(function(res){
         var response = JSON.parse(res);
         swal('', response.msg, response.msg_type).then(function(){
            if(response.success == true)
            {
               window.location.href = "<?php echo site_url('admin/business_list'); ?>"
            }
         });
      })
      return false;
    }

   })
</script>