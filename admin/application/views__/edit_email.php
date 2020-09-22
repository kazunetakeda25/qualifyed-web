<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->

<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Create Email Template</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Create Email Template</a>
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
                  <h1 class="custom-font"> Create Email Template </h1>
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                               <div class="create_mail_templates">
                                        <form id="save_email" method="POST"  action="<?php echo site_url('admin/update_email_template'); ?>">
                                        <div class="row"> 
                                        <div class="col-lg-12">  
                                          <div class="form-group">
                                           <label>Heading</label> 
                                        <input type="text" class="form-control mb-10" name="heading1" value="<?php print_r($email_templates[0]['heading']); ?>" />
                                      </div>
                                      <div class="form-group">
                                        <label>Subject</label>
                                        <input type="text" class="form-control mb-10" name="subject" value="<?php print_r($email_templates[0]['subject']); ?>" />
                                      </div>
                                      <div class="form-group">
                                        <label>Content</label>
                                        <textarea id="editor1" class="form-control" name="body"><?php print_r($email_templates[0]['body']); ?></textarea>
                                      </div>
                                        <input type="hidden"  name="id" value="<?php print_r($email_templates[0]['id']); ?>"><br/>
                                        <input type="Submit" class="btn btn-primary" value="Save">

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
<script>
CKEDITOR.replace( 'editor1' );
</script>