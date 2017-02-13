/**
 *
 * @param 配置文件
 * @
 */
var config ={
    //倒计时结束返回
    COUNT_DOWN:'已经倒计时完毕',

    //倒计时位置cls
    COUNT_CLS:'.time_ls',

    NEW_TIME_PAGEINDEX:'1',
    NEW_TIME_PAGESIZE:'8',
    NEW_TIME_CONDITION:'2'
};

(function () {

    //最新揭晓list
    $.ajax({
        url: ip + "winn/findFirstGoodsList",
        type:"post",
        //查询最新商品
        data:{
            pageIndex:config.NEW_TIME_PAGEINDEX,
            pageSize:config.NEW_TIME_PAGESIZE,
            condition:config.NEW_TIME_CONDITION
        },
        success:function (data) {
            var html = '';
            //单页面存储数据数量
            sessionStorage.setItem("new-time-list", data.data.length);
            var countdown_list = $(".new-time-box");
            if(data.data != null){
                $(data.data).each(function (i,j) {
                    var goodSmimg = j.goodSmimg.split(',')[0];
                    // var countDownTime = 10;
                    countdown_list.empty();
                    html += '<li class="new-time-title">';
                    if(Number(j.goodsIsone) === 10){
                        html+='<img class="new-time-mon" src="../public-img/icon_tens_goods.png" alt="">'
                    }
                    html+='<a href="../buy-shop/lottery.html?gid='+ j.goodsId +'&qishu='+ j.goodQishu +'">'+
                        '<img class="new-time-shop" src="'+ goodSmimg +'" alt="">'+
                        '<h3>'+ j.goodName +'</h3>'+
                        '</a>'+
                        '<p>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：'+ j.goodQishu +'</p>';
                    if(Number(j.countDownTime) !== -1){
                        html+='<p class="red"><i></i>即将揭晓</p>'+
                            '<b class="red time_ls">'+ j.countDownTime +'</b>'
                    }else{
                        if(j.winUserName === null){
                            html+='<p>获奖用户：<a class="blue" href="JavaScript:void(0)">神秘用户</a></p>'
                        }else{
                            html+='<p>获奖用户：<a class="blue" href="JavaScript:void(0)">'+ j.winUserName +'</a></p>'
                        }
                        html +='<p>参与人次：'+ j.joinTimes +'</p>';
                        html += j.winNums == null ? '<p>幸运号码：<span class="red">无人中奖，下次开奖</span></p>':'<p>幸运号码：<span class="red">'+ j.winNums +'</span></p>'
                    }
                     html+='</li>';
                });
                countdown_list.append(html);
                var num = $(".time_ls").html();
                Timer(num);
            }else{
                console.warn("访问失败")
            }
        }
    });

    // 判断是否到达底部
    $(window).scroll( function(){
        var scrollTop = 0;
        var clientHeight = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        }
        scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (scrollTop + clientHeight == scrollHeight) {
            //下拉加载数据
            var pageIndex_num = Number(sessionStorage.getItem("new-time-list"));
            config.NEW_TIME_PAGEINDEX = Number(config.NEW_TIME_PAGEINDEX) +1;
            if(config.NEW_TIME_PAGEINDEX !== pageIndex_num){
                $.ajax({
                    url: ip + "winn/findFirstGoodsList",
                    type:"post",
                    //查询最新商品
                    data:{
                        pageIndex:config.NEW_TIME_PAGEINDEX,
                        pageSize:config.NEW_TIME_PAGESIZE,
                        condition:config.NEW_TIME_CONDITION
                    },
                    success:function (data) {
                        var html = '';
                        var countdown_list = $(".new-time-box");
                        if(data.data != null){
                            $(data.data).each(function (i,j) {
                                var goodSmimg = j.goodSmimg.split(',')[0];
                                // var countDownTime = 10;
                                html += '<li class="new-time-title">';
                                if(Number(j.goodsIsone) === 10){
                                    html+='<img class="new-time-mon" src="../public-img/icon_tens_goods.png" alt="">'
                                }
                                html+='<a href="../buy-shop/lottery.html?gid='+ j.goodsId +'&qishu='+ j.goodQishu +'">'+
                                    '<img class="new-time-shop" src="'+ goodSmimg +'" alt="">'+
                                    '<h3>'+ j.goodName +'</h3>'+
                                    '</a>'+
                                    '<p>期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：'+ j.goodQishu +'</p>';
                                if(Number(j.countDownTime) !== -1){
                                    html+='<p class="red"><i></i>即将揭晓</p>'+
                                        '<b class="red time_ls">'+ j.countDownTime +'</b>'
                                }else{
                                    if(j.winUserName === null){
                                        html+='<p>获奖用户：<a class="blue" href="JavaScript:void(0)">神秘用户</a></p>'
                                    }else{
                                        html+='<p>获奖用户：<a class="blue" href="JavaScript:void(0)">'+ j.winUserName +'</a></p>'
                                    }
                                    html +='<p>参与人次：'+ j.joinTimes +'</p>';
                                    html += j.winNums == null ? '<p>幸运号码：<span class="red">无人中奖，下次开奖</span></p>':'<p>幸运号码：<span class="red">'+ j.winNums +'</span></p>'
                                }
                                html+='</li>';
                            });
                            $(".new-time-title:last").after(html);
                            var num = $(".time_ls").html();
                            Timer(num);
                        }else{
                            console.warn("访问失败")
                        }
                    }
                });
            }else{
                $(".new-time-box").after("<p class='public-earth'>已经没有更多了</p>");
                return false;
            }
        }
    });
})();
