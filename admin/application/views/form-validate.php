<!-- ====================================================
            ================= CONTENT ===============================
            ===================================================== -->
            <section id="content">

                <div class="page page-forms-validate">

                    <div class="pageheader">

                        <h2>Validation Elements</h2>

                        <div class="page-bar">

                            <ul class="page-breadcrumb">
                                <li>
                                    <a href="#"><i class="fa fa-home"></i> HelloWerk</a>
                                </li>
                                <li>
                                    <a href="#">Form Stuff</a>
                                </li>
                                <li>
                                    <a href="form-validate.html">Validation Elements</a>
                                </li>
                            </ul>
                            
                        </div>

                    </div>


                    <!-- row -->
                    <div class="row">

                        <!-- col -->
                        <div class="col-md-6">

                            <!-- tile -->
                            <section class="tile">

                                <!-- tile header -->
                                <div class="tile-header dvd dvd-btm">
                                    <h1 class="custom-font"><strong>Basic</strong> Validations</h1>
                                    <ul class="controls">
                                        <li class="dropdown">

                                            <a role="button" tabindex="0" class="dropdown-toggle settings" data-toggle="dropdown">
                                                <i class="fa fa-cog"></i>
                                                <i class="fa fa-spinner fa-spin"></i>
                                            </a>

                                            <ul class="dropdown-menu pull-right with-arrow animated littleFadeInUp">
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-toggle">
                                                        <span class="minimize"><i class="fa fa-angle-down"></i>&nbsp;&nbsp;&nbsp;Minimize</span>
                                                        <span class="expand"><i class="fa fa-angle-up"></i>&nbsp;&nbsp;&nbsp;Expand</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-refresh">
                                                        <i class="fa fa-refresh"></i> Refresh
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-fullscreen">
                                                        <i class="fa fa-expand"></i> Fullscreen
                                                    </a>
                                                </li>
                                            </ul>

                                        </li>
                                        <li class="remove"><a role="button" tabindex="0" class="tile-close"><i class="fa fa-times"></i></a></li>
                                    </ul>
                                </div>
                                <!-- /tile header -->

                                <!-- tile body -->
                                <div class="tile-body">


                                    <form class="form-horizontal" name="form3" role="form" id="form3" data-parsley-validate>


                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Required</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc1" class="form-control mb-10" placeholder="Required field"
                                                       data-parsley-trigger="change"
                                                       required>
                                                <select name="f2" class="form-control mb-10"
                                                        data-parsley-trigger="change"
                                                        required>
                                                    <option value="">Select option...</option>
                                                    <option value="foo">Foo</option>
                                                    <option value="bar">Bar</option>
                                                </select>
                                                <label class="checkbox checkbox-custom">
                                                    <input name="fc3" type="checkbox" class="form-control"
                                                           data-parsley-trigger="change"
                                                           required><i></i> Agree
                                                </label>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Min Length</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc4" class="form-control" placeholder="minlength = 5"
                                                       data-parsley-trigger="change"
                                                       minlength="5"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Max Length</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc5" class="form-control" placeholder="maxlength = 5"
                                                       data-parsley-trigger="change"
                                                       maxlength="5"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Length Range</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc6" class="form-control" placeholder="minlength = 5 & maxlength = 10"
                                                       data-parsley-trigger="change"
                                                       data-parsley-length="[5, 10]"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Min value</label>
                                            <div class="col-sm-9">
                                                <input type="number" name="fc7" class="form-control" placeholder="min = 8"
                                                       min="8"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Max value</label>
                                            <div class="col-sm-9">
                                                <input type="number" name="fc8" class="form-control" placeholder="max = 8"
                                                       max="8"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Value Range</label>
                                            <div class="col-sm-9">
                                                <input type="number" name="fc9" class="form-control" placeholder="min = 8 & max = 20"
                                                       data-parsley-range="[8,20]"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">HEX Regex</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc10" class="form-control" placeholder="#ffffff"
                                                       pattern="/^#(?:[0-9a-fA-F]{3}){1,2}$/"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                                <!-- /tile body -->

                                <!-- tile footer -->
                                <div class="tile-footer text-right bg-tr-black lter dvd dvd-top">
                                    <!-- SUBMIT BUTTON -->
                                    <button type="submit" class="btn btn-default" id="form3Submit">Submit</button>
                                </div>
                                <!-- /tile footer -->

                            </section>
                            <!-- /tile -->


                        </div>
                        <!-- /col -->


                        <!-- col -->
                        <div class="col-md-6">

                            <!-- tile -->
                            <section class="tile">

                                <!-- tile header -->
                                <div class="tile-header dvd dvd-btm">
                                    <h1 class="custom-font"><strong>On Submit</strong> Validate</h1>
                                    <ul class="controls">
                                        <li class="dropdown">

                                            <a role="button" tabindex="0" class="dropdown-toggle settings" data-toggle="dropdown">
                                                <i class="fa fa-cog"></i>
                                                <i class="fa fa-spinner fa-spin"></i>
                                            </a>

                                            <ul class="dropdown-menu pull-right with-arrow animated littleFadeInUp">
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-toggle">
                                                        <span class="minimize"><i class="fa fa-angle-down"></i>&nbsp;&nbsp;&nbsp;Minimize</span>
                                                        <span class="expand"><i class="fa fa-angle-up"></i>&nbsp;&nbsp;&nbsp;Expand</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-refresh">
                                                        <i class="fa fa-refresh"></i> Refresh
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-fullscreen">
                                                        <i class="fa fa-expand"></i> Fullscreen
                                                    </a>
                                                </li>
                                            </ul>

                                        </li>
                                        <li class="remove"><a role="button" tabindex="0" class="tile-close"><i class="fa fa-times"></i></a></li>
                                    </ul>
                                </div>
                                <!-- /tile header -->

                                <!-- tile body -->
                                <div class="tile-body">

                                    <p class="text-muted">Inputs in this form validate on submit.</p>

                                    <form name="form2" role="form" id="form2" data-parsley-validate>

                                        <div class="row">

                                            <div class="form-group col-md-6">
                                                <label for="name">Name: </label>
                                                <input type="text" name="name" id="name" class="form-control" required>
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="contactemail">Email: </label>
                                                <input type="email" name="contactemail" id="contactemail" class="form-control">
                                            </div>

                                        </div>

                                        <div class="form-group">
                                            <label for="website">Website: </label>
                                            <input type="text" name="website" id="website" class="form-control" placeholder="http://" pattern="/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/">
                                        </div>

                                        <div class="form-group">
                                            <label for="message">Message: </label>
                                            <textarea class="form-control" rows="6" name="message" id="message" placeholder="Type your message" required></textarea>
                                        </div>

                                    </form>

                                </div>
                                <!-- /tile body -->

                                <!-- tile footer -->
                                <div class="tile-footer text-right bg-tr-black lter dvd dvd-top">
                                    <!-- SUBMIT BUTTON -->
                                    <button type="submit" class="btn btn-lightred" id="form2Submit">Submit</button>
                                </div>
                                <!-- /tile footer -->

                            </section>
                            <!-- /tile -->


                            <!-- tile -->
                            <section class="tile">

                                <!-- tile header -->
                                <div class="tile-header dvd dvd-btm">
                                    <h1 class="custom-font"><strong>Type</strong> Validations</h1>
                                    <ul class="controls">
                                        <li class="dropdown">

                                            <a role="button" tabindex="0" class="dropdown-toggle settings" data-toggle="dropdown">
                                                <i class="fa fa-cog"></i>
                                                <i class="fa fa-spinner fa-spin"></i>
                                            </a>

                                            <ul class="dropdown-menu pull-right with-arrow animated littleFadeInUp">
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-toggle">
                                                        <span class="minimize"><i class="fa fa-angle-down"></i>&nbsp;&nbsp;&nbsp;Minimize</span>
                                                        <span class="expand"><i class="fa fa-angle-up"></i>&nbsp;&nbsp;&nbsp;Expand</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-refresh">
                                                        <i class="fa fa-refresh"></i> Refresh
                                                    </a>
                                                </li>
                                                <li>
                                                    <a role="button" tabindex="0" class="tile-fullscreen">
                                                        <i class="fa fa-expand"></i> Fullscreen
                                                    </a>
                                                </li>
                                            </ul>

                                        </li>
                                        <li class="remove"><a role="button" tabindex="0" class="tile-close"><i class="fa fa-times"></i></a></li>
                                    </ul>
                                </div>
                                <!-- /tile header -->

                                <!-- tile body -->
                                <div class="tile-body">


                                    <form class="form-horizontal" name="form4" role="form" id="form4" data-parsley-validate>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Email</label>
                                            <div class="col-sm-9">
                                                <input type="email" name="fc11" class="form-control" placeholder="Email"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Url</label>
                                            <div class="col-sm-9">
                                                <input type="url" name="fc12" class="form-control" placeholder="http://"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Digits</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc13" class="form-control" placeholder="Digits"
                                                       data-parsley-trigger="change"
                                                       data-parsley-type="digits"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Numbers</label>
                                            <div class="col-sm-9">
                                                <input type="number" name="fc14" class="form-control" placeholder="Number"
                                                       data-parsley-trigger="change"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Alphanumeric</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc15" class="form-control" placeholder="Alphanumeric"
                                                       data-parsley-trigger="change"
                                                       data-parsley-type="alphanum"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Alpha</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc16" class="form-control" placeholder="Alpha"
                                                       data-parsley-trigger="change"
                                                       pattern="/^[a-zA-Z]+$/"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Date ISO</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc17" class="form-control" placeholder="YYYY-MM-DD"
                                                       data-parsley-trigger="change"
                                                       pattern="/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Phone</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="fc18" class="form-control" placeholder="(XXX) XXXX XXX" ng-model="fc18"
                                                       data-parsley-trigger="change"
                                                       pattern="^[\d\+\-\.\(\)\/\s]*$"
                                                       required>
                                            </div>
                                        </div>

                                        <hr class="line-dashed line-full" />

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">Equal</label>
                                            <div class="col-sm-9">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" id="fc19" name="fc19" class="form-control"
                                                               data-parsley-trigger="change"
                                                               required>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" id="fc20" name="fc20" class="form-control"
                                                               data-parsley-trigger="change"
                                                               data-parsley-equalto="#fc19"
                                                               required>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </form>

                                </div>
                                <!-- /tile body -->

                                <!-- tile footer -->
                                <div class="tile-footer text-right bg-tr-black lter dvd dvd-top">
                                    <!-- SUBMIT BUTTON -->
                                    <button type="submit" class="btn btn-default" id="form4Submit">Submit</button>
                                </div>
                                <!-- /tile footer -->

                            </section>
                            <!-- /tile -->


                        </div>
                        <!-- /col -->



                    </div>
                    <!-- /row -->




                </div>
                
            </section>
            <!--/ CONTENT <-->