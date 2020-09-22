<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->

<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Skills List</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="<?php echo site_url('skills'); ?>">Manage Skills</a>
               </li>
               <li>
                  <a href="<?php echo site_url('skills_list/1'); ?>">Skills List</a>
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
                  <h1 class="custom-font"> Skills List</h1>

                    <div class="comapny_size_add">
                    <form id="size_com" method="POST">
                    <div class="row"> 
                    <div class="col-lg-6">            
                    <input type="text" id="skill_k" class="form-control" name="title" placeholder="Enter Skills Name ">
                  <input type="hidden" id="hidden_key" class="form-control" name="hidden_key">
                  </div>
                    <input type="hidden" value="0"  name="category_id" >
                     <div class="col-lg-6">     
                    <input type="Submit" class="btn btn-primary" value="Add Skills"></div>
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
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Skill Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Status</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Action</th>

                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                      
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($master_skills!="" && count($master_skills) >0)
                                   {
                                   foreach ($master_skills as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td class="edit_v"><?php echo $value['title']; ?>

                                          <form id="Edit_form_click_<?php echo $key+1 ?>" class="edit_form_oc " method="POST">
                                            <div class="row"> 
                                            <div class="col-lg-6">            
                                            <input type="text" id="myInput<?php echo $value['id']?>"  class="form-control" value="<?php echo $value['title']; ?>" name="name_c" placeholder="Enter Skill Name "></div>
                                             <div class="col-lg-6">
                                             <input type="hidden" name="id" value="<?php echo $value['id']?>" />     
                                            <input type="Submit" class="btn btn-primary" value="Update"></div>
                                            </div>
                                            </form>


                                       </td>
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
                                       <td class="actions <?php echo $key ?>"><a data-tid="#Edit_form_click_<?php echo $key+1 ?>" role="button" href="javascript:void(0)" tabindex="0" class="text-primary text-uppercase text-strong text-sm mr-10">Edit</a>
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
        data : {table : 'master_skills', col : 'title',misc : misc,check_col_name : 'id', check_col_data : id  }
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
        swal("ERROR", "Please enter State Name", 'error');
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
            url : "<?php echo site_url('admin/master_skill_list_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'State update successfully','success');
        })
    });

     


$("td  a.text-primary").click(function(){
  var tid = $(this).data('tid');
  $(tid).toggleClass("edit");
});     

$('#size_com').submit(function(e){
      e.preventDefault();
      if($('input[name="title"]').val() == '')
      {
        swal('ERROR',"Please enter Skills name", 'error');

      }else{
        var formData = $(this).serializeArray()
        $.ajax({
          method : "POST",
          url : "<?php echo site_url('admin/master_skills_add'); ?>",
          data : formData
        }).then(function(res){
          response = JSON.parse(res);
          if(response.success == true)
          {
            swal(response.error_type, response.msg, response.error_type).then(function(){
              location.reload(true);
            });
          }else{
            swal(response.error_type, response.msg, response.error_type);
          }
        });
      }
    })

$('#skill_k').blur(function(){
    var a = $('#skill_k').val();
    String.prototype.allReplace = function(obj) {
        var retStr = this;
        for (var x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    $('#hidden_key').val(a.allReplace({'a': '', 'e': '','i' : '', 'o' : '', 'u' : '', ' ': '' , '_' : '', '-' : ''}));

  });
</script>