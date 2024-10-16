window.onload = function () {
    var window_width = window.screen.width;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let loadingScreen = document.querySelector(".loading-screen");
    let loadingText = document.getElementById("loading-text");
    let percent = 1;

    function updateProgress() {

        loadingText.textContent = percent + "%";
        percent++;
        if (percent <= 100) {
            setTimeout(updateProgress, 5);
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

    function clickMenu() {
        // 隱藏所有的子目錄，並重設所有文字顏色
        const sortStacks = document.querySelectorAll('.sort-stack');
        const sortTitles = document.querySelectorAll('.sort-title');
        const sortTexts = document.querySelectorAll('.sort-title .text');

        sortStacks.forEach(stack => stack.style.display = 'none');
        sortTexts.forEach(text => text.style.color = '#ad8e5c'); // 設定預設顏色

        // 預設第一個 .sort-title 展開並加上 sort-active
        const firstSortContainer = sortTitles[0].closest('.sort');
        const firstTextElement = firstSortContainer.querySelector('.text');

        firstTextElement.style.color = '#3b3b3b'; // 改變第一個文字顏色
        firstSortContainer.classList.add('sort-active'); // 加上 sort-active class

        // 監聽每個 .sort-title 的點擊事件
        sortTitles.forEach(title => {
            title.addEventListener('click', function () {
                // 使用 closest() 確保你選擇到正確的 .sort 元素，並從中查找 .sort-stack
                const sortContainer = this.closest('.sort');
                const sortStack = sortContainer.querySelector('.sort-stack');
                const textElement = sortContainer.querySelector('.text'); // 找到對應的 .text 元素

                // 隱藏所有子目錄並重設顏色
                sortStacks.forEach(stack => stack.style.display = 'none');
                sortTexts.forEach(text => text.style.color = '#ad8e5c');
                document.querySelectorAll('.sort').forEach(sort => sort.classList.remove('sort-active'));

                // 檢查是否有子目錄
                if (sortStack) {
                    const isHidden = sortStack.style.display === 'none' || sortStack.style.display === '';

                    // 顯示或隱藏子目錄，並變更文字顏色
                    sortStack.style.display = isHidden ? 'flex' : 'none';
                    textElement.style.color = isHidden ? '#3b3b3b' : '#ad8e5c';

                    // 加上或移除 sort-active class
                    if (isHidden) {
                        sortContainer.classList.add('sort-active');
                    }
                } else {
                    // 沒有子目錄時，變更文字顏色並加上 sort-active
                    textElement.style.color = '#3b3b3b'; // 點擊時變色
                    sortContainer.classList.add('sort-active');
                }
            });
        });
    }
    clickMenu();

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

};
