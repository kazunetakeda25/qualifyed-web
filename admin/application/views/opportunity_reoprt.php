 <table class="table table-custom dataTable no-footer" id="opportunity_list_table" role="grid" aria-describedby="editable-usage_info">
   <thead>
      <tr role="row">
         <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Business Name</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Title</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Close Status</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Created Date</th>                                      
      </tr>
   </thead>
   <tbody>
   	<?php if($finalData!="") 
   	{
   		foreach ($finalData as $key => $value) 
   		{
   		?>
          <tr class="gradeA odd" role="row">
             <td class="sorting_1"><?php echo $value['s_no'];?></td>
             <td><?php echo $value['full_name'];?></td>
             <td><?php echo $value['title'];?></td>
             <td><?php echo $value['close_status'];?></td>
             <td><?php echo $value['register_date'];?></td>                                    
          </tr>
  <?php } // END OF FOREACH
		}?>
   </tbody>
  </table>

<script type="text/javascript">
	$( document ).ready(function() {
        $('#opportunity_list_table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Qualifyed_Opportunities'
            },
            {
                extend: 'pdfHtml5',
                title: 'Qualifyed_Opportunities'
            },
            {
            	extend: 'print',
                title: 'Qualifyed_Opportunities'
			}
        ]
    	});
    });
			/*$( document ).ready(function() {
			$('#user_list_table').DataTable({
					 "processing": true,        
					 "dom": 'lBfrtip',
					 "buttons": [
			            {
			                extend: 'collection',
			                text: 'Export',
			                buttons: [
			                    'excel',
			                    'csv',
			                    'pdf',
			                    'print'
			                ]
			            }
			        ]
			        });
			});*/
</script>
                    