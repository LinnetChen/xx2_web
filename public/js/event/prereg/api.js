let _api = "/api/prereg";
let _CheckLogin = $(".login_user_id").data("val");
if (_CheckLogin != "null") {
    _user = _CheckLogin;
} else {
    _user = null;
}

// 設定防連點

// 登出
function logout_dg() {
    $("#logout-form").submit();
}
login();
function login() {
    $.post(
        _api,
        {
            type: "login",
            user: _user,
        },
        function (res) {
            if (res.status == -99) {
                console.log("未登入");
                $(".visit_frequency").html(0);
                $('.p4Gobtn').hide();
                $(".distance_30").html(0);
            } else {
                if (res.user_mobile != "" && res.user_mobile != null) {
                    _pre= true;
                } else {
                    _pre = false;
                }
                if (res.keep_celebrity == null) {
                    $(".visit_frequency").html(res.visit_frequency);
                    $(".visit_frequency").attr("data-val", res.visit_frequency);
                    $(".distance_30").html(res.distance_30);
                    $(".distance_30").attr("data-val", res.distance_30);
                } else {
                    $(".check_p3").hide();
                    $(".p4Gobtn").hide();
                    $(".distance_area").hide();
                    $(".p3_chance").hide();
                }
                $(".total_correct").html(res.race_correct);
                $(".total_guess").html(res.race_total_answer);
                if (res.celebrity != null) {
                    p3cardinfo(res.celebrity[0], res.celebrity[1]);
                    setTimeout($(".choosenew").click(), $(".popS").hide(), 2);
                }else{
                $('.p4Gobtn').hide();
                }

                if (res.daily_login != null) {
                    $(".daily_login").css({
                        "background-image": "url(/img/event/prereg/p3/done_btn.png)"
                    });
                }

                if (res.daily_FB != null) {
                    $(".daily_FB").css({
                        "background-image": "url(/img/event/prereg/p3/done_btn.png)"
                    });
                }

                if (res.fb_fans_click != null) {
                    $(".fb_fans_click").css({
                        "background-image": "url(/img/event/prereg/p3/done_btn.png)"
                    });
                }
            }
        }
    );
}

$(".check_p2").on("click", function () {
    var _agree = $("#checkbox").prop("checked");
    var _phone = checkMobile();
    var _send = true;
    console.log(_user);
    if (_user == null) {
        p2_not_login();
        $(".popS").fadeIn(200);
        var _send = false;
        exit;
    }
    if (_agree == false) {
        p2_pre_safe_error();
        $(".popS").fadeIn(200);
        var _send = false;
        exit;
    }
    if (_phone == -99) {
        p2_number_error();
        $(".popS").fadeIn(200);
        var _send = false;
        exit;
    }
    if (_send == true) {
        $.post(
            _api,
            {
                type: "mobile_login",
                user: _user,
                phone: _phone,
            },
            function (res) {
                if (res.status == -99) {
                    p2_already_pre();
                    $(".popS").fadeIn(200);
                } else if (res.status == -98) {
                    p2_mobile_already_use();
                    $(".popS").fadeIn(200);
                } else {
                    p2_success();
                    $(".popS").fadeIn(200);
                    fbq('track', 'AddToWishlist');
                }
            }
        );
    }
});
//電話號碼檢查
function checkMobile() {
    var _phone = $(".mobile").val();
    var _area = $(".mobile_area").val();
    // 台灣號碼為9碼
    if (_area == "+886") {
        if (_phone.length == 9 && !isNaN(_phone)) {
            return _area + _phone;
        } else if (_phone.length == 10 && !isNaN(_phone)) {
            // 有可能輸入09開頭,判斷第一碼是否為0
            if (_phone.substring(0, 1) != 0) {
                return -99;
            } else {
                // 整理號碼,回傳0以外後9碼
                return _area + _phone.substring(1, 10);
            }
        } else {
            return -99;
        }
        // 香港澳門號碼為8碼
    } else if (_area == "+852" || _area == "+853") {
        if (_phone.length == 8 && !isNaN(_phone)) {
            return _area + _phone;
        } else {
            return -99;
        }
    } else {
        return -99;
    }
}
var p3_send = true;
// 結交名士
$(".check_p3").on("click", function () {
    let _chance = $(".visit_frequency").data("val");
    if (_user == null) {
        p2_not_login();
        $(".popS").fadeIn(200);
        var _send = false;
        exit;
    }
    if (_chance == 0) {
        p3_error_not_enough();
        $(".popS").fadeIn(200);
        var _send = false;
        exit;
    }
    if (p3_send == true) {
        p3_send = false
        $.post(
            _api,
            {
                type: "play_lottery",
                user: _user,
            },
            function (res) {
                setTimeout(() => {
                    p3_send = true
                  }, "1000");
                if (res.status == 1) {
                    $(".p3resultpop").fadeIn(200);
                    $(".result_new").hover(
                        function () {
                            $(".newinfo").css({ display: "block" });
                        },
                        function () {
                            $(".newinfo").css({ display: "none" });
                        }
                    );
                    $(".result_now").hover(
                        function () {
                            $(".nowinfo").css({ display: "block" });
                        },
                        function () {
                            $(".nowinfo").css({ display: "none" });
                        }
                    );
                    $(".result_new").attr("data-color", res.color);
                    $(".result_new").attr("data-rand", res.rand);
                    p3cardinfo(res.color, res.rand);
                }
            }
        );
    }
});

// 名士選擇
// $(".choosenew").on("click", function () {
//     $(".cardinfo").show();
//     p3_replace();
//     $(".popS").fadeIn(200);
// });
$(".keepnow").on("click", function () {
    var _origin_visit_frequency = $(".visit_frequency").attr("data-val");
    var _origin_distance_30 = $(".distance_30").attr("data-val");
    var _new_visit_frequency = _origin_visit_frequency - 1;
    var _new_distance_30 = parseInt(_origin_distance_30) + 1;
    if (_new_visit_frequency == 0 || _new_visit_frequency < 0) {
        location.reload();
    } else {
        $(".visit_frequency").attr("data-val", _new_visit_frequency);
        $(".visit_frequency").html(_new_visit_frequency);
        $(".distance_30").attr("data-val", _new_distance_30);
        $(".distance_30").html(_new_distance_30);
    }
});
_send = true;
$(".choosenew").on("click", function () {
    let _color = $(".result_new").attr("data-color");
    let _rand = $(".result_new").attr("data-rand");

    if (_color || _rand) {
        if (_send == true) {
            _send = false;
            setTimeout((_send = true), 2);
            $.post(
                _api,
                {
                    type: "play_choose",
                    user: _user,
                    color: _color,
                    rand: _rand,
                },
                function (res) {
                    if (res.status == 1) {
                        $(".p3resultpop").fadeOut(200);
                        location.reload();
                    }
                }
            );
        }
    }
});

// 任務佈告
$(".missionbtn").on("click", function () {
    let _type = $(this).attr("data-val");
    let _send = true;
    if (_send == true) {
        $.post(
            _api,
            {
                type: "mission",
                user: _user,
                mission_type: _type,
            },
            function (res) {
                if (res.status == -99) {
                    p3_already_get();
                    $(".popS").fadeIn(200);
                } else if (res.status == -98) {
                    p3_please_pre();
                    $(".popS").fadeIn(200);
                } else {
                    let _finish = document.getElementsByClassName(_type);
                    $(_finish).css({
                        "background-image": "url(/img/event/prereg/p3/done_btn.png)"
                    });
                    p3_success();
                    $(".popS").fadeIn(200);
                    login();
                }
            }
        );
    }
});
//與他結義
$(".p4Gobtn").on("click", function () {
    p3_last();
    $(".yes").attr("data-val", "play_keep");
    $(".popS").fadeIn(200);
});

$(".yes").on("click", function () {
    let _type = $(this).attr("data-val");
    $.post(
        _api,
        {
            type: _type,
            user: _user,
        },
        function (res) {
            if (res.status == 1) {
                p3_last_success();
                $(".yes").hide();
                $(".no").hide();
                $(".popS").fadeIn(200);
                if (_type == "play_keep") {
                    $(".popScheckBtn").on("click", function () {
                        login();
                    });
                }
            }else{
                p3_not_get()
                $(".yes").hide();
                $(".no").hide();
                $(".popS").fadeIn(200);
            }
        }
    );
});
$(".no").on("click", function () {
    $(".popS").fadeOut(200);
});

$(".distance_area").on("click", function () {
    var _distance_30 = $(".distance_30").attr("data-val");
    if (_distance_30 >= 30) {
        p3_choose_open();
        $(".p3choosepop").fadeIn(200);
        p3choose();
    }
});
$(".p3choosebtn").on("click", function () {
    $(".popStitle").html("是否要選擇這位名士取代原先保留的名士?");
    $(".popSText")
        .html(
            "※請注意，本次選擇將會放棄原先保留之獎勵，是否要以這位名士取代原本結果?​"
        )
        .css({
            fontSize: "1.3rem",
        });
    if (screen.width <= 425) {
        $(".popSText").css({
            fontSize: "1rem",
        });
    }
    $(".popScheckBtn").hide();
    $(".popScheckBtn2").hide();
    $(".popScheckBtn3").hide();
    $(".popScheckBtn4").show();
    $(".popS").fadeIn(200);

    _30_send = true;
    $(".yes_30").on("click", function () {
        let _choose = $(".choose").attr("data-val");
        let _color = $(".choose").attr("data-color");
        if (_choose == "") {
            alert("請先選擇名士");
        } else {
            if (_30_send == true) {
                _30_send = false;
                $.post(
                    _api,
                    {
                        type: "play_choose_30",
                        user: _user,
                        color: _color,
                        rand: _choose,
                    },
                    function (res) {
                        if (res.status == 1) {
                            location.reload();
                        } else {
                            p3_error_not_enough();
                            $(".popS").fadeIn(200);
                        }
                    }
                );
            }
        }
    });
});

var _panda_send = true
//p4熊貓競猜支持
$(".pandaGobtn").on("click", function () {
    if (_user == null) {
        p2_not_login();
        $(".popS").fadeIn(200);
    } else if (_pre == false) {
        p3_please_pre();
        $(".popS").fadeIn(200);
    }else {
        $(".popS").fadeIn(200);
        if (p4_panda_choose_num == 1) {
            p4_support_panda1();
        } else if (p4_panda_choose_num == 2) {
            p4_support_panda2();
        } else if (p4_panda_choose_num == 3) {
            p4_support_panda3();
        }
        $(".yes").off("click");
        $(".yes").on("click", function () {
            if(_panda_send == true){
                p4pandaresult(p4_panda_choose_num);
                _panda_send = false
            }
            setTimeout(function () {
                _panda_send = true;
            }, 1000);
        });
    }
});

//p4"熊貓賽跑"結果
function p4pandaresult(user_guess) {
    var i = Math.floor(Math.random() * 3) + 1;
    $.post(
        _api,
        {
            type: "play_panda",
            user: _user,
            user_guess: user_guess,
            answer: i,
        },
        function (res) {
            if (res.status == -99) {
                p4_today_done();
                $(".popS").fadeIn(200);
            } else {
                $(".popS").fadeOut(200);
                if (i == 1) {
                    $(".panda1win").show();
                    $(".panda2win").hide();
                    $(".panda3win").hide();
                    $(".pandavideo").trigger("play");
                    $(".p4resultpop").fadeIn(200);
                    setTimeout(function () {
                        p4_panda1_win();
                    }, 7000);
                } else if (i == 2) {
                    $(".panda2win").show();
                    $(".panda1win").hide();
                    $(".panda3win").hide();
                    $(".pandavideo").trigger("play");
                    $(".p4resultpop").fadeIn(200);
                    setTimeout(function () {
                        p4_panda2_win();
                    }, 7000);
                } else if (i == 3) {
                    $(".panda3win").show();
                    $(".panda2win").hide();
                    $(".panda1win").hide();
                    $(".pandavideo").trigger("play");
                    $(".p4resultpop").fadeIn(200);
                    setTimeout(function () {
                        p4_panda3_win();
                    }, 7000);
                }
                $('.popScheckBtn').on('click',function(){
                    location.reload();
                })
            }
        }
    );
}
