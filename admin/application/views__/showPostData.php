<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#home">Post Details</a></li>
  <li><a data-toggle="tab" href="#menu1">Likes</a></li>
  <li><a data-toggle="tab" href="#menu2">Comments</a></li>
  <li><a data-toggle="tab" href="#menu3">Share</a></li>
</ul>
<div class="tab-content">
  <div id="home" class="tab-pane test fade in active">
      <table class="table">
        <tr><td><b>Post:</b></td>
            <td><?php echo $data['post'];?>                    
            </td>
        </tr>                    
        <tr>
            <td><b>Create Date:</b></td>
            <td><?php echo date("F d Y",strtotime($data['created_date']));?></td>
        </tr>
        <tr>
            <td><b>No. of Likes:</b></td>
            <td><?php echo $data['no_of_like'];?></td>
        </tr>
        <tr>
            <td><b>No. of Comments:</b></td>
            <td><?php echo $data['no_of_comment'];?></td>
        </tr>                    
        </table>
  </div>
  <div id="menu1" class="tab-pane fade">
    <!-- <h4>Users's List</h4> -->
    <table class="table table-custom dataTable no-footer" id="like_users" role="grid" aria-describedby="editable-usage_info">
      <tbody>
        <?php 
        if($LikeUserList!="" && count($LikeUserList) >0)
        { //echo "<pre>";print_r($share_p); 
         foreach ($LikeUserList as $key => $value): ?>
          <tr class="gradeA odd" role="row">           
             <td style="text-align:center;">
              <?php 
                $file_pointer = site_url("../src/assets/uploads/images/".$value['profile_pic']);
                if (file_exists($file_pointer)) { ?>
                <img src="../src/assets/uploads/images/<?php echo $value['profile_pic']; ?>">
              <?php }else {  ?>
                <img src="<?php echo site_url('../src/assets/uploads/avatar.png'); ?>" height="50px" width="50px">
              <?php } ?>
              </td>
             <td><b><?php echo $value['name']; ?></b><br/><small>Date:<?php echo date("F d Y",strtotime($value['created_date'])); ?></small></td> 
            
          </tr>
        <?php endforeach;
        }
        else
        {
          echo "Data not found";
        }
        ?>
     </tbody>
  </table>
  </div>
  <div id="menu2" class="tab-pane fade">
    <!-- <h3>No Of Comments</h3> -->
    <table class="table table-custom dataTable no-footer" id="comment_users" role="grid" aria-describedby="editable-usage_info">
      <tbody>
        <?php 
        if($commentUserList!="" && count($commentUserList) >0)
        { //echo "<pre>";print_r($share_p); 
         foreach ($commentUserList as $key => $value): ?>
          <tr class="gradeA odd" role="row">           
             <td style="text-align:center;">
              <?php 
                $file_pointer = site_url("../src/assets/uploads/images/".$value['profile_pic']);
                if (file_exists($file_pointer)) { ?>
                <img src="../src/assets/uploads/images/<?php echo $value['profile_pic']; ?>">
              <?php }else {  ?>
                <img src="<?php echo site_url('../src/assets/uploads/avatar.png'); ?>" height="50px" width="50px">
              <?php } ?>
              </td>
             <td style="width: 25%;"><b><?php echo $value['name']; ?></b><br/><small>Date:<?php echo date("F d Y",strtotime($value['created_date'])); ?></small></td> 

            <td><p><b>Comment</b> : <?php echo $value['comment']; ?></p></td>
          </tr>
        <?php endforeach;
        }
        else
        {
          echo "Data not found";
        }
        ?>
     </tbody>
  </table>
  </div>
  <div id="menu3" class="tab-pane fade"> 
   <table class="table table-custom dataTable no-footer" id="editable-usage" role="grid" aria-describedby="editable-usage_info">
      <tbody>
        <?php 
        if($share_p!="" && count($share_p) >0)
        { //echo "<pre>";print_r($share_p); 
         foreach ($share_p as $key => $value): ?>
          <tr class="gradeA odd" role="row">           
             <td style="text-align:center;">
              <?php 
                $file_pointer = site_url("../src/assets/uploads/images/".$value['profile_pic']);
                if (file_exists($file_pointer)) { ?>
                <img src="../src/assets/uploads/images/<?php echo $value['profile_pic']; ?>">
              <?php }else {  ?>
                <img src="<?php echo site_url('../src/assets/uploads/avatar.png'); ?>" height="50px" width="50px">
              <?php } ?>
              </td>
             <td><b><?php echo $value['name']; ?></b><br/><small>Shared Date:<?php echo date("F d Y",strtotime($value['created_date'])); ?></small></td> 
          </tr>
        <?php endforeach;
        }
        else
        {
          echo "Data not found";
        }
        ?>
     </tbody>
  </table>
  </div>
</div>
<!-- <script src="<?php //echo base_url(); ?>assets/js/vendor/datatables/js/jquery.dataTables.min.js"></script>
<script type="text/javascript">
$('#like_users').DataTable();

</script> -->