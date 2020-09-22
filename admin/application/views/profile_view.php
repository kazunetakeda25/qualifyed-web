
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
         <h2>User viewed profile</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">View Profile</a>
               </li>
               <li>
                  <a href="#"><span>User viewed profile</span></a>
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
               <!--  <ul class="nav nav-tabs">
                  <li class="active"><a data-toggle="tab" href="#home">User viewed profile</a></li>
                  <li><a data-toggle="tab" href="#menu1">User viewed bio video</a></li>
                </ul> -->
                  <h1 class="custom-font"><span class="span_button active_span" data-tab="1">User viewed profile</span><span class="span_button" data-tab="2">User view bio video</span></h1>
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body active_tab data-tab-1" >
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                              <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Date</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($data!="" && count($data) >0)
                                   {
                                   foreach ($data as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['name']; ?></td>
                                       <td><?php echo date_format(date_create($value['view_date']),"d M,Y  h:i A"); ?></td>
                                        
                                        
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



               <div class="tile-body data-tab-2" >
                  <div class="table-responsive">
                     <div id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                           <div class="col-sm-12">
                              <table class="table table-custom dataTable no-footer" id="editable-usage_2" role="grid" aria-describedby="editable-usage_info">
                                 <thead>
                                    <tr role="row">
                                       <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Date</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($dataNew!="" && count($dataNew) >0)
                                   {
                                   foreach ($dataNew as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td><?php echo $value['name']; ?></td>
                                       <td><?php echo date_format(date_create($value['view_date']),"d M,Y  h:i A"); ?></td>
                                        
                                        
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

<div class="modal splash fade" id="splash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">View Business</h3>
          </div>
          <div class="modal-body table-responsive">

          </div>
          <div class="modal-footer">
              <button class="btn btn-default btn-border" data-dismiss="modal">OK</button>
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

<style type="text/css">
span.span_button {border: 0; background-color: #e8e8e8; padding: 8px; cursor: pointer; }
span.span_button.active_span {box-shadow: inset 0 -3px 0 #428bca; border: 0; background-color: #fff; padding: 8px; }
.tile-body{display: none; }
.active_tab{display: block; }
</style>

<script type="text/javascript">
  $('.span_button').click(function(){
    var tab = $(this).attr('data-tab');
    $('.tile-body').removeClass('active_tab');
    $('.data-tab-'+tab).addClass('active_tab');
    $('.span_button').removeClass('active_span');
    $(this).addClass('active_span');
  });
</script>