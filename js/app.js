gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// var defaultOptions = {
//     container: '.bd',
//     panelSelector: '> section',
//     directionThreshold: 50,
//     delay: 0,
//     duration: 300,
//     easing: function(t) { return t },
// };
//
// new PanelSnap(options);
// document.addEventListener("DOMContentLoaded", function() {
//     new PanelSnap();
// });


function activeLeft(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__1").classList.add("active")
    document.querySelector("#level__2").classList.remove("active")
    document.querySelector("#level__3").classList.remove("active")
}
function activeMiddle(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__2").classList.add("active")
    document.querySelector("#level__1").classList.remove("active")
    document.querySelector("#level__3").classList.remove("active")
}
function activeRight(){
    // document.querySelector("#level__1").classList.toggle("active")
    document.querySelector("#level__3").classList.add("active")
    document.querySelector("#level__2").classList.remove("active")
    document.querySelector("#level__1").classList.remove("active")
}




// if (ScrollTrigger.isTouch !== 1) {


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





// }

















var typingEffect = new Typed(".multiText",{
    strings:["новое поколение профи в digital-сфере", "креативных специалистов", "будущих гиков",
         "fullstack разработчиков", "новое поколение профи в digital-сфере"],
    loop:true,
    typeSpeed:60,
    backSpeed:40,
    backDelay: 2500,
})


var btn = document.querySelector('.button');
var hiddenElement = document.querySelector('.about-us')

btn.addEventListener('click', handleButtonClick);
function handleButtonClick() {
    hiddenElement.scrollIntoView({block: "center", behavior: "smooth"});
}