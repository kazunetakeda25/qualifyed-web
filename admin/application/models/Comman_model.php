<?php
    class Comman_model extends CI_Model {

        function __construct() {
            parent::__construct();
        }
        public function getNumRows($table, $where=array())
        {
            if(count($where) > 0)
            {
                $query = $this->db->select('id')->where($where)->get($table);
                $numRows = $query->num_rows();
            }
            else
            {
                $query = $this->db->select('id')->get($table);
                $numRows = $query->num_rows();   
            }
            return $numRows;
        }

        function insert_data($table, $data)
        {
            $this->db->insert($table, $data);
            $insert_id = $this->db->insert_id();
            return  $insert_id;
        }

        function get_all_data($table) {
            $this->db->select('*');
            $this->db->from($table);
            $query = $this->db->get();
            $row = $query->result_array();
            return $row;
        }

        function getMediaSize($table, $coloum)
        {
            $this->db->select_sum($coloum);
            $result = $this->db->get($table)->row();  
            return $result->$coloum;
        }

        function update_data($table, $data, $where) {

            $this->db->where($where);
            $this->db->update($table,$data);
            $this->db->select('*');
            $this->db->where($where);
            $this->db->from($table);
            $query = $this->db->get();
            return $row = $query->row_array();
        }

        function get_data_where($table, $where)
        {
            //echo "<pre>";
            $this->db->select('*');
            $this->db->where($where);
            $this->db->from($table);
            $query = $this->db->get();
            return $row = $query->result_array();
        }

        function check_data($table, $where)
        {
            $this->db->select('*');
            $this->db->where($where);
            $this->db->from($table);
            $query = $this->db->get();
            $row = $query->row_array();
            if(!empty($row) && $row != '')
            {
                return true;
            }else{
                return false;
            }   
        }

        function get_post_data()
        {
            $this->db->select('t2.*,t3.name as picname,t3.file_type as type');
            $this->db->from('users_post t2'); 
            $this->db->join('files_record t3', 't3.id=t2.media_id', 'left');
            $this->db->order_by('t2.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->result_array();
            }
            else
            {
                return false;
            }
        }

        public function userGenderCount($type = 0)
        {
            $where = array('t2.status'=>1,'t1.gender'=>$type);
            
            $sql = "SELECT t1.id FROM `users` as t1 LEFT JOIN user_login as t2 ON t1.login_id = t2.id WHERE t1.gender = ".$type."  AND t2.status!=3 AND t2.type = 2";
            $exec = $this->db->query($sql);
            //echo $this->db->last_query();die;
            $data = $exec->num_rows();
            return $data;
        }

        public function userAvgAge()
        {
            $sql = "SELECT AVG( YEAR(now()) - YEAR(dob)) as avg_age  FROM users WHERE dob IS NOT NULL AND dob!='0000-00-00'";
            $exec = $this->db->query($sql);
            $data = $exec->result_array();
            return $data[0];
        }
        function getCountOfUsers($condition)
        {
            $this->db->select('id');
            $this->db->where($condition);
            $this->db->where('status != 3');
            $this->db->from('user_login');
            $query = $this->db->get();
            $data = $query->num_rows();
            return $data;
        }
        function check_data_business($table, $where, $id, $coloum)
        {
            $this->db->select('*');
            $this->db->where($where);
            $this->db->where($coloum.' != '.$id['id']);
            $this->db->from($table);
            $query = $this->db->get();
            $row = $query->row_array();
            if(!empty($row) && $row != '')
            {
                return true;
            }else{
                return false;
            }   
        }

        function get_single_row($table, $where)
        {
            //echo "<pre>";
            $this->db->select('*');
            $this->db->where($where);
            $this->db->from($table);
            $query = $this->db->get();
            return $row = $query->row_array();
        }

        function business_join_data()
        {
            $this->db->select('a.*,b.email as login_email,b.status as login_status,b.currentdate');
            $this->db->from('bussiness_profile a'); 
            $this->db->join('user_login b', 'b.id=a.loginid', 'inner');
            $this->db->where('b.type',1);
            $this->db->order_by('a.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->result_array();
            }
            else
            {
                return false;
            }
        }
        public function get_all_contact_data()
        {
            $this->db->select('a.*,b.name as user_name ,c.reason as reason');
            $this->db->from('contact_us a'); 
            $this->db->join('user_login b', 'b.id=a.login_id', 'left');
            $this->db->join('master_contact_reason c', 'c.id = a.reason', 'left');
            $this->db->order_by('a.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->result_array();
            }
            else
            {
                return false;
            }   
        }
        public function getUsersList()
        {
            $this->db->select('t1.*,t2.email as login_email,t2.status as login_status,t2.currentdate,rs.name as resume_file');
            $this->db->from('users t1');
            $this->db->join('user_login t2', 't2.id=t1.login_id', 'inner');
            $this->db->join('files_record rs', 'rs.id=t1.resume_file_id ', 'left');
            $this->db->where('type',2);
            $this->db->order_by('t1.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->result_array();
            }
            else
            {
                return false;
            }
        }
        public function get_user_list()
        {
              $this->db->select('t1.*, t2.email as login_email, t3.name as user_refrence_n, t4.hours_per_week as other_info, t5.school_name as school_name ,t6.position as position, t7.woking_hours as woking_hours, t8.name as country, t9name as state, t10.name as bio_video');
            $this->db->from('user_login t1');
            $this->db->join('users t2', 't2.id=t1.login_email', 'left');
            $this->db->join('users_references t3', 't3.id=t1.user_refrence_n', 'left');
            $this->db->join('users_other_info t4', 't4.id=t1.other_info', 'left');
            $this->db->join('users_education t5', 't5.id=t1.school_name', 'left');
            $this->db->join('users_experience t6', 't6.id=t1.position', 'left');
            $this->db->join('users_working_hours t7', 't7.id=t1.woking_hours', 'left');
            $this->db->join('master_country t8', 't8.id=t1.country_id', 'left');
            $this->db->join('master_state t9', 't9.id=t1.state_id', 'left');
            $this->db->join('files_record t10', 't10.id=t1.bio_video_id', 'left');
            $this->db->where('t1.id',$where['id']);
            $this->db->order_by('t1.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->row_array();
            }
            else
            {
                return false;
            }
        }
        public function get_business_data_where($where)
        {
          
            $this->db->select('t1.*, t2.name as country, t3.name as state, t4.name as work_industry, t5.size as company_size ,t6.name as comapny_type, t7.name as profile,t8.name as bio_video');
            $this->db->from('bussiness_profile t1');
            $this->db->join('master_country t2', 't2.id=t1.country_id', 'left');
            $this->db->join('master_state t3', 't3.id=t1.state_id', 'left');
            $this->db->join('master_work_industry t4', 't4.id=t1.work', 'left');
            $this->db->join('master_company_size t5', 't5.id=t1.companysize', 'left');
            $this->db->join('master_company_type t6', 't6.id=t1.companytype', 'left');
            $this->db->join('files_record t7', 't7.id=t1.profile_pic_id', 'left');
            $this->db->join('files_record t8', 't8.id=t1.bio_video_id', 'left');
            $this->db->where('t1.id',$where['id']);
            $this->db->order_by('t1.id', 'DESC');
            $query = $this->db->get(); 
            if($query->num_rows() != 0)
            {
                return $query->row_array();
            }
            else
            {
                return false;
            }

        }

        public function getUserDetail($user_login_id)
        {
            $this->db->select('t1.email,us.*,mc.name as country,ms.name as state,fr.name as profile,pi.name as primary_interest,pi2.name as secondry_interest_name,uo.work_additional_info,uo.hours_per_week,uo.travel_location,uo.is_transportation,uo.additional_skill,uo.about_bio,uo.experience,fv.name as bio_vdo,rs.name as resume_file');
            $this->db->from('user_login t1');
            $this->db->join('users us', 'us.login_id=t1.id', 'left');
            $this->db->join('users_other_info uo', 'uo.login_id=t1.id', 'left');
            $this->db->join('master_country mc', 'mc.id=us.country_id', 'left');
            $this->db->join('master_state ms', 'ms.id=us.state_id', 'left');
            $this->db->join('files_record fr', 'fr.id=us.profile_pic_id', 'left');
            $this->db->join('files_record fv', 'fv.id=us.bio_video_id ', 'left');
            $this->db->join('files_record rs', 'rs.id=us.resume_file_id ', 'left');
            $this->db->join('master_primary_field_interest pi', 'pi.id=uo.primary_field_interest_id', 'left');
            $this->db->join('master_primary_field_interest pi2', 'pi2.id=uo.secondry_interest_id', 'left');
            $this->db->where('t1.id',$user_login_id);            
            $query = $this->db->get(); 
            
            if($query->num_rows() != 0)
            {
                return $query->result_array();
            }
            else
            {
                return false;
            }
        }

        public function getPostListForUser($user_login_id)
        {

            $sql = "SELECT t1.*,(select count(*) from users_post m2 where m2.parent_id = t1.id) AS total_share,
                    (SELECT count(*) FROM `users_like` as l1 WHERE l1.entity_type = 1 AND l1.entity_id = t1.id AND l1.status = 1 ) as total_like, (SELECT count(*) FROM `user_post_comment` as c1 WHERE c1.entity_type = 1 AND c1.entity_id = t1.id AND c1.status=1) as total_comment FROM `users_post` as t1 WHERE t1.status!= 2 AND t1.user_login_id =".$user_login_id;
            $exec = $this->db->query($sql);
            $data = $exec->result_array();
            
            return $data;
        }

        public function getShareList($post_id)
        {
            $sql = "SELECT t1.user_login_id,t1.created_date,us.type FROM `users_post` as t1 
                    LEFT JOIN user_login as us ON us.id = t1.user_login_id WHERE t1.parent_id =".$post_id;
            $exec = $this->db->query($sql);
            $data = $exec->result_array();
            
            $finalData = array();
            foreach ($data as $key => $value) 
            {

                $type = $value['type'];

                if($type == 2)
                {
                        $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('users t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('login_id', $value['user_login_id']);
                         $query = $this->db->get();
                   
                }
                else
                {
                   
                    $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('bussiness_profile t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('loginid', $value['user_login_id']);
                    $query = $this->db->get();


                }                
             
                /*print_r($result); die;*/
                $result = $query->result_array();

                $finalData[$key] = $result[0] ;
                 $finalData[$key]['created_date'] = $value['created_date'];    
                
            }

                return $finalData;

              
        }


        public function getPostLikeUserList($post_id)
        {
            //$sql = "SELECT t1.*,t2.type FROM `users_like` as t1 LEFT JOIN user_login as t2 ON t2.id = t1.user_login_id WHERE t1.entity_type = 1 AND t1.entity_id = ".$post_id." AND t1.status = 1 ";
            $this->db->select('t1.*,t2.type');
            $this->db->from('users_like t1');
            $this->db->join('user_login t2', 't2.id = t1.user_login_id', 'inner');
            $this->db->where('t1.entity_type', 1);
            $this->db->where('t1.entity_id', $post_id);
            $this->db->where('t1.status', 1);
            $this->db->where('t2.status', 1);

            $query = $this->db->get();
            $data = $query->result_array();
            $finalData = array();
            foreach ($data as $key => $value) {
               $type = $value['type'];

                if($type == 2)
                {
                        $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('users t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('login_id', $value['user_login_id']);
                         $query = $this->db->get();
                   
                }
                else
                {
                   
                    $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('bussiness_profile t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('loginid', $value['user_login_id']);
                    $query = $this->db->get();


                }                
             
                /*print_r($result); die;*/
                $result = $query->result_array();

                $finalData[$key] = $result[0] ;
                 $finalData[$key]['created_date'] = $value['created_date'];
            }
            return $finalData;

        }


        public function getPostCommentUserList($post_id)
        {
            //$sql = "SELECT t1.*,t2.type FROM `user_post_comment` as t1 LEFT JOIN user_login as t2 ON t2.id = t1.user_login_id WHERE t1.entity_type = 1 AND t1.entity_id = $post_id AND t1.status = 1 ";
            $this->db->select('t1.*,t2.type');
            $this->db->from('user_post_comment t1');
            $this->db->join('user_login t2', 't2.id = t1.user_login_id', 'inner');
            $this->db->where('t1.entity_type', 1);
            $this->db->where('t1.entity_id', $post_id);
            $this->db->where('t1.status', 1);
            $this->db->where('t2.status', 1);
            $query = $this->db->get();
            $data = $query->result_array();
            $finalData = array();
            foreach ($data as $key => $value) {
               $type = $value['type'];
               $comment = $value['comment'];

                if($type == 2)
                {
                        $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('users t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('login_id', $value['user_login_id']);
                         $query = $this->db->get();
                   
                }
                else
                {
                   
                    $this->db->select('t1.name,t1.profile_pic_id,fr.name as profile_pic');
                        $this->db->from('bussiness_profile t1');
                        $this->db->join('files_record fr', 'fr.id=t1.profile_pic_id', 'left');
                        $this->db->where('loginid', $value['user_login_id']);
                    $query = $this->db->get();


                }                
             
                /*print_r($result); die;*/
                $result = $query->result_array();

                $finalData[$key] = $result[0] ;
                $finalData[$key]['comment'] = $comment;
                 $finalData[$key]['created_date'] = $value['created_date'];
            }
            return $finalData;
        }

        public function getUserReport($condition = array())
        {
            $sdate = $condition['startDate'];
            $edate = $condition['endDate'];
            $sql = "SELECT t1.*,CONCAT(t2.fname, ' ', t2.lname) as fullname,t2.phone FROM user_login as t1 INNER JOIN users as t2 ON t2.login_id = t1.id WHERE t1.type = 2 AND t1.status = 1 AND (date(t1.currentdate) >= '$sdate' AND date(t1.currentdate) <= '$edate') ORDER BY t1.currentdate DESC";
            $exec = $this->db->query($sql);
            $data = $exec->result_array();
            return $data;
        }

        public function getBusinessReport($condition = array())
        {
            $sdate = $condition['startDate'];
            $edate = $condition['endDate'];

            $sql = "SELECT t1.*,t2.name as fullname,t2.phone FROM user_login as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.id WHERE t1.type = 1 AND t1.status = 1 AND (date(t1.currentdate) >= '$sdate' AND date(t1.currentdate) <= '$edate') ORDER BY t1.currentdate DESC";
            $exec = $this->db->query($sql);
            //echo $this->db->last_query();die;
            $data = $exec->result_array();
            return $data;
        }

        public function getOpportunity($condition = array())
        {            
                $sdate = $condition['startDate'];
                $edate = $condition['endDate'];

                $sql = "SELECT t1.*,t2.name as fullname FROM `opportunities` as t1 LEFT JOIN bussiness_profile as t2 ON t2.loginid = t1.user_id WHERE t1.is_published = 1 AND (date(t1.created_date) >= '$sdate' AND date(t1.created_date) <= '$edate') AND t1.status";
                
           
            $exec = $this->db->query($sql);
                //echo $this->db->last_query();die;
            $data = $exec->result_array();
            return $data;
        }

        public function getReportAbuseList()
        {
            $sql = $this->db->select('report_abuse.*, user_login.type as user_logi_type')->from('report_abuse')->join('user_login', 'user_login.id = report_abuse.user_login_id', 'left')->order_by('created_date','desc')->get();
            $data = $sql->result_array();
            return $data;
        }

        public function getUserName($userLoginId)
        {
            $sql = $this->db->select('type')->where('id',$userLoginId)->get('user_login');
            $data = $sql->result_array();
            if($data[0]['type'] == 1){
                $sql2 = $this->db->select('name')->where('loginid',$userLoginId)->get('bussiness_profile');
            }
            else
            {
                $sql2 = $this->db->select('name')->where('login_id',$userLoginId)->get('users');
            }
            $data2 = $sql2->result_array();
            //print_r($data2);die;
            return $data2[0];
        }
    } // END OF CLASS
?>