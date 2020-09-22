
   <style type="text/css">
     .doc {
    width: 100%;
    height: 500px;
}
   </style>
 <table class="table table-custom dataTable no-footer" id="user_list_table" role="grid" aria-describedby="editable-usage_info">
   <thead>
      <tr role="row">
         <th class="sorting_asc" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" aria-sort="ascending">S. NO</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Name</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Email</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1" >Contact</th>
         <th class="sorting" tabindex="0" aria-controls="editable-usage" rowspan="1" colspan="1">Registration Date</th>                                      
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
             <td><?php echo $value['email'];?></td>
             <td><?php echo $value['phone'];?></td>
             <td><?php echo $value['register_date'];?></td>                                    
          </tr>
  <?php } // END OF FOREACH
		}?>
   </tbody>
</table>

<script type="text/javascript">
			$( document ).ready(function() {
        $('#user_list_table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Qualifyed_Users'
            },
            {
                extend: 'pdfHtml5',
                title: 'Qualifyed_Users'
            },
            {
              extend: 'print',
              title: 'Qualifyed_Users'
            },
        ]
    } );
			/*$('#user_list_table').DataTable({
					 "processing": true,        
					 "dom": 'lBfrtip',
					 "buttons": [
			            {
			                extend: 'collection',
			                text: 'User Report',
			                buttons: [
			                    'excel',
			                    'csv',
			                    'pdf',
			                    'print'
			                ]
			            }
			        ]
			        });*/
			});
</script>
                    