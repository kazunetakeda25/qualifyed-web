====================================================
================= CONTENT ===============================
===================================================== -->
<section id="content">
    <div class="page page-dashboard">
        <div class="pageheader">
            <h2>Dashboard</h2>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <a href="#"><i class="fa fa-home"></i></a>
                    </li>
                    <li>
                        <a href="">Dashboard</a>
                    </li>
                </ul>
                <!-- <div class="page-toolbar">
                    <a role="button" tabindex="0" class="btn btn-lightred no-border pickDate">
                        <i class="fa fa-calendar"></i>&nbsp;&nbsp;<span></span>&nbsp;&nbsp;<i class="fa fa-angle-down"></i>
                    </a>
                </div> -->
            </div>
        </div>
        <!-- cards row -->
        <div class="row">
            <!-- col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-greensea">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-users fa-4x"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg text-strong mb-0"><?php echo $userCount;?></p>
                                <span>Users</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-greensea p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-users fa-4x"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg text-strong mb-0"><?php echo $userCount;?></p>
                                <span>Users</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>
            <!-- /col -->
            <!-- col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-lightred">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-shopping-cart fa-4x"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg text-strong mb-0"><?php echo $businessCount;?></p>
                                <span>Business</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-lightred p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-shopping-cart fa-4x"></i>
                            </div>
                            <div class="col-xs-8">
                                <p class="text-elg text-strong mb-0"><?php echo $businessCount;?></p>
                                <span>Business</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>
            <!-- /col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-primary">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-picture-o fa-4x" aria-hidden="true"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg mb-0"><?php echo $media_size;?></p>
                                <span>Media Size</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-primary p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-picture-o fa-4x" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-8">
                                <p class="text-elg  mb-0"><?php echo $media_size;?></p>
                                <span>Media Size</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>
            
        </div>
        <!-- /row -->
        <div class="row">
            <!-- col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-slategray">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-male fa-4x" aria-hidden="true"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg mb-0"><?php echo $maleUserCount;?></p>
                                <span>Male User </span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-slategray p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-picture-o fa-4x" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-8">
                                <p class="text-elg  mb-0"><?php echo $maleUserCount;?></p>
                                <span>Male User</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>
            <!-- /col -->
            <!-- col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-warning">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-female fa-4x" aria-hidden="true"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg mb-0"><?php echo $femaleUserCount;?></p>
                                <span>Female User </span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-warning p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-female-o fa-4x" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-8">
                                <p class="text-elg  mb-0"><?php echo $femaleUserCount;?></p>
                                <span>Female User</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>
            <!-- /col -->
            <!-- col -->
            <div class="card-container col-lg-4 col-sm-6 col-sm-12">
                <div class="card">
                    <div class="front bg-success">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-user fa-4x" aria-hidden="true"></i>
                            </div>
                            <!-- /col -->
                            <!-- col -->
                            <div class="col-xs-8">
                                <p class="text-elg mb-0"><?php echo number_format($userAvgAge['avg_age'],1);?></p>
                                <span>Average Age Of Users </span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                    <div class="back bg-success p-30">
                        <!-- row -->
                        <div class="row">
                            <!-- col -->
                            <div class="col-xs-4">
                                <i class="fa fa-user-o fa-4x" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-8">
                                <p class="text-elg  mb-0"><?php echo $userAvgAge;?></p>
                                <span>Average Age Of Users</span>
                            </div>
                            <!-- /col -->
                        </div>
                        <!-- /row -->
                    </div>
                </div>
            </div>

            <!-- <div class="card-container col-lg-8 col-sm-12 col-sm-12"> -->
                <!-- <div class="card"> -->
                    
                   <!-- <section class="tile"> -->
                <!-- tile header -->
                <!-- <div class="tile-header dvd dvd-btm">
                    <h1 class="custom-font"></h1>
                </div> -->
                <!-- /tile header -->
                <!-- tile body -->
                <!-- <div class="tile-body">
                    <div id="line-chart" style="height: 250px"></div>
                </div> -->
                <!-- /tile body -->
            <!-- </section>
                </div>
            </div> -->
            <!-- /col -->
        </div>
    </div>
        <!-- col -->
        
            <!-- tile -->
            
    
</section>

<!--/ CONTENT -->
<script src="<?php echo base_url(); ?>assets/js/vendor/countTo/jquery.countTo.js"></script>
<script src="<?php echo base_url(); ?>assets/js/vendor/gaugejs/gauge.min.js"></script>


<!--  <script>

            $(window).load(function(){


                // Morris line chart

                Morris.Line({
                    element: 'line-example',
                    data: [
                        { y: '2009', a: 15,  b: 5 },
                        { y: '2010', a: 20,  b: 10 },
                        { y: '2011', a: 35,  b: 25 },
                        { y: '2012', a: 40, b: 30 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B'],
                    lineColors:['#16a085','#FF0066']
                });

                // Morris line area chart

                Morris.Area({
                    element: 'line-area-example',
                    data: [
                        { y: '2009', a: 10,  b: 3 },
                        { y: '2010', a: 14,  b: 5 },
                        { y: '2011', a: 8,  b: 2 },
                        { y: '2012', a: 20, b: 15 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B'],
                    lineColors:['#a2d200','#d2d2d2'],
                    lineWidth:'0',
                    grid: false,
                    fillOpacity:'0.5'
                });

                // Morris bar chart

                Morris.Bar({
                    element: 'bar-example',
                    data: [
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B'],
                    barColors:['#ff4a43','#1693A5']
                });

                // Morris donut chart

                Morris.Donut({
                    element: 'donut-example',
                    data: [
                        {label: "Download Sales", value: 12},
                        {label: "In-Store Sales", value: 30},
                        {label: "Mail-Order Sales", value: 20}
                    ]
                });

                // Sparkline Line Chart
                $('#sparkline01').sparkline([15,16,18,17,16,18,25,26,23], {
                    type: 'line',
                    width: '100%',
                    height:'250px',
                    fillColor: 'rgba(34, 190, 239, .3)',
                    lineColor: 'rgba(34, 190, 239, .5)',
                    lineWidth: 2,
                    spotRadius: 5,
                    valueSpots:[5,6,8,7,6,8,5,4,7],
                    minSpotColor: '#eaf9fe',
                    maxSpotColor: '#00a3d8',
                    highlightSpotColor: '#00a3d8',
                    highlightLineColor: '#bec6ca',
                    normalRangeMin: 0
                });
                $('#sparkline01').sparkline([1,2,1,3,1,2,4,1,3], {
                    type: 'line',
                    composite: true,
                    width: '100%',
                    height:'250px',
                    fillColor: 'rgba(255, 74, 67, .6)',
                    lineColor: 'rgba(255, 74, 67, .8)',
                    lineWidth: 2,
                    minSpotColor: '#ffeced',
                    maxSpotColor: '#d90200',
                    highlightSpotColor: '#d90200',
                    highlightLineColor: '#bec6ca',
                    spotRadius: 5,
                    valueSpots:[2,3,4,3,1,2,4,1,3],
                    normalRangeMin: 0
                });

                // Sparkline Bar Chart

                var $el = $('#sparkline02');

                var values = $el.data('values').split(',').map(parseFloat);
                var type = $el.data('type') || 'line' ;
                var height = $el.data('height') || 'auto';

                var parentWidth = $el.parent().width();
                var valueCount = values.length;
                var barSpacing = 5;

                var barWidth = Math.round((parentWidth - ( valueCount - 1 ) * barSpacing ) / valueCount);

                $el.sparkline(values, {
                    width:'100%',
                    type: type,
                    height: height,
                    barWidth: barWidth,
                    barSpacing: barSpacing,
                    barColor: '#16a085',
                    negBarColor: '#FF0066'
                });

                // Sparkline Pie Chart

                $('#sparkline03').sparkline([5,10,20,15 ], {
                    type: 'pie',
                    width: 'auto',
                    height: '250px',
                    sliceColors: ['#22beef','#a2d200','#ffc100','#ff4a43']
                });

                // Easy-pie charts
                var charts = $('.easypiechart');

                //update instance every 5 sec
                window.setInterval(function() {

                    // refresh easy pie chart
                    charts.each(function() {
                        $(this).data('easyPieChart').update(Math.floor(100*Math.random()));
                    });

                }, 5000);

                //Gauge.js Charts

                var gauge1Opts = {
                    lines: 12,
                    // The number of lines to draw
                    angle: 0.15,
                    // The length of each line
                    lineWidth: 0.44,
                    // The line thickness
                    pointer: {
                        length: 1,
                        // The radius of the inner circle
                        strokeWidth: 0.035,
                        // The rotation offset
                        color: '#000000' // Fill color
                    },
                    limitMax: 'false',
                    // If true, the pointer will not go past the end of the gauge
                    colorStart: '#6FADCF',
                    // Colors
                    colorStop: '#8FC0DA',
                    // just experiment with them
                    strokeColor: '#f2f2f2',
                    // to see which ones work best for you
                    generateGradient: true,
                    percentColors: [
                        [0.0, '#1693A5'],
                        [1.0, '#1693A5']
                    ]
                };
                var target1 = document.getElementById('gauge1'); // your canvas element
                var gauge1 = new Gauge(target1).setOptions(gauge1Opts); // create sexy gauge!
                gauge1.maxValue = 3000; // set max gauge value
                gauge1.animationSpeed = 40; // set animation speed (32 is default value)
                gauge1.set(658); // set actual value

                var gauge2Opts = {
                    lines: 12,
                    // The number of lines to draw
                    angle: 0.10,
                    // The length of each line
                    lineWidth: 0.40,
                    // The line thickness
                    pointer: {
                        length: 0.9,
                        // The radius of the inner circle
                        strokeWidth: 0.035,
                        // The rotation offset
                        color: '#000000' // Fill color
                    },
                    limitMax: 'false',
                    // If true, the pointer will not go past the end of the gauge
                    colorStart: '#6FADCF',
                    // Colors
                    colorStop: '#8FC0DA',
                    // just experiment with them
                    strokeColor: '#f2f2f2',
                    // to see which ones work best for you
                    generateGradient: true,
                    percentColors: [
                        [0.0, '#FF0066'],
                        [1.0, '#FF0066']
                    ]
                };
                var target2 = document.getElementById('gauge2'); // your canvas element
                var gauge2 = new Gauge(target2).setOptions(gauge2Opts); // create sexy gauge!
                gauge2.maxValue = 3000; // set max gauge value
                gauge2.animationSpeed = 40; // set animation speed (32 is default value)
                gauge2.set(1258); // set actual value

                var gauge3Opts = {
                    lines: 12,
                    // The number of lines to draw
                    angle: 0.05,
                    // The length of each line
                    lineWidth: 0.34,
                    // The line thickness
                    pointer: {
                        length: 0.8,
                        // The radius of the inner circle
                        strokeWidth: 0.035,
                        // The rotation offset
                        color: '#000000' // Fill color
                    },
                    limitMax: 'false',
                    // If true, the pointer will not go past the end of the gauge
                    colorStart: '#6FADCF',
                    // Colors
                    colorStop: '#8FC0DA',
                    // just experiment with them
                    strokeColor: '#f2f2f2',
                    // to see which ones work best for you
                    generateGradient: true,
                    percentColors: [
                        [0.0, '#428bca'],
                        [1.0, '#428bca']
                    ]
                };
                var target3 = document.getElementById('gauge3'); // your canvas element
                var gauge3 = new Gauge(target3).setOptions(gauge3Opts); // create sexy gauge!
                gauge3.maxValue = 3000; // set max gauge value
                gauge3.animationSpeed = 40; // set animation speed (32 is default value)
                gauge3.set(1458); // set actual value

                var gauge4Opts = {
                    lines: 12,
                    // The number of lines to draw
                    angle: 0,
                    // The length of each line
                    lineWidth: 0.3,
                    // The line thickness
                    pointer: {
                        length: 0.7,
                        // The radius of the inner circle
                        strokeWidth: 0.035,
                        // The rotation offset
                        color: '#000000' // Fill color
                    },
                    limitMax: 'false',
                    // If true, the pointer will not go past the end of the gauge
                    colorStart: '#6FADCF',
                    // Colors
                    colorStop: '#8FC0DA',
                    // just experiment with them
                    strokeColor: '#f2f2f2',
                    // to see which ones work best for you
                    generateGradient: true,
                    percentColors: [
                        [0.0, '#f0ad4e'],
                        [1.0, '#f0ad4e']
                    ]
                };
                var target4 = document.getElementById('gauge4'); // your canvas element
                var gauge4 = new Gauge(target4).setOptions(gauge4Opts); // create sexy gauge!
                gauge4.maxValue = 3000; // set max gauge value
                gauge4.animationSpeed = 40; // set animation speed (32 is default value)
                gauge4.set(2514); // set actual value



                // Initialize Line Chart
                var data1 = [{
                    data: [[1,5.3],[2,5.9],[3,7.2],[4,8],[5,7],[6,6.5],[7,6.2],[8,6.7],[9,7.2],[10,7],[11,6.8],[12,7]],
                    label: 'Sales',
                    points: {
                        show: true,
                        radius: 6
                    },
                    splines: {
                        show: true,
                        tension: 0.45,
                        lineWidth: 5,
                        fill: 0
                    }
                }, {
                    data: [[1,6.6],[2,7.4],[3,8.6],[4,9.4],[5,8.3],[6,7.9],[7,7.2],[8,7.7],[9,8.9],[10,8.4],[11,8],[12,8.3]],
                    label: 'Orders',
                    points: {
                        show: true,
                        radius: 6
                    },
                    splines: {
                        show: true,
                        tension: 0.45,
                        lineWidth: 5,
                        fill: 0
                    }
                }];

                var options1 = {
                    colors: ['#a2d200', '#cd97eb'],
                    series: {
                        shadowSize: 0
                    },
                    xaxis:{
                        font: {
                            color: '#ccc'
                        },
                        position: 'bottom',
                        ticks: [
                            [ 1, 'Jan' ], [ 2, 'Feb' ], [ 3, 'Mar' ], [ 4, 'Apr' ], [ 5, 'May' ], [ 6, 'Jun' ], [ 7, 'Jul' ], [ 8, 'Aug' ], [ 9, 'Sep' ], [ 10, 'Oct' ], [ 11, 'Nov' ], [ 12, 'Dec' ]
                        ]
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: '%s: %y.4',
                        defaultTheme: false,
                        shifts: {
                            x: 0,
                            y: 20
                        }
                    }
                };

                var plot1 = $.plot($("#line-chart"), data1, options1);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot1.resize();
                    plot1.setupGrid();
                    plot1.draw();
                });
                // * Initialize Line Chart

                // Initialize Bar Chart

                var barData = [];

                for (var i = 0; i < 20; ++i) {
                  barData.push([i, Math.sin(i+0.1)]);
                }

                var data2 = [{
                    data: barData,
                    label: 'Satisfaction',
                    color: '#e05d6f'
                }];

                var options2 = {
                    series: {
                        shadowSize: 0
                    },
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        lineWidth: 0,
                        fillColor: {
                            colors: [{ opacity:0.8 }, { opacity:0.8}]
                        }
                    },
                    xaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        },
                        min: -2,
                        max: 2
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true
                };

                var plot2 = $.plot($("#bar-chart"), data2, options2);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot2.resize();
                    plot2.setupGrid();
                    plot2.draw();
                });
                // * Initialize Bar Chart

                // Initialize Ordered Chart
                var data3 = [{
                    data: [[10, 50], [20, 80], [30, 60], [40, 40]],
                    label: 'A'
                }, {
                    data: [[10, 30], [20, 50], [30, 70], [40, 50]],
                    label: 'B'
                }, {
                    data: [[10, 40], [20, 60], [30, 90], [40, 60]],
                    label: 'C'
                }];

                var options3 = {
                    series: {
                        shadowSize: 0
                    },
                    bars: {
                        show: true,
                        fill: true,
                        lineWidth: 0,
                        fillColor: {
                            colors: [{ opacity:0.6 }, { opacity:0.8}]
                        },
                        order: 1, // order bars
                        colors: ['#428bca','#d9534f','#A40778']
                    },
                    xaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true
                };

                var plot3 = $.plot($("#ordered-chart"), data3, options3);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot3.resize();
                    plot3.setupGrid();
                    plot3.draw();
                });
                // * Initialize Ordered Chart

                // Initialize Staced Chart
                var data4 = [{
                    data: [[10, 50], [20, 80], [30, 60], [40, 40]],
                    label: 'A'
                }, {
                    data: [[10, 30], [20, 50], [30, 70], [40, 50]],
                    label: 'B'
                }, {
                    data: [[10, 40], [20, 60], [30, 90], [40, 60]],
                    label: 'C'
                }];

                var options4 = {
                    series: {
                        shadowSize: 0,
                        stack: true // stack bars
                    },
                    bars: {
                        show: true,
                        fill: true,
                        lineWidth: 0,
                        fillColor: {
                            colors: [{ opacity:0.6 }, { opacity:0.8}]
                        },
                        colors: ['#428bca','#d9534f','#A40778']
                    },
                    xaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true
                };

                var plot4 = $.plot($("#stacked-chart"), data4, options4);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot4.resize();
                    plot4.setupGrid();
                    plot4.draw();
                });
                // * Initialize Stacked Chart

                // Initialize Combined Chart
                var data5 = [{
                    data: [[0, 8], [1, 15], [2, 16], [3, 14], [4,16], [5,18], [6,17], [7,15], [8,12], [9,13]],
                    label: 'Unique Visits',
                    points: {
                        show: true,
                        radius: 3
                    },
                    splines: {
                        show: true,
                        tension: 0.45,
                        lineWidth: 4,
                        fill: 0
                    }
                }, {
                    data: [[0, 5], [1, 9], [2, 10], [3, 8], [4,9], [5, 12], [6, 14], [7, 13], [8, 10], [9, 12]],
                    label: 'Page Views',
                    bars: {
                        show: true,
                        barWidth: 0.4,
                        lineWidth: 0,
                        fillColor: { colors: [{ opacity: 0.6 }, { opacity: 0.8}] }
                    }
                }];

                var options5 = {
                    colors: ['#16a085','#FF0066'],
                    series: {
                        shadowSize: 0
                    },
                    xaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: { content: '%s of %x.1 is %y.4',  defaultTheme: false, shifts: { x: 0, y: 20 } }
                };

                var plot5 = $.plot($("#combined-chart"), data5, options5);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot5.resize();
                    plot5.setupGrid();
                    plot5.draw();
                });
                // * Initialize Stacked Chart

                // Initialize Pie Chart
                var data6 = [
                    { label: 'Chrome', data: 30 },
                    { label: 'Firefox', data: 15 },
                    { label: 'Safari', data: 15 },
                    { label: 'IE', data: 10 },
                    { label: 'Opera', data: 5 },
                    { label: 'Other', data: 10}
                ];

                var options6 = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0,
                            stroke: {
                                width: 0
                            },
                            label: {
                                show: true,
                                threshold: 0.05
                            }
                        }
                    },
                    colors: ['#428bca','#5cb85c','#f0ad4e','#d9534f','#5bc0de','#616f77'],
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: { content: '%s: %p.0%' }
                };

                var plot6 = $.plot($("#pie-chart"), data6, options6);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot6.resize();
                    plot6.setupGrid();
                    plot6.draw();
                });
                // * Initialize Pie Chart

                // Initialize Donut Chart
                var data7 = [
                    { label: 'Chrome', data: 30 },
                    { label: 'Firefox', data: 15 },
                    { label: 'Safari', data: 15 },
                    { label: 'IE', data: 10 },
                    { label: 'Opera', data: 5 },
                    { label: 'Other', data: 10}
                ];

                var options7 = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.5,
                            stroke: {
                                width: 0
                            },
                            label: {
                                show: true,
                                threshold: 0.05
                            }
                        }
                    },
                    colors: ['#428bca','#5cb85c','#f0ad4e','#d9534f','#5bc0de','#616f77'],
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: { content: '%s: %p.0%' }
                };

                var plot7 = $.plot($("#donut-chart"), data7, options7);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot7.resize();
                    plot7.setupGrid();
                    plot7.draw();
                });
                // * Initialize Donut Chart

                // Initialize Realtime Chart
                var realTimeData = [];
                var totalPoints = 300;
                var updateInterval = 30;

                function getData() {
                    if (realTimeData.length > 0)
                        realTimeData = realTimeData.slice(1);

                    // Do a random walk

                    while (realTimeData.length < totalPoints) {

                        var prev = realTimeData.length > 0 ? realTimeData[realTimeData.length - 1] : 50,
                                y = prev + Math.random() * 10 - 5;

                        if (y < 0) {
                            y = 0;
                        } else if (y > 100) {
                            y = 100;
                        }

                        realTimeData.push(y);
                    }

                    // Zip the generated y values with the x values

                    var res = [];
                    for (var i = 0; i < realTimeData.length; ++i) {
                        res.push([i, realTimeData[i]])
                    }

                    return res;
                }

                var options8 = {
                    colors: ['#a2d200'],
                    series: {
                        shadowSize: 0,
                        lines: {
                            show: true,
                            fill: 0.1
                        }
                    },
                    xaxis:{
                        font: {
                            color: '#ccc'
                        },
                        tickFormatter: function() {
                            return '';
                        }
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        },
                        min: 0,
                        max: 110
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: '%y%',
                        defaultTheme: false,
                        shifts: {
                            x: 0,
                            y: 20
                        }
                    }
                };

                var plot8 = $.plot($("#realtime-chart"), [getData()], options8);

                function update() {
                    plot8.setData([getData()]);
                    plot8.draw();
                    setTimeout(update, updateInterval);
                };

                update();

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot8.resize();
                    plot8.setupGrid();
                    plot8.draw();
                });
                // * Initialize Realtime Chart

                // Rickshaw Chart
                var graph1 = new Rickshaw.Graph( {
                    element: document.querySelector("#rickshaw"),
                    renderer: 'area',
                    series: [{
                        name: 'Series 1',
                        color: 'steelblue',
                        data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
                    }, {
                        name: 'Series 2',
                        color: 'lightblue',
                        data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
                    }]
                });
                graph1.render();
                // *Rickshaw Chart

                // Rickshaw Realtime Chart
                var graph2;

                var seriesData = [ [], []];
                var random = new Rickshaw.Fixtures.RandomData(50);
                var updateInterval = 800;

                for (var i = 0; i < 50; i++) {
                    random.addData(seriesData);
                }

                graph2 = new Rickshaw.Graph( {
                    element: document.querySelector("#rickshaw-realtime"),
                    height: 250,
                    renderer: 'area',
                    series: [{
                        name: 'Series 1',
                        color: 'steelblue',
                        data: seriesData[0]
                    }, {
                        name: 'Series 2',
                        color: 'lightblue',
                        data: seriesData[1]
                    }]
                } );

                var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                    graph: graph2
                });

                setInterval( function() {
                    random.removeData(seriesData);
                    random.addData(seriesData);
                    graph2.update();

                },updateInterval);
                // *Rickshaw Realtime Chart


            });

        </script>

<script type="text/javascript">
                $(window).load(function(){
                var data1 = [{
                    data: [[1,5.3],[2,5.9],[3,7.2],[4,8],[5,7],[6,6.5],[7,6.2],[8,6.7],[9,7.2],[10,7],[11,6.8],[12,7]],
                    label: 'Sales',
                    points: {
                        show: true,
                        radius: 6
                    },
                    splines: {
                        show: true,
                        tension: 0.45,
                        lineWidth: 5,
                        fill: 0
                    }
                }, {
                    data: [[1,6.6],[2,7.4],[3,8.6],[4,9.4],[5,8.3],[6,7.9],[7,7.2],[8,7.7],[9,8.9],[10,8.4],[11,8],[12,8.3]],
                    label: 'Orders',
                    points: {
                        show: true,
                        radius: 6
                    },
                    splines: {
                        show: true,
                        tension: 0.45,
                        lineWidth: 5,
                        fill: 0
                    }
                }];

                var options1 = {
                    colors: ['#a2d200', '#cd97eb'],
                    series: {
                        shadowSize: 0
                    },
                    xaxis:{
                        font: {
                            color: '#ccc'
                        },
                        position: 'bottom',
                        ticks: [
                            [ 1, 'Jan' ], [ 2, 'Feb' ], [ 3, 'Mar' ], [ 4, 'Apr' ], [ 5, 'May' ], [ 6, 'Jun' ], [ 7, 'Jul' ], [ 8, 'Aug' ], [ 9, 'Sep' ], [ 10, 'Oct' ], [ 11, 'Nov' ], [ 12, 'Dec' ]
                        ]
                    },
                    yaxis: {
                        font: {
                            color: '#ccc'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        borderWidth: 0,
                        color: '#ccc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: '%s: %y.4',
                        defaultTheme: true,
                        shifts: {
                            x: 0,
                            y: 20
                        }
                    }
                };
                var plot1 = $.plot($("#line-chart"), data1, options1);

                $(window).resize(function() {
                    // redraw the graph in the correctly sized div
                    plot1.resize();
                    plot1.setupGrid();
                    plot1.draw();
                });
            });
            </script> -->