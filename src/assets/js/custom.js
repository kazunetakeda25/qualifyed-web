jQuery(".hamburger-menu, .close-menu").bind('click', function (event) {
  jQuery('body').toggleClass("has-main-navi--fully-opened");
  event.preventDefault();
});







jQuery(document).ready(function () {
  //BACKGROUND IMAGE
  var idCount = 1;
  jQuery('.bgs-image').each(function () {
    jQuery(this).attr('id', 'media-' + idCount);
    idCount++;
    var getID = jQuery(this).attr('id');
    var imagesrc = jQuery('img', this).attr("src");
    jQuery(this).css('background-image', 'url(' + imagesrc + ')');
  });


// $(".jonesBlog .fa").click(function(event){
//   event.stopPropagation();
//    $(".user-dropdownBlog").slideToggle(200);
// });

// $(document).click(function(){
//     $(".user-dropdownBlog").slideUp(200);
// });

  //MOBILE MENUS
// jQuery(".hamburger-menu, .close-menu").bind('click', function (event) {
//   event.preventDefault();
//   jQuery('body').toggleClass("has-main-navi--fully-opened");
// });

//ADD CLASS FOR INNER PAGE
if(jQuery('div').hasClass('home-page')) {
  jQuery(document.body).addClass('home-page-template');
}else{
  jQuery(document.body).removeClass('home-page-template');
}
if(jQuery('div').hasClass('category-index-page')) {
  jQuery(document.body).addClass('category-index-page');
}else{
  jQuery(document.body).removeClass('category-index-page');
}

$(".toggle-password").click(function() {
  $(".toggle-password > i").toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".toggle-password1").click(function() {
  $(".toggle-password1 > i").toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$('#chooseFile').bind('change', function () {
  var filename = $("#chooseFile").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
  }
});

$('#chooseFile1').bind('change', function () {
  var filename = $("#chooseFile1").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile1").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile1").text(filename.replace("C:\\fakepath\\", "")); 
  }
});

$('.chooseFile').bind('change', function () {
  var filename = $(".chooseFile").val();
  if (/^\s*$/.test(filename)) {
    $(".fileup").removeClass('active');
    $(".nofile").text("No file chosen..."); 
  }
  else {
    $(".fileup").addClass('active');
    $(".nofile").text(filename.replace("C:\\fakepath\\", "")); 
  }
});


  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');
    if($(this).hasClass('completed') == true)
    {
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');

      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    }
  });

  // $(".option1").change(function(){
  //   console.log("in jquery")
  //    $( ".dr1" ).toggleClass("show");
  //    $(".tagName").toggleClass("show");
  // });

  // $(".option2").change(function(){
  //    $( ".dr2" ).toggleClass("show");
  // });

  //  $(".option3").change(function(){
  //    $( ".dr3" ).toggleClass("show");
  // });

  //  $(".option4").change(function(){
  //    $( ".dr4" ).toggleClass("show");
  // });
  //  $(".option5").change(function(){
  //    $( ".dr5" ).toggleClass("show");
  // });
  //  $(".option6").change(function(){
  //    $( ".dr6" ).toggleClass("show");
  // });
  // $(".option7").change(function(){
  //    $( ".dr7" ).toggleClass("show");
  // });


  $(".all-requestsBtn a").click(function(){
    $(".reqAllPopup").toggle(500);
    $("body").addClass("popupActive")

  });
  $(".closePopup").click(function(){
    $(".reqAllPopup").hide(500);
  });




  // HEADER SEARCH JS
  $(".search-dropdown-toggle").click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this)
    .closest(".search-dropdown")
    .toggleClass("open");
});

// $(".search-dropdown-menu > li > a").click(function(e) {
//   e.preventDefault();
//   var clicked = $(this);
//   clicked
//     .closest(".search-dropdown-menu")
//     .find(".menu-active")
//     .removeClass("menu-active");
//   clicked.parent("li").addClass("menu-active");
//   clicked
//     .closest(".search-dropdown")
//     .find(".toggle-active")
//     .html(clicked.html());
// });

$(document).click(function() {
  $(".search-dropdown.open").removeClass("open");
});


});//END OF DOCUMENT READY


jQuery(window).resize(function (){
});//END OF WINDOW RESIZE

