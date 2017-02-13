/**
 * @type 公用逻辑
 */

var ip = "http://www.23jiameng.com:8082/dotda_duobao/";

//方便pc测试，使用CLICK
var UA = window.navigator.userAgent;
var CLICK = 'click';
if(/ipad|iphone|android/.test(UA)){
    CLICK = 'tap';
}

//全局返回上一层
$(".buy-shop-header a")[CLICK](function () {
    history.go(-1)
});
$(".header-main a")[CLICK](function () {
    history.go(-1)
});

/**
 * @name:获取参数
 * @方法：getQueryStrin（name）
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 毫秒倒计时
 * 需要引入jq或zepto
 * @num：传入秒
 * @cls:输出的class/ID
 * @config:设置配置文件
 **/
function Timer(num) {
    var time = null;
    var total = Number(num) * 100;

    //两位数补零
    function toDou(n) {
        if(n < 10){
            return '0' + n;
        }else{
            return '' + n;
        }
    };
    time = setInterval(function () {
        total--;
        var time_ls = $(config.COUNT_CLS);
        if(total == 0){
            time_ls.html(config.COUNT_DOWN);
            clearInterval(time);
        }else{
            //获取分钟
            var minute = parseInt((total / 100 / 60) % 60);

            //获取秒
            var second = parseInt((total / 100 ) % 60);

            //获取毫秒
            var millisecond  =  total -(minute * 60 * 100) - (second * 100);
            time_ls.html(toDou(minute) + ":" + toDou(second) + ":" + toDou(millisecond) );
        }
    },10)
}
/**
 * 购物车弹出层
 * @gid：商品id
 * @qishu：商品期数
 **/
function MaskLower(gid,qishu) {
    var payshop = $(".w-pay-shop");
    var setclose = $(".w-pay-btn");
    var setleftbtn = $(".operation-subtract");
    var setright = $(".operation-add");
    var setinput = $(".operation-input");
    var settotal = $(".total-lang");
    var setpaynum = $(".participate-ul");
    var setpopup = $(".w-popup");
    var setwpaylist = $(".w-pay-list");

    console.log(gid,qishu);
    /**
     **  @w-amin-close:关闭动画/translate3d(0px, 100%, 0px)
     **  @w-amin-open:开启动画/translate3d(0px, 0px, 0px)
     **/

    //初始弹窗
    payshop.removeAttr("style");
    payshop.addClass("w-amin-open");
    $(".w-mask-lower").addClass("w-amin-open");
    $(".w-mask-lower").removeAttr("style");
    //关闭弹窗
    setclose[CLICK](function () {
        payshop.addClass("w-amin-close");
        $(".w-mask-lower").addClass("w-amin-close");
        $(".w-mask-lower").removeClass("w-amin-open");
        // payshop.replaceWith();
        payshop.removeClass("w-amin-open");
        payshop.addClass("w-amin-close");
    });

    //键盘输入
    setinput.focus(function () {
        payshop.css({top:0});
    });
    setinput.blur(function () {
        setinput.val($(this).val());
        settotal.html($(this).val());
        payshop.removeAttr("style");
    });

    //初始人次增加
    setright[CLICK](function () {

        //假设不能超过上线50
        if(Number(setinput.val()) < 50){
            setinput.val(Number(setinput.val()) + 1);
            $(".total-lang").html(setinput.val());
        }else{
            return false
        }
    });

    //减少人次
    setleftbtn[CLICK](function () {
        //最小不得小于1
        if(Number(setinput.val()) > 1){
            setinput.val(Number(setinput.val()) - 1);
            $(".total-lang").html(setinput.val());
        }else {
            return false
        }
    });

    //选择商品人次
    var li = setpaynum.children("li");
    $.each(li,function(){
        $(this)[CLICK](function () {
            setinput.val(this.innerHTML);
            $(".total-lang").html(Number(this.innerHTML) * 10);
        })
    });

    //立即购买
    $(".w-total-btn")[CLICK](function () {
        payshop.removeClass("w-amin-open");
        payshop.addClass("w-amin-close");
        setpopup.removeAttr("style");
        setpopup.addClass("w-amin-open");
        payshop.removeAttr("style");
    });

    //关闭立即购买
    $(".popup-colse")[CLICK](function () {
        setpopup.addClass("w-amin-close");
        setpopup.removeClass("w-amin-open");
        payshop.removeClass("w-amin-close");
        // payshop.addClass("w-amin-open");
    });

    //选择支付方式
    $(".w-harArr")[CLICK](function () {
        setpopup.removeClass("w-amin-open");
        setpopup.addClass("w-amin-close");
        setwpaylist.removeAttr("style");
        setwpaylist.addClass("w-amin-open");
    });
    var list = $(".w-pay-list-box li");
    $.each(list,function () {
        $(this)[CLICK](function () {
            $(".popup-text").html($(this).find("h3").html()+ '<i class="icon-bg"></i>');
            amin(setwpaylist,setpopup)
        })
    });

    //返回上一层
    $(".w-pay-down")[CLICK](function () {
        amin(setwpaylist,setpopup)
    })

    //切换动画
    function amin(ols,open) {
        ols.removeClass("w-amin-open");
        ols.addClass("w-amin-close");
        open.removeClass("w-amin-close");
        open.addClass("w-amin-open");
    }
}