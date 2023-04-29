

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const windowInnerWidth = document.documentElement.clientWidth


document.body.onload = function (){
    setTimeout(function (){
        var preloader = document.querySelector('.preloader');
        if( !preloader.classList.contains('done')){
            preloader.classList.add('done');
        }
    }, 1000)
}





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

    let nw = 0;
    let mov = 33.333333;

    const gal__img = document.querySelectorAll('.gal__img');

    let mx = mov * (gal__img.length - 2);

    function nextImg(){
        // alert(mx)
        // alert(nw)

        if ((nw - mov) === (mx * -1)) return;
        nw = nw - mov;
        document.querySelector(".wrapper__gal").style.transform = `translate(${nw}%, 0%)`;
    }

    function prevImg(){
        if (nw == 0) return;
        nw = nw + mov;
        document.querySelector(".wrapper__gal").style.transform = `translate(${nw}%, 0%)`;
    }






    const swiper2 = new Swiper('.swiper2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // // If we need pagination
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        //
        // Navigation arrows
        navigation: {
            nextEl: '.swiper2-button-next',
            prevEl: '.swiper2-button-prev',
        },
        //
        // // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    });





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

    //Анимация для "О нас"
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
    var x = 0.25;
    itemsL.forEach(item => {
        gsap.fromTo(item, { opacity: 0, y: 200 }, {
            scrollTrigger:".about-as__description",
            opacity:1, y:0,
            delay:x,
        })
        x += 0.1;

    })


    //Анимация для "Уровни подготовки"
    gsap.fromTo(".prepare-levels__title",{opacity:0, y:200}, {
        scrollTrigger:".prepare-levels__title",
        opacity:1, y:0,
        delay:0.25,
    });



    let itemsLvl = gsap.utils.toArray('.level')
    var x1 = 0.25
    itemsLvl.forEach(item => {
        gsap.fromTo(item, { opacity: 0, y: 200, scale:1 }, {
            scrollTrigger:".prepare-levels__levels",
            opacity:1, y:0, scale:1,
            delay:x1,

        })
        x1 += 0.1

        item.addEventListener("mousedown", () => {
            gsap.fromTo(".about-basic-level__basic-description > *", { opacity: 0, x: 200, scale:1 }, {
                scrollTrigger:".about-basic-level__basic-description > *",
                opacity:1, x:0, scale:1,
                delay:0.25,
            })
            gsap.fromTo(".about-basic-level__basic-diogram",{opacity:0, x:-200}, {
                scrollTrigger:".about-basic-level__basic-diogram",
                opacity:1, x:0,
                delay:0.25,
            });
        });
    })


    //Анимация для уровней
    let itemslv = gsap.utils.toArray('.about-basic-level__basic-description > *')
    itemslv.forEach(item => {
        gsap.fromTo(item, { opacity: 0, x: 200, scale:1 }, {
            scrollTrigger:".about-basic-level__basic-description > *",
            opacity:1, x:0, scale:1,
            delay:0.1,
        })
    })

    gsap.fromTo(".about-basic-level__basic-diogram",{opacity:0, x:-200}, {
        scrollTrigger:".about-basic-level__basic-diogram",
        opacity:1, x:0,
        delay:0.25,
    });







    //Анимация для "Наши парнеры"
    gsap.fromTo("#wrd1",{scale:0.0001}, {
        scrollTrigger:"#wrd1",
        scale:1,
        duration: 0.3,
        delay:0.15,
    });
    gsap.fromTo("#wrd2",{scale:0.0001}, {
        scrollTrigger:"#wrd2",
        scale:1,
        duration: 0.3,
        delay:0.25,
    });
    gsap.fromTo("#wrd3",{scale:0.0001}, {
        scrollTrigger:"#wrd3",
        scale:1,
        duration: 0.3,
        delay:0.35,
    });
    gsap.fromTo("#wrd4",{scale:0.0001}, {
        scrollTrigger:"#wrd4",
        scale:1,
        duration: 0.3,
        delay:0.45,
    });
    gsap.fromTo("#wrd5",{scale:0.0001}, {
        scrollTrigger:"#wrd5",
        scale:1,
        duration: 0.3,
        delay:0.55,
    });
    gsap.fromTo("#wrd6",{scale:0.0001}, {
        scrollTrigger:"#wrd6",
        scale:1,
        duration: 0.3,
        delay:0.65,
    });
    gsap.fromTo("#wrd7",{scale:0.0001}, {
        scrollTrigger:"#wrd7",
        scale:1,
        duration: 0.3,
        delay:0.75,
    });

    //Анимация для треугольников
    gsap.fromTo(".tr1 > svg",{scale:0.0001}, {
        scrollTrigger:".tr1",
        scale:1,
        duration: 0.1,
        delay:0.05,
    });
    gsap.fromTo(".tr2 > svg",{scale:0.0001}, {
        scrollTrigger:".tr2",
        scale:1,
        duration: 0.1,
        delay:0.15,
    });
    gsap.fromTo(".tr3 > svg",{scale:0.0001}, {
        scrollTrigger:".tr3",
        scale:1,
        duration: 0.1,
        delay:0.25,
    });
    gsap.fromTo(".tr4 > svg",{scale:0.0001}, {
        scrollTrigger:".tr4",
        scale:1,
        duration: 0.1,
        delay:0.35,
    });
    gsap.fromTo(".tr5 > svg",{scale:0.0001}, {
        scrollTrigger:".tr5",
        scale:1,
        duration: 0.1,
        delay:0.45,
    });
    gsap.fromTo(".tr6 > svg",{scale:0.0001}, {
        scrollTrigger:".tr6",
        scale:1,
        duration: 0.1,
        delay:0.55,
    });


    //Анимация клика на треугольник

    let triangles = gsap.utils.toArray('.trr > svg')

    triangles.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                rotation:360,
                duration:2,
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                rotation:0,
                duration:2,
            });
        });
    })



    // $(function(){
    //     $("#test1").on('click', function(){
    //         TweenMax.to('#test', 1, {
    //             startAt:{
    //                 rotation:0
    //             },
    //             rotation:360
    //         })
    //     });
    // });


    //Анимация hover для кружочков IT-компаний
    let images = gsap.utils.toArray(".wrd");

    images.forEach((image, i) => {
        image.addEventListener("mouseenter", () => {
            gsap.to(image, {
                scale: 1.2,
                duration: 0.1
            });
        });
        image.addEventListener("mouseleave", () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.1
            });
        })
    });


    //Анимации для блока "qst"
    let trngl = gsap.utils.toArray(".trngl");
    trngl.forEach((item, i) => {
        gsap.fromTo(item, { scale:0.001 }, {
            scrollTrigger:".trngl",
            scale:1,
            delay:0.2,
        })
    });

    gsap.fromTo(".trngl2", { scale:0.001 }, {
        scrollTrigger:".trngl",
        scale:1,
        delay:0.2,
    })

    gsap.fromTo(".qst__h1", { x:-300 }, {
        scrollTrigger:".qst__h1",
        x:0,
        delay:0.2,
    })
    gsap.fromTo(".qst__svg", { x:300 }, {
        scrollTrigger:".qst__svg",
        x:0,
        delay:0.2,
    })
    gsap.fromTo(".offer_btn", { y:200 }, {
        scrollTrigger:".offer_btn",
        y:0,
        delay:0,
    })

    //Анимация при наведении на подарок
    let pres = gsap.utils.toArray('.qst__svg')

    pres.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                scale:1.2,
                duration: 1
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                scale:1,
                duration: 1
            });
        })
    })

    document.querySelector(".swiper-button-next").style.display = "none";
    document.querySelector(".swiper-button-prev").style.display = "none";

    //Анимация при наведении на пингвина
    let peng = gsap.utils.toArray('.peng')

    peng.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                x:40,
                duration: 1
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item,  {
                x:0,
                duration: 1
            });
        })
    })

    //Анимация при наведении на треугольники
    let ttt = gsap.utils.toArray('.trngl > svg')

    ttt.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                rotation:360,
                duration: 3,
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item,  {
                rotation:0,
                duration: 3,
            });
        })
    })

    let ttt2 = gsap.utils.toArray('.trngl2')

    ttt2.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                rotation:360,
                duration: 3,
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item,  {
                rotation:0,
                duration: 3,
            });
        })
    })




}
else{

    let nw = 0;
    let mov = 100;

    const gal__img = document.querySelectorAll('.gal__img');

    let mx = mov * (gal__img.length);

    function nextImg(){
        // alert(mx)
        // alert(nw)

        if ((nw - mov) === (mx * -1)) return;
        nw = nw - mov;
        document.querySelector(".wrapper__gal").style.transform = `translate(${nw}%, 0%)`;
    }

    function prevImg(){
        if (nw == 0) return;
        nw = nw + mov;
        document.querySelector(".wrapper__gal").style.transform = `translate(${nw}%, 0%)`;
    }




    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // // If we need pagination
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        //
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        //
        // // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    });



    // //Анимация для "О нас"
    // gsap.fromTo(".about-us__title",{opacity:0, y:200}, {
    //     scrollTrigger:".about-us__title",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    // gsap.fromTo(".about-as__description",{opacity:0, y:200}, {
    //     scrollTrigger:".about-as__description",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    //
    // let itemsL = gsap.utils.toArray('.score__indicator')
    // var x = 0.25;
    // itemsL.forEach(item => {
    //     gsap.fromTo(item, { opacity: 0, y: 200 }, {
    //         scrollTrigger:".about-as__description",
    //         opacity:1, y:0,
    //         delay:x,
    //     })
    //     x += 0.1;
    //
    // })



    function activeLeft(){
        // document.querySelector("#level__1").classList.toggle("active")
        document.querySelector("#level__1").classList.add("active");
        document.querySelector("#level__2").classList.remove("active");
        document.querySelector("#level__3").classList.remove("active");
        scrollToNext();

        document.querySelector(".easy").style.display = "flex";
        document.querySelector(".medium").style.display = "none";
        document.querySelector(".hard").style.display = "none";

        document.querySelector("#ez").style.display = "flex";
        document.querySelector("#mid").style.display = "none";
        document.querySelector("#hard").style.display = "none";
        anim();



        document.querySelector(".mid_b > rect").style.fillOpacity = "0.5";
        document.querySelector(".right_b > rect").style.fillOpacity = "0.5";
    }
    function activeMiddle(){
        // document.querySelector("#level__1").classList.toggle("active")
        document.querySelector("#level__2").classList.add("active");
        document.querySelector("#level__1").classList.remove("active");
        document.querySelector("#level__3").classList.remove("active");
        scrollToNext();
        anim();

        document.querySelector(".easy").style.display = "none";
        document.querySelector(".medium").style.display = "flex";
        document.querySelector(".hard").style.display = "none";

        document.querySelector("#ez").style.display = "none";
        document.querySelector("#mid").style.display = "flex";
        document.querySelector("#hard").style.display = "none";

        document.querySelector(".mid_b > rect").style.fillOpacity = "1";
        document.querySelector(".right_b > rect").style.fillOpacity = "0.5";
    }
    function activeRight(){
        // document.querySelector("#level__1").classList.toggle("active")
        document.querySelector("#level__3").classList.add("active");
        document.querySelector("#level__2").classList.remove("active");
        document.querySelector("#level__1").classList.remove("active");
        scrollToNext();
        anim();

        document.querySelector(".easy").style.display = "none";
        document.querySelector(".medium").style.display = "none";
        document.querySelector(".hard").style.display = "flex";

        document.querySelector("#ez").style.display = "none";
        document.querySelector("#mid").style.display = "none";
        document.querySelector("#hard").style.display = "flex";

        document.querySelector(".mid_b > rect").style.fillOpacity = "1";
        document.querySelector(".right_b > rect").style.fillOpacity = "1";
    }




    //Анимация для "Уровни подготовки"
    // gsap.fromTo(".prepare-levels__title",{opacity:0, y:200}, {
    //     scrollTrigger:".prepare-levels__title",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    // gsap.fromTo(".m-prepare-levels",{opacity:0, y:200}, {
    //     scrollTrigger:".m-prepare-levels",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    // gsap.fromTo(".swiper-button-prev",{opacity:0, y:200}, {
    //     scrollTrigger:".swiper-button-prev",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    // gsap.fromTo(".swiper-button-next",{opacity:0, y:200}, {
    //     scrollTrigger:".swiper-button-next",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    //
    //
    //
    // let itemsLvl = gsap.utils.toArray('.level')
    // var x1 = 0.25
    // itemsLvl.forEach(item => {
    //     gsap.fromTo(item, { opacity: 0, y: 200, scale:1 }, {
    //         scrollTrigger:".prepare-levels__levels",
    //         opacity:1, y:0, scale:1,
    //         delay:x1,
    //
    //     })
    //     x1 += 0.1
    //
    //     item.addEventListener("mousedown", () => {
    //         gsap.fromTo(".about-basic-level__basic-description > *", { opacity: 0, x: 200, scale:1 }, {
    //             scrollTrigger:".about-basic-level__basic-description > *",
    //             opacity:1, x:0, scale:1,
    //             delay:0.25,
    //         })
    //         gsap.fromTo(".about-basic-level__basic-diogram",{opacity:0, x:-200}, {
    //             scrollTrigger:".about-basic-level__basic-diogram",
    //             opacity:1, x:0,
    //             delay:0.25,
    //         });
    //     });
    // })
    //
    //
    // //Анимация для уровней
    //
    //
    // gsap.fromTo(".m-level-title",{opacity:0, y:200}, {
    //     scrollTrigger:".m-level-title",
    //     opacity:1, y:0,
    //     delay:0.25,
    // });
    //
    // let itemslv = gsap.utils.toArray('.about-basic-level__basic-description > *')
    // itemslv.forEach(item => {
    //     gsap.fromTo(item, { opacity: 0, x: 200, scale:1 }, {
    //         scrollTrigger:".about-basic-level__basic-description > *",
    //         opacity:1, x:0, scale:1,
    //         delay:0.1,
    //     })
    // })
    //
    // gsap.fromTo(".about-basic-level__basic-diogram",{opacity:0, x:-200}, {
    //     scrollTrigger:".about-basic-level__basic-diogram",
    //     opacity:1, x:0,
    //     delay:0.25,
    // });


    function anim(){

        gsap.fromTo(".m-level-title",{opacity:0, y:200}, {
            scrollTrigger:".m-level-title",
            opacity:1, y:0,
            delay:0.25,
        });

        let itemslv = gsap.utils.toArray('.about-basic-level__basic-description > *')
        itemslv.forEach(item => {
            gsap.fromTo(item, { opacity: 0, y: 200, scale:1 }, {
                scrollTrigger:".about-basic-level__basic-description > *",
                opacity:1, y:0, scale:1,
                delay:0.1,
            })
        })

        gsap.fromTo(".about-basic-level__basic-diogram",{opacity:0, y:200}, {
            scrollTrigger:".about-basic-level__basic-diogram",
            opacity:1, y:0,
            delay:0.25,
        });
    }







    //Анимация для "Наши парнеры"
    gsap.fromTo("#wrd1",{scale:0.0001}, {
        scrollTrigger:"#wrd1",
        scale:1,
        duration: 0.3,
        delay:0.15,
    });
    gsap.fromTo("#wrd2",{scale:0.0001}, {
        scrollTrigger:"#wrd2",
        scale:1,
        duration: 0.3,
        delay:0.25,
    });
    gsap.fromTo("#wrd3",{scale:0.0001}, {
        scrollTrigger:"#wrd3",
        scale:1,
        duration: 0.3,
        delay:0.35,
    });
    gsap.fromTo("#wrd4",{scale:0.0001}, {
        scrollTrigger:"#wrd4",
        scale:1,
        duration: 0.3,
        delay:0.45,
    });
    gsap.fromTo("#wrd5",{scale:0.0001}, {
        scrollTrigger:"#wrd5",
        scale:1,
        duration: 0.3,
        delay:0.55,
    });
    gsap.fromTo("#wrd6",{scale:0.0001}, {
        scrollTrigger:"#wrd6",
        scale:1,
        duration: 0.3,
        delay:0.65,
    });
    gsap.fromTo("#wrd7",{scale:0.0001}, {
        scrollTrigger:"#wrd7",
        scale:1,
        duration: 0.3,
        delay:0.75,
    });

    //Анимация для треугольников
    gsap.fromTo(".tr1 > svg",{scale:0.0001}, {
        scrollTrigger:".tr1",
        scale:1,
        duration: 0.1,
        delay:0.05,
    });
    gsap.fromTo(".tr2 > svg",{scale:0.0001}, {
        scrollTrigger:".tr2",
        scale:1,
        duration: 0.1,
        delay:0.15,
    });
    gsap.fromTo(".tr3 > svg",{scale:0.0001}, {
        scrollTrigger:".tr3",
        scale:1,
        duration: 0.1,
        delay:0.25,
    });
    gsap.fromTo(".tr4 > svg",{scale:0.0001}, {
        scrollTrigger:".tr4",
        scale:1,
        duration: 0.1,
        delay:0.35,
    });
    gsap.fromTo(".tr5 > svg",{scale:0.0001}, {
        scrollTrigger:".tr5",
        scale:1,
        duration: 0.1,
        delay:0.45,
    });
    gsap.fromTo(".tr6 > svg",{scale:0.0001}, {
        scrollTrigger:".tr6",
        scale:1,
        duration: 0.1,
        delay:0.55,
    });


    //Анимация клика на треугольник

    let triangles = gsap.utils.toArray('.trr > svg')

    triangles.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                rotation:360,
                duration:2,
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                rotation:0,
                duration:2,
            });
        });
    })



    // $(function(){
    //     $("#test1").on('click', function(){
    //         TweenMax.to('#test', 1, {
    //             startAt:{
    //                 rotation:0
    //             },
    //             rotation:360
    //         })
    //     });
    // });


    //Анимация hover для кружочков IT-компаний
    let images = gsap.utils.toArray(".wrd");

    images.forEach((image, i) => {
        image.addEventListener("mouseenter", () => {
            gsap.to(image, {
                scale: 1.2,
                duration: 0.1
            });
        });
        image.addEventListener("mouseleave", () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.1
            });
        })
    });




    let peng = gsap.utils.toArray('.peng')

    peng.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                backgroundPositionX:40,
                duration: 1
            });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item,  {
                backgroundPositionX:80,
                duration: 1
            });
        })
    })
}

// if (ScrollTrigger.isTouch !== 1) {








// }


var btn3 = document.querySelector('.svg__to__top');
var hiddenElement3 = document.querySelector('.header-preview-wrapper')

btn3.addEventListener('click', handleButtonClick3);
function handleButtonClick3() {
    hiddenElement3.scrollIntoView({block: "center", behavior: "smooth"});
}


const hdn = document.querySelector('.about-basic-level');




function handleButtonClick1() {
    var panel = document.querySelector(".about-basic-level");
    PanelSnapInstance.snapToPanel(panel);
}



function scrollToNext(){
    var hiddenElement3 = document.querySelector('.about-basic-level')
    // btn2.addEventListener('click', handleButtonClick2);
    hiddenElement3.scrollIntoView({block: "center", behavior: "smooth"});
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



$(function() {
    $('.marquee').marquee({
        duration: 5000,
        startVisible: true,
        duplicated: true
    });
});