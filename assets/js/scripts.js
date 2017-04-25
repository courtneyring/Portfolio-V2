//--------Smoothscroll Function---------//
//$("nav ul li a[href^='#']").on('click', function(e) {
$(".nav-item a, .arrow, .footer a, .navbar-brand").on('click', function(e) {

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
     }, 500, function(){

       window.location.hash = hash;
     });
    
    if($(".collapse.navbar-collapse").hasClass('show')){
       $(".collapse.navbar-collapse").collapse('hide');
    }  

});


$('body').scrollspy({
   offset: $("nav").outerHeight()+1
});


$(function(){
    if($(window).width()<768){
        var landingOffset = $(window).height()-$("nav").outerHeight()
        $('.landing').css('height', landingOffset)
    }
    else{
        $('.landing').css('height', '100vh')
    }
})

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
        $(".modalPortfolio .modal-body .image").css("background","url("+image+") top center/cover no-repeat");
        //$(".modalPortfolio .modal-body img").attr('src', image);
        
        var title = data[key].title;
        $(".modalPortfolio .modal-header .title").text(title);
        

        var desc = (data[key].description).replace(/\n/g, '<br />')
        $(".modalPortfolio .modal-body .description").html(desc);
        
        var company = data[key].company;
        $(".modalPortfolio .modal-body .company").text(company);
        
        var skills = data[key].skills;
        $(".modalPortfolio .modal-body .skills").text(skills);
        
        var date = data[key].date;
        $(".modalPortfolio .modal-body .date").text(date);
        
        var website = data[key].website;
        $(".modalPortfolio .modal-body .website").text(website);

    });
})


//---------Skills Circle Generation and Animation ----//
function calculateRotation(rotation, oldCoords, cx, cy){
    var r = -(rotation*Math.PI)/180;
    var s = Math.sin(r)
    var c = Math.cos(r)
    
    newCoords = new Object();
    newCoords.x = c*(oldCoords.x-cx) + s*(oldCoords.y-cy) + cx;
    newCoords.y = -s*(oldCoords.x-cx) + c*(oldCoords.y-cy) + cy;
    
    return newCoords
}

function drawCircle(oldShape){
      $(".skill-section .shapes path").each(function(){
        
        var newShape = {
            pointOne : {},
            pointTwo : {},
            pointThree : {}
        }
        
        newShape.pointOne.x = oldShape.pointThree.x
        newShape.pointOne.y = oldShape.pointThree.y

        
        newShape.pointTwo = calculateRotation(60, oldShape.pointTwo, 240,240)
        
        newShape.pointThree = calculateRotation(60,oldShape.pointThree, 240, 240)
        
        var oneToTwo = new Object();
        var twoToThree = new Object();
        var threeToOne = new Object();
        
        oneToTwo.x = newShape.pointTwo.x-newShape.pointOne.x
        oneToTwo.y = newShape.pointTwo.y-newShape.pointOne.y
        
        twoToThree.x = newShape.pointThree.x-newShape.pointTwo.x
        twoToThree.y = newShape.pointThree.y-newShape.pointTwo.y
        
        threeToOne.x = newShape.pointOne.x-newShape.pointThree.x
        threeToOne.y = newShape.pointOne.y-newShape.pointThree.y
        
        var dString = 
            "m" + newShape.pointOne.x + " " + newShape.pointOne.y + " " +
            "l" + oneToTwo.x + " " + oneToTwo.y + " " +
            "l" + twoToThree.x + " " + twoToThree.y + " " +
            "a 240 240, 0, 0, 0, " + threeToOne.x + " " + threeToOne.y
        
       $(this).attr('d', dString);

        oldShape = newShape;
    })    
}

function drawLabels(labelCoords, rotation){
    $(".skills .skill-section .labels foreignObject").each(function(){
        
        var newCoords = new Object()
        
        newCoords = calculateRotation(rotation,labelCoords, 240,240)
        
        $(this).attr('x',newCoords.x-65)
        $(this).attr('y',newCoords.y-50)
        
        labelCoords = newCoords
    })
    
}

function generateSkillsCircle (){
    var posOne = $(".skill-section .shapes path:first-child").attr("d");
    var coords = posOne.split(" ");

    var oldShape =  {
        pointOne : {},
        pointTwo : {},
        pointThree : {}
    }
    
    oldShape.pointOne.x = parseFloat(coords[0].replace("m",""));
    oldShape.pointOne.y = parseFloat(coords[1])
    
    oldShape.pointTwo.x = oldShape.pointOne.x + parseFloat(coords[2].replace("l",""));
    oldShape.pointTwo.y = oldShape.pointOne.y + parseFloat(coords[3]);
    
    oldShape.pointThree.x = oldShape.pointTwo.x + parseFloat(coords[4].replace("l",""));
    oldShape.pointThree.y = oldShape.pointTwo.y + parseFloat(coords[5]);

    drawCircle(oldShape);
    
    var labelCoords = new Object();
    labelCoords.x = parseFloat($(".skill-section .labels foreignObject:first-child").attr("x"))+65
    labelCoords.y = parseFloat($(".skill-section .labels foreignObject:first-child").attr("y"))+50
    
    console.log(labelCoords);
    drawLabels(labelCoords, 60)
    
    
}

function labelLookup(){
    oldCoords = new Object();
    $(".skills .skill-section .labels foreignObject").each(function(){
        var lookup = this.id.replace("label","")
        var coords = new Object();
        coords.x =  $(this).attr('x');
        coords.y = $(this).attr('y');
        oldCoords[lookup] = coords;
        
    })
    return oldCoords
}

function updateLabelCoords(rotation){
    
    $(".skills .labels animateMotion").remove()
   
    var oldCoords = labelLookup()
    console.log(oldCoords)
    
    $(".skills .skill-section .labels foreignObject").each(function(){

        var id = parseInt($(this).attr('id').replace("label",""))
        var newPos = parseInt((id+rotation)%6);

        $(this).attr('x',oldCoords[newPos].x);
        $(this).attr('y',oldCoords[newPos].y);

        $(this).attr('id',"label"+newPos);
        
        $(this).remove();
        $(".labels").append(this);

    })
    

}

function updateShapeCoords(rotation){
    
    var oldValues = new Object();

    $(".skills .skill-section .shapes path").each(function(){
        var lookup = this.id
        oldValues[lookup] = $(this).attr('d'); 
    })
    
    
    $(".skills .skill-section .shapes path").each(function(){
        var id = parseInt(this.id)
        var newPos = parseInt(id+rotation)%6;
        $(this).attr('id',newPos);

        var newVal = oldValues[newPos];
        $(this).attr('d',newVal);
    })
    $(".skills .shapes animateTransform").remove();
    
    updateLabelCoords(rotation)
    
}

function createRotation(rotation){
    
    var animation = document.createElementNS(
                         'http://www.w3.org/2000/svg', 'animateTransform');
    animation.setAttributeNS(null, 'attributeName', 'transform');
    animation.setAttributeNS(null, 'onend', 'updateShapeCoords('+rotation+')');
    animation.setAttributeNS(null, 'attributeType', 'transform');
    animation.setAttributeNS(null, 'begin', 'indefinite');
    animation.setAttributeNS(null, 'type', 'rotate');
    animation.setAttributeNS(null, 'from', '0 240 240');
    if(rotation==5 || rotation ==4){
        animation.setAttributeNS(null, 'to', -60*(6-rotation) + ' 240 240');
    }
    else{
        animation.setAttributeNS(null, 'to', 60*rotation + ' 240 240');
    }
    animation.setAttributeNS(null, 'dur', '2s');
    animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'id', 'circle');
    return animation;
}

function createTranslation(rotation, oldCoords, id){

    var sweepFlag
    var pathString = "M 0 0 "
    
    if (rotation > 3){
        
        for (x=0; x<6-rotation; x++){
            
            var orig = oldCoords[(id+6-x)%6]
            var dest = oldCoords[(id+6-x-1)%6]

            var newString = ' a240 240 0 0 0 ' + parseFloat(dest.x-orig.x) + ' ' + parseFloat(dest.y-orig.y)

            pathString+=newString
            
        }
    }
    else{

        for (x=0; x<rotation; x++){

            var orig = oldCoords[(id+x)%6]
            var dest = oldCoords[(id+(x+1))%6]
            var newString = ' a240 240 0 0 1 ' +  parseFloat(dest.x-orig.x) + ' ' + parseFloat(dest.y-orig.y)

            pathString+=newString
        }
    }

    var Origin = oldCoords[id]
    var Destination = oldCoords[parseFloat(id+rotation)%6]

    var animation = document.createElementNS(
                         'http://www.w3.org/2000/svg', 'animateMotion');
    animation.setAttributeNS(null,'dur', '2s');
    animation.setAttributeNS(null,'fill', 'freeze');
    animation.setAttributeNS(null,'begin', 'circle.begin');
    animation.setAttributeNS(null, 'path', pathString);
    //animation.setAttributeNS(null, 'onend', 'updateLabelCoords('+id+',' +Destination.x+','+Destination.y+','+rotation+')')
    
    $('#label'+id).append(animation)
}

function displaySkill(id, rotation){
    $(".skills .skills-content").fadeOut(1000, function(){
        $(".skills .skills-content .content-section").each(function(){

            var curId = parseInt($(this).attr('id').replace("content",""))

            var newId = "content"+(parseInt(curId+rotation)%6);
            $(this).attr('id', newId);
            if(newId=="content0"){
                $(this).fadeIn(1000)
            }
        }) 
    })
    $(".skills .skills-content").fadeIn(1000);

}


$(".skill-section-mobile .custom-select").change(function(){
    var id = $(this).val().replace("option","")
    
    $(".skills .skills-content").fadeOut(500, function(){
        $(".skills .skills-content .content-section").each(function(){
            $(this).addClass('hidden')
        })
        
        $(".skill-section-mobile .custom-select .option").each(function(){
            $(this).removeClass('selected')
        })
        
        $("#content"+id).removeClass('hidden')
        $("[value=option"+id+"]").addClass('selected')
        
    })

    $(".skills .skills-content").fadeIn(1000);
})


function clickEvent(el){
     //Get Click ID and calculate rotation num
    var id = parseInt(el.id.replace("label",""));
    if (id===0){return;}
    var rotation = parseInt(6-id);
    
   //Create Rotation Animation, inject into DOM
    var rotationAnimation = createRotation(rotation);
    $(".skills .skill-section .shapes").append(rotationAnimation)

    oldCoords = labelLookup();

    $(".skills .skill-section .labels foreignObject").each(function(){
        var labelId = parseInt($(this).attr('id').replace('label',''))
        rotAnim2 = createTranslation(rotation, oldCoords, labelId);
        $(this).append(rotAnim2);
        
    })
    displaySkill(id, rotation)
    rotationAnimation.beginElement(); 
    
}



$(function(){
    generateSkillsCircle();

})




/*-------Analytics --------*/
$(window).on("scroll", function(){
    ga('send', 'event', 'interaction', 'scroll');  
})