/**
 * LBS timeLeft
 * Date: 2012-04-20
 * ================================================
 * opts.el 放置倒计时的容器对象(也是获取剩余毫秒值的对象)
 * opts.mode 倒计时的类型 (默认3)
 1 天时分秒 (01天20时30分15秒)
 2 天时分 (01天20时30分)
 3 时分秒 (20时30分15秒)
 4 时分秒 带标签 (<span>20</span>时<span>30</span>分<span>15</span>秒)
 5 时分秒 时分秒用冒号表示 (23:59:59)
 6 时分秒 时分秒用冒号表示 带标签 (<span>23</span>:<span>59</span>:<span>59</span>)
 * ================================================
 opts.than24为true时  3 ==> (156时30分15秒)
 opts.than24为true时  4 ==> (<span>156</span>时<span>30</span>分<span>15</span>秒)
 opts.than24为true时  5 ==> (156:30:15)
 opts.than24为true时  6 ==> (<span>156</span>:<span>30</span>:<span>15</span>)
 * opts.tag 当opts.mode为4、6时 自定义的标签(默认 span )
 * opts.than24 时是否显示为超过24的值 opts.mode值为3456时有效
 * opts.after 倒计时完成后执行的回调函数
 * ================================================
 **/
function timeLeft(opts, fn) {
    opts = opts || {};
    var o = typeof opts.el == 'string' ? document.getElementById(opts.el) : opts.el;
    if (!o) return;
    var millisecond = parseInt(o.innerHTML);
    if (isNaN(millisecond)) return;
    var leftTime = parseInt(millisecond);
    if (leftTime <= 0) {
        opts.after && opts.after(o);
        return;
    }
    leftTime /= 1000;
    var date = {},
        mode = opts.mode || 3,
        than24 = opts.than24 || true,
        tag = opts.tag || 'span',
        setDigi = function(n) {
            return n < 10 ? '0' + n : n;
        },
        getDate = function(leftTime) {
            date.days = parseInt(leftTime / 24 / 3600);
            date.hours = parseInt((leftTime / 3600) % 24);
            date.minutes = parseInt((leftTime / 60) % 60);
            date.seconds = parseInt(leftTime % 60);
            data.millisecond = parseInt(leftTime);
            (mode > 2 && than24) && (date.hours = parseInt(leftTime / 3600));
            switch (mode) {
                case 1: //天时分秒
                    o.innerHTML = setDigi(date.days) + '天' + setDigi(date.hours) + '时' + setDigi(date.minutes) + '分' + setDigi(date.seconds) + '秒';
                    break;
                case 2: //天时分
                    o.innerHTML = setDigi(date.days) + '天' + setDigi(date.hours) + '时' + setDigi(date.minutes) + '分';
                    break;
                case 3: //时分秒
                    o.innerHTML = setDigi(date.hours) + '时' + setDigi(date.minutes) + '分' + setDigi(date.seconds) + '秒';
                    break;
                case 4: //时分秒 带标签
                    o.innerHTML = '<'+tag+'>' + setDigi(date.hours) + '</'+tag+'>时<'+tag+'>' + setDigi(date.minutes) + '</'+tag+'>分<'+tag+'>' + setDigi(date.seconds) + '</'+tag+'>秒';
                    break;
                case 5: //时分秒 用冒号表示
                    o.innerHTML = setDigi(date.hours) + ':' + setDigi(date.minutes) + ':' + setDigi(date.seconds);
                    break;
                case 6: //时分秒 用冒号表示 带标签
                    o.innerHTML = '<'+tag+'>' + setDigi(date.hours) + '</'+tag+'>:<'+tag+'>' + setDigi(date.minutes) + '</'+tag+'>:<'+tag+'>' + setDigi(date.seconds) + '</'+tag+'>';
                    break;
                case 7 : //分秒毫秒 用冒号表示
                    o.innerHTML = setDigi(date.minutes) + ':' + setDigi(date.seconds) + ':' + setDigi(millisecond);
            }
        };
    !function start() {
        getDate(leftTime);
        if (leftTime <= 0) {
            opts.after && opts.after(o);
            return;
        }
        leftTime--;
        setTimeout(start, 1000);
    }();
}