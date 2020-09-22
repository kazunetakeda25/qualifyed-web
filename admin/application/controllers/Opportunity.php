<?php
defined('BASEPATH') OR exit('No direct script access allowed'); 

class Opportunity extends CI_Controller { 

	public function __construct()
    {
      parent::__construct();
    }

    public function businessOpportunityList($userLoginId)
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$page_data = array();
		$page_data['title'] = 'Opportunity';
		$userName = $this->Comman_model->get_data_where('bussiness_profile', array('loginid'=>$userLoginId));
			$userName = ucfirst($userName[0]['name']);
			$page_data['userName'] = $userName;
		$data = $this->Comman_model->get_data_where('opportunities',array('user_id'=>$userLoginId));
		if($data!="")
		{
			foreach ($data as $key => $value) {
				$data[$key] = $value;
				if($value['is_closed']==1)
				{
					$data[$key]['is_closed'] = 'Close';	
				}
				else
				{
					$data[$key]['is_closed'] = 'Open';	
				}
				$data[$key]['created_date'] = date_format(date_create($value['created_date']),"d M,Y");
				$countInterviewRequest = $this->Comman_model->getNumRows('opportunit_interview_request',array('opportunity_id'=>$value['id']));
				$data[$key]['interview_request'] = $countInterviewRequest;
			}
		}
		
		$page_data['data'] = $data;
		$this->load->view('common/header');
		$this->load->view('common/sidebar');
		$this->load->view('business_opportunity_list',$page_data);
		$this->load->view('common/footer');
    }

    public function viewOpportunityDetail()
    {
    	if(checkLoginSession()==false) {
            redirect('admin/login');
		}
		$id = $this->input->post('id');
		$data = $this->Comman_model->get_data_where('opportunities',array('id'=>$id));
		$data = $data[0];
		//print_r($data);die;
		$getCountryName = $this->Comman_model->get_data_where('master_country',array('id'=>$data['country_id']));
		$getStateName = $this->Comman_model->get_data_where('master_state',array('id'=>$data['state_id']));
		$implodeSkillStr='';
		if($data['skills_ids']!=""){
			$manage = json_decode($data['skills_ids'], true);
			$implodeSkillStr = implode(", ", $manage);
		}
		
		//print_r($getCountryName);die;
		$html = '<table class="table">';
		$html .= '<tr><td width="40%">Name</td><td>'.$data['title'].'</td></tr>';
		$html .= '<tr><td>Description</td><td>'.$data['description'].'</td></tr>';
		$html .= '<tr><td>About Us</td><td>'.$data['about_us'].'</td></tr>';
		$html .= '<tr><td>Country</td><td>'.$getCountryName[0]['name'].'</td></tr>';
		$html .= '<tr><td>State</td><td>'.$getStateName[0]['name'].'</td></tr>';
		$html .= '<tr><td>City</td><td>'.$data['city'].'</td></tr>';
		$html .= '<tr><td>Zipcode</td><td>'.$data['zipcode'].'</td></tr>';
		$html .= '<tr><td>Prefrences</td><td>'.$data['prefrences'].'</td></tr>';
		$html .= '<tr><td>Skills</td><td>'.$implodeSkillStr.'</td></tr>';
		//$html .= '<tr><td>Profile Picture</td><td><img src="'.$profilePicUrl.'" width="100px" height="100px"></td></tr>';
		//$html .= '<tr><td>Bio Video</td><td><video controls height="140"><source src="'.$bio_vdo.'"></source></video></td></tr>';
		
		$html .='</table>';
		echo $html;
    }

} // END OF CLASS

?>