/*
 *   假定一个商品
 *   商品id=105；
 *   期数qishu=1；
 */

//上拉加载

$(document).ready(function(){
    //页面加载完成之前启动过渡
   // $(".index-load").detach()
});
//    获取后台数据-轮播图
(function () {
    // var gid = 78;
     var gid = getQueryString("gid");
    //  var qishu = 1;
    // var qishu = getQueryString("qishu");
    var $data = {gid:gid};

    //微信第三方登录
    // var obj = new WxLogin({
    //     id:"login_container",
    //     appid: "",
    //     scope: "snsapi_login",
    //     redirect_uri: "",
    //     state: "",
    //     style: "",
    //     href: ""
    // });
    // var vxUrl = ip + "user/apploginshiroopenid";
    // $.post(vxUrl,{
    //     "loginMode":"Weixin",
    //     "openid":"openid",//写入第三方id
    //     "advicetoken":"advicetoken",
    //     "userfrom":"userfrom",
    //     "usernickname":"usernickname",
    //     "userpho":"userpho"
    // },function (res) {
    //
    // });

    //判断设备是android系统还是ios系统 选择打开还是安装
    var ClosePopup = null;
    ClosePopup = setTimeout(function () {
        var PopupWindow = $(".Popup-window");
        PopupWindow.css({display:"block"});

        $(".close")[CLICK](function () {
            PopupWindow.replaceWith();
            clearTimeout(ClosePopup)
        });
        var openUrl = window.location.search;
        try {
            openUrl = openUrl.substring(1, openUrl.length);
        } catch (e) {}
        var isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match(
                'iPod'),
            isAndroid = navigator.userAgent
                .match('Android'),
            isDesktop = !isiOS && !isAndroid;
        //打开app/apk
        $(".Popup-btn")
        $(".Popup-btn")[CLICK](function () {
            if (isiOS) {
                setTimeout(function () {
                    console.log('没有安装ios,给我scheme');
//              window.location = "itms-apps://itunes.apple.com/app/[name]/[id]?mt=8";
                window.loaction = "https://itunes.apple.com/cn/app/dian-da-duo-bao-guan-fang/id1064350114?mt=8";
                }, 25);
                oyTrtApp://
                console.log('如果设备有app，直接打开');
//        window.location = "[scheme]://[host]?url=" + openUrl;
            } else if (isAndroid) {
                console.log('没有安装apk,给我scheme');
//        window.location = "intent://[host]/" + "url=" + openUrl + "#Intent;scheme=[scheme];package=[package_name];end";
            } else {
                console.log('如果设备有apk，直接打开');
//        window.location.href = openUrl;
            }
        })

    },1000);
    //banner图相关
    var url = ip+ 'goods/findSingleIndexGoodsDetail';
    $.post(url,$data, function (res) {
        var imgs = res.goodsSmimg.split(',');
        $(".swiper-wrapper").empty();
        var html = '';
        for (var i = 0; i < imgs.length-1; i++) {
            html = html + '<div class="swiper-slide"><img src="' + imgs[i] + '" style="width: 100%;"></div>';
        }
        $('.swiper-wrapper').html(html);
        //轮播图
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3500
        });
        //商品名称
        var shop_title = res.goodsName;
        if(shop_title === null){
            $(".details-banner-title").replaceWith('<div class="details-banner-title">'+res.goodsName + '<em class="red">' + res.goodsIntroduce + '</em></div>');
        }else{
            $(".details-banner-title").replaceWith('<div class="details-banner-title">'+res.goodsName + '</div>');
        }
        $(".shop-my").replaceWith("<h2 class='shop-my red'>"+ "￥" + res.goodsPrice +"</h2>");
        $(".shop-goods-name").replaceWith('<em class="shop-goods-name">' + res.goodqishu + '</em>');
        //总需
        var required = parseInt(res.goodsPrice / res.goodsIsone);
        //剩余
        var Surplus = parseInt((res.goodsPrice / res.goodsIsone) - res.joinTimes);
        //参与人次
        var participate = parseInt(required - Surplus);
        //总需人次
        $(".required").replaceWith('<em class="required">'+ required +'</em>');
        //剩余人次
        $(".surplus").replaceWith('<em class="blue surplus">'+ Surplus + '</em>');
        //参与百分比
        var num = (participate / required)* 100 + "%";
        $(".details-title-data em").css({width:num});

        //全价购买(当商品期数为0时，无法全价购买)
        if(Surplus != 0){
            $(".details-one-r")[CLICK](function () {
                window.location = "../buy-shop/pay-shop.html?gid=" + gid;
            });
        }else{
            $(".details-one-r").css({background:"#e6e5e5",color:"#b3b2b2"})
        }
        // $(".details-one-r")[CLICK](function () {
        //     window.location = "../buy-shop/pay-shop.html?gid=" + gid + "qishu=" +qishu;
        // });
        //存储商品商情图
        var goodsImg = res.goodsImg;
        localStorage.setItem("goodsImg",goodsImg);
        //存储商品期数下一个页面使用
        var goodQiShu = res.goodqishu;
        localStorage.setItem("goodQiShu",goodQiShu);
    });

    //荣誉榜单
    var ryUrl = ip + 'winn/findHonorList/';
    // var ryUrl = "http://10.10.10.9:8000/api/users";
    var rongyu = localStorage.getItem("goodQiShu");
    $.ajax({
        url: ryUrl,
        data:{
            gid:gid,
            qishu:rongyu
        },
        type:"post",
        success:function (data) {
            $(".honor-list-box").empty();
            if(data.data.length != 0){
                var nData = [];
                // var oldData = data.data.users;
                var oldData = data.data;
                oldData.sort(function (a,b) {
                    return b.totalJoinTimes - a.totalJoinTimes;
                });
                nData.push(oldData.slice(0,3));
                $(nData[0]).each(function (i,j) {
                    var num = i+1;
                    var html = '';
                    html +='<li class="honor-list-li">'+
                        '<a class="honor-list-img" href="javascript:void(0)">';
                        if(j.userPho === null){
                            html+='<img src="../public-img/tx-1.jpg" alt="">'
                        }else{
                            html+='<img src="'+ j.userPho +'" alt="">'
                        }
                        html +='</a>'+
                        '<p class="honor-list-ranking">NO.'+ num +'</p>'+
                        '<a class="honor-list-name" href="javascript:void(0)">'+ j.userNickname +'</a>'+
                        '<span class="honor-list-num">参与了<em class="red">'+ j.totalJoinTimes +'</em>人次</span>'+
                        '</li>';
                    $(".honor-list-box").append(html);
                });
            }else{
                $(".honor-list-box").append('没有数据')
            }
        }
    });
    //晒单分享
    $(".details-sun-shop")[CLICK](function () {
        window.location = "../buy-shop/share.html?gid=" + gid;
    });
    //往期揭晓
    $(".details-old-q")[CLICK](function () {
        window.location = "../buy-shop/announced.html?gid=" + gid;
    });
    //商品详情
    $(".details-old-ols")[CLICK](function () {
        window.location = "../buy-shop/details_index.html?gid=" + gid;
    });
    //立即夺宝
    $(".details-pay-re a")[CLICK](function () {
        window.location = "../buy-shop/pay-shop.html?gid=" + gid;
    });
    //本期参与记录
    $(".details-old-participation")[CLICK](function () {
        window.location = "../buy-shop/participation.html?gid=" + gid;
    });
    
}());

