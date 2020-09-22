<?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
        console.log("user Email exist");
    </script>

<?php } ?>
<script src="<?php //echo base_url('ckeditor/ckeditor.js');?>"></script>
<section id="content">
   <div class="page page-forms-validate">
      <div class="pageheader">
         <h2>Edit CMS Page</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="#"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage CMS Page</a>
               </li>
               <li>
                  <a href="#">Edit CMS Page</a>
               </li>
            </ul>
         </div>
      </div>
      <div class="row">
         <div class="col-md-12">
            <section class="tile">
               <div class="tile-header dvd dvd-btm">
                  <h1 class="custom-font">Edit CMS Page  </h1>
               </div>
               <div class="tile-body">
                  <form class="form-horizontal" name="form3" role="form" id="form3" method="post" enctype="multipart/form-data" action="<?php echo base_url('cms-edit-page/'.$data['id']);?>">
                     <div class="row p-5">
                        <div class="col-md-6">
                           <label class=" control-label">Page Title <span class="required"> *</span></label>
                           <div class="">
                              <input type="text" name="page_title" class="form-control mb-10" placeholder="Business Name" id="page_title" value="<?php echo $data['title'];?>" required>
                           </div>
                        </div>                        
                     </div>

                     <div class="row p-5">
                        <div class="col-md-12">
                           <label class=" control-label">Page Content <span class="required"> *</span></label>
                           <div class="">
                              <textarea type="text" name="content" id="content1" placeholder="Page Content" required cols="70" rows="7" class="ckeditor"><?php echo $data['content'];?></textarea>
                           </div>
                        </div>                        
                     </div>                    
                    <!-- <div class="row p-5">
                       <div class="col-md-6">
                          <label class=" control-label">Content <span class="required"> *</span></label>
                          <div class="">
                            <textarea name="content" id="content" rows="10" cols="10"></textarea>
                          </div>
                       </div>
                    </div>  -->
                     <hr class="line-dashed line-full" /> 
              		
                    <div class="tile-footer bg-tr-black lter dvd dvd-top">
                        <button type="submit" class="btn btn-success" id="form3Submit" name="submit">Update Data</button>
                   </div>
                </form>
            </div>
            </section>
         </div>
      </div>
   </div>
</section>

<script>
                 // Replace the <textarea id="editor1"> with a CKEditor
                 // instance, using default configuration.
                 //CKEDITOR.replace('content');
 </script>