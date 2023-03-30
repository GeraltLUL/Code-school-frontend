

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const windowInnerWidth = document.documentElement.clientWidth






var defaultOptions = {
    container: document.body,
    panelSelector: '> section',
    directionThreshold: 1,
    delay: 0,
    duration: 500,
    easing: function(t) { return t },
};

var PanelSnapInstance;

if(windowInnerWidth > 600){
    document.addEventListener("DOMContentLoaded", function() {
        PanelSnapInstance = new PanelSnap(defaultOptions);
    });
}


//
if(windowInnerWidth > 600 ){
    gsap.fromTo(".about-us__title",{opacity:0, y:200}, {
        scrollTrigger:".about-us__title",
        opacity:1, y:0,
        delay:0.25,
    });

    gsap.fromTo(".about-as__description",{opacity:0, y:200}, {
        scrollTrigger:".about-as__description",
        opacity:1, y:0,
        delay:0.25,
    });


    let itemsL = gsap.utils.toArray('.score__indicator')

    itemsL.forEach(item => {
        gsap.fromTo(item, { opacity: 0, y: 200 }, {
            scrollTrigger:".about-as__description",
            opacity:1, y:0,
            delay:0.25,
        })
    })

    gsap.fromTo(".prepare-levels__title",{opacity:0, y:200}, {
        scrollTrigger:".prepare-levels__title",
        opacity:1, y:0,
        delay:0.25,
    });



    let itemsLvl = gsap.utils.toArray('.level')

    itemsLvl.forEach(item => {
        gsap.fromTo(item, { opacity: 0, y: 200, scale:1 }, {
            scrollTrigger:".prepare-levels__levels",
            opacity:1, y:0, scale:1,
            delay:0.15,

        })
    })
}


// if (ScrollTrigger.isTouch !== 1) {








// }


const hdn = document.querySelector('.about-basic-level');

function activeLeft(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__1").classList.add("active");
    document.querySelector("#level__2").classList.remove("active");
    document.querySelector("#level__3").classList.remove("active");
    handleButtonClick1();

    document.querySelector(".easy").style.display = "flex";
    document.querySelector(".medium").style.display = "none";
    document.querySelector(".hard").style.display = "none";

    document.querySelector(".mid_b > rect").style.fillOpacity = "0.5";
    document.querySelector(".right_b > rect").style.fillOpacity = "0.5";
}
function activeMiddle(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__2").classList.add("active");
    document.querySelector("#level__1").classList.remove("active");
    document.querySelector("#level__3").classList.remove("active");
    handleButtonClick1();

    document.querySelector(".easy").style.display = "none";
    document.querySelector(".medium").style.display = "flex";
    document.querySelector(".hard").style.display = "none";

    document.querySelector(".mid_b > rect").style.fillOpacity = "1";
    document.querySelector(".right_b > rect").style.fillOpacity = "0.5";
}
function activeRight(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__3").classList.add("active");
    document.querySelector("#level__2").classList.remove("active");
    document.querySelector("#level__1").classList.remove("active");
    handleButtonClick1();

    document.querySelector(".easy").style.display = "none";
    document.querySelector(".medium").style.display = "none";
    document.querySelector(".hard").style.display = "flex";

    document.querySelector(".mid_b > rect").style.fillOpacity = "1";
    document.querySelector(".right_b > rect").style.fillOpacity = "1";
}


function handleButtonClick1() {
    var panel = document.querySelector(".about-basic-level");
    PanelSnapInstance.snapToPanel(panel);
}








var typingEffect = new Typed(".multiText",{
    strings:["новое поколение профи в digital-сфере", "креативных специалистов", "будущих гиков",
         "fullstack разработчиков", "новое поколение профи в digital-сфере"],
    loop:true,
    typeSpeed:60,
    backSpeed:40,
    backDelay: 2500,
})


var btn = document.querySelector('.preview-wrapper__button');


if(windowInnerWidth <= 600 ){
    var btn2 = document.querySelector('.button');
    var hiddenElement2 = document.querySelector('.about-us')

    btn2.addEventListener('click', handleButtonClick2);
    function handleButtonClick2() {
        hiddenElement2.scrollIntoView({block: "center", behavior: "smooth"});
    }
}


btn.addEventListener('click', handleButtonClick);
function handleButtonClick() {

    var panel = document.querySelector(".about-us");
    PanelSnapInstance.snapToPanel(panel);
}


