<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Countries</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage Miscellaneous</a>
               </li>
               <li>
                  <a href="<?php echo site_url('countries'); ?>">Countries</a>
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
                  <h1 class="custom-font">Countries </h1>
                  <p class="add_new_c"><a role="button" data-toggle="modal" data-target="#addCountryModal" data-options="addCountryModal" href="javascript:void(0)" tabindex="0" class=" text-uppercase text-strong text-sm mr-10 btn btn-primary">ADD NEW COUNTRY</a> </p>
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
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Sort Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Phone</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Status</th>
                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                       <th rowspan="1" colspan="1" aria-label="Actions">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>

                                   <?php 

                                   if ($countries!="" && count($countries) >0)

                                   {
                                   foreach ($countries as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['sortname']; ?></td>
                                       <td><?php echo $value['name']; ?></td>
                                       <td><?php echo $value['phonecode']; ?></td>
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
                                       <td class="actions"><a role="button" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#changePass" data-options="changePass" href="javascript:void(0)" tabindex="0" class="text-primary text-uppercase text-strong text-sm mr-10 edit_clas">Edit</a>
                                        <a role="button" tabindex="0" href="<?php echo site_url('admin/status_list/'.$value['id']) ?>" class="delete text-success text-uppercase text-strong text-sm mr-10">View state</a></td>
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
<div class="modal splash fade" id="changePass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font h3_label"   id="">Edit Country</h3>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label>Short Code</label>
                <input type="text" class="form-control" id="sortname" autocomplete="off" value="" name="sortname">
              </div>
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" id="name" autocomplete="off" value="" name="name">
              </div>
              <div class="form-group">
                <label>Phone prefix</label>
                <input type="number" class="form-control" id="phonecode" autocomplete="off" value="" name="phonecode">
              </div>
          </div>
          <input type="hidden" name="update_type" id="update_type"  value="1">
          <input type="hidden" name="coid" id="coid"  value="">
          <div class="modal-footer">
              <button class="btn btn-primary h3_label" id="EDIT_COUNTRY_ACTION">Edit Country</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>
<div class="modal splash fade" id="addCountryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font h3_label"   id="">Add Country</h3>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label>Short Code</label>
                <input type="text" class="form-control" id="add_sortname" autocomplete="off" value="" name="add_sortname">
              </div>
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" id="add_name" autocomplete="off" value="" name="add_name">
              </div>
              <div class="form-group">
                <label>Phone prefix</label>
                <input type="text" class="form-control" id="add_phonecode" autocomplete="off" value="" name="add_phonecode">
              </div>
          </div>         
          <div class="modal-footer">
              <button class="btn btn-primary h3_label" id="ADD_COUNTRY_ACTION">Add Country</button>
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>
<!--/ CONTENT -->
<script>
    $('.user_status').on('change', function(){
        if($(this).prop('checked') == true)
        {
            status = 1;
        }else{
            status = 0;
        }
        $.ajax({
            method : "POST",
            url : "<?php echo site_url('admin/countries_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Country status update successfully','success');
        })
    });

    $('.edit_clas').on('click', function()
    {
      
      var country_id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : "<?php echo site_url('admin/get_country_by_id'); ?>",
        data : {id : country_id}
      }).then(function(res){
        countries = JSON.parse(res)[0];
        $('#sortname').val(countries.sortname);
        $('#name').val(countries.name);
        $('#phonecode').val(countries.phonecode);
        
        $('#coid').val(country_id);
        $('#update_type').val(2);
      });
      
    });
    $('#ADD_COUNTRY_ACTION').click(function()
    {      
      var co_s = $('#add_sortname').val();
      var co_n = $('#add_name').val();
      var co_p = $('#add_phonecode').val();
      
      if(co_s != '' && co_n != '' && co_p != '')
      {    
        var data = {
              sortname : co_s,
              name : co_n,
              id : 0,
              phonecode : co_p,
              update_type : 1
            };    
        $.ajax({
          method : "POST",
          url : "<?php echo site_url('admin/add_edit_country'); ?>",
          data : data
        }).then(function(res){
          response = JSON.parse(res);
          if (response.success == true) {  
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
    });

    $('#EDIT_COUNTRY_ACTION').click(function()
    {      
      var co_s = $('#sortname').val();
      var co_n = $('#name').val();
      var co_p = $('#phonecode').val();
      var country_id = $('#coid').val();
      
      if(co_s != '' && co_n != '' && co_p != '')
      {    
        var data = {
              sortname : co_s,
              name : co_n,
              id : country_id,
              phonecode : co_p,
              update_type : 2
            };    
        $.ajax({
          method : "POST",
          url : "<?php echo site_url('admin/add_edit_country'); ?>",
          data : data
        }).then(function(res){
          response = JSON.parse(res);
          if (response.success == true) {  
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
    });
</script>