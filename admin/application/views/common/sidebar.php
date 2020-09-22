<?php 
    $uri = $this->uri->segment(1);
?>
            <!-- =================================================
            ================= CONTROLS Content ===================
            ================================================== -->
            <div id="controls">
                <!-- ================================================
                ================= SIDEBAR Content ===================
                ================================================= -->
                <aside id="sidebar">
                    <div id="sidebar-wrap">
                        <div class="panel-group slim-scroll" role="tablist">
                            <div class="panel panel-default">
                                <div class="panel-heading" role="tab">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" href="#sidebarNav">
                                            Navigation <i class="fa fa-angle-up"></i>
                                        </a>
                                    </h4>
                                </div>
                                <div id="sidebarNav" class="panel-collapse collapse in" role="tabpanel">
                                    <div class="panel-body">
                                        <!-- ===================================================
                                        ================= NAVIGATION Content ===================
                                        ==================================================== -->
                                        <ul id="navigation">
                                            <li <?php if($uri=='dashboard') {?> class="active"<?php }?>><a href="<?php echo site_url('admin/index'); ?>"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>
                                            <li <?php if($uri=='add_user' || $uri=='user_list') {?> class="active"<?php }?>>
                                                <a role="button" tabindex="0"><i class="fa fa-users" aria-hidden="true"></i> <span>Manage User</span></a>
                                                <ul>
                                                    <li><a href="<?php echo site_url('add_user'); ?>"><i class="fa fa-caret-right"></i>Add User</a></li>
                                                    <li><a href="<?php echo site_url('user_list'); ?>"><i class="fa fa-caret-right"></i>User's List</a></li>
                                                </ul>
                                            </li>
                                            <li <?php if($uri=='add_business' || $uri=='business_list') {?> class="active"<?php }?>>
                                                <a role="button" tabindex="0">
                                                <i class="fa fa-briefcase" aria-hidden="true"></i> <span>Manage Business</span></a>
                                                <ul>
                                                    <li><a href="<?php echo site_url('add_business'); ?>"><i class="fa fa-caret-right"></i>Add Business</a></li>
                                                    <li><a href="<?php echo site_url('business_list'); ?>"><i class="fa fa-caret-right"></i>Business List</a></li>
                                                </ul>
                                            </li>
                                            <li <?php if($uri=='countries' || $uri=='master_company_size' || $uri=='master_company_type' || $uri=='master_primary_field_interest' || $uri=='master_secondary_field_interest' || $uri=='master_work_industry' || $uri=='master_working_hours') {?> class="active"<?php }?>>
                                                <a role="button" tabindex="0"><i class="fa fa-list"></i> <span>Manage Miscellaneous</span></a>
                                                <ul>
                                                    <li><a href="<?php echo site_url('countries'); ?>"><i class="fa fa-caret-right"></i>Countires</a></li>
                                                    <li><a href="<?php echo site_url('master_company_size'); ?>"><i class="fa fa-caret-right"></i>Company Size</a></li>
                                                    <li><a href="<?php echo site_url('master_company_type'); ?>"><i class="fa fa-caret-right"></i>Company Type</a></li>
                                                    <li><a href="<?php echo site_url('master_primary_field_interest'); ?>"><i class="fa fa-caret-right"></i>User's Field Interest</a></li>
                                                    <!-- <li><a href="<?php echo site_url('master_secondary_field_interest'); ?>"><i class="fa fa-caret-right"></i>User Secondary Field Interest</a></li> -->
                                                    <li><a href="<?php echo site_url('master_work_industry'); ?>"><i class="fa fa-caret-right"></i>Master Work Industry</a></li>
                                                    <li><a href="<?php echo site_url('master_working_hours'); ?>"><i class="fa fa-caret-right"></i>Master Working Hours</a></li>
                                                </ul>
                                            </li>
                                             <li <?php if($uri=='view_contact_request' || $uri=='manage_contacts_reason') {?> class="active"<?php }?>>
                                                <a role="button" tabindex="0"><i class="fa fa-phone"></i> <span>View Contacts</span></a>
                                                <ul>
                                                     <li><a href="<?php echo site_url('view_contact_request'); ?>"><i class="fa fa-caret-right"></i>View Contacts Request</a></li>
                                                    <li><a href="<?php echo site_url('manage_contacts_reason'); ?>"><i class="fa fa-caret-right"></i>Manage Contacts Reason</a></li>
                                                </ul>
                                            </li>
                                            <li <?php if($uri=='email_template' || $uri=='edit_email') {?> class="active"<?php }?>><a href="<?php echo site_url('email_template'); ?>"><i class="fa fa-envelope"></i> <span>Manage Email Template</span></a></li>

                                            <li <?php if($uri=='skills') {?> class="active"<?php }?>><a href="<?php echo site_url('skills'); ?>"><i class="fa fa-cogs"></i> <span>Manage Skills</span></a></li>

                                            <li <?php if($uri=='report-abuse') {?> class="active"<?php }?>><a href="<?php echo site_url('report-abuse'); ?>"><i class="fa fa-flag"></i> <span>Report Abuse</span></a></li>

                                            <li <?php if($uri=='cms-pages') {?> class="active"<?php }?>>
                                                <a href="<?php echo site_url('cms-pages'); ?>"><i class="fa fa-file-text"></i> <span>CMS Pages</span></a>
                                            </li>
                                            <li <?php if($uri=='reports') {?> class="active"<?php }?>><a href="<?php echo site_url('reports'); ?>"><i class="fa fa-file"></i> <span>Reports</span></a></li>
                                        </ul>
                                        <!--/ NAVIGATION Content -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <!--/ SIDEBAR Content -->
            </div>
            <!--/ CONTROLS Content -->

