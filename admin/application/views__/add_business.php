<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
        console.log("user Email exist");
    </script>

<?php } ?>
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
                  <form class="form-horizontal" name="form3" role="form" id="form3" method="post" enctype="multipart/form-data" action="<?php echo site_url('admin/add_business'); ?>">
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Business Name <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="business_name" class="form-control mb-10" placeholder="Business Name" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Address Line 1 <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="address_line_1" class="form-control" placeholder="Address Line 1" required>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Address Line 2</label>
                           <div class="">
                              <input type="text" name="address_line_2" class="form-control mb-10" placeholder="Address Line 2">
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Phone <span class="required"> *</span></label>
                           <div class="">
                              <input type="number" name="phone" class="form-control" placeholder="Phone" required>
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
                                 <option value="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></option>
                                 <?php } ?>
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">State <span class="required"> *</span></label>
                           <div class="">
                              <select class="form-control mb-10" id="state" required="" name="state">
                                 <option value="">Please Select country first</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">City <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="city" class="form-control" placeholder="City" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Zip Code <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="zipcode" class="form-control" placeholder="Zip Code" required>
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Email Address <span class="required"> *</span></label>
                           <div class="">
                              <input type="email" name="email" class="form-control" placeholder="Email Address" required>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Field of work/Industry <span class="required"> *</span></label>
                           <div class="">
                              <select class="form-control mb-10" name="field_of_intrest" required>
                                 <option value="">Select Field of work/Industry</option>
                                 <?php foreach ($field_of_intrest as $key1 => $value1) { ?>
                                 <option value="<?php echo $value1['id']; ?>"><?php echo $value1['name']; ?></option>
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
                              <textarea type="text" name="discriotion_of_business" class="form-control" placeholder="Discription of business (BIO) " required></textarea>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Upload Picture</label>
                           <div class="">
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
                                 <option value="<?php echo $value2['id']; ?>"><?php
                                    echo $value2['size']; ?></option>
                                 <?php } ?> 
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Location of headquarters</label>
                           <div class="">
                              <input type="text" name="location" placeholder="Location of headquarters" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Company Type</label>
                           <div class="">
                              <select name="company_type" class="form-control">
                                 <option value="">Select company size</option>
                                 <?php
                                    foreach ($company_type as $key3 => $value3) { ?>
                                 <option value="<?php echo $value3['id']; ?>"><?php
                                    echo $value3['name']; ?></option>
                                 <?php } ?> 
                              </select>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Date founded</label>
                           <div class="">
                              <input type="text" id="date_founded" name="date_founded" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Website</label>
                           <div class="">
                              <input type="url" name="website" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Password</label>
                           <div class="">
                              <input type="password" autocomplete="off" id="password" name="password" class="form-control">
                           </div>
                        </div>
                        <div class="col-md-6">
                           <label class=" control-label">Confirm password</label>
                           <div class="">
                              <input type="password" name="confirm_password" class="form-control">
                           </div>
                        </div>
                     </div>
                     <hr class="line-dashed line-full" />
               </div>
                   <div class="tile-footer bg-tr-black lter dvd dvd-top">
                        <button type="submit" class="btn btn-success" id="form3Submit">Add Business</button>
                   </div>
                </form>
            </section>
         </div>
      </div>
   </div>
</section>
<script type="text/javascript">
   $('#date_founded').datepicker({dateFormat : 'dd-mm-yy',changeYear : true,changeMonth : true, yearRange: "-100:+0",maxDate : 0 });


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
            remote:{
                     type: "POST",
                     url: "admin/isEmailExist",  
                  }
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
            remote : 'Email already in use',
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
         $('.loader').show();
        $("#form3").submit();
    }

   })
</script>