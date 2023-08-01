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
            } else {
                if (res.keep_celebrity == null) {
                    $(".visit_frequency").html(res.visit_frequency);
                    $(".visit_frequency").attr("data-val", res.visit_frequency);
                    $(".distance_30").html(res.distance_30);
                    $(".distance_30").attr("data-val", res.distance_30);
                } else {
                    $('.check_p3').hide()
                    $('.p4Gobtn').hide()
                    $('.distance_area').hide()
                    $('.p3_chance').hide()

                }
                if (res.celebrity != null) {
                    p3cardinfo(res.celebrity[0], res.celebrity[1]);
                    setTimeout($(".choosenew").click(), $(".popS").hide(), 2);
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

// 結交名士
$(".check_p3").on("click", function () {
    let _chance = $(".visit_frequency").data("val");
    var _send = true;
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
    if (_send == true) {
        $.post(
            _api,
            {
                type: "play_lottery",
                user: _user,
            },
            function (res) {
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
$(".choosenew").on("click", function () {
    p3_replace();
    $(".popS").fadeIn(200);
});
$(".popScheckBtn").on("click", function () {
    let _color = $(".result_new").attr("data-color");
    let _rand = $(".result_new").attr("data-rand");
    if (_color || _rand) {
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
                    p3_success();
                    $(".popS").fadeIn(200);
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
                        location.reload();
                    });
                }
            }
        }
    );
});
$(".no").on("click", function () {
    $(".popS").fadeOut(200);
});