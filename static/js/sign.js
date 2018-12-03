var signcheck = (function () {
    return {
        init() {
            this.$form = document.querySelector("form");
            this.$inputAll = this.$form.querySelectorAll("input");
            this.event();
        },
        event() {
            var _this = this;
            for (var i = 0; i < this.$inputAll.length; i++) {
                this.$inputAll[i].onblur = function () {
                    if (this.name == "phone" && this.value != "") {
                        var $p = this.nextElementSibling;
                        var reg = /^1[35789]\d{9}$/;
                        if (reg.test(this.value)) {
                            var this_p = this;
                            $p.innerHTML = "正确";
                            sendAjax("../php/sign.php", {
                                data: {
                                    method: "GET",
                                    phone: this.value,
                                },
                                success: function (res) {
                                    var $p = this_p.nextElementSibling;
                                    var $submit = _this.$form.lastElementChild;
                                    res = JSON.parse(res);
                                    if (res.code == 0) {
                                        $p.innerHTML = "该用户还未注册";
                                        $submit.disabled = "disabled";
                                        console.log($submit)
                                    }
                                    else if (res.code == 10000) {
                                        $p.innerHTML = "正确";
                                        $submit.disabled = "";
                                    }
                                }
                            })
                        }
                        else {
                            $p.innerHTML = "格式错误";
                        }
                    }
                    if (this.name == "password" && this.value != "") {
                        var this_w = this;
                        // console.log(this);
                        var $p = this.nextElementSibling;
                        var reg = /^\w{6,11}$/;
                        if (reg.test(this.value)) {
                            $p.innerHTML = "正确";
                            console.log(this.value)
                            sendAjax("../php/sign1.php", {
                                data: {
                                    method: "GET",
                                    password: this.value,
                                },
                                success: function (res) {
                                    var $p = this_w.nextElementSibling;
                                    var $submit = _this.$form.lastElementChild;
                                    res = res.slice(res.indexOf("{"));
                                    res = JSON.parse(res);
                                    console.log(res.code);
                                    if (res.code == 0) {
                                        $p.innerHTML = "密码输入错误";
                                        $submit.disabled = "disabled";
                                        console.log($submit)
                                    }
                                    else if (res.code == 10000) {
                                        $p.innerHTML = "正确";
                                        $submit.disabled = "";
                                    }
                                }
                            })

                        }
                        else {
                            $p.innerHTML = "不符合要求";
                        }
                    }

                    // var $submit = _this.$form.lastElementChild;
                    // $submit.onclick = function () {


                    // }
                }

            }

        }
    }
}())
