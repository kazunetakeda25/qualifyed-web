<!-- ====================================================
   ================= CONTENT ===============================
   ===================================================== -->
   <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
   <style type="text/css">
     .doc {width: 100%;height: 500px;}
     .spacer20{width: 100%;display: inline-block;height: 20px;}
   </style>
 <input type="hidden" name="user_id" value="" id="user_id">
   <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>

<section id="content">
   <div class="page page-tables-datatables">
      <div class="pageheader">
         <h2>Reports</h2>
         <div class="page-bar">
            <ul class="page-breadcrumb">
               <li>
                  <a href="<?php echo site_url(); ?>"><i class="fa fa-home"></i></a>
               </li>
               <li>
                  <a href="#">Manage Reports</a>
               </li>
               <li>
                  <a href="<?php echo site_url('user_list'); ?>">Reports</a>
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
                  <h1 class="custom-font">Reports</h1>                  
               </div>
               <!-- /tile header -->
               <!-- tile body -->
               <div class="tile-body">
                  <div class="table-responsive">
                      <form class="form-horizontal row" role="form" name="frmReport" id="frmReport" method="submit">
                          <div class="col-sm-5 "> 
                            <label for="select_type" class="control-label">Select Type</label>
                            <select name="select_type" id="select_type" class="form-control">
                              <option value="1">Business</option>
                              <option value="2">User</option>
                              <option value="3">Opportunity</option>
                            </select>
                          </div>
                          <div class="col-sm-5 ">
                            <label for="date_range" class="control-label">Select Date</label>
                            <input type="text" name="date_range" id="date_range" value="" class="form-control"> 
                          </div>
                          <div class="col-sm-2">
                            <button style="margin-top: 30px;" class="btn btn-rounded btn-primary btn-sm" type="button" name="submit" id="submit">Show Report</button>
                          </div>
                      </form> 
                  </div>
                  <div class="spacer20"></div>
                  <div class="table-responsive">
                     <div style="display: none;" id="editable-usage_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                          <div class="col-sm-12" id="ReportData"> 

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
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/daterangepicker.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/jquery.dataTables.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/dataTables.buttons.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/buttons.flash.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/jszip.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/pdfmake.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/vfs_fonts.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/buttons.html5.min.js');?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/buttons.print.min.js');?>"></script>
<!--/ CONTENT -->
<script>
          /*$('#user_list_table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Qualifyed_users'
            },
            {
                extend: 'pdfHtml5',
                title: 'Data export'
            }
        ]
    } );*/
  $("#submit").click(function(){
        if($("#date_range").val() != "")
        { 
          var type = $('#select_type').val();
          var date_range = $('#date_range').val();
          $.ajax({
                  type: 'POST',
                  url: 'admin/getReportData',
                  data: {type : type , date_range : date_range},
                  dataType: "html",
                  success: function (data) { 
                    $("#editable-usage_wrapper").show();
                    $("#ReportData").html(data);
                  },
                  error: function() {
                      console.log("not saved");
                },
            });
        }
        else
        {
          swal("", "Please select date", "error");
        }
  });     

      $(function() {
         $('#date_range').daterangepicker({                       
                dateFormat : 'dd M yy',
                maxDate: new Date(),
                 //format:'DD MMM YYYY',
         }).datepicker("setDate", new Date());
      });
</script>

