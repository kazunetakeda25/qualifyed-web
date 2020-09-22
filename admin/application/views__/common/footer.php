        </div>
        <!--/ Application Content -->
        <div class="loader"></div>
        <style type="text/css">
          .loader{position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;z-index: 9999;background: url('<?php echo base_url('assets/images/loading.gif') ?>')50% 50% no-repeat ;background-color: rgba(0,0,0,0.4); display: none;}
        </style>
        <div>
          <!-- <img src="<?php echo base_url('assets/images/loading.gif') ?>"> -->
        </div>
        <!-- <script>window.jQuery || document.write('<script src="<?php //echo base_url(); ?>assets/js/vendor/jquery/jquery-1.11.2.min.js"><\/script>')</script> -->

        <script src="<?php echo base_url(); ?>assets/js/vendor/bootstrap/bootstrap.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/jRespond/jRespond.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/d3/d3.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/d3/d3.layout.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/rickshaw/rickshaw.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/sparkline/jquery.sparkline.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/slimscroll/jquery.slimscroll.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/animsition/js/jquery.animsition.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/daterangepicker/moment.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/daterangepicker/daterangepicker.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/screenfull/screenfull.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/flot/jquery.flot.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/flot-tooltip/jquery.flot.tooltip.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/flot-spline/jquery.flot.spline.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/easypiechart/jquery.easypiechart.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/raphael/raphael-min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/morris/morris.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/owl-carousel/owl.carousel.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/js/jquery.dataTables.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/dataTables.bootstrap.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/chosen/chosen.jquery.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/summernote/summernote.min.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/coolclock/coolclock.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/coolclock/excanvas.js"></script>

        <script src="<?php echo base_url(); ?>assets/js/vendor/parsley/parsley.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>
        
        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/Responsive/js/dataTables.responsive.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/ColVis/js/dataTables.colVis.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script> <script src="<?php echo base_url(); ?>assets/js/vendor/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
        

        <script src="<?php echo base_url(); ?>assets/js/main.js"></script>
        <script>
            //initSample();
            $(window).load(function(){
                $('#editable-usage').DataTable();
                $('#editable-usage_2').DataTable();
            });

            $('#country').change(function(){
                $.ajax({
                    method : "POST",
                    url : '<?php echo site_url('admin/get_state_by_city'); ?>',
                    data : {country_id : $(this).val()},
                    success: function (res) {
                        ajaxRes = JSON.parse(res);
                        if(ajaxRes.success == true)
                        {
                            var html = '<option value="">Select State</option>';
                            $.each(ajaxRes.data, function(index) {
                                html += '<option value="'+ajaxRes.data[index].id+'">'+ajaxRes.data[index].name+'</option>';
                            })
                            $('#state').html(html);
                        }
                    },
                    error : function(err)
                    {
                        console.log(err);
                    }
                });
            });
            $('.numberOnly').on('keypress', function(e){
              if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                 e.preventDefault();
              }
            });

            $('.numberOnly').on('change', function(e){
              var reg =  new RegExp('^[0-9]*$');
              var value = $('.numberOnly').val();
              if(reg.test(value) == false)
              {
                 $(this).val('');
              }
            });

            $('.maxCharacter').on('keypress', function(e){
              var maxLen = $(this).attr('data-maxCharacter');
              var len = $(this).val().length;
              if(len+1 <= maxLen)
              {
                 return true;
              }else{
                 e.preventDefault();
              }
              
            });

            $('.maxCharacter').on('change', function(e){
              var maxLen = $(this).attr('data-maxCharacter');
              var len = $(this).val().length;
              var value = $(this).val();
              if(len+1 > maxLen)
              {
                 var val = value.substring(0, maxLen);
                 $(this).val(val);
              }
            });
            function makeid(length) {
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

              return text;
            }
        </script>
        <?php if(isset($msg) && !empty($msg) && $msg != '')
{ ?>
    <script type="text/javascript">
        swal("", "<?php echo $msg; ?>", "<?php echo $msg_type; ?>");
    </script>
<?php } ?>
<div id="editor">
</div>
    </body>
</html>
