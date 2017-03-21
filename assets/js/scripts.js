//--------Smoothscroll Function---------//
//$("nav ul li a[href^='#']").on('click', function(e) {
$(".nav-item a, .arrow, .footer a").on('click', function(e) {

   e.preventDefault();

   var hash = this.hash;
    $hash = $(hash);
    
    
   if(hash.length){
       var scrollLocation = $hash.offset().top - $("nav").outerHeight();
   }
   else{
       var scrollLocation = 0;
   }                            
    
   $('html, body').animate({
       scrollTop: scrollLocation
     }, 300, function(){

       window.location.hash = hash;
     });
    
    if($(".collapse.navbar-collapse").hasClass('show')){
       $(".collapse.navbar-collapse").collapse('hide');
    }  

});


$('body').scrollspy({
   offset: $("nav").outerHeight()+3
});




//---------Navbar color change-------//
function checkScroll(){
    var startY = $('.navbar').height() ; 


    if($(window).scrollTop() > startY){
        $('.navbar').addClass("scrolled");
        $(".navbar .navbar-brand img").attr("src","/assets/images/courtney-ring-logo-white.png");
    }else{
        $('.navbar').removeClass("scrolled");
        $(".navbar .navbar-brand img").attr("src","/assets/images/CourtneyRingLogo.png");
    }
}

$(function(){
    if($(window).width() > 992 ){
        $(window).on("scroll load resize", function(){
            checkScroll();
        });
    }

})



//------------Text Rotate-----------//
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



//-----------Portfolio Modal Data--------//
$(function(){
    
    var data = {}
    
    $.getJSON("/assets/json/portfolio.json", function(json) {
        data = json;

    }).then(function(){
         $(".portfolio .portfolio-images .project-inner").each(function(){
            
            var thumbnailLoc = this.id;
            var thumbnail = data[thumbnailLoc].thumbnail;
            
            $(this).css("background", "url("+thumbnail+") center/cover no-repeat");    
        
        })
    })
    
    
    $(".project").on('click',function(){
        
        var key = $(this).children(".project-inner").attr("id");
        var id = $(this).find("a").attr("href").replace('#','');
        $(".modalPortfolio").attr("id",id);
        
        var aria = id;
        $(".modalPortfolio").attr("aria-labelledby",aria);
        
        var image = data[key].image;
        //$(".modalPortfolio .modal-body .image").css("background","url("+image+") center/cover no-repeat");
        $(".modalPortfolio .modal-body img").attr('src', image);
        
        
        var title = data[key].title;
        $(".modalPortfolio .modal-header .title").text(title);
        
        var desc = data[key].description;
        $(".modalPortfolio .modal-body .description").text(desc);
        
        var company = data[key].company;
        $(".modalPortfolio .modal-body .company").text(company);
        
        var skills = data[key].skills;
        $(".modalPortfolio .modal-body .skills").text(skills);
        
        var date = data[key].date;
        $(".modalPortfolio .modal-body .date").text(date);
        
        var website = data[key].website;
        $(".modalPortfolio .modal-body .website").text(website);
        
        //var test = $(".modal.portfolio");
        //console.log(test);
        //console.log(data[key].projectName);

    });
})



