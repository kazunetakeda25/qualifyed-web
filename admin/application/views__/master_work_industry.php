<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>


<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Master Work Industry</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage Miscellaneous</a>
               </li>
               <li>
                  <a href="<?php echo site_url('master_work_industry'); ?>">Master Work Industry</a>
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
                  <h1 class="custom-font">Add Master Work Industry</h1>
                     <div class="comapny_size_add">
                  <form id="size_com" method="POST" action="<?php echo site_url('admin/master_work_industry'); ?>">
                  <div class="row"> 
                  <div class="col-lg-6">            
                  <input type="text" id="myInput" class="form-control" name="name3" placeholder="Enter Master Work Industry"></div>
                   <div class="col-lg-6">     
                  <input type="Submit" class="btn btn-primary" value="Submit"></div>
                  </div>
                  </form>
                  </div>
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
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                              <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">ID</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Create Date</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Status</th>
                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($master_work_industry!="" && count($master_work_industry) >0)
                                   {
                                   foreach ($master_work_industry as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                      <td class="edit_v"><?php echo $value['name']; ?>
                                        <form  id="Edit_form_click_<?php echo $key+1 ?>" class="edit_form_oc" method="POST" >
                                            <div class="row"> 
                                            <div class="col-lg-6">            
                                            <input type="text" id="myInput<?php echo $value['id']?>"  class="form-control" value="<?php echo $value['name']; ?>" name="name_ee" placeholder="Enter States Name "></div>
                                             <div class="col-lg-6">
                                             <input type="hidden" name="id" value="<?php echo $value['id']?>" />     
                                            <input type="Submit" class="btn btn-primary" value="Update"></div>
                                            </div>
                                            </form>

                                      </td>
                                       <td><?php echo $value['create_date']; ?></td>
                                       <td><div class="onoffswitch greensea inline-block">
                                                    <input type="checkbox" data-id="<?php echo $value['id']; ?>" name="onoffswitch" class="onoffswitch-checkbox user_status" id="switch<?php echo $key ?>" <?php if ($value['status'] == 1) {
                                                        echo "checked='checked'";
                                                    } ?>>
                                                    <label class="onoffswitch-label" for="switch<?php echo $key ?>">
                                                        <span class="onoffswitch-inner"></span>
                                                        <span class="onoffswitch-switch"></span>
                                                    </label>
                                                </div></td>
                                       <!-- <td><?php echo date_format(date_create($value['created_date']),"d M,Y"); ?></td> -->
                                       <td class="actions"><a data-tid="#Edit_form_click_<?php echo $key+1 ?>" role="button" href="javascript:void(0)" tabindex="0" class="text-primary text-uppercase text-strong text-sm mr-10">Edit</a>
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
</section>
<!--/ CONTENT -->
<script>
  $('.edit_form_oc').submit(function(){
     var formData = $(this).serializeArray();
    var misc = formData[0].value;
    var id = formData[1].value;
    if($.trim(misc) != '')
    {
      $.ajax({
        method : "POST",
        url : "<?php echo site_url('admin/miscellaneous_update'); ?>",
        data : {table : 'master_work_industry', col : 'name',misc : misc,check_col_name : 'id', check_col_data : id  }
      }).then(function(res){
        var response = JSON.parse(res);
        
        swal("", response.msg,response.error_type).then(function(){
          if(response.success == true)
          {
            location.reload(true);
          }
        });
      })
    }else{
        swal("ERROR", "Please enter work Industry name", 'error');
    }
    return false;
  });
    $('.user_status').on('change', function(){
        if($(this).prop('checked') == true)
        {
            status = 1;
        }else{
            status = 0;
        }
        $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/master_work_industry_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Master Work Industry update successfully','success');
        })
    });
     $('#size_com').submit(function(e){
      if($('input[name="name3"]').val() == '')
      {
        swal("Please Enter Master Work Industry");
        return false;
      }else{
        return true;
      }

    })
     $("td  a.text-primary").click(function(){
  var tid = $(this).data('tid');
  $(tid).toggleClass("edit");
});
</script>