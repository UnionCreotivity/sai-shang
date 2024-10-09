window.onload = function () {
    var window_width = window.screen.width;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    function menuClick() {
        let menu_btn = document.querySelector('.open-menu');
        let menu_box = document.querySelector('.menu-box');
        let menu_close = document.querySelector('.close-menu');
        var menu_tl = gsap.timeline({
            paused: true
        });
        var menu_close_tl = gsap.timeline({

        });

        menu_tl.
            to(menu_box,
                {
                    duration: 1,
                    opacity: 1,
                    zIndex: 300,
                    height: '100vh',
                    ease: "power1.inOut"
                }
            ).to(menu_close, { duration: 1, opacity: 1, zIndex: 30, }, '<0.1')
            .to(menu_btn, { duration: 1, opacity: 0, zIndex: 28, }, '<')

        menu_btn.addEventListener('click', () => {
            menu_tl.play(0);
            $('body').css('overflow', 'hidden');
        });

        menu_close.addEventListener('click', () => {
            $('body').css('overflow', 'visible');
            menu_close_tl

                .to(menu_box,
                    {
                        duration: 1,
                        opacity: 0,
                        zIndex: 0,
                        height: '0vh',
                        ease: "power1.inOut"
                    })
                .to(menu_close, { duration: 1, opacity: 0, zIndex: 28, }, '<0.1')
                .to(menu_btn, { duration: 1, opacity: 1, zIndex: 30, }, '<')
        });
    };
    menuClick();

    const bannerSwiper = new Swiper(".banner-swiper", {
        loop: true,
        speed: 1500,
        effect: 'fade',

        fadeEffect: {
            crossFade: true,
        },

    });

    const productSwiper = new Swiper(".product-swiper", {
        loop: true,
        speed: 1500,
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: '.c3-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1025: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },

        navigation: {
            nextEl: ".product-swiper-next",
            prevEl: ".product-swiper-prev",
        },
    });

    function newsTitleOverflow() {
        const titles = document.querySelectorAll('.overflow-text');
        const maxLength = 19;

        titles.forEach(title => {
            const originalText = title.innerText;

            if (originalText.length > maxLength) {
                const truncatedText = originalText.substring(0, maxLength) + '...';
                title.innerText = truncatedText;
            }
        });
    }
    newsTitleOverflow();

};
