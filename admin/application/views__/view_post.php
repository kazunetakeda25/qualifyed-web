<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
 <input type="hidden" name="user_id" value="" id="user_id">
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } 

/*echo '<pre>';
print_r($share_p);
echo '</pre>';
die;*/
?>
<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Post's List</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
                <?php
                if($usertype==2){?>
               <li>
                <a href="#">Manage User</a>
               </li>

                <li>
                <a href="<?php echo site_url('/admin/user_list'); ?>">User's List</a>
               </li>
                <?php }else{?>
                 <li>
                <a href="#">Manage Business</a>
               </li>               
                <li>
                  <a href="<?php echo site_url('/admin/business_list'); ?>">Business List</a>
               </li>  
                <?php }?>
                  
               </li>
               <li><a><?php echo $userName;?></a></li> 
               <li>
                  <a href="<?php echo site_url('/admin/view_post/1'); ?>">Post's List</a>
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
                  <h1 class="custom-font">Post's List</h1>
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
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Post</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Create Date</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >NO. of Likes</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >NO. of Comments</th>
                                       <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">NO. of Share</th>
                                       <th rowspan="1" colspan="1" aria-label="Actions">Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <?php 
                                    if($users_post!="" && count($users_post) >0)
                                    {
                                   foreach ($users_post as $key => $value): ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                       <td style="overflow: hidden; text-overflow: ellipsis; width: 600px; white-space: nowrap; display: block;">  <a role="button" tabindex="0" class="view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash-2 splash-ef-4"><?php if($value['post']!=""){echo $value['post'];}else{ echo "View Post";} ?></a>
                                       </td>
                                       <td><?php echo date('d M Y',strtotime($value['created_date'])); ?></td>
                                       <td><?php echo $value['total_like']; ?></td>
                                       <td><?php echo $value['total_comment']; ?></td>
                                       <td><?php echo $value['total_share']; ?></td>
                                       <td><div class="onoffswitch greensea inline-block">
                                                    <input type="checkbox" data-id="<?php echo $value['id']; ?>" name="onoffswitch" class="onoffswitch-checkbox user_status" id="switch<?php echo $key ?>" <?php if ($value['status'] == 1) {
                                                        echo "checked='checked'";
                                                    } ?>>
                                                    <label class="onoffswitch-label" for="switch<?php echo $key ?>">
                                                        <span class="onoffswitch-inner"></span>
                                                        <span class="onoffswitch-switch"></span>
                                                    </label>
                                                </div></td>
                                       
                                       
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
              <h3 class="modal-title custom-font">View Post Detail</h3>
          </div>
          <div class="modal-body table-responsive" id="showPostData">
            
          </div>
        </div>
          <div class="modal-footer">
              <!-- <button class="btn btn-default btn-border" data-dismiss="modal">OK</button> -->
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
            url : "<?php echo site_url('admin/view_post_status'); ?>",
            data : {status : status , id : $(this).data('id')}
        }).then(function(){
            swal("Update Success", 'Post Status Update Successfully', 'success');
        })
    });

     $('.view_class').click(function(){
      var id = $(this).attr('data-id');
      $.ajax({
        method : "POST",
        url : '<?php echo site_url('admin/view_post_by_id'); ?>',
        data : {id : id},
          success: function(data) {
          //console.log(data);
          //$('.test').html(data);
          $('#showPostData').html(data)
          //$('#main').html(data.responseText);
          }
        });
    });


    

</script>

