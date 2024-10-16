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

    let loadingScreen = document.querySelector(".loading-screen");
    let loadingText = document.getElementById("loading-text");
    let percent = 1;

    function updateProgress() {

        loadingText.textContent = percent + "%";
        percent++;
        if (percent <= 100) {
            setTimeout(updateProgress, 8);
        } else {

            let tl = gsap.timeline({});
            tl.to(loadingScreen, { duration: 1, opacity: 0, ease: "power1.inOut" })
                .to(loadingScreen, { duration: 1.2, display: 'none', })

        }

    }
    updateProgress();

    $('.top-btn').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 800);
    });
};
