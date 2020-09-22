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
         <h2>Cms Pages</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Cms pages</a>
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
                  <h1 class="custom-font">List Of CMS Pages</h1>
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
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Title</th>
                                     <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Page key</th>
                                     <th tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Action</th>
                                       <!-- <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th> -->
                                    <!--    <th rowspan="1" colspan="1" aria-label="Actions">Actions</th> -->
                                    </tr>
                                 </thead>
                                 <tbody>
                                   <?php 
                                   if($data!="" && count($data) >0)
                                   {
                                    /*echo "<pre>";
                                    print_r($contact_us);die;*/
                                   foreach ($data as $key => $value): 
                                      $page_id = $value['id'];
                                    ?>
                                    <tr class="gradeA odd" role="row">
                                       <td class="sorting_1"><?php echo $key+1  ; ?></td>
                                      <td class="edit_v"><?php echo $value['title']; ?></td>
                                       <td><?php echo strtolower($value['page_key']); ?></td>
                                       <td>
                                          <a href="<?php echo base_url('cms-edit-page/'.$page_id);?>"   >Edit</a></td>
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