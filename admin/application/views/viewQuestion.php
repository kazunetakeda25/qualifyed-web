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
        <h2>View <?php echo $title; ?> Questions</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage <?php echo $title; ?> Questions</a>
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
                  <h1 class="custom-font">Manage <?php echo $title; ?> Questions</h1>
                  
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                      <div class="row">
                        <div class="col-sm-12">
                          <form id="form" action="<?php echo base_url('admin/viewQuestion/'.$id) ?>" method="post">
                           <!--  <div class="form-group"> -->
                              <label>Question</label>
                              <br>
                              <textarea id="questionInput" class="form-control" name="question"></textarea>
                              <p id="quError" class="error"></p>
                            <!-- </div> -->
                            <br>
                            <!-- <div class="form-group"> -->
                              <label>Answer</label>
                              <br>
                              <textarea style="height: 230px !important;" id="answerInput" class="form-control" name="answer"></textarea>
                              <p id="anserError" class="error"></p>
                            <!-- </div> -->
                            <br>
                            <input type="hidden" name="subCatId" value="<?php echo $id; ?>">
                            <input type="hidden" name="questionId" id="questionId" value="">
                            <input type="hidden" name="categoryId" value="<?php echo $pId; ?>">
                            <button type="submit" class="btn btn-primary">Save</button>
                            <button id="close" class="btn btn-danger">Cancel</button>
                          </form> 
                        </div>
                      </div>
                      <hr>
                      <br>
                        <div class="row">
                           <div class="col-sm-12">
                              <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Question</th>
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
                                       <td><?php echo $value['question']; ?></td>
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
                                            <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['id']; ?>"  >View/ Edit</a>
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
            url : "<?php echo site_url('admin/updatequestionStatus'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Question Status Update Successfully','success');
        })
    });
    $('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
         method : "POST",
            url : "<?php echo site_url('admin/getQuestionDetails'); ?>",
            data : {id : id}
          }).then(function(res){
            response = JSON.parse(res);
                $('#questionInput').val(response[0].question);
                $('#answerInput').val(response[0].answer);
                $('#questionId').val(response[0].id);
      })
      // console.log(JSON.parse(json)[0]);


      // json = JSON.parse(json);
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


    $('.changePP').on('click', function(){
      $('#business_id').val($(this).attr('data-id'));
    });

    $('#close').on('click', function(e){
      $('#questionInput').val('');
      $('#answerInput').val('');
      $('#questionId').val('');
      e.preventDefault();
    });

    $('#form').on('submit', function(e){
      var q = $('#questionInput').val();
      var a = $('#answerInput').val();
      if(q == '' || q == null || q == undefined || a == '' || a == null || a == undefined)
      {
        if(q == '' || q == null || q == undefined)
        {
          $('#quError').html('Question Required');
        }else{
          $('#quError').html('');
        }

        if(a == '' || a == null || a == undefined)
        {
          $('#anserError').html('Answer Required');
        }else{
          $('#anserError').html('');
        }
        e.preventDefault();
      }
    })

</script>
<style type="text/css">
  textarea{width: 100% !important;}
  .error{color: red;}
</style>