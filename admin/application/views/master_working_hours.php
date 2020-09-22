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
         <h2>Master Working Hours</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage Miscellaneous</a>
               </li>
               <li>
                  <a href="<?php echo site_url('master_working_hours'); ?>">Master Working Hours</a>
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
                  <h1 class="custom-font">Add Master Working Hours</h1>
                    <p class="add_new_c"><a role="button" data-toggle="modal" data-target="#changePass" data-options="changePass" href="javascript:void(0)" tabindex="0" class=" text-uppercase text-strong text-sm mr-10 btn btn-primary">ADD Working Hours</a> </p>
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
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Title</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Value</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Status</th>
                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($master_working_hours!="" && count($master_working_hours) >0)
                                   {
                                   foreach ($master_working_hours as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                      <td class="edit_v"><?php echo $value['title']; ?>
                                        <form  id="Edit_form_click_<?php echo $key+1 ?>" class="edit_form_oc" method="POST" >
                                            <div class="row"> 
                                            <div class="col-lg-6">            
                                            <input type="text" id="myInput<?php echo $value['id']?>"  class="form-control" value="<?php echo $value['title']; ?>" name="name_ee" placeholder="Enter Master Working Hours "></div>
                                             <div class="col-lg-6">
                                             <input type="hidden" name="id" value="<?php echo $value['id']?>" />     
                                            <input type="Submit" class="btn btn-primary" value="Update"></div>
                                            </div>
                                            </form>

                                      </td>
                                       <td><?php echo $value['value']; ?></td>
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

<div class="modal splash fade" id="changePass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font h3_label"   id="">Add Working Hours</h3>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label>Working Hours</label>
                <input type="text" class="form-control" id="sortname" autocomplete="off" value="" name="sortname">
              </div>
              <div class="form-group">
                <label>Working Hours Value</label>
                <input type="text" class="form-control" id="name" autocomplete="off" value="" name="name" disabled>
              </div>
          </div>
          <input type="hidden" name="update_type" id="update_type"  value="1">
          <input type="hidden" name="coid" id="coid"  value="">
          <div class="modal-footer">
              <button class="btn btn-primary h3_label" id="COUNTRY_ACTION">Add Working Hours</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>

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
        data : {table : 'master_working_hours', col : 'title',misc : misc,check_col_name : 'id', check_col_data : id  }
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
        swal("ERROR", "Please enter Working Hours", 'error');
    }
    return false;
  });$('.user_status').on('change', function(){
        if($(this).prop('checked') == true)
        {
            status = 1;
        }else{
            status = 0;
        }
        $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/master_working_hours_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Master Working Hours update successfully','success');
        })
    });
     $('#size_com').submit(function(e){
      if($('input[name="name3"]').val() == '')
      {
        swal("Please Enter Working Hours");
        return false;
      }else{
        return true;
      }

    })
     $("td  a.text-primary").click(function(){
  var tid = $(this).data('tid');
  $(tid).toggleClass("edit");
});
     $('.edit_clas').on('click', function(){
      var skills_id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : "<?php echo site_url('admin/get_working_hours_by_id'); ?>",
        data : {id : skills_id}
      }).then(function(res){
        skills = JSON.parse(res)[0];
        $('#sortname').val(skills.title);
        $('#name').val(skills.key);
        $('.h3_label').html("Edit Skills");
        $('#coid').val(skills_id);
        $('#update_type').val(2);
      });
      
    });
    $('#COUNTRY_ACTION').click(function(){
      var co_s = $('#sortname').val();
      var co_n = $('#name').val();
      var co_I = $('#coid').val();
      if(co_s != '' && co_n != '')
      {
        if(co_I != '')
        {
          data = {
              sortname : co_s,
              name : co_n,
              id : co_I,
              update_type : 2
            }
        }else
        {
          data = {
              sortname : co_s,
              name : co_n,
              update_type : 1
            }
        }
        $.ajax({
          method : "POST",
          url : "<?php echo site_url('admin/master_working_hours_add'); ?>",
          data : data
        }).then(function(res){
          response = JSON.parse(res);
          if (response.success == true) {
            $('#sortname').val('');
            $('#name').val('');
            $('#update_type').val(1);
            $('#coid').val('');
            
            swal(response.error_type, response.msg,response.error_type).then(function(){
              location.reload(true);
            });
          }else{

            swal(response.error_type, response.msg,response.error_type);
          }
        });
      }else{
        swal("ERORR", "Please fill all required fields", 'error');
      }
    })
      $('#sortname').blur(function(){
    var a = $('#sortname').val();
    String.prototype.allReplace = function(obj) {
        var retStr = this;
        for (var x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    $('#name').val(a.allReplace({'A': '', 'a': '', 'e': '','i' : '', 'o' : '', 'u' : '', 'M' : '', 'm' : '', 'P' : '', 'p' : '', ' ': '' , '_' : ''}));

  });
</script>