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
      <h2>Report Abuse </h2>
      <div class="page-bar">
        <ul class="page-breadcrumb">
          <li>
            <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
          </li>
          <li>
            <a href="#">Report Abuse List</a>
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
            <h1 class="custom-font">Report Abuse List</h1>
            
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
                          <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Report Type</th>
                          <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Report By</th>
                          
                          <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Date</th>
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
                          <td class="clickable" data-toggle="modal" data-target="#dd_modal" data-options="dd_modal" onclick="getEntityDetails('<?php echo $value['entity_id'] ?>','<?php echo $value['entity_type'] ?>' )" ><?php echo $value['entity_type']; ?></td>
                          <td data-toggle="modal" data-target="#dd_modal" data-options="dd_modal" class="clickable" onclick="getEntityDetails('<?php echo $value['user_login_id'] ?>','<?php echo $value['user_logi_type'] ?>' )"><?php echo $value['user_name']; ?></td>
                          <td><?php echo $value['created_date']; ?></td>
                          
                          <td class="actions">
                            <div class="dropdown">
                              <button class="btn btn-teal dropdown-toggle btn-sm" type="button" data-toggle="dropdown">Actions
                              <span class="caret"></span></button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a role="button" tabindex="0" class="delete text-success text-uppercase text-strong text-sm mr-10 view_class" data-id="<?php echo $value['id']; ?>" data-toggle="modal" data-target="#splash" data-options="splash-2 splash-ef-4">View</a>
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
<div class="modal splash fade" id="dd_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title custom-font">View Detail</h3>
      </div>
      <div class="modal-body dd_modal_CCC table-responsive">
      </div>
      <div class="modal-footer">
        <button class="btn btn-default btn-border" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--/ CONTENT -->
<script>

$('.view_class').click(function(){
  var id = $(this).attr('data-id');
  $.ajax({
    method : "POST",
    url : '<?php echo site_url('admin/reportAbuseDetail'); ?>',
    data : {id : id}
  }).then(function(res){
    $('.modal-body').children().remove();
    $('.modal-body').append(res);
  });
});
function getEntityDetails(id , type)
{
  $.ajax({
    method : "POST",
    url : '<?php echo site_url('admin/getEntityDetails') ?>',
    data : {type : type ,id : id}
  }).then(function(res){
    $('.dd_modal_CCC').children().remove();
    $('.dd_modal_CCC').append(res);
  });
}
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
.clickable{
  cursor: pointer;
}
</style>