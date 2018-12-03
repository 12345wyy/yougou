var login = (function () {
    return {
        init: function () {
            this.$inputAll = document.querySelectorAll("input");
            this.$form = document.querySelector("form");
            this.$pAll = this.$form.querySelectorAll("p");
            this.$checkbox = this.$form.checkbox;
            this.$submit = this.$form.submit;
            this.event();
        },
        event: function () {
            var _this = this;
            for (let i = 0; i < this.$inputAll.length; i++) {
                this.$inputAll[i].onblur = function () {
                    if (this.value == "") {
                        var $p = this.nextElementSibling;
                        $p.innerHTML = "内容不能为空";
                        this.focus();

                    } else {
                        if (this.name == "phone") {
                            var $p = this.nextElementSibling;
                            var reg = /^1[35789]\d{9}$/;
                            if (reg.test(this.value)) {
                                // $p.innerHTML = "符合要求";
                                sendAjax("../php/login.php", {
                                    data: {
                                        method: "GET",
                                        phone: this.value,
                                    },
                                    success: function (res) {
                                        res = JSON.parse(res);
                                        console.log(res);
                                        if (res.code[0] == 0) {
                                            $p.innerHTML = "正确";
                                        } else {
                                            $p.innerHTML = "用户名已被注册";
                                            _this.$submit.disabled = true;

                                        }
                                    }
                                })
                            }
                            else {
                                $p.innerHTML = "不符合要求";
                            }

                        }
                        if (this.name == "code") {
                            var $p = this.nextElementSibling;
                            var reg = /^\d{4}$/;
                            if (reg.test(this.value)) {
                                $p.innerHTML = "正确";
                            }
                            else {
                                $p.innerHTML = "不符合要求";
                            }
                        }
                        if (this.name == "password") {
                            var $p = this.nextElementSibling;
                            var reg = /^\w{6,11}$/;
                            if (reg.test(this.value)) {
                                $p.innerHTML = "正确";
                            }
                            else {
                                $p.innerHTML = "不符合要求";
                            }
                        }
                        if (this.name == "repassword") {
                            var $p = this.nextElementSibling;
                            if (this.previousElementSibling.previousElementSibling.value == this.value) {
                                $p.innerHTML = "正确";
                            }
                            else {
                                $p.innerHTML = "不符合要求";
                            }
                        }
                    }
                }
            }
            this.$checkbox.onclick = function () {
                for (var i = 0; i < _this.$pAll.length; i++) {
                    if (_this.$pAll[i].innerHTML != "正确") {
                        _this.$pAll[i].previousElementSibling.focus()
                        _this.$submit.disabled = true;
                    }
                    else if (_this.$pAll[i].innerHTML == "正确") {
                        _this.$submit.disabled = false;
                        _this.$submit.onclick = function () {
                            sendAjax("../php/login1.php", {
                                date: {
                                    method: "post",
                                },

                            })
                        }
                    }
                }
            }
        },
    }
}())
