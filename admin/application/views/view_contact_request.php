<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>

<?php } 
/*echo "<pre>";
print_r($contact_us);
echo "</pre>";
die;*/

?>

<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>View Contact Request</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">View Contacts</a>
               </li>
               <li>
                  <a href="<?php echo site_url('view_contact_request'); ?>">View Contact Request</a>
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
                  <h1 class="custom-font">View Contact Request</h1>
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
                                     <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S No</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Email</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Reason</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Tell Us About</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Create Date</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">User Type</th>
                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                    <!--    <th rowspan="1" colspan="1" aria-label="Actions">Actions</th> -->
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($contact_us!="" && count($contact_us) >0)
                                   {
                                    /*echo "<pre>";
                                    print_r($contact_us);die;*/
                                   foreach ($contact_us as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                      <td class="edit_v"><?php echo $value['user_name']; ?></td>
                                       <td><?php echo $value['email']; ?></td>
                                       <td><?php echo $value['reason']; ?></td>
                                       <td>
                                          <a href="javascript:void(0);" class="view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash-2 splash-ef-4"><?php echo substr($value['tell_us_about'],0,50)."..."; ?></a></td>
                                       <td><?php echo date("F d Y",strtotime($value['created_date'])); ?></td>
                                       <td><?php if($value['user_type'] == 1){ echo "Business"; }else if($value['user_type'] == 2){ echo "User"; } else { echo "Guest User";} ?></td>
                                      
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
<div class="modal splash fade" id="splash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h3 class="modal-title custom-font">View Detail</h3>
          </div>
          <div class="modal-body table-responsive">

          </div>
          <div class="modal-footer">
              <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
          </div>
      </div>
  </div>
</div>
<script>
$('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : '<?php echo site_url('admin/showContactreasonDetail'); ?>',
        data : {id : id}
      }).then(function(res){
       /* var json = JSON.parse(res);
        console.log(json.data);*/       
        
        $('.modal-body').children().remove();
        $('.modal-body').append(res);

      });
    });

</script>