<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->

<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Manage Email Template</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage  Header And Footer</a>
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
                  <h1 class="custom-font"> Manage  Header And Footer </h1>
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                               <div class="create_mail_templates">
                                        <form id="save_email" method="POST"  action="<?php echo site_url('admin/update_email_header_footer'); ?>">
                                        <div class="row"> 
                                        <div class="col-lg-12">  
                                         
                                      
                                      <div class="form-group">
                                        <label>Header</label>
                                        <textarea id="editor1" class="form-control" name="header"><?php print_r($email_header_footer[0]['header_html']); ?></textarea>
                                      </div>

                                       <div class="form-group">
                                        <label>Footer</label>
                                        <textarea id="editor2" class="form-control" name="footer"><?php print_r($email_header_footer[0]['footer_html']); ?></textarea>
                                      </div>
                                       <input type="hidden"  name="id" value="<?php print_r($email_header_footer[0]['id']); ?>"><br/>
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
CKEDITOR.replace( 'editor2' );

</script>