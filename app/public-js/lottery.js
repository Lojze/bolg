var config = {
    //倒计时结束返回
    COUNT_DOWN:'已经倒计时完毕',

    //倒计时位置cls
    COUNT_CLS:$(".time_ls"),

    //获取商品id
    LOTTER_id:getQueryString("gid"),
    //获取商品期数
    LOTTER_QISHU:getQueryString("qishu"),

    //中奖号码返回判断
    LOTTER_HOT:"操作失败"
};

(function () {

    //购买按钮
    $(".lottery-now-shop")[CLICK](function () {
        MaskLower(config.LOTTER_id,config.LOTTER_QISHU)
    });

    //banner切换
    var url = ip+ 'goods/findSingleIndexGoodsDetail';
    $.post(url,{gid:config.LOTTER_id,qishu:config.LOTTER_QISHU}, function (data) {
        var imgs = data.goodsSmimg.split(',');
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
        //商品详情
        if(data.goodsIntroduce === null){
            $(".lottery-title").replaceWith('<div class="lottery-title"><span>'+ data.goodsName +'</span></div>')
        }else{
            $(".lottery-title").replaceWith('<div class="lottery-title"><span>'+ data.goodsName +'</span><span class="red" title="'+ data.goodsIntroduce +'">'+data.goodsIntroduce+'</span></div>')
        }

        //判断倒计时-中奖用户-中奖号码
        // $(".lottery-hot-box").empty();
        if(data.countDownTime !== -1){
            $(".lottery-timeang").replaceWith('<p class="lottery-timeang">期号：'+data.goodqishu+'</p>');
            Timer(data.countDownTime);
        }else{
            $(".lottery-time").replaceWith();
            var Loyyery = [
                //中奖用户
                data.winUserName,

                //用户头像
                data.winPersonPho,

                //用户ip
                data.winBuyIp,

                //用户城市
                data.winBuyCity,

                //中奖期号
                data.goodqishu,

                //用户id
                data.winUserId,

                //参与人次
                data.joinTimes,

                //揭晓时间
                data.openTime
            ];
            localStorage.setItem("Loyyery",Loyyery);

            //获取中奖号码
            var HotNum = ip + "winn/winnInfo";
            $.get(HotNum,{gid:config.LOTTER_id,qishu:config.LOTTER_QISHU},function (data) {
                var Loyyery_Old = localStorage.getItem("Loyyery");
                var list = Loyyery_Old.split(",");
                if(data.msg !== config.LOTTER_HOT){

                    //获取存储数据
                    $(".lottery-hot-box").replaceWith(
                        '<div class="lottery-hot-box"><div class="lottery-hot"><div class="lottery-hot-left">'+
                        '<a href="javascript:void(0)"><img src="'+list[1]+'" alt=""></a></div>'+
                        '<div class="lottery-hot-m">'+
                        '<p>获得者：<a class="blue" href="javascript:void(0)">'+ list[0] +'</a></p>'+
                        '<p>用户ip：'+ list[2] +'('+ list[3] +')</p>'+
                        '<p>期号：'+ list[4] + '</p>'+
                        '<p>用户ID：'+ list[5] + '(唯一不变标识)</p>'+
                        '<p>本期参与：<em class="red">'+ list[6] +'</em>人次</p>'+
                        '<p>揭晓时间：'+ list[7] +'</p></div>'+
                        '<div class="lottery-hot-r">'+
                        '<svg class="icon" aria-hidden="true">'+
                        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-medal"></use>'+
                        '</svg></div></div><div class="lottery-hot-lucky">'+
                        '<p>幸运号码：<b>'+ data.data.wininfo.win_num +'</b></p>'+
                        '<a href="javascript:void(0)">计算详情</a>'+
                        '</div></div>'
                    );
                }else{
                    $(".lottery-hot-box").replaceWith();
                }
            });

        }

    });

    //往期揭晓
    $(".details-old-q")[CLICK](function () {
        window.location = "../buy-shop/announced.html?gid=" + config.LOTTER_id;
    });

    //本期参与记录
    $(".details-old-participation")[CLICK](function () {
        window.location = "../buy-shop/participation.html?gid=" + config.LOTTER_id;
    })
})();
