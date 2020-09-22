<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Admin';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['login'] = 'admin/login';
$route['logout'] = 'admin/logout';
$route['dashboard'] = 'admin/dashboard';
$route['user_list'] = 'admin/user_list';
$route['add_user'] = 'admin/add_user';
$route['business_list'] = 'admin/business_list';
$route['add_business'] = 'admin/add_business';
$route['countries'] = 'admin/countries';
$route['master_company_size'] = 'admin/master_company_size';
$route['master_company_type'] = 'admin/master_company_type';
$route['master_primary_field_interest'] = 'admin/master_primary_field_interest';
$route['master_secondary_field_interest'] = 'admin/master_secondary_field_interest';
$route['view_contact_request'] = 'admin/view_contact_details';
$route['master_work_industry'] = 'admin/master_work_industry';
$route['email_template'] = 'admin/email_template';
$route['edit_email/:num'] = 'admin/edit_email_template/$1';

$route['email_header_footer/:num'] = 'admin/email_header_footer/$1';


$route['status_list'] = 'admin/status_list:$id';
$route['edit_business'] = 'admin/edit_business:$id';
$route['view_post'] = 'admin/view_post:$id';
$route['manage_contacts_reason'] = 'admin/contact_reason';
$route['profile'] = 'admin/edit_profile';
$route['skills'] = 'admin/skills';
$route['master_working_hours'] = 'admin/master_working_hours';
$route['skills_list/:num'] = 'admin/master_skills/:$1';
$route['view_post/:num'] = 'admin/post_list/:$1';
$route['view_post/:num'] = 'admin/postDetail/:$1';
$route['isEmailExist'] = 'admin/isEmailExist';
$route['getUserDetail'] = 'admin/getUserDetail';
$route['reports'] = 'admin/reports';
$route['business-opportunity/(:any)'] = 'opportunity/businessOpportunityList/$1';
$route['report-abuse'] = 'admin/report_abuse';
$route['cms-pages'] = 'admin/cms_pages';
$route['cms-edit-page/(:any)'] = 'admin/edit_cms_page/$1';
$route['profile_view/(:any)'] = 'admin/profile_view/$1';
$route['help-content-subCategories/(:any)'] = 'admin/helpSubCat/$1';
$route['view-question/(:any)'] = 'admin/viewQuestion/$1';
$route['help-content'] = 'admin/help';
