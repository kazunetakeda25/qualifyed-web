<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct()
    {
      parent::__construct();
    }
	public function index()
	{
		 if(checkLoginSession()==false) {
            redirect('login');
		}
		redirect('dashboard');
	}

	public function dashboard()
	{
	
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$page_data = array();
		$page_data['title'] = 'Dashboard';
		
		$page_data['userCount'] = $this->Comman_model->getCountOfUsers(array('type'=>2));
		$page_data['businessCount'] = $this->Comman_model->getCountOfUsers(array('type'=>1));
		$page_data['media_size'] = $this->formatSizeUnits($this->Comman_model->getMediaSize('files_record', 'file_size'));
		
		$page_data['femaleUserCount'] = $this->Comman_model->userGenderCount(2);
		$page_data['maleUserCount'] = $this->Comman_model->userGenderCount(1);
		$page_data['userAvgAge'] = $this->Comman_model->userAvgAge();
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('dashboard',$page_data);
		$this->load->view('common/footer');
	}

	public function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824)
        {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }
        elseif ($bytes >= 1048576)
        {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }
        elseif ($bytes >= 1024)
        {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }
        elseif ($bytes > 1)
        {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == 1)
        {
            $bytes = $bytes . ' byte';
        }
        else
        {
            $bytes = '0 bytes';
        }

        return $bytes;
    }
	public function user_list()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$page_data = array();
		$page_data['title'] = 'User List';
		//$data = $this->Comman_model->get_all_data('users');
		$data = $this->Comman_model->getUsersList();
		/*echo "<pre>";
		print_r($data);die;*/
		$page_data['userData'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('user_list',$page_data);
		$this->load->view('common/footer');	
	}
	public function user_status()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('user_login', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
	}



	public function add_user()
	{



		if(checkLoginSession()==false) {
            redirect('admin/login');
		}

		if(isset($_POST) && !empty($_POST))
		{
				$email = $_POST['email'];
			$check = $this->Comman_model->check_data('user_login', array('email'=>$email));
			if($check == true)
			{
				$pagedata['msg'] = "User email already exist !";	
				$pagedata['msg_type'] = "error";
				$this->session->set_flashdata('error', 'User email already exist !');
				redirect('admin/add_user');	
			}else{	
				$user_login = array();
				$user_login['email'] = $this->input->post('email');
				$user_login['name'] = $this->input->post('first_name').' '.$this->input->post('last_name');
				$user_login['password'] = md5($this->input->post('password'));
				$user_login['type'] = 2; 
				$user_login['currentdate'] = date('Y-m-d H:i:s'); 
				$user_login['updatedate'] = date('Y-m-d H:i:s'); 
				$user_login['status'] = 1;

				$id = $this->Comman_model->insert_data('user_login', $user_login);


				$image_filename = 'avatar.png';
                $image_data = array();
                $image_data['name'] = $image_filename;
                $image_data['user_login_id'] = $id;
                $image_data['file_type'] = 1;
                $image_data['status'] = 1;
                $image_data['created_date'] =  date('Y-m-d H:i:s');
                $image_id = $this->Comman_model->insert_data('files_record', $image_data);


				$users = array();	
				$users['login_id'] = $id;
				$users['fname'] = $this->input->post('first_name');
				$users['lname'] = $this->input->post('last_name');
				$users['email'] = $this->input->post('email');
				$users['password'] = md5($this->input->post('password'));
				$users['phone'] = $this->input->post('contact');
				$users['country_id'] = $this->input->post('country');
				$users['state_id'] = $this->input->post('state');
				$users['city'] = $this->input->post('city');
				$users['dob'] = $this->input->post('dob');
				$users['gender'] = $this->input->post('gender');
				$users['profile_pic_id'] = $image_id;
				$users['zipCode'] = $this->input->post('zip_code');
 				$users['created_date'] = date('Y-m-d H:i:s'); 
				$users['updated_date'] = date('Y-m-d H:i:s'); 
				$users['status'] = 1;
				$this->Comman_model->insert_data('users', $users);
				

				$pagedata['msg'] = "User Created Successfully !";	
		        $pagedata['msg_type'] = "success";
			  $this->session->set_flashdata('success', 'User Created Successfully !');

			  redirect('admin/add_user');
			}

		}

		/*$id = base64_decode($id);*/
		$data = $this->Comman_model->get_all_data('master_country');
		$intrest = $this->Comman_model->get_all_data('master_primary_field_interest');
		$intrest_2 = $this->Comman_model->get_all_data('master_secondary_field_interest');

		$pagedata['countries'] = $data;
		$pagedata['intrest'] = $intrest;
		$pagedata['intrest_2'] = $intrest_2;
		

		$this->load->view('common/header');
		$this->load->view('common/sidebar', $pagedata);
		$this->load->view('add_user');
		$this->load->view('common/footer');	
	}

	public function get_state_by_city()
	{
		// print_r();
		$state_data = $this->Comman_model->get_data_where('master_state', $_POST);
		if(!empty($state_data) && $state_data != '')
		{
			die(json_encode(array('success'=>true, 'msg'=>'record fetch successfully', 'data'=> $state_data)));
		}else{
			die(json_encode(array('success'=>true, 'msg'=>'No state found')));
		}
	}


	public function business_list()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->business_join_data();
		/*echo "<pre>";
		print_r($data);die;*/
		$pagedata['businessData'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('business_list',$pagedata);
		$this->load->view('common/footer');	
	}

	public function edit_business($id = '')
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		if(isset($_POST) && !empty($_POST))
		{

			$email = $_POST['email'];
			$check = $this->Comman_model->check_data_business('user_login', array('email'=>$email), array('id'=>$_POST['login_id']), 'id');
			
			if($check == true)
			{
				die(json_encode(array('success'=>false, 'msg'=>'User email already exist !', 'msg_type'=> 'error')));
			}else{	
				
				$login_data['email'] = $_POST['email'];
				$login_data['name'] = $_POST['business_name'];
				$login_data['updatedate'] = date('Y-m-d H:i:s');
				$this->Comman_model->update_data('user_login', $login_data, array('id'=>$_POST['login_id']));


				if($_FILES['upload_picture']['name'] != '' )
				{

					$config['upload_path'] = '../src/assets/uploads/images/';
					$config['allowed_types'] = 'gif|jpg|png';
					$config['encrypt_name'] = TRUE;

					$this->upload->initialize($config);
					if ($this->upload->do_upload('upload_picture'))
	                {

	                	$url = '/var/www/html/qualifyed/src/assets/uploads/images/'.$_POST['old_picture'];
	                	if(unlink($url))
	                	{

	                	}
	                    $data = array('upload_data' => $this->upload->data());
	                	$image_filename = $data['upload_data']['file_name'];
		                $image_data = array();
		                $image_data['name'] = $image_filename;
		                $image_data['status'] = 1;
		                $image_data['file_size'] = $_FILES['upload_picture']['size'];
		                $image_id = $this->Comman_model->update_data('files_record', $image_data, array('id'=>$_POST['picture_id']));
		                $insert_data['profile_pic_id'] = $image_id['id'];

	                }
				}
				if($_FILES['upload_bio_video']['name'] != '')
				{

					$config_video['upload_path'] = '../src/assets/uploads/bio_video/';
					$config_video['allowed_types'] = 'mp4|mkv';
					$config_video['encrypt_name'] = TRUE;

					$this->upload->initialize($config_video);
					if ($this->upload->do_upload('upload_bio_video'))
	                {

	                	$url = '/var/www/html/qualifyed/src/assets/uploads/bio_video/'.$_POST['old_video'];
	                	if(unlink($url))
	                	{

	                	}
	                    $data = array('upload_data' => $this->upload->data());
	                	$image_filename = $data['upload_data']['file_name'];
		                $image_data = array();
		                $image_data['name'] = $image_filename;
		                $image_data['status'] = 1;
		                $image_data['file_size'] = $_FILES['upload_bio_video']['size'];

		                if($_POST['video_id'] != '' && $_POST['video_id'] != 0)
		                {
		                	$image_id = $this->Comman_model->update_data('files_record', $image_data, array('id'=>$_POST['video_id']));
		                	$insert_data['bio_video_id'] = $image_id['id'];

		                }
		                else
		                {

		                	$image_data['user_login_id'] = $_POST['login_id'];
		                	$image_data['file_type'] = 2;
		                	$image_data['created_date'] = date('Y-m-d');
		                	$image_data['updated_date'] = date('Y-m-d');
		                	$image_id = $this->Comman_model->insert_data('files_record', $image_data);
		                	$insert_data['bio_video_id'] = $image_id;
		                }



	                }
				}

				$insert_data['name'] = $_POST['business_name'];
				$insert_data['addressline1'] = $_POST['address_line_1'];
				$insert_data['addressline2'] = $_POST['address_line_2'];
				$insert_data['email'] = $_POST['email'];
				$insert_data['phone'] = $_POST['phone'];
				$insert_data['country_id'] = $_POST['country'];
				$insert_data['state_id'] = $_POST['state'];
				$insert_data['city'] = $_POST['city'];
				$insert_data['zipcode'] = $_POST['zipcode'];
				$insert_data['work'] = $_POST['field_of_intrest'];
				$insert_data['description'] = $_POST['discriotion_of_business'];
				$insert_data['website'] = $_POST['website'];
				$insert_data['companysize'] = $_POST['company_size'];
				$insert_data['location'] = $_POST['location'];
				$insert_data['companytype'] = $_POST['company_type'];
				$insert_data['date'] = $_POST['date_founded'];

				$this->Comman_model->update_data('bussiness_profile', $insert_data, array('loginid'=>$_POST['login_id']));

				die(json_encode(array('success'=>true, 'msg'=>'Business update successfully', 'msg_type'=> 'success')));
				$pagedata['msg'] = "Business update successfully";	
				$pagedata['msg_type'] = "success";	
				

			}
		}

		$id = base64_decode($id);
		$businessData = $this->Comman_model->get_business_data_where(array('id'=>$id));
		$data = $this->Comman_model->get_data_where('master_country', array('status'=>1));
		$field_of_intrest = $this->Comman_model->get_data_where('master_work_industry', array('status'=>1));
		$master_company_size = $this->Comman_model->get_data_where('master_company_size', array('status'=>1));
		$master_company_type = $this->Comman_model->get_data_where('master_company_type', array('status'=>1));

		$master_state = $this->Comman_model->get_data_where('master_state', array('status'=>1, 'country_id'=>$businessData['country_id']));

		$pagedata['countries'] = $data;
		$pagedata['field_of_intrest'] = $field_of_intrest;
		$pagedata['company_size'] = $master_company_size;
		$pagedata['company_type'] = $master_company_type;
		$pagedata['master_state'] = $master_state;
		$pagedata['businessData'] = $businessData;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('edit_business',$pagedata);
		$this->load->view('common/footer');	
	}

	public function view_post($id)
	{   
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		//print_r($_SERVER);die;
		$pagedata = $data = array();
		$data = $this->Comman_model->getPostListForUser($id);
		$userData= $this->Comman_model->get_data_where('user_login', array('id'=>$id));
		$usertype = $userData[0]['type'];
		$share_p= $this->Comman_model->getShareList($id);
		if($usertype==1){
			$userName = $this->Comman_model->get_data_where('bussiness_profile', array('loginid'=>$id));
			$userName = ucfirst($userName[0]['name']);
			$pagedata['userName'] = $userName;
		}
		else
		{
			$userName = $this->Comman_model->get_data_where('users', array('login_id'=>$id));
			$userName = ucfirst($userName[0]['name']);
			$pagedata['userName'] = $userName;
		}

		/*print_r($share_p); die;*/
		
		$pagedata['share_p'] = $share_p;

		$pagedata['users_post'] = $data;
		$pagedata['usertype'] = $usertype;
		
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('view_post',$pagedata);
		$this->load->view('common/footer');	
	}


	public function view_post_by_id()
	{   
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$id = $this->input->post('id');
		$finalData =array();
		$data = $this->Comman_model->get_data_where('users_post', array('id'=>$_POST['id']));
		$text = $data[0]['post'];
		$img_path = '';
		$img_id=$data[0]['media_id'];
		$img_path=  '';
		$showImage='';
		if($img_id!=0){
			$imageData = $this->Comman_model->get_data_where('files_record', array('id'=>$img_id));
			$imageName = $imageData[0]['name'];
			$img_path= base_url("../src/assets/createpost/images/$imageName") ;
			$showImage = '<br/><img src="'.$img_path.'" height="200px" width="200px">';
			$text.=$showImage; 
		}
		$created_date= $data[0]['created_date'];
		$no_of_like= $this->Comman_model->getNumRows('users_like', array('entity_type'=>1,'entity_id'=>$data[0]['id'],'status'=>1));
		$no_of_comment= $this->Comman_model->getNumRows('user_post_comment', array('entity_type'=>1,'entity_id'=>$data[0]['id'],'status'=>1));

		if($data[0]['post']==1)
		{
			$privacy = 'Public';	
		}
		elseif ($data[0]['post']==2) {
			$privacy = 'Private';
		}
		else
		{
			$privacy = 'connection Only';	
		}

		$share_p= $this->Comman_model->getShareList($id);
		$LikeUserList= $this->Comman_model->getPostLikeUserList($id);
		$commentUserList= $this->Comman_model->getPostCommentUserList($id);
		// echo "<pre>";
		// print_r($commentUserList);
		$data = $data[0];
		$data['privacy'] = $privacy;
		$data['post'] = $text;
		$data['no_of_like'] = $no_of_like;
		$data['no_of_comment'] = $no_of_comment;
		$finalData['data'] = $data;
		$finalData['share_p'] = $share_p;
		$finalData['LikeUserList'] = $LikeUserList;
		$finalData['commentUserList'] = $commentUserList;
		// print_r($finalData);
		// die();
		$html = $this->load->view('showPostData',$finalData,true);

		/*$html = '<table class="table"><tr><td><b>Post:</b></td>
						<td>' . $text. ' 
						
						</td></tr>
				
				<tr><td><b>Create Date:</b></td>
						<td>'.$created_date.'</td>
				</tr>
				<tr><td><b>NO. of Likes:</b></td>
						<td>'.$no_of_like.'</td>
				</tr>
				<tr><td><b>NO. of Comments:</b></td>
						<td>'.$no_of_comment.'</td>
				</tr>
				
				</table>' ;*/

		print_r($html);
	}


	public function add_business()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}

		if(isset($_POST) && !empty($_POST))
		{

			$email = $_POST['email'];
			$check = $this->Comman_model->check_data('user_login', array('email'=>$email));
			if($check == true)
			{
				$pagedata['msg'] = "User email already exist !";	
				$pagedata['msg_type'] = "error";	

				$this->session->set_flashdata('error', 'User email already exist !');

			  redirect('admin/add_business');
			}else{	


				$login_data['email'] = $_POST['email'];
				$login_data['name'] = $_POST['business_name'];
				$login_data['password'] = md5($_POST['password']);
				$login_data['type'] = 1;
				$login_data['currentdate'] = date('Y-m-d H:i:s');
				$login_data['updatedate'] = date('Y-m-d H:i:s');
				$login_data['status'] = 1;

				$insertedId = $this->Comman_model->insert_data('user_login', $login_data);

				$config['upload_path'] = '../src/assets/uploads/images/';
				$config['allowed_types'] = 'gif|jpg|png';
				$config['encrypt_name'] = TRUE;

				$this->upload->initialize($config);
				if ( ! $this->upload->do_upload('upload_picture'))
                {
                    $image_filename = 'avatar.png';
                }
                else
                {
                    $data = array('upload_data' => $this->upload->data());
                	$image_filename = $data['upload_data']['file_name'];
                }

                $image_data = array();
                $image_data['name'] = $image_filename;
                $image_data['user_login_id'] = $insertedId;
                $image_data['file_type'] = 1;
                $image_data['status'] = 1;
                $image_data['status'] = $_FILES['upload_picture']['size'];
                $image_data['created_date'] =  date('Y-m-d H:i:s');
                $image_id = $this->Comman_model->insert_data('files_record', $image_data);

                $config_video['upload_path'] = '../src/assets/uploads/bio_video/';
				$config_video['allowed_types'] = 'mp4|mkv';
				$config_video['encrypt_name'] = TRUE;

				$this->upload->initialize($config_video);
				if ($this->upload->do_upload('upload_bio_video'))
                {
                    $data = array('upload_data' => $this->upload->data());
                	$video_filename = $data['upload_data']['file_name'];
	                $video_data = array();
	                $video_data['name'] = $video_filename;
	                $video_data['user_login_id'] = $insertedId;
	                $video_data['file_type'] = 2;
	                $video_data['file_size'] = $_FILES['upload_bio_video']['size'];
	                $video_data['status'] = 1;
	                $video_data['created_date'] =  date('Y-m-d H:i:s');
	                $video_id = $this->Comman_model->insert_data('files_record', $video_data);
                }else{
                	$video_id = '';
                }

				$insert_data['loginid'] = $insertedId;
				$insert_data['name'] = $_POST['business_name'];
				$insert_data['addressline1'] = $_POST['address_line_1'];
				$insert_data['addressline2'] = $_POST['address_line_2'];
				$insert_data['phone'] = $_POST['phone'];
				$insert_data['country_id'] = $_POST['country'];
				$insert_data['state_id'] = $_POST['state'];
				$insert_data['city'] = $_POST['city'];
				$insert_data['zipcode'] = $_POST['zipcode'];
				$insert_data['email'] = $_POST['email'];
				$insert_data['work'] = $_POST['field_of_intrest'];
				$insert_data['description'] = $_POST['discriotion_of_business'];
				$insert_data['profile_pic_id'] = $image_id;
				$insert_data['bio_video_id'] = $video_id;
				$insert_data['website'] = $_POST['website'];
				$insert_data['companysize'] = $_POST['company_size'];
				$insert_data['location'] = $_POST['location'];
				$insert_data['companytype'] = $_POST['company_type'];
				$insert_data['date'] = date("Y-m-d",strtotime($_POST['date_founded']));

				$this->Comman_model->insert_data('bussiness_profile', $insert_data);

				$pagedata['msg'] = "Business registered successfully";	
				$pagedata['msg_type'] = "success";	

				$this->session->set_flashdata('success', 'Business registered successfully !');

			  redirect('admin/add_business');	
			}
		}

		$data = $this->Comman_model->get_data_where('master_country', array('status'=>1));
		$field_of_intrest = $this->Comman_model->get_data_where('master_work_industry', array('status'=>1));
		$master_company_size = $this->Comman_model->get_data_where('master_company_size', array('status'=>1));
		$master_company_type = $this->Comman_model->get_data_where('master_company_type', array('status'=>1));
		$pagedata['countries'] = $data;
		$pagedata['field_of_intrest'] = $field_of_intrest;
		$pagedata['company_size'] = $master_company_size;
		$pagedata['company_type'] = $master_company_type;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('add_business',$pagedata);
		$this->load->view('common/footer');	
	}

	public function login()
	{		
		if(checkLoginSession()) {
            redirect('admin/dashboard');
         }
         else
         {
         	$error_data=array();
         	if(isset($_POST['login']))
			{				
				$username = $this->input->post('username');
				$password = $this->input->post('password');
	            
	            $this->form_validation->set_rules('username', 'Email', 'trim|required');
	            $this->form_validation->set_rules('password', 'Password', 'trim|required');
	            if ($this->form_validation->run() == TRUE)
                {	
                	$where = array('email' => $username,'password'=>md5($password),'status'=>1);
                	$checkAdminInfo = $this->Comman_model->getNumRows('admin_info', $where);
                	if($checkAdminInfo > 0)
					{
						$getAdminData = $this->Comman_model->get_single_row('admin_info', $where);
                        $session_data=array('userid'=>$getAdminData['id'],
                                            'isUserLoggedIn'=>TRUE);
                        $this->session->set_userdata($session_data);
                        redirect('dashboard');
                    }
                    else
                    {
                        $error_data = array('error_message' => 'Invalid Username or Password');
                    }
                }
                else
                {
                	$error_data = array('error_message' => validation_errors());
                }
			}
				$this->load->view('login',$error_data);
         }				
		
	} // end of login
	public function logout()
    {
        // $uid=$this->session->userdata('userid');
        //$this->adminmodel->update_lastLogin($uid);
    	$array_items = array('isUserLoggedIn');
        $this->session->unset_userdata($array_items);
    	$this->session->sess_destroy();
    	redirect('login');
    	
    }
    public function countries()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
    	$data = $this->Comman_model->get_all_data('master_country');
    	$pagedata['countries'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('countries',$pagedata);
		$this->load->view('common/footer');	
    }

    public function master_company_size()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	if(isset($_POST) && !empty($_POST))
		{
			$size = $_POST['size'];
			$check = $this->Comman_model->check_data('master_company_size', array('size'=>$size));

			if($check == true)
			{
				$pagedata['msg'] = "This Company size already exist !";	
				$pagedata['msg_type'] = "error";

				$this->session->set_flashdata('error', 'This Company size already exist !');

			     redirect('admin/master_company_size');		
			}else{
				$insert_data = array();

				$insert_data['size'] = $_POST['size'];
				$insert_data['create_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_company_size', $insert_data);
				$pagedata['msg'] = "Company size successfully added ";	
				$pagedata['msg_type'] = "success";	
				
				$this->session->set_flashdata('success', 'Company size successfully added !');

			     redirect('admin/master_company_size');	
			}
		}	
    	$data = $this->Comman_model->get_all_data('master_company_size');
    	$pagedata['master_company_size'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_company_size',$pagedata);
		$this->load->view('common/footer');	
    }


    public function master_company_type()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	if(isset($_POST) && !empty($_POST))
		{
			$name = $_POST['name'];
			$check = $this->Comman_model->check_data('master_company_type', array('name'=>$name));

			if($check == true)
			{
				$pagedata['msg'] = "This Company type already exist !";	
				$pagedata['msg_type'] = "error";

				$this->session->set_flashdata('error', 'This Company type already exist !');

			     redirect('admin/master_company_type');	

			}else{
				$insert_data = array();

				$insert_data['name'] = $_POST['name'];
				$insert_data['create_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_company_type', $insert_data);
				$pagedata['msg'] = "Company Type successfully added ";	
				$pagedata['msg_type'] = "success";

				$this->session->set_flashdata('success', 'Company Type successfully added');

			     redirect('admin/master_company_type');		
			}
		}
    	$data = $this->Comman_model->get_all_data('master_company_type');
    	$pagedata['master_company_type'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_company_type',$pagedata);
		$this->load->view('common/footer');	
    }


   public function master_primary_field_interest()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	if(isset($_POST) && !empty($_POST))
		{
			$name1 = $_POST['name1'];
			$check = $this->Comman_model->check_data('master_primary_field_interest', array('name'=>$name1));

			if($check == true)
			{
				$pagedata['msg'] = "This Primary Field Interest already exist !";	
				$pagedata['msg_type'] = "error";	
			}else{
				$insert_data = array();

				$insert_data['name'] = $_POST['name1'];
				$insert_data['created_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_primary_field_interest', $insert_data);
				$pagedata['msg'] = "Primary Field Interest successfully added ";	
				$pagedata['msg_type'] = "success";	
			}
		}
    	$data = $this->Comman_model->get_all_data('master_primary_field_interest');
    	$pagedata['master_primary_field_interest'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_primary_field_interest',$pagedata);
		$this->load->view('common/footer');	
    }


    public function master_secondary_field_interest()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	if(isset($_POST) && !empty($_POST))
		{
			$name2 = $_POST['name2'];
			$check = $this->Comman_model->check_data('master_secondary_field_interest', array('name'=>$name2));

			if($check == true)
			{
				$pagedata['msg'] = "This Secondary Field Interest already exist !";	
				$pagedata['msg_type'] = "error";	
			}else{
				$insert_data = array();

				$insert_data['name'] = $_POST['name2'];
				$insert_data['created_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_secondary_field_interest', $insert_data);
				$pagedata['msg'] = "Secondary Field Interest successfully added ";	
				$pagedata['msg_type'] = "success";	
			}
		}
    	$data = $this->Comman_model->get_all_data('master_secondary_field_interest');
    	$pagedata['master_secondary_field_interest'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_secondary_field_interest',$pagedata);
		$this->load->view('common/footer');	
    }


    public function master_work_industry()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	if(isset($_POST['add_work']) && !empty($_POST['add_work']))
		{
			$name3 = $_POST['name3'];
			//$name_ee = $_POST['name_ee)'];
			$check = $this->Comman_model->check_data('master_work_industry', array('name'=>$name3));

			if($check == true)
			{
				$pagedata['msg'] = "This Master Work Industry already exist !";	
				$pagedata['msg_type'] = "error";	
			}else{
				$insert_data = array();

				$insert_data['name'] = $_POST['name3'];
				$insert_data['create_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_work_industry', $insert_data);
				$pagedata['msg'] = "Master Work Industry added ";	
				$pagedata['msg_type'] = "success";	

				/*$update_data = array(
					'name'=>$_POST['name_ee'],
				);
			  	$update_id = array(
					'id'=>$_POST['id'],
					);		
				$this->Comman_model->update_data('master_state', $update_data, $update_id);*/
			}
		}
    	$data = $this->Comman_model->get_all_data('master_work_industry');
    	$pagedata['master_work_industry'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_work_industry',$pagedata);
		$this->load->view('common/footer');	
    }

    
    
    public function miscellaneous_update()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$name = $_POST['misc'];
    	//$name = str_replace("+"," ",$name);
    	$table = $_POST['table'];
    	$coloum_name = $_POST['col'];
    	$check_col = $_POST['check_col_data'];
    	$check_col_name = $_POST['check_col_name'];

    	$check = $this->Comman_model->check_data_business($table,array($coloum_name=>$name), array('id'=>$check_col), $check_col_name);
    	if($check == true)
    	{
    		die(json_encode(array('success'=>false, 'msg'=>'Already Exist !', 'error_type'=>'error')));
    	}
    	else
    	{
			$this->Comman_model->update_data($table, array($coloum_name=>$name), array($check_col_name=>$check_col));
    		die(json_encode(array('success'=>true, 'msg'=>'Updated successfully ', 'error_type'=>'success')));
    	}

    }

    public function get_country_by_id()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$country_data = $this->Comman_model->get_data_where('master_country', array('id'=>$_POST['id']));
    	die(json_encode($country_data));
    }
    public function add_edit_country()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		//print_r($_POST);die;
    	// update_type (1) = insert
    	// update_type (2) = update

		$name2 = $_POST['name'];
		$country_data = array(
			'sortname'=>$_POST['sortname'], 
			'name'=>$name2, 
			'phonecode'=>$_POST['phonecode'], 
		);
    	if($_POST['update_type'] == 1)
    	{
			$check = $this->Comman_model->check_data('master_country', array('name'=>$name2));
    		if($check == true)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"Country already exist !", 'error_type'=>'error')));

    		}else{
				$this->Comman_model->insert_data('master_country', $country_data);
				die(json_encode(array('success'=>true, 'msg'=>"Country added successfully", 'error_type'=>'success')));
    		}

    	}
    	elseif(($_POST['update_type'] == 2))
    	{
			$check = $this->Comman_model->check_data_business('master_country', array('name'=>$name2), array('id'=>$_POST['id']), 'id');
			if($check  == true)
			{
				die(json_encode(array('success'=>false, 'msg'=>"Country already exist !", 'error_type'=>'error')));
			}else{
				$this->Comman_model->update_data('master_country', $country_data, array('id'=>$_POST['id']));
				die(json_encode(array('success'=>true, 'msg'=>"Country update successfully", 'error_type'=>'success')));
			}
    	}
    }
    
    public function status_list($id = '')
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
    	
    	$master_company_size = $this->Comman_model->get_data_where('master_state', array('country_id'=>$id));
    	$pagedata['master_state'] = $master_company_size;
    	$pagedata['co_id'] = $id;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('status_list',$pagedata);
		$this->load->view('common/footer');	
    }


    public function state_add_new()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
			$name_add = $_POST['name'];
			$check = $this->Comman_model->check_data('master_state', array('name'=>$name_add));
    		if($check == true)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"State already exist !", 'error_type'=>'error')));

    		}else{
    			
				$this->Comman_model->insert_data('master_state', $_POST);
				die(json_encode(array('success'=>true, 'msg'=>"State added successfully", 'error_type'=>'success')));
    		}
	}

	public function view_contact_details()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}	
		$data = $this->Comman_model->get_all_contact_data('contact_us`');
    	$pagedata['contact_us'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('view_contact_request',$pagedata);
		$this->load->view('common/footer');	

    }
    public function showContactreasonDetail()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$id = $this->input->post('id');
		$data = $this->Comman_model->get_data_where('contact_us', array('id'=>$id));
		$data = $data[0];
		//$getUSerData = $this->Comman_model->getUserName($data['user_login_id']);
		if($data['user_type'] == 2){
				$report_type = 'User Profile';
				$getUSerData = $this->Comman_model->getUserName($data['login_id']);
				$name = $getUSerData['name'];
			}
			elseif ($data['user_type'] == 1) {
				$report_type = 'Business Profile';
				$getUSerData = $this->Comman_model->getUserName($data['login_id']);
				$name = $getUSerData['name'];
			}
			else {
				$report_type = 'Guest User';
				$name = 'Guest';
			}
		$reason_data = $this->Comman_model->get_data_where('master_contact_reason', array('id'=>$data['reason']));	
		$reason_data = $reason_data[0];
		$html = '<table class="table">';
		$html .= '<tr><td width="40%">Name </td><td>'.$name.'</td></tr>';
		$html .= '<tr><td width="40%">Email </td><td>'.$data['email'].'</td></tr>';
		$html .= '<tr><td>User Type </td><td>'.$report_type.'</td></tr>';
		$html .= '<tr><td>Reason For</td><td>'.$reason_data['reason'].'</td></tr>';
		$html .= '<tr><td>About </td><td>'.$data['tell_us_about'].'</td></tr>';
		$html .= '<tr><td>Date </td><td>'.date("F d Y",strtotime($data['tell_us_about'])).'</td></tr>';

		$html.='</table>';
		echo $html;
    }
    public function contact_reason()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
    	if(isset($_POST['add_reason']) && !empty($_POST['add_reason']))
		{
			//print_r($_POST);die;
			$name2 = ucfirst($_POST['name_re']);
			$check = $this->Comman_model->check_data('master_contact_reason', array('reason'=>$name2));

			if($check == true)
			{
				$pagedata['msg'] = "This Contacts Reason already exist !";	
				$pagedata['msg_type'] = "error";	
			}else{
				$insert_data = array();

				$insert_data['reason'] = $name2;
				$insert_data['updated_date'] = Date('Y-m-d');
				$insert_data['created_date'] = Date('Y-m-d');
				$insert_data['status'] = 1;
				$this->Comman_model->insert_data('master_contact_reason', $insert_data);
				$pagedata['msg'] = "Reason added successfully  ";	
				$pagedata['msg_type'] = "success";	
			}
		}
			
		$data = $this->Comman_model->get_all_data('master_contact_reason');
    	$pagedata['master_contact_reason'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('manage_contacts_reason',$pagedata);
		$this->load->view('common/footer');	

    }


    public function email_template()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}	
		$data = $this->Comman_model->get_all_data('email_templates');
    	$pagedata['email_templates'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('email_template',$pagedata);
		$this->load->view('common/footer');	
    }

    public function edit_email_template($id = ""){
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
    		$url = explode('/', current_url());
    		$id = $url[count($url)-1];
			$data = $this->Comman_model->get_data_where('email_templates', array('id'=>$id));
    	$pagedata['email_templates'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('edit_email',$pagedata);
		$this->load->view('common/footer');	
    }


    public function update_email_template()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$update_email_data = array('heading'=>$_POST['heading1'], 'subject'=>$_POST['subject'],  'body'=>$_POST['body'],);	

		$this->Comman_model->update_data('email_templates', $update_email_data, array('id'=>$_POST['id']));
			$pagedata['msg'] = "Update Successfully ";	
				$pagedata['msg_type'] = "success";	
			
    	$data = $this->Comman_model->get_all_data('email_templates');
    	$pagedata['email_templates'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('edit_email',$pagedata);
		$this->load->view('common/footer');	
    }


    public function edit_profile(){
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
      	$url = explode('/', current_url());
    	$id = $_SESSION['userid'];	
    	$data = $this->Comman_model->get_data_where('admin_info', array('id'=>$id));
    	$pagedata['admin_info'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('profile',$pagedata);
		$this->load->view('common/footer');	
    }

    public function update_profile()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
			
    	$data = $this->Comman_model->get_all_data('admin_info');
    	$pagedata['admin_info'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('profile',$pagedata);
		$this->load->view('common/footer');	
    }

    public function profile_changePassword()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

		$check = $this->Comman_model->check_data('admin_info', array('password'=>md5($_POST['old_password'])), array('id'=>$_POST['id']));
		if($check == true && isset($check) && !empty($check))
		{

			$data = $this->Comman_model->update_data('admin_info', array('password'=>md5($_POST['new_password'])), array('id'=>$_SESSION['userid']));
			
			die(json_encode(array('success'=>true, 'msg'=> 'Password update successfully')));
		}
		else
		{
			die(json_encode(array('success'=>false, 'msg'=> 'Old password not match !')));
		}
    }
    
    public function checkPass()
	{


		if(checkLoginSession()==false) {
            redirect('admin/login');
		}

		$check = $this->Comman_model->check_data('admin_info', array('password'=>md5($_POST['password'])), array('id'=>$_SESSION['userid']));
		if($check == true && isset($check) && !empty($check))
		{

			$data = $this->Comman_model->update_data('admin_info', array('name'=>$_POST['name']), array('email'=>$_POST['email']), array('id'=>$_SESSION['userid']));

			die(json_encode(array('success'=>true, 'msg'=> "Password Verfiyed")));
		}
		else
		{
			die(json_encode(array('success'=>false, 'msg'=> 'Password not match !')));
		}

    }
    public function skills()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$data = $this->Comman_model->get_all_data('master_skills');
    	$pagedata['master_skills'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('skills',$pagedata);
		$this->load->view('common/footer');	
    }
    public function get_skills_by_id()
    {

    		if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$skill_data = $this->Comman_model->get_data_where('master_skill_category', array('id'=>$_POST['id']));
    	die(json_encode($skill_data));
    }
     public function add_edit_skill()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	// update_type (1) = insert
    	// update_type (2) = update

		$name2 = $_POST['sortname'];
		$skill_data = array(
			'title'=>$name2,
			'key'=>$_POST['name'], 
		);
    	if($_POST['update_type'] == 1)
    	{
			$check = $this->Comman_model->check_data('master_skill_category', array('title'=>$name2));
    		if($check == true)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"Skill already exist !", 'error_type'=>'error')));

    		}else{
				$this->Comman_model->insert_data('master_skill_category', $skill_data);
				die(json_encode(array('success'=>true, 'msg'=>"Skill added successfully", 'error_type'=>'success')));
    		}

    	}
    	elseif(($_POST['update_type'] == 2))
    	{
			$check = $this->Comman_model->check_data_business('master_skill_category', array('title'=>$name2), array('id'=>$_POST['id']), 'id');
			if($check  == true)
			{
				die(json_encode(array('success'=>false, 'msg'=>"Skill already exist !", 'error_type'=>'error')));
			}else{
				$this->Comman_model->update_data('master_skill_category', $skill_data, array('id'=>$_POST['id']));
				die(json_encode(array('success'=>true, 'msg'=>"Skill update successfully", 'error_type'=>'success')));
			}
    	}
    }
    public function master_skills ($id = ''){

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$url = explode('/', current_url());
    	$id = $url[count($url)-1];
    	$master_company_size = $this->Comman_model->get_data_where('master_skills', array('category_id'=>$id));
    	$pagedata['master_skills'] = $master_company_size;
    	$pagedata['co_id'] = $id;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('skills_list',$pagedata);
		$this->load->view('common/footer');	


    }

    public function master_skills_add()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

			$name_add = $_POST['title'];
			$skills_data = array(
			'title'=>$name_add,
			'key'=>$_POST['hidden_key'], 
			'category_id'=>$_POST['category_id'], 
		);
				$check = $this->Comman_model->check_data('master_skills', array('title'=>$name_add));
    		if($check == true)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"Skills already exist !", 'error_type'=>'error')));

    		}else{
    			
				$this->Comman_model->insert_data('master_skills', $skills_data);
				die(json_encode(array('success'=>true, 'msg'=>"State added successfully", 'error_type'=>'success')));
    		}
		}



	public function edit_user($id)
	{	

		if(checkLoginSession()==false) {
            redirect('admin/login');
		}

		$id = base64_decode($id);
		$data = $this->Comman_model->get_single_row('users', array('id'=>$id));
		$users_education = $this->Comman_model->get_data_where('users_education', array('user_login_id'=>$id));
		$country = $this->Comman_model->get_all_data('master_country');
		$state = $this->Comman_model->get_all_data('master_state');
		$master_primary_field_interest = $this->Comman_model->get_all_data('master_primary_field_interest');
		$master_secondary_field_interest = $this->Comman_model->get_all_data('master_secondary_field_interest');
		$other_info = $this->Comman_model->get_single_row('users_other_info', array('id'=>$id));	

		/*echo "<pre>";print_r($master_primary_field_interest);exit();*/

		$pagedata['user'] = $data;
		$pagedata['users_education'] = $users_education[0];
		$pagedata['countries'] = $country;
		$pagedata['state'] = $state;
		$pagedata['master_primary_field_interest'] = $master_primary_field_interest;
		$pagedata['master_secondary_field_interest'] = $master_secondary_field_interest;
		$pagedata['other_info'] = $other_info;
	/*echo "<pre>";print_r($master_primary_field_interest);exit();*/
		
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('edit_user',$pagedata);
		$this->load->view('common/footer');	
	}
	public function update_user_form1(){

		$name2 = $_POST['email'];
		$id =$_POST['id'];
		$user_data = array(
			'fname'=>$_POST['first_name'], 
			'lname'=>$_POST['last_name'], 
			'email'=>$name2,
			'phone'=>$_POST['contact'], 
			'country_id'=>$_POST['country'], 
			'city'=>$_POST['city'], 
			'zipCode'=>$_POST['zip_code'], 
			'dob'=>$_POST['dob'], 
			'state_id'=>$_POST['state'], 
			'gender'=>$_POST['gender'], 
			);

			$check = $this->Comman_model->check_data_business('users', array('email'=>$name2), array('id'=>$_POST['login_id']), 'id');
			if($check == false)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"User Email already exist !", 'error_type'=>'error')));

    		}else{
				$this->Comman_model->update_data('users', $user_data, array('id'=>$id));
				die(json_encode(array('success'=>true, 'msg'=>"Personal Info  update successfully", 'error_type'=>'success')));
				}

		}
	public function master_working_hours()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	$data = $this->Comman_model->get_all_data('master_working_hours');
    	$pagedata['master_working_hours'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('master_working_hours',$pagedata);
		$this->load->view('common/footer');	
    }
     public function master_working_hours_add()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}

    	// update_type (1) = insert
    	// update_type (2) = update

		$name2 = $_POST['sortname'];
		$skill_data = array(
			'title'=>$name2,
			'value'=>$_POST['name'], 
		);
    	if($_POST['update_type'] == 1)
    	{
			$check = $this->Comman_model->check_data('master_working_hours', array('title'=>$name2));
    		if($check == true)
    		{
				die(json_encode(array('success'=>false, 'msg'=>"Working Hours already exist !", 'error_type'=>'error')));

    		}else{
				$this->Comman_model->insert_data('master_working_hours', $skill_data);
				die(json_encode(array('success'=>true, 'msg'=>"Working Hours added successfully", 'error_type'=>'success')));
    		}

    	}
    	elseif(($_POST['update_type'] == 2))
    	{
			$check = $this->Comman_model->check_data_business('master_working_hours', array('title'=>$name2), array('id'=>$_POST['id']), 'id');
			if($check  == true)
			{
				die(json_encode(array('success'=>false, 'msg'=>"Working Hours already exist !", 'error_type'=>'error')));
			}else{
				$this->Comman_model->update_data('master_working_hours', $skill_data, array('id'=>$_POST['id']));
				die(json_encode(array('success'=>true, 'msg'=>"Working Hours update successfully", 'error_type'=>'success')));
			}
    	}
    }
     public function get_working_hours_by_id()
    {

    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		
    	$skill_data = $this->Comman_model->get_data_where('master_working_hours', array('id'=>$_POST['id']));
    	die(json_encode($skill_data));
    }


/*status button*/


   
    public function countries_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_country', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }
    public function get_business_by_id()
    {
		$businessData = $this->Comman_model->get_business_data_where($_POST);
		die(json_encode(array('status'=>1,'msg'=>"success", 'data'=>$businessData )));
    }

    public function state_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_state', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_company_size_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_company_size', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_company_type_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_company_type', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_primary_field_interest_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_primary_field_interest', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_secondary_field_interest_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_secondary_field_interest', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

      public function email_templates_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('email_templates', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_work_industry_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_work_industry', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

      public function master_contact_reason_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_contact_reason', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

     public function master_skill_category_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_skill_category', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }
     public function master_working_hours_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_working_hours', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }
     public function view_post_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('users_post', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }

    public function master_skill_list_status()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$data = $this->Comman_model->update_data('master_skills', array('status'=>$_POST['status']), array('id'=>$_POST['id']));
    }
    public function changePassword()
    {
		/*$check = $this->Comman_model->check_data('user_login', array('password'=>md5($_POST['old_password'])), array('id'=>$_POST['id']));
		if($check == true && isset($check) && !empty($check))
		{*/

			$data = $this->Comman_model->update_data('user_login', array('password'=>md5($_POST['new_password'])), array('id'=>$_POST['id']));
			
			die(json_encode(array('success'=>true, 'msg'=> 'Password update successfully')));
		/*}
		else
		{
			die(json_encode(array('success'=>false, 'msg'=> 'Old password not match !')));
		}*/
    }

    public function UserchangePassword()
    {
		$data = $this->Comman_model->update_data('user_login', array('password'=>md5($_POST['new_password'])), array('id'=>$_POST['id']));
			
			die(json_encode(array('success'=>true, 'msg'=> 'Password update successfully')));
    }
    

  	public function isEmailExist()
    {	
    	$email = $_POST['email'];
    	$checkData = $this->Comman_model->getNumRows('user_login', array('email'=>$email));
    	if($checkData == 0)
    	{
    		echo "true";
    	}
    	else
    	{
    		echo "false";
    	}
	}

	public function getUserDetail()
	{
		$id = $this->input->post('id');
		$data = $this->Comman_model->getUserDetail($id);
		$bio_vdo = $profilePicUrl = $resume_file = '';
		$data = $data[0];		
		if($data['is_transportation'] == 1)
		{
			$is_transportation = 'Yes';
		}
		else
		{
			$is_transportation = 'No';
		}
		if($data['profile']!="" ){
			$profilePicUrl = base_url('../src/assets/uploads/images/'.$data["profile"]);
		}
		
		if($data['bio_vdo']!="" ){
			$bio_vdo = base_url("../src/assets/uploads/bio_video/").$data['bio_vdo'];
		}
		if($data['resume_file']!="" ){
			$resume_file = base_url("../src/assets/uploads/resume/").$data['resume_file'];
		}

		/*print_r($data);die;*/
		$html = '<table class="table">';
		$html .= '<tr><td width="40%">Name</td><td>'.$data['fname']." ".$data['lname'].'</td></tr>';
		$html .= '<tr><td>Email</td><td>'.$data['email'].'</td></tr>';
		$html .= '<tr><td>Phone</td><td>'.$data['phone'].'</td></tr>';
		$html .= '<tr><td>Country</td><td>'.$data['country'].'</td></tr>';
		$html .= '<tr><td>State</td><td>'.$data['state'].'</td></tr>';
		$html .= '<tr><td>Primary Interest</td><td>'.$data['primary_interest'].'</td></tr>';
		$html .= '<tr><td>Secondary Interest</td><td>'.$data['secondry_interest_name'].'</td></tr>';
		$html .= '<tr><td>Work Additional Info</td><td>'.$data['work_additional_info'].'</td></tr>';
		$html .= '<tr><td>Hours Per Week</td><td>'.$data['hours_per_week'].'</td></tr>';
		$html .= '<tr><td>Travel Location</td><td>'.$data['travel_location'].'</td></tr>';
		$html .= '<tr><td>Is Transportation</td><td>'.$is_transportation.'</td></tr>';
		$html .= '<tr><td>About Bio</td><td>'.$data['about_bio'].'</td></tr>';
		$html .= '<tr><td>Experience</td><td>'.$data['experience'].'</td></tr>';
		$html .= '<tr><td>Profile Picture</td><td><img src="'.$profilePicUrl.'" width="100px" height="100px"></td></tr>';
		$html .= '<tr><td>Bio Video</td>';
		if($bio_vdo!="")
			$html .='<td><video controls height="140"><source src="'.$bio_vdo.'"></source></video></td></tr>';
		else
		{
			$html .='<td>No video available</td></tr>';
		}
		
		$html .='</table>';
		echo $html;
	}

	public function reports()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$pagedata = array();

		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('reports',$pagedata);
		$this->load->view('common/footer');	
	}

	public function getReportData()
	{
		$data = $finalData = $pageData = array();
		$type = $this->input->post('type');
		$dateRange = $this->input->post('date_range');
		$explodeDate = explode("-", $dateRange);
		$date1 = explode("/", $explodeDate[0]);
		$date2 = explode("/", $explodeDate[1]);
		
		$startDate = $date1[2]."-".$date1[0]."-".$date1[1];
		$startDate = str_replace(' ', '', $startDate);
		$endDate = $date2[2]."-".$date2[0]."-".$date2[1];
		$endDate = str_replace(' ', '', $endDate);
		$condition = array('startDate'=>$startDate,'endDate'=>$endDate);
		if($type == 1)
		{
			$data = $this->Comman_model->getBusinessReport($condition);
			foreach ($data as $key => $value) {
							 $finalData[$key]['s_no'] = $key+1;
							 $finalData[$key]['full_name'] = $value['fullname'];
							 $finalData[$key]['email'] = $value['email'];
							 $finalData[$key]['phone'] = $value['phone'];
							 $finalData[$key]['register_date'] = date("d F Y",strtotime($value['currentdate']));
						}
						$pageData['finalData'] = $finalData; 
			$datta_view = $this->load->view('business_report',$pageData, true);
		}
		elseif ($type == 2) {
			$data = $this->Comman_model->getUserReport($condition);
			foreach ($data as $key => $value) {
							 $finalData[$key]['s_no'] = $key+1;
							 $finalData[$key]['full_name'] = $value['fullname'];
							 $finalData[$key]['email'] = $value['email'];
							 $finalData[$key]['phone'] = $value['phone'];
							 $finalData[$key]['register_date'] = date("d F Y",strtotime($value['currentdate']));
						}
			$pageData['finalData'] = $finalData ;
			$datta_view = $this->load->view('user_report',$pageData, true);			
		}
		else
		{
			$data = $this->Comman_model->getOpportunity($condition);
			foreach ($data as $key => $value) {
							 $finalData[$key]['s_no'] = $key+1;
							 $finalData[$key]['full_name'] = $value['fullname'];
							 $finalData[$key]['title'] = $value['title'];
							 if($value['is_closed'] == 1)
							 {
							 	$finalData[$key]['close_status'] = 'Open';
							 }
							 else
							 {
							 	$finalData[$key]['close_status'] = 'Close';
							 }
							 
							 $finalData[$key]['register_date'] = date("d F Y",strtotime($value['created_date']));
						}
			$pageData['finalData'] = $finalData ;
			$datta_view = $this->load->view('opportunity_reoprt',$pageData, true);
		}

		
		echo $datta_view ;
		//print_r($finalData);die;
		//exit(json_encode($finalData));
	}

	public function report_abuse()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$pagedata = $data = $finalData = array();
		$data = $this->Comman_model->getReportAbuseList();
		
		foreach ($data as $key => $value) {
			$finalData[] = $value;
			if($value['entity_type'] == 2){
				$finalData[$key]['entity_type'] = 'User Profile';
			}
			elseif ($value['entity_type'] == 1) {
				$finalData[$key]['entity_type'] = 'Business Profile';
			}
			elseif ($value['entity_type'] == 3) {
				$finalData[$key]['entity_type'] = 'Post';
			}
			elseif ($value['entity_type'] == 4) {
				$finalData[$key]['entity_type'] = 'Comment on post';
			}

			if($value['user_logi_type'] == 2)
			{
				$finalData[$key]['user_logi_type'] = "User Profile";	
			}else{
				$finalData[$key]['user_logi_type'] = "Business Profile";	
			}

			$getUSerData = $this->Comman_model->getUserName($value['user_login_id']);
			$finalData[$key]['user_name'] = $getUSerData['name'];
			
		}// END OF FOREACH
		$pagedata['data'] = $finalData;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('report_abuse',$pagedata);
		$this->load->view('common/footer');
	}

	public function reportAbuseDetail()
	{
		$id = $this->input->post('id');
		$data = $this->Comman_model->get_data_where('report_abuse', array('id'=>$id));
		$data = $data[0];
		$getUSerData = $this->Comman_model->getUserName($data['user_login_id']);
		if($data['entity_type'] == 2){
				$report_type = 'User Profile';
			}
			elseif ($data['entity_type'] == 1) {
				$report_type = 'Business Profile';
			}
			elseif ($data['entity_type'] == 3) {
				$report_type = 'Post';
			}
			elseif ($data['entity_type'] == 4) {
				$report_type= 'Comment on post';
			}
		$html = '<table class="table">';
		$html .= '<tr><td width="40%">Reported By </td><td>'.$getUSerData['name'].'</td></tr>';
		$html .= '<tr><td>Report For </td><td>'.$report_type.'</td></tr>';
		$html .= '<tr><td>Report </td><td>'.$data['comments'].'</td></tr>';
		$html .= '<tr><td>Date </td><td>'.date("F d Y",strtotime($data['created_date'])).'</td></tr>';

		$html.='</table>';
		echo $html;
	}
	public function getEntityDetails()
	{
		if($_POST['type'] == 'User Profile'){
			$id = $this->input->post('id');
			$data = $this->Comman_model->getUserDetail($id);
			$bio_vdo = $profilePicUrl = $resume_file = '';
			$data = $data[0];		
			if($data['is_transportation'] == 1)
			{
				$is_transportation = 'Yes';
			}
			else
			{
				$is_transportation = 'No';
			}
			if($data['profile']!="" ){
				$profilePicUrl = base_url('../src/assets/uploads/images/'.$data["profile"]);
			}
			
			if($data['bio_vdo']!="" ){
				$bio_vdo = base_url("../src/assets/uploads/bio_video/").$data['bio_vdo'];
			}
			if($data['resume_file']!="" ){
				$resume_file = base_url("../src/assets/uploads/resume/").$data['resume_file'];
			}

			/*print_r($data);die;*/
			$html = '<table class="table">';
			$html .= '<tr><td width="40%">Name</td><td>'.$data['fname']." ".$data['lname'].'</td></tr>';
			$html .= '<tr><td>Email</td><td>'.$data['email'].'</td></tr>';
			$html .= '<tr><td>Phone</td><td>'.$data['phone'].'</td></tr>';
			$html .= '<tr><td>Country</td><td>'.$data['country'].'</td></tr>';
			$html .= '<tr><td>State</td><td>'.$data['state'].'</td></tr>';
			$html .= '<tr><td>Primary Interest</td><td>'.$data['primary_interest'].'</td></tr>';
			$html .= '<tr><td>Secondary Interest</td><td>'.$data['secondry_interest_name'].'</td></tr>';
			$html .= '<tr><td>Work Additional Info</td><td>'.$data['work_additional_info'].'</td></tr>';
			$html .= '<tr><td>Hours Per Week</td><td>'.$data['hours_per_week'].'</td></tr>';
			$html .= '<tr><td>Travel Location</td><td>'.$data['travel_location'].'</td></tr>';
			$html .= '<tr><td>Is Transportation</td><td>'.$is_transportation.'</td></tr>';
			$html .= '<tr><td>About Bio</td><td>'.$data['about_bio'].'</td></tr>';
			$html .= '<tr><td>Experience</td><td>'.$data['experience'].'</td></tr>';
			$html .= '<tr><td>Profile Picture</td><td><img src="'.$profilePicUrl.'" width="100px" height="100px"></td></tr>';
			$html .= '<tr><td>Bio Video</td><td><video controls height="140"><source src="'.$bio_vdo.'"></source></video></td></tr>';
			
			$html .='</table>';
			echo $html;
		}
		elseif ($_POST['type'] == 'Business Profile') {
			$id = $this->input->post('id');
			$data = $this->Comman_model->get_business_data_where(array('id'=>$id));
			$bio_vdo = $profilePicUrl = '';

			if($data['profile']!="" ){
				$profilePicUrl = base_url('../src/assets/uploads/images/'.$data["profile"]);
			}
			
			if($data['bio_video']!="" ){
				$bio_vdo = base_url("../src/assets/uploads/bio_video/").$data['bio_video'];
			}

			$html = '<table class="table">';
			$html .= '<tr><td width="40%">Name</td><td>'.$data['name'].'</td></tr>';
			$html .= '<tr><td>Email</td><td>'.$data['email'].'</td></tr>';
			$html .= '<tr><td>Phone</td><td>'.$data['phone'].'</td></tr>';
			$html .= '<tr><td>Country</td><td>'.$data['country'].'</td></tr>';
			$html .= '<tr><td>State</td><td>'.$data['state'].'</td></tr>';
			$html .= '<tr><td>Work Additional Info</td><td>'.$data['description'].'</td></tr>';
			$html .= '<tr><td>Profile Picture</td><td><img src="'.$profilePicUrl.'" width="100px" height="100px"></td></tr>';
			$html .= '<tr><td>Bio Video</td><td><video controls height="140"><source src="'.$bio_vdo.'"></source></video></td></tr>';
			
			$html .='</table>';
			echo $html;
		}
		elseif ($_POST['type'] == 'Post') {
			$POST = $this->Comman_model->get_data_where('users_post', array('id'=>$_POST['id']));
			$file = $this->Comman_model->get_data_where('files_record', array('id'=>$POST[0]['media_id']));
			$Poster = $this->Comman_model->get_data_where('user_login', array('id'=>$POST[0]['user_login_id']));

			$html = '<table class="table">';
			if(count($file) > 0)
			{
				if($file[0]['file_type'] == 1)
				{
					$html .= '<tr><td width="40%">Post</td><td><img style="width: 100%;" src="'.base_url('../src/assets/uploads/images/'.$file[0]['name']).'">'.$POST[0]['post'].'</td></tr>';
					// image
				}else{
					// Other Video
					$html .= '<tr><td width="40%">Post</td><td> <video controls style="width : 100%; "><source src="'.base_url('../src/assets/uploads/bio_video'.$file[0]['name']).'">'.$POST[0]['post'].'</td></tr>';
				}
			}else{
				$html .= '<tr><td width="40%">Post</td><td>'.$POST[0]['post'].'</td></tr>';
			}
			$html .= '<tr><td width="40%">Posted by</td><td>'.$Poster[0]['name'].'</td></tr>';
			$html .='</table>';
			echo $html;
		}
		elseif ($_POST['type'] == 'Comment on post') {
			$result = $this->Comman_model->get_data_where('user_post_comment', array('id'=>$_POST['id']));
			$POST = $this->Comman_model->get_data_where('users_post', array('id'=>$result[0]['entity_id']));
			$file = $this->Comman_model->get_data_where('files_record', array('id'=>$POST[0]['media_id']));
			$Poster = $this->Comman_model->get_data_where('user_login', array('id'=>$POST[0]['user_login_id']));
			$Commenter = $this->Comman_model->get_data_where('user_login', array('id'=>$result[0]['user_login_id']));
			$html = '<table class="table">';
			if(count($file) > 0)
			{
				if($file[0]['file_type'] == 1)
				{
					$html .= '<tr><td width="40%">Post</td><td><img style="width: 100%;" src="'.base_url('../src/assets/uploads/images/'.$file[0]['name']).'">'.$POST[0]['post'].'</td></tr>';
					// image
				}else{
					// Other Video
					$html .= '<tr><td width="40%">Post</td><td> <video controls style="width : 100%; "><source src="'.base_url('../src/assets/uploads/bio_video'.$file[0]['name']).'">'.$POST[0]['post'].'</td></tr>';
				}
			}else{
				$html .= '<tr><td width="40%">Post</td><td>'.$POST[0]['post'].'</td></tr>';
			}
			$html .= '<tr><td width="40%">Posted by</td><td>'.$Poster[0]['name'].'</td></tr>';
			$html .= '<tr><td width="40%">Comment</td><td>'.$result[0]['comment'].'</td></tr>';
			$html .= '<tr><td width="40%">Comment by</td><td>'.$Commenter[0]['name'].'</td></tr>';
			$html .='</table>';
			echo $html;
		}
	}
	public function cms_pages()
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$pagedata = $data = $finalData = array();
		$data = $this->Comman_model->get_all_data('cms_pages');
		$pagedata['data'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('cms_pages',$pagedata);
		$this->load->view('common/footer');
	}
	public function edit_cms_page($id)
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$pagedata = $data = $finalData = array();		

		if(isset($_POST['submit'])){
			$updata_data= array('title'=>$_POST['page_title'],
								'content'=>$_POST['content']
								);
			$this->Comman_model->update_data('cms_pages',$updata_data,array('id'=>$id));
			redirect('cms-pages');
		}
		$data = $this->Comman_model->get_data_where('cms_pages',array('id'=>$id));
		$data = $data[0];
		$pagedata['data'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('edit_cms_page',$pagedata);
		$this->load->view('common/footer');
	}
	public function profile_view($id)
	{
		if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$pagedata = $data = $finalData = $finalDataNew = array();		

		$data = $this->Comman_model->get_data_where('view_log',array('user_login_id'=>$id, 'entity_type'=>1));

		foreach ($data as $key => $value) {
			$result = $this->Comman_model->get_data_where('user_login',array('id'=>$value['view_by_id']));
			$result[0]['view_date'] = $value['created_date'];
			array_push($finalData, $result[0]);
		}

		$data = $this->Comman_model->get_data_where('view_log',array('user_login_id'=>$id,'entity_type'=>2));

		foreach ($data as $key => $value) {
			$result = $this->Comman_model->get_data_where('user_login',array('id'=>$value['view_by_id']));
			$result[0]['view_date'] = $value['created_date'];
			array_push($finalDataNew, $result[0]);
		}

		$pagedata['data'] = $finalData;
		$pagedata['dataNew'] = $finalDataNew;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('profile_view',$pagedata);
		$this->load->view('common/footer');
	}
}