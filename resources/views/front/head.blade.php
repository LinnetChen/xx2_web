<script>
    if (document.documentMode) {
        alert('建議使用Edge或者Chrome瀏覽器進行瀏覽')
    }
</script>

<!DOCTYPE html>
<html lang="zh-TW" class="html">

<head>
    <meta charset="UTF-8">

    {{-- 網頁標題 --}}
    @yield('title')

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="Digeam 掘夢網,線上遊戲,免費遊戲,3D">
    <meta property="og:type" content="website">
    <meta property="og:url" content="">{{-- 官網連結 --}}
    <meta property="og:title" content="">
    <meta property="article:author" content="https://www.facebook.com">

    {{-- 連結縮圖 --}}
    @yield('thumbnail')

    <link rel="icon" href="/img/event/prereg/favicon.ico" sizes="16x16">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/event/homepage/indexStyle.css">
    <link rel="stylesheet" href="/css/event/homepage/pop.css">

    {{-- 分頁專用CSS --}}
    @yield('otherCss')

</head>

<body>
    <div class="wrap">
        <header class="logo"><img src="/img/event/homepage/LOGO.png"></header>
        <div class="navBox">
            @yield('backHome')
            <nav>
                <ul class="menuBox">
                    <li class="menu menu1" data-menuaction="menu1_open">
                        <a href="">遊戲公告</a>
                        <ul class="menu1_open">
                            <li><a href="">最新消息</a></li>
                            <li><a href="">活動情報</a></li>
                            <li><a href="">系統公告</a></li>
                        </ul>
                    </li>
                    <li class="menu menu2"><a href="">遊戲百科</a></li>
                    <li class="menu menu3" data-menuaction="menu3_open">
                        <a href="">玩家社群</a>
                        <ul class="menu3_open">
                            <li><a href="">FB粉絲團</a></li>
                            <li><a href="">Discord</a></li>
                        </ul>
                    </li>
                    {{-- <li class="menu menu4"><a href="">排行榜</a></li> --}}
                    <li class="menu menu5"><a href="">下載專區</a></li>
                    <li class="menu menu6" data-menuaction="menu6_open">
                        <a href="">會員中心</a>
                        <ul class="menu6_open">
                            <li><a href="">註冊會員</a></li>
                            <li><a href="">停權名單</a></li>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">遊戲規章</a></li>
                            <li><a href="">聯繫客服</a></li>
                            <li><a href="">領獎專區</a></li>
                        </ul>
                    </li>
                    <li class="menu menu7 "><a href="">儲值中心</a></li>
                </ul>
            </nav>
            <nav class="iconBox">
                <ul>
                    <li><a href="#"><img src="/img/event/homepage/social_icon_yt.png"></a></li>
                    <li><a href="#"><img src="/img/event/homepage/social_icon_dc.png"></a></li>
                    <li><a href="#"><img src="/img/event/homepage/social_icon_fb.png"></a></li>
                </ul>
            </nav>
        </div>

        <div class="mask" id="pop1">
            <div class="popBG">
                <button onclick="_close()" class="popX">X</button>
                <div class="popBox">
                    <div class="popTitle">技能介紹</div>
                    <div class="popContainer">
                        {{-- <div class="title">
                            <img src="/img/event/homepage/skill_icon/char_skill3_1.png">
                            致命投擲
                        </div>
                        <div class="text">蓄勢後向選中目標投擲一把飛斧，造成致命的打擊。飛斧有60%的機率對目標造成割裂效果，使其受到的傷害提高5%，並每秒損失一定生命值，持續5秒</div>
                        <div class="line"></div> --}}
                    </div>
                </div>
            </div>
        </div>

        <div class="section1">
            <div class="sectionBG">
                @yield('section1Container')
            </div>
        </div>

        @yield('section2')
        @yield('section3')
        @yield('sectionPage')

        <footer class="footer">
            <div class="footerBox">
                <div class="footerbox_logo">
                    <img class="digeamlogo" src="/img/event/homepage/footer/digeam_logo.webp">
                    <img class="giantlogo" src="/img/event/homepage/footer/GIANT_logo.webp">
                </div>
                <div class="copyright">
                    <a href="https://www.digeam.com/terms">會員服務條款</a>
                    <a href="https://www.digeam.com/terms2">隱私條款</a>
                    <p>掘夢網股份有限公司©2023<br>Copyright©DiGeam Corporation.<br>All Rights Reserved.</p>
                </div>
                <div class="plus">
                    <img class="plus15" src="/img/event/homepage/footer/15plus.webp">
                    <p>本遊戲為免費使用，部分內容涉及暴力情節。<br>
                        遊戲內另提供購買虛擬遊戲幣、物品等付費服務。<br>
                        請注意遊戲時間，避免沉迷。​<br>
                        <span class="blue">本遊戲服務區域包含台灣、香港、澳門。</span>
                    </p>
                </div>
            </div>
        </footer>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="/js/event/homepage/view.js"></script>
    <script src="/js/event/homepage/main.js"></script>
    @yield('script')

</body>

</html>