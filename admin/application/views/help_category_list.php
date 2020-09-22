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
        <?php if($pageType == 1){
          ?>
         <h2>Help Category List</h2>
        <?php }else{ ?>

         <h2>'<?php echo $title; ?>' Sub Category List</h2>
        <?php } ?>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#"><?php if($pageType == 1){
          ?>
         <!-- Help Category List -->
         Manage Help Content
        
        <?php }else{ ?>

         Manage '<?php echo $title; ?>'  Sub Category
        <?php } ?></a>
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
                  <h1 class="custom-font"><?php if($pageType == 1){
          ?>
         Manage Help Content
        <?php }else{ ?>

         Manage '<?php echo $title; ?>'  Sub Category
        <?php } ?></h1>
                  
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                              <button class="btn btn-success" data-target="#addnewCat" data-toggle="modal">Add New Category</button>
                              <br><br>
                              <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Category Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Status</th>
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
                                       <td>
                                          <div class="onoffswitch greensea inline-block">
                                          <input type="checkbox" data-id="<?php echo $value['id']; ?>" name="onoffswitch" class="onoffswitch-checkbox user_status" id="switch<?php echo $key ?>" <?php if ($value['status'] == 1) {
                                                        echo "checked='checked'";
                                                    } ?>>
                                          <label class="onoffswitch-label" for="switch<?php echo $key ?>">
                                             <span class="onoffswitch-inner"></span>
                                             <span class="onoffswitch-switch"></span>
                                                    </label>
                                                </div>
                                       </td>                                      
                                       <td class="actions">
                                        <div class="dropdown">
                                            <button class="btn btn-teal dropdown-toggle btn-sm" type="button" data-toggle="dropdown">Actions
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu">
                                          <li>
                                            <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#category_modal" data-options="splash-2 splash-ef-4">Edit</a>
                                          </li>   
                                          <?php if($pageType == 1){
                                            ?>
                                           <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['id']; ?>" href="<?php echo site_url('help-content-subCategories/'. $value['id']) ?>">View Sub categories</a>
                                          </li> 
                                          <?php }else{ ?>
                                          <li>
                                            <a role="button" tabindex="0" class="changePP text-info text-uppercase text-strong text-sm mr-10 " data-id="<?php echo $value['id']; ?>" href="<?php echo site_url('view-question/'. $value['id']) ?>">View question's</a>
                                          </li> 
                                          <?php } ?>                                       
                                          
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

<div class="modal splash fade" id="category_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">View Category</h3>
          </div>
          <div class="modal-body table-responsive">
            <table class="table">
               <tr>
                  <td><label>Title <span class="required"> *</span></label></td>
                  <td width="80%"> <input type="text" name="category_title" id="category_title" value="" size="60"></td>
               </tr>
               <input type="hidden" name="help_category_id" id="help_category_id" value="">
            </table>
            <!-- <div class="form-group">
                <label>Title <span class="required"> *</span></label>
                <input type="text" name="category_title" id="category_title" value="">
            </div> -->
          </div>
          <div class="modal-footer">
              <button class="btn btn-default btn-border" id="update_category">Update</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>

<div class="modal splash fade" id="addnewCat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">Add Category</h3>
          </div>

          <div class="modal-body table-responsive">
            <label>Title <span class="required"> *</span></label>
            <input type="text" name="title" value="" class="form-control">
            <?php if (isset($id) && !empty($id)) { ?>
              <input type="hidden" value="<?php echo $id; ?>" name="parent_id">
            <?php } ?>
          </div>
          <div class="modal-footer">
              <button class="btn btn-default btn-border" id="insert_category">Save</button>
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
    $('.user_status').on('change', function()
    {
        if($(this).prop('checked') == true)
        {
            status = 1;
        }
        else
        {
            status = 0;
        }
        $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/updateCategoryStatus'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Category Status Update Successfully','success');
        })
    });
    $('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : '<?php echo site_url('admin/getCategoryData'); ?>',
        data : {id : id}
      }).then(function(res){
        var json = JSON.parse(res);
        //console.log(json.data);
        var category_title = json.data.title;
        $("#category_title").val(category_title);
        $("#help_category_id").val(json.data.id);
      });
    }); // END OF VIEW CLASS


    $('#update_category').click(function()
    {
      /*var old_password = $('#old_password').val();*/
      var title = $('#category_title').val();      
      var id = $('#help_category_id').val();


      if(title != '' && id != '')
      {        
         $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/updateCategoryData'); ?>",
            data : {title : title , id : id}
          }).then(function(res){
            response = JSON.parse(res);
            console.log(response.msg);  
            if(response.msg == true)
            {
               swal("Category updated", response.msg, 'success');
               //$('#category_modal').modal('toggle');
               location.reload(true);
            }else{
              swal("Error", response.msg, 'error');
            }
         });
      }
      else
      {
          swal("Field required", "Please fill required fileds", 'error');
      }
    });
    $('#insert_category').on('click', function(){
      var title = $('input[name="title"]').val();
      var id = $('input[name="parent_id"]').val();
      if(id == '' || id == undefined || id == null)
      {
        id = 0;
      }

      if(title != '')
      {        
         $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/insertNewCategory'); ?>",
            data : {title : title , parent_id : id}
          }).then(function(res){
            response = JSON.parse(res);
             swal("Category added", response.msg, 'success');
             location.reload(true);
         });
      }
      else
      {
          swal("Field required", "Please fill required fileds", 'error');
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