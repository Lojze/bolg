/**
 *
 * @param 配置文件
 * @
 */
var config ={
    //倒计时结束返回
    COUNT_DOWN:'已经倒计时完毕',

    //倒计时位置cls
    COUNT_CLS:'.time_ls'
};
//判断是否登录

//获取代理商编号
var Agentid = null;
//获取城市id
var cityId = null;
(function () {
    //banenr
    $.ajax({
        url: ip + "appslide/findSlideApp",
        type:"post",
        // data:{Agentid:""},
        success:function (data) {
            var slideInfo = data.slideInfo;
            //取前三
            $(data).each([0,3],function (i,j) {
                //取前三
                $(".swiper-slide").replaceWith('<div class="swiper-slide">'+'<a data-id="'+ j.goodsId +'" href="javascript:void(0)">'+'<img src="'+ j.slideimgUrl +'">'+'</a></div>');
            });
            //轮播图
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3500
            });
        },
        error:function () {
            console.warn("访问失败")
        }
    });

    //最新揭晓
    $.ajax({
        url: ip + "winn/findFirstGoodsList",
        type:"post",
        //查询最新商品
        data:{
            pageIndex:"1",
            pageSize:"3",
            condition:"2"
        },
        success:function (data) {
            var html = '';
            var countdown_list = $(".countdown-list");
            if(data.data != null){
                $(data.data).each(function (i,j) {
                    var goodSmimg = j.goodSmimg.split(',')[0];
                    // var countDownTime = 10;

                    //获取原型
                    // console.log(typeof countDownTime);
                    countdown_list.empty();
                    html += '<li><a href="../buy-shop/lottery.html?gid='+ j.goodsId +'&qishu='+ j.goodQishu +'">'+
                            // '<p class="time_ls">'+ countDownTime +'</p>'+
                        '<img src="'+ goodSmimg +'" alt=""></a>';
                        if(Number(j.countDownTime) !== -1){
                            html += '<p>'+ j.goodName +'</p>'+
                                '<span class="time_ls">'+ j.countDownTime +'</span></li>'
                        }else{
                            if(j.winUserName === null){
                                html += '<p>恭喜<em class="blue">神秘用户</em>获得</p>'
                            }else{
                                html += '<p>恭喜<em class="blue">'+ j.winUserName +'</em>获得</p>'
                            }
                        }

                });
                countdown_list.append(html);
                var num = $(".time_ls").html();
                Timer(num);
            }else{
                console.warn("访问失败")
            }
        }
    });
    //商品分类
    /**
    *   默认按照最新查询
     **/
    index_nav("6");
    var startId = 1;
    var content_nav = $(".content-nav");
    $(".content-nav-list", content_nav).each(function () {
        var canlast = $(".content-nav-list").last();
        var _this = $(this);
        _this[CLICK](function () {
            var thiss = $(this);
            if(thiss.data("title") == 9 ){
                canlast.data("title","8");
            }else{
                canlast.data("title","9");
            }
            content_nav.find("li").removeClass("active");
            thiss.addClass("active");
            startId = 1;
            //获取排序序列
            var btnNum = thiss.data("title");
            $(".content-box-ul").data("id",btnNum);
            //切换第一页位置
            index_nav(btnNum);
        });
    });
    //调用后台数据
    function index_nav(condition_name) {
        $.ajax({
            url: ip + "winn/findFirstGoodsList",
            type:"post",
            data:{
                pageIndex:"1",
                pageSize:"6",
                condition:condition_name
            },
            success:function (data) {
                //存储数据数组
                sessionStorage.setItem("GoodsList", data.data.length);
                var content_box_ul = $(".content-box-ul");
                var html = '';
                content_box_ul.empty();
                $(data.data).each(function (i,j) {
                    //总需
                    var required = parseInt(j.goodsPrice/j.goodsIsone);
                    //剩余人次
                    var Surplus = parseInt(j.goodsPrice/j.goodsIsone)-j.joinTimes;
                    //参与人次
                    var participate = parseInt(required - Surplus);
                    //参与百分比
                    var nums = ((participate / required)* 100).toFixed(2) + "%";
                    //获取图片
                    var goodImg = j.goodSmimg.split(',')[0];
                    html += '<li>'+
                        '<div class="shop-box">'+
                        '<a class="ceshi" href="../buy-shop/details.html?gid='+ j.goodsId +'">'+
                        '<img src="'+ goodImg +'" alt="" onerror="this.src=\'../public-img/public-title.png\'">'+
                        '</a>'+
                        '<div class="content-title">'+
                        '<h3>'+ j.goodName +'</h3>'+
                        '<p>开奖进度<em>'+ nums +'</em></p>'+
                        '<div class="linear clearfix"><i style=" width: '+ nums +'"></i></div>'+
                        '</div>'+
                        '<div class="content-buy">'+
                        '<p data-shop-id="'+ j.goodsId +'" class="shop-box-title" ontouchend="MaskLower('+ j.goodsId +','+ j.goodQishu +','+ 1 +')">立即购买</p>'+
                        '</div>'+
                        '</div>'+
                        '</li>'
                });
                content_box_ul.append(html);
            }
        })
    };
    // 判断是否到达底部
    $(window).scroll( function (event) {
        event.stopPropagation();
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // console.log(scrollTop);
        //页面高度
        var scrollHei = document.documentElement.clientHeight + scrollTop;
        if (document.documentElement.scrollHeight == scrollHei ) {
            var thisId = $(".content-box-ul").data("id");
            startId++;
            //获取下拉数组
            var pageIndex_num = parseFloat(sessionStorage.getItem("GoodsList"));
            // alert(typeof pageIndex_num);
            // alert(typeof startId);
            if(startId !== pageIndex_num){
                $.ajax({
                    url: ip + "winn/findFirstGoodsList",
                    type: "post",
                    data: {
                        pageIndex: startId,
                        pageSize: "6",
                        condition: thisId
                    },
                    success: function (data) {
                        var html = '';
                        $(data.data).each(function (i, j) {
                            //总需
                            var required = parseInt(j.goodsPrice / j.goodsIsone);
                            //剩余人次
                            var Surplus = parseInt(j.goodsPrice / j.goodsIsone) - j.joinTimes;
                            //参与人次
                            var participate = parseInt(required - Surplus);
                            //参与百分比
                            var nums = ((participate / required) * 100).toFixed(2) + "%";
                            //获取图片
                            var goodImg = j.goodSmimg.split(',')[0];
                            html += '<li>' +
                                '<div class="shop-box">' +
                                '<a href="../buy-shop/details.html?gid='+ j.goodsId + '">' +
                                '<img src="' + goodImg + '" alt="" onerror="this.src=\'../public-img/public-title.png\'">' +
                                '</a>' +
                                '<div class="content-title">' +
                                '<h3>' + j.goodName + '</h3>' +
                                '<p>开奖进度<em>' + nums + '</em></p>' +
                                '<div class="linear clearfix"><i style=" width: ' + nums + '"></i></div>' +
                                '</div>' +
                                '<div class="content-buy">' +
                                '<p '+ j.goodsId +' class="shop-box-title" ontouchend="MaskLower('+ j.goodsId +','+ j.goodQishu +','+ 1 +')">立即购买</p>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        });
                        $(".content-box-ul li:last").after(html);
                    }
                });
            }else{
                $(".content").append("<p class='public-earth'>已经没有更多了</p>");
                return false;
            }
            // console.log("到达底部");
        }
    },false);
})();
